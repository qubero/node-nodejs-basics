import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

export const transform = async () => {
  try {
    const rs = process.stdin;
    const ws = process.stdout;

    const ts = new Transform({
      transform(chunk, _, cb) {
        cb(null, String(chunk).split('').reverse().join(''));
      },
    });

    await pipeline(rs, ts, ws);
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

transform();
