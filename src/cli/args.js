export const parseArgs = () => {
  try {
    const processArgs = process.argv;
    const prefix = '--';
    const argVars = [];

    for (const [i, v] of processArgs.entries()) {
      if (v.startsWith(prefix)) {
        const argVar = `${v.slice(2)} is ${processArgs[i + 1]}`;
        argVars.push(argVar);
      }
    }

    console.log(argVars.join(', '));
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

parseArgs();
