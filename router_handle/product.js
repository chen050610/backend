const db = require('../db/index.js')
//创建产品
exports.createProduct = (req,res)=>{
    const {
        product_id,
        product_name,
        product_category,
        product_unit,
        product_inwarehouse_number,
        product_single_price,
        product_create_person,
        in_memo,
    } = req.body
    const product_create_time= new Date()
    const product_all_price =product_inwarehouse_number * 1 *product_single_price * 1
    const sql = 'insert into product set ?'
    db.query(sql,{
        product_id,
        product_name,
        product_category,
        product_unit,
        product_inwarehouse_number,
        product_single_price,
        product_create_person,
        in_memo,
        product_all_price,
        product_create_time
    },(err,result)=>{
        if (err) return res.cc(err)
        res.send ({
            status:0,
            message:"添加产品成功"
        })
    })
}
//删除产品
exports.deleteProduct=(req,res)=>{
    const sql = 'delete from product where id = ?'
    db.query(sql,req.body.id,(err,result)=>{
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '删除产品成功'
            })
    })
}
//编辑产品信息

exports.editProduct = (req,res)=>{
    const {
        product_name,
        product_category,
        product_unit,
        product_inwarehouse_number,
        product_single_price,
        in_memo,
        id
    } = req.body
    const product_update_time= new Date()
    const product_all_price =product_inwarehouse_number * 1 *product_single_price * 1
    const sql = 'update product set product_name = ?,product_category = ?,product_unit = ?,product_inwarehouse_number = ?,product_single_price = ? ,product_all_price = ?,product_update_time = ?,in_memo = ? where id =?'
    db.query(sql,[
        product_name,
        product_category,
        product_unit,
        product_inwarehouse_number,
        product_single_price,
        product_all_price,
        product_update_time,
        in_memo,
        id,
    ],(err,result)=>{
        if (err) return res.cc(err)
        res.send ({
            status:0,
            message:"编辑产品信息成功"
        })
    })
}
//获取产品列表
exports.getProductList = (req,res)=>{
    const sql = 'select * from product where product_inwarehouse_number >= 0 '
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send (result)
    })
}
//产品申请出库
exports.applyOutProduct = (req,res)=>{
    const product_out_status = '申请出库'
    const {
        id,
        product_out_id,
        product_single_price,
        product_out_number,
        product_out_apply_person,
        apply_memo
    } = req.body
    const product_apply_time = new Date()//获取出库的时间
    const product_out_price =product_out_number * 1 *product_single_price * 1
    const sql = 'update product set product_out_status = ?,product_out_id = ?,product_out_number = ?,product_out_price = ?,product_out_apply_person = ? ,apply_memo = ?,product_apply_time = ? where id = ?'
    db.query(sql,[
        product_out_status,
        product_out_id,
        product_out_number,
        product_out_price,
        product_out_apply_person,
        apply_memo,
        product_apply_time,
        id,
    ],(err,result)=>{
        if (err) return res.cc(err)
        res.send ({
            status:0,
            message:'产品申请出库成功'
        })
    })
}

//产品审核列表
exports.applyProductList = (req,res)=>{
    const sql =  'select * from product where product_out_status not in ("同意")'
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send (result)
    })
}

//产品审核,审核成功以后，更新产品数量。总价，计算出路总价，同时把出库的数据插入output表，把审核的数据设置为空
exports.auditProductList = (req,res)=>{
    const {
        id,
        product_out_id,
        product_out_status,
        audit_memo,
        product_out_price,
        product_out_audit_person,
        product_out_apply_person,
        product_inwarehouse_number,
        product_single_price,
        product_out_number,
    } = req.body
    const product_audit_time = new Date()//获取审核的时间
    if (product_out_status == '同意') {
        const product_out_price = product_out_number*1*product_single_price*1
        const newWarehouseNumber = product_inwarehouse_number * 1 - product_out_number*1
        const product_all_price = newWarehouseNumber * 1 * product_single_price * 1  //剩余库存的总价
        const sql = 'insert into outproduct set ?'
        db.query(sql, {
            product_out_id,
            product_out_number,
            product_out_price,
            product_out_audit_person,
            product_out_apply_person,
            product_audit_time,
            audit_memo
        }, (err, result) => {
            if (err) return res.cc(err)
            const sql1 = 'update product set product_inwarehouse_number=?,product_out_status=NULL,product_all_price=?, product_out_id =NULL,product_single_price=NULL,product_out_number=NULL,product_out_apply_person=NULL,apply_memo=NULL,product_out_price=NULL,product_apply_time=NULL where id = ?'
            db.query(sql1, [newWarehouseNumber,product_all_price,req.body.id], (err, result) => {
                if (err) return res.cc(err)
                res.send({
                    status: 0,
                    message: '产品出库成功'
                })
            })
        })
    }
    if (product_out_status=='否决'){
        const sql = 'update product set audit_memo = ? where id= ?'
        db.query(sql,[audit_memo,id],(err,result)=>{
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '产品被否绝'
            })
        })
    }
}
//通过出库申请对产品进行搜索
exports.searchProductForId=(req,res)=>{
    const sql = 'select * from product where product_id = ?'
    db.query(sql,req.body.product_id,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//通过入库编号对产进行搜索
exports.searchProductForApplyId=(req,res)=>{
    const sql = 'select * from product where product_out_id = ?'
    db.query(sql,req.body.product_out_id,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
    //通过出库编号对产进行搜索
exports.searchProductForOutId=(req,res)=>{
    const sql = 'select * from outproduct where product_out_id = ?'
    db.query(sql,req.body.product_out_id,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//对产品进行撤回申请
exports.withdrawProductApply=(req,res)=>{
    const sql = 'update product set product_out_id =NULL,product_out_status=NULL,product_out_number=NULL,product_out_apply_person=NULL,apply_memo=NULL,product_out_price=NULL,product_apply_time=NULL where id = ?'
    db.query(sql,req.body.id,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '撤回申请出库成功'
        })
    })
}
//获取产品总数
exports.getProductListLength=(req,res)=>{
    const sql = 'select * from product where product_inwarehouse_number >=0'
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            length:result.length
        })
    })
}
//获取申请出库的产品总数
exports.getApplyProductListLength=(req,res)=>{
    const sql = 'select * from product where product_out_status ="申请出库" || product_out_status ="否决"'
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            length:result.length
        })
    })
}
//获取出库的产品总数
exports.getOutProductListLength=(req,res)=>{
    const sql = 'select * from outproduct'
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            length:result.length
        })
    })
}
//监听换页返回数据 页码 身份
exports.returnProductListData=(req,res)=>{
    const number = 	 (req.body.pager - 1) * 10
    const sql = `select * from product where product_inwarehouse_number >=0 limit 10 offset ${number}`
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })

}
//申请出出库
exports.returnApplyProductListData=(req,res)=>{
    const number = 	 (req.body.pager - 1) * 10
    const sql = `select * from product where product_out_status ="申请出库" || product_out_status ="否决"  ORDER BY product_apply_time limit 10 offset ${number}`
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })

}
//出库页面
exports.returnOutProductListData=(req,res)=>{
    const number = 	 (req.body.pager - 1) * 10
    const sql = `select * from outproduct  ORDER BY product_audit_time limit 10 offset ${number}`
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })

}