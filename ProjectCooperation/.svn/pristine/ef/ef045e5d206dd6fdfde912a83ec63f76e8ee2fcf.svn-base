/**
 * 意见反馈
 *//*


*//**
 * 发表意见反馈
 *//*
$(document).on("click","#surfondFeedbackSubmit",function(){
	var resourceId = $("#checkedSpace").attr("space-id");					//空间ID
	var description = $("#surfondFeedbackContent").val().trim();
	if(description){
		var id = $("#uploadFeedbackFileParentId").attr("parentId");
		var url = "/a/feedback/save";
		var param = "";
		if(id){
			param = {"id":id,"description":description};
		}else{
			param = {"description":description};
		}
		startUp.postAsyncData(url, param , function(data){
			if(data){
				$("#uploadFeedbackFileParentId").attr("parentId","");
				$("#close-feedback-model").click();
				$("#feedback-file-show");
				if(resourceId){
					commonMethods.showAlertNav("意见发表成功!");
					//start 用户行为分析
					startUp.iBehavior("moduleNO_47");
					//end 用户行为分析
				}else{
					commonMethods.showAlertNav("意见发表成功!");
					//start 用户行为分析
					startUp.iBehavior("moduleNO_49");
					//end 用户行为分析
				}
				$("#surfondFeedbackContent").val("");
				findAllFeedbackInfo();
				$("#feedback-file-show").empty();
			}
		});
	}
});



*//**
 * 查找意见反馈所有信息
 *//*
function findAllFeedbackInfo(){
	var url = "/a/feedback/findAllFeedbackInfo";
	startUp.postAsyncData(url,null,function(data){
		$("#show-feedback-list").empty();
		var userInfo = getThisUserBaseInfo();
		$.each(data,function(k,v){
			$("#show-feedback-list").append(html.feedbackListShow(null,v,userInfo));
		});
	});
}
	
*//**
 * 主页发表意见上传图片
 *//*
$(document).on("click","#feedback-file-div",function(){
	$("#uploadFeedbackFileButton").empty();
	$("#uploadFeedbackFileButton").append("<input type='file' id='uploadFeedbackFile' data-role='none' class='files' style='display:none;'>");
	$("#uploadFeedbackFile").click();
});
$(document).on("change","#uploadFeedbackFile",function(){
	if(this.files[0].size>10485760){
		commonMethods.showAlertNav("文件过大，最大上传10M的文件！");
		return;
	}
	var path = this.value;
	if(!path.endsWith(".jpg") && !path.endsWith(".JPG") && !path.endsWith(".PNG") && !path.endsWith(".png") && !path.endsWith(".GIF") && !path.endsWith(".gif")){
		commonMethods.showAlertNav("只能上传图片格式文件!");
		return;
	}
	var parentId = $("#uploadFeedbackFileParentId").attr("parentId");
	if(!parentId){
		var uuid = startUp.uuid();
		parentId = uuid;
		$("#uploadFeedbackFileParentId").attr("parentId",uuid);
	}
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
	var url = "/a/attachment/uploadFile?taskId="+parentId+"&type="+parentId+"&status=1";
	startUp.fileUpload(url,formdata,function(result){
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
						$("#feedback-file-show").append(fileHtml);
					},100);
				}
			}
	});
	
});

*//**
 * 发表意见页面上传图片
 *//*
$(document).on("click","#feedback-file-div2",function(){
	$("#uploadFeedbackFileButton").empty();
	$("#uploadFeedbackFileButton").append("<input type='file' id='uploadFeedbackFile2' data-role='none' class='files' style='display:none;'>");
	$("#uploadFeedbackFile2").click();
});
$(document).on("change","#uploadFeedbackFile2",function(){
	if(this.files[0].size>10485760){
		commonMethods.showAlertNav("文件过大，最大上传10M的文件！");
		return;
	}
	var path = this.value;
	if(!path.endsWith(".jpg") && !path.endsWith(".JPG") && !path.endsWith(".PNG") && !path.endsWith(".png") && !path.endsWith(".GIF") && !path.endsWith(".gif")){
		commonMethods.showAlertNav("只能上传图片格式文件!");
		return;
	}
	var parentId = $("#uploadFeedbackFileParentId").attr("parentId");
	if(!parentId){
		var uuid = startUp.uuid();
		parentId = uuid;
		$("#uploadFeedbackFileParentId").attr("parentId",uuid);
	}
	var formdata = new FormData();
	$.each(this.files,function(index,value){
		formdata.append("pic-"+index,value);
	});
	var url = "/a/attachment/uploadFile?taskId="+parentId+"&type="+parentId+"&status=1";
	startUp.fileUpload(url,formdata,function(result){
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
					toLength = showLength+"K";
				}
				var fileHtml = "";
				var attType = json.filename.substring((json.filename.lastIndexOf(".")+1)).toLowerCase();
				if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
					fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath()+json.url+"' class='hide'><span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile'></span></a>";
				}else{
					fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>";
				}
				$("#feedback-file-show").append(fileHtml);
			}
		}
	});
	
});


*//**
 * 发表意见回复页面上传图片
 *//*
$(document).on("click",".feedback-comment-file",function(){
	$("#uploadFeedbackFileButton2").empty();
	var feedbackId = this.getAttribute("feedbackId");
	$("#uploadFeedbackFileButton2").append("<input type='file' id='uploadFeedbackFile3' feedbackId='"+feedbackId+"' data-role='none' class='files' style='display:none;'>");
	$("#uploadFeedbackFile3").click();
});
$(document).on("change","#uploadFeedbackFile3",function(){
	if(this.files[0].size>10485760){
		commonMethods.showAlertNav("文件过大，最大上传10M的文件！");
		return;
	}
	var path = this.value;
	if(!path.endsWith(".jpg") && !path.endsWith(".JPG") && !path.endsWith(".PNG") && !path.endsWith(".png") && !path.endsWith(".GIF") && !path.endsWith(".gif")){
		commonMethods.showAlertNav("只能上传图片格式文件!");
		return;
	}
	var feedbackId = this.getAttribute("feedbackId");
	var parentId = $("#uploadFeedbackFileParentId2").attr("parentId");
	if(!parentId){
		var uuid = startUp.uuid();
		parentId = uuid;
		$("#uploadFeedbackFileParentId2").attr("parentId",uuid);
	}
	var formdata = new FormData();
	$.each(this.files,function(index,value){
		formdata.append("pic-"+index,value);
	});
	var url = "/a/attachment/uploadFile?taskId="+parentId+"&type="+parentId+"&status=1";
	startUp.fileUpload(url,formdata,function(result){
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
					toLength = showLength+"K";
				}
				var fileHtml = "";
				var attType = json.filename.substring((json.filename.lastIndexOf(".")+1)).toLowerCase();
				if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
					fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath()+json.url+"' class='hide'><span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile'></span></a>";
				}else{
					fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>";
				}
				$("#feedback-files-"+feedbackId).append(fileHtml);
			}
		}
	});
	
});

*//**
 * 意见回复
 *//*
$(document).on("click",".orangeSubmitBtn",function(){
	var feedbackId = this.getAttribute("feedbackId");					//空间ID
	var description = $("#comment-content-"+feedbackId).val();
	if(description){
		var id = $("#uploadFeedbackFileParentId2").attr("parentId");
		var url = "/a/feedback/save";
		var param = "";
		if(id){
			param = {"id":id,"parentId":feedbackId,"description":description,"type":"1"};
		}else{
			param = {"parentId":feedbackId,"description":description,"type":"1"};
		}
		startUp.postAsyncData(url, param , function(data){
			if(data){
				$("#uploadFeedbackFileParentId2").attr("parentId","");
				$("#feedback-files-"+feedbackId).html("");
				$("#comment-content-"+feedbackId).val("");
				$("#feedback-comment_"+feedbackId).append(html.feedbackCommentListShow(null,data));
			}
		});
	}
});


*//**
 * 获取当前用户的头像
 *//*
function getThisUserBaseInfo(){
	var result = "";
	var url = "/a/conversation/findThisUserInfo"
	startUp.postAsyncData(url, null, function(data){
		result = data;
	});
	return result;
}

*//**
 * 获取新的回复数据
 *//*
$(document).on("click","#show-feedback-list-info-link",function(){
	//start 用户行为分析
	startUp.iBehavior("moduleNO_48");
	//end 用户行为分析
	$("#show-feedback-list-info-link").removeClass("has-new");
	});

*/