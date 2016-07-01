
$(function(){
	var menuType = $("#menuType").val();
	if("workspace" == menuType){
		team.showMyTeamInfo();								//预加载我所在的空间下的团队
	}
	
	$('#AddTeamMembers').on('shown.bs.modal',function(){	//成员模态框
		team.showSpaceMemberToTeam();					//模态框加载空间成员，预选团队成员
		team.findTeamSelectMember();					//团队成员的回选
	});
	
	$('#Add-Director').on('shown.bs.modal',function(){	//负责人模态框
		team.showSpaceMemberToTeamResponsible();		//模态框加载空间成员，预选团队负责人
	});
	
	$('#space-team-edit-modal').on('shown.bs.modal',function(){ //编辑模态框
		$("#space-team-base-info").click();
		var organizeId = $("#my-teams-in-space").attr("teamId");
		var organizeName = $("#my-teams-in-space").attr("teamName");
		var userId = $("#my-teams-in-space").attr("userId");
		var userName = $("#my-teams-in-space").attr("userName");
		var createUserName = $("#my-teams-in-space").attr("createUserName");
		$("#modal-team-name").val(organizeName);
		$("#modal-team-name").attr("name",organizeId);
		$("#modal-team-creater").val(createUserName);
		var changeUser = $("#my-teams-in-space").attr("change-user");
		if(changeUser=='0'){
			$("#team_Responsible").html("<span user-id='member_"+userId+"'>"+userName+"</span>");
		}
	});
});




var team = {};

/**
 * 根据用户和空间查找用户所在的团队信息
 */
team.showMyTeamInfo = function(){
	var spaceId = $("#checkedSpace").attr("space-id");
	if(!spaceId){
		return;
	}
	var url = "/a/team/findAllTeamOfMine";
	startUp.postAsyncData(url,{"spaceId":spaceId},function(data){
		$("#my-team-info-list").empty();
		if(data.result.length>0){
			var teamHtml = "";
			$.each(data.result,function(k,v){
				teamHtml += teamView.showMyTeamInfo(null,v);
			});
			$("#my-team-info-list").append(teamHtml);
		}
	});
}

/**
 * 新建一个团队信息
 */
$(document).on("click","#submitNewTeamInfo",function(){
		team.addNewTeamInfo();
	});
team.addNewTeamInfo = function(){
	
	var spaceId = $("#checkedSpace").attr("space-id");
	if(!spaceId){return;}
	var membersId = "";
	var str = $("#members-list").html();
	$str = $("<div></div>");
	$str.html(str);
	var as=$str.find("span");
	for(var i=0;i<as.length;i++){
		var thisuserid = $(as[i]).attr("user-id");
		if(thisuserid){
			thisuserid = thisuserid.replace("member_","");
			membersId += thisuserid+";";
		}
	}
	var userId = ""; 
		
	var resStr = $("#newTeamResponsible").html();
	$resStr = $("<div></div>");
	$resStr.html(resStr);
	var ps = $resStr.find("span");
	for(var i=0;i<ps.length;i++){
		var thisuserid = $(ps[i]).attr("user-id");
		if(thisuserid){
			thisuserid = thisuserid.replace("member_","");
			userId = thisuserid;
		}
	}
	
	var name = $("#addNewTeamName").val().trim();
	if(name){
		if(name.length>50){return;}
		var url = "/a/team/saveTeamInfo";
		
		startUp.postAsyncData(url,{"spaceId":spaceId,"name":name,"userId":userId,"membersId":membersId},function(data){
			if(data.message=='success'){
				$("#addNewTeamName").val("");
				$("#members-list").html("");
				$("#newTeamResponsible").html("");
				team.showMyTeamInfo();
				$("#new_team").modal("hide");
				commonMethods.operatResultAlert('创建成功!',1);
			}
		});
	}else{
		commonMethods.showAlertNav('团队名字不能为空!');
	}
}


/**
 * 删除一个团队信息
 */
