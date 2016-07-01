/**
 * 模板组装类
 */
var html = {};

/**
 * 组装空间列表
 */
html.spaceEach = function(idx, item){
	var htmlStr = "";
	htmlStr += "<div class='spaces-nav-list' id='space-" + item.id + "'>";
	htmlStr += "	<div class='head' title='" + item.title + "'>";
	htmlStr += "		<img alt='' src='" + startUp.getRootPath() + "/static/modules/surfond/common/images/space-list.png?tsf="+varsion+"'>";
	htmlStr += "		<div class='info'>";
	htmlStr += "			<span class='title'>" + item.title + "</span>";
	htmlStr += "			<div class='info-foot'>";
	htmlStr += "				<span class='date'>" + item.createDate + "</span>"; 
	if(item.address){
		htmlStr += "				<span class='sicon-localization'>" + item.address + "</span>";
	}
	htmlStr += "			</div>";
	htmlStr += "		</div>";
	htmlStr += "	</div>";
	htmlStr += "	<div class='content'>" + item.description + "</div>";
	htmlStr += "	<div class='foot'>";
	htmlStr += "		<span><span class='sicon-project16' title='项目数'>" + item.projectAmount + "</span></span>"; 
	htmlStr += "		<span><span class='sicon-spaceMember16' title='成员数'>" + item.memberAmount + "</span></span>";
	htmlStr += "	</div>";
	htmlStr += "</div>";
	return htmlStr;
}

/**
 * 组装空间列表
 */
html.spaceChooseEach = function(idx, item){
	var favoriteSpaceClass = item.favoriteFlag == "1" ? "sicon-star" : "sicon-star-empty";
	var favoriteSpaceTitle = item.favoriteFlag == "1" ? "取消收藏" : "添加收藏";
	var htmlStr = "";
	htmlStr += "<div class='spaces-nav-list' id='space-" + item.id + "'>";
	htmlStr += "	<div class='head' title='" + item.title + "'>";
	htmlStr += "		<img src='" + startUp.getRootPath() + "/static/modules/surfond/common/images/space-list.png?tsf="+varsion+"' alt=''>";
	htmlStr += "		<div class='info'>";
	htmlStr += "			<span class='title'>" + item.title + "</span>";
	htmlStr += "			<div class='info-foot'>";
	htmlStr += "				<span title='创建时间' class='date'>" + item.createDate + "</span> ";
	if(item.address){
		htmlStr += "				<span title='创建地点' class='sicon-localization gray'>" + item.address + "</span>";
	}
	htmlStr += "			</div>";
	htmlStr += "		</div>";
	htmlStr += "	</div>";
	htmlStr += "	<div class='content'>" + item.description + "</div>";
	htmlStr += "	<div class='foot'>";
	htmlStr += "		<span title='空间项目数'><span class='sicon-project16 black'>" + item.projectAmount + "</span></span>";
	htmlStr += "		<span title='空间成员数'><span class='sicon-spaceMember16 black'>" + item.memberAmount + "</span></span>";
	htmlStr += "		<span class='siconstarempty collect'><span class='" + favoriteSpaceClass + " collect favoriteSpaceEach' id='favoriteSpace-" + item.id + "' title='" + favoriteSpaceTitle + "'></span></span>";
	htmlStr += "	</div>";
	htmlStr += "</div>";
	return htmlStr;
}

/**
 * 组装空间成员列表
 */
html.spaceMemberEachInMenu = function(idx, item){
	var favoriteSpaceMemberClass = item.favoriteFlag == "1" ? "sicon-star" : "sicon-star-empty";
	var favoriteSpaceMemberTitle = item.favoriteFlag == "1" ? "取消收藏" : "添加收藏";
	var userPhotoHtml = "";
	if(item.photo){
		userPhotoHtml += "<img class='members logo' title='" + item.name + "' src='" + startUp.getRootPath() + item.photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_30.png?tsf=" +varsion+"\"'>";
	}else{
		userPhotoHtml += "<span class='members logo' title='" + item.name + "'>" + item.name.split("").reverse().join("").substring(0, 1) + "</span>";
	}
	var htmlStr = "";
	htmlStr += "<li class='spaceMemberEach' id='spaceMember-" + item.id + "'>";
	htmlStr += 		userPhotoHtml;
	htmlStr += "	<span class='project-title' title='"+item.name+"'>" + item.name + "</span>";
	htmlStr += "	<span class='project-data' ><span class='sicon-spaceTaskGray20' title='成员任务数(已完成/全部任务)'>" + item.taskAmount + "</span></span>";
	htmlStr += "	<span class='" + favoriteSpaceMemberClass + " favoriteSpaceMemberEach' id='favoriteSpaceMember-" + item.id + "' title='" + favoriteSpaceMemberTitle + "'></span>";
	htmlStr += "</li>";
	return htmlStr;
}

/**
 * 组装空间成员列表
 */
html.spaceMemberEach = function(idx, item, auth){
	var nowUserId = $("#checkedUser").attr("user-id");
	var isDeleteClass = auth == "1" ? " sicon-trash deleteSpaceMemberEach" : " sicon-trashDisable";
	var isChangeClass = "";
	if(auth == "1"){
		isChangeClass += " changeMemberTypeEach";
		if(item.memberType == "1"){
			isChangeClass += " sicon-manager";
		}else{
			isChangeClass += " sicon-Notmanager";
		}
	}else{
		isChangeClass += " sicon-managerDisable";
	}
	var htmlStr = "";
	htmlStr += "<div class='row' id='spaceMember-" + item.id + "' space-member-type='" + item.memberType + "'>";
	htmlStr += "	<div class='col-md-2'>";
	if(nowUserId != item.id){
		htmlStr += "		<span class='" + isChangeClass + "' id='changeMemberType-" + item.id + "' title='设置为空间负责人'></span>";
	}
    htmlStr += "    </div>";
	htmlStr += "	<div class='col-md-4'>"+ item.name +  "</div>";
	htmlStr += "	<div class='col-md-4'>"+ item.email +"</div>";
	htmlStr += "	<div class='col-md-2'>";
	if(nowUserId != item.id){
		htmlStr += "        <span class='" + isDeleteClass + "' id='deleteSpaceMember-" + item.id + "' title='移除'></span>"
	}
	htmlStr += "	</div>";
	htmlStr += "</div>";
	return htmlStr;
}

/**
 * 组装项目成员列表
 */
html.projectMemberEach = function(idx, item){
	var memberValue = "";
	var createById = $("#editProjectForm").find("input[name='creator']").attr("member-id");
	var ownerId = $("#editProjectForm").find("input[name='responsible']").attr("member-id");
	if(item.id && item.id == createById){
		memberValue = "创建者";
	}else{
		if(item.id && item.id == ownerId){
			memberValue = "负责人";
		}else{
			memberValue = "成员";
		}
	}
	var nowUserId = $("#checkedUser").attr("user-id");
	var nowUserName = item.name;
	if(item.id && item.id == nowUserId){
		nowUserName += "(我)";
	}
	var userPhotoHtml = ""
	if(item.photo){
		userPhotoHtml += "	<img class='members' title='" + item.name + "' src='" + startUp.getRootPath() + item.photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_30.png?tsf=" +varsion+"\"'>";
	}else{
		userPhotoHtml += "	<span class='members' title='" + item.name + "'>" + item.name.split("").reverse().join("").substring(0, 1) + "</span>";
	}
	var htmlStr = "";
	htmlStr += "<div class='row' id='projectMember-" + item.id + "'>";
	htmlStr += "   <div class='col-md-4'>";
	htmlStr += 		  userPhotoHtml;;
	htmlStr += "	  <span>" + nowUserName + "</span>";
	htmlStr += "   </div>";
	htmlStr += "	<span class='col-md-7'>" + item.email + "</span>";
	htmlStr += "	<span class='col-md-1'>" + memberValue + "</span>";
	htmlStr += "</div>";
	return htmlStr;
}

/**
 * 组装标签列表
 */
