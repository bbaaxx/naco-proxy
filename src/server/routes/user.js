// @flow
import { Context } from 'koa';
import User from '../datamodel/User';

export default {
  'GET /users': {
    handler: async (ctx: Context, next: () => mixed) => {
      const allUsers = await User.find();
      await next();
      ctx.body = allUsers;
    },
  },
  'GET /users/:userId': {
    handler: async (ctx: Context, next: () => mixed) => {
      const { userId } = ctx.params;
      let user = {};
      try {
        user = await User.findOne({ _id: userId });
      } catch (e) {
        console.log('Error handler missing for error: ', e);
      }
      await next();
      ctx.body = user;
    },
  },
  'POST /users': {
    handler: async (ctx: Context, next: () => mixed) => {
      const newUserData = ctx.request.body;
      let newUser = {};
      try {
        newUser = await User.findOneAndUpdate(
          { email: newUserData.email },
          newUserData,
          { upsert: true },
        );
      } catch (e) {
        console.log('Error handler missing for error: ', e);
      }
      await next();
      ctx.body = ctx.body = { id: newUser._id };
    },
  },
  'DELETE /users/:userId': {
    handler: async (ctx: Context, next: () => mixed) => {
      const { userId } = ctx.params;
      try {
        await User.findOneAndDelete({ _id: userId });
      } catch (e) {
        console.log('Error handler missing for error: ', e);
      }
      await next();
      ctx.body = { ok: true };
    },
  },
};
