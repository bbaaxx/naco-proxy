// @flow-disabled
import { Context } from 'koa';
import Collection from '../datamodel/Collection';
import Mock from '../datamodel/Mock';

import {
  getById,
  allEntries,
  deleteById,
  createEntry,
  pushChildToParent,
} from '../middleware/crudToState';

import { dataPathToBody } from '../handler/crudHandler';

const [collectionPath, statePath] = ['collections', 'mocks'];

const pickDataPath = (statePath, keyProp = 'data') => async (ctx, next) => {
  const data = ctx.state[keyProp][statePath];
  ctx.state[keyProp] = data;
  await next();
};

const addMock = async (ctx, next) => {
  const collection = ctx.state.data;
  const mockBody = { ...ctx.request.body, collection: collection._id };
  const mock = await Mock.create(mockBody).save();
  collection.mocks.push(mock);
  await collection.save();
  ctx.state.data = mock;
  await next();
};

export default {
  'GET /collections/:_id/mocks': {
    middleware: [getById(Collection), pickDataPath('mocks')],
    handler: dataPathToBody(),
  },
  'GET /collections/:collectionId/mocks/:_id': {
    middleware: [getById(Mock)],
    handler: dataPathToBody(),
  },
  'POST /collections/:_id/mocks': {
    middleware: [getById(Collection), addMock],
    handler: dataPathToBody(),
  },
  'POST /collections/:_id/mocks-r': {
    middleware: [
      getById(Collection, collectionPath),
      createEntry(Mock, statePath),
      pushChildToParent(collectionPath, statePath, 'mocks'),
    ],
    handler: dataPathToBody(collectionPath),
  },
  'DELETE /collections/:collectionId/mocks/:_id': {
    middleware: [deleteById(Mock)],
    handler: dataPathToBody(),
  },
};
