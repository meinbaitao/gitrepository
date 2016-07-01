/**
 * ========================
 * =======		项目附件信息
 * ========================
 */

var attachment = {};

/**
 * 显示项目附件
 * @param data
 */
$(document).on("click","#modelTaskAttachment",function(){
	
	var url = "/a/attachment/getAttachmentListByProject";	//请求服务路径
	var projectId = $("#checkedProject").attr("project-id");//项目ID
	var dataSource = {"projectId":projectId};				//请求参数
	
	if(projectId){
		startUp.postAsyncData(url,dataSource,function(data){
			$("#attachmentOfProject").empty();
			var str = "";
			if(data.result.length>0){
				$.each(data.result,function(k,v){
					str += attachmentView.showProjectAttachmentList(null,v);
				});
			}
			if(str){										//有无附件信息的处理
				$("#attachmentOfProject").append(str);
				$("#attachmentOfProject").css("background", "");
			}else{
				$("#attachmentOfProject").css("background", "url(" + startUp.getRootPath() + "/static/modules/surfond/common/new-images/null-files.png) no-repeat center center");
			}
		});
	}
});


/**
 * 显示单条任务附件
 * @param data
 */
$(document).on("click","#task-attachment-list",function(){	//点击切换到任务附件时
	var taskId = $("#task_details").attr("task-id");		//获取当前任务ID
	attachment.showOneTaskAttachmentWhenShowDetail(taskId); //显示当前任务附件
});
attachment.showOneTaskAttachmentWhenShowDetail = function(resourceId){
	if(resourceId){
		var url = "/a/attachment/findAttachmentListByResourceId";
		startUp.postAsyncData(url,{"taskId":resourceId},function(data){
			$("#show-task-attachment-list").empty();
			var str = "";
			if(data.result.length>0){
				str += attachmentView.showOneTaskAttachmentList(null,data.result);
			}
			if(str){
				$("#show-task-attachment-list").append(str);
			}
			$("#thisAttachmentCount").text("("+data.result.length+")");
		});
	}
}

/**
 * 显示附件数
 * @param data
 */
attachment.getAttachmentByTaskIdToCount = function(resourceId){
	var url = "/a/attachment/getAttachmentByTaskIdToCount";
	startUp.postAsyncData(url,{"taskId":resourceId},function(data){
		if(data.count){
			$("#thisAttachmentCount").html("("+data.count+")");
		}else{
			$("#thisAttachmentCount").html("(0)");
		}
	});
}


/**
 * 上传任务附件
 */
$(document).on("click", "#add-task-file-upload", function() {
	  $("#uploadTaskFileForm").empty();							//清空附件区
	  var forms = "<form data-role='none' name='taskFileForm' method='post' enctype='multipart/form-data'><input type='file' style='display:none;' class='taskFiles' data-role='none'></form>";
	  $("#uploadTaskFileForm").append(forms);					//附件区手动添加表单元素（文件域）
	  $(".taskFiles").click();									//点击文件域按钮
	  $("input.taskFiles").one("change",function(){				//在文件域按钮触发change事件时上传文件
		  
		  if(this.files[0].size>10485760){						//最大上传文件不得超过10M/条
			  	commonMethods.showAlertNav("文件过大，最大上传10M的文件！");
				return;
			}
		    var resourceId = $("#task_details").attr("task-id");//任务ID
	  		var url = "/a/attachment/uploadFile?taskId="+resourceId+"&type="+resourceId+"&status=1";//请求服务路径和参数拼装
			var formdata = new FormData();						//序列化表单
			$.each(this.files,function(index,value){			//可多文件上传
				formdata.append("pic-"+index,value);
				var size = value.size;
				$("#show-task-attachment-list").append("<div class='converdation-files-upload-progress'><a class='file-style'>"+value.name+"</a><div id='loadingBox'><div id='progressLoading'></div></div></div>");
				$("#progressLoading").css("width",0).html("");	//进度条拼装
				var loading = $("#progressLoading")[0];
				var outer = $("#loadingBox")[0];
				var time = size/1000000;
				loadShow(loading,outer,time);					//进度条动态显示
			});
			startUp.fileUpload(url,formdata,function(result){
				$("input[type=file]").val("");	
				if(result){
					if(result=='out'){
						commonMethods.showAlertNav("上传附件过大!");
					}else{
						var json = eval('(' + result + ')');			//将返回的结果（字符串）转为json
						var fileLength = parseFloat(json.length);	
						var showLength = fileLength/1024;			
						var toLength = "";
						if(showLength>500){								//大于500k则用M作单位
							toLength = toDecimal(showLength/1024)+"M";
						}else{											//小于500k则用K作单位
							toLength = toDecimal(showLength)+"K";
						}
						var fileHtml = "";
						var attType = json.filename.substring((json.filename.lastIndexOf(".")+1)).toLowerCase();//获取文件后缀
						setTimeout(function(){							//定时器处理上传完成后进度条的清理
							$(".converdation-files-upload-progress").remove();
							if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath()+json.url+"' class='hide'><span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile'></span></a>";
							}else{										//附件时图片则有预览选择，否则没有
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>";
							}
							$("#show-task-attachment-list").append(fileHtml);
							if(resourceId){
								attachment.getAttachmentByTaskIdToCount(resourceId);
							}
						},100);
					}
				}
			});
	  });
});


