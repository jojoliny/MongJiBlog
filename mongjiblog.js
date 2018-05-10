"use strict";
let http=require("http"),
    fs=require("fs"),
    pt=require("path"),
    url=require("url"),
    readUtil=require("./util/readUtil"),
    formidable =require("formidable"),
    userControl=require("./control/userControl"),
    blogControl=require("./control/blogControl");
let server=http.createServer(function(req,res){
    let path=url.parse(req.url,true);
    if(path.pathname==="/favicon.ico"){
        readUtil.readFile(pt.join(__dirname,"webapp","img/xx.png"),res);
    }else if(path.pathname==="/"){
        readUtil.readFile(pt.join(__dirname,"webapp/","login.html"),res);
    }else if(path.pathname==="/login"){
        //获取请求参数
        let form=new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
                userControl.login(fields,res) ;
        });
    }else if(path.pathname==="/initbloglist"){
        let form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            blogControl.initAllBlogs(path.query.pageIndex,fields,res);
        });
    }else if(path.pathname==="/initblogs"){
        let form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            blogControl.initBlogs(path.query.category,path.query.pageIndex,fields,res);
        });
    }else if(path.pathname==="/inittype"){
        let form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
           blogControl.initType(fields,res);
        });
    }
    else{
        readUtil.readFile(pt.join(__dirname,"webapp",path.pathname),res);
    }
});
server.listen(9090,function(err){
    if(err) throw err;
});