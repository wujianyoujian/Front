const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const UPLOAD_DIR = path.resolve(__dirname, 'uploads');
const TEMP_DIR = path.resolve(__dirname, 'temp');


fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(TEMP_DIR, { recursive: true });

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, res, cb) => {
      const dir = path.join(TEMP_DIR, req.body.hash);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, req.body.index),
  })
});

app.post('/verify', (req, res) => {
  const { hash, ext } = req.body;
  const filePath = path.join(UPLOAD_DIR, `${hash}.${ext}`);
  if (fs.existsSync(filePath)) return res.json({ exists: true, uploaded: [] });

  const chunkDir = path.join(TEMP_DIR, hash);
  const uploaded = fs.existsSync(chunkDir) ? fs.readdirSync(chunkDir) : [];
  res.json({ exists: false, uploaded });
});

app.post('/upload-chunk', upload.single('chunk'), (req, res) => {
  res.json({ ok: true });
});



app.post('/merge', async (req, res) => {
  const { hash, ext, total } = req.body;
  const chunkDir = path.join(TEMP_DIR, hash);
  const target = path.join(UPLOAD_DIR, `${hash}.${ext}`);
  const ws = fs.createWriteStream(target);

  for (let i = 0; i < total; i++) {
    const chunkPath = path.join(chunkDir, String(i));
    await new Promise((resolve, reject) => {
      const rs = fs.createReadStream(chunkPath);
      rs.on('end', resolve);
      rs.on('error', reject);
      rs.pipe(ws, { end: false });
    });
    fs.unlinkSync(chunkPath);
  }
  ws.end();
  fs.rmSync(chunkDir, { recursive: true, force: true });
  res.json({ ok: true });
});

app.listen(3000, () => console.log('http://localhost:3000'));