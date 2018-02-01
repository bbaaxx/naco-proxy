// @flow
import { Context } from 'koa';
import { generate as genKey } from 'shortid';
import { Document } from 'camo'; // remove this

import Collection from '../datamodel/Collection';
import userToState from '../middleware/userToState';
import {
  getById,
  createEntry,
  allEntries,
  deleteById,
  pushChildToParent,
} from '../middleware/crudToState';

import { dataPathToBody } from '../handler/crudHandler';

import mocksRoutes from './mock';

const collectionPath = 'collection';
const userPath = 'user';

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
      userToState(userPath),
      setUserId,
      appendAccessKey,
      createEntry(Collection, collectionPath),
      pushChildToParent(collectionPath, userPath, 'collections'),
    ],
    handler: dataPathToBody(collectionPath),
  },
  'DELETE /collections/:_id': {
    middleware: [deleteById(Collection)],
    handler: dataPathToBody(),
  },
  'DELETE /collections/wipe': {
    middleware: [
      async (ctx, next) => {
        ctx.state.data = await Collection.deleteMany({});
        await next();
      },
    ],
    handler: dataPathToBody(),
  },

  // add child routes
  ...mocksRoutes,
};
