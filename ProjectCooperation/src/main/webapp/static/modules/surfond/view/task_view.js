/**
 * 任务组装包
 */
var taskView = {};

/**
 * 组装任务列表
 */
taskView.taskEach = function(idx, item){
	var nowUserId = $("#checkedUser").attr("user-id");
	var hideStyle = item.praiseAmount == 0 ? "null" : "";
	var dueDate = item.dueDate ? item.dueDate.substring(5, 10) : "";
	var dueDateStyle = dueDate ? "" : "null";
	var userName = item.user ? item.user.name : "";
	var userNameStyle = userName ? "" : "null";
	var statusClass = item.status == "7" ? "completed" : "";
	var statusTitleValue = item.status == "7" ? "取消标记" : "标记任务完成";
	var tagsTask = "";
	if(item.tagsId){
		var tagsIdArray = item.tagsId.split(";");
		var tagsTitleArray = item.tagsTitle.split(";");
		var menuType = $("#menuType").val();
		if(menuType == "tags"){
			var checkedTagsId = commonTagsMethods.getTagsId();
			for(var i = 0; null != tagsIdArray && i < tagsIdArray.length; i++){
				if(tagsIdArray[i] == checkedTagsId){
					var tempTagsTitle = tagsTitleArray[i];
					for(var j = i; j > 0; j--){
						tagsIdArray[j] = tagsIdArray[j - 1];
						tagsTitleArray[j] = tagsTitleArray[j - 1];
					}
					tagsIdArray[0] = checkedTagsId;
					tagsTitleArray[0] = tempTagsTitle;
				}
			}
		}
		$.each(tagsIdArray, function(index, data){
			if(index < 2){
				tagsTask += "<span class='tags' id='tagsTask-" + tagsIdArray[index] + "' title='" + tagsTitleArray[index] + "'>" + startUp.subString(tagsTitleArray[index], 8) + "</span>";
			}
		});
	}
	var tr_status = "";
	var nowUserIdHtml = "";
	var menuType = $("#menuType").val();
	if(menuType == "workspace"){
		nowUserIdHtml += "<span class='sicon-taskdrop' id='"+item.id+"'></span>";
	}
	if(item.createById == nowUserId){
		nowUserIdHtml += "<span class='taskStatusEach sicon-mark-complte " + statusClass + "' id='taskStatus-" + item.id + "' title='" + statusTitleValue + "'></span>";
	}else{
		if(item.user && item.user.id == nowUserId){
			nowUserIdHtml += "<span class='taskStatusEach sicon-mark-complte " + statusClass + "' id='taskStatus-" + item.id + "' title='" + statusTitleValue + "'></span>";
		}else{
			nowUserIdHtml += "<span class='sicon-mark-complte " + statusClass + "' id='taskStatus-" + item.id + "' title='" + statusTitleValue + "'></span>";
			tr_status = "read-only";
		}
	}
	if(item.createById == nowUserId){
		nowUserIdHtml += "<span class='sicon-myBulidTask'></span>";
	}else{
		if(item.user && item.user.id == nowUserId){
			nowUserIdHtml += "<span class='sicon-myOwn'></span>";
		}else{
			nowUserIdHtml += "<span class='sicon-readOnly'></span>";
		}
	}
	var taskProjectHtml = "";
	var menuType = $("#menuType").val();
	if(menuType == "workspace" && item.projectId){
		taskProjectHtml += "<div class='project-name'><span class='sicon-project18'>" + item.projectTitle + "</span></div>";
	}
	
	var htmlStr = "";
	htmlStr += "<tr class='taskEach " + tr_status + "' id='task-" + item.id + "'>";
	htmlStr += "	<td class='grid-cell-string'>";
	htmlStr += "		<div class='text-line-grid'>";
	htmlStr += "			<div class='mark-complete'>";
	htmlStr +=  				nowUserIdHtml;
	htmlStr += "			</div>";
	htmlStr += "			<div class='text-line-title'>";
	htmlStr += "				<textarea class='taskEachTitleEach' maxlength='50' id='taskEachTitle-" + item.id + "' original='" + item.title + "' rows='1' title='"+item.title+"'>" + item.title + "</textarea>";
	htmlStr +=  			    taskProjectHtml;
	htmlStr += "			</div>";
	htmlStr += "			<div class='text-line-tags'>";
	htmlStr += "               <span class='sicon-notification'>" + replace_metion(replace_em(item.dynamicDescription)) + "</span>";
	htmlStr +=  				tagsTask;
	htmlStr += "				<span class='thumbs-btn " + hideStyle + "' id='praiseForTask-" + item.id + "' >"; 
	htmlStr += "					<span class='sicon-thumbs'></span>";
	htmlStr += "					<span class='count'>" + item.praiseAmount + "</span>"; 
	htmlStr += "				</span>";
	htmlStr += "				<span class='task-date "+ dueDateStyle +"'><span class='sicon-calendar16' ></span>" + dueDate + "</span>"; 
	htmlStr += "				<span class='task-who " + userNameStyle + "'><span class='sicon-user' ></span>" + userName + "</span>";
	htmlStr += "			</div>";
	htmlStr += "		</div>";
	htmlStr += "	</td>";
	htmlStr += "</tr>";
	return htmlStr;
}



/**
 * 组装看板
 */
taskView.taskBoardEach=function(idx,item){
	var name=item.name?item.name:"",
		clas=idx>0?"class='moveArea'":"class='current' id='newTaskList'";
		
	var htmlStr="<li "+clas+" boardId='"+item.id+"'>"+name
					+"<div class='dropdown'>"
						+"<span class='sicon-dropdown' data-toggle='dropdown'></span>"
						+"<ul class='dropdown-menu' id='"+item.id+"'>"
							+"<li class='add-fliter-condition' >添加下一阶段</li>"
							+"<li class=''>编辑阶段</li>"
							+"<li class=''>删除阶段</li>"
						+"</ul>"
					+"</div>"
				+"</li>";
	return htmlStr;
}

