export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
export const trace = (label = 'log') => value => {
  console.log(`${label}: ${value}`);
  return value;
};
