
$(function(){
	
	bookmark.showBookmarkGourpList();
	
});

/**
 * 收藏类
 */
var bookmark = {};

/**
 * 显示收藏列表
 */
bookmark.showBookmarkGourpList = function(){
	
	var url = "/a/bookmark/findBookmarkGroupByUser";		//请求服务路径
	var spaceId = $("#checkedSpace").attr("space-id");		//空间ID
	
	startUp.postAsyncData(url,{"spaceId":spaceId},function(data){
		$("#show-bookmark-group-list").empty();
		var htmlStr = "";
		if(data.result){
			$.each(data.result,function(k,v){
				htmlStr += bookmarkView.bookmarkList(null,v);	//组装左边的收藏菜单列表
			});
		}
		$("#show-bookmark-group-list").append(htmlStr);
	});
	$("#bookmark-show-right").empty();
	var onceHtml = $("#show-bookmark-group-list").html();
	if(onceHtml){
		//如果有收藏数据则点击第一条数据为默认数据来显示
		$("#show-bookmark-group-list").children("li.member-group").first().children(".show-this-bookmark-list").click();
		$("#show-bookmark-group-list").children("li.member-group").first().children("span.show-this-bookmark-list").children("span.triangle-left").removeClass("triangle-left").addClass("triangle-down");
		$("#show-bookmark-group-list").children("li.member-group").first().children("ul.this-bookmark-member").css("display","block");
		$("#show-bookmark-group-list").children("li.member-group").first().children("ul.this-bookmark-member").children("li.bookmark-object-each").first().click();
		//判断其类型显示其详细板块（右侧详细）
		var type = $("#show-bookmark-group-list").children("li.member-group").first().children(".show-this-bookmark-list").attr("bookmark-type");
		if(type=='0'){								//项目详细
			var url = "/a/task/findtasklist";
			var spaceId = $("#checkedSpace").attr("space-id");
			var projectId = $("#show-bookmark-group-list").children("li.member-group").first().children("ul.this-bookmark-member").children("li.bookmark-object-each").first().attr("resource-id");
			startUp.postFormData(url, {"spaceId":spaceId,"projectId":projectId}, function(resultMap){
				if(resultMap && resultMap.data){
					var htmlStr = "";
					$.each(resultMap.data, function(idx, item){
						htmlStr += jointView.taskEach(idx, item);
					});
					$("#taskItemsTbody").append(htmlStr);
				}
			});
		}else if(type=='5'){				//标签
			setTimeout(function(){
				$("#tagsAllTaskList").click();
			},100);
			
		}else if(type=='4'){				//成员
			
		}else if(type=='3'){				//话题
			/*setTimeout(function(){
				$(".click-to-show-conversation-comment").click();
			},100);*/
			
		}
		
	}
}


/**
 * 查看收藏类型数据列表
 */
$(document).on("click",".show-this-bookmark-list",function(){
	This = this;
	var spaceId = $("#checkedSpace").attr("space-id");	//空间ID
	var type = this.getAttribute("bookmark-type");		//类型
	
	var url = "";
	if(type=='0'){			//项目
		url += "/a/bookmark/findBookmarkProjectByUser";
	}else if(type=='5'){	//标签
		url += "/a/bookmark/findBookmarkTasgByUser";
	}else if(type=='4'){	//成员
		url += "/a/bookmark/findBookmarkMemberByUser";
	}else if(type=='3'){	//话题
		url += "/a/bookmark/findBookmarkConversationByUser";
	}
	//$("#hideMenu-btn").remove();
	if(url){
		startUp.postAsyncData(url,{"type":type,"spaceId":spaceId},function(data){
			$(This).siblings("ul.this-bookmark-member").first().empty();
			var htmlStr = "";
			if(data.result.length>0){
				$.each(data.result,function(k,v){
					htmlStr += bookmarkView.showTypeMemberList(null,v);
				});
			}
			$(This).siblings("ul.this-bookmark-member").first().append(htmlStr);
		});
	}
});


