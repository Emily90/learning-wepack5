// loader 本质是一个函数

// 异步 loader
module.exports = function (content, map, meta) {
  console.log('222');

  const callback = this.async();

  setTimeout(() => {
    callback(null, content);
  }, 1000);
}

module.exports.pitch = function () {
  console.log('pitch 222')
}