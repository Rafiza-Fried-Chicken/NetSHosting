// routes/files.js
'use strict';

const express = require('express');
const path = require('path');
const db = require('../utils/db');
const storage = require('../utils/storage');

const router = express.Router();

/**
 * GET /:slug
 * Lookup file metadata by slug and redirect to signed URL for download/access
 */
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  
  db.getFileBySlug(slug, async (err, file) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Internal server error');
    }
    if (!file) {
      return res.status(404).send('File not found');
    }
    
    try {
      // Construct storage key with slug + extension from original filename
      const ext = path.extname(file.filename) || '';
      const key = `${slug}${ext}`;
      
      // Get signed URL valid for 1 hour (3600 seconds)
      const signedUrl = await storage.getSignedUrl(key, 3600);
      
      // Redirect client to signed URL
      res.redirect(signedUrl);
    } catch (storageErr) {
      console.error('Storage error:', storageErr);
      res.status(500).send('Failed to retrieve file');
    }
  });
});

module.exports = router;
