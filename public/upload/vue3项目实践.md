---
title: vue3项目实践
date: 2024-02-06 10:01:51
tags: vue3项目实践
---

​	摘要

<!--more-->

正文

# vue3项目

组件之间的通信

vue3的通信的方法

vue3使用props实现数据 的传递

## props

在父组件里面传递

![image-20240206183125042](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206183125042.png)

在子组件使用definprops的配置项

![image-20240206183315734](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206183315734.png)

返回的是一个对象

![image-20240206183358039](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206183358039.png)

在模板里面props是一个代理对象

可以直接写属性名，但是在setup里面不可以使用

![image-20240206183508056](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206183508056.png)

props的数据是可读

代码

```vue
<template>
  <div class="son">
       <h1>我是子组件:曹植</h1>
       <p>{{props.info}}</p>
       <p>{{props.money}}</p>
      <!--props可以省略前面的名字--->
       <p>{{info}}</p>
       <p>{{money}}</p>
       <button @click="updateProps">修改props数据</button>
  </div>
</template>

<script setup lang="ts">
//需要使用到defineProps方法去接受父组件传递过来的数据
//defineProps是Vue3提供方法,不需要引入直接使用
let props = defineProps(['info','money'])
console.log(props)
//按钮点击的回调
const updateProps = ()=>{
  // props.money+=10;  props:只读的
  console.log(props.info)
}
</script>

<style scoped>
.son{
  width: 400px;
  height: 200px;
  background: hotpink;
}
</style>
```

## 自定义事件 

之前的事件回调

还是一样这是原生的dom事件

![image-20240206184041890](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206184041890.png)

自定义事件

**过过过开始项目**

# 尚硅谷项目

## 项目初始配置

如果想在项目启动以后自动打开浏览器的话

在配置文件中添加

![image-20240213171052357](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213171052357.png)

我使用wbstorm就不需要了

### **eslink的配置**

**eslint中文官网:http://eslint.cn/**

