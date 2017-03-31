const webpack = require('webpack');
const config = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

config.devtool = 'source-map';

config.entry = {
  'build/bundle.min.js': './js/index.js',
  'build/app.min.css': './styles/app.css',
};

config.module.rules[0].use = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    'css-loader?importLoaders=1&sourceMap&minimize',
    'postcss-loader?sourceMap',
  ],
});

config.plugins = [
  new ExtractTextPlugin('build/app.min.css'),
  new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
];

module.exports = config;
