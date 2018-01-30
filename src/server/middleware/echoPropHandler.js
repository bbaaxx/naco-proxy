// @flow
import { Context } from 'koa';

export default (propName: string) => async (ctx: Context, next: () => void) => {
  await next();
  ctx.body = ctx.request.body[propName];
};
