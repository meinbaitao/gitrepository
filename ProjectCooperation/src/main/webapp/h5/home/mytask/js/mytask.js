$(function() {
    //选择空间
    var s = window.location.search;
    var pa = s.substring(0, s.indexOf("spaceId="));
    var ownerId = s.substring(9, s.indexOf("&"));
    /*var c = s.substring(s.indexOf("spaceId="), 100),
    container = c.substring(8, s.indexOf("&"));*/
    var url_spacelist = "/a/mobile/task/queryspacelist";
    var data;
    var COOKIE_NAME = 'spaceId';
    if ($.cookie(COOKIE_NAME)) {
        container = $.cookie(COOKIE_NAME);
    }
    if (container) {
        data = '{"spaceId":"' + container + '"}';
        //$(".container").attr("id", container);
    }
    $(".s_masked,.container").children().remove();
    startUp.ajaxPost(url_spacelist, data, false,
    function(resultMap) {
        if (resultMap) {
            var space_first;
            var htmlStr = "";
            for (var i = 0; i < resultMap.result.length; i++) {
                if (resultMap.result[i].id == container) {
                    space_first = resultMap.result[i];
                    $(".s_name").html(space_first.title);
                } else {
                    space_first = resultMap.result[0];
                }
                htmlStr += "<div id='" + resultMap.result[i].id + "' class='mask_space'>";
                htmlStr += "<span class='space_name'>" + resultMap.result[i].title + "</span>";
                htmlStr += "<span class='space_ed fr' style='display: none;'><img src='../common/images/tick.png'></span>";
                htmlStr += "</div>";

            };
            $(".s_masked").append(htmlStr);

            //显示列表第一个空间的名称
            $("#" + container).addClass("selected").addClass("selected");
            $("#" + container + " .space_ed").show();

            var spaceId;
            //$(".container").attr("id", spaceId);
            if (container) {
                spaceId = container;
                $(".container").attr("id", container);
            } else {
                spaceId = space_first.id
            }
            var data_tasklist = '{"spaceId":"' + spaceId + '"}';
            var url_tasklist = "/a/mobile/task/querymytasklist";
            startUp.ajaxPost(url_tasklist, data_tasklist, false,
            function(resultMap) {
                if (resultMap && resultMap.result) {
                    var htmlStr2 = "";
                    var N_htmlStr2 = "";
                    if( resultMap.result.length == 0){
                    	N_htmlStr2 += "<div class='n_task'>";
                    	N_htmlStr2 += " 	<img src='../common/images/non_task_topic.png'>";
                    	N_htmlStr2 += " 	<div class='task_text'>亲，还没有分配任务给你哦~<div>";
                    	N_htmlStr2 += "</div>";
                    	$(".container").append(N_htmlStr2);
                    }
                    $.each(resultMap.result,
                    function(idx, item) {
                        htmlStr2 += "<div id='" + item.id + "' class='strip'>";
                        htmlStr2 += "<span class='circle'>";
                        htmlStr2 += "<img alt='' src='../common/images/yes.png'>";
                        htmlStr2 += "</span>";
                        htmlStr2 += "<a class='text'>";
                        htmlStr2 += "<span>" + item.title + "</span>";
                        htmlStr2 += "</a>";
                        var date = item.updateDate.substring(5, 10);
                        htmlStr2 += "<span class='date'>" + date + "</span>";
                        htmlStr2 += "</div>";
                    });
                    $(".container").append(htmlStr2);
                }
            });
        }
    });
    //任务列表 
    $(document).on("touchstart touchmove touchend", ".mask_space",
    function() {
    	var touch = event.targetTouches[0];
		if(event.type == "touchstart"){
			moved = false ; // moved用于判断是否滑动
            x = touch.pageX ;
            y = touch.pageY ;
		}else if(event.type == "touchmove"){
			if(moved) return
            X = touch.pageX ;
            Y = touch.pageY ;
            if(X-x != 0 || Y-y !=0) {moved = true}
		}else if(event.type == "touchend"){
			if(!moved){     // 如果没有滑动就执行
				$(".container").children().remove();
		        var id = $(this).attr("id");
		        $(".container").attr("id", id);
		        var data = '{"spaceId":"' + id + '","ownerId":"ea84790d53034aa7bb0cd7a664913883"}';
		        var url = "/a/mobile/task/querymytasklist";
		        startUp.ajaxPost(url, data, false,
		        function(resultMap) {
		            if (resultMap && resultMap.result) {
		                var htmlStr2 = "";
		                var N_htmlStr2 = "";
		                if( resultMap.result.length == 0){
		                	N_htmlStr2 += "<div class='n_task'>";
		                	N_htmlStr2 += " 	<img src='../common/images/non_task_topic.png'>";
		                	N_htmlStr2 += " 	<div class='task_text'>亲，还没有分配任务给你哦~<div>";
		                	N_htmlStr2 += "</div>";
		                	$(".container").append(N_htmlStr2);
		                }else{
		                	$.each(resultMap.result,
		                            function(idx, item) {
		                                htmlStr2 += "<div id='" + item.id + "' class='strip'>";
		                                htmlStr2 += "<span class='circle'>";
		                                htmlStr2 += "<img alt='' src='../common/images/yes.png'>";
		                                htmlStr2 += "</span>";
		                                htmlStr2 += "<a class='text'>";
		                                htmlStr2 += "<span>" + item.title + "</span>";
		                                htmlStr2 += "</a>";
		                                var date = item.updateDate.substring(5, 10);
		                                htmlStr2 += "<span class='date'>" + date + "</span>";
		                                htmlStr2 += "</div>";
		                     });
		                	 $(".container").append(htmlStr2);
		                }
		            }
		        });
            }
		}
    })
    //委托事件 
    $(document).on("touchstart touchmove touchend", ".strip .text",
    function() {
    	var touch = event.targetTouches[0];
		if(event.type == "touchstart"){
			moved = false ; // moved用于判断是否滑动
            x = touch.pageX ;
            y = touch.pageY ;
		}else if(event.type == "touchmove"){
			if(moved) return
            X = touch.pageX ;
            Y = touch.pageY ;
            if(X-x != 0 || Y-y !=0){moved = true}
		}else if(event.type == "touchend"){
			if(!moved){     // 如果没有滑动就执行
				 var spaceEachId = $(this).parents(".strip").attr("id");
			     var spaceId = $(".container").attr("id");
			     if (spaceEachId) {
			          window.location.href = startUp.getRootPath() + "/h5/home/view/viewtask.html?spaceId=" + spaceEachId + "&"
			     }
            }
		}
    })
    //标记/取消标记任务完成		
    $(document).on("touchstart", ".circle",
    function() {
    	if( $(this).find("img").attr("src")=="../common/images/yes.png" ){
    		$(this).find("img").attr("src", "../common/images/yesed.png");
    	}else{
    		$(this).find("img").attr("src", "../common/images/yes.png");
    	}
    	var th=$(this);
        var url_finish = "/a/mobile/task/marktaskfinish";
        var id = $(this).parents(".strip").attr("id");
        var data_finish = '{"id":"' + id + '"}';
        startUp.ajaxPost(url_finish, data_finish, false,
        function(resultMap) {
            if (resultMap.result == "6") {
               // th.find("img").attr("src", "../common/images/yes.png");
            } else if (resultMap.result == "7") {
            	//th.find("img").attr("src", "../common/images/yesed.png");
            }
        });
    });
})