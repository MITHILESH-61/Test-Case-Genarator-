import fs from 'fs/promises';
import path from 'path';
import AdmZip from 'adm-zip';
import { ApiError } from '../utils/ApiError.js';

const assertSafePath = (root, target) => {
  const relative = path.relative(root, target);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new ApiError(400, 'ZIP contains unsafe file paths');
  }
};

export const extractZip = async (zipPath, destination) => {
  const destinationRoot = path.resolve(destination);
  await fs.rm(destinationRoot, { recursive: true, force: true });
  await fs.mkdir(destinationRoot, { recursive: true });

  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();

  for (const entry of entries) {
    const targetPath = path.resolve(destinationRoot, entry.entryName);
    assertSafePath(destinationRoot, targetPath);

    if (entry.isDirectory) {
      await fs.mkdir(targetPath, { recursive: true });
      continue;
    }

    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, entry.getData());
  }

  return destinationRoot;
};

