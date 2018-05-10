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
    // var sql="select * from tb_blog where userId = ?";
    var sql="select tb_blog.*,tb_cate.catename from tb_blog JOIN tb_cate on tb_blog.cateId=tb_cate.id where tb_blog.userId=? GROUP BY tb_blog.id";
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
function selectCate(userId,callback){
    var sql="select * from tb_blog where userId=?";
    conn.query(sql,[userId],function(err,results,fields){
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
//查询某用户某个类别的博客总数
function selectBlogsCountsByUserIdAndCatename(category,userId,callback){
    var sql="select count(*) from tb_blog b join tb_cate c on b.cateId=c.id where c.catename=? and b.userId=? group by userId";
    conn.query(sql,[category,userId],function(err,results,fields){
        callback(results);
    });
}
//查询某用户i-j的博客 i从0开始，用于分页查询
/*function selectCertainBlogs(userId,i,j,callback){
    var sql="select * from tb_blog where userId=? limit ?,?";
    conn.query(sql,[userId,i,j],function(err,results,fields){
        callback(results);
    });
}*/
//查询某用户i-j的博客 i从0开始，用于分页查询
function selectCertainBlogs(userId,i,j,callback){
    var sql="select tb_blog.*,tb_cate.catename from tb_blog JOIN tb_cate on tb_blog.cateId=tb_cate.id where tb_blog.userId=? GROUP BY tb_blog.id LIMIT ?,?";
    conn.query(sql,[userId,i,j],function(err,results,fields){
        callback(results);
    });
}
//查询用户某类别i-j的博客 分页查询
function selectCertainBlogsByCate(category,userId,i,j,callback){
    var sql="select b.*,c.catename from tb_blog b JOIN tb_cate c on b.cateId=c.id where c.catename=? and b.userId=? GROUP BY b.id LIMIT ?,?";
    conn.query(sql,[category,userId,i,j],function(err,results,fields){
        callback(results);
    });
}
function selectUserCate(userId,callback){
    var sql="select DISTINCT catename from tb_cate join tb_blog where userId=?";
    conn.query(sql,[userId],function (err,results,fields) {
        callback(results);
    });
}

//暴露方法
module.exports={allBlogs:selectBlogsByUserId,cateBlogs:selectBlogsByUserIdAndCateId,queryCount:selectBlogsCountsByUserId,
                queryCate:selectCate,certainBlogs:selectCertainBlogs,queryOnlyCate:selectUserCate,
                queryCountByCate:selectBlogsCountsByUserIdAndCatename,certainBlogsByCate:selectCertainBlogsByCate};