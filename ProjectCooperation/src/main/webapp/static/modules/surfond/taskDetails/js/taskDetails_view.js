var taskDetailsView = {};

/**
 * 组装子任务列表
 */
taskDetailsView.subTaskEach=function(idx,item){
	var statusClass = item.status == "7" ? "completed" : "";
	var dueDateHtml = item.dueDate ? "<span class='glyphicon WdateFmtErr set' title='标记完成时间'>" + item.dueDate.substring(5, 10) + "</span>" : "<span class='glyphicon WdateFmtErr glyphicon-calendar' title='标记完成时间'></span>";

	var htmlStr="";
	    htmlStr +="<tr  index='" + idx + "' class='subTaskEach' id='subTask-" + item.id + "'>"
				//+"  <td  class='grid_cell_item_number drag-hander'>" + idx + "</td>"
				+"  <td class='grid_cell_string'>"
				+"    <div class='text-line'>"
				+"      <div class='mark-complete'>"
				+"        <span class='" + statusClass + " subTask-mark-complte subTaskStatusEach' id='subTaskStatus-" + item.id + "'></span>"
				+"      </div>"
				+"      <div class ='text-line-title'>"
				+"        <textarea class='subTaskTitleEach' id='subTaskTitle-" + item.id + "' rows='1' title='"+item.title+"' original='" + item.title + "'>" + item.title + "</textarea>"
				+"      </div>"
				+"      <div class='text-line-tags'>"
				+		  dueDateHtml
				+"        <span class='deleteSubTaskEach sicon-delete' id='deleteSubTask-" + item.id + "' title='删除'></span>"	
				+"      </div>"
				+"    </div>"
				+"  </td>"
				//+"  <td class='td-empty'>&nbsp;</td>"
				+"</tr>"
  return htmlStr;
}

/**
 * 显示任务详细页
 */
taskDetailsView.showTaskDetail = function(taskId){
	var url = "/a/task/findtask";
	var data = {"id":taskId};
	startUp.postFormData(url, data, function(resultMap){
		//这里开始设置任务详细页中的内容
		if(resultMap && resultMap.data){
			var item = resultMap.data;
			var nowUserId = $("#checkedUser").attr("user-id");
			//设置任务编号
			$("#task_details").attr("task-id", item.id);
			//设置任务标题
			var taskTitle = $("#taskEachTitle-" + item.id).val() ? $("#taskEachTitle-" + item.id).val() : item.title;
			$(".task-details-info .task-detail-title .taskTitle").attr("tabIndex", "")
				.attr("id", "detailTaskTitle-" + item.id).attr("original", item.title).attr("title", taskTitle).text(taskTitle);
			//设置任务描述
			$(".task-details-info .task-description .task-des-content").attr("tabIndex", "")
				.attr("id", "detailTaskDescription-" + item.id).attr("original", item.description).html(item.description?item.description:'输入任务描述！');
			//设置任务状态
			if(item.status == "6"){
				$(".task-complete-mark .task-uncomplete").attr("id", "detailTaskStatus-" + item.id).removeClass("completed").attr("title", "标记任务完成");
			}else{
				$(".task-complete-mark .task-uncomplete").attr("id", "detailTaskStatus-" + item.id).removeClass("completed").addClass("completed").attr("title", "取消标记任务完成");
			}
			if(item.user.id == nowUserId || item.createById == nowUserId){
				$(".task-complete-mark .task-uncomplete").addClass("detailTaskStatus").removeClass("readonly");
			}else{
				$(".task-complete-mark .task-uncomplete").removeClass("detailTaskStatus").addClass("readonly");
			}
			//设置任务负责人
			$("#task_details .toolbar .operate-tags .appoint").empty();
			var userHtml = "<span class='sicon-user'></span>未分配";
			var userHtmlId = "un_appoint";
			if(item.user && item.user.id){
				userHtml = "<span class='sicon-user'></span>" + item.user.name;
				userHtmlId = "appoint";
			}
			$("#task_details .toolbar .operate-tags .appoint").append(userHtml).attr("id", userHtmlId);
			//设置任务截止日期
			$("#task_details .toolbar .operate-tags .deadline").empty();
			var dueDateHtml = "<span class='sicon-calendar16'></span>";
			dueDateHtml += item.dueDate ? "<span id='task-complete-date' class='Wdate WdateFmtErr set' thtml='截止日期'>" + item.dueDate.substring(0, 10) + "</span>" : "<span id='task-complete-date' class='Wdate'>截止日期</span>";
			$("#task_details .toolbar .operate-tags .deadline").append(dueDateHtml);
			//设置任务点赞
			if(item.praiseFlag == "1"){
				$(".operate-tags .praiseTask")
					.attr("title", "取消点赞").attr("id", "detailPraiseForTask-" + item.id)
					.children("span").removeClass("sicon-thumbs-empty").addClass("sicon-thumbs");
			}else{
				$(".operate-tags .praiseTask")
					.attr("title", "点个赞").attr("id", "detailPraiseForTask-" + item.id)
					.children("span").removeClass("sicon-thumbs").addClass("sicon-thumbs-empty");
			}
			//设置任务删除
			$(".operate-tags .deleteTask").attr("id", "detailDeleteTask-" + data.id);
			//设置任务标签
			$("#selected-tags").empty();
			var tagsTask = taskDetailsView.tagsTaskEach(null, item);
			$("#selected-tags").append(tagsTask);
			if($("#selected-tags > span").size() == 0){
				$("#selected-tags").hide();
			}else{
				$("#selected-tags").show();
			}
			//设置任务项目
			if(item.projectId){
				$(".operate-tags .project-belong").attr("project-id", item.projectId).find(".project-replace").text(item.projectTitle);
			}else{
				$(".operate-tags .project-belong").attr("project-id", "").find(".project-replace").text("暂无项目，请点击添加项目");
			}
			//设置任务历史负责人
			taskDetailsView.findHistoryTaskOwner();
			//设置子任务数量
			$("#subTaskList").find(".number").text("(" + item.subTaskAmount + ")");
			
			if(resultMap.data.projectTeamId){
				$("#task_details").attr("teamid",resultMap.data.projectTeamId);
			}else{
				$("#task_details").attr("teamid","");
			}
			//加载任务评论
			$("#task-comment-list").click();
			//显示任务附件数量
			var url = "/a/attachment/getAttachmentByTaskIdToCount";
			startUp.postAsyncData(url,{"taskId":item.id},function(data){
				if(data.count){
					$("#thisAttachmentCount").html("("+data.count+")");
				}else{
					$("#thisAttachmentCount").html("(0)");
				}
			});
		}
	});
}

