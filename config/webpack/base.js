const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeModulesPath = path.resolve(__dirname, '../../node_modules');
const distPath = path.resolve(__dirname, '/../../public');

const baseConfig = {
  output: {
    filename: 'js/[name].[hash].js',
    path: distPath,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        // shims
        test: /\.shim\.js$/,
        use: ['script-loader'],
        exclude: nodeModulesPath,
      },
      {
        // eslint
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: nodeModulesPath,
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
        exclude: nodeModulesPath,
        use: [{ loader: 'babel-loader' }],
      },
      // { // mdl
      //   test: require.resolve('material-design-lite/material'),
      //   loader: 'exports-loader?componentHandler',
      // },
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
      client: path.join(__dirname, '../../src/client'), // REVIEW: abs path
      server: path.join(__dirname, '../../src/server'), // REVIEW: abs path
    },
    extensions: ['.js', '.json', '.scss', '.sass', '.sss', '.css'],
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new WebpackManifestPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    // new ServiceWorkerWebpackPlugin({
    //   entry: path.join(__dirname, '../../src/client/sw.js'),
    // }),
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