html.tagsEachInMenu = function(idx, item){
	var favoriteTagsClass = item.favoriteFlag == "1" ? "sicon-star" : "sicon-star-empty";
	var favoriteTagsTitle = item.favoriteFlag == "1" ? "取消收藏" : "添加收藏";
	var htmlStr = "";
	htmlStr += "<li class='tagsInMenuEach' id='tagsInMenu-" + item.id + "'>";
	htmlStr += "	<div  class='logo tabsLogo ' title='"+item.title+"'  ></div>";
	htmlStr += "	<span class='project-title' title='"+item.title+"'>" + item.title + "</span>";
	htmlStr += "	<span class='project-data' ><span class='sicon-spaceTaskGray20' title='标签任务数(已完成/全部任务)'>" + item.taskAmount + "</span></span>";
	htmlStr += "	<span class='" + favoriteTagsClass + " favoriteTagsInMenuEach' id='favoriteTagsInMenu-" + item.id + "' title='" + favoriteTagsTitle + "'></span>";
	htmlStr += "</li>";
	return htmlStr;
}

/**
 * 组装空间成员搜索列表
 */
html.spaceMemberInSearchEach = function(idx, item){
	var htmlStr = "";
	htmlStr += "<div member-id='" + item.userId + "' class='lists'>";
	if(item.photo){
		htmlStr += "	<img class='members' member-id='" + item.userId + "' title='" + item.userName + "' src='" + startUp.getRootPath() + item.photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_30.png?tsf=" +varsion+"\"'>";
	}else{
		htmlStr += "	<span class='members' member-id='" + item.userId + "' title='" + item.userName + "'>" + item.userName.split("").reverse().join("").substring(0, 1) + "</span>";
	}
	htmlStr += "	<div class='info'>";
	htmlStr += "		<div class='name'>" + item.userName + "</div>";
	htmlStr += "		<div class='email'>" + item.email + "</div>";
	htmlStr += "	</div>";
	htmlStr += "</div>";
	return htmlStr;
}
/**
 * 组装项目列表
 */
html.projectEach = function(idx, item){
	var favoriteProjectClass = item.favoriteFlag == 1 ? "sicon-star" : "sicon-star-empty";
	var favoriteProjectTitle = item.favoriteFlag == 1 ? "取消收藏" : "添加收藏";
	var htmlStr = "";
	htmlStr += "<li class='sameproject projectEach' id='project-" + item.id + "' panels-target='.task-nav' index='"+idx+"'>";
	htmlStr += "    <div  class='logo projectLogo ' title='"+item.title+"'  ></div>";
	htmlStr += "	<span class='project-title' title='"+item.title+"'>" + item.title + "</span>";
	htmlStr += "	<span class='project-data' ><span class='sicon-spaceMemberGray20' title='项目成员数'>" + item.memberAmount + "</span><span class='sicon-spaceTaskGray20' title='项目任务数(已完成/全部任务)'>" + item.taskAmount + "</span></span>";
	htmlStr += "	<span class='" + favoriteProjectClass + " favoriteProjectEach' id='favoriteProject-" + item.id + "' title='" + favoriteProjectTitle + "'></span>";
	htmlStr += "</li>";
	return htmlStr;
}

/**
 * (对话页面)组装热点话题列表
 */
html.eachHotConversation = function(idx, item){
	var htmlStr = "<li class='hotConversationToShow' status='" + item.id + "'>";
	if(item.title.length>12){
		htmlStr += "<span class='project-title' title='"+item.title+"'>#" + item.title.substring(0,10) + "...#</span></li>";
	}else{
		htmlStr += "<span class='project-title' title='"+item.title+"'>#" + item.title + "#</span></li>";
	}
	return htmlStr;
}

/**
 * 组装存档项目列表
 */
html.archiveProjectEach = function(idx, item){
	var htmlStr = "";
	htmlStr += "<li class='sameproject archiveProjectEach' id='archiveProject-" + item.id + "' panels-target='.task-nav' index='"+idx+"'>";
	htmlStr += "    <div  class='logo projectLogo ' title='"+item.title+"'  ></div>";
	htmlStr += "    <span class='project-title'  title='"+item.title+"'>" + item.title + "</span>";
	htmlStr += "	<span class='project-data' ><span class='sicon-spaceMemberGray20' title='项目成员数'>" + item.memberAmount + "</span><span class='sicon-spaceTaskGray20' title='项目任务数(已完成/全部任务)'>" + item.taskAmount + "</span></span>";
	htmlStr += "</li>";
	return htmlStr;
}

/**
 * 组装项目列表(图表统计项目查询)
 */
html.projectOnCharEach = function(idx, item){
	var htmlStr = "";
	htmlStr += "<li class='projectOnCharEach' id='projectOnChar-" + item.id + "'>" + item.title + "</li>";
	return htmlStr;
}

/**
 * 组装任务列表
 */
