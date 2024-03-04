const db = require('../db/index.js')
//创建产品
exports.publishMessage = (req,res)=>{
    const {
        message_title,
        message_category,
        message_publish_department,
        message_publish_name,
        message_receipt_object,
        message_content,
        message_level,
    }  = req.body
    const message_publish_time = new Date()
    const sql = 'insert into message set ?'
    db.query(sql,{
        message_title,
        message_category,
        message_publish_department,
        message_publish_name,
        message_click_number:0,
        message_publish_time,
        message_status:0,
        message_receipt_object,
        message_content,
        message_level,
    },(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:"发布消息成功"
        })
    })
}
//获取公司的消息
exports.companyMessageList = (req,res)=>{
    const sql = 'select * from message where message_category = "公司公告" and message_status ="0" '
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//获取系统额消息
exports.systemMessageList = (req,res)=>{
    const sql = 'select * from message where message_category = "系统消息" and message_status ="0" '
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//编辑公告
exports.editMessage  = (req,res)=>{
    const {
        message_title,
        message_receipt_object,
        message_publish_name,
        message_content,
        message_level,
        id,
    }  = req.body
    const message_update_time = new Date()
    const sql = 'update message set message_title = ? ,message_publish_name = ?, message_receipt_object = ? , message_content=? , message_level = ? , message_update_time = ? where id = ?'
    db.query(sql,[
        message_title,
        message_publish_name,
        message_receipt_object,
        message_content,
        message_level,
        message_update_time,
        id
    ],(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:"编辑消息成功"
        })
    })
}
    //通过部门进行筛选
exports.searchMessageBydepartment  = (req,res)=>{
    const sql = 'select * from message where message_publish_department = ? and message_status = "0"'
    db.query(sql,req.body.message_publish_department,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
////通过发布等级进行筛选
exports.searchMessageByLevel  = (req,res)=>{
    const sql = 'select * from message where message_level = ?  and message_status = "0"'
    db.query(sql,req.body.message_level,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//获取公告系统消息
exports.getMessage  = (req,res)=>{
    const sql = 'select * from message where id = ?'
    db.query(sql,req.body.id,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//更新点击率
exports.updateClick  = (req,res)=>{
    const{
        message_click_number,//当前的点击率
        id
    }  = req.body
    number  = message_click_number *1 +1
    const sql = 'update message set message_click_number = ? where id = ?'
    db.query(sql,[number,id],(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:"点击率增加"
        })
    })
}

//初次删除，第一次额删除就会在回收站
exports.firstDelete=(req,res)=>{
    const message_status = 1
    const message_delete_time = new Date()
    const sql = 'update message set message_status = ? , message_delete_time = ? where id = ?'
    db.query(sql,[message_status,message_delete_time,req.body.id],(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除成功'
        })
    })
}

//获取回收站的列表
exports.recyleList  = (req,res)=>{
    const sql = 'select * from message where message_status = "1" '
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//还原操作
exports.recover  = (req,res)=>{
    const message_status = 0
    const message_update_time = new Date()
    const sql = 'update message set message_status = ? , message_update_time = ? where id = ?'
    db.query(sql,[message_status,message_update_time,req.body.id],(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '还原成功'
        })
    })
}
//最后的删除的操作
exports.deleteMessage=(req,res)=>{
    const sql = 'delete from message where id = ?'
    db.query(sql,req.body.id,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:'删除消息成功'
        })
    })
}
//
exports.getCompanyMessageLength=(req,res)=>{
    const sql = 'select * from message where message_category="公司公告" and message_status = "0" '
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            length:result.length
        })
    })
}
//获取系统消息总数
exports.getSystemMessageLength=(req,res)=>{
    const sql = 'select * from message where message_category = "系统消息" and message_status = "0" '
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            length:result.length
        })
    })
}

exports.returnCompanyListData=(req,res)=>{
    const number = 	 (req.body.pager - 1) * 10
    const sql = `select * from message where message_category="公司公告" ORDER BY message_publish_time limit 10 offset ${number}`
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//返回系统消息
exports.returnSystemListData=(req,res)=>{
    const number = 	 (req.body.pager - 1) * 10
    const sql = `select * from message where message_category="系统消息" ORDER BY message_publish_time limit 10 offset ${number}`
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//回收站的长度
//
exports.getRecyleMessageLength=(req,res)=>{
    const sql = 'select * from message where  message_status = "1" '
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            length:result.length
        })
    })
}
//监听换页
exports.returnRecycleListData=(req,res)=>{
    const number = 	 (req.body.pager - 1) * 10
    const sql = `select * from message where message_status = "1" ORDER BY message_delete_time limit 10 offset ${number}`
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}