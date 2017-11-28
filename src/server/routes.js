export default {
  'GET /': {
    handler: async ctx => {
      ctx.body = {
        name: 'koa-api-boilerplate',
        version: 'x.x.x',
      };
    },
  },
};
