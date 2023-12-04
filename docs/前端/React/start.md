---
title: 搭建React工程
---
1. 安装NodeJS

   nodejs官网地址：https://nodejs.org/en/download
2. 新建项目目录，在新目录中打开terminal，输入命令初始化package.json

   ```bash
   npm init
   ```

   根据提示输入项目信息即可，如果想跳过问题使用 `-y`选项：`npm init -y`;
3. 安装 `webpack`及相关包用于构建和打包项目源码

   ```bash
   npm install --save-dev webpack webpack-cli webpack-dev-server
   ```

   更多webpack的功能和配置参考官网：https://webpack.js.org/configuration/
4. 安装babel及相关插件

   ```bash
   npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader @babel/cli @babel/plugin-transform-runtime @babel/eslint-parser
   @babel/runtime
   ```

   > babel官网： https://www.babeljs.cn/docs/
   >
   > 关键包解释：
   >
   > - @babel/preset-env 支持最新的javascript
   > - babel-loader 用于配置webpack编译JS代码
   > - @babel/plugin-transform-runtime 复用babel注入的帮助代码减少代码体积
   > - @babel/eslint-parser eslint自带的parser不支持js的实验性或非标准语法，@babel/eslint-parser时eslint可以运行在被Babel转换的代码之上
   > - @babel/runtime 包含浏览器的polyfill等
   >
5. 安装linter

   ```shell
   npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-jest eslint-config-prettier
   ```
6. 安装react

   ```shell
   npm install --save-dev react@latest react-dom@latest
   ```
7. 创建index.html文件

   ```shell
   mkdir public
   touch public/index.html
   ```

   html内容如下：

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>React test</title>
   </head>
   <body>
     <div id="app"></div>
     <script src="./main.js"></script>
   </body>
   </html>
   ```
8. 创建react根组件 `App.js`

   ```jsx
   import React from 'react';

   const App = () => {
     return <div>
       this is a react demo
     </div>
   }

   export default App;
   ```
9. 创建入口文件 `index.js`

   ```jsx | pure
   import React from 'react';
   import { createRoot } from 'react-dom/client';

   import App from './App.jsx';

   createRoot(document.getElementById('app')).render(<App />);
   ```
10. 新建 `webpack.config.js`文件用于配置webpack, 内容如下：

    ```js
    const path = require('path');

    module.exports = {
      mode: 'development',
      entry: './main.js',
      output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
      },
      target: 'web',
      devServer: {
        port: 8086,
        hot: true,
        liveReload: true,
        open: true,
        static: 'public'
      },
      resolve: {
        extensions: ['.js', 'jsx', 'json', 'css']
      },
      module: {
        rules: [{
          test: /.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }]
      }
    }
    ```
11. 新建 `.babelrc`文件配置babel

    ```json
    {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      "plugins": [
        "@babel/plugin-transform-runtime"
      ]
    }
    ```
12. package.json中添加脚本

    ```json
    "scripts": {
      "start": "webpack-dev-server .",
      "build": "webpack"
    },
    "main": "./index.js"
    ```

> eslint的配置可以参考[这里](https://zhuanlan.zhihu.com/p/87667635?utm_id=0).
