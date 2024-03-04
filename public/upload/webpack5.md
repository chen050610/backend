---
title: webpack5
date: 2024-02-10 17:36:50
tags: webpack
---

摘要
<!--more-->
正文

# webpack5

为什么使用webpack5

![image-20240211153307297](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211153307297.png)

![image-20240211153637618](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211153637618.png)

编译的工作

编译成浏览器能够识别的语言

## 下载过程

首先执行

```bash
npm init -y
```

此时生成基础的package.json的文件

这里的name一定要是webpack

![image-20240211154132905](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211154132905.png)

然后下载相关的依赖

```bash
npm i webpack webpack-cli -D
```

使用npx的指令可以把node_modules下的bin目录当作环境变量

这样就可以使用webpack的指令

然后在在后面加上入口的文件

![image-20240211162037585](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211162037585.png)

然后在指定模式

![image-20240211162122788](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211162122788.png)

这样

![image-20240211162145636](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211162145636.png)

就代表打包成功

生成的打包文件在disk目录下

![image-20240211162417297](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211162417297.png)

在运行就能得到结果

生产模式再来打包

![image-20240211162656438](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211162656438.png)

这样的代码压缩过来的

## 五大核心

1.入口（entry），指示webpack从哪个文件开始打包

2.output（输出的位置），指定输出的文件输出到那个地方

3.loader（加载器），webpack只能处理js和json等资源，其他的资源需要使用loader

4.plugins（插件），扩展webpack的功能

5.mode（模式），开发者模式（development）和生产者模式（production）

## 配置文件

在项目的根目录创建

配置文件

![image-20240211163311088](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211163311088.png)

没有最初的loader和插件的配置如下

```js
const path = require('path')

module.exports = {
    //入口
    entry:'./src/main.js',//相对路径
    //输出
    output: {
        path: path.resolve(__dirname,'dist'),//输出路径绝对路径，使用path解决__dirname代表当前文件夹目录
        filename: "main.js",//输出的文件名字
    },
    //加载器
    module: {
        rules: [
            //loader的配置
        ],
    }
    //插件
    plugins: [
        //插件的位置
    ],
    //模式
    mode: "development",
}
```

这样配置完以后我们的指令就不用写这么多了

```bash
npx webpack
```

指令的

没有写配置文件的话还是需要上面复杂的写法

这样执行就ok了

## 开发模式的作用

![image-20240211172818306](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211172818306.png)

## 处理样式资源

### css

首先，需要先安装 `css-loader`：

```console
npm install --save-dev css-loader
npm install style-loader -D
```

然后把 loader 引用到你 `webpack` 的配置中。如下所示：

**file.js**

```js
import css from 'file.css';然后在入口文件导入css文件
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

然后运行 `webpack`。

这样就可以

![image-20240211191750991](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211191750991.png)

### 处理less资源

首先，你需要先安装 `less` 和 `less-loader`：

```console
npm install less less-loader --save-dev
```

然后将该 loader 添加到 `webpack` 的配置中去，例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
};
```

接着使用你习惯的方式运行 `webpack`。

还有一个注意的点

loader：只能使用一个loader

use：可以使用多个loader，并且从左向右执行

```js
module: {
    rules: [
        {
            test: /\.css$/i,//检测xxx文件以css结尾的文件正则，//执行顺序，从下到上，从左到右
            use: ['style-loader',//将js中的css通过创建style标签的形式显示在页面，在html中生效
                'css-loader'//将css样式编译成commonjs的模块到js中
            ],
        },
        {
            test: /\.less$/i,
            use: [
                // compiles Less to CSS
                'style-loader',
                'css-loader',
                'less-loader',//将less编译成css文件
            ],
        },
        //loader的配置
    ],
},
```

这样就可以实现了

![image-20240211192540071](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211192540071.png)

### 处理sass资源

首先，你需要安装 `sass-loader`：

```console
npm install sass-loader sass webpack --save-dev
```

