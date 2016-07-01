$(function(){
	
	//加载项目列表
	var loadProjectList = function(projectTag, status, keyword, teamFlag){
		$("#taskItemsTbody").empty();
		$(projectTag).empty();
		var spaceId = $("#checkedSpace").attr("space-id");
		if(spaceId){
			var url = "/a/task/findprojectlist";
			var data = {"spaceId":spaceId, "status":status, "title":keyword};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var htmlStr = "";
					$.each(resultMap.data, function(idx, item){
						htmlStr += jointView.projectEach(idx, item);
					});
					$(projectTag).append(htmlStr);
					//加载团队列表
					if(teamFlag){
						var url_to = "/a/task/findteamlistbyspaceid";
						var data_to = {"spaceId":spaceId, "status":status, "title":keyword};
						startUp.postFormData(url_to, data_to, function(resultMap_to){
							if(resultMap_to && resultMap_to.data){
								var htmlStr_to = "";
								$.each(resultMap_to.data, function(k, v){
									htmlStr_to += projectView.teamEach(k, v);
								});
								$(projectTag).append(htmlStr_to);
								showProjectListAnimate(projectTag);
							}
						});
					}else{
						var url_to_to = "/a/task/findteamprojectlist";
						var data_to_to = {"spaceId":spaceId, "status":status, "title":keyword};
						startUp.postFormData(url_to_to, data_to_to, function(resultMap_to_to){
							if(resultMap_to_to && resultMap_to_to.data){
								var htmlStr_to_to = "";
								$.each(resultMap_to_to.data, function(x, y){
									htmlStr_to_to += jointView.projectEach(x, y);
								});
								$(projectTag).append(htmlStr_to_to);
								showProjectListAnimate(projectTag);
							}
						});
					}
				}
			});
		}
	}
	
	//选中cookie中的项目(为人民服务)
	var showProjectListAnimate = function(projectTag){
		//项目列表显示后选中cookie中记录的项目
		var cookieProjectId = $.cookie("projectId-" + $("#checkedUser").attr("user-id"));
		if(cookieProjectId){
			if($(projectTag).find("#project-" + cookieProjectId).parent().parent().hasClass("team-project-list")){
				$(projectTag).find("#project-" + cookieProjectId).parent().parent().show();
				$(projectTag).find("#project-" + cookieProjectId).parent().parent().parent().find(".group-info").children().first().removeClass("triangle-left").addClass("triangle-down");
			}
			$(projectTag).find("#project-" + cookieProjectId).click();
		}
		//判断是否有选中的项目
		var size = $(projectTag).find(".current").size();
		if(size != 1){//没有选中的项目,默认选中列表的第一个项目
			if($(projectTag).children(".projectEach").size() > 0){//外部有项目选中第一个
				$(projectTag).children(".projectEach").first().click();
			}else{//外部没项目选中团队下的第一个项目
				if($(projectTag).children(".team-project").size() > 0){
					var teamArray = $(projectTag).children(".team-project");
					for(var i = 0; i < teamArray.length; i++){
						if($(teamArray[i]).find(".team-project-list").children("ul").children().size() > 0){
							$(teamArray[i]).find(".team-project-list").parent().find(".group-info").children().first().removeClass("triangle-left").addClass("triangle-down");
							$(teamArray[i]).find(".team-project-list").show().children("ul").children().first().click();
							break;
						}
					}
				}
			}
		}
		//设置滚动条到选中的项目的位置
		size = $(projectTag).find(".current").size();
		if(size == 1){
			if($(projectTag).find(".current").offset().top == 0){
				$(projectTag).animate({scrollTop:0},1);
			}else{
				$(projectTag).animate({scrollTop:$(projectTag).find(".current").offset().top-$(projectTag).offset().top},1);
			}
		}
	}
	
	//从不同菜单中获取当前的项目编号
	var getProjectIdFromDifferentMenu = function(ele){
		var elementId = $(ele).parents("ul.dropdown-menu").attr("id");
		var projectId = "";
		if(elementId){
			projectId = elementId.replace("pddm-", "");
		}else{
			projectId = $("#checkedProject").attr("project-id");
		}
		return projectId;
	}
	
	//加载项目成员列表
	var loadProjectMemberList = function(){
		$("#projectMemberItemsDiv").empty();
		var projectId = $("#checkedProject").attr("project-id");
		if(projectId){
			var url = "/a/task/findprojectmemberlist";
			var data = {"id":projectId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var htmlStr = "";
					$.each(resultMap.data, function(idx, item){
						htmlStr += projectView.projectMemberEach(idx, item);
					});
					$("#projectMemberItemsDiv").append(htmlStr);
					$("#projectMember-" + $("#projectOwnerId").val()).prependTo("#projectMemberItemsDiv");
					$("#projectMember-" + $("#projectCreateById").val()).prependTo("#projectMemberItemsDiv");
					var type = $("#checkedProject").attr("project-type");
					$(".delete-project-member-option-select").text("");
					var projectOwnerId = $("#projectOwnerId").val();
					var thisUserId = $("#checkedUser").attr("user-id");
					if(type=='space'){
						$("#project-option-list").text("操作");
						if(thisUserId==projectOwnerId){
							$(".delete-project-member-option-select").text("删除成员");
							$.each($(".delete-project-member-option-select"),function(k,v){
								var optionUserId = $(v).attr("user-id");
								if(thisUserId==optionUserId){
									$(v).text("");
									$(v).attr("user-id","");
								}
							});
						}else{
							$(".delete-project-member-option-select").attr("user-id","");
						}
					}else{
						$(".delete-project-member-option-select").attr("user-id","");
						$("#project-option-list").text("");
					}
				}
			});
		}
	}
	
	loadProjectList("#projectItemsUl", "0", "", true);//加载项目列表
	
	////////////////////////以下是事件的注册
	
	//显示项目附件
	$(document).on("click","#modelTaskAttachment",function(){
		
		var url = "/a/attachment/getAttachmentListByProject";	//请求服务路径
		var projectId = $("#checkedProject").attr("project-id");//项目ID
		var dataSource = {"projectId":projectId};				//请求参数
		
		if(projectId){
			startUp.postAsyncData(url,dataSource,function(data){
				$("#attachmentOfProject").empty();
				var str = "";
				if(data.result.length>0){
					$.each(data.result,function(k,v){
						str += projectView.showProjectAttachmentList(null,v);
					});
				}
				if(str){										//有无附件信息的处理
					$("#attachmentOfProject").append(str);
					$("#attachmentOfProject").css("background", "");
				}else{
					$("#attachmentOfProject").css("background", "url(" + startUp.getRootPath() + "/static/modules/surfond/common/new-images/null-files.png) no-repeat center center");
				}
			});
		}
	});
	
	//查看存档切换
	$(document).on("click", "#showDifferentProject", function(){
		var projectStatus = $(this).attr("project-status");
		if(projectStatus == "0"){//此时正常项目列表可见,需加载收藏项目列表
			$(this).attr("project-status", "2");
			loadProjectList("#archiveProjectItemsUl", "2", "", false);
		}else if(projectStatus == "2"){//此时收藏项目列表可见,需加载正常项目列表
			$(this).attr("project-status", "0");
			loadProjectList("#projectItemsUl", "0", "", true);
		}
	});
	
	//回车查询项目列表
	$(document).on("keydown", "#projectTitleInput", function(event){
		if(event.keyCode == 13){
			var keyword = $(this).val().trim();
			var projectStatus = $("#showDifferentProject").attr("project-status");
			if(projectStatus == "0"){
				loadProjectList("#projectItemsUl", "0", keyword, true);
			}else if(projectStatus == "2"){
				loadProjectList("#archiveProjectItemsUl", "2", keyword, false);
			}
		}
	});
	
	//创建项目
	$(document).on("click", "#newProjectBtn", function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		var title = $("#newProjectForm").find("input[name='title']").val().trim();
		var description = $("#newProjectForm").find("textarea[name='description']").val().trim();
		if(!title){
			commonMethods.showAlertNav("标题不能为空!");
			return ;
		}else if(title.length > 50){
			commonMethods.showAlertNav("标题超出字数!");
			return ;
		}
		
		if(spaceId && title){
			$("#New_Project").modal("hide");//关闭"创建项目"模态窗
			var url = "/a/task/saveproject";
			var data = {"spaceId":spaceId, "title":title, "description":description};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var htmlStr = jointView.projectEach(null, resultMap.data);
					$("#projectItemsUl").prepend(htmlStr);
					$("#newProjectForm").find("input[name='title']").val("");
					$("#newProjectForm").find("textarea[name='description']").val("");
				}
			});
		}
	});
	
	//点击选中项目
	$(document).on("click", ".projectEach", function(){
		//判断是否是团队项目
		if($(this).parents("li.team-project")[0]){
			$("#checkedProject").attr("project-type","team");
		}else{
			$("#checkedProject").attr("project-type","space");
		}
		//区域取消选中并设置点击项选中
		$("#projectItemsUl, #archiveProjectItemsUl").find("li.current").removeClass("current");
		$(this).addClass("current");
		//查询项目信息
		var projectEachId = $(this).attr("id");
		if(projectEachId){
			var projectEachIdArray = projectEachId.split("-");
			if(projectEachIdArray && projectEachIdArray.length == 2){
				var projectId = projectEachIdArray[1];
				var url = "/a/task/findproject";
				var data = {"id":projectId};
				startUp.postFormData(url, data, function(resultMap){
					if(resultMap && resultMap.data){
						var item = resultMap.data;
						$("#checkedProject").find("div.dropdown").show();
						//相关菜单显示
						var htmlStr = jointView.projectMenuOption(item.favoriteFlag);
						$("#checkedProject").attr("project-id", item.id)
							.find(".project-title").text(item.title).attr("title", item.title)
						$("#checkedProject").find("ul.dropdown-menu").empty().append(htmlStr);
						$("#allTaskList").click();//每次点击项目是默认选中"所有"
						$("#modelTaskList").click();
						$.cookie("projectId-" + $("#checkedUser").attr("user-id"),item.id,{expires:30,path:"/"});
						if(resultMap.data.teamId){
							$("#checkedProject").attr("teamid",resultMap.data.teamId);
						}else{
							$("#checkedProject").attr("teamid","");
						}
					}
				});
			}
		}
	});
	
	//加载项目设置模态窗
	$(document).on('click', '.project-details', function() {
		var projectId = getProjectIdFromDifferentMenu(this);
		$("#checkedProject").attr("project-id", projectId);
		var shref = $(this).attr('shref');
		$('#Manage_Project').modal({
			remote: shref
		});
	});
	
	//项目设置模态窗默认选中第一个选项卡
	$(document).on("show.bs.modal", "#Manage_Project", function(){
		$("#projectInfoMenu").click();
		$(document).on("click","#projectMemberMenu",function(){
			var type = $("#checkedProject").attr("project-type");
			$(".invite-member-inpput-team-or-space-project").empty();
			if(type=='space'){
				$(".invite-member-inpput-team-or-space-project").append(projectView.manageMembersInput());
			}
		});
	});
	
	//项目设置模态窗加载时查询项目信息
	$(document).on("shown.bs.modal", "#Manage_Project", function(){
		var projectId = $("#checkedProject").attr("project-id");
		if(projectId){
			var url = "/a/task/findproject";
			var data = {"id":projectId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var responsible = resultMap.data.user.name ? resultMap.data.user.name : "";
					$("#editProjectForm").find("input[name='title']").val(resultMap.data.title);
					$("#editProjectForm").find("input[name='creator']").val(resultMap.data.createByName).attr("member-id", resultMap.data.createById);
					$("#editProjectForm").find("input[name='responsible']").val(responsible).attr("member-id", resultMap.data.user.id);
					$("#editProjectForm").find("textarea[name='description']").val(resultMap.data.description);
					$("#projectCreateById").val(resultMap.data.createById);
					$("#projectOwnerId").val(resultMap.data.user.id);
				}
			});
		}
	});
	
	//修改项目信息
	$(document).on("click", "#editProjectBtn", function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		var projectId = $("#checkedProject").attr("project-id");
		var title = $("#editProjectForm").find("input[name='title']").val().trim();
		var description = $("#editProjectForm").find("textarea[name='description']").val().trim();
		var responsibleValue = $("#editProjectForm").find("input[name='responsible']").val().trim();
		var responsible = "";
		if(responsibleValue){
			responsible = $("#editProjectForm").find("input[name='responsible']").attr("member-id");
		}
		if(!title){
			commonMethods.showAlertNav("标题不能为空!");
			return ;
		}else if(title.length > 50){
			commonMethods.showAlertNav("标题不能超出50个字!");
			return ;
		}
		if(projectId){
			var url = "/a/task/updatepartinfobyprojectid";
			var data = {"id":projectId, "title":title, "description":description, "user.id":responsible, "spaceId":spaceId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var item = resultMap.data;
					$("#Manage_Project").modal("hide");
					$("#project-" + item.id).find(".project-title").text(item.title);
					$("#checkedProject").find(".project-title").text(item.title).attr("title", item.title);
				}
			});
		}
	});
	
	//查询项目成员列表
	$(document).on("click", "#projectMemberMenu", function(){
		loadProjectMemberList();
	});
	
	//邀请项目成员处输入框输入时查询空间成员列表
	$(document).on("input", "#inviteProjectMember", function(){
		var keyword = $(this).val().trim();
		jointMethods.loadSpaceMemberList(keyword);
	});
	
	//回车邀请项目成员
	$(document).on("keydown", "#inviteProjectMember", function(event){
		if(event.keyCode == 13){
			var spaceId = $("#checkedSpace").attr("space-id");
			var projectId = $("#checkedProject").attr("project-id");
			if(projectId){
				var inviteMemberArray = $(".invite-members-list > div");
				var userIdsArray = new Array();
				if(inviteMemberArray && inviteMemberArray.length > 0){
					$.each(inviteMemberArray, function(idx, item){
						userIdsArray.push($(item).attr("member-id"));
						$(item).remove();
					});
					var userIds = userIdsArray.join(";");
					var url = "/a/task/saveprojectmembers";
					var data = {"id":projectId, "userIds":userIds, "spaceId":spaceId};
					startUp.postFormData(url, data, function(resultMap){
						if(resultMap && resultMap.data){
							loadProjectMemberList();
						}
					});
				}
			}
		}
	});
	
	//删除项目成员
	$(document).on("click",".delete-project-member-option-select", function(){
		var url = "/a/task/deleteprojectmember";
		This = this;
		var userId = this.getAttribute("user-id");
		var projectId = $("#checkedProject").attr("project-id");
		if(userId){
			commonMethods.showConfirmNav("是否确定要删除该成员?",function(){
				startUp.postAsyncData(url, {"projectId":projectId,"userId":userId}, function(data){
					if(data.data){
						$(This).parent("div.row").remove();
					}
				});
			},"no");
		}
	});
	
	//收藏、取消收藏项目
	$(document).on("click", ".favoriteProjectEach", function(){
		var favoriteProjectId = $(this).attr("id");
		if(favoriteProjectId){
			var favoriteProjectIdArray = favoriteProjectId.split("-");
			if(favoriteProjectIdArray && favoriteProjectIdArray.length == 2){
				var projectId = favoriteProjectIdArray[1];
				var url =  "/a/bookmark/saveordeletebookmark";
				var title = constants.bookmarkProjectType;
				var spaceId = $("#checkedSpace").attr("space-id");
				var data = {"type":"0", "resourceId":projectId,"title":title,"spaceId":spaceId};
				startUp.postAsyncData(url, data, function(resultMap){
					if(resultMap && resultMap.data){
						var item = resultMap.data;
						var menuProjectId = $("#checkedProject").attr("project-id");
						if($("#favoriteProject-" + item.resourceId).hasClass("sicon-star-empty")){//收藏项目
							$("#favoriteProject-" + item.resourceId).removeClass("sicon-star-empty").addClass("sicon-star").attr("title", "取消收藏");
							$("#pddm-" + item.resourceId).empty().append(jointView.projectMenuOption("1"));
							if(menuProjectId == item.resourceId){
								$("#checkedProject").find("ul.dropdown-menu").empty().append(jointView.projectMenuOption("1"));
							}
						}else{//取消收藏项目
							$("#favoriteProject-" + item.resourceId).removeClass("sicon-star").addClass("sicon-star-empty").attr("title", "添加收藏");
							$("#pddm-" + item.resourceId).empty().append(jointView.projectMenuOption("0"));
							if(menuProjectId == item.resourceId){
								$("#checkedProject").find("ul.dropdown-menu").empty().append(jointView.projectMenuOption("0"));
							}
						}
					}
				});
			}
		}
		return false;
	});
	
	//菜单收藏项目
	$(document).on("click", ".project-favorite", function(){
		var projectId = getProjectIdFromDifferentMenu(this);
		if(projectId){
			var url =  "/a/bookmark/saveordeletebookmark";
			var title = constants.bookmarkProjectType;
			var spaceId = $("#checkedSpace").attr("space-id");
			var data = {"type":"0", "resourceId":projectId,"title":title,"spaceId":spaceId};
			startUp.postAsyncData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var item = resultMap.data;
					var menuProjectId = $("#checkedProject").attr("project-id");
					if($("#favoriteProject-" + item.resourceId).hasClass("sicon-star-empty")){//收藏项目
						$("#favoriteProject-" + item.resourceId).removeClass("sicon-star-empty").addClass("sicon-star").attr("title", "取消收藏");
						$("#pddm-" + item.resourceId).empty().append(jointView.projectMenuOption("1"));
						if(menuProjectId == item.resourceId){
							$("#checkedProject").find("ul.dropdown-menu").empty().append(jointView.projectMenuOption("1"));
						}
					}else{//取消收藏项目
						$("#favoriteProject-" + item.resourceId).removeClass("sicon-star").addClass("sicon-star-empty").attr("title", "添加收藏");
						$("#pddm-" + item.resourceId).empty().append(jointView.projectMenuOption("0"));
						if(menuProjectId == item.resourceId){
							$("#checkedProject").find("ul.dropdown-menu").empty().append(jointView.projectMenuOption("0"));
						}
					}
				}
			});
		}
		return false;
	});
	
	//菜单取消收藏项目
	$(document).on("click", ".project-unfavorite", function(){
		var projectId = getProjectIdFromDifferentMenu(this);
		if(projectId){
			var url =  "/a/bookmark/saveordeletebookmark";
			var title = constants.bookmarkProjectType;
			var spaceId = $("#checkedSpace").attr("space-id");
			var data = {"type":"0", "resourceId":projectId,"title":title,"spaceId":spaceId};
			startUp.postAsyncData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var item = resultMap.data;
					var menuProjectId = $("#checkedProject").attr("project-id");
					if($("#favoriteProject-" + item.resourceId).hasClass("sicon-star-empty")){//收藏项目
						$("#favoriteProject-" + item.resourceId).removeClass("sicon-star-empty").addClass("sicon-star").attr("title", "取消收藏");
						$("#pddm-" + item.resourceId).empty().append(jointView.projectMenuOption("1"));
						if(menuProjectId == item.resourceId){
							$("#checkedProject").find("ul.dropdown-menu").empty().append(jointView.projectMenuOption("1"));
						}
					}else{//取消收藏项目
						$("#favoriteProject-" + item.resourceId).removeClass("sicon-star").addClass("sicon-star-empty").attr("title", "添加收藏");
						$("#pddm-" + item.resourceId).empty().append(jointView.projectMenuOption("0"));
						if(menuProjectId == item.resourceId){
							$("#checkedProject").find("ul.dropdown-menu").empty().append(jointView.projectMenuOption("0"));
						}
					}
				}
			});
		}
		return false;
	});
	
	//菜单存档项目
	$(document).on("click", ".project-archive", function(){
		var projectId = getProjectIdFromDifferentMenu(this);
		if(projectId){
			var url = "/a/task/updatestatusbyprojectid";
			var data = {"id":projectId, "status":"2"};//存档项目的status="2"
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$("#projectItemsUl").find("#project-" + resultMap.data.id).remove();
					$("#projectItemsUl > li:first-child").click();
				}
			});
		}
	});
	
	//菜单取消存档项目
	$(document).on("click", ".project-unarchive", function(){
		var projectId = getProjectIdFromDifferentMenu(this);
		if(projectId){
			var url = "/a/task/updatestatusbyprojectid";
			var data = {"id":projectId, "status":"0"};//存档项目的status="0"
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$("#archiveProjectItemsUl").find("#project-" + resultMap.data.id).remove();
					$("#archiveProjectItemsUl > li:first-child").click();
				}
			});
		}
	});
	
	//删除项目
	$(document).on("click", ".project-delete", function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		var projectId = getProjectIdFromDifferentMenu(this);
		if(projectId){
			var yz_url = "/a/task/findOneProjectTaskCount";
			startUp.postFormData(yz_url, {"id":projectId}, function(data){
				if(data.result>0){
					commonMethods.showConfirmNav("项目下的任务也将一起删除，是否确定要删除项目?",function(){
						var url = "/a/task/deleteproject";
						var data = {"id":projectId, "spaceId":spaceId};
						startUp.postFormData(url, data, function(resultMap){
							if(resultMap && resultMap.data){
								$("#projectItemsUl, #archiveProjectItemsUl").find("#project-" + resultMap.data.id).remove();
								commonMethods.operatResultAlert('删除成功!',1);
								//关闭任务详细页
								if(!$("#task_details").hasClass("task-details-hide")){
									$("#task_details .hideMenu-btn").click();
								}
								$("#taskItemsTbody").empty();
								$("#checkedProject").attr("project-id", "").find(".project-title").text("项目名称");
								$("#checkedProject").find(".dropdown").hide();
							}
						});
					},"no");
				}else{
					commonMethods.showConfirmNav("是否确定要删除项目?",function(){
						var url = "/a/task/deleteproject";
						var data = {"id":projectId, "spaceId":spaceId};
						startUp.postFormData(url, data, function(resultMap){
							if(resultMap && resultMap.data){
								$("#projectItemsUl, #archiveProjectItemsUl").find("#project-" + resultMap.data.id).remove();
								commonMethods.operatResultAlert('删除成功!',1);
								//关闭任务详细页
								if(!$("#task_details").hasClass("task-details-hide")){
									$("#task_details .hideMenu-btn").click();
								}
								$("#taskItemsTbody").empty();
								$("#checkedProject").attr("project-id", "").find(".project-title").text("项目名称");
								$("#checkedProject").find(".dropdown").hide();
							}
						});
					},"no");
				}
			});
		}
	});
	
	//复制项目模态框
	$('#CopyProject').on('shown.bs.modal',function(){
		var oldTitle = $("#checkedProject").children("span.project-title").html();
		var title = $("#copy-project-title").val(oldTitle+"-副本");
		
		if(!$("#copy-project-description").parent("label.sicon-checkbox").hasClass("selected")){
			$("#copy-project-description").parent("label.sicon-checkbox").click();
		}
		if(!$("#copy-project-user-id").parent("label.sicon-checkbox").hasClass("selected")){
			$("#copy-project-user-id").parent("label.sicon-checkbox").click();
		}
		if(!$("#copy-project-task").parent("label.sicon-checkbox").hasClass("selected")){
			$("#copy-project-task").parent("label.sicon-checkbox").click();
		}
		if(!$("#copy-project-member").parent("label.sicon-checkbox").hasClass("selected")){
			$("#copy-project-member").parent("label.sicon-checkbox").click();
		}
		
	});
	//复制项目
	$(document).on("click", "#submit-to-copy-projet", function(){
		var id = $("#checkedProject").attr("project-id");
		var spaceId = $("#checkedSpace").attr("space-id");
		var title = $("#copy-project-title").val();
		
		var description = "";
		var userId = "";
		var task = "";
		var members = "";
		if($("#copy-project-description").is(':checked')){description = "1";}
		if($("#copy-project-user-id").is(':checked')){userId = "1";}
		if($("#copy-project-task").is(':checked')){task = "1";}
		if($("#copy-project-member").is(':checked')){members = "1";}
		
		var url = "/a/task/copyProject";
		var data = {"id":id,"title":title,"description":description,"userId":userId,"task":task,"members":members,"spaceId":spaceId};
		
		if(id){
			if(title){
				startUp.postAsyncData(url, data, function(resultMap){
					if(resultMap.result){
						$("#CopyProject").modal("hide");
						loadProjectList("#projectItemsUl", "0", "", true);
					}
				});
			}
		}
	});
	
	//创建项目下任务
	$(document).on("click", ".add-task-nav-btn", function(){
		var title = $("#taskTitleInput").val().trim();
		if(!title){
			commonMethods.showAlertNav("标题不能为空!");
			return ;
		}else if(title.length > 50){
			commonMethods.showAlertNav("标题超出字数!");
			return ;
		}
		var spaceId = $("#checkedSpace").attr("space-id");
		var projectId = $("#checkedProject").attr("project-id");
		if(spaceId && projectId){
			//设置任务负责人
			var ownerId = $("#checkedUser").attr("user-id");
			var ownerName = $("#checkedUser").find("span.user-name").attr("title");
			var aite = "false";
			if($(".add-task-nav").find(".members").length == 1){
				ownerId = $(".add-task-nav").find(".members").attr("member-id");
				ownerName = $(".add-task-nav").find(".members").attr("title");
				aite = "true";
			}
			var url = "/a/task/savetask";
			var data = {"spaceId":spaceId, "projectId":projectId, "title":title, "user.id":ownerId, "user.name":ownerName, "aite":aite};
			startUp.postAsyncData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$(".set-task-who").remove();
					var htmlStr = jointView.taskEach(null, resultMap.data);
					$("#taskItemsTbody").prepend(htmlStr);
					$("#taskTitleInput").val("");
					dynamic.loadLastTaskRecord();
				}
			});
		}
	});
	
	//回车创建项目下任务
	$(document).on("keydown", "#taskTitleInput", function(event){
		if(event.keyCode == "13"){
			var title = $("#taskTitleInput").val().trim();
			if(!title){
				commonMethods.showAlertNav("标题不能为空!");
				return ;
			}else if(title.length > 50){
				commonMethods.showAlertNav("标题超出字数!");
				return ;
			}
			var spaceId = $("#checkedSpace").attr("space-id");
			var projectId = $("#checkedProject").attr("project-id");
			if(spaceId && projectId){
				//设置任务负责人
				var ownerId = $("#checkedUser").attr("user-id");
				var ownerName = $("#checkedUser").find("span.user-name").attr("title");
				var aite = "false";
				if($(".add-task-nav").find(".members").length == 1){
					ownerId = $(".add-task-nav").find(".members").attr("member-id");
					ownerName = $(".add-task-nav").find(".members").attr("title");
					aite = "true";
				}
				var url = "/a/task/savetask";
				var data = {"spaceId":spaceId, "projectId":projectId, "title":title, "user.id":ownerId, "user.name":ownerName, "aite":aite};
				startUp.postAsyncData(url, data, function(resultMap){
					if(resultMap && resultMap.data){
						$(".set-task-who").remove();
						var htmlStr = jointView.taskEach(null, resultMap.data);
						$("#taskItemsTbody").prepend(htmlStr);
						$("#taskTitleInput").val("");
						dynamic.loadLastTaskRecord();
					}
				});
			}
		}
	});
	
	//按筛选条件查询项目下任务列表
	$(document).on("click", "#unDoneTaskList, #doneTaskList, #createTaskList, #ownerTaskList, #allTaskList", function(){
		//首先关闭任务详细页
		if(!$("#task_details").hasClass("task-details-hide")){
			$("#task_details .hideMenu-btn").click();
		}
		//取消其它条件的选中样式,当前选中想添加选中样式
		$(this).parent("div.task-filter").find("span.checked").removeClass("checked");
		$(this).addClass("checked");
		
		var spaceId = $("#checkedSpace").attr("space-id");
		var filterType = $(this).attr("id");
		var projectId = $("#checkedProject").attr("project-id");
		if(projectId){//查询项目下的任务
			var userId = "";
			var status = "";
			var createById = "";
			if(filterType == "unDoneTaskList"){
				status = "6";
			}else if(filterType == "doneTaskList"){
				status = "7";
			}else if(filterType == "createTaskList"){
				createById = $("#checkedUser").attr("user-id");
			}else if(filterType == "ownerTaskList"){
				userId = $("#checkedUser").attr("user-id");
			}else if(filterType == "allTaskList"){
			}
			var url = "/a/task/findtasklist";
			var data = {"projectId":projectId, "user.id":userId, "status":status, "createBy.id":createById};
			jointMethods.loadTaskList(url, data);
		}
	});
	
	//任务列表项任务标题同步输入
	$(document).on("input", ".taskEachTitleEach", function(){
		$("#detailTaskTitle-" + $(this).attr("id").split("-")[1]).text($(this).val());
	});
	
	//修改任务标题
	$(document).on("blur", ".taskEachTitleEach", function(){
		var taskId = $(this).attr("id").split("-")[1];
		var originalValue = $(this).attr("original");
		var newTitle = $(this).val().trim();
		jointMethods.updateTitle(taskId, originalValue, newTitle);
	});
	
	//标记任务完成
	$(document).on("click", ".taskStatusEach", function(){
		$taskStatusEach = $(this);
		var spaceId = $("#checkedSpace").attr("space-id");
		var taskId = $taskStatusEach.attr("id").split("-")[1];
		if(spaceId && taskId){
			var url = "/a/task/updatestatusbytaskid";
			var data = {"id":taskId, "spaceId":spaceId};
			startUp.postAsyncData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$("#taskStatus-" + taskId).toggleClass("completed");
					$("#detailTaskStatus-" + taskId).toggleClass("completed");
					dynamic.loadLastTaskRecord();
				}
			});
		}
		return false;
	});
	
});



