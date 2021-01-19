const fs = require('fs'); // 异步代码
const util = require('util');
const path = require('path');
const { Compilation, sources } = require("webpack");

const { RawSource } = sources;
const readFile = util.promisify(fs.readFile); // 将普通的异步函数 promise 化

class Plugin2 {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('Plugin2', (compilation) => {
      // debugger;
      // console.log(compilation.hooks.additionalAssets);

      // 添加资源
      compilation.hooks.additionalAssets.tapAsync('Plugin2', async (cb) => {
        // debugger;
        // console.log(compilation);

        const content = 'hello plugin2';
        // 往输出的资源，添加一个a.txt
        compilation.assets['a.txt'] = {
          size() {
            return content.length;
          },
          source() {
            return content;
          },
        }

        // 读取文件
        const data = await readFile(path.resolve(__dirname, 'b.txt')); // buffer

        // compilation.assets['b.txt'] = new RawSource(data); // 和上面的size/source

        compilation.emitAsset('b.txt', new RawSource(data)); // 和上面的方法等价，输出资源

        cb();
      })
    })
  }
}

module.exports = Plugin2;