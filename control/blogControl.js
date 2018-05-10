"use strict";
const blogDao=require("../dao/blogDao");

function initAllBlogs(pageIndex,fields,res){
    //json用于传递数据，存储博客数据
    let json={};
    pageIndex=parseInt(pageIndex);
    let start=(pageIndex-1)*10;//limit start,end;
    blogDao.queryCount(fields.userId,function(result1){
        let count=result1[0]["count(*)"];
        let sub=count-start;
        let end=sub/10>1?(start+10):(start+sub%10);
        json.count=Math.ceil(count/10);
        //将查询到的数据放入blogs中
        let blogs=[];
        blogDao.certainBlogs(fields.userId,start,end,function(results2){
            results2.forEach(function (result) {
                blogs[blogs.length]={
                    blogId:result.id,
                    title:result.title,
                    summery:result.summery,
                    cate:result.catename
                }
            });
            json.blogs=blogs;
            //将数据传到前台
            res.writeHead(200);
            res.end(JSON.stringify(json));
        });
    });
}
function initType(fields,res){
    let json={};
    blogDao.queryOnlyCate(fields.userId,function(results){
        let cates=[];
        results.forEach(function(result){
            cates[cates.length]={
                cate:result.catename
            }
        });
        json.cates=cates;
        res.writeHead(200);
        res.end(JSON.stringify(json));
    });
}
//分页+博客类型
function initBlogs(category,pageIndex,fields,res){
    let json={};
    pageIndex=parseInt(pageIndex);
    let start=(pageIndex-1)*10;//limit start,end;
    blogDao.queryCountByCate(category,fields.userId,function(result1){
        let count=result1[0]["count(*)"];
        let sub=count-start;
        let end=sub/10>1?(start+10):(start+sub%10);
        json.count=Math.ceil(count/10);
        //将查询到的数据放入blogs中
        let blogs=[];
        blogDao.certainBlogsByCate(category,fields.userId,start,end,function(results2){
            results2.forEach(function (result) {
                blogs[blogs.length]={
                    blogId:result.id,
                    title:result.title,
                    summery:result.summery,
                    cate:result.catename
                }
            });
            json.blogs=blogs;
            //将数据传到前台
            res.writeHead(200);
            res.end(JSON.stringify(json));
        });
    });
}

module.exports={initAllBlogs,initType,initBlogs};