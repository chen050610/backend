const joi = require('joi')
const {string} = require("joi");

const name =joi.string().pattern(/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).required()
const id  = joi.required()
const email = joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required()
const oldPassword =joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()
const newPassword =joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()
exports.name_limit = {
    body: {
        id,
        name,
    }
}
exports.password_limit ={
    body: {
        id,
        oldPassword,
        newPassword
    }
}
exports.email_limit = {
    body: {
        id,
        email,
    }
}
exports.forgetPassword_limit = {
    body : {
        id,
        newPassword,
    }
}