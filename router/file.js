const express = require('express')

const router = express.Router()
const fileHandler = require('../router_handle/file')
const loginHandler = require("../router_handle/login");

//上传文件的接口
router.post('/uploadFile',fileHandler.uploadFile)
//绑定上传的文件和用户
router.post('/bindFileAndUser',fileHandler.bindFileAndUser)
//更新下载量
router.post('/updateDownload',fileHandler.updateDownload)
//下载文件
router.post('/downloadFile',fileHandler.downloadFile)
//获取文件的列表
router.post('/fileList',fileHandler.fileList)
//搜索文件
router.post('/searchFile',fileHandler.searchFile)
//删除文件
router.post('/deleteFile',fileHandler.deleteFile)
//获取问价列表总数
router.post('/fileListLength',fileHandler.fileListLength)
//监听换页
router.post('/returnFileListData',fileHandler.returnFileListData)

module.exports = router