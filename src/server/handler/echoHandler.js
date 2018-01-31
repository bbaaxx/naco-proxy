// @flow
import { Context } from 'koa';

export function echoPropHandler(propName: string) {
  return async (ctx: Context, next: () => void) => {
    await next();
    ctx.body = ctx.request.body[propName];
  };
}

export function echoParam(urlParam: string) {
  return async (ctx: Context, next: () => void) => {
    const toEcho = ctx.params[urlParam];
    await next();
    ctx.body = toEcho;
  };
}