`sass-loader` 需要预先安装 [Dart Sass](https://github.com/sass/dart-sass) 或 [Node Sass](https://github.com/sass/node-sass)（可以在这两个链接中找到更多的资料）。这可以控制所有依赖的版本， 并自由的选择使用的 Sass 实现。

这样可以控制所有依赖项的版本，并选择要使用的 Sass 实现。

> ℹ️ 我们推荐使用 [Dart Sass](https://github.com/sass/dart-sass)。

> ⚠ [Node Sass](https://github.com/sass/node-sass) 不能与 [Yarn PnP](https://classic.yarnpkg.com/en/docs/pnp/) 特性一起正常工作，并且不支持 [@use rule](https://sass-lang.com/documentation/at-rules/use)。

将 `sass-loader` 、[css-loader](https://webpack.docschina.org/loaders/css-loader/) 与 [style-loader](https://webpack.docschina.org/loaders/style-loader/) 进行链式调用，可以将样式以 style 标签的形式插入 DOM 中，或者使用 [mini-css-extract-plugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/) 将样式输出到独立的文件中。

然后将本 loader 添加到你的 Webpack 配置中。例如：

**app.js**

```js
import './style.scss';
```

**style.scss**

```scss
$body-color: red;

body {
  color: $body-color;
}
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
    ],
  },
};
```

最后通过你喜欢的方式运行 `webpack`。

实例

准备好两个文件

![image-20240211193219064](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211193219064.png)

都是sass，但是sass省略{}和；

处理styl资源

首先，你需要安装 `style-loader`：

```console
npm install --save-dev style-loader
```

推荐将 `style-loader` 与 [`css-loader`](https://webpack.docschina.org/loaders/css-loader/) 一起使用

然后把 loader 添加到你的 `webpack` 配置中。比如：

**style.css**

```css
body {
  background: green;
}
```

**component.js**

```js
import './style.css';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

## 处理图片资源

小图片一般进行优化

转为base 64的格式

loader这么写

```js
{
    test: /\.(png|jpe?g|gif|webp|svg)/,
    type: 'asset',
    parser: {
        dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb//小于多少的做转为base64
            //优点就是减少请求的数量，缺点就是，体积会更大一点
        }
    }
}
```

打包以后

![image-20240211195839190](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211195839190.png)

图片也打包了

这样就可以了

![image-20240211195917642](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211195917642.png)

小图片转为 base64的作用就是减少服务器的压力

现在有点乱

![image-20240211200201882](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211200201882.png)

我们需要对打包的路径进行优化‘

```diff
       generator: {
+         filename: 'static/[hash][ext][query]'
+       }
```

```js
            {
                test: /\.(png|jpe?g|gif|webp|svg)/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb//小于多少的做转为base64
                        //优点就是减少请求的数量，缺点就是，体积会更大一点
                    },
                },
                generator: {
                    //输出的文件名称，hash  生成唯一的哈希，ext文件的扩展名，query图片携带的参数
                    filename: 'static/[hash:10][ext][query]'//hash后面+10，意思是只取十位
                }
            }
        ],
    },
```

还有一个

```js
output: {
    path: path.resolve(__dirname,'dist'),//输出路径绝对路径，使用path解决__dirname代表当前文件夹目录
    filename: "main.js",//入口文件输出的文件名字
    clean: true,//自动清空上次打包的

},
```

## 处理字体图标

先在

阿里巴巴上面找到几个图标

放在仓库在下载

使用iconfont的

![image-20240211204324681](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211204324681.png)

然后打包的loader和图片的差不多，但是有几处改动

代码

```js
            {
                test: /\.(png|jpe?g|gif|webp|svg)/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb//小于多少的做转为base64
                        //优点就是减少请求的数量，缺点就是，体积会更大一点
                    },
                },
                generator: {
                    //输出的文件名称，hash  生成唯一的哈希，ext文件的扩展名，query图片携带的参数
                    filename: 'static/images/[hash:10][ext][query]'//hash后面+10，意思是只取十位
                }
            },
            {
                test: /\.(ttf|woff2?)/,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb//小于多少的做转为base64
                        //优点就是减少请求的数量，缺点就是，体积会更大一点
                    },
                },
                generator: {
                    //输出的文件名称，hash  生成唯一的哈希，ext文件的扩展名，query图片携带的参数
                    filename: 'static/media/[hash:10][ext][query]'//hash后面+10，意思是只取十位
                }
            }
