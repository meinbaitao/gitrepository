/**
 * ===================================
 * =============		评论信息
 * ===================================
 */
var comment = {};
	
	/**
	 * 评论话题
	 */
	$(document).on("click",".add-conversation-comment",function(){
		var url = "/a/comment/save";
		var resourceId = this.getAttribute("status");				//话题ID
		var This = this;
		var spaceId = $("#checkedSpace").attr("space-id");			//空间ID
		var metionmember = "";										//@成员的组装
		
		var str = $("#comment-description-"+resourceId).html();		//评论内容   未解析
		$str=$("<div></div>");
		$str.html(str);
		var as=$str.find("input");
		for(var i=0;i<as.length;i++){								//解析获取@成员
			var text = $(as[i]).val();
			var email = $(as[i]).attr("email");
			var userId = $(as[i]).attr("userId");
			$(as[i]).after("[metion_"+text+"_surfond_"+email+"]");
			metionmember += userId+";";
			$(as[i]).remove();
		}
		var ps=$str.find("img");
		for(var i=0;i<ps.length;i++){								//解析获取表情
			$(ps[i]).after($(ps[i]).attr("name"));
			$(ps[i]).remove();
		}
		var fileList = $(this).parents("div.emotion-line").siblings("div.commentFilelist").html();//获取文件区的文件
		var description = $str.text();
		var id = $("#commentuuid_"+resourceId).val();
		if(!description){							
			if(!fileList){
				commonMethods.showAlertNav('评论内容不能为空!');
				return;
			}
		}else{
			if(description.length>2000){
				commonMethods.showAlertNav('内容过长!');
				return;
			}
		}
		if(resourceId){
			startUp.postAsyncData(url,{"id":id,"resourceId":resourceId,"description":description,"spaceId":spaceId,"metionmember":metionmember, "type":"0", "conversationId":resourceId},function(data){
				var count = conversation.findConversationCommentCount(resourceId);
				$("#conversation-comment-count-"+resourceId).empty();
				$("#conversation-comment-count-"+resourceId).append("评论("+count+")");		//显示评论数量
				
				$("#conversation-comment-list-"+resourceId).append(commentView.showConversationCommentList(null,data));//组装评论到评论列表
				
				$("#comment-description-"+resourceId).html("");
				$("#commentuuid_"+resourceId).val("");
				$(This).parents("div.emotion-line").siblings("div.commentFilelist").empty();
				
				var menuType = $("#menuType").val();
				if("theme" == menuType){
					conversation.showHotConversationList();
				}
			});
		}
	});
	
	
	
	/**
	 * 点击评论查看单个话题评论
	 */
	$(document).on("click",".click-to-show-conversation-comment",function(){
		var conversationId = this.getAttribute("conversation-id");		//话题ID
		if(conversationId){
			comment.showOneConversationCommentList(conversationId);
		}
	});
	
	/**
	 * 看单个话题所有评论
	 */
	comment.showOneConversationCommentList = function(conversationId){
		var url = "/a/comment/list";
		if(conversationId){
			startUp.postAsyncData(url,{"resourceId":conversationId},function(data){
				$("#conversation-comment-list-"+conversationId).empty();
				var teamHtml = "";
				if(data){
					$.each(data,function(k,v){
						teamHtml += commentView.showConversationCommentList(null,v);
					});
				}
				$("#conversation-comment-list-"+conversationId).append(teamHtml);
				add_qqFace();		//表情初始化
			});
		}
	}
	
	/**
	 * 删除对话评论
	 */
	$(document).on("click",".cancelComment",function(){
		This = this;
		var id = this.getAttribute("status");					//评论ID
		var resourceId = this.getAttribute("conversation-id");	//话题ID
		var url = "/a/comment/deleteComment";
		
		commonMethods.showConfirmNav("是否确定要删除评论?",function(){
			if(id){
				startUp.postAsyncData(url,{"id":id},function(data){
					if(data.result=='success'){
						
						$(This).parents("div.comment-list").remove();							//移除本身页面元素
						var count = conversation.findConversationCommentCount(resourceId);		//刷新评论数量
						$("#conversation-comment-count-"+resourceId).empty();
						$("#conversation-comment-count-"+resourceId).append("评论("+count+")");
						
						var menuType = $("#menuType").val();
						if("theme" == menuType){
							conversation.showHotConversationList();
						}
					}
				});
			}
		},"no");
	});
	
	//保留两位小数  
    //功能：将浮点数四舍五入，取小数点后2位 
    function toDecimal(x) { 
      var f = parseFloat(x); 
      if (isNaN(f)) { 
        return; 
      } 
      f = Math.round(x*100)/100; 
      return f; 
    } 
    
    /**
	 * 话题评论文件上传按钮样式(上传评论附件)
	 */
	$(document).on("click",".add-comment-file",function(){		//点击评论按钮触发
		  $(this).find("input[type=file]").unbind();
		  $(this).find("input[type=file]").bind('click',function(event){event.stopPropagation()});
		  $(this).find("input[type=file]").click();//转移事件到文件域上
		  
		  $(this).find("input[type=file]").one("change",function(){//文件域触发change事件开始上传
			  if(this.files[0].size>10485760){
				  commonMethods.showAlertNav("文件过大，最大上传10M的文件！");//单文件不可超过10M
					return;
				}
			  var This = this;
			  var resourceId = $(this).siblings("div.commentHiddenUUID").children(".commentuuid").val();	//获取评论ID
			  if(!resourceId){																				//获取不到评论的ID则先生成一个存在页面（因为可能上传多个文件同时在一个评论下,则先生成一个UUID共用）
				  var commentUUID = startUp.uuid();
				  $(this).siblings("div.commentHiddenUUID").children(".commentuuid").attr("value",commentUUID);
				  resourceId = commentUUID;
			  }
		  	var url = "/a/attachment/uploadFile?taskId="+resourceId+"&type="+resourceId+"&status=1";
			var formdata = new FormData();						//表单序列化
			$.each(this.files,function(index,value){
				formdata.append("pic-"+index,value);
				var size = value.size;
				$(This).parents("div.emotion-line").siblings("div.commentFilelist").append("<div class='converdation-files-upload-progress'><a class='file-style'>"+value.name+"</a><div id='loadingBox'><div id='progressLoading'></div></div></div>");
				$("#progressLoading").css("width",0).html("");		//进度条组装
				var loading = $("#progressLoading")[0];
				var outer = $("#loadingBox")[0];
				var time = size/1000000;
				loadShow(loading,outer,time);						//进度条的动态显示
			});
			startUp.fileUpload(url,formdata,function(result){
				$("input[type=file]").val("");
				if(result){
					if(result=='out'){
						commonMethods.showAlertNav("文件过大！");
					}else{
						var json = eval('(' + result + ')');			//解析返回的json字符串
						var fileLength = parseFloat(json.length);
						var showLength = fileLength/1024;
						var toLength = "";
						if(showLength>500){
							toLength = toDecimal(showLength/1024)+"M";	//超过500K用M作单位
						}else{
							toLength = toDecimal(showLength)+"K";		//小于500K用K作单位
						}
						var fileHtml = "";
						var attType = json.filename.substring((json.filename.lastIndexOf(".")+1)).toLowerCase();//获取文件后缀
						
						setTimeout(function(){						//定时器清除进度条
							$(".converdation-files-upload-progress").remove();
							if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath()+json.url+"' class='hide'><span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile'></span></a>";
							}else{									//图片文件有预览选项，反之没有
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>";
							}
							$(This).parents("div.emotion-line").siblings("div.commentFilelist").append(fileHtml);
						},100);
					}
				}
			});
		  });
	});
	
	/**
	 * 取消文件
	 */
	$(document).on("click",".cancelFile",function(){
		var id = this.getAttribute("status");			//文件ID
		var taskId = $("#task_details").attr("task-id");//文件所属ID
		var data = "";
		if(taskId){
			data = {"id":id,"taskId":taskId};
		}else{
			data = {"id":id};
		}
		var url = "/a/attachment/deleteAttachment";
		if(id){
			startUp.postAsyncData(url,data,function(data){
				if(taskId){
					attachment.getAttachmentByTaskIdToCount(taskId);
				}
			});
		}
	});
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * 点击任务评论按钮
	 */
	$(document).on("click","#task-comment-list",function(){
		var taskId = $("#task_details").attr("task-id");	//点击任务评论按钮查看任务列表
		if(taskId){
			comment.showOneTaskCommentList(taskId);
		}
	});
	
	/**
	 * 看单个话题所有评论
	 */
	comment.showOneTaskCommentList = function(taskId){
		var url = "/a/comment/list";
		if(taskId){
			startUp.postAsyncData(url,{"resourceId":taskId},function(data){
				$(".modal-show-this-task-comment-list").empty();
				var teamHtml = "";
				if(data){
					$.each(data,function(k,v){
						teamHtml += commentView.showTaskCommentList(null,v);
					});
				}
				$(".modal-show-this-task-comment-list").append(teamHtml);
				add_qqFace();//初始化表情插件
			});
		}
	}
	
	
	/**
	 * 发表任务评论
	 */
	$(document).on("click","#submit-task-comment",function(){
		var url = "/a/comment/save";
		var taskId = $("#task_details").attr("task-id");	//当前任务ID
		var spaceId = $("#checkedSpace").attr("space-id");	//空间ID
		var metionmember = "";								//@成员的组装
		var str = $("#task-comment-description").html();	//评论输入框信息
		$str=$("<div></div>");
		$str.html(str);
		var as=$str.find("input");
		for(var i=0;i<as.length;i++){						//解析@成员
			var text = $(as[i]).val();
			var email = $(as[i]).attr("email");
			var userId = $(as[i]).attr("userId");
			$(as[i]).after("[metion_"+text+"_surfond_"+email+"]");
			metionmember += userId+";";
			$(as[i]).remove();
		}
		var ps=$str.find("img");
		for(var i=0;i<ps.length;i++){						//解析表情
			$(ps[i]).after($(ps[i]).attr("name"));
			$(ps[i]).remove();
		}
		var fileList = $("#submit-task-comment-attachment").html();	
		var description = $str.text();
		
		var id = $("#task-attachment-uuid").val();
		if(!description){
			if(!fileList){
				commonMethods.showAlertNav('评论内容不能为空!');
				return;
			}
		}else{
			if(description.length>2000){
				commonMethods.showAlertNav('内容过长!');
				return;
			}
		}
		if(taskId){
			startUp.postAsyncData(url,{"id":id,"resourceId":taskId,"description":description,"spaceId":spaceId,"metionmember":metionmember},function(data){
				$(".modal-show-this-task-comment-list").append(commentView.showTaskCommentList(null,data));
				$("#task-comment-description").html("");
				$("#submit-task-comment-attachment").html("");
				$("#task-attachment-uuid").val("");
			});
		}
	});
	
	
	/**
	 * 显示@成员
	 */
	$(document).on("click",".clickShowMembers",function(){
		var spaceId = $("#checkedSpace").attr("space-id");	//空间ID
		
		if(!spaceId){return;}
			var teamId = $("#judgeSpaceOrTeamConversation").attr("teamid");//获取成员类型
			$("#mentionMember").empty();
			$(".to-include-metion-member").empty();
			var status = this.getAttribute("status");				
			if(!status){
				if(!$(this).parent("div.emotion-line").hasClass("open")){//话题页面  评论@成员是个列表，共用一个页面上的@组装
					$(this).parent("div.emotion-line").addClass("open");
				}
			}
			var url = "";
			var data = "";
			if(teamId){		//话题页面
				url = "/a/team/findAllMemberOfOneTeam";
				data = {"id":teamId};
				startUp.postAsyncData(url, data, function(resultMap){
					if(resultMap.result){
						var htmlStr = "";
						$.each(resultMap.result, function(idx, item){
							htmlStr += spaceView.spaceMemberEach(idx, item);
						});
						$(".to-include-metion-member").append("<div class='space-mention-member'>"+htmlStr+"</div>");
						$("#mentionMember").append(htmlStr);
					}
				});
			}else{		//收藏页面-话题
				teamId = $("#show-bookmark-group-list").attr("teamid");
				if(teamId){
					url = "/a/team/findAllMemberOfOneTeam";
					data = {"id":teamId};
					startUp.postAsyncData(url, data, function(resultMap){
						if(resultMap.result){
							var htmlStr = "";
							$.each(resultMap.result, function(idx, item){
								htmlStr += spaceView.spaceMemberEach(idx, item);
							});
							$(".to-include-metion-member").append("<div class='space-mention-member'>"+htmlStr+"</div>");
							$("#mentionMember").append(htmlStr);
						}
					});
				}else{	//任务判断
					teamId = $("#task_details").attr("teamid");
					if(teamId){
						url = "/a/team/findAllMemberOfOneTeam";
						data = {"id":teamId};
						startUp.postAsyncData(url, data, function(resultMap){
							if(resultMap.result){
								var htmlStr = "";
								$.each(resultMap.result, function(idx, item){
									htmlStr += spaceView.spaceMemberEach(idx, item);
								});
								$(".to-include-metion-member").append("<div class='space-mention-member'>"+htmlStr+"</div>");
								$("#mentionMember").append(htmlStr);
							}
						});
					}else{
						url = "/a/space/findspacememberlist";
						data = {"id":spaceId, "keyword":""};
						startUp.postAsyncData(url, data, function(resultMap){
							if(resultMap && resultMap.data){
								var htmlStr = "";
								$.each(resultMap.data, function(idx, item){
									htmlStr += spaceView.spaceMemberEach(idx, item);
								});
								$(".to-include-metion-member").append("<div class='space-mention-member'>"+htmlStr+"</div>");
								$("#mentionMember").append(htmlStr);
							}
						});
					}
				}
			}
			$("body").on("click",function(){
				$("div.emotion-line").removeClass("open");
			});
			
	});
	
