const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../utils/db');
const { generateSlug } = require('../utils/slug');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const slug = generateSlug();
  const fileUrl = `/uploads/${req.file.filename}`;
  const shortUrl = `/f/${slug}`;

  // simpan ke database
  db.run(
    'INSERT INTO files (slug, filename, path) VALUES (?, ?, ?)',
    [slug, req.file.originalname, fileUrl],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ shortUrl });
    }
  );
});

module.exports = router;
