$(function(){
	//事件委托
	$(document).on("touchstart touchmove touchend",".s_space,.mask_space",function(){
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
				$(".s_mask,.s_masked").fadeToggle("slow");
				$(".s_drop").toggleClass("s_droped");
				$(".header .fr").toggleClass("dn");
            }
		}
	})
	$(document).on("touchstart touchmove touchend",".s_masked",function(){
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
				$(".s_mask,.s_masked").fadeOut("slow");
				$(".s_drop").removeClass("s_droped");
				$(".header .fr").removeClass("dn");
            }
		}
	})
	$(document).on("touchstart",".s_mask",function(){
		$(".s_mask,.s_masked").fadeOut("slow");
		$(".s_drop").removeClass("s_droped");
		$(".header .fr").removeClass("dn");
	})
	$(document).on("touchstart touchmove touchend",".mask_space",function(){
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
				var t=$(this).find(".space_name").html();
				$(".mask_space").removeClass("selected");
				$(".s_name").html(t);
				$(".space_ed,.s_masked,.s_mask,.s_masked").fadeOut("slow");
				$(this).find(".space_ed").fadeIn("slow");
				$(this).addClass("selected");
            }
		}
	})
	$(document).on("touchstart touchmove touchend",".footer_ul li",function(e){
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
				var h=$(this).find("a").attr("title");
				var href=h.substring(3,100);
				var s = window.location.search;
			    var mytaskId = s.substring(8, s.indexOf("&"));
			    var container=$(".container").attr("id");
				$.cookie(COOKIE_NAME, container , { expires: 30, path: '/' });
			    if( h == "#"){
			    	return
			    }else{
			    	window.location.href = startUp.getRootPath() + "/h5/home/"+href+""
			    }
            }
		}
	})
	$(document).on("touchstart",".header .mine",function(){
		var s = window.location.search;
	    var mytaskId = s.substring(8, s.indexOf("&"));
	    var c=$(".container").attr("id");
		window.location.href = startUp.getRootPath() + "/h5/home/profile/profile.html"   
	})
	var COOKIE_NAME = 'spaceId'; 
	$(document).on("touchstart","*,.mask_space",function(){
	    if($.cookie(COOKIE_NAME)){  
	        $.cookie(COOKIE_NAME, $(".container").attr("id"), { expires: 30, path: '/' }); 
	    }  
	});
	window.onload = function(){
        /*页面强转开始*/
        var tmpTag = 'https:' == document.location.protocol ? false : true;
        if(tmpTag){
        	if($(".container").attr("id")){
        		return
        	}else{
        		window.location.href = startUp.getRootPath() + "/a/login"
        	}
        }
        /*页面强转结束*/
    }
});
		


