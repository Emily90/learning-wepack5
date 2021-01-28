import { a } from './moduleA';

console.log(a(1));
console.log('hello world');

const c = () => {
  console.log('c');
} 

c();


// 。删除了没有使用到的 b 函数，正确的保留了 a 函数。
// 注意 webpack4 是做不到这一点的，只有 webpack5 才有这个功能。
// webpack 4 没有分析模块的导出和引用之间的依赖关系。webpack 5 可以对模块中的标志进行分析，找出导出和引用之间的依赖关系。

// 导入并赋值给 JavaScript 对象，然后在下面的代码中被用到
// 这会被看作“活”代码，不会做 tree-shaking
// import Stuff from './stuff';
// doSomething(Stuff);
// 导入并赋值给 JavaScript 对象，但在接下来的代码里没有用到
// 这就会被当做“死”代码，会被 tree-shaking
// import Stuff from './stuff';
// doSomething();
// 导入但没有赋值给 JavaScript 对象，也没有在代码里用到
// 这会被当做“死”代码，会被 tree-shaking
// import './stuff';
// doSomething();
// 导入整个库，但是没有赋值给 JavaScript 对象，也没有在代码里用到
// 非常奇怪，这竟然被当做“活”代码，因为 Webpack 对库的导入和本地代码导入的处理方式不同。
// import 'my-lib';
