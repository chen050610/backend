const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const userinfoHandler = require('../router_handle/userinfo')

const {name_limit,email_limit,password_limit,forgetPassword_limit} = require('../limit/user.js')
//上传头像
router.post('/uploadAvator',userinfoHandler.uploadAvator)
//绑定账号
router.post('/bindAccount',userinfoHandler.bindAccount)
//修改密码
router.post('/changePassword',expressJoi(password_limit),userinfoHandler.changePassword)
//获取用户信息
router.post('/getUserInfo',userinfoHandler.getUserInfo)
//修改姓名
router.post('/changeName',expressJoi(name_limit),userinfoHandler.changeName)
//修改性别
router.post('/changeSex',userinfoHandler.changeSex)
//修改邮箱
router.post('/changeEmail',expressJoi(email_limit),userinfoHandler.changeEmail)
//验证账号和邮箱
router.post('/varifyAccountAndEmail',userinfoHandler.varifyAccountAndEmail)
//忘记密码需改密码
router.post('/changePasswordInlogin',expressJoi(forgetPassword_limit),userinfoHandler.changePasswordInlogin)
module.exports = router