/**
 * 上传任务评论附件
 */
$(document).on("click","#add-task-attachment-input",function(){		//点击附件按钮触发
	 $(this).find("input[type=file]").unbind();
	 $(this).find("input[type=file]").bind('click',function(event){event.stopPropagation()});
	 $(this).find("input[type=file]").click();						//转移点击到文件域点击事件
	 $(this).find("input[type=file]").one("change",function(){		//文件域触发change事件开始上传文件
		  if(this.files[0].size>10485760){
			  	commonMethods.showAlertNav("文件过大，最大上传10M的文件！");	//单文件最大不超过10M
				return;
			}
		  var This = this;
		  var resourceId = $("#task-attachment-uuid").val();		//获取手动产生该评论的UUID表示该文件挂在该评论下
		  if(!resourceId){											//获取不到评论的ID则先生成一个存在页面（因为可能上传多个文件同时在一个评论下,则先生成一个UUID共用）
			  var commentUUID = startUp.uuid();						
			  $("#task-attachment-uuid").val(commentUUID);
			  resourceId = commentUUID;
		  }
	  		var url = "/a/attachment/uploadFile?taskId="+resourceId+"&type="+resourceId+"&status=1";//请求服务路径和参数的拼装
			var formdata = new FormData();							//序列化表单
			$.each(this.files,function(index,value){
				formdata.append("pic-"+index,value);
				var size = value.size;
				$("#submit-task-comment-attachment").append("<div class='converdation-files-upload-progress'><a class='file-style'>"+value.name+"</a><div id='loadingBox'><div id='progressLoading'></div></div></div>");
				$("#progressLoading").css("width",0).html("");			//拼装进度条样式
				var loading = $("#progressLoading")[0];
				var outer = $("#loadingBox")[0];
				var time = size/1000000;
				loadShow(loading,outer,time);							//动态显示进度条样式
			});
			startUp.fileUpload(url,formdata,function(result){
				$("input[type=file]").val("");	
				if(result){
					if(result=='out'){
						commonMethods.showAlertNav("上传附件过大!");
					}else{
						var json = eval('(' + result + ')');                                       
						var fileLength = parseFloat(json.length);          //将返回的结果（字符串）转为json     
						var showLength = fileLength/1024;                                          
						var toLength = "";                                                         
						if(showLength>500){                                                        
							toLength = toDecimal(showLength/1024)+"M";     //大于500k则用M作单位          
						}else{                                                                     
							toLength = toDecimal(showLength)+"K";          //小于500k则用K作单位          
						}
						var fileHtml = "";
						var attType = json.filename.substring((json.filename.lastIndexOf(".")+1)).toLowerCase();//获取文件后缀
						setTimeout(function(){							//定时器处理上传完成后进度条的清理
							$(".converdation-files-upload-progress").remove();
							if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath()+json.url+"' class='hide'><span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile'></span></a>";
							}else{										//附件时图片则有预览选择，否则没有
								fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>";
							}
							$("#submit-task-comment-attachment").append(fileHtml);
						},100);
					}
				}
			});
	  });
	
});


