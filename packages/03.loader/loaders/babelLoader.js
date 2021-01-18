// loader 本质是一个函数

const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');

const schema = require('./schema.json');

module.exports = function (content, map, meta) {
  console.log('babelLoader');

  const options = getOptions(this) || {};

  console.log(333, options);

  // 校验 options 是否合法
  validate(schema, options, {
    name: 'loader3',
    age: 18,
  });

  return content;
}

module.exports.pitch = function () {
  console.log('pitch 333')
}