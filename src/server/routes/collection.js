// @flow
import { Context } from 'koa';
import { generate as genKey } from 'shortid';

import Collection from '../datamodel/Collection';
import userToState from '../middleware/userToState';
import {
  getById,
  createEntry,
  allEntries,
  deleteById,
} from '../middleware/crudToState';

import { dataPathToBody } from '../handler/crudHandler';

import mockRoutes from './mock';

const appendAccessKey = async (ctx, next) => {
  ctx.request.body.accessKey = genKey();
  await next();
};

const setUserId = async (ctx, next) => {
  ctx.request.body.user = ctx.state.user._id;
  await next();
};

export default {
  'GET /collections': {
    middleware: [userToState(), allEntries(Collection)],
    handler: dataPathToBody(),
  },
  'GET /collections/:_id': {
    middleware: [userToState(), getById(Collection)],
    handler: dataPathToBody(),
  },
  'POST /collections': {
    middleware: [
      userToState(),
      setUserId,
      appendAccessKey,
      createEntry(Collection),
    ],
    handler: dataPathToBody(),
  },
  'DELETE /collections/:_id': {
    middleware: [userToState(), deleteById(Collection)],
    handler: dataPathToBody(),
  },
  'DELETE /collections': {
    middleware: [
      userToState(),
      async (ctx, next) => {
        ctx.state.data = await Collection.deleteMany({});
        await next();
      },
    ],
    handler: dataPathToBody(),
  },

  // add child routes
  ...mockRoutes,
};
