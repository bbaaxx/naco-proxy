export function* genFromArray(anArray) {
  for (let i = 0; i < anArray.length; i += 1) {
    yield anArray[i];
  }
}

export function* fibonacciGen(n = 0) {
  let current = 0;
  let next = 1;
  let toIndex = n;
  while (toIndex - 1) {
    toIndex -= 1;
    yield current;
    [current, next] = [next, current + next];
  }
}

export function fibonacciBase(n) {
  let current = 0;
  let next = 1;
  const retA = [];
  while (n - 1) {
    retA.push(current);
    [current, next] = [next, current + next];
    n -= 1; // eslint-disable-line
  }
  return retA;
}
