"use strict";
let mysql=require("mysql");
let conn=mysql.createConnection({
   host:'127.0.0.1',
    port:3306,
    database:'myblog',
    user:'root',
    password:'root'
});
conn.connect();
//查询所有博客
function selectBlogsByUserId(userId,callback){
    var sql="select * from tb_blog where userId = ?";
    conn.query(sql,[userId],function(err,results,fields){
       callback(results);
    });
}
//查询指定类型的博客
function selectBlogsByUserIdAndCateId(userId,cateId,callback){
    var sql="select * from tb_blog where userId=? and cateId=?";
    conn.query(sql,[userId,cateId],function (err,results,fields) {
        callback(results);
    });
}
//查询类型名
function selectCateByCateId(cateId,callback){
    var sql="select catename from tb_cate where id = ?";
    conn.query(sql,[cateId],function(err,results,fields){
        callback(results);
    });
}
//查询某用户博客总数
function selectBlogsCountsByUserId(userId,callback){
    var sql="select count(*) from tb_blog where userId=? group by userId";
    conn.query(sql,[userId],function(err,results,fields){
       callback(results);
    });
}
//查询某用户i-j的博客 i从0开始，用于分页查询
function selectCertainBlogs(userId,i,j,callback){
    var sql="select * from tb_blog where userId=? limit ?,?";
    conn.query(sql,[userId,i,j],function(err,results,fields){
        callback(results);
    });

}
//暴露方法
module.exports={allBlogs:selectBlogsByUserId,cateBlogs:selectBlogsByUserIdAndCateId};