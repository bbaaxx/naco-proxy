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

const requiredEnvVars = ['APP_ID', 'NODE_ENV', 'PORT'];

export default function() {
  const _env = getEnv(requiredEnvVars);
  const debug = _debug(_env.APP_ID || 'koa-app');

  const app = new Koa();

  const router = configureRouter();
  if (_env.NODE_ENV === 'development') app.use(logger('development'));

  // Expose debug() to ctx
  app.use(async (ctx, next) => {
    ctx.debug = debug;
    await next();
  });

  app.use(async (ctx, next) => {
    ctx.debug('Start the party');
    await next();
    ctx.debug('End of the party');
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
          ? { ...errorObj, stack: 'stripped off for production' }
          : errorObj,
    }),
  );

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
