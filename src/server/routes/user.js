// @flow
import { Context } from 'koa';
import User from '../datamodel/User';
import {
  getAll,
  getOneByKeyProp,
  updateByKeyProp,
  deleteById,
} from '../handler/crudHandler';

export default {
  'GET /users': {
    handler: getAll(User),
  },
  'GET /users/:_id': {
    handler: getOneByKeyProp(User, '_id'),
  },
  'POST /users': {
    handler: updateByKeyProp(User, 'email'),
  },
  'DELETE /users/:_id': {
    handler: deleteById(User),
  },
};
