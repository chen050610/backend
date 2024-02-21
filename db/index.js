const mysql = require('mysql')//导入

//创建连接
const db = mysql.createPool({
    host:'localhost',
    user:'back_system',
    password:'123456',
    database:'back_system'
})


//对外暴露数据库
module.exports = db