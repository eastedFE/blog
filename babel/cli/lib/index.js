'use strict';

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-register');
require('babel-polyfill');
//const util = require('utils');


Object.assign({}, { a: 1, b: 2 });

console.log(Array.from({
  0: '0',
  1: '1',
  3: '3',
  length: 4
}));

[1, 2, 4].map(function (item, index) {
  return item + 1;
});

function getData() {
  //promise test
  return new Promise(function (resolve, reject) {
    resolve(0);
  });
}

console.log(getData());
//# sourceMappingURL=index.js.map