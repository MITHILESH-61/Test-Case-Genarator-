import fs from 'fs/promises';
import path from 'path';

const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.next',
  '.turbo',
  '.cache',
  'uploads'
]);

const TEXT_EXTENSIONS = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.mjs',
  '.cjs',
  '.json',
  '.md',
  '.css',
  '.scss',
  '.html',
  '.yml',
  '.yaml'
]);

const MAX_FILES = 500;
const MAX_CONTENT_BYTES = 60_000;

const normalizePath = (filePath) => filePath.split(path.sep).join('/');

export const scanRepository = async (rootPath) => {
  const root = path.resolve(rootPath);
  const files = [];

  const walk = async (currentPath) => {
    if (files.length >= MAX_FILES) {
      return;
    }

    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (files.length >= MAX_FILES) {
        break;
      }

      if (entry.isDirectory() && IGNORED_DIRS.has(entry.name)) {
        continue;
      }

      const absolutePath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const relativePath = normalizePath(path.relative(root, absolutePath));
      const extension = path.extname(entry.name).toLowerCase();
      const stat = await fs.stat(absolutePath);
      let content = '';

      if (TEXT_EXTENSIONS.has(extension) && stat.size <= MAX_CONTENT_BYTES) {
        content = await fs.readFile(absolutePath, 'utf8');
      }

      files.push({
        path: relativePath,
        extension,
        size: stat.size,
        content
      });
    }
  };

  await walk(root);

  return {
    rootPath: root,
    files
  };
};

