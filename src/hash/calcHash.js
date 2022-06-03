import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const calculateHash = async () => {
  try {
    const fileFolder = 'files';
    const fileName = 'fileToCalculateHashFor.txt';
    const filePath = join(__dirname, fileFolder, fileName);

    const file = await readFile(filePath);

    return createHash('sha256')
      .update(file)
      .digest('hex');
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

console.log(await calculateHash());
