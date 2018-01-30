// @flow
import { Context } from 'koa';
import jsonLintPath from '../middleware/jsonLintPath';
import echoPropHandler from '../middleware/echoPropHandler';

export default {
  'GET /version': {
    handler: (ctx: Context) => {
      ctx.body = { name: 'naco-proxy', version: '0.0.1' };
    },
  },
  'POST /echo-prop': {
    middleware: [jsonLintPath('responseBody')],
    handler: echoPropHandler('responseBody'),
  },
};
