import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(currentDir, '../..');

dotenv.config({ path: path.join(serverRoot, '.env') });

export const env = {
  SERVER_ROOT: serverRoot,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  GROQ_MODEL: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
  MAX_UPLOAD_MB: Number(process.env.MAX_UPLOAD_MB || 20)
};

export const validateEnv = () => {
  const missing = ['MONGODB_URI', 'JWT_SECRET'].filter((key) => !env[key]);

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};
