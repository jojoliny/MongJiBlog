$(function(){
    $("#btn_login").on("click",function(){
        //序列表表格内容为字符串，用于ajax请求
        var userinfo=$("#log-form").serialize();
        //转成json格式的字符串
        var userstr=paramToJson(userinfo);
        //将json格式的字符串转成json
        var json=strToJson(userstr);
        //ajax
        $.ajax({
            url:"/login",
            data:json,
            type:"post",
            async:false,
            success:function(data){
                console.log(data);
                var datajson=strToJson(data);
                $("#warningbar").text(datajson.loginMsg).slideDown(600);
                setTimeout(function(){
                    $("#warningbar").slideUp(200);
                },1500);
                if(datajson.result=="success"){
                    setTimeout(function(){
                        window.location.href="../regist.html";
                    },2300);
                }
            },
            error:function (data) { }
        });
    });

});