// routes/upload.js
'use strict';
const express = require('express');
const multer = require('multer');
const path = require('path');
const { generateSlug } = require('../utils/slug');
const db = require('../utils/db');
const storage = require('../utils/storage');

const router = express.Router();

// Use multer memory storage to handle file uploads in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB max file size
  },
});

/**
 * POST /upload
 * Accepts multipart/form-data with a file field named 'file'
 * Saves file metadata in SQLite and uploads file to cloud storage
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const { originalname, mimetype, size, buffer } = req.file;

  // Generate a unique slug for the file
    let slug;
    let exists;
    do {
      slug = generateSlug(10);
      exists = await new Promise((resolve) => {
        db.getFileBySlug(slug, (err, row) => {
          resolve(!!row);
        });
      });
    } while (exists);

      // Save file metadata in SQLite
    db.insertFile(
      {
        slug,
        filename: originalname,
        mimetype,
        size,
      },
      (err) => {
        if (err) {
          console.error('DB insert error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        // Return the slug and access URL
        res.status(201).json({
          message: 'File uploaded successfully',
          slug,
          url: `/files/${slug}`,
        });
      }
    );
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
