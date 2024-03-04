---
title: ES6~ES11
date: 2024-02-06 10:07:23
tags:
---

​	摘要

<!--more-->

正文

## let

声明变量

![image-20240206101254534](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206101254534.png)

**特性**

1.变量不可以重复声明

![image-20240206101322323](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206101322323.png)

2.块级作用域

只在代码块中有效

![image-20240206101412018](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206101412018.png)

但是let声明的不行

在这些

![image-20240206101442908](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206101442908.png)

都有大括号

4.没有变量提升

5.不影响作用域链

![image-20240206101555679](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206101555679.png)

问题

![image-20240206102042359](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206102042359.png)

这么写就出问题

这样定义的var定义的是全局作用域

最后执行玩i=3

之后点击就会调用上面的回调函数

然后i是全局的=3

所以报错了

## const

规则

1.一定要赋值初始的值

2.一般常量使用大写

3.常量的值不允许修改

4.也是块级作用域

5.对于数组或对象中的元素修改，不算对常量进行修改，因为地址没有修改

## 解构赋值

进阶的时候说过

## 模板字符串

符号``

特性

1.内容可以出现换行符

单引号的就会报错

![image-20240206103239189](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206103239189.png)

只能使用+进行拼接、

2.变量的拼接

![image-20240206103342783](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206103342783.png)

## 简化对象

![image-20240206103429672](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206103429672.png)

就可以简写成这样的

![image-20240206103448916](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206103448916.png)

函数中的方法

![image-20240206103524777](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206103524777.png)

可以省略冒号和function

![image-20240206103606541](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206103606541.png)

## 箭头函数

特性

1.this是静态的

2.箭头函数的this不会因为使用call，apply和bind改变指向

![image-20240206104104392](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206104104392.png)

3.不能作为构造函数

![image-20240206104145785](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206104145785.png)

4.不能使用arguments变量

![image-20240206104223094](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206104223094.png)

5.箭头函数的简写

当形参只有一个可以省略

当代码只有一行可以省略大括号，此时的return也必须省略

![image-20240206104353904](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206104353904.png)

之前筛选偶数

![image-20240206104830757](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206104830757.png)

使用箭头函数

![image-20240206104909709](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206104909709.png)

更加的简洁

![image-20240206104936070](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206104936070.png)

不适合用于dom对象的回调，还有对象的方法

![image-20240206105025067](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206105025067.png)

这里的this就不会指向对象了 

## 形参初始值

![image-20240206105142156](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206105142156.png)

具有默认值的形参放在后面

放在前面也行但是没意义

![image-20240206105256608](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206105256608.png)

可以解构赋值结合使用

![image-20240206105856779](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206105856779.png)

在参数传过来的时候就已经解构

然后下面直接使用就可以了 

也可以使用初始值

![image-20240206110005448](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206110005448.png)

## rest参数

用来代替arguments

这个

![image-20240206110150495](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206110150495.png)

是一个对象

但是rest参数得到的数组

![image-20240206110228118](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206110228118.png)

而且得到的是真数组，可以使用数组的方法

rest**参数要放在参数的后面**

![image-20240206110318406](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206110318406.png)

不能放在前面

## 扩展运算符

![image-20240206110422750](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206110422750.png)

应用

![image-20240206110548733](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206110548733.png)

之前使用concat

2.数组的克隆

![image-20240206110619583](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206110619583.png)

如果里面有数组类型 的数组那么这个也是浅拷贝

3.将为数组转为真数组

这样

![image-20240206111308800](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206111308800.png)

就把伪数组转为真数组

## 数据类型symbol

![image-20240206111424682](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206111424682.png)

特点

![image-20240206111436714](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206111436714.png)

创建symbol

symbol的三种创建方法

![image-20240206111736591](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206111736591.png)

s2和s3作比较是false

s4和s5作比较是true

数据类型

USONB

U：undefined

S：String

O：object

N：null，number

B：bool

 使用场景

给对象添加属性和方法，表示独一无二的

`Symbol`

 是 ECMAScript 6 中新增的一种基本数据类型，它是一种原始值，表示独一无二的标识符。`Symbol` 的主要作用是在对象属性名的定义中起到唯一标识符的作用，避免命名冲突。

