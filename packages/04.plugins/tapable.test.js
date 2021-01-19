const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      // 同步钩子，依次执行
      // go: new SyncHook(['address']), // 都执行
      go: new SyncBailHook(['address']), // 一旦有返回值，就退出
      // 异步钩子，
      // AsyncParallelHook 异步并行
      leave: new AsyncParallelHook(['name', 'age']), // 遇到返回值，就不继续了
    }
  }

  tap() {
    // 往hooks容器中注册事件/添加函数
    this.hooks.go.tap('class0318', (address) => {
      console.log('class0318 tap', address);

      return 1;
    })

    this.hooks.go.tap('class0410', (address) => {
      console.log('class0410 tap', address);
    });

    this.hooks.leave.tapAsync('class0510', (name, age, cb) => {
      setTimeout(() => {
        console.log('class0510 tapAsync', name, age, cb);
        cb && cb();
      }, 1000);
    });
    
    this.hooks.leave.tapPromise('class0610', (name, age) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('class0610 tapPromise', name, age);
          resolve();
        }, 1000);
      })
    })
  }

  start() {
    // 触发hooks, call 全部触发
    this.hooks.go.call('318');
    this.hooks.leave.callAsync('jack', 18, () => {
      console.log('所有leave容器中的函数触发完了，才触发，end~~')
    });
  }
}

const l = new Lesson();
l.tap(); // 注册
l.start(); // 启动
