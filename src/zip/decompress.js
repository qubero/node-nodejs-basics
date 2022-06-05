import { createGunzip } from 'zlib';
import { open } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const decompress = async () => {
  try {
    const fileFolder = 'files';
    const fileName = 'fileToCompress.txt';
    const archiveName = 'archive.gz';

    const filePath = join(__dirname, fileFolder, fileName);
    const archivePath = join(__dirname, fileFolder, archiveName);

    const rs = (await open(archivePath, 'r')).createReadStream();
    const ws = (await open(filePath, 'w')).createWriteStream();
    const gunzip = createGunzip();

    await pipeline(rs, gunzip, ws);
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

decompress();
