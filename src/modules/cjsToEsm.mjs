import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { dirname, join, sep } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import './files/c.js';

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const getUnknownObject = () => {
  const random = Math.random();
  const fileName = random > 0.5 ? 'a.json' : 'b.json';
  const file = join(__dirname, 'files', fileName);

  return require(file);
};

const unknownObject = getUnknownObject();

const createMyServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

export {
  unknownObject,
  createMyServer,
};
