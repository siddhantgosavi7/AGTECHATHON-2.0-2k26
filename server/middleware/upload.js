import multer from 'multer';
import path from 'node:path';

const storage = multer.diskStorage({
  destination: 'server/uploads',
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname || '.jpg') || '.jpg';
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image uploads are supported.'));
      return;
    }
    cb(null, true);
  },
});
