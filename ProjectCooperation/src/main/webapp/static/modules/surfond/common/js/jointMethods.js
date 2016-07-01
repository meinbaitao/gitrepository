var commonProjectMethods = {
	getProjectId : function(){
		var projectId = $("#checkedProject").attr("project-id");
		return projectId ? projectId : "";
	}
}

var jointMethods = {};

/**
 * 加载空间成员列表
 */
jointMethods.loadSpaceMemberList = function(keyword){
	var spaceId = $("#checkedSpace").attr("space-id");
	if(spaceId){
		$("#mentionMember").empty();
		var url = "/a/space/findspacememberlist";
		var data = {"id":spaceId, "keyword":keyword};
		startUp.postAsyncData(url, data, function(resultMap){
			if(resultMap && resultMap.data){
				var htmlStr = "";
				$.each(resultMap.data, function(idx, item){
					htmlStr += jointView.spaceMemberEach(idx, item);
				});
				$("#mentionMember").append(htmlStr);
			}
		});
	}
}

/**
 * 加载任务列表
 */
jointMethods.loadTaskList = function(url, data){
	$("#taskItemsTbody").empty();
	startUp.postFormData(url, data, function(resultMap){
		if(resultMap && resultMap.data){
			var htmlStr = "";
			$.each(resultMap.data, function(idx, item){
				htmlStr += jointView.taskEach(idx, item);
			});
			$("#taskItemsTbody").append(htmlStr);
		}
	});
}

/**
 * 修改任务标题
 */
jointMethods.updateTitle = function(taskId, originalValue, newTitle){
	//首先要校验输入
	if(!newTitle){
		commonMethods.showAlertNav("标题不能为空!");
		$("#taskEachTitle-" + taskId).val(originalValue);
		$("#detailTaskTitle-" + taskId).text(originalValue);
		return ;
	}else if(newTitle.length > 50){
		commonMethods.showAlertNav("标题超出字数!");
		$("#taskEachTitle-" + taskId).val(originalValue);
		$("#detailTaskTitle-" + taskId).text(originalValue);
		return ;
	}
	
	if(originalValue != newTitle){//任务标题发生改变,需要修改任务标题
		var spaceId = $("#checkedSpace").attr("space-id");
		var url = "/a/task/updatetitlebytaskid";
		var data = {"id":taskId, "title":newTitle, "spaceId":spaceId};
		startUp.postFormData(url, data, function(resultMap){
			if(resultMap && resultMap.data){//修改任务标题成功,将修改后的值设置到标题输入框"original"属性中
				$("#taskEachTitle-" + taskId).attr("original", newTitle);
				$("#detailTaskTitle-" + taskId).attr("original", newTitle);
				jointMethods.loadLastTaskRecord();
			}
		});
	}
}

/**
 * 修改任务负责人
 */
jointMethods.updateTaskOwner = function(taskId, userId){
	var spaceId = $("#checkedSpace").attr("space-id");
	var result = 0;
	if(!taskId) taskId=$("tr.move_there").attr("id").replace("task-","");
	if(taskId){
		var url = "/a/task/updateownerbytaskid";
		var data = {"id":taskId, "user.id":userId, "spaceId":spaceId};
		startUp.postAsyncData(url, data, function(resultMap){
			if(resultMap && resultMap.data){
				result = 1;
				jointMethods.loadLastTaskRecord();
			}
		});
	}
	return result;
}

/**
 * 修改任务的截止时间
 */
jointMethods.updateTaskDueDate = function(taskId, dueDate){
	var spaceId = $("#checkedSpace").attr("space-id");
	var result = 0;
	if(spaceId && taskId){
		var url = "/a/task/updateduedatebytaskid";
		var data = {"id":taskId, "dueDate":dueDate, "spaceId":spaceId};
		startUp.postAsyncData(url, data, function(resultMap){
			if(resultMap && resultMap.data){
				result = 1;
				jointMethods.loadLastTaskRecord();
			}
		});
	}
	return result;
}

/**
 * 修改子任务截止日期
 * @return 1:成功;0:失败
 */
jointMethods.updateSubTaskDueDate = function(taskId, dueDate){
	var result = 0;
	if(taskId){
		var url = "/a/task/updateduedatebytaskid";
		var data = {"id":taskId, "dueDate":dueDate};
		startUp.postAsyncData(url, data, function(resultMap){
			if(resultMap && resultMap.data){
				result = 1;
			}
		});
	}
	return result;
}

/**
 * 加载最新记录
 */
jointMethods.loadLastTaskRecord = function(){
	var taskId = $("#task_details").attr("task-id");
	if(taskId){
		var url = "/a/dynamic/findlasttaskrecord";
		var data = {"taskId":taskId};
		startUp.postFormData(url, data, function(resultMap){
			if(resultMap && resultMap.data){
				//将最新的记录显示到任务列表项中
				$("#task-" + taskId).find("span.sicon-notification").text(replace_metion(replace_em(resultMap.data.dynamicDescription)));
				//若记录选项卡被选中,将最新的记录显示
				if($("#taskRecord").hasClass("active")){
					var htmlStr = taskDetailsView.taskRecordEach(null, resultMap.data);
					$(".task_operatLog > li:first-child").after(htmlStr);
				}
			}
		});
	}
}
//textarea 避免回车键换行
$(document).on('keydown',".add-task-nav textarea",function(e){
	if(e.keyCode == 13){
		e.preventDefault();
	}
});


