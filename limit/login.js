const joi = require('joi')
const {string} = require("joi");

//对账号进行验证
const account = joi.string().alphanum().min(6).max(12).required()
//密码
const password = joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()


exports.login_limit = {
    //表示对req的body里的数做验证
    body:{
        account,
        password
    }
}