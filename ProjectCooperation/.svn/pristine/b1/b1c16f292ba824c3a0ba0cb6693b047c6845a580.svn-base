$(function(){
    var Doc=$(document);
    	
      //任务筛选效果
      $(document).on('click',".task-fliter>.dropdown-menu>li",function(){
            if(!$(this).hasClass("current")){
                 $(this).siblings(".current").removeClass('current');
                 $(this).addClass("current");
                 $(this).parents('.task-fliter').children('.fliter-condition').text($(this).text());
                 
                 //获取选中的标签
             	 var groupType = $(this).attr("tag")?$(this).attr("tag"):"0";
                 workspace.loadTaskList(groupType);
            }
      });
      
      
	/**
	 * 团队列表调用滚动条插件
	 */
	$(".teams-list>ul.list").niceScroll({
		cursorcolor: "#ccc",
		cursorwidth: '5',
		cursorborderradius: '3px',
		cursorborder: '',
		railpadding: {top: 2,right: -8,left: 0,bottom: 0},
		railalign: 'right'
	});
});
 

/**
 * 工作台页面业务方法
 */
var workspace={};


$(function(){
	
	workspace.setTheSpaceOrganizeOption();
	
	/**
	 * 加载工作台组织架构
	 */
	workspace.showSpaceOrganizeMember();
	
	
	/**
	 * 加载当前空间所在的团队信息
	 */
	workspace.showMyTeamInfo();
	
	
	/**
	 * 新建一个团队
	 */
	$(document).on("click", "#submitNewTeamInfo", workspace.addNewTeamInfo);
	
	
	/**
	 * 负责人模态框，模态框加载空间成员，预选团队负责人
	 */
	$('#Add-Director').on('shown.bs.modal',workspace.showSpaceMemberToTeamResponsible);
	
	
	/**
	 * 成员模态框
	 */
	$('#AddTeamMembers').on('shown.bs.modal',function(){
		//模态框加载空间成员，预选团队成员、
		workspace.showSpaceMemberToTeam();
		//团队成员的回选
		workspace.findTeamSelectMember();
	});
	
	/**
	 * 团队编辑模态窗
	 */
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
	
	
	/**
	 * 工作台页面加载任务
	 */
	workspace.loadTaskList();
	
});

/**
 * 判断是否是空间负责人
 */
workspace.setTheSpaceOrganizeOption = function(){
	$("#whether-the-space-creater").empty();
	var userId = $("#checkedUser").attr("user-id");
	var spaceId = $("#checkedSpace").attr("space-id");
	var spaceUserId = $("#checkedSpace").attr("ownerId");
	if(userId==spaceUserId){
		$("#whether-the-space-creater").append("<a class='sicon-setting' href='"+startUp.getRootPath()+"/a/index?menuType=organizational&spaceId="+spaceId+"' title='空间成员设置'></a>");
	}
}

/**
 * 根据空间查找空间下的所有组织(workspace.jsp)
 */
workspace.showSpaceOrganizeMember = function(data){
	//获取空间ID
	var spaceId = $("#checkedSpace").attr("space-id");
	if(!spaceId){
		return;
	}
	var url = "/a/organize/findOneSapceOrganizes";
	startUp.postFormData(url,{"spaceId":spaceId},function(data){
		$("#show-space-member-list").empty();
		if(data.result.length>0){
			var noGroup = "";
			var group   = "";
			$.each(data.result,function(idx,item){
				if(item.type=='0'){
					//将未分组放到最后
					noGroup += workpaceView.showSapceOrganizeMembers(idx,item);
				}else{
					//已分组
					group += workpaceView.showSapceOrganizeMembers(idx,item);
				}
			});
			$("#show-space-member-list").append(group+noGroup);
		}
	});
};


/**
 * 点击展示部门下的成员
 */
$(document).on("click",".show-this-organize-member",function(){
	This = this;
	var organizeId = this.getAttribute("organize-id");
	var url = "/a/organize/findOneOrganizeMembers";
	if(organizeId){
		startUp.postFormData(url,{"id":organizeId},function(data){
			$(This).children("ul.this-organize-member").empty();
			var htmlStr = "";
			if(data.result.length>0){
				$.each(data.result,function(k,v){
					htmlStr += workpaceView.showOrganizeMember(k,v);
				});
			}
			$(This).children("span.member-count").html("("+data.result.length+")")
			$(This).children("ul.this-organize-member").append(htmlStr);
		});
	}
});


/**
 * 根据用户和空间查找用户所在的团队信息列表
 */
