import dotenv from 'dotenv';

if (dotenv && typeof dotenv.config === 'function') dotenv.config();

const { env } = process;

export function getRequiredVar(key) {
  const value = env[key];
  if (value === void 0) {
    throw new Error(`I need a "${key}" env variable to work`);
  } else {
    return { [key]: value };
  }
}

export function getVar(key) {
  return { [key]: env[key] };
}

export default (vars = []) =>
  vars.map(getRequiredVar).reduce((acc, ev) => ({ ...acc, ...ev }), {...env});
