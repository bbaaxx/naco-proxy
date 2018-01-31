// @flow-disabled
import { Context } from 'koa';
import Collection from '../datamodel/Collection';
// import jsonLintPath from '../middleware/jsonLintPath';

export default {
  'GET /mocker/:accessKey/*': {
    middleware: [
      async (ctx, next) => {
        const { accessKey } = ctx.params;
        const collection = await Collection.findOne({ accessKey });
        ctx.state.collection = collection;
        ctx.state.mocks = collection.mocks;
        await next();
      },
    ],
    handler: (ctx: Context) => {
      const { mocks } = ctx.state;
      const mock = mocks.find(mock =>
        new RegExp(mock.uriPath).test(ctx.request.url),
      );
      if (mock) {
        const { response } = mock;
        ctx.status = response.status;
        ctx.body = response.body;
      }
    },
  },
};
