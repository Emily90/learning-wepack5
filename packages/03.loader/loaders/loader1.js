// loader 本质是一个函数

// 同步loader
// module.exports = function (content, map, meta) {
//   console.log('111');

//   return content;
// }

module.exports = function (content, map, meta) {
  console.log('111');

  // 同步 null 有没有错误，
  this.callback(null, content, map, meta);
}

// 解析
module.exports.pitch = function () {
  console.log('pitch 111')
}