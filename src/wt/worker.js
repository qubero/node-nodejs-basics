import { workerData, parentPort } from 'worker_threads';

// n should be received from main thread
export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  const numToCount = parseInt(workerData.numToCount);

  if (isNaN(numToCount) || numToCount < 0) {
    throw new Error('Invalid argument');
  }

  const value = nthFibonacci(numToCount);

  parentPort.postMessage({
    nthFibonacciValue: value,
  });
};

sendResult();
