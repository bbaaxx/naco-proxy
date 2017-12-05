const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const getPath = to => path.join(path.resolve(__dirname, '../../'), to);

const PATHS = {
  // REVIEW: abs paths?
  nodeModules: getPath('/node_modules'),
  dist: getPath('/public'),
  clientSrc: getPath('/src/client'),
  serverSrc: getPath('/src/server'),
  serviceWorker: getPath('/src/client/sw.js'),
};

const EXTS = ['.js', '.jsx', '.json', '.scss', '.sass', '.sss', '.css'];

const baseConfig = {
  output: {
    filename: '[name].[hash].js',
    path: PATHS.dist,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        // shims
        test: /\.shim\.js$/,
        use: ['imports-loader?this=>window'],
        exclude: PATHS.nodeModules,
      },
      {
        // eslint
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: PATHS.nodeModules,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true,
            },
          },
        ],
      },
      {
        // es6 and jsx
        test: /\.(js|jsx)$/,
        exclude: PATHS.nodeModules,
        use: [{ loader: 'babel-loader' }],
      },
      {
        // mdl
        test: require.resolve('material-design-lite/material'),
        loader: 'exports-loader?componentHandler',
      },
      {
        // SASS Style libs imports
        test: /src\/client\/styles\/libs\.scss/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'resolve-url-loader' },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader?sourceMap' },
        ],
        exclude: /node_modules/,
      },
      {
        // sass
        test: /\.(sass|scss)$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: { sourceMap: true, outputStyle: 'compressed' },
          },
        ],
        exclude: [/node_modules/, /src\/client\/styles\/libs\.scss/],
      },
      {
        // sugarss
        test: /\.sss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader', options: { parser: 'sugarss' } },
        ],
      },
      {
        // cssnext
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
        // fonts
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['file-loader?name=fonts/[name].[ext]'],
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    alias: {
      client: PATHS.clientSrc,
      server: PATHS.serverSrc,
    },
    extensions: EXTS,
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new WebpackManifestPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new ServiceWorkerWebpackPlugin({
      entry: PATHS.serviceWorker,
    }),
    // why can't I use arrows ?
    function customPlugin() {
      // must I reference this ?
      this.plugin('done', () => {
        console.log('Big red buttons everywhere');
      });
    },
  ],
};

module.exports = baseConfig;
