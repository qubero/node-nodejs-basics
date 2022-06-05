import { access, open } from 'fs/promises';
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

export const create = async () => {
  const fileFolder = 'files';
  const fileName = 'fresh.txt';
  const fileContent = 'I am fresh and young';

  const destination = join(__dirname, fileFolder, fileName);

  let file;
  try {
    if (await isExist(destination)) {
      throw new Error('FS operation failed');
    }

    file = await open(destination, 'wx');
    file.write(fileContent);
  } catch (err) {
    console.error(err.name, '-', err.message);
  } finally {
    await file?.close();
  }
};

create();
