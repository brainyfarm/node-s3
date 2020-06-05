import fs, { promises as fsPromise } from 'fs';
import path from 'path';

import { randomBytes } from 'crypto';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDirectory = 'uploads/';
    if (!fs.existsSync(uploadDirectory)) {
      await fsPromise.mkdir(uploadDirectory);
    }
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueName = randomBytes(18).toString('hex');
    cb(null, uniqueName + path.extname(file.originalname))
  }
});

export {
  storage,
}
