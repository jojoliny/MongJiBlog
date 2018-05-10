function BlogsByCate(category,pageIndex){
    ajax("/initblogs?pageIndex="+pageIndex+"&category="+category,{userId:userId},function(json){
        $(".blog-container").html("");
        $(".pagination").html("");
        $(".pagination").append('<li>' +
            '<a href="#" aria-label="Previous">' +
            '<span aria-hidden="true">&laquo;</span>' +
            '</a>' +
            '</li>');
        for(var i=1;i<=json.count;i++) {
            console.log("ss");
            $(".pagination").append('<li><a href="javascript:BlogsByCate("'+category+'",'+i+')">'+i+'</a></li>');
            console.log('<li><a href="javascript:BlogsByCate(\''+category+'\','+i+')">'+i+'</a></li>');
        }
        $(".pagination").append('<li>' +
            '<a href="#" aria-label="Next">' +
            '<span aria-hidden="true">&raquo;</span>' +
            '</a>' +
            '</li>');
        json.blogs.forEach(function(blog){
            $(".blog-container").append('<div class="blog-list">'+
                '<div class="panel panel-default blog-breviary">'+
                '<div class="panel-body">'+
                '<h4 class="title">'+blog.title+'</h4>'+
                '<strong class="type"> [<span>'+blog.cate+'</span>]</strong></div>'+
                '<div class="panel-footer">'+blog.summery+'<a class="edit" href="javascript:void(0);">...edit</a></div></div></div>'
            );
        });
    });
}
$(function(){
//    将用户名渲染到页面上
    $("#username").append(window.localStorage.getItem("username"));
    ajax("inittype",{userId:userId},function(json){
        json.cates.forEach(function(cate){
            var catename=cate.cate;
            console.log(typeof(catename));
            $("#category_container").append('<li><a href="javascript:BlogsByCate(\''+catename+'\',1);">'+catename+'</a></li>');
        });
});
    blogAjax(1);
//    获取博客信息
    /*$.ajax({
        type:"post",
        url:"initbloglist?pageIndex=1",
        async:false,
        //由formidable来接收json格式的data
        data:{userId:userId},
        success:function(data){
            //data为后台响应成功发送来的数据
            var json=strToJson(data);
            //data {"item":[{"blogId":1,"title":"test","summery":"summery1"},{"blogId":2,"title":"test2","summery":"summery2"}]}
            //将数据附到前台
            // console.log("data "+typeof(data)+" "+data);
            for(var i=1;i<=json.count;i++) {
                $(".pagination").append('<li><a href="initbloglist?pageIndex='+i+'">'+i+'</a></li>');
            }
            $(".pagination").append('<li>' +
                '<a href="#" aria-label="Next">' +
                '<span aria-hidden="true">&raquo;</span>' +
                '</a>' +
                '</li>');
            json.blogs.forEach(function(blog){
                $(".blog-container").append('<div class="blog-list">'+
                    '<div class="panel panel-default blog-breviary">'+
                    '<div class="panel-body">'+
                    '<h4 class="title">'+blog.title+'</h4>'+
                    '<strong class="type"> [<span>'+blog.cate+'</span>]</strong></div>'+
                    '<div class="panel-footer">'+blog.summery+'<a class="edit" href="javascript:void(0);">...edit</a></div></div></div>'
                );
            });
        }
    });*/
});