title: jsonp解决跨域
date: 2024-02-18 15:46:45
tags: 

<!--more-->

# Jsonp解决跨域问题

最基础的在外部调用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
    function test(data){
        console.log(data)
    }
</script>

<script>
    test(11)
</script>
</body>
</html>
```

如果不同的文件

这样

```html
<script>
    function test(data){
        console.log(data)
    }
</script>
<script src="1.js"></script>
```

依旧可以实现

这样也可以实现，动态加载script

```js
<script>
    function test(data){
        console.log(data)
    }
    let oscript = document.createElement('script')
    oscript.src =  '1.js'
    document.body.appendChild(oscript)
</script> 
```

所以

1.script没有跨域限制

2.后端配合返回的是函数调用的形式，把需要传递的内容放在参数里面

3.前端声明好这个函数

举例

下面是接口

会返回函数调用的形式，里面是数据

![image-20240218160255156](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240218160255156.png)

然后在文件里面用src引入

![image-20240218160322757](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240218160322757.png)

然后在定义这个方法

![image-20240218160342002](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240218160342002.png)

这样就可以拿到数据

一般后端配合在接口名字处传参

![image-20240218160503575](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240218160503575.png)

这样前端传过来什么数据

函数的调用的名称就是什么





## jsonp的缺点

只能做get的请求，无法post，put





## 实践

百度其实也是使用了jsonp

当搜索一些东西的时候

前端会把搜索的东西传递给后端的接口

然后接口返回一个jsonp格式的数据

![image-20240218162316398](https://hututu345.oss-cn-beijing.aliyuncs.com/typora/image-20240218162316398.png)
