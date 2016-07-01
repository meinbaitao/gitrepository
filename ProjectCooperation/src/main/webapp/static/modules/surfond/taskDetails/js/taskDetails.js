$(function(){
	
	////////////////////////以下是事件的注册
	
	//点击任务时显示任务详细页
	$(document).on("click", ".taskEach", function(){
		$("#task_details .hideMenu-btn").html("&gt;");
		var taskEachId = $(this).attr("id");
		if(taskEachId){
			var taskEachIdArray = taskEachId.split("-");
			if(taskEachIdArray && taskEachIdArray.length == 2){
				var taskId = taskEachIdArray[1];
				taskDetailsView.showTaskDetail(taskId);
			}
		}
	});
	
	//任务详细页任务标题同步输入
	$(document).on("input", ".task-details-info .task-detail-title .taskTitle", function(){
		$("#taskEachTitle-" + $(this).attr("id").split("-")[1]).val($(this).text());
	});
	
	//修改任务标题
	$(document).on("blur", ".task-details-info .task-detail-title .taskTitle", function(){
		var taskId = $(this).attr("id").split("-")[1];
		var originalValue = $(this).attr("original");
		var newTitle = $(this).text().trim();
		jointMethods.updateTitle(taskId, originalValue, newTitle);
		if(newTitle){
			$(".calendar-color-"+taskId).attr("title",newTitle);
			$(".calendar-color-"+taskId).html(newTitle);
		}else{
			$(".calendar-color-"+taskId).attr("title","未命名");
			$(".calendar-color-"+taskId).html("未命名");
		}
	});
	
	//修改任务描述
	$(document).on("blur", ".task-details-info .task-description .task-des-content", function(){
		var taskId = $(this).attr("id").split("-")[1];
		var originalValue = $(this).attr("original");
		var newDescription = $(this).html().trim();
		//首先校验输入
		if(!newDescription){
			//commonMethods.showAlertNav("描述不能为空!");
			$(this).html("输入任务描述！");
			return ;
		}
		
		if(originalValue != newDescription){//任务描述发生改变,需要修改任务描述
			var spaceId = $("#checkedSpace").attr("space-id");
			var dynamicDescription = $(this).text();
			var url = "/a/task/updatedescriptionbytaskid";
			var data = {"id":taskId, "description":newDescription, "spaceId":spaceId, "dynamicDescription":dynamicDescription};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){//修改任务描述成功,将修改后的值设置到描述输入框"original"属性中
					$("#detailTaskDescription-" + taskId).attr("original", newDescription);
					jointMethods.loadLastTaskRecord();
				}
			});
		}
	});
	
	//标记任务完成
	$(document).on("click", ".detailTaskStatus", function(){
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
					jointMethods.loadLastTaskRecord();
				}
			});
		}
	});
	
	//添加、修改任务所属项目前查询项目列表
	$(document).on("click", ".toolbar .operate-tags .project-belong", function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		if(spaceId){
			$("#taskProjectItemsUl").empty();
			var url = "/a/task/findallprojectlist";
			var data = {"spaceId":spaceId, "status":"0"};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var projectId = $("#checkedProject").attr("project-id");
					var htmlStr = "";
					$.each(resultMap.data, function(idx, item){
						if(projectId != item.id){
							htmlStr += "<li class='detailProjectEach' project-id='" + item.id + "'>" + item.title + "</li>";
						}
					});
					$("#taskProjectItemsUl").append(htmlStr);
					if("" != htmlStr){
						$("#taskProjectItemsUl").siblings("span.project-eidt-click").click();	
					}
				}
			});
		}
	});
	
	//添加、修改任务所属项目
	$(document).on("click", ".detailProjectEach", function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		var taskId = $("#task_details").attr("task-id");
		var projectId = $(".operate-tags .project-belong").attr("project-id");
		var newProjectId = $(this).attr("project-id");
		var newProjectTitle = $(this).text();
		if(spaceId && taskId && projectId && newProjectId){//修改任务所属项目
			var url = "/a/task/updatebelongtaskproject";
			var data = {"id":taskId, "spaceId":spaceId, "projectId":projectId, "newProjectId":newProjectId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$(".operate-tags .project-belong").attr("project-id", newProjectId).find(".project-replace").text(newProjectTitle);
					$(".operate-tags .project-belong").find("div.dropdown").removeClass("open");
					$("#task-" + taskId).find(".sicon-project18").text(newProjectTitle);
				}
			});
		}else if(spaceId && taskId && !projectId && newProjectId){
			var url = "/a/task/addbelongtaskproject";
			var data = {"id":taskId, "spaceId":spaceId, "projectId":projectId, "newProjectId":newProjectId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$(".operate-tags .project-belong").attr("project-id", newProjectId).find(".project-replace").text(newProjectTitle);
					$(".operate-tags .project-belong").find("div.dropdown").removeClass("open");
					$("#task-" + taskId).find(".taskEachTitleEach").after("<div class='project-name'><span class='sicon-project18'>" + newProjectTitle + "</span></div>");
				}
			});
		}
	});
	
	//修改任务负责人前查询空间成员列表
	$(document).on("input", ".project-members-list .textarea_members", function(){
		var keyword = $(this).val().trim();
		jointMethods.loadSpaceMemberList(keyword);
	});
	
	//任务点赞
	$(document).on("click", ".operate-tags .praiseTask", function(){
		var $praiseForTask = $(this);
		var taskId = $praiseForTask.attr("id").split("-")[1];
		if(taskId){
			var url = "/a/task/praisefortask";
			var data = {"id":taskId};
			startUp.postAsyncData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					//(点赞/取消点赞)成功,更换任务详细页菜单"点赞"样式
					var praiseAmount = Number($("#praiseForTask-" + taskId).find("span.count").text());
					if($praiseForTask.children("span").hasClass("sicon-thumbs-empty")){
						$praiseForTask.attr("title", "取消点赞").children("span").removeClass("sicon-thumbs-empty").addClass("sicon-thumbs");
						praiseAmount++;
					}else{
						$praiseForTask.attr("title", "点个赞").children("span").removeClass("sicon-thumbs").addClass("sicon-thumbs-empty");
						praiseAmount--;
					}
					jointMethods.loadLastTaskRecord();
					//检查任务列表对应任务项点赞数,若为0则隐藏,若大于0则显示
					$("#praiseForTask-" + taskId).find("span.count").text(praiseAmount);
					if(praiseAmount == 0){
						$("#praiseForTask-" + taskId).addClass('null');
					}else{
						$("#praiseForTask-" + taskId).removeClass('null');
					}
				}
			});
		}
	});
	
	//标签标题输入框输入时查询标签列表
	$(document).on("input", "#tagsTitle", function(){
		$("#tagsTitleBtn").attr("disabled", "disabled");
		var spaceId = $("#checkedSpace").attr("space-id");
		var tagsTitle = $(this).val().trim();
		if(spaceId){
			$("#tagsItemsLi").empty();
			var url ="/a/tags/findtagslistbyspaceid";
			var data ={"spaceId":spaceId, "title":tagsTitle};
			startUp.postAsyncData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					if(resultMap.data.length > 0){
						var hasTag = false;
						var selectedTagsArray = $("#selected-tags > span");
						var htmlStr = "";
						$.each(resultMap.data, function(index, data){
							if(data.title == tagsTitle){
								hasTag = true;
							}
							var selectedCurrent = "";
							$.each(selectedTagsArray, function(index, page_data){
								if(data.id == $(page_data).attr("id").split("-")[1]){
									selectedCurrent = " selected current";
								}
							});
							htmlStr += "<a id='optionTags-" + data.id + "' href='javascript:void(0);' class='task-tags-lists " + selectedCurrent +"' data-role='none'>";
							htmlStr += "<span class='icon-circle'></span>" + data.title;
							htmlStr += "<span class='icon-ok'></span>";
							htmlStr += "</a>";
						});
						if(!hasTag && tagsTitle){//没有与输入同名的标签，添加按钮可用
							$("#tagsTitleBtn").removeAttr("disabled");
						}
						$("#add-task-tags-menu").find("#tagsItemsLi").remove();
						$("#add-task-tags-menu").append("<li id='tagsItemsLi' class='task-tags-lists'></li>");
						$("#tagsItemsLi").append(htmlStr);
					}else{
						if(tagsTitle){
							$("#tagsTitleBtn").removeAttr("disabled");
						}else{
							$("#tagsTitleBtn").attr("disabled", "disabled");
						}
					}
				}
			});
		}
	});
	
	//创建标签
	$(document).on("click", "#tagsTitleBtn", function(){
		$("#tagsTitleBtn").attr("disabled", "disabled");
		var spaceId = $("#checkedSpace").attr("space-id");
		var tagsTitle = $("#tagsTitle").val().trim();
		if(spaceId && tagsTitle){
			tagsTitle = startUp.subString(tagsTitle, 8);
			var url ="/a/tags/savetags";
			var data ={"spaceId":spaceId, "title":tagsTitle};
			startUp.postAsyncData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var htmlStr = "";
					htmlStr += "<a id='optionTags-" + resultMap.data.id + "' href='javascript:void(0);' class='task-tags-lists' data-role='none'>";
					htmlStr += "<span class='icon-circle'></span>" + resultMap.data.title;
					htmlStr += "<span class='icon-ok'></span>";
					htmlStr += "</a>";
					$("#tagsItemsLi").prepend(htmlStr);
					$("#optionTags-" + resultMap.data.id).click();
				}
			});
		}
		$("#tagsTitleBtn").removeAttr("disabled");
	});
	
	//添加任务标签
	$(document).on("click", "#tagsItemsLi .task-tags-lists", function(){
		if($(this).hasClass("selected")){
			$("#add-task-tags-menu").hide();
		}else{//将选择的标签添加到详细页面上
			var $optionTagsEach = $(this);
			var taskId = $("#task_details").attr("task-id");
			var tagsId = $optionTagsEach.attr("id").split("-")[1];
			var tagsTitle = $optionTagsEach.text();
			var url ="/a/tags/savetagstask";
			var data ={"id":tagsId, "taskId":taskId};
			startUp.postAsyncData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					//将选中的标签添加选中样式
					$optionTagsEach.addClass("selected");
					//任务详细页添加标签
					var htmlStr = "<span class='tags' id='selectedTags-" + tagsId + "' title='" + tagsTitle + "'>" + startUp.subString(tagsTitle, 8) + "<span class='deleteTaskTags icon-remove'></span></span>";
					$("#selected-tags").append(htmlStr);
					//任务列表项添加标签
					var tagsSize = $("#taskItemsTbody").find("tr[id*='task-" + taskId + "']").find("span.tags").size();
					var tagStr = "";
					if(tagsSize < 2){
						tagStr += "<span class='tags' title='" + tagsTitle + "' id='tagsTask-" + tagsId + "'>" + startUp.subString(tagsTitle, 8) + "</span>";
					}
					$("#taskItemsTbody").find("tr[id*='task-" + taskId + "']").find("span.sicon-notification").after(tagStr);
					if(!$("#selected-tags").is(":visible")){
						$("#selected-tags").show();
					}
					$("#add-task-tags-menu").hide();
				}
			});
		}
	});
	
	//设置添加标签页元素
	$(document).on("click", "#add-task-tags", function(){
		$("#tagsTitle").val("");
		$("#tagsTitleBtn").attr("disabled", "disabled");//点击菜单"添加任务标签"是默认"添加"按钮不可用
		$("#tagsItemsLi").empty();
	});
	
	//删除任务标签
	$(document).on("click", ".deleteTaskTags", function(){
		var tagsId = $(this).parent().attr("id").split("-")[1];
		var taskId = $("#task_details").attr("task-id");
		if(taskId && tagsId){//删除任务标签
			var url ="/a/tags/deletetagstask";
			var data ={"id":tagsId, "taskId":taskId};
			startUp.postAsyncData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$("#selected-tags").find("#selectedTags-" + tagsId).remove();
					$("#taskItemsTbody").find("tr[id*='task-" + taskId + "']").find("div.text-line-tags").find("span[id='tagsTask-" + tagsId + "']").remove();
					//判断标签显示位置是否还有标签项，若无标签项则隐藏标签显示
					if($("#selected-tags > span").size() == 0){
						$("#selected-tags").hide();
					}
				}
			});
		}
	});
	
	//复制任务
	$(document).on("click","#copy-task-to-project",function(){
		var id = $("#task_details").attr("task-id");
		var spaceId = $("#checkedSpace").attr("space-id");
		var title = $("#copy-task-title").val();
		var description = "";
		var userId = "";
		var projectId = "";
		var dueDate = "";
		
		var subTask = "";
		var attachment = "";
		var tags = "";
		if($("#copy-description").is(':checked')){description = "1";}
		if($("#copy-user").is(':checked')){userId = "1";}
		if($("#copy-sub-task").is(':checked')){subTask = "1";}
		if($("#copy-attachment").is(':checked')){attachment = "1";}
		if($("#copy-tags").is(':checked')){tags = "1";}
		if($("#copy-parent-id").is(':checked')){projectId = "1";}
		if($("#copy-dute-date").is(':checked')){dueDate = "1";}
		
		var url = "/a/task/copyTask";
		var data = {"id":id,"title":title,"description":description,"userId":userId,"subTask":subTask,"attachment":attachment,"tags":tags,"projectId":projectId,"dueDate":dueDate,"spaceId":spaceId};
		
		if(id){
			if(title){
				startUp.postAsyncData(url, data, function(resultMap){
					if(resultMap.result){
						var menuType = $("#menuType").val();
						if("project" == menuType){
							$("#allTaskList").click();
						}else if("workspace" == menuType){
							task.kanBanTaskFilter();
						}else if("calendar" == menuType){
							$('#calendar').fullCalendar('destroy'); 
							full_calendar();
						}
						$("#CopyTask").modal("hide");
						commonMethods.operatResultAlert('复制成功!',1);
					}
				});
			}
		}
	});
	
	//删除任务
	$(document).on("click", ".operate-tags .deleteTask", function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		var taskId = $(this).attr("id").split("-")[1];
		if(taskId){
			commonMethods.showConfirmNav("是否确定要删除任务?",function(){
				var url = "/a/task/deletetask";
				var data = {"id":taskId, "spaceId":spaceId};
				startUp.postFormData(url, data, function(resultMap){
					if(resultMap && resultMap.data){
						$("#task-" + resultMap.data.id).remove();
						//关闭任务详细页
						if(!$("#task_details").hasClass("task-details-hide") && $(".list-container-nav").is(":visible")){
							$("#task_details .hideMenu-btn").click();
						}
						$("#Add_Task").modal("hide");
						$('#calendar').fullCalendar('destroy'); 
						full_calendar();
					}
				});
			},"no");
		}
	});
	
	//加载任务评论列表
	$(document).on("click","#task-comment-list",function(){
		var taskId = $("#task_details").attr("task-id");	//点击任务评论按钮查看任务列表
		if(taskId){
			var url = "/a/comment/list";
			if(taskId){
				startUp.postAsyncData(url,{"resourceId":taskId},function(data){
					$(".modal-show-this-task-comment-list").empty();
					var teamHtml = "";
					if(data){
						$.each(data,function(k,v){
							teamHtml += taskDetailsView.showTaskCommentList(null,v);
						});
					}
					$(".modal-show-this-task-comment-list").append(teamHtml);
					add_qqFace();//初始化表情插件
				});
			}
		}
	});
	
	//发表任务评论
	$(document).on("click","#submit-task-comment",function(){
		var url = "/a/comment/save";
		var taskId = $("#task_details").attr("task-id");	//当前任务ID
		var spaceId = $("#checkedSpace").attr("space-id");	//空间ID
		var metionmember = "";								//@成员的组装
		var str = $("#task-comment-description").html();	//评论输入框信息
		$str=$("<div></div>");
		$str.html(str);
		var as=$str.find("input");
		for(var i=0;i<as.length;i++){						//解析@成员
			var text = $(as[i]).val();
			var email = $(as[i]).attr("email");
			var userId = $(as[i]).attr("userId");
			$(as[i]).after("[metion_"+text+"_surfond_"+email+"]");
			metionmember += userId+";";
			$(as[i]).remove();
		}
		var ps=$str.find("img");
		for(var i=0;i<ps.length;i++){						//解析表情
			$(ps[i]).after($(ps[i]).attr("name"));
			$(ps[i]).remove();
		}
		var fileList = $("#submit-task-comment-attachment").html();	
		var description = $str.text();
		
		var id = $("#task-attachment-uuid").val();
		if(!description){
			if(!fileList){
				commonMethods.showAlertNav('评论内容不能为空!');
				return;
			}
		}else{
			if(description.length>2000){
				commonMethods.showAlertNav('内容过长!');
				return;
			}
		}
		if(taskId){
			startUp.postAsyncData(url,{"id":id,"resourceId":taskId,"description":description,"spaceId":spaceId,"metionmember":metionmember},function(data){
				$(".modal-show-this-task-comment-list").append(taskDetailsView.showTaskCommentList(null,data));
				$("#task-comment-description").html("");
				$("#submit-task-comment-attachment").html("");
				$("#task-attachment-uuid").val("");
			});
		}
	});
	
	//显示@成员
	$(document).on("click",".clickShowMembers",function(){
		var spaceId = $("#checkedSpace").attr("space-id");	//空间ID
		
		if(!spaceId){return;}
			var teamId = $("#judgeSpaceOrTeamConversation").attr("teamid");//获取成员类型
			$("#mentionMember").empty();
			$(".to-include-metion-member").empty();
			var status = this.getAttribute("status");				
			if(!status){
				if(!$(this).parent("div.emotion-line").hasClass("open")){//话题页面  评论@成员是个列表，共用一个页面上的@组装
					$(this).parent("div.emotion-line").addClass("open");
				}
			}
			var url = "";
			var data = "";
			if(teamId){		//话题页面
				url = "/a/team/findAllMemberOfOneTeam";
				data = {"id":teamId};
				startUp.postAsyncData(url, data, function(resultMap){
					if(resultMap.result){
						var htmlStr = "";
						$.each(resultMap.result, function(idx, item){
							htmlStr += jointView.spaceMemberEach(idx, item);
						});
						$(".to-include-metion-member").append("<div class='space-mention-member'>"+htmlStr+"</div>");
						$("#mentionMember").append(htmlStr);
					}
				});
			}else{		//收藏页面-话题
				teamId = $("#show-bookmark-group-list").attr("teamid");
				if(teamId){
					url = "/a/team/findAllMemberOfOneTeam";
					data = {"id":teamId};
					startUp.postAsyncData(url, data, function(resultMap){
						if(resultMap.result){
							var htmlStr = "";
							$.each(resultMap.result, function(idx, item){
								htmlStr += jointView.spaceMemberEach(idx, item);
							});
							$(".to-include-metion-member").append("<div class='space-mention-member'>"+htmlStr+"</div>");
							$("#mentionMember").append(htmlStr);
						}
					});
				}else{	//任务判断
					teamId = $("#task_details").attr("teamid");
					if(teamId){
						url = "/a/team/findAllMemberOfOneTeam";
						data = {"id":teamId};
						startUp.postAsyncData(url, data, function(resultMap){
							if(resultMap.result){
								var htmlStr = "";
								$.each(resultMap.result, function(idx, item){
									htmlStr += jointView.spaceMemberEach(idx, item);
								});
								$(".to-include-metion-member").append("<div class='space-mention-member'>"+htmlStr+"</div>");
								$("#mentionMember").append(htmlStr);
							}
						});
					}else{
						url = "/a/space/findspacememberlist";
						data = {"id":spaceId, "keyword":""};
						startUp.postAsyncData(url, data, function(resultMap){
							if(resultMap && resultMap.data){
								var htmlStr = "";
								$.each(resultMap.data, function(idx, item){
									htmlStr += jointView.spaceMemberEach(idx, item);
								});
								$(".to-include-metion-member").append("<div class='space-mention-member'>"+htmlStr+"</div>");
								$("#mentionMember").append(htmlStr);
							}
						});
					}
				}
			}
			$("body").on("click",function(){
				$("div.emotion-line").removeClass("open");
			});
			
	});
	
	//加载子任务列表
	$(document).on("click", "#subTaskList", function(){
		var taskId = $("#task_details").attr("task-id");
		$("#subTaskItemsTbody").empty();
		if(taskId){
			var url = "/a/task/findsubtasklist";
			var data = {"parentId":taskId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var htmlStr = "";
					$.each(resultMap.data, function(idx, item){
						htmlStr += taskDetailsView.subTaskEach(idx, item);
					});
					$("#subTaskItemsTbody").append(htmlStr);
				}
			});
		}
	});
	
	//创建子任务
	$(document).on("click", ".add-subtask-btn", function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		var taskId = $("#task_details").attr("task-id");
		var title = $("#SubtaskTitleInput").val().trim();
		if(!title){
			commonMethods.showAlertNav("标题不能为空!");
			return ;
		}else if(title.length > 50){
			commonMethods.showAlertNav("标题超出字数!");
			return ;
		}
		
		if(spaceId && taskId){
			var url = "/a/task/savesubtask";
			var data = {"parentId":taskId, "spaceId":spaceId, "title":title};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var htmlStr = taskDetailsView.subTaskEach(null, resultMap.data);
					$("#subTaskItemsTbody").prepend(htmlStr);
					$("#SubtaskTitleInput").val("");
				}
			});
		}
	});
	
	//回车创建子任务
	$(document).on("keydown", "#SubtaskTitleInput", function(event){
		if(event.keyCode == "13"){
			var spaceId = $("#checkedSpace").attr("space-id");
			var taskId = $("#task_details").attr("task-id");
			var title = $("#SubtaskTitleInput").val().trim();
			if(!title){
				commonMethods.showAlertNav("标题不能为空!");
				return ;
			}else if(title.length > 50){
				commonMethods.showAlertNav("标题超出字数!");
				return ;
			}
			
			if(spaceId && taskId){
				var url = "/a/task/savesubtask";
				var data = {"parentId":taskId, "spaceId":spaceId, "title":title};
				startUp.postFormData(url, data, function(resultMap){
					if(resultMap && resultMap.data){
						var htmlStr = taskDetailsView.subTaskEach(null, resultMap.data);
						$("#subTaskItemsTbody").prepend(htmlStr);
						$("#SubtaskTitleInput").val("");
					}
				});
			}
		}
	});
	
	//修改子任务标题
	$(document).on("blur", ".subTaskTitleEach", function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		var subTaskId = $(this).attr("id").replace("subTaskTitle-", "");
		var newTitle = $(this).val();
		var originalValue = $(this).attr("original");
		if(!newTitle){
			commonMethods.showAlertNav("标题不能为空!");
			return ;
		}else if(newTitle.length > 50){
			commonMethods.showAlertNav("标题超出字数!");
			return ;
		}
		
		if(subTaskId){
			var url = "/a/task/updatetitlebytaskid";
			var data = {"id":subTaskId, "title":newTitle, "spaceId":spaceId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					//修改子任务标题成功后将新标题暂存到输入框original属性中
					$("#subTaskTitle-" + resultMap.data.id).attr("original", resultMap.data.title);
				}
			});
		}
	});
	
	//标记子任务完成
	$(document).on("click", ".subTaskStatusEach", function(){
		var $subTaskStatusEach = $(this);
		var spaceId = $("#checkedSpace").attr("space-id");
		var taskId = $subTaskStatusEach.attr("id").split("-")[1];
		if(taskId){
			var url = "/a/task/updatestatusbytaskid";
			var data = {"id":taskId, "spaceId":spaceId};
			startUp.postAsyncData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$subTaskStatusEach.toggleClass("completed");
				}
			});
		}
	});
	
	//删除子任务
	$(document).on("click", ".deleteSubTaskEach", function(){
		var subTaskId = $(this).attr("id").split("-")[1];
		var spaceId = $("#checkedSpace").attr("space-id");
		commonMethods.showConfirmNav("是否确定要删除子任务?",function(){
			var url = "/a/task/deletetask";
			var data = {"id":subTaskId, "spaceId":spaceId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$("#subTask-" + subTaskId).remove();//移除子任务列表中对应的任务项
				}
			});
		},"no");
	});
	
	//上传任务附件
	$(document).on("click", "#add-task-file-upload", function() {
		  $("#uploadTaskFileForm").empty();							//清空附件区
		  var forms = "<form data-role='none' name='taskFileForm' method='post' enctype='multipart/form-data'><input type='file' style='display:none;' class='taskFiles' data-role='none'></form>";
		  $("#uploadTaskFileForm").append(forms);					//附件区手动添加表单元素（文件域）
		  $(".taskFiles").click();									//点击文件域按钮
		  $("input.taskFiles").one("change",function(){				//在文件域按钮触发change事件时上传文件
			  
			  if(this.files[0].size>10485760){						//最大上传文件不得超过10M/条
				  	commonMethods.showAlertNav("文件过大，最大上传10M的文件！");
					return;
				}
			    var resourceId = $("#task_details").attr("task-id");//任务ID
		  		var url = "/a/attachment/uploadFile?taskId="+resourceId+"&type="+resourceId+"&status=1";//请求服务路径和参数拼装
				var formdata = new FormData();						//序列化表单
				$.each(this.files,function(index,value){			//可多文件上传
					formdata.append("pic-"+index,value);
					var size = value.size;
					$("#show-task-attachment-list").append("<div class='converdation-files-upload-progress'><a class='file-style'>"+value.name+"</a><div id='loadingBox'><div id='progressLoading'></div></div></div>");
					$("#progressLoading").css("width",0).html("");	//进度条拼装
					var loading = $("#progressLoading")[0];
					var outer = $("#loadingBox")[0];
					var time = size/1000000;
					loadShow(loading,outer,time);					//进度条动态显示
				});
				startUp.fileUpload(url,formdata,function(result){
					$("input[type=file]").val("");	
					if(result){
						if(result=='out'){
							commonMethods.showAlertNav("上传附件过大!");
						}else{
							var json = eval('(' + result + ')');			//将返回的结果（字符串）转为json
							var fileLength = parseFloat(json.length);	
							var showLength = fileLength/1024;			
							var toLength = "";
							if(showLength>500){								//大于500k则用M作单位
								toLength = toDecimal(showLength/1024)+"M";
							}else{											//小于500k则用K作单位
								toLength = toDecimal(showLength)+"K";
							}
							var fileHtml = "";
							var attType = json.filename.substring((json.filename.lastIndexOf(".")+1)).toLowerCase();//获取文件后缀
							setTimeout(function(){							//定时器处理上传完成后进度条的清理
								$(".converdation-files-upload-progress").remove();
								if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
									fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath()+json.url+"' class='hide'><span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile'></span></a>";
								}else{										//附件时图片则有预览选择，否则没有
									fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+json.url+"' status='"+json._id+"' contenteditable='false' data-role='none'>"+json.filename+" ("+toLength+")<span title='删除文件' status='"+json._id+"' class='sicon-remove cancelFile' ></span></a>";
								}
								$("#show-task-attachment-list").append(fileHtml);
								if(resourceId){
									var url = "/a/attachment/getAttachmentByTaskIdToCount";
									startUp.postAsyncData(url,{"taskId":resourceId},function(data){
										if(data.count){
											$("#thisAttachmentCount").html("("+data.count+")");
										}else{
											$("#thisAttachmentCount").html("(0)");
										}
									});
								}
							},100);
						}
					}
				});
		  });
	});
	
	//显示任务附件列表
	$(document).on("click","#task-attachment-list",function(){	//点击切换到任务附件时
		var resourceId = $("#task_details").attr("task-id");		//获取当前任务ID
		if(resourceId){
			var url = "/a/attachment/findAttachmentListByResourceId";
			startUp.postAsyncData(url,{"taskId":resourceId},function(data){
				$("#show-task-attachment-list").empty();
				var str = "";
				if(data.result.length>0){
					str += taskDetailsView.showOneTaskAttachmentList(null,data.result);
				}
				if(str){
					$("#show-task-attachment-list").append(str);
				}
				$("#thisAttachmentCount").text("("+data.result.length+")");
			});
		}
	});
	
	//加载任务记录列表
	$(document).on("click", "#taskRecord", function(){
		$(".task_operatLog").empty();
		var taskId = $("#task_details").attr("task-id");
		if(taskId){
			var url = "/a/dynamic/findtaskrecordlist";
			var data = {"taskId":taskId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var htmlStr = "";
					htmlStr += taskDetailsView.startTaskRecordList();
					if(resultMap.data.length > 0){
						$.each(resultMap.data, function(idx, item){
							htmlStr += taskDetailsView.taskRecordEach(idx, item);
						});
					}else{
						htmlStr += "<li>";
						htmlStr += "	<div class='time-line'>";
						htmlStr += "		<span class='time'>" + "粤A5-20 13:14" + "</span>";
						htmlStr += "		<span class='circle1'>";
						htmlStr += "			<span class='sub-circle'></span>";
						htmlStr += "		</span>";
						htmlStr += "		<span class='log-content'>" + "该任务暂无记录" + "</span>";
						htmlStr += "	</div>";
						htmlStr += "</li>";
					}
					htmlStr += taskDetailsView.endTaskRecordList();
					$(".task_operatLog").append(htmlStr);
				}
			});
		}
	});
	
});