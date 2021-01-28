const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 判断当前是development 还是 production
const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode: mode,
  // output: {
  //   ecmaVersion: 6
  // },
  entry: {
    main: './src/main.js',
    app: './src/utils/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'), // 绝对路径
    filename: '[name].[chunkhash:6].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { 
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 表示这几个文件的后缀名可以不写
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}