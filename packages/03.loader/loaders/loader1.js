// loader 本质是一个函数

module.exports = function (content, map, meta) {
  console.log('111');

  return content;
}

// 解析
module.exports.pitch = function () {
  console.log('pitch 111')
}