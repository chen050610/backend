//
const express = require('express')

const router = express.Router()

const settingHandler = require('../router_handle/setting')


router.post('/uploadSwiper',settingHandler.uploadSwiper)
router.post('/getAllSwiper',settingHandler.getAllSwiper)
router.post('/getCompanyName',settingHandler.getCompanyName)
router.post('/changeCompanyName',settingHandler.changeCompanyName)
router.post('/changeCompanyIntroduce',settingHandler.changeCompanyIntroduce)
router.post('/getCompanyIntroduce',settingHandler.getCompanyIntroduce)
router.post('/getAllCompanyIntroduce',settingHandler.getAllCompanyIntroduce)
module.exports = router