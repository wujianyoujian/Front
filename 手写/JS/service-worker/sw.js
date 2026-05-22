// sw.js — Service Worker 完整案例（四种策略）

const CACHE_VERSION = 'v1';
const STATIC_CACHE  = `static-${CACHE_VERSION}`;
const API_CACHE     = `api-${CACHE_VERSION}`;
const SWR_CACHE     = `swr-${CACHE_VERSION}`;
const SHELL_CACHE   = `shell-${CACHE_VERSION}`;

const ALL_CACHES = [STATIC_CACHE, API_CACHE, SWR_CACHE, SHELL_CACHE];

// App Shell 预缓存资源列表
const SHELL_ASSETS = [
  '/service-worker/',
  '/service-worker/index.html',
  '/service-worker/shell.css',
  '/service-worker/shell.js',
  '/service-worker/main.js',
  '/service-worker/offline.html',
];

// ─── 生命周期：install ──────────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] installing...');
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ─── 生命周期：activate ─────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] activating...');
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => !ALL_CACHES.includes(k))
          .map(k => {
            console.log('[SW] 清理旧缓存:', k);
            return caches.delete(k);
          })
      ))
      .then(() => self.clients.claim())
  );
});

// ─── 核心：fetch 拦截路由分发 ───────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const { pathname } = url;

  // 非同源请求不拦截
  if (url.origin !== self.location.origin) return;

  // 1. HTML 导航请求 → Cache Only (App Shell)
  if (event.request.mode === 'navigate') {
    event.respondWith(appShell());
    return;
  }

  // 2. Shell 骨架资源（CSS/JS）→ Cache Only
  if (isShellAsset(pathname)) {
    event.respondWith(cacheOnly(event.request));
    return;
  }

  // 3. 带 hash 的静态资源 → Cache First
  if (isHashedAsset(pathname)) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE));
    return;
  }

  // 4. 用户信息 / 配置接口 → Stale While Revalidate
  if (isSWRResource(pathname)) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // 5. 普通 mock/API 请求 → Network First
  if (pathname.includes('/mock/') || pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // 6. 其他：直接走网络
});

// ─── 策略一：Cache First（静态资源）────────────────────────────
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    console.log('[SW] Cache First 命中:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    console.log('[SW] Cache First 写入缓存:', request.url);
    return response;
  } catch {
    return offlineFallback();
  }
}

// ─── 策略二：Network First（API 数据）──────────────────────────
const API_TIMEOUT = 3000;

async function networkFirst(request) {
  const cache = await caches.open(API_CACHE);

  try {
    const response = await Promise.race([
      fetch(request),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), API_TIMEOUT)
      )
    ]);

    // 网络成功，更新缓存
    cache.put(request, response.clone());
    console.log('[SW] Network First 网络成功:', request.url);
    return response;

  } catch (err) {
    // 网络失败，读缓存兜底
    const cached = await cache.match(request);
    if (cached) {
      console.log('[SW] Network First 降级到缓存:', request.url);
      // 添加标记头，让页面感知
      const headers = new Headers(cached.headers);
      headers.set('X-Cache-Fallback', 'true');
      const body = await cached.blob();
      return new Response(body, { status: 200, headers });
    }

    // 缓存也没有
    return new Response(JSON.stringify({ error: '网络不可用，暂无缓存数据' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// ─── 策略三：Stale While Revalidate（头像/配置）────────────────
async function staleWhileRevalidate(request) {
  const cache  = await caches.open(SWR_CACHE);
  const cached = await cache.match(request);

  // 后台刷新
  const fetchPromise = fetch(request).then(response => {
    cache.put(request, response.clone());
    console.log('[SW] SWR 后台更新:', request.url);
    return response;
  }).catch(() => null);

  if (cached) {
    console.log('[SW] SWR 返回缓存（后台刷新中）:', request.url);
    const headers = new Headers(cached.headers);
    headers.set('X-SWR-Cache', 'true');
    const body = await cached.blob();
    return new Response(body, { status: 200, headers });
  }

  // 没有缓存，等待网络
  return fetchPromise || offlineFallback();
}

// ─── 策略四：Cache Only（App Shell）────────────────────────────
async function cacheOnly(request) {
  const cached = await caches.match(request);
  if (cached) {
    console.log('[SW] Cache Only 命中:', typeof request === 'string' ? request : request.url);
    return cached;
  }
  return offlineFallback();
}

async function appShell() {
  const cached = await caches.match('/service-worker/index.html');
  return cached || fetch('/service-worker/index.html');
}

// ─── 工具函数 ───────────────────────────────────────────────────

function isShellAsset(pathname) {
  return [
    '/service-worker/shell.css',
    '/service-worker/shell.js',
    '/service-worker/main.js',
  ].includes(pathname);
}

// 匹配带 8 位 hash 的 JS/CSS 文件
function isHashedAsset(pathname) {
  return /\.[0-9a-f]{8}\.(js|css)$/.test(pathname);
}

// 匹配用户信息 / 配置类接口
function isSWRResource(pathname) {
  return /\/(mock\/user|api\/user|api\/config)/.test(pathname);
}

function offlineFallback() {
  return caches.match('/service-worker/offline.html')
    .then(res => res || new Response('离线中，请检查网络', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    }));
}
