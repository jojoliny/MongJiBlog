"use strict";
const blogDao=require("../dao/blogDao");
function initAllBlogs(fields,res){
    //json用于传递数据，存储博客数据
    let json={};
    blogDao.allBlogs(fields.userId,function(results){
    //   results是json数组，json->string: JSON.stringify(results)
    //    将数据提取到Array
        var array=[];
        //[{"id":1,"userId":1,"cateId":1,"title":"test","content":{"type":"Buffer","data":[116,101,115,116]},"summery":"summery1","flag":null,"creattime":"2018-04-23T08:35:22.000Z"},{"id":2,"userId":1,"cateId":2,"title":"test2","content":{"type":"Buffer","data":[116,101,115,116,50]},"summery":"summery2","flag":null,"creattime":"2018-04-23T08:48:09.000Z"}]
        console.log("results "+typeof(results)+" "+JSON.stringify(results));
        results.forEach(function(result){
            array[array.length]={
                blogId:result.id,
                title:result.title,
                summery:result.summery,
                cateId:result.cateId
            }
        });
        json.item=array;
        //将数据传到前台
        res.end(JSON.stringify(json));
    });
}
module.exports={initAllBlogs};