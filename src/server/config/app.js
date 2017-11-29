import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import error from 'koa-json-error';
import debug from 'debug';
import { Serializer } from 'jsonapi-serializer';

import configureRouter from './router';

const env = process.env.NODE_ENV || 'dev';
const _debug = debug('naco-proxy');

export default function() {
  const app = new Koa();
  const router = configureRouter();

  if (env === 'dev') app.use(logger('dev'));

  // Expose debug() to ctx
  app.use(async (ctx, next) => {
    ctx.debug = _debug;
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
  app.use(
    error({
      postFormat: (e, errorObj) => {
        const prodErrorObj = Object.assign({}, errorObj);
        delete prodErrorObj.stack;
        return env === 'production' ? prodErrorObj : errorObj;
      },
    }),
  );

  app.use(cors());

  // @see https://github.com/helmetjs/helmet
  app.use(helmet());

  // @see https://github.com/tunnckoCore/koa-better-body
  // app.use(convert(bodyParser()));
  app.use(bodyParser());

  // Use configured router
  app.use(router.middleware());

  return app;
}
