// @flow
import { Context } from 'koa';
import User from '../datamodel/User';

import { dataPathToBody } from '../handler/crudHandler';
import {
  getById,
  createEntry,
  allEntries,
  deleteById,
} from '../middleware/crudToState';
import {
  stripSecretMiddleware,
  issueUserTokenMiddleware,
  pickCredentialsFromBody,
  logUserIn,
} from '../middleware/userToState';
import { mapStateArrayProp } from '../helper/state';

const statePath = 'user';

export default {
  // C
  'POST /users': {
    middleware: [createEntry(User, statePath), stripSecretMiddleware()],
    handler: dataPathToBody(statePath),
  },
  'POST /register': {
    middleware: [
      createEntry(User, statePath),
      issueUserTokenMiddleware(statePath),
    ],
    handler: dataPathToBody(statePath),
  },
  'POST /login': {
    middleware: [
      pickCredentialsFromBody(statePath),
      logUserIn(statePath),
      issueUserTokenMiddleware(statePath),
    ],
    handler: dataPathToBody(statePath),
  },

  // R
  'GET /users': {
    middleware: [allEntries(User, statePath), stripSecretMiddleware()],
    handler: dataPathToBody(statePath),
  },
  'GET /users/:_id': {
    middleware: [getById(User, statePath), stripSecretMiddleware()],
    handler: dataPathToBody(statePath),
  },

  // U ?
  //

  // D
  'DELETE /users/:_id': {
    middleware: [deleteById(User, statePath)],
    handler: dataPathToBody(statePath),
  },
};
