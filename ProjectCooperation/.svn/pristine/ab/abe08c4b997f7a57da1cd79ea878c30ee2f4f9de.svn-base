var jointView = {};

/**
 * 组装任务列表
 */
jointView.taskEach = function(idx, item){
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
			var checkedTagsId = $("#checkedTags").attr("tags-id");
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
 * 组装项目列表
 */
jointView.projectEach = function(idx, item){
	var favoriteClass = item.favoriteFlag == "1" ? "sicon-star" : "sicon-star-empty";
	var favoriteTitle = item.favoriteFlag == "1" ? "取消收藏" : "添加收藏";
	var projectStatus = $("#showDifferentProject").attr("project-status");
	var favoriteProjectHtml = projectStatus ==  "0" ? "<span class='favoriteProjectEach " + favoriteClass + "' id='favoriteProject-" + item.id + "' title='" + favoriteTitle + "'></span>" : "";
	var htmlStr = "";
	htmlStr += "<li class='projectEach' id='project-" + item.id + "'>";
	htmlStr += 		favoriteProjectHtml;
	htmlStr += "	<span class='project-title'>" + item.title + "</span>";
	htmlStr += "	<div class='dropdown'>";
	htmlStr += "		<span class='glyphicon glyphicon-option-horizontal' data-toggle='dropdown'></span>";
	htmlStr += "		<ul class='dropdown-menu' id='pddm-" + item.id + "'>";
	htmlStr += 				jointView.projectMenuOption(item.favoriteFlag);
	htmlStr += "		</ul>";
	htmlStr += "	</div>";
	htmlStr += "</li>";
	return htmlStr;
}

/**
 * 组装空间成员搜索列表
 */
jointView.spaceMemberEach = function(idx, item){
	var htmlStr = "";
	htmlStr += "<div member-id='" + item.id + "' class='lists'>";
	if(item.photo){
		htmlStr += "	<img class='members' member-id='" + item.id + "' title='" + item.name + "' src='" + startUp.getRootPath() + item.photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_30.png?tsf=" +varsion+"\"'>";
	}else{
		htmlStr += "	<span class='members' member-id='" + item.id + "' title='" + item.name + "'>" + item.name.split("").reverse().join("").substring(0, 1) + "</span>";
	}
	htmlStr += "	<div class='info'>";
	htmlStr += "		<div class='name'>" + item.name + "</div>";
	htmlStr += "		<div class='email'>" + item.email + "</div>";
	htmlStr += "	</div>";
	htmlStr += "</div>";
	return htmlStr;
}

/**
 * 项目菜单选项
 */
jointView.projectMenuOption = function(favoriteFlag){
	var projectStatus = $("#showDifferentProject").attr("project-status");
	var htmlStr = "";
	htmlStr += "<li class='project-details' shref='" + startUp.getRootPath() + "/static/modules/surfond/project/template/Manage_project.jsp'>详情</li>";
	if(projectStatus == "0"){//正常项目列表
		if(favoriteFlag == "1"){
			htmlStr += "<li class='project-unfavorite'>取消收藏</li>";
		}else{
			htmlStr += "<li class='project-favorite'>添加收藏</li>";
		}
		htmlStr += "<li class='project-archive'>添加存档</li>";
	}else if(projectStatus == "2"){//存档项目列表
		htmlStr += "<li class='project-unarchive'>取消存档</li>";
	}
	htmlStr += "<li class='project-copy' data-toggle='modal' data-target='#CopyProject' href='" + startUp.getRootPath() + "/static/modules/surfond/modal/CopyProject.html'>复制项目</li>";
	htmlStr += "<li class='project-delete'>删除项目</li>";
	return htmlStr;
}

/**
 * 处理头像
 */
jointView.showDefaultPhoto = function(photo,name){
	
	var htmlStr = "";
	if(photo){
		htmlStr += "<img class='portrait' title='" + name + "' src='" + startUp.getRootPath() + photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"'>";
	}else{
		htmlStr += "<img class='portrait' title='" + name + "' src='"+startUp.getRootPath()+"/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"'>";
	}
	return htmlStr;
}



