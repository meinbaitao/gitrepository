$(function(){
	timer.dynamicRemind();
	//定时器
	setInterval(timer.dynamicRemind, 300000); 
	
	//检查意见反馈评论更新
	timer.findAllFeedbackNewCommentCount();
	setInterval(timer.findAllFeedbackNewCommentCount, 300000);
});

/**
 * 定时器
 */
var timer = {};

/**
 * 
 * 
 * 动态提醒定时器
 */
timer.dynamicRemind = function(){
	var spaceId = $("#checkedSpace").attr("space-id");
	if(!spaceId){
		return;
	}
	//获取动态消息
	var url = "/a/dynamic/findByDynamicStatus?resourceId="+spaceId;
	startUp.getData(url,function(resultMap){
		if(resultMap && resultMap.data){
			$.each(resultMap.data,function(idx,item){//动态
				var type=item.type?item.type:"",
					count = item.unreadCount?item.unreadCount:"",
					unreadCount ="";
				switch (type) {
					case "2":
						unreadCount =$("#projectCount");
						break;
					case "3":
						unreadCount =$("#memberCount");
						break;
					default:
						unreadCount =$("#unreadCount");
						break;
				}
				unreadCount.removeClass("hide");
				unreadCount.text(count);
			});
		}
	});
}


/**
 * 检查新的反馈评论
 */
timer.findAllFeedbackNewCommentCount = function(){
	var url = "/a/feedback/findAllFeedbackNewCommentCount";
	startUp.postAsyncData(url, null, function(data){
		if(data.count>0){
			$("#show-feedback-list-info-link").addClass("has-new");
		}else{
			$("#show-feedback-list-info-link").removeClass("has-new");
		}
	});
}
