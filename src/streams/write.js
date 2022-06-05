import { open } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const write = async () => {
  try {
    const fileFolder = 'files';
    const fileName = 'fileToWrite.txt';
    const filePath = join(__dirname, fileFolder, fileName);

    const ws = (await open(filePath, 'w')).createWriteStream();
    await pipeline(process.stdin, ws);
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

write();
