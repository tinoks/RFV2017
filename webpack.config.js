var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    noParse:[/alasql/,/riot-md-table/],
    rules: [
      { test: /\.tag$/, loader: 'tag-loader', query: {compact: 'true'},  exclude: /node_modules/},
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
	  { test: /\.png$/, loader: 'url-loader', query: { mimetype: 'image/png' } }
    ]
  },
  devServer: {
    contentBase: './dist'
  }
};