ESLint最初是由[Nicholas C. Zakas](http://nczonline.net/) 于2013年6月创建的开源项目。它的目标是提供一个插件化的**javascript代码检测工具**

首先安装eslint

```
pnpm i eslint -D
```

生成配置文件:.eslint.cjs

```
npx eslint --init
```

##### vue3环境代码校验插件

```
# 让所有与prettier规则存在冲突的Eslint rules失效，并使用prettier进行代码检查
"eslint-config-prettier": "^8.6.0",
"eslint-plugin-import": "^2.27.5",
"eslint-plugin-node": "^11.1.0",
# 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低
"eslint-plugin-prettier": "^4.2.1",
# vue.js的Eslint插件（查找vue语法错误，发现错误指令，查找违规风格指南
"eslint-plugin-vue": "^9.9.0",
# 该解析器允许使用Eslint校验所有babel code
"@babel/eslint-parser": "^7.19.1",
```

##### 安装指令

```bash
pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser
```

修改为

```js
	
// @see https://eslint.bootcss.com/docs/rules/
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /* 指定如何解析语法 */
  parser: 'vue-eslint-parser',
  /** 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* 继承已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', '@typescript-eslint'],
  /*

   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
       rules: {
// eslint（https://eslint.bootcss.com/docs/rules/）
'no-var': 'error', // 要求使用 let 或 const 而不是 var
'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
'no-unexpected-multiline': 'error', // 禁止空余的多行
'no-useless-escape': 'off', // 禁止不必要的转义字符

// typeScript (https://typescript-eslint.io/rules)
'@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
'@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
'@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
'@typescript-eslint/no-non-null-assertion': 'off',
'@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
'@typescript-eslint/semi': 'off',

// eslint-plugin-vue (https://eslint.vuejs.org/rules/)
'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式},
}
```
忽略检查的配置

![image-20240213174315336](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213174315336.png)

运行的指令

package.json新增两个运行脚本

```js
"scripts": {
    "lint": "eslint src",//检查语法
    "fix": "eslint src --fix",//对不符合语法的进行进行纠正
}
```

### 配置pretriter

有了eslint，为什么还要有prettier？eslint针对的是javascript，他是一个检测工具，包含js语法以及少部分格式问题，在eslint看来，语法对了就能保证代码正常运行，格式问题属于其次；

而prettier属于格式化工具，它看不惯格式不统一，所以它就把eslint没干好的事接着干，另外，prettier支持

包含js在内的多种语言。

总结起来，**eslint和prettier这俩兄弟一个保证js代码质量，一个保证代码美观。**

**安装包**

```
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
```

创建.prettierrc.json添加规则

```js
{
  "singleQuote": true,//字符串都是单引号
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

.**prettierignore**忽略文件

```js
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```

在使用npm run link检查是否有错误

使用npm run fix进行修补

### 配置stylelink

[stylelint](https://stylelint.io/)为css的lint工具。可格式化css代码，检查css语法错误与不合理的写法，指定css书写顺序等。

我们的项目中使用scss作为预处理器，安装以下依赖：

```bash
pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
```

`.stylelintrc.cjs`**配置文件**

```
// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```

**.stylelintignore忽略文件**

```

/node_modules/*
/dist/*
/html/*
/public/*

```

**运行的脚本**

```
 "scripts": {
    "dev": "vite --open",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "fix": "eslint src --fix",
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
    "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
  },
```

有的就不用添加了

**当我们运行`pnpm run format`的时候，会把代码直接格式化**

## husky

在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。

要做到这件事情，就需要利用husky在代码提交之前触发git hook(git在客户端的钩子)，然后执行`pnpm run format`来自动的格式化我们的代码。

安装`husky`

```
pnpm install -D husky
```

执行

```
npx husky-init
```

会在根目录下生成个一个.husky目录，在这个目录下面会有一个pre-commit文件，这个文件里面的命令在我们执行commit的时候就会执行

在`.husky/pre-commit`文件添加如下命令：

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm run format
```

当我们对代码进行commit操作的时候，就会执行命令，对代码进行格式化，然后再提交。

![image-20240213193903444](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213193903444.png)

## 配置commitlink

## 团队合作统一包管理工具

# 项目集成 

## 集成element-plus

**指令**

```bash
pnpm install element-plus @element-plus/icons-vue
```

不考虑内存的大小的话

**使用完整引入**

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

**按需引入的话**

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```
npm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中

**国际化配置**

Element Plus 提供了全局配置国际化的配置。

**在入口文件里面这么写**

```js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import App from './App.vue'

const app=createApp(App)
app.use(ElementPlus)
app.use(ElementPlus, { locale });
app.mount('#app')
```

会有报错

所以应该

![image-20240213203933993](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213203933993.png)

直接跳过这个检查

## src别名设置

在开发项目的时候文件与文件关系可能很复杂，因此我们需要给src文件夹配置一个别名！！！

```
// vite.config.ts
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
        }
    }
})
```

**TypeScript 编译配置**

```
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { //路径映射，相对于baseUrl
      "@/*": ["src/*"] 
    }
  }
}
```

## 环境变量配置

**项目开发过程中，至少会经历开发环境、测试环境和生产环境(即正式环境)三个阶段。不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。**

开发环境（development）
顾名思义，开发使用的环境，每位开发人员在自己的dev分支上干活，开发到一定程度，同事会合并代码，进行联调。

测试环境（testing）
测试同事干活的环境啦，一般会由测试同事自己来部署，然后在此环境进行测试

生产环境（production）
生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(正式提供给客户使用的环境。)

注意:一般情况下，一个环境对应一台服务器,也有的公司开发与测试环境是一台服务器！！！

项目根目录分别添加 开发、生产和测试环境的文件!

```
.env.development//开发模式的配置文件
.env.production//生产模式的配置文件
.env.test//测试环境的配置文件
```

开发的

```
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/dev-api'
```

其他的文件也是这样的格式

添加运行的命令

```
 "scripts": {
    "dev": "vite --open",
    "build:test": "vue-tsc && vite build --mode test",//测试
    "build:pro": "vue-tsc && vite build --mode production",//生产
    "preview": "vite preview"
  },
```

然后最后通过通过import.meta.env获取环境变量

目前是开发的环境

![image-20240213211643923](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213211643923.png)

![image-20240213211653814](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213211653814.png)

在不同的环境下获取的环境不同

## SVG图标设置

在开发项目的时候经常会用到svg矢量图,而且我们使用SVG以后，页面上加载的不再是图片资源,

这对页面性能来说是个很大的提升，而且我们SVG文件比img要小的很多，放在项目中几乎不占用资源。

**安装SVG依赖插件**

```bash
pnpm install vite-plugin-svg-icons -D
```

**在`vite.config.ts`中配置插件**

```
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
export default () => {
  return {
    plugins: [
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],//矢量图标就放在src新的这个目录
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  }
}
```

然后再入口文件

```js
import 'virtual:svg-icons-register'
```

好厉害

svg矢量图

直接下载代码然后粘贴就可以获取到图片

![image-20240213212704028](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213212704028.png)

使用需要这样的

```vue
<template>
  <h1>hahah</h1>
  <svg>
<!--    容器-->
    需要与use联合使用
    <use xlink:href="#icon-phone"></use>
  </svg>
</template>
```

这里的属性值务必是#icon-svg图标的名字

然后可以条颜色和大小

### svg封装为全局组件

我们之前把图标封装成一个组件

然后在使用组件

然后我们可以传递给图表组件一些值

让图标组件显示不同的图标



因为项目很多模块需要使用图标,因此把它封装为全局组件！！！

**在src/components目录下创建一个SvgIcon组件:代表如下**

在入口文件注册

![image-20240213214758802](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240213214758802.png)

这样其他的组件就不用引入很多次了

### 自定义插件注册svg全局组件

## sass集成

我们目前在组件内部已经可以使用scss样式,因为在配置styleLint工具的时候，项目当中已经安装过sass sass-loader,因此我们再组件内可以使用scss语法！！！需要加上lang="scss"

```
<style scoped lang="scss"></style>
```

接下来我们为项目添加一些全局的样式

在src/styles目录下创建一个index.scss文件，当然项目中需要用到清除默认样式，因此在index.scss引入reset.scss

```
@import reset.scss
```

在入口文件引入

```
import '@/styles'
```

但是你会发现在src/styles/index.scss全局样式文件中没有办法使用$变量.因此需要给项目中引入全局变量$.

在style/variable.scss创建一个variable.scss文件！

在vite.config.ts文件配置如下:

```
	css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
```

新增上面的配置项

**`@import "./src/styles/variable.less";`后面的`;`不要忘记，不然会报错**!

![image-20240214102436853](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240214102436853.png)

然后再

这里就可以使用

![image-20240214102504903](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240214102504903.png)

## mock数据

安装依赖:https://www.npmjs.com/package/vite-plugin-mock

```
pnpm install -D vite-plugin-mock mockjs
使用
```

在 vite.config.js 配置文件启用插件。

```
import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
export default ({ command })=> {
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
  }
}
```

在根目录创建mock文件夹:去创建我们需要mock数据与接口！！！

在mock文件夹内部创建一个user.ts文件

```ts
//用户信息数据
function createUserList() {
    return [
        {
            userId: 1,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}

export default [
    // 用户登录接口
    {
        url: '/api/user/login',//请求地址
        method: 'post',//请求方式
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码
            const { username, password } = body;
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
            )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            //如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: {checkUser} }
        },
    },
]

```

最后吧配置文件改成这样

```ts
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
//@ts-ignore
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import { UserConfigExport, ConfigEnv } from 'vite'

export default defineConfig(({command})=>{
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',//保证开发阶段能使用mock接口
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    //scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
```

**安装axios**

```
pnpm install axios
```

最后通过axios测试接口！！！

测试

```
//测试假的接口能不能使用
import axios from 'axios'
//登录接口
axios({
  url:'/api/user/login',
  method:'post',
  data:{
    username:'admin',
    password:'111111',
  }
})

```

然后

![image-20240214105546530](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240214105546530.png)

200成功了

## axios的二次封装

在开发项目的时候避免不了与后端进行交互,因此我们需要使用axios插件实现发送网络请求。在开发项目的时候

我们经常会把axios进行二次封装。

目的:

1:使用请求拦截器，可以在请求拦截器中处理一些业务(开始进度条、请求头携带公共参数)

2:使用响应拦截器，可以在响应拦截器中处理一些业务(进度条结束、简化服务器返回的数据、处理http网络错误)

在根目录下创建utils/request.ts

实验的代码

```ts
//进行二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
///第一步，利用axios对象的create的方法，去创建axios的实例
let request = axios.create({
  //@ts-ignore
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 5000, //超时的时间
})
//第二部，添加请求和响应拦截器
request.interceptors.request.use((config) => {
  //返回配置对象
  console.log(config)
  //携带公共的参数
  config.headers.token = '123'
  //config有一个headers的属性就是响应头，经常给服务器端携带公共参数
  return config
})

//第三步配置响应拦截器
request.interceptors.response.use(
  (response: any): any => {
    //成功的回调，简化数据
    return response.data //简化数据
    console.log(response)
  },
  (error: any) => {
    //失败的回调：处理http网络错误
    //定义一个变量；存储网络错误信息
    let message = ''
    //错误的http状态码
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'token 过期了'
        break
      case 403:
        message = '无权限'
        break
      case 404:
        message = '请求地址出错'
        break
      default:
        message = '网络发生了错误'
        break
    }

    //这是elementui里面提示错误信息的ui
    ElMessage({
      type: 'error',
      message,
    })

    return Promise.reject(error)
  },
)
export default request

```

实验的代码

```ts
<script setup lang="ts">
import request from "../untils/request.ts";
import {onMounted} from "vue";
onMounted(()=>{
  request({
    url:'/user/login',
    method:'post',
    data:{
      username:'admin',
      password:'111111'
    }
  }).then(res=>{
    console.log(res)
  })
})
</script>
```

## API接口统一管理

在src下新建api文件夹

## 模板的路由配置

需要四个一级路由

1.登陆界面

2.首页界面

3.自由界面

4.404界面

路由配置中

```
        {
            path:'/:pathMatch(.*)*',
            redirect:'/404',
            //@ts-ignore
            name:'Any'
        },
```

表示匹配到其他的路由话重定向到404

vue

vuerouter的配置项

```ts
    scrollBehavior(){
        return {
            left:0,
            top:0
        }
```

这段代码是Vue Router中的`scrollBehavior`方法，它用于定义路由切换时滚动行为的配置。

当用户从一个页面切换到另一个页面时，浏览器默认会将滚动位置保持在上一页面的位置。但是，在某些情况下，你可能希望在路由切换时将滚动位置重置为页面顶部或其他指定位置。

在`scrollBehavior`方法中，你可以返回一个对象来指定滚动的位置。在这个例子中，`left:0`和`top:0`表示将滚动位置设置为页面的左上角，即将滚动条位置重置为页面顶部。

通过使用这个`scrollBehavior`方法，你可以自定义路由切换时滚动的位置，提供更好的用户体验，确保页面切换后始终显示在期望的滚动位置。

追加动态的类名

![image-20240215180538007](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240215180538007.png)

然后就可以

![image-20240215180816867](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240215180816867.png)

![image-20240215180826106](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240215180826106.png)

**路由的matched属性**

可以匹配在哪个路由里面

```ts
<script setup lang="ts">
//@ts-ignore
import {useLayOutSettingStore} from "@/store/setting.ts";
import {ArrowRight} from "@element-plus/icons-vue";
import {toRefs} from "vue";
//@ts-ignore
import {useRoute} from "vue-router";

const $route = useRoute()
const layoutStore = useLayOutSettingStore();
let {fold} = toRefs(layoutStore)
const changeIcon = ()=>{
  fold.value= !fold.value
}
const hander = ()=>{
  console.log($route.matched)
}
</script>
```

![image-20240215184922790](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240215184922790.png)

还有组件的这个用法

![image-20240215185646662](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240215185646662.png)

**还有v-for的优先级大于v-if大于v-show**

**nextick**

现在我们要实现

组件的销毁和创建

就是页面的刷新

```ts
<script setup lang="ts">
//@ts-ignore
import {useLayOutSettingStore} from "@/store/setting.ts";
import {watch,ref,nextTick} from "vue";
const layoutStore = useLayOutSettingStore();
let flag = ref(true)
watch(()=>layoutStore.refsh,()=>{
  //刷新就是销毁重建组件
  flag.value = false;
  nextTick(()=>{
    flag.value = true
  })

})

</script>

<template>
  <!--  路由组件的出口-->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!--      渲染layout以一级组件的子路由-->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>
```

就是当页面销毁以后当dom完成没有了以后就会触发nextTick

![image-20240215194701746](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240215194701746.png)

如果这个页面是全屏的话就会返回true 

如果不是的话

就会返回null

使用

![image-20240215194934009](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240215194934009.png)

这个函数就可以变成全屏

![image-20240215195111269](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240215195111269.png)

第二个是退出全屏





如果想退出登陆以后

回到登录时的页面的话

把登陆时候的路径携带过去

![image-20240216113102482](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240216113102482.png)





路由守卫

全局首位

访问前有进度条

访问以后进度条消失

**路由的鉴权**

就是什么时候能够访问这个路由

有没有权限

![image-20240216115418943](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240216115418943.png)

记得在入口文件那里引入

![image-20240216115712268](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240216115712268.png)







还有注意点

在组件外部获取pinia仓库数据的话

需要先引入大仓库

需要这样

![image-20240216131632195](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240216131632195.png)





实现

![image-20240216134624505](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240216134624505.png)

![image-20240216134634627](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240216134634627.png)

## pinia的配置

![image-20240220192523750](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240220192523750.png)

![image-20240220192530251](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240220192530251.png)



立刻执行的异步函数

![image-20240220203837676](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240220203837676.png)

![image-20240220202300861](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240220202300861.png)
