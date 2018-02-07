// @flow
import { Context } from 'koa';
import { Document } from 'camo';
import * as crud from '../helper/crud';
import { pickPaths } from '../helper/state';

export function createEntry(DataModel: Document, statePath: string = 'data') {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.state[statePath] = await crud.createAndSaveDocument(
      DataModel,
      ctx.request.body,
    );
    await next();
  };
}

export function queryCollection(
  DataModel: Document,
  query: any = {},
  statePath: string = 'data',
  options?: any,
) {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.state[statePath] = await crud.findDocuments(DataModel, query, options);
    await next();
  };
}

export function getByKeyProp(
  DataModel: Document,
  keyProp: string,
  statePath?: string = 'data',
  options?: any = {},
) {
  return async (ctx: Context, next: () => Promise<any>) => {
    const query = { [keyProp]: ctx.params[keyProp] };
    ctx.state[statePath] = await crud.findDocument(DataModel, query, options);
    await next();
  };
}

export function updateByKeyProp(
  DataModel: Document,
  keyProp: string,
  statePath: string = 'data',
  options: any = {},
) {
  return async (ctx: Context, next: () => Promise<any>) => {
    const data = ctx.request.body;
    const query = { [keyProp]: data[keyProp] };
    ctx.state[statePath] = await crud.updateDocument(
      DataModel,
      query,
      data,
      options,
    );
    await next();
  };
}

export function deleteByKeyProp(
  DataModel: Document,
  keyProp: string,
  statePath: string = 'data',
  options: any = {},
) {
  return async (ctx: Context, next: () => Promise<any>) => {
    const query = { [keyProp]: ctx.params[keyProp] };
    ctx.state[statePath] = await crud.deleteDocument(DataModel, query, options);
    await next();
  };
}

export const pushChildToParent = (
  childPath: string,
  parentPath: string,
  parentPropPath: string,
) => async (ctx: Context, next: () => Promise<any>) => {
  const [Child, Parent] = pickPaths(ctx, childPath, parentPath);
  await crud.pushToParentProp(Child, Parent, parentPropPath);
  await next();
};

// Sugar
export function allEntries(
  DataModel: Document,
  statePath: string = 'data',
  options?: any,
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
  return updateByKeyProp(DataModel, '_id', statePath);
}
export function deleteById(
  DataModel: Document,
  statePath: string = 'data',
  options?: any = {},
) {
  return deleteByKeyProp(DataModel, '_id', statePath);
}
