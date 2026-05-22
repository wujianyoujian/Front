const fileInput = document.getElementById('file');
const btn = document.getElementById('btn');
const progress = document.getElementById('progress');

btn.onclick = async () => {
  const file = fileInput.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append('file', file);
  await fetch('http://localhost:3000/upload', { method: 'POST', body: fd });
  progress.textContent = '完成';
};
