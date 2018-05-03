# Promise

## 1.promise解决的问题
>1.1回调地狱

>1.2回调传参数
```javascript

```
>1.3回调必须提前定义
```javascript
```
## 2.promise的历史
>略
## 3.promise基本使用
>3.1构造函数
```javascript
const promise = new Promise(function(resolve,reject){
 if(true){
   resolve('data');
 }else{
   reject('error');
 }
});
```
## 4.promise兼容性
>4.1es6-promise

## 5.promise设计模式
>5.1状态模式、职责链模式

>5.2promise源码分析

