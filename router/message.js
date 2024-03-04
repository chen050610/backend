const express = require('express')

const router = express.Router()
const productHandler = require('../router_handle/message')
//发布消息
router.post('/publishMessage',productHandler.publishMessage)
//获取公司的消息
router.post('/companyMessageList',productHandler.companyMessageList)
//获取公司的消息
router.post('/systemMessageList',productHandler.systemMessageList)
//编辑消息
router.post('/editMessage',productHandler.editMessage)
//通过部门进行筛选
router.post('/searchMessageBydepartment',productHandler.searchMessageBydepartment)
//通过等级进行筛选
router.post('/searchMessageByLevel',productHandler.searchMessageByLevel)
//获取消息
router.post('/getMessage',productHandler.getMessage)
//更新点击率
router.post('/updateClick',productHandler.updateClick)
//初次的删除
router.post('/firstDelete',productHandler.firstDelete)
//获取回收站的列表
router.post('/recyleList',productHandler.recyleList)
//还原的操作
router.post('/recover',productHandler.recover)
//获取回收站的列表
router.post('/recyleList',productHandler.recyleList)
//删除的操作
router.post('/deleteMessage',productHandler.deleteMessage)
router.post('/getCompanyMessageLength',productHandler.getCompanyMessageLength)
router.post('/getSystemMessageLength',productHandler.getSystemMessageLength)
router.post('/returnCompanyListData',productHandler.returnCompanyListData)
router.post('/returnSystemListData',productHandler.returnSystemListData)
router.post('/getRecyleMessageLength',productHandler.getRecyleMessageLength)
router.post('/returnRecycleListData',productHandler.returnRecycleListData)



module.exports = router