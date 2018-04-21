"use strict";
let mysql=require("mysql");
let conn=mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:"root",
    password:"root",
    database:"myblog"
});
conn.connect();
function queryUserByName(username,callback){
    conn.query("select * from tb_user where username = ?", [username], function(err,results,fields){
        callback(results);
    });
}
module.exports={queryUserByName};