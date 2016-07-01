
var teamView = {};


/**
 * 显示我的团队板块的信息组装
 */
teamView.showMyTeamInfo = function(k,v){
	var userId = $("#checkedUser").attr("user-id");
	var resUserId = "";
	if(v.user){
		resUserId = v.user.id;
	}
	var htmlStr = "";
		htmlStr += "	<li>";
		htmlStr += "		<div class='team-info'>";
		htmlStr += "			<span class='team-name' title='"+v.name+"'>"+v.name+"</span>";//startUp.subStr(v.name,30)
		
		htmlStr += "			<div class='dropdown'>";
		htmlStr += "				<span class='sicon-dropdown' data-toggle='dropdown'></span>";
		htmlStr += "				<ul class='dropdown-menu'>";
		htmlStr += "				<li class='team-create-project-button' teamId='"+v.id+"' data-toggle='modal' data-target='#create-team-project-modal'  href='"+startUp.getRootPath()+"/static/modules/surfond/modal/create_team_project.html'>发起项目</li>";
			if(userId==resUserId){
				htmlStr += "					<li class='update-team-button' teamId='"+v.id+"' data-toggle='modal' data-target='#space-team-edit-modal'  href='"+startUp.getRootPath()+"/static/modules/surfond/modal/edit_space_team.jsp'>编辑</li><li class='delete-team-button' teamId='"+v.id+"'>删除</li>";
			}
		htmlStr += "				</ul>";
		htmlStr += "			</div>";
		
		htmlStr += "			<div class='team-date'><span>成员 · "+v.userCount+" </span><span>  项目 · "+v.projectCount+" </span>  <span>话题 · "+v.conversationCount+"</span></div>";
		htmlStr += "		</div>";
		htmlStr += "		<div class='team-members' id='show-this-team-member-"+v.id+"'>";
				if(v.users){
					$.each(v.users,function(x,y){
						htmlStr += "<span title='"+y.name+"'>"+organizeView.showDefaultPhoto(y.photo,y.name)+"</span>";
					});
				}
				if(userId==resUserId){
					htmlStr += "			<span class='sicon-addTeamMember show-sapce-member-to-team-modal' teamid='"+v.id+"' title='成员管理'></span>";
				}
		htmlStr += "		</div>";
		htmlStr += "	</li>";
		
	return htmlStr;
}

/**
 * 显示团队成员
 */
teamView.showMyTeamMembersList = function(x,y){
	var htmlStr ="";
		htmlStr += "<span title='"+y.name+"'>"+organizeView.showDefaultPhoto(y.photo,y.name)+"</span>";
	return htmlStr;
}


/**
 * 显示空间成员来预选团队成员
 */
teamView.showSpaceMemberToTeam = function(k,v){
	var userCount = 0;
	if(v.users){
		userCount = v.users.length;
	}
	var htmlStr = "";
	
		htmlStr += "<li class='member-group' user-id='member_"+v.id+"'>" ;
		htmlStr += "	<span class='group-info'>" ;
		htmlStr += "		<label class='sicon-checkbox' for='input_"+v.id+"'>" ;
		htmlStr += "			<input id='input_"+v.id+"' type='checkbox'>" ;
		htmlStr += "		</label>" ;
		htmlStr += "		<span class='triangle-left'></span>" ;
		htmlStr += "		<span class='group-title' organizeId='"+v.id+"'>"+v.name+"</span>" ;
		htmlStr += "		<span class='member-number'>"+userCount+"</span>" ;
		htmlStr += "	</span>" ;
		htmlStr += "	<ul class='group-members'>" ;
		if(v.users){
			$.each(v.users,function(x,y){
				htmlStr += "		<li title='"+y.name+"' user-id='member_"+y.id+"' thisuserid='"+y.id+"'>" ;
				htmlStr += "			<label class='sicon-checkbox' for='input_"+y.id+"'>" ;
				htmlStr += "				<input id='input_"+y.id+"' type='checkbox'>" ;
				htmlStr += "			</label>" ;
				htmlStr += "			<span class='member-portrait'>" ;
				htmlStr += 					organizeView.showDefaultPhoto(y.photo,y.name) ;
				htmlStr += "			</span>" ;
				htmlStr += "			<span class='member-name'>"+y.name+"</span>" ;
				htmlStr += "		</li>" ;
			});
		}
		htmlStr += "	</ul>" ;
		htmlStr += "</li>" ;
			
	return htmlStr;
}

/**
 * 显示空间成员来预选团队成员
 */
teamView.showSpaceMemberToTeamResponsible = function(k,v){
	var userCount = 0;
	if(v.users){
		userCount = v.users.length;
	}
	var htmlStr = "";
	
		htmlStr += "<li class='member-group' user-id='member_"+v.id+"'>" ;
		htmlStr += "	<span class='group-info'>" ;
		//htmlStr += "		<label class='sicon-checkbox' for='input_"+v.id+"'>" ;
		//htmlStr += "			<input id='input_"+v.id+"' type='checkbox'>" ;
		//htmlStr += "		</label>" ;
		htmlStr += "		<span class='triangle-left'></span>" ;
		htmlStr += "		<span class='group-title' organizeId='"+v.id+"'>"+v.name+"</span>" ;
		htmlStr += "		<span class='member-number'>"+userCount+"</span>" ;
		htmlStr += "	</span>" ;
		htmlStr += "	<ul class='group-members'>" ;
		if(v.users){
			$.each(v.users,function(x,y){
				htmlStr += "		<li title='"+y.name+"' user-id='member_"+y.id+"' thisuserid='"+y.id+"'>" ;
				htmlStr += "			<label class='sicon-checkbox' for='input_"+y.id+"'>" ;
				htmlStr += "				<input id='input_"+y.id+"' type='checkbox'>" ;
				htmlStr += "			</label>" ;
				htmlStr += "			<span class='member-portrait'>" ;
				htmlStr += 					organizeView.showDefaultPhoto(y.photo,y.name) ;
				htmlStr += "			</span>" ;
				htmlStr += "			<span class='member-name'>"+y.name+"</span>" ;
				htmlStr += "		</li>" ;
			});
		}
		htmlStr += "	</ul>" ;
		htmlStr += "</li>" ;
			
	return htmlStr;
}


/**
 * 回显已选中的成员
 */
teamView.showSelectTeamMembers = function(k,v){
	var htmlStr = "";
		htmlStr += "<li title='"+v.name+"' user-id='member_"+v.id+"' thisuserid='"+v.id+"'>";
		htmlStr += "</li>";
	return htmlStr;
}

/**
 * 模态框组装单个成员信息
 */
teamView.showorganizeModalMember = function(k,v){
	var htmlStr  = "";
		htmlStr += "<div class='row' id='organizeMember-"+v.id+"'>";   
		htmlStr += "	<div class='col-md-4'>";	
		htmlStr += "		<span class='members member-portrait' title='"+v.name+"'>";
		htmlStr += 				organizeView.showDefaultPhoto(v.photo,v.name);
		htmlStr += "		</span>";	  
		htmlStr += "		<span>"+v.name+"</span>";   
		htmlStr += "	</div>";	
		htmlStr += "	<span class='col-md-7'>"+v.email+"</span>";	
		htmlStr += "</div>";
	return htmlStr;
}

