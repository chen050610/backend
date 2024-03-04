// 导入express框架
const express = require('express')
// 创建express实例
const app = express()
// 导入body-parser
var bodyParser = require('body-parser')

// 导入cors
const cors = require('cors')
// 全局挂载
app.use(cors())

// parse application/x-www-form-urlencoded
//当extend为false时值为数组或者字符串，当extend为true时，值为任意类型
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。
const multer = require("multer");
// 在server服务端下新建一个public文件，在public文件下新建upload文件用于存放图片
const upload = multer({ dest:'./public/upload' })
app.use(upload.any())
// 静态托管
app.use(express.static("./public"));
//
app.use((req, res, next) => {
    // status=0为成功,=1为失败,默认设为1,方便处理失败的情况
    res.cc = (err, status = 1) => {
        res.send({
            status,
            // 判断这个error是错误对象还是字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

const jwtconfig = require('./jwt_config/index')
const {expressjwt:jwt}  = require('express-jwt') //结构赋值，后面是起别名
// app.use(jwt({
//     secret:jwtconfig.jwtSecretKey,algorithms:['HS256']
// }).unless({
//     path:[/^\/api\//] //排除登录和注册的不需要token，因为token实在登陆以后生成的,其余都需要携带token
// }))


const loginRouter = require('./router/login')
const Joi = require("joi");
app.use('/api',loginRouter)
const userRouter = require('./router/userinfo')
app.use('/user',userRouter)
const setRouter = require('./router/setting')
app.use('/set',setRouter)
const productRouter = require('./router/product.js')
app.use('/pro',productRouter)
const messageRouter = require('./router/message')
app.use('/msg',messageRouter)
const fileRouter = require('./router/file')
app.use('/file',fileRouter)
const login_logRouter = require('./router/login_log')
app.use('/lLog',login_logRouter)
const operation_logRouter = require('./router/operation_log')
app.use('/oLog',operation_logRouter)
const overviewHandler = require('./router/overview')
app.use('/ov',overviewHandler)
//对不符合joi规则进行报错
// 对不符合joi规则的情况进行报错
app.use((req, res, next) => {
    if (err instanceof Joi.ValidationError) return res.cc(err)
})

//绑定监听的端口
app.listen(3007,()=>{
    console.log('http://127.0.0.1:3007')
})