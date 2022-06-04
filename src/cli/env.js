export const parseEnv = () => {
  try {
    const prefix = 'RSS_';

    const envVars = Object.entries(process.env)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => `${key}=${value}`);

    console.log(envVars.join('; '));
  } catch (err) {
    console.error(err.name, '-', err.message);
  }
};

parseEnv();
