// @flow
import { Context } from 'koa';
import { Document } from 'camo';

export function queryCollection(
  DataModel: Document,
  query: any = {},
  statePath: string = 'data',
  options?: { populate?: boolean } = {},
) {
  return async (ctx: Context, next: () => mixed) => {
    ctx.state[statePath] = await DataModel.find(query, options);
    await next();
  };
}

export function createEntry(DataModel: Document, statePath: string = 'data') {
  return async (ctx: Context, next: () => mixed) => {
    const newEntry = DataModel.create(ctx.request.body);
    const saveResult = await newEntry.save();
    ctx.state[statePath] = saveResult;
    await next();
  };
}

export function getByKeyProp(
  DataModel: Document,
  keyProp: string,
  statePath?: string = 'data',
  options?: { populate?: boolean } = {},
) {
  return async (ctx: Context, next: () => mixed) => {
    const queryValue = ctx.params[keyProp];
    ctx.state[statePath] = await DataModel.findOne(
      { [keyProp]: queryValue },
      options,
    );
    await next();
  };
}

export function updateByKeyProp(
  DataModel: Document,
  keyProp: string,
  statePath: string = 'data',
) {
  return async (ctx: Context, next: () => mixed) => {
    const newEntry = ctx.request.body;
    const updatedEntry = await DataModel.findOneAndUpdate(
      { [keyProp]: newEntry[keyProp] },
      newEntry,
      { upsert: true },
    );
    ctx.state[statePath] = updatedEntry;
    await next();
  };
}

export function deleteByKeyProp(
  DataModel: Document,
  keyProp: string,
  statePath: string = 'data',
) {
  return async (ctx: Context, next: () => mixed) => {
    const queryValue = ctx.params[keyProp];
    const entryToDelete = await DataModel.findOne({
      [keyProp]: queryValue,
    });
    ctx.state[statePath] = await entryToDelete.delete();
    await next();
  };
}

// Sugar
export function allEntries(
  DataModel: Document,
  statePath: string = 'data',
  options?: { populate?: boolean } = {},
) {
  return queryCollection(DataModel, {}, statePath, options);
}

export function getById(
  DataModel: Document,
  statePath: string = 'data',
  options?: any = {},
) {
  return getByKeyProp(DataModel, '_id', statePath, options);
}
export function updateById(
  DataModel: Document,
  statePath: string = 'data',
  options?: any = {},
) {
  return updateByKeyProp(DataModel, '_id', statePath, options);
}
export function deleteById(
  DataModel: Document,
  statePath: string = 'data',
  options?: any = {},
) {
  return deleteByKeyProp(DataModel, '_id', statePath, options);
}
