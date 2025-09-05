const express = require('express');
const multer = require('multer');
const mime = require('mime');
const { insertFile } = require('../utils/db');
const { makeSlug } = require('../utils/slug');
const { putObject } = require('../utils/storage');


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });


// POST /api/upload – returns { id, url }
router.post('/upload', upload.single('file'), async (req, res) => {
try {
if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
const buf = req.file.buffer;
const type = req.file.mimetype || mime.getType(req.file.originalname) || 'application/octet-stream';
const stored = await putObject(buf, type);
const id = makeSlug(10);


await insertFile({
id,
original_name: req.file.originalname,
mime: type,
size: req.file.size,
storage_key: stored.key,
url: stored.url,
});


res.json({ id, url: stored.url || null });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Upload failed' });
}
});


module.exports = router;

