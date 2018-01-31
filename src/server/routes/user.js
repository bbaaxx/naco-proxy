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
import { stripSecret } from '../middleware/userToState';

const dataPath = 'data';
const preventSecrets = { populate: false };

export default {
  'GET /users': {
    middleware: [allEntries(User, dataPath, preventSecrets)],
    handler: dataPathToBody(dataPath),
  },
  'GET /user/:_id': {
    middleware: [getById(User, dataPath)],
    handler: dataPathToBody(dataPath),
  },
  'POST /users': {
    middleware: [createEntry(User, dataPath), stripSecret],
    handler: dataPathToBody(dataPath),
  },
  'DELETE /user/:_id': {
    middleware: [deleteById(User, dataPath)],
    handler: dataPathToBody(dataPath),
  },
};