$(document).on("click",".delete-team-button",function(){
	var teamId = this.getAttribute("teamid");
	var url = "/a/team/deleteTeamInfo";
	if(teamId){
		var yz_url = "/a/team/findOneTeamProjectAndConversationCount";
		startUp.postAsyncData(yz_url,{"id":teamId},function(data){
			if(data.result>0){
				commonMethods.showConfirmNav("团队下的项目和空间将一起删除，是否确定要删除该团队?",function(){
					startUp.postAsyncData(url,{"id":teamId},function(data){
						team.showMyTeamInfo();
						commonMethods.operatResultAlert('删除成功!',1);
					});
				},"no");
			}else{
				commonMethods.showConfirmNav("是否确定要删除该团队?",function(){
					startUp.postAsyncData(url,{"id":teamId},function(data){
						team.showMyTeamInfo();
						commonMethods.operatResultAlert('删除成功!',1);
					});
				},"no");
			}
		});
	}
});


/**
 * 根据团队ID查找团队成员
 */
$(document).on("click","#click-to-new-team",function(){
	$("#my-teams-in-space").attr("optionteamid","");
});
$(document).on("click",".show-sapce-member-to-team-modal",function(){
	var teamId = this.getAttribute("teamid");
	if(teamId){
		$("#my-teams-in-space").attr("optionteamid",teamId);
	}
});
team.findTeamSelectMember = function(){
	var url = "/a/team/findAllMemberOfOneTeam";
	var teamId = $("#my-teams-in-space").attr("optionteamid");
	if(teamId){
		startUp.postAsyncData(url,{"id":teamId},function(data){
			$("#show-select-team-members").empty();
			if(data.result.length>0){
				var htmlStr = "";
				$.each(data.result,function(k,v){
					htmlStr += teamView.showSelectTeamMembers(null,v);
				});
				//$("#show-select-team-members").append(htmlStr);
				commonMethods.backMebersSelected(htmlStr,'#AddTeamMembers');
			}
		});
	}
}



/**
 * 添加团队成员时显示空间成员，预选团队成员
 */
team.showSpaceMemberToTeam = function(){
	
	var url = "/a/organize/findOneSapceOrganizes";
	var spaceId = $("#checkedSpace").attr("space-id");
	
	startUp.postAsyncData(url,{"spaceId":spaceId},function(data){
		$("#show-sapce-member-to-team").empty();
		if(data.result.length>0){
			var htmlStr = "";
			$.each(data.result,function(k,v){
				htmlStr += teamView.showSpaceMemberToTeam(null,v);
			});
			$("#show-sapce-member-to-team").append(htmlStr);
			$("#show-select-team-members").empty();
			commonMethods.backMebersSelected($("#new_team #members-list").html(),'#AddTeamMembers');
		}
	});
}

/**
 * 添加团队成员时显示空间成员，预选团队负责人
 */
team.showSpaceMemberToTeamResponsible = function(){
	
	var url = "/a/organize/findOneSapceOrganizes";
	var spaceId = $("#checkedSpace").attr("space-id");
	
	startUp.postAsyncData(url,{"spaceId":spaceId},function(data){
		$("#show-sapce-member-to-team-responsible").empty();
		if(data.result.length>0){
			var htmlStr = "";
			$.each(data.result,function(k,v){
				htmlStr += teamView.showSpaceMemberToTeamResponsible(null,v);
			});
			$("#show-sapce-member-to-team-responsible").append(htmlStr);
		}
	});
}


/**
 * 保存团队成员
 */
$(document).on("click","#save-team-members",function(){
	var teamId = $("#my-teams-in-space").attr("optionteamid");
	if(teamId){
		var url = "/a/team/addTeamMoreMember";
		var membersId = "";
		var str = $("#show-select-team-members").html();
		$str = $("<div></div>");
		$str.html(str);
		var as=$str.find("li");
		for(var i=0;i<as.length;i++){
			var thisuserid = $(as[i]).attr("thisuserid");
			if(thisuserid){
				membersId += thisuserid+";"
			}
		}
		startUp.postAsyncData(url,{"id":teamId,"membersId":membersId},function(data){
			$("#show-this-team-member-"+teamId).empty();
			var htmlStr = "";
			if(data.result.length>0){
				$.each(data.result,function(k,v){
					htmlStr += teamView.showMyTeamMembersList(null,v);
				});
			}
			$("#members-list").html("");
			$("#show-this-team-member-"+teamId).append(htmlStr);
			$("#show-this-team-member-"+teamId).append("<span class='sicon-addTeamMember show-sapce-member-to-team-modal' teamid='"+teamId+"' title='添加成员'></span>");
		});
	}
});

