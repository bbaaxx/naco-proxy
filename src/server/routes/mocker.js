// @flow-disabled
import { Context } from 'koa';
import Collection from '../datamodel/Collection';
import Mock from '../datamodel/Mock';
// import jsonLintPath from '../middleware/jsonLintPath';
import { userToState } from '../middleware/userToState';
import { allEntries } from '../middleware/crudToState';

import { dataPathToBody } from '../handler/crudHandler';

export default {
  'GET /mocker/:accessKey/*': {
    middleware: [
      async (ctx, next) => {
        const { accessKey } = ctx.params;
        console.log('my accessKey', accessKey);
        const collection = await Collection.findOne({ accessKey });
        ctx.state.collection = collection;
        ctx.state.mocks = collection.mocks;
        await next();
      },
    ],
    handler: async (ctx: Context, next) => {
      const { mocks, collection } = ctx.state;
      console.log('okok');
      const mock = mocks.find(mock =>
        new RegExp(mock.uriPath).test(ctx.request.url),
      );
      if (mock) {
        const mockResponse = mock.response;
        ctx.response.status = mockResponse.status;
        ctx.response.body = mockResponse.body;
        Object.keys(mockResponse.headers || {}).forEach(header =>
          ctx.response.set(header, mockResponse.headers[header]),
        );
      } else if (collection.proxy) {
        console.log('I will proxzy diz');
        ctx.body = { yolo: 'yolo' };
      }
      await next();
    },
  },
};
