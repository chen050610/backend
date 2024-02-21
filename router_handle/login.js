const db = require('../db/index.js')
// 导入bcrypt加密中间件
const bcrypt = require('bcryptjs')
// 导入jwt,用于生成token
const jwt = require('jsonwebtoken')
// 导入jwt配置文件，用于加密跟解密
const jwtconfig = require('../jwt_config/index.js')

exports.register = (req, res) => {
    // req是前端传过来的数据,也就是request,res是返回给前端的数据,也就是response
    const reginfo = req.body
    // 第一步,判断前端传过来的数据有没有空
    if (!reginfo.account || !reginfo.password) {
        return res.send({
            status: 1,
            message: '账号或者密码不能为空'
        })
    }
    // 第二步,判断前端传过来账号有没有已经存在在数据表中
    // 需要使用mysql的select语句
    const sql = 'select * from users where account = ?'
    // 第一个参数是执行语句，第二个是参数，第三个是一个函数，用于处理结果
    db.query(sql, reginfo.account, (err, results) => {
        if (err) {
            console.log(err)
            return res.send({
                status: 1,
                message: '注册账号失败'
            })
        }

        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '账号已存在'
            })
        }
        // 第三步,对密码进行加密
        // 需要使用加密中间件 bcrypt.js
        // bcrypt.hashSyncd第一个参数是传入的密码，第二个参数是加密后的长度
        reginfo.password = bcrypt.hashSync(reginfo.password, 10)
        // 第四步,把账号跟密码插入到users表里面
        const sql1 = 'insert into users set ?'
        // 注册身份
        const identity = '用户'
        // 创建时间
        const create_time = new Date()
        db.query(sql1, {
            account: reginfo.account,
            password: reginfo.password,
            // 身份
            identity,
            // 创建时间
            create_time,
            // 初始未冻结状态为0
            status: 0,
        }, (err, results) => {
            if (err) {
                console.log(err)
                return res.send({
                    status: 1,
                    message: '注册账号失败'
                })
            }
            // 第一个,插入失败
            // affectedRows为影响的行数，如果插入失败，那么就没有影响到行数，也就是行数不为1
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '注册账号失败'
                })
            }
            res.send({
                status: 0,
                message: '注册账号成功'
            })
        })
    })
}

exports.login = (req, res) => {
    const loginfo = req.body
    // 第一步 查看数据表中有没有前端传过来的账号
    const sql = 'select * from users where account = ?'
    db.query(sql, loginfo.account, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: '登录失败'
            })
        }
        if (results.length !== 1) {
            return res.send({
                status: 1,
                message: '登录失败'
            })
        }
        // 第二步 对前端传过来的密码进行解密
        const compareResult = bcrypt.compareSync(loginfo.password, results[0].password)
        if (!compareResult) {
            return res.send({
                status: 1,
                message: '登录失败'
            })
        }
        // 第三步 对账号是否冻结做判定
        if (results[0].status == 1) {
            return res.send({
                status: 1,
                message: '账号被冻结'
            })
        }
        // 第四步 生成返回给前端的token
        // 剔除加密后的密码,头像,创建时间,更新时间
        const user = {
            ...results[0],
            password: '',
            imageUrl: '',
            create_time: '',
            update_time: '',
        }
        // 设置token的有效时长 有效期为7个小时
        const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
            expiresIn: '7h'
        })
        res.send({
            results: results[0],
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr,
        })
    })
}
//————————————————————————————————————————————————————-----------------------用户管理
//新增用户
exports.createAdmin=(req,res)=>{
    const {account,password,name,sex,email,department,identity} = req.body
    //判断账号是否存在
    const sql = 'select * from users where account = ?'
    db.query(sql,account,(err,result)=>{
        if (err) return res.cc(err)
        // if (result.length > 0){
        //     res.send({
        //         status:0,
        //         message:'更改成功'
        //     })
        // }
        const hashpassword =  bcrypt.hashSync(password,10)
        const sql1 = 'insert into users set ?'
        const create_time = new Date()
        db.query(sql1, {
            account,
            password:hashpassword,
            // 身份
            identity,
            // 创建时间
            create_time,
            // 初始未冻结状态为0
            status: 0,
            name,sex,email,department,
        }, (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    message: '添加管理员失败'
                })
            }
            // 第一个,插入失败
            // affectedRows为影响的行数，如果插入失败，那么就没有影响到行数，也就是行数不为1
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '添加管理员失败'
                })
            }
            res.send({
                status: 0,
                message: '添加管理员成功'
            })
        })
    })
}
//获取管理员列表
exports.getAdminList=(req,res)=>{
    const sql = 'select * from users where identity = ?'
    db.query(sql,req.body.identity,(err,result)=>{
        if (err) returnres.cc(err)
        res.send(result)
    })
}
//编辑管理员
exports.editAdmin=(req,res)=>{
    const {id,name,sex,email,department} = req.body
    const date = new Date()
    const updateContent = {
        id,name,sex,email,department,update_time:date,
    }
    const sql = 'update users set ? where id= ?'
    db.query(sql,[updateContent,updateContent.id],(err,result)=>{
        if (err) returnres.cc(err)
        res.send({
            status:0,
            message:'修改管理员成功'
        })
    })
}
//对管理员进型降职,参数id
exports.changeIdentityToUser=(req,res)=>{
    const identity  = '用户'
    const sql = 'update users set identity = ? where id = ?'
    db.query(sql,[identity,req.body.id],(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:'降级成功'
        })
    })
}
//对用户进行赋权
    exports.changeIdentityToAdmin=(req,res)=>{
    const sql = 'update users set identity = ? where id = ?'
    db.query(sql,[req.body.identity,req.body.id],(err,result)=>{
        if (err) returnres.cc(err)
        res.send({
            status:0,
            message:'赋权成功'
        })
    })
}
//通过账号对用户进行搜索
exports.searchUser=(req,res)=>{
    const sql = 'select * from users where account = ?'
    db.query(sql,req.body.account,(err,result)=>{
        if (err) returnres.cc(err)
        res.send(result)
    })
}

//冻结用户
exports.banUser=(req,res)=>{
    const status  = 1
    const sql = 'update users set status = ? where id = ?'
    db.query(sql,[status,req.body.id],(err,result)=>{
        if (err) returnres.cc(err)
        res.send({
            status:0,
            message:'冻结成功'
        })
    })
}
//解冻用户
exports.hotUser=(req,res)=>{
    const status  = 0
    const sql = 'update users set status = ? where id = ?'
    db.query(sql,[status,req.body.id],(err,result)=>{
        if (err) returnres.cc(err)
        res.send({
            status:0,
            message:'解冻成功'
        })
    })
}
//获取冻结用户列表
exports.getBanList=(req,res)=>{
    const sql = 'select * from users where status = "1"'
    db.query(sql,(err,result)=>{
        if (err) returnres.cc(err)
        res.send(result)
    })
}
//删除用户的操作
exports.deleteUser=(req,res)=>{
    const sql = 'delete from users where id = ?'
    db.query(sql,req.body.id,(err,result)=>{
        if (err) return res.cc(err)
        const sql1 ='delete from image where account = ?'
        db.query(sql1,req.body.account,(err,result)=>{
            if (err) return res.cc(err)
            res.send({
                status:0,
                message:'删除用户成功'
            })
        })


    })
}