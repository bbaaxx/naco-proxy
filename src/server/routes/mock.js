// @flow
import { Context } from 'koa';
import Mock from '../datamodel/Mock';

import {
  getById,
  updateByKeyProp,
  allEntries,
  deleteById,
} from '../middleware/crudToState';

import { dataPathToBody } from '../handler/crudHandler';

export default {
  'GET /collection/:collectionId/mocks': {
    middleware: [allEntries(Mock)],
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
