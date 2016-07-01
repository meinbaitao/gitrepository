/**
 * ===================================
 * =============		空间对话信息
 * ===================================
 */

	var conversation = {};
	
	$(function(){
		var menuType = $("#menuType").val();
		if("theme" == menuType){
			conversation.showMyTeamInfoInConversation();//团队话题列表显示
			conversation.clickSpaceConversationBtn();	//一开始默认加载空间话题
		}
	});

	/**
	 * 根据用户和空间查找用户所在的团队信息
	 */
	conversation.showMyTeamInfoInConversation = function(){
		var spaceId = $("#checkedSpace").attr("space-id");	//空间ID
		if(!spaceId){
			return;
		}		
		var url = "/a/team/findAllTeamOfMine";
		if(spaceId){
			startUp.postFormData(url,{"spaceId":spaceId},function(data){
				$("#team-conversation-list").empty();
				var spaceConversationBtn = "<div class='design-topics mention background-color' id='space-conversation-button'>空间话题</div>";
				var teamHtml = "";
				if(data.result.length>0){
					$.each(data.result,function(k,v){
						teamHtml += conversationView.showTeamConversation(null,v);
					});
				}
				$("#team-conversation-list").append(spaceConversationBtn+teamHtml);
			});
		}
	}
	
	/**
	 * 点击空间话题（加载空间话题）
	 */
	$(document).on("click","#space-conversation-button",function(){
		$("#conversationEmails").html("");
		$(".conversation-Emails").css("display","block");
		$("#judgeSpaceOrTeamConversation").attr("teamid","");	//标识空间话题和团队话题
		conversation.clickSpaceConversationBtn();
	});
	//获取数据
	conversation.clickSpaceConversationBtn = function(){
		var resourceId = $("#checkedSpace").attr("space-id");
		if(!resourceId){
			return;
		}
		var url = "/a/conversation/list";
		if(resourceId){
			startUp.postFormData(url,{"resourceId":resourceId},function(data){
				$("#show-conversation-content-list").empty();
				var teamHtml = "";
				if(data.result.length>0){
					var photo = startUp.getRootPath()+conversation.getThisLoginUserBaseInfo().photo;
					$.each(data.result,function(k,v){
						teamHtml += conversationView.showOneConversationCss(null,v,photo);
					});
				}
				$("#show-conversation-content-list").append(teamHtml);
				conversation.showHotConversationList();	//显示热点话题
				add_qqFace();							//表情插件初始化
				$('.subject-content').readmore({		//内容的限制处理
					  speed: 50,
					  maxHeight:69,
					  heightMargin: 69,
					  sectionCSS:"",
					  moreLink: '<a class="look-all-comment-content" href="#">查看全部</a>',
					  lessLink: '<a class="look-some-comment-content" href="#">收起</a>' 
				 });
			});
		}
	}
	
	/**
	 * 点击团队，获取团队对话
	 */
	$(document).on("click",".team-conversation-each",function(){
		$("#conversationEmails").html("");
		$(".conversation-Emails").css("display","block");
		var teamId = this.getAttribute("teamid");			//团队ID
		if(teamId){
			$("#judgeSpaceOrTeamConversation").attr("teamid",teamId);
			var url = "/a/conversation/list";
			
			startUp.postFormData(url,{"resourceId":teamId},function(data){
				$("#show-conversation-content-list").empty();
				var teamHtml = "";
				if(data.result.length>0){
					var photo = startUp.getRootPath()+conversation.getThisLoginUserBaseInfo().photo;
					$.each(data.result,function(k,v){
						teamHtml += conversationView.showOneConversationCss(null,v,photo);
					});
				}
				$("#show-conversation-content-list").append(teamHtml);
				conversation.showHotConversationList();			//加载热点话题
				add_qqFace();									//初始化表情
				$('.subject-content').readmore({				//内容限制的处理
					  speed: 50,
					  maxHeight:69,
					  heightMargin: 69,
					  sectionCSS:"",
					  moreLink: '<a class="look-all-comment-content" href="#">查看全部</a>',
					  lessLink: '<a class="look-some-comment-content" href="#">收起</a>' 
				 });
			});
		}
		
		
	});
	
	
	/**
	 * 发表话题
	 */
	$(document).on("click","#AddConversation",function(){
		conversation.addConversation();
	});
	conversation.addConversation = function(){
		var spaceId = $("#checkedSpace").attr("space-id");	//空间ID
		if(!spaceId){
			return;
		}
		var id = $("#conversationHiddenUUID").children(".conversationuuid").val();//话题ID，如果先上传了附件则存在
		var url = "/a/conversation/save";
		var title = $("#conversationTitle").val().trim();			//标题
		var resourceId = "";
		var teamId = $("#judgeSpaceOrTeamConversation").attr("teamid");//判断是否是团队话题
		var metionmember = "";
		if(!teamId){
			resourceId = spaceId;		//空间话题，则话题挂在空间下
		}else{
			resourceId = teamId;		//团队话题，则话题挂在团队下
		}
		
		var str = $("#conversationEmails").html();	//评论内容
		$str=$("<div></div>");
		$str.html(str);
		var as=$str.find("input");
		for(var i=0;i<as.length;i++){				//解析@成员
			var text = $(as[i]).val();
			var email = $(as[i]).attr("email");
			var userId = $(as[i]).attr("userId");
			$(as[i]).after("[metion_"+text+"_surfond_"+email+"]");
			metionmember += userId+";";
			$(as[i]).remove();
		}
		var ps=$str.find("img");
		for(var i=0;i<ps.length;i++){				//解析表情
			$(ps[i]).after($(ps[i]).attr("name"));
			$(ps[i]).remove();
		}
		
		var description = $str.text();
		if(description.length>2000){
			commonMethods.showAlertNav('内容过长!');
			return;
		}
		if(title){
			if(title.length>50){
				commonMethods.showAlertNav('标题不能为特殊符号或标题内容过长!');
				return;
			}
			startUp.postFormData(url,{"id":id,"title":title,"resourceId":resourceId,"description":description,"metionmember":metionmember, "spaceId":spaceId},function(data){
				var teamHtml = "";
				if(data){
					var photo = startUp.getRootPath()+conversation.getThisLoginUserBaseInfo().photo;
					teamHtml += conversationView.showOneConversationCss(null,data,photo);
				}
				$("#uploadConversationfileList").html("");
				$("#conversationHiddenUUID").children(".conversationuuid").val("");
				$("#conversationTitle").val("");
				$("#conversationEmails").html("");
				
				$("#show-conversation-content-list").prepend(teamHtml);
				conversation.showHotConversationList();		//加载热点话题
				add_qqFace();								//初始化表情
				$('.subject-content').readmore({			//内容限制处理
					  speed: 50,
					  maxHeight:69,
					  heightMargin: 69,
					  sectionCSS:"",
					  moreLink: '<a class="look-all-comment-content" href="#">查看全部</a>',
					  lessLink: '<a class="look-some-comment-content" href="#">收起</a>' 
				 });
			});
		}else{
			commonMethods.showAlertNav('标题不能为空!');
			return;
		}
		
	}
	
	
	/**
	 * 取消话题
	 */
	$(document).on("click",".cancelConversation",function(){
		This = this;
		var id = this.getAttribute("status");				//话题ID
		var url = "/a/conversation/cancelConversation";
		if(id){
			commonMethods.showConfirmNav("是否确定要取消话题?",function(){
				startUp.postFormData(url,{"id":id},function(data){
					if(data.data=='success'){
						$(This).parents("div.thematic-content").remove();
						conversation.showHotConversationList();	//加载热点话题
					}
				});
			},"no");
		}
	});
	
	
	/**
	 * 话题收藏
	 */
	$(document).on("click",".conversation-to-favorite",function(){
		//start 用户行为分析
		startUp.iBehavior("moduleNO_42");
		//end 用户行为分析
		var conversationId =this.getAttribute("conversation-id");		//话题ID
		var title = constants.bookmarkConversationType;					//类型
		var spaceId = $("#checkedSpace").attr("space-id");				//空间ID
		var data = {"resourceId":conversationId, "type":"3","title":title,"spaceId":spaceId};
		
		var menuType = $("#menuType").val();
		
		if("bookmark" == menuType){
			commonMethods.showConfirmNav("是否确定要取消收藏?",function(){
				if(conversationId){
					$obj = $("#conversation-favorite-"+conversationId);
					var url = "/a/bookmark/saveordeletebookmark";
					startUp.postFormData(url, data, function(resultMap){
						if(resultMap && resultMap.result == "0"){
							$("#bookmark-show-right").empty();
							$("li[resource-id='"+conversationId+"']").remove();
							var menuType = $("#menuType").val();
							if("bookmark" == menuType){
								var count = $("#bookmark-group-type-3").text();
								$("#bookmark-group-type-3").text(count-1);
								$(".bookmark-object-each")[0].click();
							}
						}
					});
				}
			},"no");
		}else{
			if(conversationId){
				$obj = $("#conversation-favorite-"+conversationId);
				var url = "/a/bookmark/saveordeletebookmark";
				startUp.postFormData(url, data, function(resultMap){
					if(resultMap && resultMap.result == "0"){
						if(resultMap.data){
							if($obj.hasClass("sicon-star-empty")){//添加收藏
								$obj.removeClass("sicon-star-empty").addClass("sicon-star").attr("title", "取消收藏");
							}else{//取消收藏
								$obj.removeClass("sicon-star").addClass("sicon-star-empty").attr("title", "添加收藏");
							}
						}
					}
				});
			}
		}
		return false;
	});
	
	/**
	 * 会话点赞 
	 */
	$(document).on("click",".conversation-to-praise",function(){
		var id = this.getAttribute("conversation-id");			//会话ID
		var status = $("#conversation-praise-css-"+id).attr("status");//点赞与取消点赞的状态
		
		var url = "/a/conversation/praiseConversation?id="+id;
		if(id){
			startUp.getData(url,function(data){
				if(status==0){
					$("#conversation-praise-css-"+id).removeClass("sicon-thumbs-empty").addClass("sicon-thumbs");
					$("#conversation-praise-css-"+id).attr("status","1");
					$("#conversation-praise-count-"+id).text("赞("+data.result+")");
				}else{
					$("#conversation-praise-css-"+id).removeClass("sicon-thumbs").addClass("sicon-thumbs-empty");
					$("#conversation-praise-css-"+id).attr("status","0");
					$("#conversation-praise-count-"+id).text("赞("+data.result+")");
				}
			});
		}
		return false;
	});
	
	
	/**
	 * 查询单个话题的评论数
	 * @param resourceId
	 * @returns {String}
	 */
	conversation.findConversationCommentCount = function(resourceId){
		var result = "";
		if(resourceId){
			var url = "/a/comment/findCommentMember";
			startUp.postAsyncData(url,{"resourceId":resourceId},function(data){
				result = data.data;
			});
		}
		return result;
	}
	
	/**
	 * 显示热点话题
	 */
	conversation.showHotConversationList = function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		if(!spaceId){
			return;
		}	
		var url = "/a/conversation/findHotConversationList";
		var resourceId = "";
		var teamId = $("#judgeSpaceOrTeamConversation").attr("teamid");
		if(!teamId){
			resourceId = spaceId;
		}else{
			resourceId = teamId;
		}
		if(resourceId){
			startUp.postFormData(url,{"resourceId":resourceId},function(data){
				$("#hot-conversation-list").empty();
				var teamHtml = "";
				if(data.result.length>0){
					$.each(data.result,function(k,v){
						teamHtml += conversationView.showHotConversationList(null,v);
					});
				}
				$("#hot-conversation-list").append(teamHtml);
			});
			
		}
	}
	
	
	/**
	 * 热点话题点击事件，显示单个话题
	 */
	$(document).on("click",".hot-conversation-each",function(){
		
		
		$(".space-hot-topic li").removeClass("background-color");
		$(this).addClass("background-color");
		var url = "/a/conversation/findOneConversation";
		var conversationId = this.getAttribute("conversation-id");
		
		if(conversationId){
			startUp.postFormData(url,{"id":conversationId},function(data){
				$("#show-conversation-content-list").empty();
				var teamHtml = "";
				if(data.result){
					var photo = startUp.getRootPath()+conversation.getThisLoginUserBaseInfo().photo;
					teamHtml += conversationView.showOneConversationCss(null,data.result,photo);
				}
				$("#show-conversation-content-list").append(teamHtml);
			});
			setTimeout(function(){
				$(".click-to-show-conversation-comment").click();
				add_qqFace();
			},100);
			
		}
	});
	
	
	/**
	 * 话题文件上传按钮样式(上传话题附件)
	 */
	$(document).on("click",".add-conversation-files",function(){
		  if(!$("#checkedSpace").attr("space-id")){
			  return null;
		  }
		  $(this).find("input[type=file]").unbind();
		  $(this).find("input[type=file]").bind('click',function(event){event.stopPropagation()});
		  $(this).find("input[type=file]").click();		//转移事件到文件域上
		
		  $(this).find("input[type=file]").one("change",function(){//文件域上触发change事件开始上传
			if(this.files[0].size>10485760){
				commonMethods.showAlertNav("文件过大，最大上传10M的文件！");
				return;
			}
		    var resourceId = $("#conversationHiddenUUID").children(".conversationuuid").val();//获取所属ID
		    if(!resourceId){
			  var conversationUUID = startUp.uuid();
			  $("#conversationHiddenUUID").children(".conversationuuid").attr("value",conversationUUID);
			  resourceId = conversationUUID;
		    }
		  	var url = "/a/attachment/uploadFile?taskId="+resourceId+"&type="+resourceId+"&status=1";
			var formdata = new FormData();			//表单序列化
			$.each(this.files,function(index,value){
				formdata.append("pic-"+index,value);
				var size = value.size;
				$("#uploadConversationfileList").append("<div class='converdation-files-upload-progress'><a class='file-style'>"+value.name+"</a><div id='loadingBox'><div id='progressLoading'></div></div></div>");
				$("#progressLoading").css("width",0).html("");	//进度条的拼装
				var loading = $("#progressLoading")[0];
				var outer = $("#loadingBox")[0];
				var time = size/1000000;
				loadShow(loading,outer,time);					//进度条的动态显示
			});
			startUp.fileUpload(url,formdata,function(result){
				$("input[type=file]").val("");
				if(result){
					if(result=='out'){
						commonMethods.showAlertNav("上传附件过大!");
					}else{
						var json = eval('(' + result + ')');		//解析返回的json字符串
						var fileLength = parseFloat(json.length);
						var showLength = fileLength/1024;
						var toLength = "";
						if(showLength>500){
							toLength = toDecimal(showLength/1024)+"M";	//超过500K用M作单位
						}else{
							toLength = toDecimal(showLength)+"K";		//不超过500K用K作单位
						}
						var fileHtml = "";
						var attType = json.filename.substring((json.filename.lastIndexOf(".")+1)).toLowerCase();//获取文件名后缀
						setTimeout(function(){		//定时器清理进度条
							$(".converdation-files-upload-progress").remove();
							if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath()+json.url+"' class='hide'><span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile'></span></a>";
							}else{					//判断是图片类型的文件则有预览选项，反之没有
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>";
							}
							$("#uploadConversationfileList").append(fileHtml);
						},100);
						//$("#uploadConversationfileList").append("<a target='_self' class='file-style' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' >"+json.filename+" ("+toLength+")<span title='"+json.filename+"' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>");
						
					}
				}
			});
		  });
	});

	
	/**
	 * 获取当前用户的基本信息
	 */
	conversation.getThisLoginUserBaseInfo = function(){
		var result = "";
		var url = "/a/conversation/findThisUserInfo"
		startUp.postAsyncData(url, null, function(data){
			result = data;
		});
		return result;
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
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
				startUp.postFormData(url,{"id":id,"resourceId":resourceId,"description":description,"spaceId":spaceId,"metionmember":metionmember, "type":"0", "conversationId":resourceId},function(data){
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
				startUp.postFormData(url,{"resourceId":conversationId},function(data){
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
					startUp.postFormData(url,{"id":id},function(data){
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
				startUp.postFormData(url,data,function(data){
					if(taskId){
						attachment.getAttachmentByTaskIdToCount(taskId);
					}
				});
			}
		});
		
		/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		*//**
		 * 点击任务评论按钮
		 *//*
		$(document).on("click","#task-comment-list",function(){
			var taskId = $("#task_details").attr("task-id");	//点击任务评论按钮查看任务列表
			if(taskId){
				comment.showOneTaskCommentList(taskId);
			}
		});
		
		*//**
		 * 看单个话题所有评论
		 *//*
		comment.showOneTaskCommentList = function(taskId){
			var url = "/a/comment/list";
			if(taskId){
				startUp.postFormData(url,{"resourceId":taskId},function(data){
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
		
		
		*//**
		 * 发表任务评论
		 *//*
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
				startUp.postFormData(url,{"id":id,"resourceId":taskId,"description":description,"spaceId":spaceId,"metionmember":metionmember},function(data){
					$(".modal-show-this-task-comment-list").append(commentView.showTaskCommentList(null,data));
					$("#task-comment-description").html("");
					$("#submit-task-comment-attachment").html("");
					$("#task-attachment-uuid").val("");
				});
			}
		});
		
		
		*//**
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
					startUp.postFormData(url, data, function(resultMap){
						if(resultMap.result){
							var htmlStr = "";
							$.each(resultMap.result, function(idx, item){
								htmlStr += conversationView.spaceMemberEach(idx, item);
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
						startUp.postFormData(url, data, function(resultMap){
							if(resultMap.result){
								var htmlStr = "";
								$.each(resultMap.result, function(idx, item){
									htmlStr += conversationView.spaceMemberEach(idx, item);
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
							startUp.postFormData(url, data, function(resultMap){
								if(resultMap.result){
									var htmlStr = "";
									$.each(resultMap.result, function(idx, item){
										htmlStr += conversationView.spaceMemberEach(idx, item);
									});
									$(".to-include-metion-member").append("<div class='space-mention-member'>"+htmlStr+"</div>");
									$("#mentionMember").append(htmlStr);
								}
							});
						}else{
							url = "/a/space/findspacememberlist";
							data = {"id":spaceId, "keyword":""};
							startUp.postFormData(url, data, function(resultMap){
								if(resultMap && resultMap.data){
									var htmlStr = "";
									$.each(resultMap.data, function(idx, item){
										htmlStr += conversationView.spaceMemberEach(idx, item);
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
		
