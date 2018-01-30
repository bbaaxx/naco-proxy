// @flow
import { Context } from 'koa';
import Collection from '../datamodel/Collection';

export default {
  'GET /collections': {
    handler: async (ctx: Context, next: () => mixed) => {
      const allCollections = await Collection.find();
      await next();
      ctx.body = allCollections;
    },
  },

  'GET /collections/:collectionId': {
    handler: async (ctx: Context, next: () => mixed) => {
      const { collectionId } = ctx.params;
      let collection = {};
      try {
        collection = await Collection.findOne({ _id: collectionId });
      } catch (e) {
        console.log('Error handler missing for error: ', e);
      }
      await next();
      ctx.body = collection;
    },
  },

  'POST /collections': {
    handler: async (ctx: Context, next: () => mixed) => {
      const newCollectionData = ctx.request.body;
      let newCollection = {};
      try {
        newCollection = await Collection.findOneAndUpdate(
          { key: newCollectionData.key },
          newCollectionData,
          { upsert: true },
        );
      } catch (e) {
        console.log('Error handler missing for error: ', e);
      }
      await next();
      ctx.body = ctx.body = { id: newCollection._id };
    },
  },

  'DELETE /collections/:collectionId': {
    handler: async (ctx: Context, next: () => mixed) => {
      const { collectionId } = ctx.params;
      try {
        await Collection.findOneAndDelete({ _id: collectionId });
      } catch (e) {
        console.log('Error handler missing for error: ', e);
      }
      await next();
      ctx.body = { ok: true };
    },
  },
};
