/**
 * ===================================
 * =============		评论信息
 * ===================================
 */
	/**
	 * 加载单个对话下的所有评论
	 */
	function showCommentByConversation(id){
		if(id){
			var url = "/a/comment/list";
			startUp.postAsyncData(url,{"resourceId":id},function(data){
				$(".comment_"+id).empty();
				if(data){
					$(".comment_"+id).append(html.commentEach(null,data));
					$("#comment-count-"+id).text("评论("+data.length+")");
				}
			});
		}
	}
	/**
	 * 点击对话下的评论事加载
	 */
	$(document).on("click",".show-conversation-comment",function(){
		var conversationId = this.getAttribute("status");
		if(conversationId){
			showCommentByConversation(conversationId);
		}
	});
	
	/**
	 * 添加话题评论
	 */
	$(document).on("click",".AddComment",function(){
		
		//start 用户行为分析
		startUp.iBehavior("moduleNO_24");
		//end 用户行为分析
		var spaceId = $("#checkedSpace").attr("space-id");
		var resourceId = this.getAttribute("resourceId");
		var conversationTitle = $(this).parents(".conversations-list").find("div.comment-title").text();
		var ua = navigator.userAgent.toLowerCase();
		var str = $(this).parent().siblings("div.commentContent").html();
		$str=$("<div></div>");
		$str.html(str);
		var metionmember = "";
		var as=$str.find("input");
		for(var i=0;i<as.length;i++){
			var text = $(as[i]).val();
			var email = $(as[i]).attr("email");
			$(as[i]).after("[metion_"+text+"_surfond_"+email+"]");
			metionmember += email+";";
			$(as[i]).remove();
		}
		var ps=$str.find("img");
		for(var i=0;i<ps.length;i++){
			$(ps[i]).after($(ps[i]).attr("name"));
			$(ps[i]).remove();
		}
		var description = $str.text();
		if(description){
			if(description.length<5000){
				var id = $("#commentuuid_"+resourceId).val();
				var This = this;
				var url = "/a/comment/save";
				startUp.postAsyncData(url,{"id":id,"description":description,"resourceId":resourceId,"type":"0","metionmember":metionmember,"spaceId":spaceId,"conversationId":resourceId,"conversationTitle":conversationTitle},function(data){
					if(data){
						$(This).parent().siblings("div.commentFilelist").empty();
						$(This).parent().siblings("div.commentContent").empty();
						$("#commentuuid_"+resourceId).val("");
						$(".comment_"+resourceId).append(html.commentOne(null,data));
						getHotConversation();
						var conId = data.resourceId;
						if(conId){
							var commentCount = findConversationCommentCount(conId);
							$("#comment-count-"+conId).text("评论("+commentCount+")");
						}
					}
				});
			}else{
				commonMethods.showAlertNav("内容过长,无法添加!");
			}
		}else{
			commonMethods.showAlertNav("评论内容不能为空！");
		}
	});
	
	
	/**
	 * 删除对话评论
	 */
	$(document).on("click",".cancelComment",function(){
		var id = this.getAttribute("commentid");
		var url = "/a/comment/deleteComment";
		commonMethods.showConfirmNav("是否确定要删除评论?",function(){
			if(id){
				startUp.postAsyncData(url,{"id":id},function(data){
					if(data.result=='success'){
						showCommentByConversation(data.resourceId);
						getHotConversation();
						var conId = data.resourceId;
						if(conId){
							var commentCount = findConversationCommentCount(conId);
							$("#comment-count-"+conId).text("评论("+commentCount+")");
						}
					}
				});
			}
		},"no");

		
	});
	
	/**
	 * 评论置顶
	 */
	$(document).on("click",".commentToUp",function(){
		var id = this.getAttribute("commentid");
		var url = "/a/comment/totopcomment";
		startUp.postAsyncData(url,{"id":id},function(data){
			if(data.data=='success'){
				showCommentByConversation(data.resourceId);
			}
		});
	});
	
	
	/**
	 * 评论点赞 
	 */
	$(document).on("click",".praiseComment",function(){
		var id = this.getAttribute("value");
		var status = this.getAttribute("status");
		var url = "/a/comment/dopraiseforcomment?id="+id;
		if(id){
			startUp.getAsyncData(url,function(data){
				if(status==0){
					$("#status_"+id).removeClass("icon-thumbs-up-alt").addClass("icon-thumbs-up praiseComment");
					$("#status_"+id).attr("status","1");
					$("#status_"+id).text(data.result);
				}else{
					$("#status_"+id).removeClass("icon-thumbs-up").addClass("icon-thumbs-up-alt praiseComment");
					$("#status_"+id).attr("status","0");
					$("#status_"+id).text(data.result);
				}
			});
		}
	});
	
	
	/**
	 * 话题评论文件上传按钮样式(上传评论附件)
	 */
	$(document).on("click",".add-comment-file",function(){
		  $(this).find("input[type=file]").unbind();
		  $(this).find("input[type=file]").bind('click',function(event){event.stopPropagation()});
		  $(this).find("input[type=file]").click();
		  
		  $(this).find("input[type=file]").one("change",function(){
			  if(this.files[0].size>10485760){
				  commonMethods.showAlertNav("文件过大，最大上传10M的文件！");
					return;
				}
			  var This = this;
			  var resourceId = $(this).siblings("div.commentHiddenUUID").children(".commentuuid").val();
			  if(!resourceId){
				  var commentUUID = startUp.uuid();
				  $(this).siblings("div.commentHiddenUUID").children(".commentuuid").attr("value",commentUUID);
				  resourceId = commentUUID;
			  }
		  	var url = "/a/attachment/uploadFile?taskId="+resourceId+"&type="+resourceId+"&status=1";
			var formdata = new FormData();
			$.each(this.files,function(index,value){
				formdata.append("pic-"+index,value);
				var size = value.size;
				$(This).parents("div.emotion-line").siblings("div.commentFilelist").append("<div class='converdation-files-upload-progress'><a class='file-style'>"+value.name+"</a><div id='loadingBox'><div id='progressLoading'></div></div></div>");
				$("#progressLoading").css("width",0).html("");
				var loading = $("#progressLoading")[0];
				var outer = $("#loadingBox")[0];
				var time = size/1000000;
				loadShow(loading,outer,time);
			});
			startUp.fileUpload(url,formdata,function(result){
				$("input[type=file]").val("");
				if(result){
					if(result=='out'){
						commonMethods.showAlertNav("文件过大！");
					}else{
						var json = eval('(' + result + ')');
						var fileLength = parseFloat(json.length);
						var showLength = fileLength/1024;
						var toLength = "";
						if(showLength>500){
							toLength = toDecimal(showLength/1024)+"M";
						}else{
							toLength = toDecimal(showLength)+"K";
						}
						var fileHtml = "";
						var attType = json.filename.substring((json.filename.lastIndexOf(".")+1)).toLowerCase();
						
						setTimeout(function(){
							$(".converdation-files-upload-progress").remove();
							if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath()+json.url+"' class='hide'><span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile'></span></a>";
							}else{
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>";
							}
							$(This).parents("div.emotion-line").siblings("div.commentFilelist").append(fileHtml);
							//$(This).parents("div.emotion-line").siblings("div.commentFilelist").append("<a target='_self' class='file-style' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' >"+json.filename +" ("+toLength+")<span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>");
						},100);
					}
				}
			});
		  });
	});

	//===================================================任务评论===============================================================================================
	
	/**
	 * 任务评论文件上传按钮样式(上传评论附件)
	 */
	$(document).on("click",".add-task-attachment-file",function(){
		  $(this).find("input[type=file]").unbind();
		  $(this).find("input[type=file]").bind('click',function(event){event.stopPropagation()});
		  $(this).find("input[type=file]").click();
		  
		  $(this).find("input[type=file]").one("change",function(){
			  if(this.files[0].size>10485760){
				  commonMethods.showAlertNav("文件过大，最大上传10M的文件！");
					return;
				}
			  var This = this;
			  var resourceId = $(this).siblings("#taskHiddenUUID").children(".taskuuid").val();
			  if(!resourceId){
				  var commentUUID = startUp.uuid();
				  $(this).siblings("#taskHiddenUUID").children(".taskuuid").attr("value",commentUUID);
				  resourceId = commentUUID;
			  }
		  	var url = "/a/attachment/uploadFile?taskId="+resourceId+"&type="+resourceId+"&status=1";
			var formdata = new FormData();
			$.each(this.files,function(index,value){
				formdata.append("pic-"+index,value);
				var size = value.size;
				$(This).parents("div.task-comment-input-submit").siblings("#taskCommentAttachment").append("<div class='converdation-files-upload-progress'><a class='file-style'>"+value.name+"</a><div id='loadingBox'><div id='progressLoading'></div></div></div>");
				$("#progressLoading").css("width",0).html("");
				var loading = $("#progressLoading")[0];
				var outer = $("#loadingBox")[0];
				var time = size/1000000;
				loadShow(loading,outer,time);
			});
			startUp.fileUpload(url,formdata,function(result){
				$("input[type=file]").val("");
				if(result){
					if(result=='out'){
						commonMethods.showAlertNav("文件过大！");
					}else{
						var json = eval('(' + result + ')');
						if(!$("#comment-input-spread").hasClass('spreaded')){
							$("#comment-input-spread").click();
						}
						var fileLength = parseFloat(json.length);
						var showLength = fileLength/1024;
						var toLength = "";
						if(showLength>500){
							toLength = toDecimal(showLength/1024)+"M";
						}else{
							toLength = toDecimal(showLength)+"K";
						}
						var fileHtml = "";
						var attType = json.filename.substring((json.filename.lastIndexOf(".")+1)).toLowerCase();
						
						setTimeout(function(){
							$(".converdation-files-upload-progress").remove();
							if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath()+json.url+"' class='hide'><span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile'></span></a>";
							}else{
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>";
							}
							$(This).parents("div.task-comment-input-submit").siblings("#taskCommentAttachment").append(fileHtml);
							//$(This).parents("div.task-comment-input-submit").siblings("#taskCommentAttachment").append("<a target='_self' class='file-style' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' >"+json.filename+" ("+toLength+")<span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>");
							matter.comment_add_file();
						},100);
					}
				}
			});
		  });
	});
	
	
	/**
	 * 添加任务评论
	 */
	$(document).on("click","#taskCommentSubmit",function(){
		
		//start 用户行为分析
		startUp.iBehavior("moduleNO_39");
		//end 用户行为分析
		var spaceId = $("#checkedSpace").attr("space-id");
		var taskId = $("#task_details").attr("task-id");
		var str = $("#taskCommentContent").html();
		$str=$("<div></div>");
		$str.html(str);
		/*var as=$str.find("a");
		var metionmember = "";
		for(var i=0;i<as.length;i++){
			var text = $(as[i]).text();
			var email = $(as[i]).attr("email");
			$(as[i]).after("[metion_"+text+"_surfond_"+email+"]");
			metionmember += email+";";
			$(as[i]).remove();
		}*/
		var ps=$str.find("img");
		for(var i=0;i<ps.length;i++){
			$(ps[i]).after($(ps[i]).attr("name"));
			$(ps[i]).remove();
		}
		var description = str;
		var dynamicDescription = $str.text();
		var url = "";
		if(description){
			var id = $("#taskHiddenUUID").children(".taskuuid").val();
			var url = "/a/comment/save";
			startUp.postAsyncData(url,{"id":id,"description":description,"dynamicDescription":dynamicDescription,"resourceId":taskId,"type":"1","spaceId":spaceId},function(data){
				if(data){
					$("#taskCommentContent").html("");
					$("#taskCommentAttachment").html("");
					$("#task-comment").append(html.showTaskOneComment(null,data).replace(new RegExp("&lt;","g"), "<").replace(new RegExp("&gt;","g"), ">"));
					$('.task_details_container').scrollTop($('.task_details_container')[0].scrollHeight);
					showTaskRecord();
					if($("#comment-input-spread").hasClass('spreaded')){
						$("#comment-input-spread").click();
					}
				}
			});
		}else{
			commonMethods.showAlertNav("评论内容不能为空！");
		}
	});
	
	/**
	 * 显示任务评论列表
	 * @param id
	 */
	function showTaskCommentListWhenSelectComment(id){
		if(id){
			var url = "/a/comment/list";
			startUp.postAsyncData(url,{"resourceId":id},function(data){
				$("#task-comment").empty();
				if(data.length>0){
					$("#task-comment").append(html.showTaskComment(null,data).replace(new RegExp("&lt;","g"), "<").replace(new RegExp("&gt;","g"), ">"));
				}
			});
		}
	}
	
	/**
	 * 点击评论层时
	 */
	$(document).on("click","#thisTsakCommentList",function(){
		var taskId = $("#task_details").attr("task-id");
		showTaskCommentListWhenSelectComment(taskId);
	});
	
	/**
	 * 删除任务评论
	 */
	$(document).on("click",".task-comment-to-delete",function(){
		var taskId = $("#task_details").attr("task-id");
		var id = this.getAttribute("status");
		var url = "/a/comment/deleteComment";
		commonMethods.showConfirmNav("是否确定要删除评论?",function(){
			if(id){
				startUp.postAsyncData(url,{"id":id},function(data){
					if(data.result=='success'){
						showTaskCommentListWhenSelectComment(taskId);
						showTaskRecord();
					}
				});
			}
		},"no");
	});
	
	/**
	 * 任务评论置顶
	 */
	$(document).on("click",".task-comment-to-top",function(){
		var id = this.getAttribute("status");
		var resourceId = this.getAttribute("resourceId");
		var url = "/a/comment/totopcomment";
		startUp.postAsyncData(url,{"id":id},function(data){
			if(data.data=='success'){
				showTaskCommentListWhenSelectComment(data.resourceId);
			}
		});
	});
	
	
	/**
	 * 评论内容查看全部
	 */
	$(document).on("click",".look-all-comment-content",function(){
		var content = this.getAttribute("content");
		var frame = $(this).parent(".comment-content");
		$(frame).empty();
		$(frame).html(replace_metion(replace_em(content))+"   <a href='#' content='"+content+"' class='look-some-comment-content'>收起</a>");
	});
	
	/**
	 * 评论内容收起
	 */
	$(document).on("click",".look-some-comment-content",function(){
		var content = this.getAttribute("content");
		var frame = $(this).parent(".comment-content");
		$(frame).empty();
		$(frame).html(replace_metion(replace_em(content.substring(0,199)))+"......<a href='#' content='"+content+"' class='look-all-comment-content'>查看全部</a>");
	});
	
	/**
	 * 获取被评论的数量
	 * @param resourceId
	 * @returns {String}
	 */
	function findCommentMember(resourceId){
		var result = "";
		var url = "/a/comment/findCommentMember";
		if(resourceId){
			startUp.postAsyncData(url,{"resourceId":resourceId},function(data){
				result = data.data;
			});
		}
		return result;
	}
