const fileInput = document.getElementById('file');
const btn = document.getElementById('btn');
const progress = document.getElementById('progress');
const API = 'http://127.0.0.1:3000'
const CHUNK_SIZE = 0.1 * 1024 * 1024;

function createChunks(file) {
  const chunk = [];
  for (let cur = 0; cur < file.size; cur += CHUNK_SIZE) {
    chunk.push(file.slice(cur, cur + CHUNK_SIZE));
  }
  return chunk;
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
        reader.readAsArrayBuffer(chunks[i]);
      } else {
        resolve(spark.end());
      }
    };
    reader.readAsArrayBuffer(chunks[0]);
  });
}

btn.onclick = async (e) => {
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
    if (uploaded.has(String(i))) continue;
    const fd = new FormData();
    fd.append('index', i);
    fd.append('hash', hash);
    fd.append('chunk', chunks[i]);
    await fetch(`${API}/upload-chunk`, { method: 'POST', body: fd });
    progress.textContent = `${i + 1}/${chunks.length}`;
  }

  await fetch(`${API}/merge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hash, ext, total: chunks.length }),
  });
  progress.textContent = '完成';
}