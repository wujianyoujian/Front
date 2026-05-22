const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
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

async function uploadChunk(chunk, index, filename) {
  const fd = new FormData();
  fd.append('chunk', chunk);
  const url = `${API}/upload-chunk?filename=${encodeURIComponent(filename)}&index=${index}`;
  await fetch(url, { method: 'POST', body: fd });
}

btn.onclick = async () => {
  const file = fileInput.files[0];
  if (!file) return;
  const chunks = createChunks(file);

  for (let i = 0; i < chunks.length; i++) {
    await uploadChunk(chunks[i], i, file.name);
    progress.textContent = `${i + 1}/${chunks.length}`;
  }

  await fetch(`${API}/merge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: file.name, total: chunks.length }),
  });
  progress.textContent = '完成';
};
