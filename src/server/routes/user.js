// @flow
import { Context } from 'koa';
import User from '../datamodel/User';

import {
  getById,
  createEntry,
  allEntries,
  deleteById,
} from '../middleware/crudToState';

import { dataPathToBody } from '../handler/crudHandler';

export default {
  'GET /users': {
    middleware: [allEntries(User)],
    handler: dataPathToBody(),
  },
  'GET /user/:_id': {
    middleware: [getById(User)],
    handler: dataPathToBody(),
  },
  'POST /users': {
    middleware: [createEntry(User)],
    handler: dataPathToBody(),
  },
  'DELETE /user/:_id': {
    middleware: [deleteById(User)],
    handler: dataPathToBody(),
  },
};
