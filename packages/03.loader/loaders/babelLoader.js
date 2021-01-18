// loader 本质是一个函数
const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const babel = require('@babel/core');
const util = require('util');

const babelSchema = require('./babelSchema.json');

// babel.transform nodeJS普通的异步方法，用来编译代码的
// util.promisify 将普通异步方法转化为基于promise的异步方法
const transform = util.promisify(babel.transform);

module.exports = function (content, map, meta) {
  // 获取loader options 配置
  const options = getOptions(this) || {};

  console.log('babelLoader', options);

  // 校验 options 是否合法
  validate(babelSchema, options, {
    name: 'babelLoader',
  });

  // 创建异步
  const callback = this.async();

  // 使用babel编译
  transform(content, options)
    .then(({ code, map }) => {
      console.log(30, code);
      callback(null, code, map);
    })
    .catch((e) => callback(e))
}

module.exports.pitch = function () {
  console.log('pitch 333')
}