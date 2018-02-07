export const mapStateArrayProp = (prop, f) => async (ctx, next) => {
  const stateArray = ctx.state[prop];
  if (Array.isArray(stateArray)) {
    ctx.state[prop] = stateArray.map(f);
  } else {
    ctx.throw('400', 'Type Error: Expected an array', { [prop]: stateArray });
  }
  await next();
};

export const pickPaths = (ctx, ...paths) => paths.map(path => ctx.state[path]);