```

后面的是图标

## 处理其他的资源

比如说视频什么的

要是有的话

也不会有很大的改动

![image-20240211204616183](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211204616183.png)

就是在处理字体图标的后面添加一些就ok了

## 处理js资源

有人可能会问，js 资源 Webpack 不能已经处理了吗，为什么我们还要处理呢？

原因是 Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以我们希望做一些兼容性处理。

其次开发中，团队对代码格式是有严格要求的，我们不能由肉眼去检测代码格式，需要使用专业的工具来检测。

- 针对 js 兼容性处理，我们使用 Babel 来完成
- 针对代码格式，我们使用 Eslint 来完成

我们先完成 Eslint，检测代码格式无误后，在由 Babel 做代码兼容性处理

### ESlint

可组装的 JavaScript 和 JSX 检查工具。

这句话意思就是：它是用来检测 js 和 jsx 语法的工具，可以配置各项功能

我们使用 Eslint，关键是写 Eslint 配置文件，里面写上各种 rules 规则，将来运行 Eslint 时就会以写的规则对代码进行检查

###  配置文件

配置文件由很多种写法：

- ```
  .eslintrc.*
  ```

  ：新建文件，位于项目根目录

  - `.eslintrc`
  - `.eslintrc.js`
  - `.eslintrc.json`
  - 区别在于配置格式不一样

- `package.json` 中 `eslintConfig`：不需要创建文件，在原有文件基础上写

ESLint 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

我们以 `.eslintrc.js` 配置文件为例：

```javascript
module.exports = {
  // 解析选项
  parserOptions: {},
  // 具体检查规则
  rules: {},
  // 继承其他规则
  extends: [],
  // ...
  // 其他规则详见：https://eslint.bootcss.com/docs/user-guide/configuring
};
```

1. parserOptions 解析选项

```javascript
parserOptions: {
  ecmaVersion: 6, // ES 语法版本
  sourceType: "module", // ES 模块化
  ecmaFeatures: { // ES 其他特性
    jsx: true // 如果是 React 项目，就需要开启 jsx 语法
  }
}
```

1. rules 具体规则

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
- `"error"` 或 `2` - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)



```javascript
rules: {
  semi: "error", // 禁止使用分号
  'array-callback-return': 'warn', // 强制数组方法的回调函数中有 return 语句，否则警告
  'default-case': [
    'warn', // 要求 switch 语句中有 default 分支，否则警告
    { commentPattern: '^no default$' } // 允许在最后注释 no default, 就不会有警告了
  ],
  eqeqeq: [
    'warn', // 强制使用 === 和 !==，否则警告
    'smart' // https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
  ],
}
```

1. extends 继承

开发中一点点写 rules 规则太费劲了，所以有更好的办法，继承现有的规则。

现有以下较为有名的规则：

- [Eslint 官方的规则open in new window](https://eslint.bootcss.com/docs/rules/)：`eslint:recommended`
- [Vue Cli 官方的规则open in new window](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint)：`plugin:vue/essential`
- [React Cli 官方的规则open in new window](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app)：`react-app`

```javascript
// 例如在React项目中，我们可以这样写配置
module.exports = {
  extends: ["react-app"],
  rules: {
    // 我们的规则会覆盖掉react-app的规则
    // 所以想要修改规则直接改就是了
    eqeqeq: ["warn", "smart"],
  },
};
```

使用教程

先安装

```bash
npm install eslint --save-dev
npm i eslint-webpack-plugin eslint -D

```

是一个插件

需要在插件

里面

```js
const {ESLint} = require("eslint");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
    
    plugins: [
        //插件的位置
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "src"),//哪些文件需要被检查
        }),
    ],