html.taskEach = function(idx, item){
	var taskType = $("#checkedProject").attr("task-type");
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
		if(taskType == "3"){//查询标签中的任务时将当前标签移到数组最前端
			var checkedTagsId = $("#checkedProject").attr("tags-id");
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
	if(item.createById == nowUserId){
		nowUserIdHtml += "<span class='taskStatusEach subTask-mark-complte " + statusClass + "' id='taskStatus-" + item.id + "' title='" + statusTitleValue + "'></span>";
	}else{
		if(item.user && item.user.id == nowUserId){
			nowUserIdHtml += "<span class='taskStatusEach subTask-mark-complte " + statusClass + "' id='taskStatus-" + item.id + "' title='" + statusTitleValue + "'></span>";
		}else{
			nowUserIdHtml += "<span class='subTask-mark-complte " + statusClass + "' id='taskStatus-" + item.id + "' title='" + statusTitleValue + "'></span>";
			tr_status = "read-only";
		}
	}
	if(item.createById == nowUserId){
		nowUserIdHtml += "<span class='sicon-myBulidTask'></span>";
	}else{
		if(item.user && item.user.id == nowUserId){
			nowUserIdHtml += "<span class='sicon-myOwn'></span>";
		}else{
			nowUserIdHtml += "<span class='sicon-ReadOnly'></span>";
		}
	}
	var taskProjectHtml = "";
	if((taskType == "0" || taskType == "2" || taskType == "3") && item.projectId){
		taskProjectHtml += "<div class='project-name'><span class='sicon-project18'>" + item.projectTitle + "</span></div>";
	}
	var htmlStr = "";
	htmlStr += "<tr class='taskEach " + tr_status + "' id='task-" + item.id + "'>";
	htmlStr += "	<td class='grid_cell_string'>";
	htmlStr += "		<div class='text-line-grid'>";
	htmlStr += "			<div class='mark-complete'>" + nowUserIdHtml + "</div>";
	htmlStr += "			<div class='text-line-title'>";
	htmlStr += "				<textarea class='taskEachTitleEach' maxlength='50' id='taskEachTitle-" + item.id + "' original='" + item.title + "' rows='1' title='"+item.title+"'>" + item.title + "</textarea>";
	htmlStr +=  			    taskProjectHtml;
	htmlStr += "			</div>";
	htmlStr += "			<div class='text-line-tags'>";
	htmlStr += "               <span class='sicon-notification'>" + replace_metion(replace_em(item.dynamicDescription.replace("{content:\"", "").replace("\"}", ""))) + "</span>";	
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
 * 组装任务标签列表
 */
html.tagsTaskEach = function(idx, item){
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
 * 组装任务历史负责人
 */
html.taskHistoryOwnerEach = function(idx, item){
	var ownerPhotoHtml = "";
	if(item.photo){
		ownerPhotoHtml += "<img class='portrait' title='"+item.name+"' src='"+startUp.getRootPath()+item.photo+"' onerror='this.src=\""+startUp.getRootPath()+"/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"'/>";
	}else{
		ownerPhotoHtml += "<span title='" + item.name + "'>" + item.name.split("").reverse().join("").substring(0, 1) + "</span>";
	}
	var htmlStr = "";
	htmlStr += "<li>";
	htmlStr += "	<div class='members'>";
	htmlStr += 			ownerPhotoHtml;
	htmlStr += "	</div>";
	htmlStr += "	<div class='log-info'>";
	htmlStr += "		<span class='name'>" + item.name + "</span>";
	htmlStr += "		<span class='responsible-time'>" + item.createDate + "</span>";
	htmlStr += "	</div>";
	htmlStr += "</li>";
	return htmlStr;
}


/**
 * 组装对话列表（包括对话的信息、对话附件信息和对话下的评论信息和评论附件信息）
 */
html.conversationEach = function(index,value){
	var thisUserPhoto = getThisUserBaseInfo().photo;
	if(!thisUserPhoto){
		thisUserPhoto = startUp.getRootPath()+"/static/modules/surfond/common/images/photo_40.png?tsf"+varsion;
	}else{
		thisUserPhoto = startUp.getRootPath()+thisUserPhoto;
	}
	var userId = $("#checkedUser").attr("user-id");
	var htmlStr = "";
	$.each(value,function(k,v){
		var hasTrash= userId == v.userId?"<span class='icon-trash cancelConversation' conversationid='"+v.id+"'></span>":'';
		var commenContent="",imgHtml = "",fileHtml = "",isPraiseHtml="";
		var favoriteSpaceClass = v.favoriteFlag == "1" ? "sicon-star" : "sicon-star-empty";
		var favoriteSpaceTitle = v.favoriteFlag == "1" ? "取消收藏" : "添加收藏";
        if(v.description.length>200){
        	commenContent +="<div class='comment-content'>"+replace_metion(replace_em(v.description.substring(0,199)))+"......<a href='#' content='"+v.description+"' class='look-all-comment-content'>查看全部</a></div>";
		}else{
			commenContent +="<div class='comment-content'>"+replace_metion(replace_em(v.description))+"</div>";
		}

		if(v.attachment){
			$.each(v.attachment,function(x,y){    
				var fileLength = parseFloat(y.size);
				var showLength = fileLength/1024;
				var toLength = "";
				if(showLength>500){
					toLength = toDecimal(showLength/1024)+"M";
				}else{
					toLength = toDecimal(showLength)+"K";
				}
				var attType = y.name.substring((y.name.lastIndexOf(".")+1)).toLowerCase();
				if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
					imgHtml +="<div class='imgs-div'><img src='"+startUp.getRootPath()+y.accessPath+"' alt='"+y.name+"'></div>";
				}else{
					
					fileHtml += html.fileAttType(attType);
					if(userId == y.userId){
						fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' ><div class='imgs-icon'></div><span class='fiel-info'><span class='file-name'>"+y.name+"</span><span class='file-size'>("+toLength+")</span></span><span title='删除附件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
					}else{
						fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' ><div class='imgs-icon'></div><span class='fiel-info'><span class='file-name'>"+y.name+" </span><span class='file-size'>("+toLength+")</span></span></a>";
					}
					fileHtml+="</div>"
				}
			});

			
		}
		if(v.isPraise=='1'){
			isPraiseHtml += "<span value='"+v.id+"' status='1' id='_status_"+v.id+"' class='sicon-thumbs praiseConversation'>("+v.praiseAmount+")</span>";	
		 }else{
			 isPraiseHtml += "<span value='"+v.id+"' status='0' id='_status_"+v.id+"' class='sicon-thumbs-empty green  praiseConversation'>("+v.praiseAmount+")</span>";
		 }
		
		htmlStr += "<div class='divstyle conversations-list '>"
                  +"    <div class='comment-list conversations-list-subject'>"
                  +"      <div class='members'>"+html.showDefaultPhoto(v.photo,v.userName)+"</div>"
                  +"      <div class='comment-info'>"
                  +"         <div class='comment-info-tags'>"
                  +"            <div class='comment-title' title='"+v.title+"'>"+v.title+"</div>"
                  +"            <div class='comment-name' title='"+v.userName+"'>" 
                  + "               <span class='name-orange'> "+v.userName+"</span>"
                  +"                <span class='comment-time'>"+v.createDate+"</span>"
                  +"            </div>"
                  +             hasTrash
                  +"         </div>"
                  +"     </div>"
                  +"   </div>"
                  +    commenContent                  
                  +"   <div class='comment-conversation-file showConversationAttachment_"+v.id+"'>"
                  +"       <div class='file-images'>"+imgHtml+fileHtml+"</div>"
                  +"   </div>"
                  +"   <div class='list-subject-operat'>" 
                  +"      <span><span class='"+favoriteSpaceClass+" size16 add-bookmark' id='"+v.id+"' title='"+favoriteSpaceTitle+"'>收藏</span></span>" 
            	  +"      <span class='show-comment show-conversation-comment' status='"+v.id+"'><span class='sicon-conversation-comment' id='comment-count-"+v.id+"'>评论("+v.commentCount+")</span><span class='sicon-show-comment'></span></span>"
            	  +"      <span class='thumbs praiseThisConversation'>"+isPraiseHtml+"</span>"
                  +"   </div>"
                  +"   <div class='comment-input-div'>"
    		      +"     <img class='portrait' src='"+thisUserPhoto+"' onerror='this.src=\""+startUp.getRootPath()+"/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"' alt='user_logo'>"
		          +"     <div class='comment_input inputarea'>"
		          +"       <div contenteditable='true' name='saytext' class='input-div saytext commentContent' id='face_"+v.id+"'></div>"
		          +"       <div class='emotion-line'>"
			      +"         <span class='emotion sicon-face25' title='添加表情'></span>"
			      +"         <span class='sicon-related clickShowMembers' title='@成员'></span>"
			      +"         <span class='sicon-file25 add-comment-file' title='添加附件'>"
			      +"            <form enctype='multipart/form-data' method='post' id='f'>"
			      +"			   <input type='file'  class='files' style='display:none;'>"
			      +"			   <div class='commentHiddenUUID'><input type='hidden' id='commentuuid_"+v.id+"' class='commentuuid' value=''></div>"
			      +"		    </form>"
			      +"		 </span>"
			      +"		 <input type='button' resourceId='"+v.id+"'  value='评论' class='comment_input_submit  AddComment'>"
		          +"       </div>"
		          +"       <div class='commentFilelist'></div>"		  
		          +"     </div>"
		          +"   </div>"
                  +"   <div class='conversation-comment comment_"+v.id+"'></div>"
                  +"</div>";
	});
	return htmlStr;
}

/**
 * 组装单个对话信息
 */
html.conversationOne = function(k,v){
	var thisUserPhoto = getThisUserBaseInfo().photo;
	if(!thisUserPhoto){
		thisUserPhoto = startUp.getRootPath()+"/static/modules/surfond/common/images/photo_40.png?tsf="+varsion;
	}else{
		thisUserPhoto = startUp.getRootPath()+thisUserPhoto;
	}
	//判断是否已经收藏的标识
	var favoriteSpaceClass = v.favoriteFlag == "1" ? "sicon-star" : "sicon-star-empty";
	var favoriteSpaceTitle = v.favoriteFlag == "1" ? "取消收藏" : "添加收藏";
	
	var userId = $("#checkedUser").attr("user-id");
	var hasTrash= "";
	if(k=='1'){
		hasTrash= "";
	}else{
		hasTrash= userId == v.userId?"<span class='icon-trash cancelConversation' conversationid='"+v.id+"'></span>":'';
	}
	var commenContent="",imgHtml = "",fileHtml = "",isPraiseHtml="",htmlStr="";
    if(v.description.length>200){
    	commenContent +="<div class='comment-content'>"+replace_metion(replace_em(v.description.substring(0,199)))+"......<a href='#' content='"+v.description+"' class='look-all-comment-content'>查看全部</a></div>";
	}else{
		commenContent +="<div class='comment-content'>"+replace_metion(replace_em(v.description))+"</div>";
	}
	if(v.attachment){
		$.each(v.attachment,function(x,y){    
			var fileLength = parseFloat(y.size);
			var showLength = fileLength/1024;
			var toLength = "";
			if(showLength>500){
				toLength = toDecimal(showLength/1024)+"M";
			}else{
				toLength = toDecimal(showLength)+"K";
			}
			var attType = y.name.substring((y.name.lastIndexOf(".")+1)).toLowerCase();
			if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
				imgHtml +="<div class='imgs-div'><img src='"+startUp.getRootPath()+y.accessPath+"' alt='"+y.name+"'></div>";
			}else{
				
				fileHtml += html.fileAttType(attType);
				if(userId == y.userId){
					fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' ><div class='imgs-icon'></div><span class='fiel-info'><span class='file-name'>"+y.name+"</span><span class='file-size'>("+toLength+")</span></span><span title='删除附件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
				}else{
					fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' ><div class='imgs-icon'></div><span class='fiel-info'><span class='file-name'>"+y.name+" </span><span class='file-size'>("+toLength+")</span></span></a>";
				}
				fileHtml+="</div>"
			}
		});
	}
	if(v.isPraise=='1'){
		isPraiseHtml += "<span value='"+v.id+"' status='1' id='_status_"+v.id+"' class='sicon-thumbs praiseConversation'>("+v.praiseAmount+")</span>";	
	 }else{
		 isPraiseHtml += "<span value='"+v.id+"' status='0' id='_status_"+v.id+"' class='sicon-thumbs-empty green  praiseConversation'>("+v.praiseAmount+")</span>";
	 }
	htmlStr += "<div class='divstyle conversations-list '>"
              +"    <div class='comment-list conversations-list-subject'>"
              +"      <div class='members'>"+html.showDefaultPhoto(v.photo,v.userName)+"</div>"
              +"      <div class='comment-info'>"
              +"         <div class='comment-info-tags'>"
              +"            <div class='comment-title' title='"+v.title+"'>"+v.title+"</div>"
              +"            <div class='comment-name' title='"+v.userName+"'>" 
              + "               <span class='name-orange'> "+v.userName+"</span>"
              +"                <span class='comment-time'>"+v.createDate+"</span>"
              +"            </div>"
              +             hasTrash
              +"         </div>"
              +"     </div>" 
              +"   </div>"
              +    commenContent                  
              +"   <div class='comment-conversation-file showConversationAttachment_"+v.id+"'>"
              +"      <div class='file-images'>"+imgHtml+fileHtml+"</div>"
              +"   </div>"
              +"   <div class='list-subject-operat'>" 
        	  +"      <span><span class='"+favoriteSpaceClass+" size16 add-bookmark' id='"+v.id+"' title='"+favoriteSpaceTitle+"'>收藏</span></span>" 
        	  +"      <span class='show-comment show-conversation-comment' status='"+v.id+"'><span class='sicon-conversation-comment' id='comment-count-"+v.id+"'>评论("+v.commentCount+")</span><span class='sicon-show-comment'></span></span>"
        	  +"      <span class='thumbs praiseThisConversation'>"+isPraiseHtml+"</span>"
              +"   </div>"
              +"   <div class='comment-input-div'>"
		      +"     <img class='portrait' src='"+thisUserPhoto+"' onerror='this.src=\""+startUp.getRootPath()+"/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"' alt='user_logo'>"
	          +"     <div class='comment_input inputarea'>"
	          +"       <div contenteditable='true' name='saytext' class='input-div saytext commentContent' id='face_"+v.id+"'></div>"
	          +"       <div class='emotion-line'>"
		      +"         <span class='emotion sicon-face25' title='添加表情'></span>"
		      +"         <span class='sicon-related clickShowMembers' title='@成员'></span>"
		      +"         <span class='sicon-file25 add-comment-file' title='添加附件'>"
		      +"            <form enctype='multipart/form-data' method='post' id='f'>"
		      +"			   <input type='file'  class='files' style='display:none;'>"
		      +"			   <div class='commentHiddenUUID'><input type='hidden' id='commentuuid_"+v.id+"' class='commentuuid' value=''></div>"
		      +"		    </form>"
		      +"		 </span>"
		      +"		 <input type='button' resourceId='"+v.id+"'  value='评论' class='comment_input_submit  AddComment'>"
	          +"       </div>"
	          +"       <div class='commentFilelist'></div>"		  
	          +"     </div>"
	          +"   </div>"
              +"   <div class='conversation-comment comment_"+v.id+"'></div>"
              +"</div>";
            
	return htmlStr;
}
/**
 * 返回文件类型
 */
html.fileAttType=function(attType){
	switch(attType){
		case 'zip':  return "<div class='imgs-div files file-zip'>";
		case 'html': return "<div class='imgs-div files file-html'>";
		case 'doc':  return "<div class='imgs-div files file-doc'>";
		case 'xls':  return "<div class='imgs-div files file-xls'>";
		case 'ppt':  return "<div class='imgs-div files file-ppt'>";
		case 'pdf':  return "<div class='imgs-div files file-pdf'>";
		case 'mp3':  return "<div class='imgs-div files file-mp3'>";
		case 'txt':  return "<div class='imgs-div files file-txt'>";
		default:     return "<div class='imgs-div files file'>";
	}
}
/**
 * 组装单个评论信息
 */
html.commentOne = function(a,b){
	var userId = $("#checkedUser").attr("user-id");
	var htmlStr ="<div class='comment-list'>"
    +"<div class='members'>"
    		+html.showDefaultPhoto(b.createByPhoto,b.createByName)
    +"</div>"
	+"<div class='comment-info'>"
	+"<div class='comment-info-tags'>"
	+"<div class='comment-name'><span class='name-orange'>"+b.createByName+":</span>" 
	if(replace_metion(replace_em(b.description)).length>200){
    	htmlStr +="<span class='comment-content'>"+replace_metion(replace_em(b.description.substring(0,199)))+"......<a href='#' content='"+b.description+"' class='look-all-comment-content'>查看全部</a></span>";
	}else{
		htmlStr +="<span class='comment-content'>"+replace_metion(replace_em(b.description))+"</span>";
	}
	htmlStr += "</div>"
	+"<div class='comment-opreta'>"
	+"<span class='icon-trash cancelComment' commentid='"+b.id+"'></span>"
	+"</div>"
	+"</div>"
	+"</div>";
	htmlStr +="<div class='comment-comment-file '>";
	if(b.attachment){
		var imgHtml = "";
		var fileHtml = "";
		$.each(b.attachment,function(x,y){
			var fileLength = parseFloat(y.size);
			var showLength = fileLength/1024;
			var toLength = "";
			if(showLength>500){
				toLength = toDecimal(showLength/1024)+"M";
			}else{
				toLength = toDecimal(showLength)+"K";
			}
			var attType = y.name.substring((y.name.lastIndexOf(".")+1)).toLowerCase();
			if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
				imgHtml +="<div class='imgs-div'><img src='"+startUp.getRootPath()+y.accessPath+"' alt='"+y.name+"'></div>";
			}else{
				if(userId == y.userId){
					fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
				}else{
					fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")</a>";
				}
			}
		});
		htmlStr += "<div class='file-images'>"+imgHtml+'</div>' + "<div class='file-list sicon-file20'>"+fileHtml+"</div>";
	}
	htmlStr +="</div>"
	+"</div>"
	+"</div>";
	return htmlStr;
}

