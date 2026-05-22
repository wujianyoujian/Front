const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const UPLOAD_DIR = path.resolve(__dirname, 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(cors());
const upload = multer({ dest: UPLOAD_DIR });

app.post('/upload', upload.single('file'), (req, res) => {
  const target = path.join(UPLOAD_DIR, req.file.originalname);
  fs.renameSync(req.file.path, target);
  res.json({ ok: true });
});

app.listen(3000, () => console.log('http://localhost:3000'));
