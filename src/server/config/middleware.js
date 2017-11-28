import { Serializer } from 'jsonapi-serializer';
import { debug } from './util';

export const debugMiddleware = () => (ctx, next) => {
  ctx.debug = debug;
  return next();
};

export const serializerMiddleware = () => (ctx, next) => {
  ctx.serializer = (type, opts) => {
    return new Serializer(type, opts);
  };
  return next();
};
