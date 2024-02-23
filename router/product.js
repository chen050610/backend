const express = require('express')

const router = express.Router()
const productHandler = require('../router_handle/product.js')

//添加产品入库
router.post('/createProduct',productHandler.createProduct)
//删除产品
router.post('/deleteProduct',productHandler.deleteProduct)
//编辑产品信息
router.post('/editProduct',productHandler.editProduct)
// 获取产品列表
router.post('/getProductList',productHandler.getProductList)
//产品申请出库
router.post('/applyOutProduct',productHandler.applyOutProduct)
// 产品审核列表
router.post('/applyProductList',productHandler.applyProductList)
//审核出库
router.post('/auditProductList',productHandler.auditProductList)
// 通过出库申请对产品进行搜索
router.post('/searchProductForId',productHandler.searchProductForId)
//通过出库申请对产品进行搜索
router.post('/searchProductForApplyId',productHandler.searchProductForApplyId)
// 通过入库编号对产品进行搜索
router.post('/searchProductForOutId',productHandler.searchProductForOutId)
// 对产品进行撤回申请
router.post('/withdrawProductApply',productHandler.withdrawProductApply)
//获取产品总数
router.post('/getProductListLength',productHandler.getProductListLength)
// 获取申请出库的产品总数
router.post('/getApplyProductListLength',productHandler.getApplyProductListLength)
// 获取出库的产品总数
router.post('/getOutProductListLength',productHandler.getOutProductListLength)
// 监听换页返回数据 页码 身份
router.post('/returnProductListData',productHandler.returnProductListData)
router.post('/returnApplyProductListData',productHandler.returnApplyProductListData)
router.post('/returnOutProductListData',productHandler.returnOutProductListData)
module.exports = router