const CHUNK_SIZE = 5 * 1024 * 1024;
const API = 'http://localhost:3000';
const SAMPLE_THRESHOLD = 2 * 1024 * 1024 * 1024;
const CONCURRENCY = 4;
const MAX_RETRIES = 3;

const fileInput = document.getElementById('file');
const btn = document.getElementById('btn');
const progress = document.getElementById('progress');

function createChunks(file) {
  const chunks = [];
  for (let cur = 0; cur < file.size; cur += CHUNK_SIZE) {
    chunks.push(file.slice(cur, cur + CHUNK_SIZE));
  }
  return chunks;
}

function calcHashByWorker(chunks) {
  return new Promise((resolve) => {
    const worker = new Worker('hash-worker.js');
    worker.postMessage({ chunks });
    worker.onmessage = (e) => {
      if (e.data.progress != null) {
        progress.textContent = `hash ${(e.data.progress * 100).toFixed(0)}%`;
      }
      if (e.data.hash) {
        resolve(e.data.hash);
        worker.terminate();
      }
    };
  });
}

function calcSampleHash(file) {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer();
    const SIZE = 2 * 1024 * 1024;
    const offsets = [
      0,
      Math.floor(file.size / 2 - SIZE / 2),
      file.size - SIZE,
    ];
    const reader = new FileReader();
    let i = 0;
    const next = () =>
      reader.readAsArrayBuffer(file.slice(offsets[i], offsets[i] + SIZE));
    reader.onload = (e) => {
      spark.append(e.target.result);
      i++;
      i < offsets.length ? next() : resolve(spark.end());
    };
    next();
  });
}

// 并发池：同一时间最多 limit 个任务在跑
async function runWithConcurrency(tasks, limit) {
  const executing = new Set();
  const results = [];
  for (const task of tasks) {
    const p = task().finally(() => executing.delete(p));
    executing.add(p);
    results.push(p);
    if (executing.size >= limit) await Promise.race(executing);
  }
  return Promise.all(results);
}

// 用 XHR 才能拿到 upload.onprogress 的字节级进度
function uploadChunkXHR(chunk, index, hash, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    fd.append('chunk', chunk);
    xhr.upload.onprogress = (e) => onProgress(index, e.loaded);
    xhr.onload = () =>
      xhr.status < 300 ? resolve() : reject(new Error('http ' + xhr.status));
    xhr.onerror = () => reject(new Error('network'));
    xhr.open('POST', `${API}/upload-chunk?hash=${hash}&index=${index}`);
    xhr.send(fd);
  });
}

// 失败重试 + 指数退避
async function uploadWithRetry(chunk, index, hash, onProgress) {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await uploadChunkXHR(chunk, index, hash, onProgress);
    } catch (e) {
      if (attempt === MAX_RETRIES - 1) throw e;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
}

btn.onclick = async () => {
  const file = fileInput.files[0];
  if (!file) return;
  const chunks = createChunks(file);
  const ext = file.name.split('.').pop();

  progress.textContent = '计算 hash...';
  const hash =
    file.size > SAMPLE_THRESHOLD
      ? await calcSampleHash(file)
      : await calcHashByWorker(chunks);

  const verifyRes = await fetch(`${API}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hash, ext }),
  }).then((r) => r.json());

  if (verifyRes.exists) {
    progress.textContent = '秒传成功';
    return;
  }

  const uploadedSet = new Set(verifyRes.uploaded);
  const loadedMap = new Map(); // index -> 已上传字节数
  const total = file.size;

  const render = () => {
    const sum = [...loadedMap.values()].reduce((a, b) => a + b, 0);
    progress.textContent = `${((sum / total) * 100).toFixed(1)}%`;
  };

  // 已传过的分片直接计入进度
  const tasks = chunks
    .map((chunk, index) => {
      if (uploadedSet.has(String(index))) {
        loadedMap.set(index, chunk.size);
        return null;
      }
      return () =>
        uploadWithRetry(chunk, index, hash, (idx, bytes) => {
          loadedMap.set(idx, bytes);
          render();
        });
    })
    .filter(Boolean);

  render();
  await runWithConcurrency(tasks, CONCURRENCY);

  await fetch(`${API}/merge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hash, ext, total: chunks.length }),
  });
  progress.textContent = '完成';
};
