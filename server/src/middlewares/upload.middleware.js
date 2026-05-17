import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

const uploadRoot = path.resolve(env.SERVER_ROOT, env.UPLOAD_DIR);
const tmpDir = path.join(uploadRoot, 'tmp');

if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, tmpDir);
  },
  filename(req, file, callback) {
    const safeOriginal = file.originalname.replace(/[^a-z0-9._-]/gi, '-');
    callback(null, `${Date.now()}-${safeOriginal}`);
  }
});

export const uploadZip = multer({
  storage,
  limits: {
    fileSize: env.MAX_UPLOAD_MB * 1024 * 1024
  },
  fileFilter(req, file, callback) {
    const isZip = file.originalname.toLowerCase().endsWith('.zip');

    if (!isZip) {
      callback(new ApiError(400, 'Only ZIP repositories are supported'));
      return;
    }

    callback(null, true);
  }
}).single('repository');
