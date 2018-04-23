$(function(){
    $("#btn_login").on("click",function(){
        //序列表表格内容为字符串，用于ajax请求
        var userinfo=$("#log-form").serialize();
        //转成json格式的字符串
        var userstr=paramToJson(userinfo);
        //将json格式的字符串转成json
        /*前端登录界面传来的数据*/
        var json=strToJson(userstr);
        //ajax
        $.ajax({
            url:"/login",
            data:json,
            type:"post",
            async:false,
            success:function(data){
                console.log("------------"+userstr);
                /*状态码为200，数据提交成功后传来的数据*/
                var datajson=strToJson(data);
                $("#warningbar").text(datajson.loginMsg).slideDown(600);
                setTimeout(function(){
                    $("#warningbar").slideUp(200);
                },1500);
                if(datajson.result=="success"){
                    //登录成功，将数据存入本地
                    // window.localStorage.setItem("user","{userId:"+datajson.userId+",username:"+json.username+"}");
                    window.localStorage.setItem("username",json.name);
                    console.log(json.name);
                    window.localStorage.setItem("userId",datajson.userId);
                    setTimeout(function(){
                        window.location.href="../blog-list.html";
                    },2300);
                }
            },
            error:function (data) { }
        });
    });

});