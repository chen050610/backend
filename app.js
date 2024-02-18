const express = require('express')
const app = express()
//
var bodyParser = require('body-parser')

const cors = require('cors')//解决跨域
app.use(cors())//全局挂载
// parse application/x-www-form-urlencoded
//当extend为false时值为数组或者字符串，当extend为true时，值为任意类型
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//绑定监听的端口
app.listen(3007,()=>{
    console.log('http://127.0.0.1:3007')
})