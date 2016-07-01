var projectView = {};

/**
 * 组装团队列表
 */
projectView.teamEach = function(idx, item){
	var userId = $("#checkedUser").attr("user-id");
	var resUserId = "";
	if(item.user){
		resUserId = item.user.id;
	}
	var htmlStr = "";
	htmlStr += "<li class='team-project'>";
	htmlStr += "	<span class='group-info'>";
	htmlStr += "		<span class='triangle-left size6'></span>";
	htmlStr += "		<span class='group-title'>" + item.name + "</span>";
	htmlStr += "	</span>";
	htmlStr += "	<div class='team-project-list'>";
	htmlStr += "		<div class='team-members' id='show-this-team-member-"+item.id+"'>";
	if(item.users){
		$.each(item.users,function(x,y){
			htmlStr += "<span title='"+y.name+"'>"+jointView.showDefaultPhoto(y.photo,y.name)+"</span>";
		});
	}
	if(userId==resUserId){
		htmlStr += "			<span class='sicon-addTeamMember show-sapce-member-to-team-modal' teamid='"+item.id+"' title='成员管理'></span>";
	}
	htmlStr += "		</div>";
	htmlStr += "		<ul>";
	if(item.projectTasks){
		$.each(item.projectTasks, function(k, v){
			htmlStr += jointView.projectEach(k, v);
		});
	}
	htmlStr += "		</ul>";
	htmlStr += "	</div>";
	htmlStr += "</li>";
	return htmlStr;
}

/**
 * 组装邀请成员输入框
 */
projectView.manageMembersInput = function(){
	var htmlStr = "";
		htmlStr += "<div class='col-sm-12'>";
		htmlStr += "		<div class='invite-members-list'>";
		htmlStr += "			<input id='inviteProjectMember' type='text' name='userEmails' class='invivte-member' placeholder='输入好友名称快速查找'>";
		htmlStr += "			<div class='cursor-text'></div>";
		htmlStr += "		</div>";
		htmlStr += "</div>";
	return htmlStr;
}

/**
 * 组装项目成员列表
 */
projectView.projectMemberEach = function(idx, item){
	var memberValue = "";
	var createById = $("#projectCreateById").val();
	var ownerId = $("#projectOwnerId").val();
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
	htmlStr += "   <div class='col-md-3 content-overflow' title='"+nowUserName+"'>";
	htmlStr += 		  userPhotoHtml;;
	htmlStr += "	  <span>" + nowUserName + "</span>";
	htmlStr += "   </div>";
	htmlStr += "	<span class='col-md-4 content-overflow' title='"+item.email+"'>" + item.email + "</span>";
	htmlStr += "	<span class='col-md-2 content-overflow' title='"+memberValue+"'>" + memberValue + "</span>";
	htmlStr += "	<span class='col-md-2 content-overflow delete-project-member-option-select' title='删除成员' user-id='"+item.id+"'>删除成员</span>";
	htmlStr += "</div>";
	return htmlStr;
}

/**
 * 显示项目附件
 */
projectView.showProjectAttachmentList = function(k,v){
	var str = "";
	var noPhoto  = "<a href='javascript:void(0);' >";
		noPhoto += "	<div class='imgs-icon'></div>";
		noPhoto += "</a>";
		noPhoto += "<div class='file-info'>";
		noPhoto += "	<div class='upload-for'>";
		noPhoto += "		<div class='members owner color-1'>"+v.userName+"</div>";
		noPhoto += "	</div>";
		noPhoto += "	<div class='name-task'>";
		noPhoto += "		<a  target='_self' href='"+startUp.getRootPath()+v.accessPath+"' class='file-name'>"+v.name+"</a>";
		noPhoto += "		<a  href='javascript:void(0)' class='task-for'>"+v.createDate+"</a>";
		noPhoto += "	</div>";
		noPhoto += "</div>";
		noPhoto += "</div>";

	var photo ="";
	if(v.accessPath){
		photo += "<a href='javascript:void(0);' >";
		photo += "	<img src='"+startUp.getRootPath()+v.accessPath+"'>";
		photo += "</a>";
		photo += "<div class='file-info'>";
		photo += "	<div class='upload-for'>";
		photo += "		<div class='members owner color-1'>"+v.userName+"</div>";
		photo += "	</div>";
		photo += "	<div class='name-task'>";
		photo += "		<a  target='_self' href='"+startUp.getRootPath()+v.accessPath+"' class='file-name'>"+v.name+"</a>";
		photo += "		<a  href='javascript:void(0)' class='task-for'>"+v.createDate+"</a>";
		photo += "	</div>";
		photo += "</div>";
		photo += "</div>";
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
	
	return str;
}

