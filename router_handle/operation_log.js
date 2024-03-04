const db = require('../db/index.js')


//有人登录就回插入到这张表
exports.operationLog=(req,res)=>{
    const {operation_person,operation_content, operation_level} = req.body
    const operation_time = new Date()
    const sql = 'insert into operation_log set ?'
    db.query(sql,{operation_person,operation_content,operation_level,operation_time},(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:"操作记录成功"
        })
    })
}
//获取操作记录的表
exports.operationLogList=(req,res)=>{
    const sql = 'select * from operation_log '
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//清空操作日志 truncate 这个指令可以清空整张表
exports.clearLogList=(req,res)=>{
    const sql = 'truncate table operation_log '//这样就会清空表
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:'清空成功'
        })
    })
}
//搜索最近十条登录日志
exports.searchOperationList = (req,res)=>{
    const sql = 'select * from operation_log  where operation_person = ? ORDER BY operation_time limit 10'//获取最近的十条登录 数据
    db.query(sql,req.body.operation_person,(err,result)=>{
        if (err) res.cc(err)
        res.send(result)
    })
}