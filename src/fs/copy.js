import { mkdir, readdir, copyFile, access } from 'fs/promises';
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

export const copy = async (src, dest) => {
  const initFolder = 'files';
  const copyFolder = initFolder + '_copy';

  const initPath = src || join(__dirname, initFolder);
  const copyPath = dest || join(__dirname, copyFolder);

  try {
    if ((await isExist(copyPath) || !(await isExist(initPath)))) {
      throw new Error('FS operation failed');
    }

    const entries = await readdir(initPath, { withFileTypes: true });
    await mkdir(copyPath);

    for (const entry of entries) {
      const nestedInitPath = join(initPath, entry.name);
      const nestedCopyPath = join(copyPath, entry.name);

      if (entry.isDirectory()) {
        copy(nestedInitPath, nestedCopyPath);
      }

      if (entry.isFile()) {
        copyFile(nestedInitPath, nestedCopyPath);
      }
    }
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

copy();
