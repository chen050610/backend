const db = require('../db/index.js')


//有人登录就回插入到这张表
exports.loginLog=(req,res)=>{
    const {account,name, email} = req.body
    const login_time = new Date()
    const sql = 'insert into login_log set ?'
    db.query(sql,{account,name,email,login_time},(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:"登录记录成功"
        })
    })
}
//获取登录记录的表
exports.loginLogList=(req,res)=>{
    const sql = 'select * from login_log '
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//清空登录日志 truncate 这个指令可以清空整张表
exports.clearLogList=(req,res)=>{
    const sql = 'truncate table login_log '//这样就会清空表
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:'清空成功'
        })
    })
}
//
exports.searchLoginList = (req,res)=>{
    const sql = 'select * from login_log where account = ? ORDER BY login_time limit 10'//获取最近的十条登录 数据
    db.query(sql,req.body.account,(err,result)=>{
        if (err) res.cc(err)
        res.send(result)
    })
}