/**
 * 组装评论列表信息
 */
html.commentEach = function(index,data){
	var userId = $("#checkedUser").attr("user-id");
	var htmlStr ="";
	$.each(data,function(a,b){
		htmlStr +="<div class='comment-list'>"
		    +"<div class='members'>"
		    		+html.showDefaultPhoto(b.createByPhoto,b.createByName)
		    +"</div>"
			+"<div class='comment-info'>"
			+"<div class='comment-info-tags'>"
			+"<div class='comment-name'><span class='name-orange'>"+b.createByName+":</span>" 
				if(replace_metion(replace_em(b.description)).length>200){
			    	htmlStr +="<span class='comment-content'>"+replace_metion(replace_em(b.description.substring(0,199)))+"......<a href='#' content='"+b.description+"' class='look-all-comment-content'>查看全部</a></span>";
				}else{
					htmlStr +="<span class='comment-content'>"+replace_metion(replace_em(b.description))+"</span>";
				}
			+  "</div>"
			+"<div class='comment-time'>"+b.createDate+"</div>"
			+"<div class='comment-opreta '>";
			if(userId == b.createById){
				htmlStr +="<span class='icon-trash cancelComment' commentid='"+b.id+"'></span>";
			}
			htmlStr +="</div>"
			+"</div>"
			+"</div>";

			htmlStr +="<div class='comment-comment-file'>";
			if(b.attachment){
				var imgHtml = "";
				var fileHtml = "";
				$.each(b.attachment,function(x,y){
					var fileLength = parseFloat(y.size);
					var showLength = fileLength/1024;
					var toLength = "";
					if(showLength>500){
						toLength = toDecimal(showLength/1024)+"M";
					}else{
						toLength = toDecimal(showLength)+"K";
					}
					var attType = y.name.substring((y.name.lastIndexOf(".")+1)).toLowerCase();
					if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
						imgHtml +="<div class='imgs-div'><img src='"+startUp.getRootPath()+y.accessPath+"' alt='"+y.name+"'></div>";
					}else{
						if(userId == y.userId){
							fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
						}else{
							fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")</a>";
						}
					}
				});
				htmlStr += "<div class='file-images'>"+imgHtml+'</div>' + "<div class='file-list sicon-file20'>"+fileHtml+"</div>";
			}
			htmlStr +="</div>"
			+"</div>"
			+"</div>";
	});
	return htmlStr;
}

/**
 * 组装子任务列表
 */
