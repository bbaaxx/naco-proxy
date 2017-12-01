import Koa from 'koa';
import path from 'path';
import kcors from 'kcors';
import _debug from 'debug';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import favicon from 'koa-favicon';
import jsonError from 'koa-json-error';
import bodyParser from 'koa-bodyparser';
import { Serializer } from 'jsonapi-serializer';

import getEnv from './getEnv';
import configureRouter from './router';

const requiredEnvVars = ['APP_ID', 'FAVICON', 'NODE_ENV', 'PORT'];

export default function(options) {
  const _env = getEnv(requiredEnvVars);
  const debug = _debug(_env.APP_ID);
  const app = new Koa();

  const router = configureRouter();
  if (_env.NODE_ENV === 'development') app.use(logger('development'));

  // Expose debug() to ctx
  app.use(async (ctx, next) => {
    ctx.debug = debug;
    await next();
  });

  // Expose JSONAPISerializer to ctx
  app.use(async (ctx, next) => {
    ctx.serializer = (type, opts) => new Serializer(type, opts);
    await next();
  });

  // @see https://github.com/koajs/json-error
  app.use(
    jsonError({
      postFormat: (_, errorObj) =>
        _env.NODE_ENV === 'production'
          ? { ...errorObj, stack: 'stack is stripped off for production' }
          : errorObj,
    }),
  );

  app.use(kcors());
  app.use(helmet());
  app.use(bodyParser());
  app.use(favicon(_env.FAVICON));
  app.use((ctx, next) => next());
  app.use(router.middleware());

  return app;
}
