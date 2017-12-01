import dotenv from 'dotenv';

if (dotenv && typeof dotenv.config === 'function') dotenv.config();

const { env } = process;

export function getVar(key) {
  const value = env[key];
  if (value === void 0) {
    throw new Error(`I need a "${key}" env variable to work`);
  } else {
    return { [key]: value };
  }
}

export default vars =>
  vars.map(getVar).reduce((acc, ev) => ({ ...acc, ...ev }), {});
