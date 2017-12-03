import clientHandlers from './clientHandler';

export default {
  'GET /mocker/:id': {
    handler: async (ctx, next) => {
      await next();
      ctx.body = { id: ctx.params.id, ch: ctx.headers['x-yoloman'] };
    },
  },
  'GET /version': {
    handler: ctx => {
      ctx.body = { name: 'naco-proxy', version: '0.0.1' };
    },
  },
  'GET /isom': {
    handler: ctx => {
      ctx.body = `
      <h1>YoloWorld !</h1>
      `;
    },
  },
  'GET /__webpack_hmr': { handler: clientHandlers.hotMiddleware },
  'GET /*': { handler: clientHandlers.devMiddleware },
};
