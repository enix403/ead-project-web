import multer from 'multer';
import path from 'path';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 5);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Folder where files will be saved
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const randomId = nanoid();
    const ext = path.extname(file.originalname).toLowerCase();
    const normalizedExt = ext === '.jpeg' ? '.jpg' : ext;
    const filename = `${timestamp}-${randomId}${normalizedExt}`;
    cb(null, filename);
  },
});

export const multerUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Unsupported file type! Only .png, .jpg, .jpeg, .gif are allowed.',
        ),
      );
    }
  },
  limits: {
    // (5 MB)
    fileSize: 5 * 1024 * 1024,
  },
});