具体来说，`Symbol` 可以通过 `Symbol()` 函数创建，每个 `Symbol` 都是唯一的，即使它们具有相同的名称。

`Symbol` 主要有以下几个应用：

1. 对象属性名：可以通过 `Symbol` 创建一个唯一的属性名，并且这个属性名不会出现在 `for...in`、`Object.keys()` 等方法的遍历中。

```
javascriptCopy Codelet obj = {};
let s1 = Symbol();
let s2 = Symbol('symbol2');

obj[s1] = 'symbol1';
obj[s2] = 'symbol2';

console.log(obj[s1]); // "symbol1"
console.log(obj[s2]); // "symbol2"
console.log(obj);     // { Symbol(): "symbol1", Symbol(symbol2): "symbol2" }

for(let key in obj) {
  console.log(key);  // 无输出，因为 Symbol 类型的属性不会被遍历出来
}

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(), Symbol(symbol2)]
```

1. 定义常量：可以使用 `Symbol` 定义一个全局唯一的常量，用于替代字符串或数字类型的常量。

```
javascriptCopy Codeconst RED = Symbol('red');
const BLUE = Symbol('blue');
const GREEN = Symbol('green');

console.log(RED === BLUE); // false

let color = RED;
if (color === RED) {
  console.log('Color is red.');
}
```

1. 防止属性名冲突：可以使用 `Symbol` 作为对象属性名，避免属性名冲突。

```
javascriptCopy Codeconst COLOR_RED = Symbol();
const COLOR_BLUE = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_BLUE;
    case COLOR_BLUE:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
  }
}

console.log(getComplement(COLOR_RED)); // Symbol()
```

需要注意的是，`Symbol` 是一种特殊类型的值，不可改变、不可枚举，也不支持与其他类型的值进行自动类型转换。因此在使用 `Symbol` 时需要格外小心，避免出现意外的错误。

![image-20240206113209006](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206113209006.png)

![image-20240206120244419](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206120244419.png)

这个时候就会存在变量覆盖的情况

这样就可以

![image-20240206120408308](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206120408308.png)

## 迭代器

![image-20240206120611265](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206120611265.png)

for in获取的是键名

for of'获取的是键值

用symbol声明的变量，取值的时候一定要使用.

 例子

![image-20240206163856705](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206163856705.png)

symbol定义的值没有办法进行遍历

![image-20240206164041953](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206164041953.png)

用静态方法查看keys

![image-20240206164128856](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206164128856.png)

发现是undefined

这样的可以获取

![image-20240206164232568](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206164232568.png)



## **先跳过迭代器和生成器有些困难**

## promise

![image-20240206163017558](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206163017558.png)

解释

![image-20240206163234988](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206163234988.png)

settimeout当作io操作

如果成功调用

## map和set

表示无重复值的有序列表

集合的增加和删除

![image-20240206164619035](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206164619035.png)

判断集合里面有没有哪些值

![image-20240206164702097](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206164702097.png)

返回false和true

集合的长度

![image-20240206164731963](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206164731963.png)

遍历

![image-20240206164956355](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206164956355.png)

这里的值和键是相等的

将set转为数组

这样的

![image-20240206165110785](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206165110785.png)

使用扩展运算符

1.set中的对象的引用无法被释放

![image-20240206165245829](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206165245829.png)

解决

使用弱引用

使用weakset![image-20240206165323366](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206165323366.png)

![image-20240206165334653](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206165334653.png)

weakset的注意事项

1.不能传入非对象类型的参数

2.不可以迭代，就是遍历不出

3.没有foreeach的方法

4.没有size属性

### map

键值对的有序列表

键和值是任意的类型

![image-20240206165620071](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206165620071.png)

![image-20240206165631575](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206165631575.png)

获取值map.get

![image-20240206165720272](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206165720272.png)

还是哪些的方法

或者这么初始化

map

![image-20240206165900000](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206165900000.png)

还是缺点就是引用 的对象没有办法被释放

需要使用weakmap

## 数组的扩展用法

### from（）

将伪数组转为真数组

其实更简单的方法是使用扩展运算符

![image-20240206170219724](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206170219724.png)

from还有第二个参数

用来对数组每一个值进行

![image-20240206170335456](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206170335456.png)

### of（）

将一组值转为数组

![image-20240206170442470](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240206170442470.png)
