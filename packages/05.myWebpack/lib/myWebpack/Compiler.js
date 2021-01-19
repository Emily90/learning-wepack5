const {
  getAst,
  getDeps,
  getCode,
} = require('./parser');


class Compiler {
  constructor(options = {}) {
    this.options = options;
  }

  // 启动 webpack 打包的方法
  run() {
    // 1. 读取入口文件
    // 入口文件路径
    const filePath = this.options.entry;
    // 将文件解析成ast
    const ast = getAst(filePath);
    // 获取ast所有依赖
    const deps = getDeps(ast, filePath);
    // 将ast解析成code
    const code = getCode(ast);

    console.log(ast);
    console.log(deps);
    console.log(code);
  }
}

module.exports = Compiler;