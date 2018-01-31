// @flow
import { Context } from 'koa';

import Collection from '../datamodel/Collection';
import userToState from '../middleware/userToState';
import {
  getById,
  updateByKeyProp,
  allEntries,
  deleteById,
} from '../middleware/crudToState';

import { dataPathToBody } from '../handler/crudHandler';

import mockRoutes from './mock';

export default {
  'GET /collections': {
    middleware: [userToState(), allEntries(Collection)],
    handler: dataPathToBody(),
  },
  'GET /collection/:_id': {
    middleware: [userToState(), getById(Collection)],
    handler: dataPathToBody(),
  },
  'POST /collections': {
    middleware: [userToState(), updateByKeyProp(Collection, 'accessKey')],
    handler: dataPathToBody(),
  },
  'DELETE /collection/:_id': {
    middleware: [userToState(), deleteById(Collection)],
    handler: dataPathToBody(),
  },

  // add child routes
  ...mockRoutes,
};
