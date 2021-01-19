const path = require('path');
const fs = require('fs');
const {
  getAst,
  getDeps,
  getCode,
} = require('./parser');


class Compiler {
  constructor(options = {}) {
    // webpack 配置对象
    this.options = options;
    // 所有依赖容器
    this.modules = [];
  }

  // 启动 webpack 打包的方法
  run() {
    // 1. 读取入口文件
    // 入口文件路径
    const filePath = this.options.entry;
    // 第一次构建，得到入口文件信息
    const fileInfo = this.build(filePath);

    this.modules.push(fileInfo);

    // 遍历所有的依赖
    this.modules.forEach((fileInfo) => {
      /**
       *{
          './add.js': '/Users/zhengxuejiao/Documents/GitHub/learning-wepack5/packages/05.myWebpack/src/add.js',
          './count.js': '/Users/zhengxuejiao/Documents/GitHub/learning-wepack5/packages/05.myWebpack/src/count.js'
        }
       */
      // 取出当前文件的所有依赖
      const deps = fileInfo.deps;
      // 遍历
      for (const relativePath in deps) {
        const absolutePath = deps[relativePath];
        // 对依赖文件进行处理
        const fileInfo = this.build(absolutePath);
        // 将处理后的结果添加到modules中，后面遍历就会遍历它了～
        this.modules.push(fileInfo);
      }
    });

    /**
     * {
     *  'index.js': {
     *    code: 'xx',
     *    deps: {'add.js': 'xxx'} 
     *  },
     *  'add.js': {
     *    code: 'xx',
     *    deps: {} 
     *  },
     * }
     */
    // 将依赖整理成更好的依赖关系表
    const depsGraph = this.modules.reduce((graph, module) => {
      return {
        ...graph,
        [module.filePath]: {
          code: module.code,
          deps: module.deps,
        }
      }
    }, {});

    console.log(depsGraph);

    this.generate(depsGraph);
    // console.log(46, this.modules);
  }

  build(filePath) {
    // 将文件解析成ast
    const ast = getAst(filePath);
    // 获取ast所有依赖
    const deps = getDeps(ast, filePath);
    // 将ast解析成code
    const code = getCode(ast);

    return {
      // 当前文件的路径
      filePath,
      // 当前文件的所有依赖
      deps,
      // 当前文件解析后的代码
      code,
    }
  }

  // 开始构建
  generate(depsGraph) {
    /**
     * index.js
     * "use strict";\n' +
      '\n' +
      'var _add = _interopRequireDefault(require("./add.js"));\n' +
      '\n' +
      'var _count = _interopRequireDefault(require("./count.js"));\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
      '\n' +
      'console.log((0, _add["default"])(1, 2));\n' +
      'console.log((0, _count["default"])(3, 1));
     */
    const bundle = `
      (function(depsGraph){
        // require 目的：加载入口文件
        function require(module) {
          // eval(depsGraph[module].code);

          // 模块内部的require函数
          function localRequire(relativePath) {
            // 为了找到要引入模块的绝对路径，通过require加载
            return require(depsGraph[module].deps[relativePath]);
          }
          
          // 定义暴露对象（将来模块要暴露的内容）
          var exports = {};

          (function(require, exports, code) {
            eval(code);
          }(localRequire, exports, depsGraph[module].code))

          // 作为require函数的返回值返回出去
          // 后面的require函数能得到暴露的内容
          return exports;
        }

        // 加载入口文件
        require('${this.options.entry}');
      })(${JSON.stringify(depsGraph)})
    `;

    // 生成路径绝对路径
    const filePath = path.resolve(this.options.output.path, this.options.output.filename);
    // 字符串形式utf-8
    fs.writeFileSync(filePath, bundle, 'utf-8');
  }
}

module.exports = Compiler;