// @flow
import { Context } from 'koa';
import jsonLintPath from '../middleware/jsonLintPath';
import { echoPropHandler, echoParam } from '../handler/echoHandler';

export default {
  'GET /version': {
    handler: (ctx: Context) => {
      ctx.body = { name: 'naco-proxy', version: '0.0.1' };
    },
  },
  'GET /ping': {
    handler: async (ctx: Context, next: () => mixed) => {
      const pong = 'pong';
      await next();
      ctx.body = pong;
    },
  },
  'GET /echo-param/:echoMe': {
    handler: echoParam('echoMe'),
  },
  'POST /echo-prop': {
    middleware: [jsonLintPath('responseBody')],
    handler: echoPropHandler('responseBody'),
  },
};
