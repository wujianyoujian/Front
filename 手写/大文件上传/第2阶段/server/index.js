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

// 分片标识走 query，避免 multer 字段顺序问题
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(TEMP_DIR, req.query.filename);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, req.query.index),
  }),
});

app.post('/upload-chunk', upload.single('chunk'), (req, res) => {
  res.json({ ok: true });
});

app.post('/merge', async (req, res) => {
  const { filename, total } = req.body;
  const chunkDir = path.join(TEMP_DIR, filename);
  const target = path.join(UPLOAD_DIR, filename);
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
