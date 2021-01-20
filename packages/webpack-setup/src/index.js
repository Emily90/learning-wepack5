import getClasses from './getClasses';

console.log('hello world')
getClasses();

const obj = {
  a: 'alpha',
  b: 'brabe',
}

const newObj = {
  ...obj,
  c: 'charlie',
}

console.log(newObj);

// 需要babel 兼容polyfill
console.log(true);
console.log(['a','b','c'].includes['b']);