const merge = require('webpack-merge');
const webpack = require('webpack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

const baseConfig = require('./base');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
  __DEV__: JSON.stringify(JSON.parse(Boolean(process.env.DEBUG) || true)),
};

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  entry: {
    polyfills: ['client/polyfills.shim.js'],
    jslibs: ['client/libs.js', 'webpack-hot-middleware/client'],
    styleLibs: ['client/styles/libs.scss', 'webpack-hot-middleware/client'],
    application: [
      'babel-polyfill',
      __dirname + '/../../src/client/index.js',
      'webpack-hot-middleware/client',
    ],
    styles: [
      'client/styles/sugarss.sss',
      // 'client/styles/cssnext.css',
      'client/styles/sass.scss',
      'webpack-hot-middleware/client',
    ],
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ],
});
