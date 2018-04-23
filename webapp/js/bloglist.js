$(function(){
//    将用户名渲染到页面上
    $("#username").append(window.localStorage.getItem("username"));
//    该页面需要的所有数据
    let userId=window.localStorage.getItem("userId");
//    获取博客信息
    $.ajax({
        type:"post",
        url:"initbloglist",
        async:false,
        //由formidable来接收json格式的data
        data:{userId:userId},
        success:function(data){
            //data为后台响应成功发送来的数据
            var json=strToJson(data);
            //data {"item":[{"blogId":1,"title":"test","summery":"summery1"},{"blogId":2,"title":"test2","summery":"summery2"}]}
            //将数据附到前台
            console.log("json "+typeof(json)+" "+json.item[0].title);
            console.log("data "+typeof(data)+" "+data);
            json.item.forEach(function(blog){
                $(".contain").append('<div class="blog-list">'+
                    '<div class="panel panel-default blog-breviary">'+
                    '<div class="panel-body">'+
                    '<h4 class="title">'+blog.title+'</h4>'+
                    '<strong class="type"> [<span>'+blog.cateId+'</span>]</strong></div>'+
                '<div class="panel-footer">'+blog.summery+'<a class="edit" href="javascript:void(0);">...edit</a></div></div></div>'
                );
            });

        }
    });
});