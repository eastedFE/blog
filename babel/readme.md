#当前的语言环境
>1.es6的语法,如箭头函数、对象结构

>2.全局对象API,如Promise

>3.全局对象上的方法,如Object.Values,Object.assign

>4.jsx

#babel的配置文件

```javascript
//.babelrc
{
    "presets":['es2015','react','stage-2'],
    "plugins":[]
}
```

presets字符设定转码规则

```bash
#ES2015转码规则
npm install --save-dev babel-preset-es2015
#React转码规则
npm install --save-dev bable-preset-react
#ES7不同阶段语法提案转码规则
npm install --save-dev bable-preset-stage-0
npm install --save-dev bable-preset-stage-1
npm install --save-dev bable-preset-stage-2
npm install --save-dev bable-preset-stage-3
```

#babel工具和模块

##babel-cli 命令行转码工具

```bash
npm install --save-dev bable-cli
```

```bash
#控制台输出
./node_modules/.bin/babel ./src/index.js
#输出到文件 --out-file -o
./node_modules/.bin/babel ./src/index.js --out-file test.js
#转码整个目录 --out-dir -d
babel ./src --out-dir lib
#生成source-map
babel ./src -d lib -s
#npm script "build": "babel src -d lib -s"
npm run build
```

##babel-node类似node git-bash客户端,可以直接运行es6脚本

```bash
npm run b-node
```

#babel-regeister 只会对require命令加载的文件转码

```javascript
//index.js
require('babel-register');
const util = require('utils');
或者
import util from './utils';
//utils.js
const getData = ()=> 'test';
const ass = [1,2,4].map((item,index)=>item +1);
module.exports = {getData,ass};
```

#babel-core调用babel的API进行转码

#babel-polyfill

```bash
npm install --save babel-polyfill
```











