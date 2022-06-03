import { createGzip } from 'zlib';
import { open } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const compress = async () => {
  try {
    const fileFolder = 'files';
    const fileName = 'fileToCompress.txt';
    const archiveName = 'archive.gz';

    const filePath = join(__dirname, fileFolder, fileName);
    const archivePath = join(__dirname, fileFolder, archiveName);

    const rs = (await open(filePath, 'r')).createReadStream();
    const ws = (await open(archivePath, 'w+')).createWriteStream();
    const gzip = createGzip();

    await pipeline(rs, gzip, ws);
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

compress();
