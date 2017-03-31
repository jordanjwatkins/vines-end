const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'build/bundle.js': './js/index.js',
    'build/app.css': './styles/app.css',
  },

  output: {
    path: __dirname,
    filename: '[name]',
  },

  devtool: 'cheap-module-eval-source-map',

  devServer: { inline: true },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1&url=false',
            'postcss-loader?sourceMap=inline',
          ],
        }),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread'],
        },
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('build/app.css'),
  ],
};
