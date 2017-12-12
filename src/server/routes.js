// @flow
import clientHandlers from './clientHandler';
import { Context } from 'koa';

export default {
  'GET /mocker/:mockId?': {
    handler: async (ctx: Context, next: () => mixed) => {
      // check the DB for a match
      await next();
      ctx.body = {
        mockId: ctx.params.mockId,
        mockHeader: ctx.headers['x-naco-mock'],
      };
    },
  },
  'GET /version': {
    handler: (ctx: Context) => {
      ctx.body = { name: 'naco-proxy', version: '0.0.1' };
    },
  },
  'GET /isom': {
    handler: (ctx: Context) => {
      ctx.body = `<h1>${'YoloWorld'}!</h1>`;
    },
  },
  'GET /__webpack_hmr': { handler: clientHandlers.hotMiddleware },
  'GET /*': { handler: clientHandlers.devMiddleware },
};
