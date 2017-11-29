import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import jsonError from 'koa-json-error';
import favicon from 'koa-favicon';
import _debug from 'debug';
import path from 'path';
import { Serializer } from 'jsonapi-serializer';

import configureRouter from './router';

const faviconFile = path.resolve('src/client/assets/favicon.ico');

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
    ctx.serializer = (type, opts) => {
      return new Serializer(type, opts);
    };
    await next();
  });
  // @see https://github.com/koajs/json-error
  app.use(jsonError({
    postFormat: (e, errorObj) => {
      const prodErrorObj = {...errorObj};
      delete prodErrorObj.stack;
      return config.env === 'production' ? prodErrorObj : errorObj;
    },
  }));
  app.use(cors());

  // @see https://github.com/helmetjs/helmet
  app.use(helmet());

  // @see https://github.com/tunnckoCore/koa-better-body
  // app.use(convert(bodyParser()));
  app.use(bodyParser());

  // Use configured router
  app.use(favicon(config.favicon));
  app.use(router.middleware());

  return app;
}
