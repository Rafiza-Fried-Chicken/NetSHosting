const express = require('express');
const { getFile } = require('../utils/db');
const { getSignedUrlFor } = require('../utils/storage');


const router = express.Router();


// GET /api/files/:id – returns metadata or redirect to signed URL with ?download
router.get('/files/:id', async (req, res) => {
try {
const row = await getFile(req.params.id);
if (!row) return res.status(404).json({ error: 'Not found' });


if (req.query.download === '1') {
const signed = await getSignedUrlFor(row.storage_key);
return res.redirect(signed);
}


res.json({
id: row.id,
name: row.original_name,
mime: row.mime,
size: row.size,
url: row.url,
created_at: row.created_at,
});
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Lookup failed' });
}
});


module.exports = router;

