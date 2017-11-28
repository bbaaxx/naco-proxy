import staticServe from 'koa-static';

export default {
  'GET /version': {
    handler: async ctx => {
      ctx.body = {
        name: 'naco-proxy',
        version: '0.0.1',
      };
    },
  },
  'GET /*': {
    handler: staticServe('src/client'),
  },
};
