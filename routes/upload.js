import multer from 'multer';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { promisify } from 'util';
import { parse } from 'url';
import { randomBytes } from 'crypto';

// Multer setup
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!existsSync(uploadDir)) mkdirSync(uploadDir);
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, unique + path.extname(file.originalname));
    }
  })
});

const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await runMiddleware(req, res, upload.single('file'));

    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    // generate short URL
    const slug = randomBytes(3).toString('hex'); // 6 char
    const fileUrl = `${process.env.BASE_URL}/uploads/${file.filename}`;
    const shortUrl = `${process.env.BASE_URL}/f/${slug}`; // bisa tambahkan redirect API nanti

    res.status(200).json({ url: fileUrl, shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
}
