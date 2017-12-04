function Identity(value) {
  return {
    map: fn => Identity(fn(value)),
    valueOf: () => value,
    toString: () => `Identity(${value})`,
    [Symbol.iterator]: () => {
      let first = true;
      return {
        next: () => {
          if (first) {
            first = false;
            return { done: false, value };
          }
          return { done: true };
        },
      };
    },
  };
}

Object.assign(Identity, {
  toString: () => 'Identity',
  is: x => typeof x.map === 'function',
});

export default Identity;
