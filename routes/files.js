const express = require('express');
const db = require('../utils/db');
const path = require('path');

const router = express.Router();

// redirect short url ke file asli
router.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  db.get('SELECT path FROM files WHERE slug = ?', [slug], (err, row) => {
    if (err || !row) {
      return res.status(404).send('File not found');
    }
    res.redirect(row.path);
  });
});

module.exports = router;
