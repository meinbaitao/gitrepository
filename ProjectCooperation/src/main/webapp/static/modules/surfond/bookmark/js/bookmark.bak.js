/**
 * 收藏类
 */
$(function(){
	
	/**
	 * 查询收藏列表
	 */
	$(document).on("click", "#bookmarkList",findBookmarkList);
	
	/**
	 * 查询话题明细
	 */
	$(document).on("click", ".conversationEach",findConversationDetail);
	
});

/**
 * 查询收藏列表
 */
var findBookmarkList = function(){
	//start 用户行为分析
	startUp.iBehavior("moduleNO_14");
	//end 用户行为分析
	var spaceId =$("#checkedSpace").attr("space-id");
	if(!spaceId){
		return;
	}
	history.pushState("","","?optionType=bookmark");
	$("#task-list-container").removeClass("project-null").addClass("project-notNull");
	$("#checkedProject").find(".dropdown").hide();
	$("#modelTaskCalendar, #modelTaskAttachment").hide();
	$("#checkedProject").find(".project-title").attr("title", "").text("收藏名称");
	var url = "/a/bookmark/querybookmarklist?spaceId="+spaceId;
	startUp.getData(url,function(resultMap){
		$(".project-lists").text("");
		if(resultMap.message > 0){
			var htmlStr ="";
			$.each(resultMap.result, function(idx, item){
				htmlStr += html.bookmarkList(idx, item);
			});
			$(".project-lists").append(htmlStr);
			$(".project-lists").find("li[bookmark-id='" + $.cookie("bookmarkId") + "']").click();
			var selectedSize = $(".project-lists").find("li.current").size();
			if(selectedSize != 1){
				$(".project-lists > li").first().click();
			}
		}else{
			$(".list-container #grid #taskItemsTbody").empty();
		}
	});
}


/**
 * 查询动态明细
 * @param conversationId
 */
var findConversationDetail =function(){
	//start 用户行为分析
	startUp.iBehavior("moduleNO_29");
	//end 用户行为分析
	var conversationId = this.id;
	//设置只有被点击项目选中
	$(".project-lists").find("li.current").removeClass("current");
	$(".project-archives-list").find("li.current").removeClass("current");
	$(this).addClass("current");
	
	//记录cookie
	var bookmarkId =this.getAttribute("bookmark-id");
	$.cookie("bookmarkId", bookmarkId, {expires:30, path:"/"});
	
	var url = "/a/conversation/findOneConversation";
	if(conversationId){
		conversationId =conversationId.split("-")[1];
		startUp.postAsyncData(url,{"id":conversationId},function(data){
			if(data){
				$(".favoriteConversation").html("");
				$(".favoriteConversation").append(html.conversationOne("1",data));
				//$(".favoriteConversation").find('.conversations-list').prepend("<span  class='closeConversationDetail sicon-closeDetail' title='关闭话题详细' ></span>");
				add_qqFace();
				$(".favoriteConversation .show-conversation-comment").click();
			}
		});
		
	}
}
