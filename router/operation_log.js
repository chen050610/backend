const express = require('express')

const router = express.Router()
const operation_logHandler = require('../router_handle/operation_log')
//记录操作日志
router.post('/operationLog',operation_logHandler.operationLog)
// 获取操作列表
router.post('/operationLogList',operation_logHandler.operationLogList)
//清空操作日志
router.post('/clearLogList',operation_logHandler.clearLogList)
//搜索最近的十条记录
router.post('/searchOperationList',operation_logHandler.searchOperationList)
module.exports = router