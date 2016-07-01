$(function() {
    //加载任务详情
	var user_idd = 'user_id';
	if ($.cookie(user_idd)) {
		user_id= $.cookie(user_idd);
		$(".container").attr("id",user_id);
	}
    var s = window.location.search;
    var mytaskId = s.substring(9, s.indexOf("&"));
    var titl= s.substring(s.indexOf("title="),100),title=titl.substring(6,100);
    var data = '{"projectId":"' + mytaskId + '"}';
    var url = "/a/mobile/task/querytasklist";
    startUp.ajaxPost(url, data, false,function(resultMap) {
        if(resultMap && resultMap.result){
        	var htmlStr = "",N_htmlStr2="";
        	$(".container").children().remove();
        	if( resultMap.result.length == 0 ){
        		$("#html_title").text(unescape(title));
        		N_htmlStr2 += "<div class='n_task'>";
            	N_htmlStr2 += " 	<img src='../common/images/non_task_topic.png'>";
            	N_htmlStr2 += " 	<div class='task_text'>空空如也，赶紧去安排任务吧！<div>";
            	N_htmlStr2 += "</div>";
            	$(".container").append(N_htmlStr2);
        	}else{
        		$("#html_title").text(resultMap.result[0].projectTitle);
        		$.each(resultMap.result, function(idx, item){
        			
    				htmlStr += "<div id='"+item.id+"' class='strip'>";
    				htmlStr += "	<span class='circle' id='"+ item.user.id +"'>";
    				if(item.user.id==$(".container").attr("id") ){
    					if( item.status == "6"){
        					htmlStr += "		<img alt='' src='../common/images/yes.png'>";
        				}else{
        					htmlStr += "		<img alt='' src='../common/images/yesed.png'>";
        				}
    				}else{
    					if( item.status == "6"){
        					htmlStr += "		<img alt='' src='../common/images/no.png'>";
        				}else{
        					htmlStr += "		<img alt='' src='../common/images/noed.png'>";
        				}
    				}
    				htmlStr += "	</span>";
    				htmlStr += "	<a class='text'>";
    				htmlStr += "		<span>"+item.title+"</span>";
    				htmlStr += "	</a>";
    				htmlStr += "	<span class='date'>"+item.updateDate.substring(5, 10)+"</span>";
    				htmlStr += "</div>";
    			});
    			$(".container").append(htmlStr);
        	}
		}
    });
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
    $(document).on("touchstart", ".circle",function() {
    	if( $(this).attr("id") ==$(".container").attr("id") ){
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
	                th.find("img").attr("src", "../common/images/yes.png");
	            } else if (resultMap.result == "7") {
	            	th.find("img").attr("src", "../common/images/yesed.png");
	            }
	        });
		} 	
    });
})