```

然后在根目录下

添加eslint的配置文件，内容直接去下面的链接去复制

![image-20240211212657093](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211212657093.png)

[https://webpack.docschina.org/plugins/eslint-webpack-plugin]: 

我们写一段不符合规范的代码再去试一试

刚才在配置文件中

![image-20240211212859809](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211212859809.png)

不能允许使用var定义变量

vscode里面有一个插件

eslink就可以在编译之前访问你的eslink的配置文件，然后提示你的代码哪里出错

![image-20240211213221054](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211213221054.png)

webstorm手动配置EsLink

![image-20240211213645544](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211213645544.png)

我们还可以配置不检查的文件

根目录创建

.**eslinkignore**

下面写哪些目录不用语法检查

### babel的用法

**主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中**

### 1. 配置文件

配置文件由很多种写法：

- ```
  babel.config.*
  ```

  ：新建文件，位于项目根目录

  - `babel.config.js`
  - `babel.config.json`

- ```
  .babelrc.*
  ```

  ：新建文件，位于项目根目录

  - `.babelrc`
  - `.babelrc.js`
  - `.babelrc.json`

- `package.json` 中 `babel`：不需要创建文件，在原有文件基础上写

Babel 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

### [#](https://xxpromise.gitee.io/webpack5-docs/base/javascript.html#_2-具体配置-1)2. 具体配置

我们以 `babel.config.js` 配置文件为例：



```javascript
module.exports = {
  // 预设
  presets: [],
};
```

1
2
3
4

1. presets 预设

简单理解：就是一组 Babel 插件, 扩展 Babel 功能

- `@babel/preset-env`: 一个智能预设，允许您使用最新的 JavaScript。
- `@babel/preset-react`：一个用来编译 React jsx 语法的预设
- `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设

### [#](https://xxpromise.gitee.io/webpack5-docs/base/javascript.html#_3-在-webpack-中使用-1)3. 在 Webpack 中使用

安装

