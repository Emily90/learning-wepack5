const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // loader: path.resolve(__dirname, 'loaders', 'loader1')
        use: [
          // 'loader1',
          // 'loader2',
          // {
          //   loader: 'loader3',
          //   options: {
          //     name: 'jack',
          //     age: 18,
          //   }
          // },
          {
            loader: 'babelLoader',
            options: {
              "present"
            },
          }
        ]
      }
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders'),
    ]
  }
}
