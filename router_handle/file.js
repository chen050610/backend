const db = require('../db/index.js')
//上传文件的接口
exports.uploadFile =(req,res)=>{
    let oldName = req.files[0].filename
    let newName = Buffer.from(req.files[0].originalname,'latin1').toString('utf8')
    const sql1 = 'select * from file where file_name = ?'
    let upload_time = new Date()
    db.query(sql1,newName,(err,results)=>{
        if (err) return res.cc(err)
        if (results.length>1){
            res.send({
                status:1,
                message:'该文件名已经存在'
            })
        }
        fs.renameSync('./public/upload/'+oldName,'./public/upload/'+newName)
        const sql = 'insert into file set ?'
        db.query(sql,{
            file_url:`http://127.0.0.1:3007/upload/${newName}`,
            file_name:newName,
            file_size:req.files[0].size * 1 / 1024,//这里面有一个属性，通过这个属性可以活得大小
            upload_time,
            download_number:0
        },(err,results)=>{
            if (err) return res.cc(err)
            res.send ({
                status:0,
                url:'http://127.0.0.1:3007/upload/'+newName
            })
        })
    })
}
//绑定上传的用户和url
exports.bindFileAndUser = (req,res)=>{
    const {name,url} = req.body
    const sql = ' update file set upload_person = ? where file_url = ? '
    db.query(sql,[name,url],(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:"绑定成功"
        })
    })
}
//更新下载次数
exports.updateDownload  = (req,res)=>{
    const{
        download_number,//当前的点击率
        id
    }  = req.body
    number  = download_number * 1 +1
    const sql = 'update file set download_number = ? where id = ?'
    db.query(sql,[number,id],(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:"下载量增加"
        })
    })
}
//下载文件，当用户点击url的时候就会下载
exports.downloadFile  = (req,res)=>{
    const sql = 'select * from  file where id = ?'
    db.query(sql,req.body.id,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result[0].file_url)//返回下载的地址
    })
}
//获取文件的列表
exports.fileList  = (req,res)=>{
    const sql = 'select * from  file '
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)//返回下载的地址
    })
}
//搜索文件,通过文件的名字进行搜索
exports.searchFile  = (req,res)=>{
    const { } = req.body
    const sql = `select * from  file where file_name like '%${file_name}%' `//模糊的搜索
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })
}
//删除文件
exports.deleteFile  = (req,res)=>{
    const {file_name} = req.body
    const sql = `delete  from  file where id = ? `//模糊的搜索
    db.query(sql,req.body.id,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:'删除成功'
        })
    })
}
//获取文件列表总数
exports.fileListLength  = (req,res)=>{
    const sql = 'select * from  file '
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send({
            length:result.length
        })
    })
}
//监听换页
exports.returnFileListData=(req,res)=>{
    const number = 	 (req.body.pager - 1) * 10
    const sql = `select * from file ORDER BY upload_time limit 10 offset ${number}`
    db.query(sql,(err,result)=>{
        if (err) return res.cc(err)
        res.send(result)
    })

}