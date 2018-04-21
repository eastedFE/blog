require('babel-register');
require('babel-polyfill');
//const util = require('utils');
import util from './util';

Object.assign({},{a:1,b:2});

console.log(Array.from({
  0: '0',
  1: '1',
  3: '3',
  length:4
}));


[1,2,4].map((item,index)=>item +1);

function getData(){
	//promise test
	return new Promise((resolve,reject)=>{
		resolve(0);
	});
}

console.log(getData())