workspace.showMyTeamInfo = function(){
	var spaceId = $("#checkedSpace").attr("space-id");
	if(!spaceId){
		return;
	}
	var url = "/a/team/findAllTeamOfMine";
	startUp.postFormData(url,{"spaceId":spaceId},function(data){
		$("#my-team-info-list").empty();
		if(data.result.length>0){
			var teamHtml = "";
			$.each(data.result,function(k,v){
				teamHtml += workpaceView.showMyTeamInfo(k,v);
			});
			$("#my-team-info-list").append(teamHtml);
		}
	});
}


/**
 * 新建一个团队信息
 */
workspace.addNewTeamInfo = function(){
	
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
		
		startUp.postFormData(url,{"spaceId":spaceId,"name":name,"userId":userId,"membersId":membersId},function(data){
			if(data.message=='success'){
				$("#addNewTeamName").val("");
				$("#members-list").html("");
				$("#newTeamResponsible").html("");
				workspace.showMyTeamInfo();
				$("#new_team").modal("hide");
				commonMethods.operatResultAlert('团队创建成功!',1);
			}
		});
	}else{
		commonMethods.showAlertNav('团队名称不能为空!');
	}
};


/**
 * 添加团队成员时显示空间成员，预选团队负责人
 */
workspace.showSpaceMemberToTeamResponsible = function(){
	
	var url = "/a/organize/findOneSapceOrganizes";
	var spaceId = $("#checkedSpace").attr("space-id");
	
	startUp.postAsyncData(url,{"spaceId":spaceId},function(data){
		$("#show-sapce-member-to-team-responsible").empty();
		if(data.result.length>0){
			var htmlStr = "";
			$.each(data.result,function(k,v){
				htmlStr += workpaceView.showSpaceMemberToTeamResponsible(null,v);
			});
			$("#show-sapce-member-to-team-responsible").append(htmlStr);
		}
	});
};


/**
 * 添加团队成员时显示空间成员，预选团队成员
 */
workspace.showSpaceMemberToTeam = function(){
	
	var url = "/a/organize/findOneSapceOrganizes";
	var spaceId = $("#checkedSpace").attr("space-id");
	
	startUp.postAsyncData(url,{"spaceId":spaceId},function(data){
		$("#show-sapce-member-to-team").empty();
		if(data.result.length>0){
			var htmlStr = "";
			$.each(data.result,function(k,v){
				htmlStr += workpaceView.showSpaceMemberToTeam(k,v);
			});
			$("#show-sapce-member-to-team").append(htmlStr);
			$("#show-select-team-members").empty();
			commonMethods.backMebersSelected($("#new_team #members-list").html(),'#AddTeamMembers');
		}
	});
};


/**
 * 加载已选中的成员
 */
workspace.findTeamSelectMember = function(){
	var url = "/a/team/findAllMemberOfOneTeam";
	var teamId = $("#my-teams-in-space").attr("optionteamid");
	if(teamId){
		startUp.postFormData(url,{"id":teamId},function(data){
			$("#show-select-team-members").empty();
			if(data.result.length>0){
				var htmlStr = "";
				$.each(data.result,function(k,v){
					htmlStr += workpaceView.showSelectTeamMembers(null,v);
				});
				commonMethods.backMebersSelected(htmlStr,'#AddTeamMembers');
			}
		});
	}
};


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
					htmlStr += workpaceView.showorganizeModalMember(null,v);
				});
			}
			$("#show-space-team-member-list").append(htmlStr);
		});
	}
});


/**
 * 点击团队添加成员
 */
$(document).on("click",".show-sapce-member-to-team-modal",function(){
	var teamId = this.getAttribute("teamid");
	if(teamId){
		$("#my-teams-in-space").attr("optionteamid",teamId);
	}
});


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
		startUp.postFormData(url,{"id":teamId,"membersId":membersId},function(data){
			$("#show-this-team-member-"+teamId).empty();
			var htmlStr = "";
			if(data.result.length>0){
				$.each(data.result,function(k,v){
					htmlStr += workpaceView.showMyTeamMembersList(null,v);
				});
			}
			$("#members-list").html("");
			$("#show-this-team-member-"+teamId).append(htmlStr);
			$("#show-this-team-member-"+teamId).append("<span class='sicon-addTeamMember show-sapce-member-to-team-modal' teamid='"+teamId+"' title='添加成员'></span>");
		});
	}
});


/**
 * 进入编辑团队信息模态框
 */
