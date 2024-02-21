//登录注册路由
const express = require('express')
const Joi = require('joi')

const router = express.Router()
//导入login的路由处理模块
const loginHandler = require('../router_handle/login')
//导入验证规则
const expressJoi = require('@escook/express-joi')
const {
    login_limit
} = require('../limit/login')


router.post('/register',expressJoi(login_limit),loginHandler.register)
router.post('/login',expressJoi(login_limit),loginHandler.login)

// ---------------------------------用户管理
//添加管理员
router.post('/createAdmin',loginHandler.createAdmin)
//获取管理员
router.post('/getAdminList',loginHandler.getAdminList)
//编辑管理员信息
router.post('/editAdmin',loginHandler.editAdmin)
//降级
router.post('/changeIdentityToUser',loginHandler.changeIdentityToUser)
//赋权
router.post('/changeIdentityToAdmin',loginHandler.changeIdentityToAdmin)
//使用账号进行搜索
router.post('/searchUser',loginHandler.searchUser)
//冻结
router.post('/banUser',loginHandler.banUser)
//解冻
router.post('/hotUser',loginHandler.hotUser)
//获取冻结列表
router.post('/getBanList',loginHandler.getBanList)
//永久的删除用户
router.post('/deleteUser',loginHandler.deleteUser)
//

module.exports = router
