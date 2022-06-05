import { fork } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const spawnChildProcess = async (args) => {
  try {
    const fileFolder = 'files';
    const fileName = 'script.js';
    const modulePath = join(__dirname, fileFolder, fileName);

    const cp = fork(modulePath, args);

    cp.on('error', (err) => {
      console.error(err.name, '-', err.message);
    });

    cp.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

const processArgs = process.argv.slice(2);

spawnChildProcess(processArgs.length ? processArgs : ['arg1', 'arg2']);
