// @flow
import clientHandlers from './clientHandler';
import { parse as jsonLint } from 'jsonlint';
import { Context } from 'koa';

const requestHandler = propName => async (ctx: Context, next: () => void) => {
  await next();
  ctx.body = ctx.request.body[propName];
};

const jsonLintPath = propName =>
  async function jsonLintAt(ctx: Context, next: () => void) {
    const responseJson = ctx.request.body[propName];
    // Anti-pattern from the book
    try {
      ctx.request.body[propName] = jsonLint(responseJson);
    } catch (e) {
      ctx.throw(400, 'Invalid response JSON', e);
    }
    await next();
  };

export default {
  'GET /mocker/:mockId?': {
    handler: async (ctx: Context, next: () => void) => {
      // check the DB for a match
      await next();
      ctx.body = {
        mockId: ctx.params.mockId,
        mockHeader: ctx.headers['x-naco-mock'],
      };
    },
  },
  'POST /request': {
    middleware: [jsonLintPath('responseBody')],
    handler: requestHandler('responseBody'),
  },
  'GET /version': {
    handler: (ctx: Context) => {
      ctx.body = { name: 'naco-proxy', version: '0.0.1' };
    },
  },
  'GET /__webpack_hmr': { handler: clientHandlers.hotMiddleware },
  'GET /*': { handler: clientHandlers.devMiddleware },
};
