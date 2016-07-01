/**
 * ===================================
 * =============		空间对话信息
 * ===================================
 */

var conversation = {};

$(function(){
	conversation.showMyTeamInfoInConversation();//团队话题列表显示
	conversation.clickSpaceConversationBtn();	//一开始默认加载空间话题
	conversation.showHotConversationList();		//热点话题
});

	/**
	 * 加载团队对话和对话评论信息
	 */
	$(document).on("click","#right-space-dialogue",loadingConversation);
	function loadingConversation(){
		//start 用户行为分析
		startUp.iBehavior("moduleNO_10");
		//end 用户行为分析
		var resourceId = $("#checkedSpace").attr("space-id");					//空间ID
		if(!resourceId){
			return;
		}
		history.pushState("","","?optionType=sapceConversation");
		$(".project-lists").find("li.current").removeClass("current");
		$(".project-archives-list").find("li.current").removeClass("current");
		getHotConversation();
		if(!resourceId){
			return;
		}
		var url = "/a/conversation/list?resourceId="+resourceId;				//操作请求路径
		startUp.getAsyncData(url,function(data){								//请求操作
			$("#conversationsLists").empty();									//清空原位置
			$("#conversationsLists").append(html.conversationEach(null,data));	//组装动态数据
			add_qqFace();
		});
	}
	$(document).on("click","#returnToCoversationList",function(){
		$("#right-space-dialogue").click();
	});
	
	
	/**
	 * 获取热点话题
	 */
	function getHotConversation(){
		var spaceId = $("#checkedSpace").attr("space-id");
		if(spaceId){
			var url = "/a/conversation/findHotConversationList";
			startUp.postAsyncData(url,{"resourceId":spaceId},function(data){
				if(data.length>0){
					var htmlStr = "";
					$.each(data,function(k,v){
						$("#conversationToSapceProject").empty();
						htmlStr += html.eachHotConversation(null,v)
					});
					$("#conversationToSapceProject").append(htmlStr);
				}
			});
		}
	}
	
	
	/**
	 * 添加话题
	 */
	$(document).on("click","#AddConversation",addConversation);
	function addConversation(){
		//start 用户行为分析
		startUp.iBehavior("moduleNO_23");
		//end 用户行为分析
		var resourceId = $("#checkedSpace").attr("space-id");
		var spaceId = $("#checkedSpace").attr("space-id");
		if(!resourceId){
			return;
		}
		var ua = navigator.userAgent.toLowerCase();
		var title = "";
	    if( ua.indexOf("firefox")>=0 || ua.indexOf("chrome")>=0){
	    	title = $("#conversationTitle").val();
	    }else{
	    	title = encodeURI($("#conversationTitle").val());
	    }
		if(title){
				if(title.length<200){
					var id = $("#conversationHiddenUUID").children(".conversationuuid").val();
					var metionmember = "";
					var str = $("#conversationEmails").html();
						$str=$("<div></div>");
						$str.html(str);
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
					var url = "/a/conversation/save";
					if(description.length<5000){
						startUp.postAsyncData(url,{"id":id,"title":title,"description":description,"resourceId":resourceId,"metionmember":metionmember,"spaceId":spaceId},function(data){
							if(data){
								$("#conversationHiddenUUID").children(".conversationuuid").attr("value","");
								$("#uploadConversationfileList").empty();
								$("#conversationTitle").val("");
								$("#conversationEmails").empty();
								$("#conversationsLists").prepend(html.conversationOne(null,data));
								add_qqFace();
								getHotConversation();
							}
						});
					}else{
						commonMethods.showAlertNav("内容过长,无法添加!");
					}
			}else{
				commonMethods.showAlertNav("标题过长,无法添加!");
			}
		}else{
			commonMethods.showAlertNav("标题不能为空！");
		}
	}
	
	/**
	 * 取消话题
	 */
	$(document).on("click",".cancelConversation",function(){
		var id = this.getAttribute("conversationid");
		var url = "/a/conversation/cancelConversation";
		if(id){
			commonMethods.showConfirmNav("是否确定要取消话题?",function(){
				startUp.postAsyncData(url,{"id":id},function(data){
					if(data.data=='success'){
						loadingConversation();
						getHotConversation();
					}
				});
			},"no");
		}
	});
	
	/**
	 * 话题置顶
	 */
	$(document).on("click",".conversationToUp",function(){
		var id = this.getAttribute("conversationid");
		var url = "/a/conversation/conversationToUp";
		if(id){
			startUp.postAsyncData(url,{"id":id},function(data){
				if(data.message=='success'){
					loadingConversation();
				}
			});
		}
	});
	
	/**
	 * 会话点赞 
	 */
	$(document).on("click",".praiseThisConversation",function(){
		$(this).children("span").click();
	});
	$(document).on("click",".praiseConversation",function(){
		var id = this.getAttribute("value");
		var status = this.getAttribute("status");
		var url = "/a/conversation/praiseConversation?id="+id;
		if(id){
			startUp.getAsyncData(url,function(data){
				if(status==0){
					$("#_status_"+id).removeClass("sicon-thumbs-empty").addClass("sicon-thumbs praiseConversation");
					$("#_status_"+id).attr("status","1");
					$("#_status_"+id).text("("+ data.result +")");
				}else{
					$("#_status_"+id).removeClass("sicon-thumbs").addClass("sicon-thumbs-empty praiseConversation");
					$("#_status_"+id).attr("status","0");
					$("#_status_"+id).text("("+ data.result +")");
				}
			});
		}
		return false;
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
		  $(this).find("input[type=file]").click();
		
		  $(this).find("input[type=file]").one("change",function(){
			if(this.files[0].size>10485760){
				commonMethods.showAlertNav("文件过大，最大上传10M的文件！");
				return;
			}
		    var resourceId = $("#conversationHiddenUUID").children(".conversationuuid").val();
		    if(!resourceId){
			  var conversationUUID = startUp.uuid();
			  $("#conversationHiddenUUID").children(".conversationuuid").attr("value",conversationUUID);
			  resourceId = conversationUUID;
		    }
		  	var url = "/a/attachment/uploadFile?taskId="+resourceId+"&type="+resourceId+"&status=1";
			var formdata = new FormData();
			$.each(this.files,function(index,value){
				formdata.append("pic-"+index,value);
				var size = value.size;
				$("#uploadConversationfileList").append("<div class='converdation-files-upload-progress'><a class='file-style'>"+value.name+"</a><div id='loadingBox'><div id='progressLoading'></div></div></div>");
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
						commonMethods.showAlertNav("上传附件过大!");
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
							$("#uploadConversationfileList").append(fileHtml);
						},100);
						//$("#uploadConversationfileList").append("<a target='_self' class='file-style' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' >"+json.filename+" ("+toLength+")<span title='"+json.filename+"' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>");
						
					}
				}
			});
		  });
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
	 * 取消文件
	 */
	$(document).on("click",".cancelFile",function(){
		var id = this.getAttribute("status");
		var taskId = $("#task_details").attr("task-id");
		var data = "";
		if(taskId){
			data = {"id":id,"taskId":taskId};
		}else{
			data = {"id":id};
		}
		var url = "/a/attachment/deleteAttachment";
		if(id){
			//matter.showConfirmNav("是否确定要移除该文件?",function(){
				startUp.postAsyncData(url,data,function(data){
					showTaskRecord();
					if(taskId){
						getAttachmentByTaskIdToCount(taskId);
					}
				});
			//},"no");
		}
	});
	
	/**
	 * 显示@成员列表
	 */
	$(document).on("click","span.clickShowMembers",function(){showMentionMember();});
	function showMentionMember(){
		var spaceId = $("#checkedSpace").attr("space-id");
		var url = "/a/space/findspacememberlist";
		if(spaceId){
			startUp.postAsyncData(url,{"id":spaceId},function(data){
				if(data.data){
					$("#mentionMember").empty();
					$("#mentionMember").append(html.showMentionMember(null,data.data));
				}
			});
		}
	}
	
	/**
	 * 热点话题的点击事件
	 */
	$(document).on("click",".hotConversationToShow",function(){
		var conversationId = this.getAttribute("status");
		showHotConversation(conversationId);
		$(".show-conversation-comment").click();
	});
	
	/**
	 * 查询单个话题
	 * @param conversationId
	 */
	function showHotConversation(conversationId){
		var url = "/a/conversation/findOneConversation";
		if(conversationId){
			startUp.postAsyncData(url,{"id":conversationId},function(data){
				if(data){
					$("#conversationsLists").empty();
					$("#conversationsLists").prepend(html.conversationOne(null,data));
					add_qqFace();
				}
			});
		}
	}
	
	/**
	 * 查询单个话题（动态详情）
	 * @param conversationId
	 */
	function showDynamicConversationDetail(conversationId){
		var url = "/a/conversation/findOneConversation";
		if(conversationId){
			startUp.postAsyncData(url,{"id":conversationId},function(data){
				if(data){
					$("#toshowDynamicConversation").find('.conversations-list').remove();
					$("#toshowDynamicConversation").append(html.conversationOne("1",data));
					//$("#toshowDynamicConversation").find('.conversations-list').prepend("<span  class='closeConversationDetail sicon-closeDetail' title='关闭话题详细' ></span>");
		
					add_qqFace();
				}
			});
		}
	}
	
	/**
	 * 查询单个话题的评论数
	 * @param resourceId
	 * @returns {String}
	 */
	function findConversationCommentCount(resourceId){
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
	 * 查找被收藏的数量
	 */
	function findBookmarkMember(resourceId){
		var url = "/a/bookmark/findBookMarkMember";
		var result = "";
		if(resourceId){
			startUp.postAsyncData(url,{"resourceId":resourceId},function(data){
				result = data.data;
			});
		}
		return result;
	}
	
	/**
	 * 添加话题收藏
	 */
	$(document).on("click",".add-bookmark",function(){
		//start 用户行为分析
		startUp.iBehavior("moduleNO_42");
		//end 用户行为分析
		$obj = $(this);
		var conversation =this.id;
		if(conversation){
			var url = "/a/bookmark/saveordeletebookmark";
			var data = {"resourceId":conversation, "type":"3"};
			startUp.postAsyncData(url, data, function(resultMap){
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
		return false;
	});
	
	
	/**
	 * 获取当前用户的头像
	 */
	function getThisUserBaseInfo(){
		var result = "";
		var url = "/a/conversation/findThisUserInfo"
		startUp.postAsyncData(url, null, function(data){
			result = data;
		});
		return result;
	}
	
	
	
	
	
	
	
	