html.subTaskEach=function(idx,item){
	var statusClass = item.status == "7" ? "completed" : "";
	var dueDateHtml = item.dueDate ? "<span class='glyphicon WdateFmtErr set' title='标记完成时间'>" + item.dueDate.substring(5, 10) + "</span>" : "<span class='glyphicon WdateFmtErr WdateFmtErr glyphicon-calendar' title='标记完成时间'></span>";

	var htmlStr="";
	    htmlStr +="<tr  index='" + idx + "' class='subTaskEach' id='subTask-" + item.id + "'>"
				//+"  <td  class='grid_cell_item_number drag-hander'>" + idx + "</td>"
				+"  <td class='grid_cell_string'>"
				+"    <div class='text-line'>"
				+"      <div class='mark-complete'>"
				+"        <span class='" + statusClass + " subTask-mark-complte subTaskStatusEach' id='subTaskStatus-" + item.id + "'></span>"
				+"      </div>"
				+"      <div class ='text-line-title'>"
				+"        <textarea class='subTaskTitleEach' id='subTaskTitle-" + item.id + "' rows='1' title='"+item.title+"'>" + item.title + "</textarea>"
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
 * 组装@成员列表信息
 */
html.showMentionMember=function(index,data){
	var htmlStr = "";
	$.each(data,function(k,v){
		htmlStr += "<div member-id='0' class='lists'>"
			+"<div class='members color-0'>"+v.name+"</div>"
			+"<div class='info'>"
			  +"<div class='name'>"+v.name+"</div>"
			  +"<div class='email'>"+v.email+"</div>"
			+"</div>"
			+"</div>";
	});
	return htmlStr;
}

/**
 * 右侧显示空间成员
 */
html.showSpaceMemberOnRight=function(k, v){
	var htmlStr = "";
	htmlStr+="<li class='members' status='"+v.userId+"' title='"+v.userName+"' id='"+v.userId+"' email='"+v.email+"'>";
		if(v.photo){
			htmlStr+="<img alt='"+v.userName+"' src='"+startUp.getRootPath()+v.photo+"' onerror='this.src=\""+startUp.getRootPath()+"/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"'/>";
		}else{
			htmlStr+=startUp.subStrHead(v.userName);
		}
	htmlStr+="</li>";
	return htmlStr;
}

/**
 * 显示项目附件
 */
html.showAttachmentOfProject=function(index,data){
	var str = "";
	$.each(data,function(k,v){
		var noPhoto = "<a href='javascript:void(0);' >"
	        +"<div class='imgs-icon'>"
	        +"</div>"
	       +"</a>"
	      +"<div class='file-info'>"
	        +"<div class='upload-for'>"
	          +"<div class='members owner color-1'>"+v.userName+"</div>"
	        +"</div>"
	        +"<div class='name-task'>"
	          +"<a  target='_self' href='"+startUp.getRootPath()+v.accessPath+"' class='file-name'>"+v.name+"</a>"
	          +"<a  href='javascript:void(0)' class='task-for'>"+v.createDate+"</a>"
	        +"</div>"
	      +"</div>"
	    +"</div>";
		
		var photo ="";
		if(v.accessPath){
			photo += "<a href='javascript:void(0);' >"
		        +"<img src='"+startUp.getRootPath()+v.accessPath+"'>"
		       +"</a>"
		      +"<div class='file-info'>"
		        +"<div class='upload-for'>"
		          +"<div class='members owner color-1'>"+v.userName+"</div>"
		        +"</div>"
		        +"<div class='name-task'>"
		          +"<a  target='_self' href='"+startUp.getRootPath()+v.accessPath+"' class='file-name'>"+v.name+"</a>"
		          +"<a  href='javascript:void(0)' class='task-for'>"+v.createDate+"</a>"
		        +"</div>"
		      +"</div>"
		    +"</div>";
		}else{
			photo = noPhoto;
		}
		
		var attType = v.name.substring(v.name.lastIndexOf(".")+1);
		//判断类型GIF、JPEG、BMP、TIFF、PNG
		switch(attType){
			case 'zip': str += "<div class='files file-zip'>"+noPhoto;break;
			case 'html': str += "<div class='files file-html'>"+noPhoto;break;
			case 'doc': str += "<div class='files file-doc'>"+noPhoto;break;
			case 'xls': str += "<div class='files file-xls'>"+noPhoto;break;
			case 'ppt': str += "<div class='files file-ppt'>"+noPhoto;break;
			case 'pdf': str += "<div class='files file-pdf'>"+noPhoto;break;
			case 'mp3': str += "<div class='files file-mp3'>"+noPhoto;break;
			case 'txt': str += "<div class='files file-txt'>"+noPhoto;break;
			case 'gif': str += "<div class='files'>"+photo;break;
			case 'jpeg': str += "<div class='files'>"+photo;break;
			case 'bmp': str += "<div class='files'>"+photo;break;
			case 'tiff': str += "<div class='files'>"+photo;break;
			case 'png': str += "<div class='files'>"+photo;break;
			case 'jpg': str += "<div class='files'>"+photo;break;
			default:str += "<div class='files file'>"+noPhoto;
		}
		
	});
	return str;
}


/**
 * 组装任务评论列表
 */
html.showTaskComment=function(index,data){
	var userId = $("#checkedUser").attr("user-id"); 
	var str = "";
	$.each(data,function(k,v){
		str += "<div class='comment-list'>"
			+"<div class='commentator'>"
			+"<span class='members'>"
			+html.showDefaultPhoto(v.createByPhoto,v.createByName)
			+"</span>"
			+"</div>"
			+"<div class='comment-info'>"
			+"<div class='logtags'>"
			+"<div class='comment-name'>"+v.createByName+"</div>"
			+"<div class='comment-time'>"+v.createDate+"</div>"
			+"<div class='comment-opreta'>";
			if(userId == v.createById){
				str+="<span class='icon-trash delete task-comment-to-delete' status='"+v.id+"'></span>";
			}
			str+="</div>"
			+"</div>"
			+"</div>";
			if(v.description.length>200){
				str +="<div class='comment-content'>"+replace_metion(replace_em(v.description.substring(0,199)))+"......<a href='#' content='"+v.description+"' class='look-all-comment-content'>查看全部</a></div>";
			}else{
				str +="<div class='comment-content'>"+replace_metion(replace_em(v.description))+"</div>";
			}
			str +="<div class='comment-comment-file '>";
			if(v.attachment){
				var imgHtml = "";
				var fileHtml = "";
				$.each(v.attachment,function(x,y){
					var fileLength = parseFloat(y.size);
					var showLength = fileLength/1024;
					var toLength = "";
					if(showLength>500){
						toLength = toDecimal(showLength/1024)+"M";
					}else{
						toLength = toDecimal(showLength)+"K";
					}
					var attType = y.name.substring((y.name.lastIndexOf(".")+1)).toLowerCase();
					if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
						imgHtml +="<div class='imgs-div'><img src='"+startUp.getRootPath()+y.accessPath+"' alt='"+y.name+"'></div>";
					}else{
						//fileHtml +="<a class='file-style' target='_self' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"'  >"+y.name+"<span title='删除文件' class='sicon-remove cancelFile' ></span></a>";
						if(userId == y.userId){
							fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
						}else{
							fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")</a>";
						}
					}
				});
				str += "<div class='file-images'>"+imgHtml+'</div>' + "<div class='file-list sicon-file20'>"+fileHtml+"</div>";
			}
			str +="</div>"
			+"</div>"
			+"</div>"
			+"</div>";
	});
	return str;
}

/**
 * 组装单个任务区评论
 */
