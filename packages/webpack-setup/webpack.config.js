const path = require('path');

const mode = process.env.NODE_ENV == 'production' ? 'production' : 'development';

module.exports = {
  mode: mode,
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      }
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './',
  }
}