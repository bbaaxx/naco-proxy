import webpack from 'webpack';
import staticServe from 'koa-static';
import DashboardPlugin from 'webpack-dashboard/plugin';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';

import { getVar } from './config/getEnv';
import webpackConfigs from '../../config/webpack';

const webpackCompiler = webpack(webpackConfigs.development)
  // .apply(new DashboardPlugin());

const wdm = devMiddleware(webpackCompiler, {
  noInfo: true,
  overlay: true,
  publicPath: webpackConfigs.development.output.publicPath,
  stats: { colors: true },
  historyApiFallback: true,
});

const whm = hotMiddleware(webpackCompiler, {
  log: console.log,
  path: '/__webpack_hmr',
  // heartbeat: 10 * 1000
});

const webpackHandlers = {
  devMiddleware: wdm,
  hotMiddleware: whm
};

export default webpackHandlers;
