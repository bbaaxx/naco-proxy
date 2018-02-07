// @flow
import { Context } from 'koa';

export function dataPathToBody(dataPath: string = 'data') {
  return async (ctx: Context, next: () => mixed) => {
    await next();
    ctx.body = ctx.state[dataPath];
  };
}
