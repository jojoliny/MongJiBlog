function strToJson(str){
    var json = (new Function("return " + str))();
    return json;
}
function paramToJson(str){
    let newstr = str;
    while(newstr.indexOf("=")>0){
        newstr = newstr.replace("=",":\"");
    }
    while(newstr.indexOf("&")>0){
        newstr = newstr.replace("&","\",")
    }
    var stringObj= "{" +newstr + "\"}";
    return stringObj;
}

function ajax(url,json,callback){
    $.ajax({
       type:"post",
        url:url,
        async:false,
        data:json,
        success:function(data){
           var json=strToJson(data);
           callback(json);
        },
        error:function(){}
    });
}
//    该页面需要的所有数据
let userId=window.localStorage.getItem("userId");
function blogAjax(pageIndex){
    ajax("initbloglist?pageIndex="+pageIndex,{userId:userId},function(json){
        $(".blog-container").html("");
        $(".pagination").html("");
        $(".pagination").append('<li>' +
            '<a href="#" aria-label="Previous">' +
            '<span aria-hidden="true">&laquo;</span>' +
            '</a>' +
            '</li>');
        for(var i=1;i<=json.count;i++) {
            $(".pagination").append('<li><a href="javascript:blogAjax('+i+')">'+i+'</a></li>');
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