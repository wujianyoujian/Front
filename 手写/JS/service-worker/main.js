// main.js — 页面业务逻辑

// ─── 注册 Service Worker ───────────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker/sw.js', {
    scope: '/service-worker/'
  }).then(reg => {
    console.log('[SW] 注册成功，scope:', reg.scope);
  }).catch(err => {
    console.error('[SW] 注册失败:', err);
  });
}

// ─── 案例一：Network First — 加载新闻列表 ──────────────────────
async function loadNews() {
  const list = document.getElementById('news-list');
  const tip  = document.getElementById('cache-tip');
  list.innerHTML = '<li>加载中...</li>';
  tip.classList.add('hidden');

  try {
    // 实际项目替换为真实 API，这里用 mock 数据接口演示
    const res = await fetch('./mock/news.json');

    if (res.headers.get('X-Cache-Fallback') === 'true') {
      tip.classList.remove('hidden');
    }

    const data = await res.json();
    list.innerHTML = data.list.map(item => `
      <li>
        <div class="news-title">${item.title}</div>
        <div class="news-meta">${item.source} · ${item.time}</div>
      </li>
    `).join('');
  } catch (err) {
    list.innerHTML = '<li style="color:red">加载失败，且无缓存数据</li>';
  }
}

// ─── 案例二：Stale While Revalidate — 加载用户信息 ────────────
async function loadUser() {
  const el = document.getElementById('user-info');
  el.innerHTML = '加载中...';

  try {
    const res = await fetch('./mock/user.json');
    const data = await res.json();

    el.innerHTML = `
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}" alt="avatar" />
      <div class="user-detail">
        <h3>${data.name}</h3>
        <p>${data.role} · ${data.email}</p>
        <p style="font-size:11px;color:#aaa;margin-top:4px">
          上次更新：${new Date().toLocaleTimeString()}
          ${res.headers.get('X-SWR-Cache') === 'true' ? '（来自缓存，后台已刷新）' : '（来自网络）'}
        </p>
      </div>
    `;
  } catch (err) {
    el.innerHTML = '<p style="color:red">加载失败</p>';
  }
}

// ─── 案例三：Cache First — 查看当前缓存内容 ───────────────────
async function checkCaches() {
  const list = document.getElementById('cache-list');
  list.innerHTML = '';

  if (!('caches' in window)) {
    list.innerHTML = '<li>当前浏览器不支持 Cache API</li>';
    return;
  }

  const cacheNames = await caches.keys();
  if (cacheNames.length === 0) {
    list.innerHTML = '<li>暂无缓存（请先访问页面让 SW 建立缓存）</li>';
    return;
  }

  for (const name of cacheNames) {
    const cache   = await caches.open(name);
    const requests = await cache.keys();

    const header = document.createElement('li');
    header.style.fontWeight = '600';
    header.style.background = '#e8f0fe';
    header.innerHTML = `<span>缓存空间: ${name}</span><span>${requests.length} 条</span>`;
    list.appendChild(header);

    requests.forEach(req => {
      const li = document.createElement('li');
      const url = new URL(req.url).pathname;
      li.innerHTML = `<span>${url}</span><span class="cache-hit">✓ 已缓存</span>`;
      list.appendChild(li);
    });
  }
}
