
var workpaceView = {};


/**
 * 组装单个空间组织分组架构
 */
workpaceView.showSapceOrganizeMembers = function(k,v){
	var organizeName = v.name;
	if (!organizeName) {
		organizeName = "";
	}
	var usersCount = "0";
	if (v.memberCount) {
		usersCount = v.memberCount;
	}
	if (!usersCount) {
		usersCount = "0";
	}
	
	var	htmlStr    =  	"<li class='member-group show-this-organize-member' organize-id='"+v.id+"'>";
		htmlStr   +=  	"<span class='group-info'>";
		htmlStr   +=  	"	<span class='triangle-left'></span>";
		htmlStr   +=  	"		<span class='group-title' title='"+organizeName+"'>"+organizeName+"</span>";//startUp.subStr(organizeName,30)
		htmlStr   +=  	"		<span class='member-number member-count'> ("+usersCount+")</span>";                	   	
		htmlStr   +=  	"	</span>";
		htmlStr   +=  	"	<ul class='group-members this-organize-member'>";		  
		htmlStr   +=  	"	</ul>";
		htmlStr   +=  	"</li>";
	
	return htmlStr;
};


/**
 * 组装组织架构下面的成员信息
 */
workpaceView.showOrganizeMember = function(k,v){
	var	htmlStr  = 	"<li title='"+v.userName+"'>";
		htmlStr += 	"		<span class='member-portrait'>";
		htmlStr +=  			jointView.showDefaultPhoto(v.photo,v.userName);
		htmlStr += 	"		</span>";
		htmlStr += 	"		<span class='member-name'>"+v.userName+"</span>";
		htmlStr += 	"</li>";
		
	return htmlStr;
}


/**
 * 显示我的团队板块的信息组装
 */
workpaceView.showMyTeamInfo = function(k,v){
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
		htmlStr += "				<li class='team-create-project-button' teamId='"+v.id+"' data-toggle='modal' data-target='#create-team-project-modal'  href='"+startUp.getRootPath()+"/static/modules/surfond/workspace/template/create_team_project.html'>发起项目</li>";
			if(userId==resUserId){
				htmlStr += "					<li class='update-team-button' teamId='"+v.id+"' data-toggle='modal' data-target='#space-team-edit-modal'  href='"+startUp.getRootPath()+"/static/modules/surfond/workspace/template/edit_space_team.jsp'>编辑</li><li class='delete-team-button' teamId='"+v.id+"'>删除</li>";
			}
		htmlStr += "				</ul>";
		htmlStr += "			</div>";
		
		htmlStr += "			<div class='team-date'><span>成员 · "+v.userCount+" </span><span>  项目 · "+v.projectCount+" </span>  <span>话题 · "+v.conversationCount+"</span></div>";
		htmlStr += "		</div>";
		htmlStr += "		<div class='team-members' id='show-this-team-member-"+v.id+"'>";
				if(v.users){
					$.each(v.users,function(x,y){
						htmlStr += "<span title='"+y.name+"'>"+jointView.showDefaultPhoto(y.photo,y.name)+"</span>";
					});
				}
				if(userId==resUserId){
					htmlStr += "			<span class='sicon-addTeamMember show-sapce-member-to-team-modal' teamid='"+v.id+"' title='成员管理'></span>";
				}
		htmlStr += "		</div>";
		htmlStr += "	</li>";
		
	return htmlStr;
};


/**
 * 显示空间成员来预选团队成员
 */
workpaceView.showSpaceMemberToTeamResponsible = function(k,v){
	var userCount = 0;
	if(v.users){
		userCount = v.users.length;
	}
	var htmlStr = "";
	
		htmlStr += "<li class='member-group' user-id='member_"+v.id+"'>" ;
		htmlStr += "	<span class='group-info'>" ;
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
				htmlStr += 					jointView.showDefaultPhoto(y.photo,y.name) ;
				htmlStr += "			</span>" ;
				htmlStr += "			<span class='member-name'>"+y.name+"</span>" ;
				htmlStr += "		</li>" ;
			});
		}
		htmlStr += "	</ul>" ;
		htmlStr += "</li>" ;
			
	return htmlStr;
};


/**
 * 显示空间成员来预选团队成员
 */
workpaceView.showSpaceMemberToTeam = function(k,v){
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
				htmlStr += 					jointView.showDefaultPhoto(y.photo,y.name) ;
				htmlStr += "			</span>" ;
				htmlStr += "			<span class='member-name'>"+y.name+"</span>" ;
				htmlStr += "		</li>" ;
			});
		}
		htmlStr += "	</ul>" ;
		htmlStr += "</li>" ;
			
	return htmlStr;
};


/**
 * 回显已选中的成员
 */
workpaceView.showSelectTeamMembers = function(k,v){
	var htmlStr = "";
		htmlStr += "<li title='"+v.name+"' user-id='member_"+v.id+"' thisuserid='"+v.id+"'>";
		htmlStr += "</li>";
	return htmlStr;
};


/**
 * 显示团队成员
 */
workpaceView.showMyTeamMembersList = function(x,y){
	var htmlStr ="";
		htmlStr += "<span title='"+y.name+"'>"+jointView.showDefaultPhoto(y.photo,y.name)+"</span>";
	return htmlStr;
}


/**
 * 模态框组装单个成员信息
 */
workpaceView.showorganizeModalMember = function(k,v){
	var htmlStr  = "";
		htmlStr += "<div class='row' id='organizeMember-"+v.id+"'>";   
		htmlStr += "	<div class='col-md-4'>";	
		htmlStr += "		<span class='members member-portrait' title='"+v.name+"'>";
		htmlStr += 				jointView.showDefaultPhoto(v.photo,v.name);
		htmlStr += "		</span>";	  
		htmlStr += "		<span>"+v.name+"</span>";   
		htmlStr += "	</div>";	
		htmlStr += "	<span class='col-md-7'>"+v.email+"</span>";	
		htmlStr += "</div>";
	return htmlStr;
}
