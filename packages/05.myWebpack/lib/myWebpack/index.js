const Compiler = require('./Compiler');

function myWebpack(config) {
  console.log(config);

  return new Compiler(config);
};

module.exports = myWebpack;