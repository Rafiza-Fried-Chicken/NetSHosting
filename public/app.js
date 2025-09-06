const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware static untuk file HTML/CSS/JS
app.use(express.static(path.join(__dirname, 'public')));

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Konfigurasi multer untuk simpan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Endpoint upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: fileUrl,
    shortUrl: fileUrl   // sementara sama, bisa dikembangkan jadi shortlink
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
