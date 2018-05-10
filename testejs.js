"use strict";
const express=require("express"),
    pt=require("path"),
    readUtil=require("./util/readUtil");
var app=express();
//第一步：注入模板引擎
app.set("view engine","ejs");
//第二步：替换路径
app.set("views","webapp");
//第三步：渲染
// app.render
app.get("/",function(req,res){
    res.render(pt.join(__dirname,"webapp/testejs.ejs"),{title:'大标题'},function(err,html){
        res.send(html);
    });
});


app.listen(9090);