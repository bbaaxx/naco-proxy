import Koa from 'koa';
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
import database from './database';

const requiredEnvVars = ['APP_ID', 'NODE_ENV', 'PORT'];

export default function() {
  const _env: { APP_ID: string, NODE_ENV: string, PORT: number } = getEnv(
    requiredEnvVars,
  );

  const app = new Koa();

  const debug = _debug(_env.APP_ID);
  const router = configureRouter();

  if (_env.NODE_ENV === 'development') app.use(logger('development'));

  // error handling, @see https://github.com/koajs/json-error
  app.use(
    jsonError({
      postFormat: (_, errorObj) =>
        _env.NODE_ENV === 'production'
          ? { ...errorObj, stack: 'stripped off for production' }
          : errorObj,
    }),
  );

  // Expose services (debug, db, ...) to ctx
  app.use(async (ctx, next) => {
    ctx.debug = debug;
    ctx.db = await database;
    ctx.serializer = (type, opts) => new Serializer(type, opts);
    await next();
  });

  // Do CORS
  app.use(kcors());

  // Do safe headers
  // app.use(helmet());

  // Parse the body
  app.use(bodyParser());

  // Serve a favicon if available
  if (_env.FAVICON !== void 0) {
    app.use(favicon(_env.FAVICON));
  }

  // route the routes
  app.use(router.middleware());

  return app;
}
