// @flow
import { Context } from 'koa';
import { Document } from 'camo';

export function allEntries(DataModel: Document, statePath: string = 'data') {
  return async (ctx: Context, next: () => mixed) => {
    ctx.state[statePath] = await DataModel.find();
    await next();
  };
}

export function createEntry(DataModel: Document, statePath: string = 'data') {
  return async (ctx: Context, next: () => mixed) => {
    const newEntry = DataModel.create(ctx.request.body);
    const saveResult = await newEntry.save();
    console.log('saveResult', saveResult);
    ctx.state[statePath] = saveResult;
    await next();
  };
}

export function getByKeyProp(
  DataModel: Document,
  keyProp: string,
  statePath: string = 'data',
) {
  return async (ctx: Context, next: () => mixed) => {
    const queryValue = ctx.params[keyProp];
    ctx.state[statePath] = await DataModel.findOne({ [keyProp]: queryValue });
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
    ctx.state[statePath] = await DataModel.findOneAndDelete({
      [keyProp]: queryValue,
    });
    await next();
  };
}

// Sugar
export function getById(DataModel: Document, statePath: string = 'data') {
  return getByKeyProp(DataModel, '_id', statePath);
}
export function updateById(DataModel: Document, statePath: string = 'data') {
  return updateByKeyProp(DataModel, '_id', statePath);
}
export function deleteById(DataModel: Document, statePath: string = 'data') {
  return deleteByKeyProp(DataModel, '_id', statePath);
}
