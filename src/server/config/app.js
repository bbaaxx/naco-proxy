import Koa from 'koa';
import path from 'path';
import cors from 'kcors';
import _debug from 'debug';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import favicon from 'koa-favicon';
import jsonError from 'koa-json-error';
import bodyParser from 'koa-bodyparser';
import { Serializer } from 'jsonapi-serializer';

import configureRouter from './router';

export default function(config) {
  const debug = _debug(config.appId);
  const app = new Koa();

  const router = configureRouter();
  if (config.env === 'development') app.use(logger('development'));
  // Expose debug() to ctx
  app.use(async (ctx, next) => {
    ctx.debug = debug;
    await next();
  });
  // Exposed JSONAPISerializer to ctx
  app.use(async (ctx, next) => {
    ctx.serializer = (type, opts) => new Serializer(type, opts);
    await next();
  });
  // @see https://github.com/koajs/json-error
  app.use(jsonError({
    postFormat: (_, errorObj) => {
      const prodErrorObj = { ...errorObj };
      delete prodErrorObj.stack;
      return config.env === 'production' ? prodErrorObj : errorObj;
    },
  }));

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser());
  app.use(favicon(config.favicon));
  app.use(router.middleware());

  return app;
}
