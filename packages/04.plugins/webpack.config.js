const Plugin1 = require('./plugins/Plugin1');
const Plugin2 = require('./plugins/Plugin2');

module.exports = {
  plugins: [
    new Plugin1(),
    new Plugin2(),
  ]
}