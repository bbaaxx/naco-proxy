// @flow
import { Context } from 'koa';
import { Document } from 'camo';

export function getAll(DataModel: Document) {
  return async (ctx: Context, next: () => mixed) => {
    const allCollections = await DataModel.find();
    await next();
    ctx.body = allCollections;
  };
}

export function getOneByKeyProp(DataModel: Document, keyProp: string = '_id') {
  return async (ctx: Context, next: () => mixed) => {
    const queryValue = ctx.params[keyProp];
    let collection = {};
    try {
      collection = await DataModel.findOne({ [keyProp]: queryValue });
    } catch (e) {
      console.log('Error handler missing for error: ', e);
    }
    await next();
    ctx.body = collection;
  };
}

export function updateByKeyProp(DataModel: Document, keyProp?: string = '_id') {
  return async (ctx: Context, next: () => mixed) => {
    const newEntry = ctx.request.body;
    let updatedEntry: {};
    try {
      updatedEntry = await DataModel.findOneAndUpdate(
        { [keyProp]: newEntry[keyProp] },
        newEntry,
        { upsert: true },
      );
    } catch (e) {
      console.log('Error handler missing for error: ', e);
    }
    await next();
    ctx.body = ctx.body = { _id: updatedEntry._id };
  };
}

export function deleteById(DataModel: Document) {
  return async (ctx: Context, next: () => mixed) => {
    const { _id } = ctx.params;
    console.log(_id);
    try {
      await DataModel.findOneAndDelete({ _id });
    } catch (e) {
      console.log('Error handler missing for error: ', e);
    }
    await next();
    ctx.body = { ok: true };
  };
}
