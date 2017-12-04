import { fibonacciGen, genFromArray } from './generators';

export async function delayValue(value, delay = 0) {
  return new Promise(resolve =>
    setTimeout(() => resolve(value), delay),
  );
}

export function printGenArray(someArray = [1, 2, 3, 4, 5, 6]) {
  const gen = genFromArray(someArray);
  let item = gen.next();
  if (typeof item.done === 'boolean') {
    while (!item.done) {
      console.log(item.value);
      item = gen.next();
    }
  }
}

export async function doTheHookyPooky() {
  const gen = fibonacciGen();
  let cgv = gen.next();
  for (let i = 0; i < 20; i += 1) {
    console.log(cgv.value);
    cgv = gen.next();
  }
  // console.log(...fibonacciBase(20));

  return delayValue(printGenArray('hookypooky'.split('')), 2000);
}
