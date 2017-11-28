import _debug from 'debug';

export const debug = _debug('naco-proxy');

export const checkEnv = key => {
  if (!process.env[key]) {
    throw new Error(`a ${key} enviromental variable is required`);
  }
};

export const getEnv = key => {
  checkEnv(key);
  return String(process.env[key]);
};
