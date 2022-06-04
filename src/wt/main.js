import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculationWorker = (numToCount) => {
  return new Promise((resolve, _) => {
    const workerName = 'worker.js';
    const workerPath = join(__dirname, workerName);

    const worker = new Worker(workerPath, {
      workerData: { numToCount },
    });

    worker.on('message', (data) => {
      resolve({
        status: 'resolved',
        data: data.nthFibonacciValue,
      });
    });

    worker.on('error', () => {
      resolve({
        status: 'error',
        data: null,
      });
    });
  });
};

export const performCalculations = async () => {
  const numOfCpus = cpus().length;
  const startNum = 10;
  const result = [];

  for (let i = startNum; i < startNum + numOfCpus; i++) {
    result.push(calculationWorker(i));
  }

  console.log(await Promise.all(result));
};

performCalculations();