/**
 * 查看收藏详情
 */
$(document).on("click",".bookmark-object-each",function(){
	$(".this-bookmark-member li").removeClass("background-color");
	$(this).addClass("background-color");
	var resourceId = this.getAttribute("resource-id");	//收藏ID
	var teamId = this.getAttribute("teamid");			//所属团队ID
	var type = this.getAttribute("type");				//收藏类型
	var title = this.getAttribute("title");				//收藏标题
	
	var url = "";
	if(teamId){											//如果有所属团队则将团队ID存于页面待有团队相关的操作使用（如@成员只看到团队成员）
		$("#show-bookmark-group-list").attr("teamid",teamId);
	}else{
		$("#show-bookmark-group-list").attr("teamid","");
	}
	if(type=='0'){			//项目
		$("#bookmark-show-right").empty();
		$("#bookmark-show-right").append(bookmarkView.showBookmarkProjectWeb());
		$("#checkedProject").attr("project-id",resourceId);
		$("#checkedProject").children("span.project-title").empty();
		$("#checkedProject").children("span.project-title").html(title);
		
		setTimeout(function(){
			$("#allTaskList").click();
		},100);
	}else if(type=='5'){	//标签
		$("#bookmark-show-right").empty();
		$("#bookmark-show-right").append(bookmarkView.showBookmarkTagsWeb());
		$("#checkedTags").attr("tags-id",resourceId);
		$("#checkedTags").children("span.project-title").empty();
		$("#checkedTags").children("span.project-title").html(title);
		
		setTimeout(function(){
			$("#tagsAllTaskList").click();
		},100);
	}else if(type=='4'){	//成员
		$("#bookmark-show-right").empty();
		url += "/a/bookmark/findBookmarkMemberByUser";
	}else if(type=='3'){	//话题
		$("#bookmark-show-right").empty();
		url += "/a/conversation/findOneConversation";
		if(resourceId){
			startUp.postFormData(url,{"id":resourceId},function(data){
				var teamHtml = "";
				if(data.result){
					var photo = startUp.getRootPath()+conversation.getThisLoginUserBaseInfo().photo;
					teamHtml += conversationView.showOneConversationCss(null,data.result,photo);
				}else{
					/*$("#bookmark-show-right").append("该信息已被删除。。。。。。");*/
					return;
				}
				var includeStr = "<div class='main-container-scroll'><div class='task-container-scroll distance-center'><div class='show-conversation-content-list'>"+teamHtml+"</div></div></div>";
				$("#bookmark-show-right").append(includeStr);
			});
			setTimeout(function(){
				$(".click-to-show-conversation-comment").click();
			},100);
			add_qqFace();	//表情初始化
		}
	}
	
});


/**
 * 取消收藏(左边菜单的列表)
 */
$(document).on("click",".cancel-bookmark-each",function(e){
	e.stopPropagation();								//阻止事件冒泡
	var resourceId = this.getAttribute("resource-id");	//收藏ID
	var type = this.getAttribute("type");				//收藏类型
	var url = "/a/bookmark/saveordeletebookmark";		//请求服务路径
	This = this;
	
	if(resourceId){
		commonMethods.showConfirmNav("是否确定要取消收藏吗?",function(){
			startUp.postFormData(url,{"resourceId":resourceId},function(data){
				
				var count = $("#bookmark-group-type-"+type).html();	//获取收藏类型的数量
				var newCount = count - 1;							//取消收藏后数量减一
				$("#bookmark-group-type-"+type).html(newCount);
				
				var next = $(This).parents("li.bookmark-object-each").next("li.bookmark-object-each")[0];
				
				$(This).parents("li.bookmark-object-each").remove();//移除本身页面元素
				if(next){
					$(next).click();
				}else{
					window.location.reload();
				}
			});
		},"no");
	}
});

