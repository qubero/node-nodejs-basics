import { rename as fsRename, access } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch (err) {
    return false;
  }
};

export const rename = async () => {
  const fileFolder = 'files';
  const initName = 'wrongFilename.txt';
  const newName = 'properFilename.md';

  const oldPath = join(__dirname, fileFolder, initName);
  const newPath = join(__dirname, fileFolder, newName);

  try {
    if ((await isExist(newPath)) || !(await isExist(oldPath))) {
      throw new Error('FS operation failed');
    }

    await fsRename(oldPath, newPath);
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

rename();
