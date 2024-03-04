const express = require('express')
const router = express.Router()
const overviewHandler = require('../router_handle/overview')

//获取产品的种类和对应的总价
router.post('/getCategoryAndNumber',overviewHandler.getCategoryAndNumber)
//获取管理员的名成和对应的数量
router.post('/getAdminAndNumber',overviewHandler.getAdminAndNumber)
//获取消息等级和数量
router.post('/getLevelAndNumber',overviewHandler.getLevelAndNumber)
//登录时间的人数额
router.post('/getDayAndNumber',overviewHandler.getDayAndNumber)

module.exports = router