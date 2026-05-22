const CHUNK_SIZE = 5 * 1024 * 1024;
const API = 'http://localhost:3000';

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

function calcHash(chunks) {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader();
    let i = 0;
    reader.onload = (e) => {
      spark.append(e.target.result);
      i++;
      if (i < chunks.length) {
        progress.textContent = `计算 hash: ${((i / chunks.length) * 100).toFixed(0)}%`;
        reader.readAsArrayBuffer(chunks[i]);
      } else {
        resolve(spark.end());
      }
    };
    reader.readAsArrayBuffer(chunks[0]);
  });
}

btn.onclick = async () => {
  const file = fileInput.files[0];
  if (!file) return;
  const chunks = createChunks(file);

  progress.textContent = '计算 hash...';
  const hash = await calcHash(chunks);
  const ext = file.name.split('.').pop();

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
    if (uploaded.has(String(i))) {
      progress.textContent = `跳过已传 ${i + 1}/${chunks.length}`;
      continue;
    }
    const fd = new FormData();
    fd.append('chunk', chunks[i]);
    const url = `${API}/upload-chunk?hash=${hash}&index=${i}`;
    await fetch(url, { method: 'POST', body: fd });
    progress.textContent = `${i + 1}/${chunks.length}`;
  }

  await fetch(`${API}/merge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hash, ext, total: chunks.length }),
  });
  progress.textContent = '完成';
};
