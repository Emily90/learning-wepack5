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
    });

    console.log(depsGraph);

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
}

module.exports = Compiler;