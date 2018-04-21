"use strict";
const userDao=require("../dao/userDao");
function login(fields,res){
    userDao.queryUserByName(fields.name,function(results){
        console.log(results);
       // 校验
       if(results.length==0){
            res.writeHead(200);
            res.end("{loginMsg:'该用户名不存在',result:'fault'}");
       }else{
           if(results[0].password==fields.pwd){
               res.writeHead(200);
               res.end("{loginMsg:'登录成功',result:'success'}");
           }else{
               res.writeHead(200);
               res.end("{loginMsg:'密码错误',result:'fault'}");
           }
       }
    });
}
module.exports={login};