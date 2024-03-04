const db = require('../db/index.js')
// 导入bcrypt加密中间件
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const {register} = require("./login");
fs = require('fs')
//上传像的接口
exports.uploadAvator =(req,res)=>{
    const onlyId = crypto.randomUUID()
    let oldName = req.files[0].filename
    let newName = Buffer.from(req.files[0].originalname,'latin1').toString('utf8')
    fs.renameSync('./public/upload/'+oldName,'./public/upload/'+newName)
    const sql = 'insert into image set ?'
    db.query(sql,{
        image_url:`http://127.0.0.1:3007/upload/${newName}`,
        onlyId
    },(err,result)=>{
        if (err) return res.cc(err)
        res.send ({
            onlyId,
            status:0,
            url:'http://127.0.0.1:3007/upload/'+newName
        })
    })
}
//需要从前端接收onlyid,account url
exports.bindAccount =(req,res)=>{
    const {account,onlyId,url} = req.body
    const sql = 'update image set account = ? where onlyId = ?'
    db.query(sql,[account,onlyId],(err,result)=>{
        if (err) return res.cc(err)
        if (result.affectedRows == 1){
            const sql1 = 'update users set image_url = ? where account = ?'
            db.query(sql1,[url,account],(err,result)=>{
                if (err) {return res.cc(err)}
                res.send({
                    status:0,
                    message:"修改成功"
                })
            })
        }
    })
}
//修改密码
exports.changePassword = (req,res)=>{
    const sql = 'select password from users where id = ?'
    db.query(sql,req.body.id,(err,result)=>{
        if (err) return res.cc(err)
        //bcrypt
        const compareResult = bcrypt.compareSync(req.body.oldPassword,result[0].password)
        if (!compareResult){
            res.send({
                status:1,
                message:"原密码错误"
            })
        }
        req.body.password = bcrypt.hashSync(req.body.newPassword,10)
        const sql1 = 'update users set password = ? where id = ?'
        db.query(sql1,[req.body.password,req.body.id],(err,result)=>{
            if (err) return res.cc(err)
            res.send({
                status:0,
                message:'修改成功'
            })
        })
    })
}



//获取用户信息
exports.getUserInfo = (req,res) =>{
    const  sql1 = 'select * from users where id = ?'
    db.query(sql1,req.body.id,(err,result)=>{
        if (err) return res.cc(err)
        result[0].password  = ''
        res.send(result[0])
    })
}

//修改姓接收参数 id name
exports.changeName = (req,res) =>{
    const {id,name} = req.body
    const sql = 'update users set name = ? where id = ?'
    db.query(sql,[name,id],(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:"修改成功"
        })
    })
}
//修改性别
exports.changeSex = (req,res) =>{
    const {id,sex} = req.body
    const sql = 'update users set sex = ? where id = ?'
    db.query(sql,[sex,id],(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:"修改成功"
        })
    })
}
//修改邮箱
exports.changeEmail = (req,res) =>{
    const {id,email} = req.body
    const sql = 'update users set email = ? where id = ?'
    db.query(sql,[email,id],(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:"修改成功"
        })
    })
}

    //验证账号域邮箱是否一致
    exports.varifyAccountAndEmail = (req,res)=>{
        const{account,email} = req.body
        const sql = 'select * from users where account = ?'
        db.query(sql,account,(err,result)=>{
            if (err) return  res.cc(err)
            if (result[0].email === email){res.send({
                status:0,
                message:"查询成功",
                id:result[0].id
            })}else{
                res.send({
                    status:1,
                    message:"查询失败"
                })
            }
        })
    }

    //修改密码
    exports.changePasswordInlogin=(req,res)=>{
        req.body.newPassword = bcrypt.hashSync(req.body.newPassword,10)
        const sql = 'update users set password = ? where id= ?'
        db.query(sql,[req.body.newPassword,req.body.id],(err,result)=>{
            if (err) return res.cc(err)
            res.send({
                status:0,
                message:'更改成功'
            })
        })
    }


