#容易混淆的插件,原文地址如下：
#https://www.zhihu.com/question/49382420/answer/223915243

##core-js标准库，提供ES5,ES6的polyfill

##regenerator-runtime，提供generators、yield、async及await

##babel-runtime
babel-runtime是由core-js和regenerator-runtime的集合。使用
时候，必须手动require

```javascript
const Promise = require('babel-runtime/core-js/promise');
```

由于这种方式十分繁琐，还要配合_interopRequireDefault使用，代码
会分散在各个文件中，重复代码提高。

##babel-plugin-transform-runtime
插件发现Promise等新的对象，自动按需进行polyfill且提供
一个沙盒环境，污染原生js的prototype。lib库的开发中提供
Promise等对象，开发完成后按需引用依赖的对象。

##babel-polyfill
babel-polyfill提供ES2015的运行环境，以全局变量的形式引入
Promise等对象，在项目中和第三方库打包在一起。
babel-polyfill会优先选择原生的Promise对象，然后才使用polyfill。