$(document).on("click",".update-team-button",function(){//点击编辑团队时，将数据存于页面上，等模态框加载时获取
	var teamId = this.getAttribute("teamid");
	var url = "/a/team/findOneTeamBaseInfo";
	startUp.postFormData(url,{"id":teamId},function(data){
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
});


/**
 * 切换负责人时标志
 */
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
			startUp.postFormData(url,{"id":id,"name":name,"userId":userId},function(data){
				if(data.message=='success'){
					$("#space-team-edit-modal").modal("hide");
					workspace.showMyTeamInfo();	
				}
			});
		}else{
			commonMethods.showAlertNav('团队名称不能为空!');
		}
	}
});


/**
 * 删除团队
 */
$(document).on("click",".delete-team-button",function(){
	var teamId = this.getAttribute("teamid");
	var url = "/a/team/deleteTeamInfo";
	if(teamId){
		var yz_url = "/a/team/findOneTeamProjectAndConversationCount";
		startUp.postFormData(yz_url,{"id":teamId},function(data){
			if(data.result>0){
				commonMethods.showConfirmNav("该团队下有"+data.result+"个项目将会一起删除，是否确定要删除该团队?",function(){
					startUp.postFormData(url,{"id":teamId},function(data){
						workspace.showMyTeamInfo();
						commonMethods.operatResultAlert('删除团队成功!',1);
					});
				},"no");
			}else{
				commonMethods.showConfirmNav("是否确定要删除该团队?",function(){
					startUp.postFormData(url,{"id":teamId},function(data){
						workspace.showMyTeamInfo();
						commonMethods.operatResultAlert('删除团队成功!',1);
					});
				},"no");
			}
		});
	}
});


/**
 * 点击发起团队项目模态窗
 */
$(document).on("click", ".team-create-project-button", function(){
	var teamId = $(this).attr("teamid");
	var teamTitle = $(this).parents(".team-info").find(".team-name").attr("title");
	//创建团队下项目模态窗加载完成后设置相关参数
	$(document).on("shown.bs.modal", "#create-team-project-modal", function(){
		$("#teamId").val(teamId);
		$("#newProjectInTeamForm").find("input[name='teamTitle']").val(teamTitle);
	});
});


/**
 * 发起团队项目
 */
$(document).on("click", "#newProjectInTeamBtn", function(){
	var teamId = $("#teamId").val();
	var title = $("#newProjectInTeamForm").find("input[name='title']").val().trim();
	var description = $("#newProjectInTeamForm").find("textarea[name='description']").val().trim();
	if(!title){
		commonMethods.showAlertNav("项目名称不能为空!");
		return ;
	}else if(title.length > 50){
		commonMethods.showAlertNav("项目名称超出字数，最大可输入50字符!");
		return ;
	}
	if(teamId){
		$("#create-team-project-modal").modal("hide");//关闭"创建项目"模态窗
		var url = "/a/task/saveteamproject";
		var data = {"title":title, "description":description, "teamId":teamId};
		startUp.postFormData(url, data, function(resultMap){
			if(resultMap && resultMap.data){
				$("#newProjectInTeamForm").find("input[name='teamTitle']").val("");
				$("#newProjectInTeamForm").find("input[name='title']").val("");
				$("#newProjectInTeamForm").find("textarea[name='description']").val("");
				commonMethods.operatResultAlert("发起团队项目成功,赶紧去项目看看吧~~", 1);
			}
		});
	}
});

//展开空间成员
$(document).on("click", ".project-eject", function(){
    if(!$(this).hasClass("m")){
    	$(this).removeClass("l");
    	$(this).addClass("m");
    	$(".main-container-scroll").animate({"padding-left":10});
	    $(".main-container").animate({padding:"0px 321px 0px 21px"},300);
	    $(this).empty();
	    $(this).append("&gt;");
    }else if(!$(this).hasClass("l")){
    	$(this).removeClass("m");
    	$(this).addClass("l");
    	$(".main-container-scroll").animate({"padding-left":0});
	    $(".main-container").animate({padding:"0 320px 0 340px"},300);
	    $(this).empty();
	    $(this).append("&lt;"); 
    }
});

/**
 * 加载任务列表
 */
workspace.loadTaskList = function(groupType){
	
	$("#taskItemsTbody").empty();
	
	groupType = groupType?groupType:"0";
	
    //调用查询任务方法
    var spaceId = $("#checkedSpace").attr("space-id");
 	var ownerId = $("#checkedUser").attr("user-id");
 	var createById = $("#checkedUser").attr("user-id");
 	if(spaceId){
 		var url = "/a/task/findmytasklist";
 		var data = {"spaceId":spaceId, "user.id":ownerId, "createBy.id":createById,"groupType":groupType};
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
};