/**
 * 查询历史负责人
 */
taskDetailsView.findHistoryTaskOwner = function(){
	var taskId = $("#task_details").attr("task-id");
	if(taskId){
		$("#responsible-log > li:not(.appoint-next)").remove();
		var url = "/a/dynamic/findhistoryownerbytaskid";
		var data = {"taskId":taskId};
		startUp.postFormData(url, data, function(resultMap){
			if(resultMap && resultMap.data){
				var htmlStr = "";
				$.each(resultMap.data, function(idx, item){
					htmlStr += taskDetailsView.historyTaskOwner(idx, item);
				});
				$("#responsible-log > li.appoint-next").after(htmlStr);
			}
		});
	}
}

/**
 * 组装任务历史负责人
 */
taskDetailsView.historyTaskOwner = function(idx, item){
	var userPhotoHtml = "";
	if(item.photo){
		userPhotoHtml = "<img class='' member-id='" + item.id + "' title='" + item.name + "' src='" + startUp.getRootPath() + item.photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_30.png" + "\"'>";
	}else{
		userPhotoHtml = "<span class='' member-id='" + item.id + "' title='" + item.name + "'>" + item.name.split("").reverse().join("").substring(0, 1) + "</span>";
	}
	var htmlStr = "";
	htmlStr += "<li>";
	htmlStr += "	<div class='members'>";
	htmlStr += 			userPhotoHtml;
	htmlStr += "	</div>";
	htmlStr += "	<div class='log-info'>";
	htmlStr += "		<span class='name'>" + item.name + "</span>"; 
	htmlStr += "		<span class='responsible-time'>" + item.createDate + "</span>";
	htmlStr += "	</div>";
	htmlStr += "</li>";
	return htmlStr;
}

/**
 * 组装任务详细页任务标签
 */
taskDetailsView.tagsTaskEach = function(idx, item){
	var tagsTask = "";
	if(item.tagsId){
		var tagsIdArray = item.tagsId.split(";");
		var tagsTitleArray = item.tagsTitle.split(";");
		$.each(tagsIdArray, function(index, data){
			tagsTask += "<span class='tags' id='selectedTags-" + tagsIdArray[index] + "' title='" + tagsTitleArray[index] + "'>" + startUp.subString(tagsTitleArray[index], 8) + "<span class='icon-remove deleteTaskTags'></span></span>";
		});
	}
	return tagsTask;
}

/**
 * 组装任务记录列表
 */
taskDetailsView.taskRecordEach = function(idx, item){
	var htmlStr = "";
	htmlStr += "<li>";
	htmlStr += "	<div class='time-line'>";
	htmlStr += "		<span class='time'>" + item.createDate.substring(5, 16) + "</span>";
	htmlStr += "		<span class='circle1'>";
	htmlStr += "			<span class='sub-circle'></span>";
	htmlStr += "		</span>";
	htmlStr += "		<span class='log-content'>" + replace_metion(replace_em(item.dynamicDescription)) + "</span>";
	htmlStr += "	</div>";
	htmlStr += "</li>";
	return htmlStr;
}

/**
 * 组装任务记录列表开始
 */
