
var organizeView = {};



/**
 * 组装单个空间组织分组架构
 */
organizeView.showSapceOrganizeMembers = function(k,v){
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
		
		if(v.users){
				  $.each(v.users,function(x,y){
					    htmlStr   +=	organizeView.splitOrganizeMemberCss(null,y);
				  });
		}
					  
		htmlStr   +=  	"	</ul>";
		htmlStr   +=  	"</li>";
	
	return htmlStr;
}

/**
 * 单个成员样式组装
 */
organizeView.splitOrganizeMemberCss = function(k,v){
	var	htmlStr  = 	"<li title='"+v.userName+"'>";
		htmlStr += 	"		<span class='member-portrait'>";
		htmlStr +=  			organizeView.showDefaultPhoto(v.photo,v.userName);
		htmlStr += 	"		</span>";
		htmlStr += 	"		<span class='member-name'>"+v.userName+"</span>";
		htmlStr += 	"</li>";
		
	return htmlStr;
}

/**
 * 单个部门分组样式组装
 */
organizeView.splitOneOrganizeCss = function(k,v){
	var	htmlStr  = 	"<li class='unappropriated space-department-each' id='organize-each-"+v.id+"' organizeId='"+v.id+"' organizeName='"+v.name+"'>" ;
	    htmlStr +=	  "<a href='#unmated' aria-controls='settings' role='tab' data-toggle='tab' class='group-title' title='"+v.name+"'>"+v.name+"</a>";//startUp.subStr(v.name,30)
	    if(v.type!='0'){
	    	htmlStr +=		"<div class='dropdown'>";
		    htmlStr +=			"<span class='glyphicon glyphicon-option-horizontal' data-toggle='dropdown'>";
		    htmlStr +=			"</span>";
		    htmlStr +=			"<ul class='dropdown-menu'>";
		    htmlStr +=				"<li class='update-space-organize' status='"+v.id+"' data-toggle='modal' data-target='#space-organize-modal'  href='"+startUp.getRootPath()+"/static/modules/surfond/modal/edit_space_organize.jsp'>编辑</li>";
		    htmlStr +=				"<li class='delete-space-organize' status='"+v.id+"'>删除</li>";
		    htmlStr +=			"</ul>";
		    htmlStr +=		"</div>";
	    }else{
	    	htmlStr +=		"<div class='dropdown'>";
		    htmlStr +=			"<span class='glyphicon glyphicon-option-horizontal' data-toggle='dropdown'>";
		    htmlStr +=			"</span>";
		    htmlStr +=			"<ul class='dropdown-menu'>";
		    htmlStr +=				"<li class='update-space-organize' status='"+v.id+"' data-toggle='modal' data-target='#space-organize-modal'  href='"+startUp.getRootPath()+"/static/modules/surfond/modal/edit_space_organize.jsp'>编辑</li>";
		    htmlStr +=			"</ul>";
		    htmlStr +=		"</div>";
	    }
	    htmlStr +=	"</li>";
	return htmlStr;
}


/**
 * 邀请成员选择部门单个部门分组样式组装
 */
organizeView.splitOneOrganizeToInviateCss = function(k,v){
	var	htmlStr  = 	"";
		htmlStr +=	"<li user-id='member_"+v.id+"' title='"+v.name+"'>";
		htmlStr +=	"	<label class='sicon-checkbox' for='input_"+v.id+"'>";
		htmlStr +=	"		<input id='input_"+v.id+"' type='checkbox' autocomplete='false'>";
		htmlStr +=	"	</label>";
		htmlStr +=	"	<span class='member-name'>"+v.name+"</span>";
		htmlStr +=	"</li>";
	return htmlStr;
}

/**
 * 单个空间成员样式组装
 */
organizeView.splitOneSpaceMemberCss = function(k,v,dept){
	var checkedUser = $("#checkedUser").attr("user-id");
	var rowClass = "first-row";
	var userFlag = "未激活";
	if(v.loginFlag=='1'){
		rowClass = "second-row";
		userFlag = "使用中";
	}
	var	htmlStr  = 	"";
		htmlStr  += "<div class='"+rowClass+"'>";
		htmlStr  += "	<ul class='dispenser-head two'>";
		htmlStr  += "		<li class='head-portrait'>";
		htmlStr  += "			<span class='member-portrait'>";
		htmlStr  += 				organizeView.showDefaultPhoto(v.photo,v.userName);
		htmlStr  += "			</span>";
		htmlStr  += "		</li>";
		htmlStr  += "		<li class='compellation'>"+v.userName+"</li>";
		htmlStr  += "		<li class='mailbox'>"+v.email+"</li>";
		htmlStr  += "		<li class='department'>";
		htmlStr  += "			<select class='form-control to-update-organize' organizeid = '"+v.organizeId+"' user-id='"+v.userId+"'>";
									if(dept.result){
										var thisDept  = "";
										var otherDept = "";
										$.each(dept.result,function(x,y){
											if(v.organizeId==y.id){
												thisDept	+= "<option value ='"+y.id+"'>" +y.name+ "</option>";
											}else{
												otherDept	+= "<option value ='"+y.id+"'>" +y.name+ "</option>";
											}
										});
										htmlStr  += thisDept + otherDept;
									}
		htmlStr  += "			</select>";
		htmlStr  += "		</li>";
		htmlStr  += "		<li class='creation-time'>";
		/*htmlStr  += "			<span>2015-12-12</span>&nbsp;";
		htmlStr  += "			<span>15:30</span>";*/
		htmlStr  += "		</li>";
		htmlStr  += "		<li class='condition'>";
		htmlStr  += "			<span></span>";
		htmlStr  += "			<span>"+userFlag+"</span>";
		htmlStr  += "		</li>";
		htmlStr  += "		<li class='operate'>";
		if(checkedUser!=v.userId){
			htmlStr  += "			<span class='remove-space-member' organizeId='"+v.organizeId+"' userId='"+v.userId+"'>删除成员</span>";
		}
		htmlStr  += "		</li>";
		htmlStr  += "	</ul>";
		htmlStr  += "</div>";
	
	return htmlStr;
}


/**
 * 模态框组装单个成员信息
 */
organizeView.showorganizeModalMember = function(k,v){
	var htmlStr  = "";
		htmlStr += "<div class='row' id='organizeMember-"+v.userId+"'>";   
		htmlStr += "	<div class='col-md-4'>";	
		htmlStr += "		<span class='members member-portrait' title='"+v.userName+"'>";
		htmlStr += 				organizeView.showDefaultPhoto(v.photo,v.userName);
		htmlStr += "		</span>";	  
		htmlStr += "		<span>"+v.userName+"</span>";   
		htmlStr += "	</div>";	
		htmlStr += "	<span class='col-md-7'>"+v.email+"</span>";	
		htmlStr += "</div>";
	return htmlStr;
}


/**
 * 处理头像显示
 */
organizeView.showDefaultPhoto = function(photo,name){
	
	var htmlStr = "";
	if(photo){
		htmlStr += "<img class='portrait' title='" + name + "' src='" + startUp.getRootPath() + photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"'>";
	}else{
		htmlStr += "<img class='portrait' title='" + name + "' src='"+startUp.getRootPath()+"/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"'>";
	}
	return htmlStr;
}

/**
 * 显示空间成员来预选团队成员
 */
organizeView.showSpaceMemberToTeamResponsible = function(k,v){
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