html.showTaskOneComment=function(index,v){
	var userId = $("#checkedUser").attr("user-id"); 
	var str = "<div class='comment-list'>"
			+"<div class='commentator'>"
			+"<span class='members'>"
			+html.showDefaultPhoto(v.createByPhoto,v.createByName)
			+"</span>"
			+"</div>"
			+"<div class='comment-info'>"
			+"<div class='logtags'>"
			+"<div class='comment-name'>"+v.createByName+"</div>"
			+"<div class='comment-time'>"+v.createDate+"</div>"
			+"<div class='comment-opreta'>";
			if(userId == v.createById){
				str+="<span class='icon-trash delete task-comment-to-delete' status='"+v.id+"'></span>";
			}
			str+="</div>"
			+"</div>"
			+"</div>";
			if(v.description.length>200){
				str +="<div class='comment-content'>"+replace_metion(replace_em(v.description.substring(0,199)))+"......<a href='#' content='"+v.description+"' class='look-all-comment-content'>查看全部</a></div>";
			}else{
				str +="<div class='comment-content'>"+replace_metion(replace_em(v.description))+"</div>";
			}
			str +="<div class='comment-comment-file '>";
			if(v.attachment){
				var imgHtml = "";
				var fileHtml = "";
				$.each(v.attachment,function(x,y){
					var fileLength = parseFloat(y.size);
					var showLength = fileLength/1024;
					var toLength = "";
					if(showLength>500){
						toLength = toDecimal(showLength/1024)+"M";
					}else{
						toLength = toDecimal(showLength)+"K";
					}
					var attType = y.name.substring((y.name.lastIndexOf(".")+1)).toLowerCase();
					if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
						imgHtml +="<div class='imgs-div'><img src='"+startUp.getRootPath()+y.accessPath+"' alt='"+y.name+"'></div>";
					}else{
						//fileHtml +="<a class='file-style' target='_self' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"'>"+y.name+"<span title='删除文件' class='sicon-remove cancelFile' ></span></a>";
						if(userId == y.userId){
							fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
						}else{
							fileHtml +=  "<a target='_self' class='file-style' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")</a>";
						}
					}
				});
				str += "<div class='file-images'>"+imgHtml+'</div>' + "<div class='file-list sicon-file20'>"+fileHtml+"</div>";
			}
			str +="</div>"
			+"</div>"
			+"</div>"
			+"</div>";
	return str;
}


/**
 * 任务记录
 * @param obj
 */
function showTaskDynamic(obj){
	if(obj.map){
		var json = obj.map;
		var str = "<li>"
					+"<div class='time-line'>"
						+"<span class='time'>"+getDateDiff(obj.createDate)+"</span>"
						+"<span class='circle1'><span class='sub-circle'></span></span>"
						+"<span class='log-content'>"+json.userName+" "+replace_metion(replace_em(json.content))+"</span>"
					+"</div>"
				+"</li>";
		return str;
	}else{
		return "";
	}
}

/**
 * 任务动态尾部
 * @returns
 */
function showTaskDynamicEnd(){
	var str =   "<li>"
					+"<div class='time-line end'>"
						+"<span class='circle'></span>"
					+"</div>"
				+"</li>";
	return str;
}

/**
 * 动态列表主题
 * @param obj
 * @returns {String}
 */
function showDynamicInHtml(obj){
	if(obj.map){
		var json = obj.map;
		var str = "";
		var objType=obj.type=='1'?'type-task':'type-conversation';
		if(obj.createById!=obj.aboutUserId){
			 str +=		"<li class='"+objType+"'>"
				+"<div class='time-line'>"
					+"<span class='time'>"+getDateDiff(obj.createDate)+"</span>"
					+"<span class='circle'><span class='sub-circle'></span></span>";
					if(obj.type=='1'){
						str += "<span class='log-task-title dynamic_show_id ' status='"+obj.taskId+"'>"+json.userName +" "+json.content+"</span>";
					}else{
						str += "<span class='log-task-title dynamic_show_id' resourceId='"+obj.taskId+"'>"+json.userName +" "+replace_metion(replace_em(json.content))+"</span>";
					}
				str +="</div>";
			+"</li>";
		}
		return str;
	}else{
		return "";
	}
}



/**
 *	动态头部
 * @returns {String}
 */
function showDynamicTheStart(){
	var str = 	"<li>"
					+"<div class='time-line begin'>"
					+"<span class='circle'></span>"
					+"</div>"
				+"</li>";
	return str;
}

/**
 *	动态尾部
 * @returns {String}
 */
function showDynamicTheLast(){
	var str = 	"<li>"
					+"<div class='time-line more' id='dynamic_show_more'>"
					+"<span class='circle ellipse'>更多》</span>"
					+"</div>"
				+"</li>";
	return str;
}

/**
 * 显示年段
 * @param year
 * @returns {String}
 */
function yearShow(year){
	return "<li><div class='time-line'><span class='circle ellipse'>"+year+"</span></div></li>";
}

/**
 * 任务附件显示样式
 */