```bash
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

多种写法

第一种

```js
{
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,//排除node_modules的js不处理
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
        },
    },
},
```

直接复制的

还有

第二种

```js
{
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,//排除node_modules的js不处理
    loader: 'babel-loader',
    // options: {
    //     presets: ['@babel/preset-env'],
    // },
},
```

然后再

根目录创建babel.config.js

```js
module.exports = {
    presets: ['@babel/preset-env']//智能预设，能够编译es6的语法
}
```

然后在打包

![image-20240211215243331](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240211215243331.png)

发现之前使用的箭头函数和三点运算符都被替换了

## 处理html资源

**HtmlWebpackPlugin**

[`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务。这对于那些文件名中包含哈希值，并且哈希值会随着每次编译而改变的 webpack 包特别有用。你可以让该插件为你生成一个 HTML 文件，使用 [lodash 模板](https://lodash.com/docs#template)提供模板，或者使用你自己的 [loader](https://webpack.docschina.org/loaders)。

**安装**

```bash
npm install --save-dev html-webpack-plugin
```

**基本用法**

该插件将为你生成一个 HTML5 文件， 在 body 中使用 `script` 标签引入你所有 webpack 生成的 bundle。 只需添加该插件到你的 webpack 配置中，如下所示：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

这将会生成一个包含以下内容的 `dist/index.html` 文件：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

如果你有多个 webpack 入口，他们都会在已生成 HTML 文件中的 `<script>` 标签内引入。

如果在 webpack 的输出中有任何 CSS 资源（例如，使用 [MiniCssExtractPlugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/) 提取的 CSS），那么这些资源也会在 HTML 文件 `<head>` 元素中的 `<link>` 标签内引入。

**操作**

下载以后

```
const HtmlWebpackPlugin= require("html-webpack-plugin")
plugins: [
        //插件的位置
        new HtmlWebpackPlugin(),
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "src"),//哪些文件需要被检查
        }),
    ],
```

然后在打包

这样打包文件就会有一个html的文件

![image-20240213132926601](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213132926601.png)

而且会引入入口文件

但是之前的dom元素没有了

```ts
plugins: [
    //插件的位置
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),//以public为模板创建
    }),
    new ESLintWebpackPlugin({
        // 指定检查文件的根目录
        context: path.resolve(__dirname, "src"),//哪些文件需要被检查
    }),
],
```

着用就可以把都没元素

![image-20240213133213826](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213133213826.png)

## 如何自动打包，再更改原先的模板的时候

之前每次改代码，只有再从新打包以后才能看见效果

就需要自动化

### 开发服务器&自动化

每次写完代码都需要手动输入指令才能编译代码，太麻烦了，我们希望一切自动化，就需要使用自动化工具

#### [#](https://xxpromise.gitee.io/webpack5-docs/base/server.html#_1-下载包)1. 下载包

```text
npm i webpack-dev-server -D
```

#### [#](https://xxpromise.gitee.io/webpack5-docs/base/server.html#_2-配置)2. 配置

- webpack.config.js

```javascript
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    clean: true, // 自动将上次打包目录资源清空
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  mode: "development",
};
```

#### [#](https://xxpromise.gitee.io/webpack5-docs/base/server.html#_3-运行指令)3. 运行指令

```text
npx webpack serve
```

**注意运行指令发生了变化**

并且当你使用开发服务器时，所有代码都会在内存中编译打包，并不会输出到 dist 目录下。

开发时我们只关心代码能运行，有效果即可，至于代码被编译成什么样子，我们并不需要知道。

**他会自动监视src目录下代码的改变，如果发生了改变就会重新打包**

**以上是开发模式的学习**

**下面是生产模式的学习**

# **准备生产模式**

这里说一下

把配置文件写在ige文件夹里面

![image-20240213134546821](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213134546821.png)

一个是生产模式

一个是开发模式

生产模式的代码需要更改一下

其中这里的entry不用改

因为这个config运行的位置还是在外面根目录下运行的只是文件的目录做个更改

但是输出的位置 需要

```
odule.exports = {
    //入口
    entry:'./src/main.js',//相对路径
    //输出
    output: {
        path: path.resolve(__dirname,'../dist'),//输出路径绝对路径，使用path解决__dirname代表当前文件夹目录
        filename: undefined,//入口文件输出的文件名字,生产模式们没有输出
        clean: true,//自动清空上次打包的

    },
```

运行指令

![image-20240213135149934](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213135149934.png)

这是开发模式的更改

​	我们然后在定义几个指令

![image-20240213140006993](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213140006993.png)

这样就可以使用

```bash
npm run build //启动生产者
npm run start //启动开发者模式
npm run dev
//后面的两个指令可以省略run

```

## css样式处理

Css 文件目前被打包到 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式

这样对于网站来说，会出现闪屏现象，用户体验不好

**我们应该是单独的 Css 文件，通过 link 标签加载性能才好**

闪屏是什么？

就是之前的，css是js运行的时候，动态插入的

网速稍微慢一点，js加载就慢，这个css样式一瞬间加载出来

#### 1. 下载包

```text
npm i mini-css-extract-plugin -D
```

#### [#](https://xxpromise.gitee.io/webpack5-docs/base/optimizeCss.html#_2-配置)2. 配置

- webpack.prod.js
- 记住把之前使用所有style.loader的地方，都换成插件的名字，因为不需要使用style

```javascript
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    clean: true,
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
    }),
  ],
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  mode: "production",
};
```

#### [#](https://xxpromise.gitee.io/webpack5-docs/base/optimizeCss.html#_3-运行指令)3. 运行指令

```text
npm run build
```

这样以后

![image-20240213142024427](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213142024427.png)

## css兼容性的处理

## css压缩

1. **下载包**

```text
npm i css-minimizer-webpack-plugin -D
```

[#](https://xxpromise.gitee.io/webpack5-docs/base/optimizeCss.html#_2-配置-2)2. **配置**

- webpack.prod.js



```javascript
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    clean: true,
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
    }),
    // css压缩
    new CssMinimizerPlugin(),
  ],
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  mode: "production",
};
```

3.**运行指令**

```text
npm run build
```

# webpack高级配置

## sourceMap

[介绍 | 尚硅谷 Web 前端之 Webpack5 教程 (gitee.io)](https://xxpromise.gitee.io/webpack5-docs/senior/)
