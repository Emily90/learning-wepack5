const { validate } = require('schema-utils');
const { Compilation } = require('webpack');

const fs = require('fs');
const { promisify } = require('util');
const globby = require('globby');
const path = require('path');
const webpack = require('webpack');

const schema = require('./schema.json');
const readFile = promisify(fs.readFile);
const { RawSource } = webpack.sources;

class CopyWebpackPlugin {
  constructor(options = {}) {
    console.log(options)

    // 验证 options 是否符合规范
    validate(schema, options, {
      name: 'CopyWebpackPlugin',
    })

    this.options = options;
  }

  apply(compiler) {
    // compilation init
    compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', (compilation) => {
      // 添加资源触发的hooks
      compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin', async (cb) => {
        // 将from 的资源复制到to 中，输出出去
        const { from, ignore } = this.options;
        const to = this.options.to ? this.options.to : '.';
        // 1. 读取from
        // 运行指令的目录
        const context = compiler.options.context; // process.cwd() 运行代码的目录
        // globby（要处理的文件夹， options)
        // 将输入路径为绝对路径, 执行目录的地址
        const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from);

        // 2. 过滤ignore文件
        const paths = await globby(absoluteFrom, { ignore });
        console.log(paths);
        // 读取path 所有资源
        const files = await Promise.all(
          paths.map(async (absolutePath) => {
            // 读取文件
            const data = await readFile(absolutePath);
            // basename 得到最好的文件名称
            const relativePath = path.basename(absolutePath);

            const filename = path.join(to, relativePath);

            return {
              // 文件数据
              data,
              // 文件名称
              filename,
            }
          })
        )

        // 3. 生成 webpack 格式的资源
        const assets = files.map((file) => {
          const source = new RawSource(file.data);

          return {
            source,
            filename: file.filename,
          }
        })

        // 4. 添加到 compilation 中，输出出去
        assets.forEach((asset) => {
          compilation.emitAsset(asset.filename, asset.source);
        });

        cb();
      })
    })
  }

}

module.exports = CopyWebpackPlugin;