taskDetailsView.startTaskRecordList = function(){
	var htmlStr = "";
	htmlStr += "<li><div class='time-line begin'><span class='circle'></span></div></li>";
	return htmlStr;
}

/**
 * 组装任务记录列表结束
 */
taskDetailsView.endTaskRecordList = function(){
	var htmlStr = "";
	htmlStr += "<li><div class='time-line end'><span class='circle'></span></div></li>";
	return htmlStr;
}

/**
 * 组装任务评论信息
 */
taskDetailsView.showTaskCommentList = function(k,v){
	var userId = $("#checkedUser").attr("user-id");//当前用户ID
	
	var htmlStr  = "";
		htmlStr  += "<div class='comment-list'>";
		htmlStr  += "	<div class='commentator'>";
		htmlStr  += "		<span class='members member-portrait'>";
		htmlStr  += 		taskDetailsView.showDefaultPhoto(v.createByPhoto,v.createByName);
		htmlStr  += "		</span>";
		htmlStr  += "	</div>";
		htmlStr  += "	<div class='comment-info'>";
		htmlStr  += "	<div class='logtags'>";
		htmlStr  += "		<div class='comment-name'>"+v.createByName+":</div>";
		htmlStr  += "		<div class='comment-time'>"+v.createDate+"</div>";
		htmlStr  += "		<div class='comment-opreta'></div>";
		htmlStr  += "	</div>";
		htmlStr  += "	</div>";
		htmlStr  += "	<div class='comment-content'>"+replace_metion(replace_em(v.description))+"</div>";
		htmlStr  += "	<div class='comment-comment-file'>";
		if(v.attachment){
			var imgStr = "";
			var notImgStr = "";
			$.each(v.attachment,function(x,y){
				var fileLength = parseFloat(y.size);
				var showLength = fileLength/1024;
				var toLength = "";
				if(showLength>500){
					toLength = toDecimal(showLength/1024)+"M";
				}else{
					toLength = toDecimal(showLength)+"KB";
				}
				var attType = y.name.substring((y.name.lastIndexOf(".")+1)).toLowerCase();
				if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
					if(userId==v.createById){
						imgStr +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath() + y.accessPath+"' status='"+y.id+"' contenteditable='false' data-role='none'>"+y.name+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath() + y.accessPath+"' class='hide'><span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
					}else{
						imgStr +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath() + y.accessPath+"' status='"+y.id+"' contenteditable='false' data-role='none'>"+y.name+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath() + y.accessPath+"' class='hide'></a>";
					}
				}else{
					notImgStr += "                   <a target='_self' class='file-style' href='"+startUp.getRootPath() + y.accessPath+"' status='"+y.id+"'>" ;
					notImgStr += 						y.name+" ("+toLength+")" ;
					if(userId==v.createById){
						notImgStr += "						<span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'>" ;
					}
					notImgStr += "						</span>" ;
					notImgStr += "				    </a>" ;
				}
			});
			htmlStr += "				<div class='file-images'>"+imgStr+"</div>" ;
			htmlStr += "				<div class='file-list sicon-file20'>"+notImgStr ;
			htmlStr += "				</div>" ;
		}else{
			htmlStr += "				<div class='file-images'></div>" ;
			htmlStr += "				<div class='file-list sicon-file20'>" ;
			htmlStr += "				</div>" ;
		}
		htmlStr  += "</div>";
		htmlStr  += "</div>";
		return htmlStr;
}

/**
 * 处理头像显示
 */
taskDetailsView.showDefaultPhoto = function(photo,name){
	
	var htmlStr = "";
	if(photo){
		htmlStr += "<img class='portrait' title='" + name + "' src='" + startUp.getRootPath() + photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"'>";
	}else{
		htmlStr += "<img class='portrait' title='" + name + "' src='"+startUp.getRootPath()+"/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"'>";
	}
	return htmlStr;
}

/**
 * 任务附件显示样式
 */
taskDetailsView.showOneTaskAttachmentList=function(index,data){
	var userId = $("#checkedUser").attr("user-id"); 
	var imgHtml = "<div class='file-images'>";
	var fileHtml = "";
	$.each(data,function(x,y){
		var fileLength = parseFloat(y.size);
		var showLength = fileLength/1024;
		var toLength = "";
		if(showLength>500){
			toLength = toDecimal(showLength/1024)+"M";
		}else{
			toLength = toDecimal(showLength)+"K";
		}
		var attType = y.name.substring((y.name.lastIndexOf(".")+1)).toLowerCase();
		if(userId==y.userId){
			if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
				imgHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span class='preview'>预览</span><span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
			}else{
				fileHtml +="<a target='_self' class='file-style ' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
			}
		}else{
			if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
				imgHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span class='preview'>预览</span><span title='"+y.name+"'></span></a>";
			}else{
				fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span title='"+y.name+"'></span></a>";
			}
		}
	});
	imgHtml+='</div>';
	return "<div class='file-list '>"+imgHtml+fileHtml+"</div>";
}


