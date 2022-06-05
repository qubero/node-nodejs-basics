import { access, readdir } from 'fs/promises';
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

export const list = async () => {
  const folderName = 'files';
  const folderPath = join(__dirname, folderName);

  try {
    if (!(await isExist(folderPath))) {
      throw new Error('FS operation failed');
    }

    const entries = await readdir(folderPath);
    console.log(entries);
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

list();
