const CHUNK_SIZE = 5 * 1024 * 1024;
const API = 'http://localhost:3000';
const SAMPLE_THRESHOLD = 2 * 1024 * 1024 * 1024; // 2GB 以上走抽样

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

// 全量 hash：放在 Worker 里跑，不阻塞主线程
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

// 抽样 hash：超大文件只取首/中/尾各 2MB，速度从分钟级降到秒级
// 代价：碰撞概率略升，但对于"文件指纹"场景一般可接受
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
      if (i < offsets.length) {
        next();
      } else {
        resolve(spark.end());
      }
    };
    next();
  });
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

  const uploaded = new Set(verifyRes.uploaded);
  for (let i = 0; i < chunks.length; i++) {
    if (uploaded.has(String(i))) continue;
    const fd = new FormData();
    fd.append('chunk', chunks[i]);
    await fetch(`${API}/upload-chunk?hash=${hash}&index=${i}`, {
      method: 'POST',
      body: fd,
    });
    progress.textContent = `${i + 1}/${chunks.length}`;
  }

  await fetch(`${API}/merge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hash, ext, total: chunks.length }),
  });
  progress.textContent = '完成';
};
