const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const UPLOAD_DIR = path.resolve(__dirname, 'uploads');
const TEMP_DIR = path.resolve(__dirname, 'temp');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(TEMP_DIR, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(TEMP_DIR, req.query.hash);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, req.query.index),
  }),
});

app.post('/verify', (req, res) => {
  const { hash, ext } = req.body;
  const filePath = path.join(UPLOAD_DIR, `${hash}.${ext}`);
  if (fs.existsSync(filePath)) {
    return res.json({ exists: true, uploaded: [] });
  }
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
