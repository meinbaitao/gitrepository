/**
 * ========================
 * =======		项目附件信息
 * ========================
 */

/**
 * 显示项目附件
 * @param data
 */
$(document).on("click","#modelTaskAttachment",function(){
	
	//start 用户行为分析
	startUp.iBehavior("moduleNO_18");
	//end 用户行为分析
	
	var data = "";
	var spaceId = "";
	var projectId = "";
	var userId = "";
	var createById = "";
	var tagsId = "";
	var taskType = $("#checkedProject").attr("task-type");
	var nextId = "0";
	if(taskType=="0"){//查询我的任务日程
		spaceId = $("#checkedSpace").attr("space-id");
		createById = $("#checkedUser").attr("user-id");
		userId = $("#checkedUser").attr("user-id");
	}else if(taskType=="1"){////查询项目下的任务日程
		spaceId = $("#checkedSpace").attr("space-id");
		projectId = $("#checkedProject").attr("project-id");
		nextId = "1";
	}else if(taskType=="2"){//查询空间成员中与我共同参与的项目任务日程
		spaceId = $("#checkedSpace").attr("space-id");
		userId = $("#checkedProject").attr("member-id");
		createById = $("#checkedProject").attr("member-id");
		nextId = "2";
	}else if(taskType=="3"){//查询标签任务日程
		nextId = "3";
		tagsId = $("#checkedProject").attr("tags-id");
	}else{
		spaceId = $("#checkedSpace").attr("space-id");
		createById = $("#checkedUser").attr("user-id");
		userId = $("#checkedUser").attr("user-id");
	}
	var url = "/a/attachment/getAttachmentListByTypeId";
	var dataSource = {"tagsId":tagsId, "spaceId":spaceId, "projectId":projectId, "user.id":userId,"createBy.id":createById, "nextId":nextId};
	startUp.postAsyncData(url,dataSource,function(data){
		if(data){
			var str = html.showAttachmentOfProject(null,data);
			if(str){
				$("#attachmentOfProject").empty();
				$("#attachmentOfProject").append(str);
			}
		}
	});
});


/**
 * 显示单条任务附件
 * @param data
 */
function showOneTaskAttachmentWhenShowDetail(resourceId){
	var url = "/a/attachment/getAttachmentList";
	startUp.postAsyncData(url,{"taskId":resourceId},function(data){
		if(data){
			$("#this-task-file-list").empty();
			$("#this-task-file-list").append(html.showOneTaskAttachment(null,data));
			$("#thisAttachmentCount").text("("+data.length+")");
		}
	});
};

/**
 * 显示附件数
 * @param data
 */
function getAttachmentByTaskIdToCount(resourceId){
	var url = "/a/attachment/getAttachmentByTaskIdToCount";
	startUp.postAsyncData(url,{"taskId":resourceId},function(data){
		if(data.count){
			$("#thisAttachmentCount").html("("+data.count+")");
		}else{
			$("#thisAttachmentCount").html("(0)");
		}
	});
};

/**
 * 显示任务附件
 */
$(document).on("click","#lookTaskAttachmentList",function(){
	var taskId = $("#task_details").attr("task-id");
	if(taskId){
		showOneTaskAttachmentWhenShowDetail(taskId);
	}
});

//上传任务附件
$(document).on("click", "#add-task-file-upload", function() {
	
	  $("#uploadTaskFileForm").empty();
	  var forms = "<form data-role='none' name='taskFileForm' method='post' enctype='multipart/form-data'>" +
	              "    <input type='file' style='display:none;' class='taskFiles' data-role='none'>" +
	              "</form>";
	  $("#uploadTaskFileForm").append(forms);
	  $(".taskFiles").click();
	  $("input.taskFiles").one("change",function(){
		  if(this.files[0].size>10485760){
			  commonMethods.showAlertNav("文件过大，最大上传10M的文件！");
				return;
			}
		    var resourceId = $("#task_details").attr("task-id");
	  		var url = "/a/attachment/uploadFile?taskId="+resourceId+"&type="+resourceId+"&status=1";
			var formdata = new FormData();
			$.each(this.files,function(index,value){
				formdata.append("pic-"+index,value);
				var size = value.size;
				$("#this-task-file-list").append("<div class='converdation-files-upload-progress'><a class='file-style'>"+value.name+"</a><div id='loadingBox'><div id='progressLoading'></div></div></div>");
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
							$("#this-task-file-list").find('.file-list').append(fileHtml);
							showTaskRecord();
							if(resourceId){
								getAttachmentByTaskIdToCount(resourceId);
							}
						},100);
					}
				}
			});
	  });
});




