html.showOneTaskAttachment=function(index,data){
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

/*
 *组装操作提示
 */

html.alert_info=function(index,data){
	var str='';
	
	str="<div id='alert_info'>"+
	   "<span class='icon-remove' title='关闭'></span>"+
	   "<div class='content'></div>"+
	"</div>";
	
	return str;
}

/**
 * 显示任务(关注)成员
 */
html.showMemberOfTaskInDetail=function(index,data){
	var userId = $("#checkedUser").attr("user-id"); 
	var htmlStr = "";
	$.each(data,function(k,v){
		htmlStr += "<div class='rows'>";
		htmlStr += "	<div class='col-md-1 '></div>";
		htmlStr += "	<div class='col-md-2 center'>" + v.name + "</div>";
		htmlStr += "	<div class='col-md-5'>" + v.email + "</div>";
		htmlStr += "	<div class='col-md-3'>";
		if(userId==v.id){
			htmlStr += "<span class='sicon-memberRemove' title='取消关注'></span>";
		}
		htmlStr += "	</div>";
		htmlStr += "</div>";
	});
	return htmlStr;
}
/**
 * 右侧显示空间下所有的组
 */
html.showSpaceGroup=function(data,userId){
	var htmlStr1 = "";
	var htmlStr2 = "";
	var htmlStr3 = "";
	$.each(data.data,function(k,v){
		if(v.type=='0'){
			htmlStr1+="<li class='member-groups'>";
			htmlStr1+="<span class='member-groups-title' id='myfriendsgroup' groupId='"+v.id+"'>";
				htmlStr1+="<span class='left-triangle' gid='"+v.id+"' title='点击展开'></span>";
				htmlStr1+="<span class='groups-name drag-hander'>"+v.title+"</span>&nbsp;&nbsp;";
				if(v.users){
					htmlStr1+="<span class='groups-number'>("+(v.users.length)+")</span>";
				}else{
					htmlStr1+="<span class='groups-number'>(0)</span>";
				}
			htmlStr1+="</span>";
			htmlStr1+="<ul id='members_"+v.id+"'>";
				if(v.users){
					htmlStr1+=html.showMemberList(v,userId);
				}
			htmlStr1+="</ul>";
			htmlStr1+="</li>";
		}else if(v.type=='1'){
			htmlStr2+="<li class='member-groups'>";
			htmlStr2+="<span class='member-groups-title' groupId='"+v.id+"'>";
				htmlStr2+="<span class='left-triangle' gid='"+v.id+"' title='点击展开'></span>";
				htmlStr2+="<span class='groups-name drag-hander'>"+v.title+"</span>&nbsp;&nbsp;";
				if(v.users){
					htmlStr2+="<span class='groups-number'>("+(v.users.length)+")</span>";
				}else{
					htmlStr2+="<span class='groups-number'>(0)</span>";
				}
			htmlStr2+="<span class='icon-trash deleteMyGroup' title='删除分组' groupId='"+v.id+"'></span>";
			htmlStr2+="</span>";
			htmlStr2+="<ul id='members_"+v.id+"'>";
				if(v.users){
					htmlStr2+=html.showMemberList(v,userId);
				}
			htmlStr2+="</ul>";
			htmlStr2+="</li>";
		}else if(v.type=='2'){
			htmlStr3+="<li class='member-groups'>";
			htmlStr3+="<span class='member-groups-title' groupId='"+v.id+"'>";
				htmlStr3+="<span class='left-triangle' gid='"+v.id+"' title='点击展开'></span>";
				htmlStr3+="<span class='groups-name drag-hander'>"+v.title+"</span>&nbsp;&nbsp;";
				if(v.users){
					htmlStr3+="<span class='groups-number'>("+(v.users.length)+")</span>";
				}else{
					htmlStr3+="<span class='groups-number'>(0)</span>";
				}
			htmlStr3+="</span>";
			htmlStr3+="<ul id='members_"+v.id+"'>";
				if(v.users){
					htmlStr3+=html.showMemberList(v,userId);
				}
			htmlStr3+="</ul>";
			htmlStr3+="</li>";
		}
	});
	return htmlStr1+htmlStr2+htmlStr3;
}

/**
 * 显示组下面所有的成员列表
 */
html.showMemberList=function(data,userId){
	var htmlStrMine = "";
	var htmlStrAll = "";
	$.each(data.users,function(k,v){
		if(userId==v.id){
			htmlStrMine+="<li class='member'>";
			htmlStrMine+="<span class='members' id='"+v.id+"' email='"+v.email+"' title='"+v.name+"'>";
			if(v.photo){
				htmlStrMine+=html.showDefaultPhoto(v.photo,v.name);
			}else{
				htmlStrMine+=startUp.subStrHead(v.name);
			}
			htmlStrMine+="</span>";
			htmlStrMine+="<span>";
			htmlStrMine+="</span>"+v.name;
		}else{
			htmlStrAll+="<li class='member'>";
			htmlStrAll+="<span class='members' id='"+v.id+"' email='"+v.email+"' title='"+v.name+"'>";
			if(v.photo){
				htmlStrAll+=html.showDefaultPhoto(v.photo,v.name);
			}else{
				htmlStrAll+=startUp.subStrHead(v.name);
			}
			htmlStrAll+="</span>";
			htmlStrAll+="<span>";
			htmlStrAll+="</span>"+v.name;
			if(userId!=v.id && data.type!='2'){
				htmlStrAll+="<span groupId='"+data.id+"' userId='"+v.id+"' class='icon-trash deleteGroupMember pull-right'></span></li>";
			}
		}
	});
	return htmlStrMine+htmlStrAll;
}

/**
 * 搜索好友成員列表
 */
html.showSearchMemberList=function(data,userId){
	var htmlStr = "";
	$.each(data,function(k,v){
		if(userId!=v.userId){
			htmlStr+="<li class='member seek'>";
			htmlStr+="<span class='members seek' id='"+v.userId+"' email='"+v.email+"' title='"+v.userName+"'>";
			if(v.photo){
				htmlStr+=html.showDefaultPhoto(v.photo,v.userName);
			}else{
				htmlStr+=startUp.subStrHead(v.userName);
			}
			htmlStr+="</span>";
			htmlStr+="<span>";
			htmlStr+="</span>"+v.userName;
		htmlStr+="<span groupId='"+v.id+"' userId='"+v.userId+"' class='icon-trash deleteGroupMember pull-right seek'></span></li>";
		}
	});
	return htmlStr;
}

/*
 *组装任务责任人
 */
html.taskResponsible=function(logo,name){
	
	var htmlStr = "";
	var currentDate=new Date();
    currentDate=((currentDate.getMonth()+1)<10?'0'+(currentDate.getMonth()+1):currentDate.getMonth()+1)+'-'+currentDate.getDate()+' '+currentDate.getHours()+":"+currentDate.getMinutes();
	htmlStr ="<li class='last-child'>"+
	         "   <div class='members'>"+
                    logo+
             " </div>"+
		    "   <div class='log-info'>"+
		    "      <span class='name'>"+name+"</span>"+
		    "      <span class='responsible-time'>"+currentDate+"</span>"
		    "   </div>"
		    "</li>"
	return htmlStr;
}

/**
 * 处理头像显示
 */
html.showDefaultPhoto = function(photo,name){
	var htmlStr = "";
	if(photo){
		htmlStr += "<img class='portrait' title='" + name + "' src='" + startUp.getRootPath() + photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"'>";
	}else{
		htmlStr += "<img class='portrait' title='" + name + "' src='"+startUp.getRootPath()+"/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"'>";
	}
	return htmlStr;
}


/**
 * 子任务指派
 */

html.showOwnerForSubTask=function(){
	var str="";
	str+=    "<div class='sub-tast-appoint'>"
			+"   <div class='icon-remove'></div>"
			+"   <div class='tit'>分配：</div>"
			+"   <div class='col-md-8'>"
			+"      <input type='text' autocomplete='off' class=' form-control' changeowner='forSubTask'  >"
			+"   </div>"
			+"   <div class='col-md-4'>"
			+"        <input type='button' value='确定'  class='appoint-self btn btn-primary' id=changeOwnerForSubTaskBtn'>"
			+"   </div>"
			+"   <div class='col-md-12 info'></div>"
			+"</div>";
	return str;
}

/**
 * 组装任务成员详细信息
 */

html.showMemberDetails=function(logo,name,email){
	var str="";
	str= " <div class='member-details'>"
		+logo
		+"	 <div class='members-info'>"	
		+"	       <div class='name'>"+name+"</div>"	
		+"		   <div class='email'>"+email+"</div>"
		+"	 </div>"
		+"   <div class='members-data'><span class='project-data'>共同参与的项目    <span class='project-number'>3</span> </span><span class='task-data'>任务   <span class='task-number'>3/5</span></span></div>"
		+"</div>"
	return str;
}


/**
 *
 *组装确认对话框
 **/
html.showConfirmDiv=function(title){
	var str="";
	str="		<div class='delete-bg-shade'></div>"
		+"		<div class='delete-bg'>"
		+"		   <div class='confirm-info'>"+title+"</div>"
		+"		   <div class='confirm-btn'>"
		+"		      <span class='confirm-no'>取消</span>"
		+"		      <span class='confirm-yes'>确定</span>"
		+"		   </div>"
		+"		</div>"
	return str;
}

/**
*
*组装提示对话框
**/
html.showAlertDiv=function(title){
	var str="";
	str="		<div class='alert-bg-shade'></div>"
		+"		<div class='alert-bg'>"
		+"		   <div class='alert-info'>"+title+"</div>"
		+"		   <div class='alert-btn'>"
		+"		      <span class='alert-yes'>确定</span>"
		+"		   </div>"
		+"		</div>"
	return str;
}
/**
*
*组装图片显示对话框
**/
html.showImageLargeDiv=function(){
	var str="";
	str="<div class='imgEnlargeNav'>"
	    +   "<div class='imgshowDiv'>"
	    +      "<span class='icon-remove'></span>"
	    +   "</div>"
	    +"</div>"
	return str;
}


/**
 * 
 * 组装添加分组结构
 */
html.AddGroupsDiv=function(){
	var str="";
	str= "<li class='member-groups add-groups-li'>"
		+"  <span  class='member-groups-title'>"
		+"    <span title='取消添加分组'  class='icon-remove'></span>"
		+"    <span class='groups-name'><input id='add-groups-input' type='text' ></span>"
		+"    <span class='add-letter-btn' id='add-new-friend-group'>添加</span>"
		+"  </span>"
		+"  <ul>"   
		+"  </ul>"
		+"</li>"
	return str;
}

/**
 *组装指引结构
 */

html.GuideDiv=function(){
	var str="";
	str= "<div class='guide-operat'>"
		+"    <div class='cover-layer'>"
		+"        <span class='add-project'>+</span>"
		+"        <span class='sicon-buildSpace'>新建空间</span>"
		+"        <div class='add-task-nav'>"
		+"            <input id='taskTitleInput'  type='text' placeholder='提交新任务，直接@任务责任人，Enter快速提交' readOnly='readonly'>"
		+"        </div>"
		+"        <div class='sicon-addMembers'></div>"
		+"        <div class='layer-panles-switcs'></div>"
		+"    </div>"
		+"    <div class='guide-arrows'></div>"
		+"    <div class='guide-content'>"
		+"        <div class='guide-title'></div>"
		+"        <div class='next-step'></div>"
		+"    </div>"
		+"</div>"
	return str;
}

/**
 * 组装收藏列表
 */
html.bookmarkList = function(idx, item){
	var id =item.id, //收藏ID
		title =item.title?item.title:"", //收藏标题
		resourceId =item.resourceId, //收藏类型ID
		createDate = item.createDate?startUp.getFomatDate2(item.createDate):"", //收藏时间
		taskTatol = item.taskTatol,  //获取任务总数
		undoneTaskCount = item.undoneTaskCount, //任务未完成数
		memberCount = item.memberCount, //成员数
		description =item.description,
		type = item.type; //收藏类型
	var htmlStr = "";
	switch (type) {
		case "0":
			htmlStr += "<li class='projectEach' id='project-" + resourceId + "' bookmark-id='"+id+"' panels-target='.task-nav' index='"+idx+"'>";
			htmlStr += "<div  class='logo projectLogo ' title='"+title+"'  ></div>";
			htmlStr += "<span class='project-title' title='"+title+"'>" + title + "</span>";
			htmlStr += "<span class='project-data' ><span class='sicon-spaceMemberGray20' title='项目成员数'>" + memberCount + "</span><span class='sicon-spaceTaskGray20' title='项目任务数(已完成/全部任务)'>" + undoneTaskCount+"/"+taskTatol + "</span></span>";
			break;
		case "3":
			htmlStr += "<li class='conversationEach' id='conversation-" + resourceId + "' bookmark-id='"+id+"' panels-target='.favoriteConversation' index='"+idx+"'>";
			htmlStr += "<div  class='logo conversationLogo ' title='"+title+"'  ></div>";
			htmlStr += "<span class='project-title conversation' title='"+title+"'>" + title + "</span>";
			htmlStr += "<span class='project-data conversation' ><span class='build-who' title='话题创建者'>"+description+"</span><span class='build-data' title='创建时间'>" +createDate+ "</span></span>";
			break;
		case "4":
			var img ="<img class='members logo' title='"+title+"' src='"+startUp.getRootPath()+description+"' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_30.png?tsf=" +varsion+"\"'>";
			htmlStr += "<li class='spaceMemberEach' id='spaceMember-" + resourceId + "' bookmark-id='"+id+"' panels-target='.task-nav' index='"+idx+"' hide-addTaskNav='true'>";
			htmlStr += "<div>"+img+"</div>";
			htmlStr += "<span class='project-title' title='"+title+"'>" + title + "</span>";
			htmlStr += "<span class='project-data' ><span class='sicon-spaceTaskGray20' title='成员任务数(已完成/全部任务)'>" + undoneTaskCount+"/"+taskTatol + "</span></span>";
			break;
		case "5":
			htmlStr += "<li class='tagsInMenuEach' id='tagsInMenu-" + resourceId + "' bookmark-id='"+id+"' panels-target='.task-nav' index='"+idx+"'  hide-addTaskNav='true'>";
			htmlStr += "<div  class='logo tabsLogo' title='"+title+"'  ></div>";
			htmlStr += "<span class='project-title' title='"+title+"'>" + title + "</span>";
			htmlStr += "<span class='project-data' ><span class='sicon-spaceTaskGray20' title='标签任务数(已完成/全部任务)'>" + undoneTaskCount+"/"+taskTatol + "</span></span>";
			break;
	}
	htmlStr += "<span class='sicon-star favoriteProjectEach' id='favoriteProject-" + resourceId + "' title='取消收藏'></span>";
	htmlStr += "</li>";
	return htmlStr;
}

/**
*组装操作指引渐变园按钮
*/
html.spinnerNav=function(){
	var str="";
	str="<div id='guide-spinner' class='spinner-nav'>"+
		"	<div class='spinner'></div>"+
		"	<div class='circle'></div>"+
		"</div>";
	return str;
}

/**
 * 组装邀请成员列表
 */
html.inviteMeber=function(name,emial,id){
  var str='';
    str = "<div class='invite-member' member-id='"+id+"' >"
         +"   <div class='member-info'>"
         +"    <span class='name'>"+name+"</span>"
         +"    <span class='email'>"+emial+"</span>"
         +"    <span class='delete'>X</span>"
         +"  </div>"
         +"</div>";
   return str;
}


/**
 * 组装意见反馈信息列表
 */
html.feedbackListShow = function(index,data,thisUserInfo){
	var feedbackId = data.id;
	var feedbackUserName = data.userName;
	var feedbackUserPhoto = data.userPhoto;
	var feedbackTime = data.createDate;
	var feedbackContent = data.description;
	
	var thisUserName = thisUserInfo.name;
	var thisUserPhoto = thisUserInfo.photo;
	var thisImgs="";
	if(data.attachments){
		$.each(data.attachments,function(x,y){
			thisImgs += "<div class='imgs-div'><img src='"+startUp.getRootPath() + y.accessPath+"' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"'></div>";
		});
	}
	var str = "";
		str+="<div class='support-list-item'>"
		    +"<div class='support-content'>"
		    +" <div class='supportor-info'>"
		    +	html.showDefaultPhoto(feedbackUserPhoto,feedbackUserName)
		    +"    <div class='supportor-name-data'>"
		    +"      <span class='supportor-name'>"+feedbackUserName+"</span>"
		    +"      <span class='supportor-data'>"+feedbackTime+"</span>"
		    +"    </div>"
		    +"  </div>"
		    +"  <div class='support-content-text'>"+feedbackContent+"</div>"
		    +"  <div class='support-attachment'>"
		    +"     <div class='file-images'>"+thisImgs+"</div>"
            +"  </div>"
		    +"</div>"
		    +"<div class='support-remark'>"
		    +"  <div class='remark-nav'>"
		    +    html.showDefaultPhoto(thisUserPhoto,thisUserName)
		    +"    <div class='remark-input-nav'>"
		    +"      <textarea placeholder='回复内容' id='comment-content-"+feedbackId+"'></textarea>"
		    +"      <div class='remark-submit-nav'>"
		    +"        <div class='add-imagefile feedback-comment-file' feedbackId='"+feedbackId+"'></div>"
		    +"        <button feedbackId='"+feedbackId+"' class='orangeSubmitBtn'>提交</button>"
		    +"      </div>"
		    +"      <div class='add-file-nav' id='feedback-files-"+feedbackId+"'></div>"
		    +"    </div>"
		    +"    <div class='remark-list-section' id='feedback-comment_"+feedbackId+"'>";
		    	if(data.comments){
		    		$.each(data.comments,function(k,v){
		    				str += html.feedbackCommentListShow(null,v);
		    			});
		    	}
		    str+="    </div>"
		    +"  </div>"
		    +"</div>"
		    +"</div>";
  return str;
}

/**
 * 组装意见反馈信息的回复列表
 */
html.feedbackCommentListShow = function(index,data){
	//var feedbackCommentId = data.id;
	var feedbackCommentUserName = data.userName;
	var feedbackCommentUserPhoto = data.userPhoto;
	var feedbackCommentTime = data.createDate;
	var feedbackCommentContent = data.description;
	var thisImgs="";
	if(data.attachments){
		$.each(data.attachments,function(x,y){
			thisImgs += "<div class='imgs-div'><img src='"+startUp.getRootPath() + y.accessPath+"' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"'></div>";
		});
	}
	var str = "";
		str +="      <div class='remark-lists'>"
		    + 		html.showDefaultPhoto(feedbackCommentUserPhoto,feedbackCommentUserName)
		    +"        <div class='remark-lists-info'>"
		    +"          <div class='remark-lists-contant'>"
		    +"            <span class='remark-name'>"+feedbackCommentUserName+"</span>"
		    +"            <span class='remark-content'>"+feedbackCommentContent+"</span>"
		    +"  <div class='support-attachment'>"
		    +"     <div class='file-images'>"+thisImgs+"</div>"
            +"  </div>"
		    +"          </div>"
		    +"        </div>"
		    +"        <span class='supportor-data'>"+feedbackCommentTime+"</span>"
		    +"    </div>";
  return str;
}
/**
 * 组装意见反馈信息的回复列表
 */
html.operatResultAlert=function(content,result){
	var str='';
	str =  "<div class='operat-result-alert " +(result?'failure':'')+ "'>"+
			"	<span class='icon-result-alert'></span>  "+
			"	<span class='operat-result-content'>"+content+"</span>"+
			"	<span class='close-operat-alert'></span>"+
			"</div>"
			
	return str;
}


/**
 * 组装空间成员管理列表
 */
html.spaceMemberListMenu = function(idx, item){
	var memberValue = "";
	var createById = $("#checkedSpace").attr("createById");
	var ownerId = $("#checkedSpace").attr("ownerId");
	if(item.id && item.id == createById){
		if(item.id && item.id == ownerId){
			memberValue = "创建者,负责人";
		}else{
			memberValue = "创建者";
		}
	}else{
		if(item.id && item.id == ownerId){
			memberValue = "负责人";
		}else{
			memberValue = "成员";
		}
	}
	var nowUserId = $("#checkedUser").attr("user-id");
	var nowUserName = item.name;
	if(item.id && item.id == nowUserId){
		nowUserName += "(我)";
	}
	var userPhotoHtml = ""
	if(item.photo){
		userPhotoHtml += "	<img class='members' title='" + item.name + "' src='" + startUp.getRootPath() + item.photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_30.png?tsf=" +varsion+"\"'>";
	}else{
		userPhotoHtml += "	<span class='members' title='" + item.name + "'>" + item.name.split("").reverse().join("").substring(0, 1) + "</span>";
	}
	var htmlStr = "";
	htmlStr += "<div class='row' id='spaceMember-" + item.id + "'>";
	htmlStr += "   <div class='col-md-4'>";
	htmlStr += 		  userPhotoHtml;
	htmlStr += "	  <span>" + nowUserName + "</span>";
	htmlStr += "   </div>";
	htmlStr += "	<span class='col-md-5'>" + item.email + "</span>";
	htmlStr += "	<span class='col-md-3'>" + memberValue + "</span>";
	htmlStr += "</div>";
	return htmlStr;
}


