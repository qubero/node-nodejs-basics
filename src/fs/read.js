import { access, readFile } from 'fs/promises';
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

export const read = async () => {
  const fileFolder = 'files';
  const fileName = 'fileToRead.txt';
  const filePath = join(__dirname, fileFolder, fileName);

  try {
    if (!(await isExist(filePath))) {
      throw new Error('FS operation failed');
    }

    const content = await readFile(filePath, 'utf8');
    console.log(content);
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

read();
