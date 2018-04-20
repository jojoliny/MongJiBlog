"use strict";
const fs=require("fs");
function readFile(path,res){
    console.log(path);
    fs.readFile(path,function(err,chunk){
        if(err){
            res.writeHead(500);
            res.end();
        }else{
            res.writeHead({"Content-type":"text/webapp;charset=utf-8"});
            res.write(chunk);
            res.end();
        }
    });
}
module.exports={readFile};