/**
 * 编辑成员管理添加团队成员
 */
$(document).on("input", "#modal-invite-team-member", function(){
	var keyword = $(this).val().trim();
	space.loadSpaceMemberList(keyword);
});
$(document).on("keydown","#modal-invite-team-member",function(event){
	if(event.keyCode == "13"){
		var teamId = $("#modal-team-name").attr("name");
		if(teamId){
			var url = "/a/team/inviteTeamMoreMember";
			var membersId = "";
			var str = $("#modal-invite-members-list").html();
			$str = $("<div></div>");
			$str.html(str);
			var as=$str.find("div.invite-member");
			for(var i=0;i<as.length;i++){
				var thisuserid = $(as[i]).attr("member-id");
				if(thisuserid){
					membersId += thisuserid+";"
				}
			}
			startUp.postAsyncData(url,{"id":teamId,"membersId":membersId},function(data){
				if(data.result=='success'){
					$("#modal-invite-team-member").html("");
					$("#space-team-member").click();
					$("#modal-invite-members-list").html("");
					team.showMyTeamInfo();	
				}
			});
		}
	}
});


/**
 * 进入编辑团队信息模态框
 */
$(document).on("click",".update-team-button",function(){//点击编辑团队时，将数据存于页面上，等模态框加载时获取
	var teamId = this.getAttribute("teamid");
	var url = "/a/team/findOneTeamBaseInfo";
	startUp.postAsyncData(url,{"id":teamId},function(data){
		if(data.result){
			$("#my-teams-in-space").attr("teamId","");
			$("#my-teams-in-space").attr("teamName","");
			$("#my-teams-in-space").attr("userId","");
			$("#my-teams-in-space").attr("userName","");
			$("#my-teams-in-space").attr("createUserId","");
			$("#my-teams-in-space").attr("createUserName","");
			$("#my-teams-in-space").attr("teamId",data.result.id);
			$("#my-teams-in-space").attr("teamName",data.result.name);
			$("#my-teams-in-space").attr("userId",data.result.userId);
			$("#my-teams-in-space").attr("userName",data.result.userName);
			$("#my-teams-in-space").attr("createUserId",data.result.createById);
			$("#my-teams-in-space").attr("createUserName",data.result.createByName);
			
			$("#my-teams-in-space").attr("change-user","0");
		}
	});
});//切换负责人时标志
$(document).on("click","#save-remmember-space-member",function(){
	$("#my-teams-in-space").attr("change-user","1");
});

/**
 * 编辑团队信息
 */
$(document).on("click","#submit-modal-team-info",function(){
	var url = "/a/team/updateTeamInfo";
	var id = $("#modal-team-name").attr("name");
	var name = $("#modal-team-name").val();
	var userId = "";
	var str = $("#team_Responsible").html();
	$str = $("<div></div>");
	$str.html(str);
	var as=$str.find("span");
	for(var i=0;i<as.length;i++){
		var thisuserid = $(as[i]).attr("user-id");
		if(thisuserid){
			thisuserid = thisuserid.replace("member_","");
			userId = thisuserid;
		}
	}
	if(id){
		if(name){
			startUp.postAsyncData(url,{"id":id,"name":name,"userId":userId},function(data){
				if(data.message=='success'){
					$("#space-team-edit-modal").modal("hide");
					team.showMyTeamInfo();	
				}
			});
		}else{
			commonMethods.showAlertNav('团队名称不能为空!');
		}
	}
});


/**
 * 切换团队成员管理查看成员
 */
$(document).on("click","#space-team-member",function(){
	var url = "/a/team/findAllMemberOfOneTeam";
	var teamId = $("#modal-team-name").attr("name");
	if(teamId){
		startUp.postAsyncData(url,{"id":teamId},function(data){
			$("#show-space-team-member-list").empty();
			var htmlStr = "";
			if(data.result.length>0){
				$.each(data.result,function(k,v){
					htmlStr += teamView.showorganizeModalMember(null,v);
				});
			}
			$("#show-space-team-member-list").append(htmlStr);
		});
	}
});

