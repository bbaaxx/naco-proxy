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
import { mapStateArrayProp } from '../helper/state';
import { stripSecretMiddleware } from '../middleware/userToState';

const dataPath = 'user';

export default {
  // C
  'POST /users': {
    middleware: [createEntry(User, dataPath), stripSecretMiddleware],
    handler: dataPathToBody(dataPath),
  },

  // R
  'GET /users': {
    middleware: [allEntries(User, dataPath), stripSecretMiddleware],
    handler: dataPathToBody(dataPath),
  },
  'GET /users/:_id': {
    middleware: [getById(User, dataPath), stripSecretMiddleware],
    handler: dataPathToBody(dataPath),
  },

  // U ?
  //

  // D
  'DELETE /users/:_id': {
    middleware: [deleteById(User, dataPath)],
    handler: dataPathToBody(dataPath),
  },
};
