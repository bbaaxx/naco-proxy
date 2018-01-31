// @flow
import { Context } from 'koa';
import Collection from '../datamodel/Collection';
import Mock from '../datamodel/Mock';

import {
  getById,
  updateByKeyProp,
  allEntries,
  deleteById,
} from '../middleware/crudToState';

import { dataPathToBody } from '../handler/crudHandler';

const getDataPath = (dataPath, keyProp = 'data') => async (ctx, next) => {
  const data = ctx.state[keyProp][dataPath];
  ctx.state[keyProp] = data;
  await next();
};

export default {
  'GET /collection/:_id/mocks': {
    middleware: [getById(Collection), getDataPath('mocks')],
    handler: dataPathToBody(),
  },
  'GET /collection/:collectionId/mock/:_id': {
    middleware: [getById(Mock)],
    handler: dataPathToBody(),
  },
  'POST /collection/:collectionId/mocks': {
    middleware: [updateByKeyProp(Mock, 'accessKey')],
    handler: dataPathToBody(),
  },
  'DELETE /collection/:collectionId/mocks/:_id': {
    middleware: [deleteById(Mock)],
    handler: dataPathToBody(),
  },
};
