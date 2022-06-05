import { open } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const read = async () => {
  try {
    const fileFolder = 'files';
    const fileName = 'fileToRead.txt';
    const filePath = join(__dirname, fileFolder, fileName);

    const rs = (await open(filePath, 'r')).createReadStream();
    await pipeline(rs, process.stdout);
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

read();
