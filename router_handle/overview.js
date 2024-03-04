const db = require('../db/index.js')
const moment = require('moment')

//获取产品类别和总价的图
exports.getCategoryAndNumber=(req,res)=>{
    //获取产品类别的数组
    const CategoryArr  = ()=>{
        return new Promise(resolve => {
            const sql = 'select set_value from setting where set_name  = "产品设置" '
            db.query(sql,(err,result)=>{
                let str = result[0].set_value
                //eval 使json格式的字符串转化为json对象
                const arr = eval('('+str+')')
                resolve(arr)
            })
        })
    }
    //获取价格
    const getNumber = product_category=>{
        return new Promise(resolve=>{
            const sql = 'select product_all_price from product where product_category = ?'
            db.query(sql,product_category,(err,result)=>{
                let total = 0
                for (let i= 0;i<result.length;i++){
                    total += result[i]['product_all_price']
                }
                resolve(total)
            })
        })
    }
    //调用上面这两个函数
    //通过循环每个类别获取对应的价格
    async function getAll(){
        const category = await CategoryArr()
        const price = []
        for (let i = 0;i<category.length;i++){
            //在这里我循环的将数组里面的每个category放在getNumber这个函数里面，获取价格，
            price[i] = await getNumber(category[i])
        }
        res.send({
            category:category,
            price:price
        })
    }
    getAll()
}
//管理员和用户对比图
exports.getAdminAndNumber = (req,res)=>{
    //获取不同角色的数量
    const getNumber = identity =>{
        return new Promise(resolve => {
            const sql = 'select * from users where identity = ?'
            db.query(sql,identity,(err,result)=>{
                resolve(result.length)
            })
        })
    }
    async function getAll(){
        const data = [{
            value:0,
            name:'超级管理员'
        },
        {
            value:0,
            name:'产品管理员',
        },
        {
            value:0,
            name:'用户管理员'
        },
        {
            value:0,
            name:'消息管理员'
        },
        {
            value:0,
            name:'用户'
        }
        ]
        for (let i =0;i<data.length;i++){
            data[i]['value'] =await getNumber(data[i]['name'])
        }
        res.send({data})
    }
    getAll()
}
//获取不同消息等级和等数量
exports.getLevelAndNumber = (req,res)=>{
    //获取不同角色的数量
    const getNumber = message_level =>{
        return new Promise(resolve => {
            const sql = 'select * from message where message_level = ?'
            db.query(sql,message_level,(err,result)=>{
                resolve(result.length)
            })
        })
    }
    async function getAll(){
        const data = [{
            value:0,
            name:'一般'
        },
            {
                value:0,
                name:'重要',
            },
            {
                value:0,
                name:'必要'
            }
        ]
        for (let i =0;i<data.length;i++){
            data[i]['value'] =await getNumber(data[i]['name'])
        }
        res.send({data})
    }
    getAll()
}
//每一天登陆的人数
exports.getDayAndNumber = (req,res)=>{
    //获取最近七天的日期
    const getDay = ()=>{
        let day =new Date()
        let week= []
        for (let i = 0;i<7;i++){
            day.setDate(day.getDate()-1 )
            // day.getDay()返回当前天的日期数如果24号就返回24，我们要获取到，前一天的前七天的数据
            // 把2023/9/24这样的格式转化为--的格式
            // day.toLocaleString().replace(/\//g,'-')
            // 这是登录日志里面的格式2024-03-03 13:51:11.230，但是我们上面这样获取到的是2024-3-3这样的，需要用到moment的包
            week.unshift(moment(day.toLocaleDateString().replace(/\//g,'-'),'YYYY-MM-DD').format('YYYY-MM-DD'))
        }
        return week
    }
    //通过日期获取每天登陆的人数
    const getNumber = login_time =>{
        return new Promise(resolve => {
            const sql =`select * from login_log where login_time like '%${login_time}%'`
            db.query(sql,(err,result)=>{
                resolve (result.length)
            })
        })
    }
    //异步的调用
    async function getAll(){
        let week = getDay()
        let number = []
        for (let i =0;i<week.length;i++){
            number[i]=await getNumber(week[i])
        }
        res.send({
            number,
            week
        })
    }
    getAll()
}