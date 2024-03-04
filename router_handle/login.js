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
        if (err) return res.cc(err)
        result.forEach((e)=>{
            e.password=''
            e.create_time = ''
            e.image_url = ''
            e.status = ''
        })
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
        if (err) return res.cc(err)
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
    const date  = new Date()
    const sql = 'update users set identity = ? ,update_time= ? where id = ?'
    db.query(sql,[req.body.identity,date,req.body.id],(err,result)=>{
        if (err) return res.cc(err)
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
        if (err) return res.cc(err)
        result.forEach((e)=>{
            e.password=''
            e.create_time = ''
            e.status = ''
        })
        res.send(result)
    })
}
//通部门对用户进行搜索
exports.searchUserDepartment=(req,res)=>{
    const sql = 'select * from users where department = ? and identity = "用户"'
    db.query(sql,req.body.department,(err,result)=>{
        if (err) return res.cc(err)
        result.forEach((e)=>{
            e.password=''
        })
        res.send(result)
    })
}
//冻结用户
exports.banUser=(req,res)=>{
    const status  = 1
    const sql = 'update users set status = ? where id = ?'
    db.query(sql,[status,req.body.id],(err,result)=>{
        if (err) return res.cc(err)
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
        if (err) return res.cc(err)
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
        if (err) return res.cc(err)
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
//获取对应身份的额总人数 identity
exports.getAdminListLength=(req,res)=>{
    const sql = 'select * from users where identity = ?'
    db.query(sql,req.body.identity,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            length:result.length
        })
    })

}
//监听换页返回数据 页码 身份
exports.returnListData=(req,res)=>{
    const number = 	 (req.body.pager - 1) * 10
    const sql = `select * from users where identity = ? limit 10 offset ${number}`
    db.query(sql,req.body.identity,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })

}
// 超级管理员路由
const superAdminRouter = [{
    name: 'home',
    path: '/home',
    meta: {title: '首页'},
    component: 'home/index'
},
    {
        name: 'set',
        path: '/set',
        meta: {title: '设置'},
        component: 'set/index'
    },
    {
        name: 'overview',
        path: '/overview',
        meta: {title: '系统概览'},
        component: 'overView/index'
    },
    {
        name: 'product_manage',
        path: '/product_manage',
        meta: {title: '产品管理员'},
        component: 'user_manage/product_manage/index'
    },
    {
        name: 'message_manage',
        path: '/message_manage',
        meta: {title: '消息管理员'},
        component: 'user_manage/message_manage/index'
    },
    {
        name: 'user_list',
        path: '/user_list',
        meta: {title: '用户列表'},
        component: 'user_manage/user_list/index'
    },
    {
        name: 'users_manage',
        path: '/users_manage',
        meta: {title: '用户管理'},
        component: 'user_manage/users_manage/index'
    },
    {
        name: 'product_list',
        path: '/product_list',
        meta: {title: '产品管理'},
        component: 'product/product_list/index'
    },
    {
        name: 'out_product_manage_list',
        path: '/out_product_manage_list',
        meta: {title: '出库管理'},
        component: 'product/out_product_manage_list/index'
    },
    {
        name: 'message_list',
        path: '/message_list',
        meta: {title: '消息管理'},
        component: 'message/message_list/index'
    },
    {
        name: 'recycle',
        path: '/recycle',
        meta: {title: '回收站'},
        component: 'message/recycle/index'
    },
    {
        name: 'file',
        path: '/file',
        meta: {title: '文件管理'},
        component: 'file/index'
    },
    {
        name: 'operationLog',
        path: '/operationLog',
        meta: {title: '操作日志'},
        component: 'operation_log/index'
    },
    {
        name: 'loginLog',
        path: '/loginLog',
        meta: {title: '登录日志'},
        component: 'login_log/index'
    },
]

// 用户管理员路由
const userAdminRouter = [
    {
        name: 'home',
        path: '/home',
        meta: {title: '首页'},
        component: 'home/index',
    },
    {
        name: 'set',
        path: '/set',
        meta: {title: '设置'},
        component: 'set/index',
    },
    {
        name: 'user_list',
        path: '/user_list',
        meta: {title: '用户列表'},
        component: 'user_manage/user_list/index',
    },
    {
        name: 'users_manage',
        path: '/users_manage',
        meta: {title: '用户管理'},
        component: 'user_manage/users_manage/index',
    },
    {
        name: 'file',
        path: '/file',
        meta: {title: '文件管理'},
        component: 'file/index',
    }
]
// 产品管理员路由
const productAdminRouter = [
    {
        name: 'home',
        path: '/home',
        meta: {title: '首页'},
        component: 'home/index',
    },
    {
        name: 'set',
        path: '/set',
        meta: {title: '设置'},
        component: 'set/index',
    },
    {
        name: 'product_list',
        path: '/product_list',
        meta: {title: '产品管理'},
        component: 'product/product_list/index',
    },
    {
        name: 'out_product_manage_list',
        path: '/out_product_manage_list',
        meta: {title: '出库管理'},
        component: 'product/out_product_manage_list/index',
    },
    {
        name: 'file',
        path: '/file',
        meta: {title: '文件管理'},
        component: 'file/index'
    },

]
// 消息管理员路由
const messageAdminRouter = [
    {
        name: 'home',
        path: '/home',
        meta: {title: '首页'},
        component: 'home/index',
    },
    {
        name: 'set',
        path: '/set',
        meta: {title: '设置'},
        component: 'set/index',
    },
    {
        name: 'message_list',
        path: '/message_list',
        meta: {title: '消息管理'},
        component: 'message/message_list/index'
    },
    {
        name: 'recycle',
        path: '/recycle',
        meta: {title: '回收站'},
        component: 'message/recycle/index'
    },
    {
        name: 'file',
        path: '/file',
        meta: {title: '文件管理'},
        component: 'file/index'
    },
]
// 普通用户路由
const userRouter = [
    {
        name: 'home',
        path: '/home',
        meta: {title: '首页'},
        component: 'home/index'
    },
    {
        name: 'set',
        path: '/set',
        meta: {title: '设置'},
        component: 'set/index'
    },
    {
        name: 'product_list',
        path: '/product_list',
        meta: {title: '产品管理'},
        component: 'product/product_list/index'
    },
    {
        name: 'out_product_manage_list',
        path: '/out_product_manage_list',
        meta: {title: '出库管理'},
        component: 'product/out_product_manage_list/index'
    },
    {
        name: 'file',
        path: '/file',
        meta: {title: '文件管理'},
        component: 'file/index'
    },
]
//返回用户的路由列表
exports.returnMenuList = (req,res)=>{
    const sql = 'select identity from users where id = ?'
    db.query(sql,req.body.id,(err,result)=>{
        if (err) return res.cc(err)
        let menu =[]
        if (result[0].identity =='超级管理员'){
            menu = superAdminRouter
        }
        if (result[0].identity =='用户管理员'){
            menu = userAdminRouter
        }
        if (result[0].identity =='产品管理员'){
            menu = productAdminRouter
        }
        if (result[0].identity =='消息管理员'){
            menu = messageAdminRouter
        }
        if (result[0].identity =='用户'){
            menu = userRouter
        }
        res.send(menu)
    })
}