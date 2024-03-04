const express = require('express')

const router = express.Router()
const login_logHandler = require('../router_handle/login_log')
//有人登录就会插进表里面
router.post('/loginLog',login_logHandler.loginLog)
//登陆的列表
router.post('/loginLogList',login_logHandler.loginLogList)
//清空列表
router.post('/clearLogList',login_logHandler.clearLogList)
//搜索最近十条登录日志
router.post('/searchLoginList',login_logHandler.searchLoginList)


module.exports = router