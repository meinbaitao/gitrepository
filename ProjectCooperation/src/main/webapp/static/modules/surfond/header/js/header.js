//查询未读消息总数设置是否显示红点
function findUnReadMessageCount(){
	var spaceId = $("#checkedSpace").attr("space-id");
	if(spaceId){
		var url = "/a/message/findunreadmessagecount";
		var data = {"spaceId":spaceId};
		startUp.postFormData(url, data, function(resultMap){
			if(resultMap.data > 0){
				$("#checkMessage").addClass("have-new");
			}else{
				$("#checkMessage").removeClass("have-new");
			}
		});
	}
}

$(function(){
	
	//加载空间列表
	var loadSpaceList = function(){
		var url = "/a/space/findspacelist";
		var data = {};
		startUp.postFormData(url, data, function(resultMap){
			if(resultMap && resultMap.data){
				var htmlStr = "";
				$.each(resultMap.data, function(idx, item){
					htmlStr += headerView.spaceEach(idx, item);
				});
				$("#spaceItemsUl").append(htmlStr);
			}
		});
	}
	
	//查询未读消息总数设置是否显示红点
	var findUnReadMessageCount = function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		if(spaceId){
			var url = "/a/message/findunreadmessagecount";
			var data = {"spaceId":spaceId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap.data > 0){
					$("#checkMessage").addClass("have-new");
				}else{
					$("#checkMessage").removeClass("have-new");
				}
			});
		}
	}
	
	loadSpaceList();//加载空间列表
	findUnReadMessageCount();//查询未读消息总数设置是否显示红点
	setInterval("findUnReadMessageCount()", 1000 * 60 * 2);//定时查询未读消息总数设置是否显示红点
	
	////////////////////////以下是事件的注册
	
	//切换空间
	$(document).on("click", ".spaceEach", function(){
		var spaceEachId = $(this).attr("id");
		if(spaceEachId){
			var spaceEachArray = spaceEachId.split("-");
			if(spaceEachArray && spaceEachArray.length == 2){
				var spaceId = spaceEachArray[1];
				$.cookie("spaceId", $("#checkedUser").attr("user-id") + "-" + spaceId, {expires:30, path:"/"});
				window.location.href = startUp.getRootPath() + "/a/index?spaceId=" + spaceId;
			}
		}
	});
	
	//空间设置模态窗加载完成后根据空间编号查询空间信息
	$(document).on("shown.bs.modal", "#Manage_Workspace", function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		if(spaceId){
			var url = "/a/space/findspace";
			var data = {"id":spaceId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var item = resultMap.data;
					$("#editSpaceForm").find("input[name='title']").val(item.title);
					$("#editSpaceForm").find("textarea[name='description']").val(item.description);
				}
			});
		}
	});
	
	//修改空间标题和描述
	$(document).on("click", "#editSpaceBtn", function(){
		var title = $("#editSpaceForm").find("input[name='title']").val().trim();
		var description = $("#editSpaceForm").find("textarea[name='description']").val().trim();
		//校验输入
		if(!title){
			commonMethods.showAlertNav("标题不能为空!");
			return ;
		}else if(title.length > 50){
			commonMethods.showAlertNav("标题超出字数!");
			return ;
		}
		if(description && description.length > 255){
			commonMethods.showAlertNav("描述超出字数!");
			return ;
		}
		
		var spaceId = $("#checkedSpace").attr("space-id");
		if(spaceId){
			var url = "/a/space/updatetitleanddescriptionbyid";
			var data = {"id":spaceId, "title":title, "description":description};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					window.location.href = startUp.getRootPath() + "/a/index?spaceId=" + resultMap.data.id;
				}
			});
		}
	});
	
	//创建空间
	$(document).on("click", "#newSpaceBtn", function(){
		var title = $("#newSpaceForm").find("input[name='title']").val().trim();
		var description = $("#newSpaceForm").find("textarea[name='description']").val().trim();
		var ownerId = $("#newSpaceForm").find("input[name='user.id']").val();
		//校验输入
		if(!title){
			commonMethods.showAlertNav("空间标题不能为空!");
			return ;
		}else if(title.length > 50){
			commonMethods.showAlertNav("空间标题超出字数!");
			return ;
		}
		if(description && description.length > 255){
			commonMethods.showAlertNav("空间描述超出字数!");
			return ;
		}
		
		$("#newSpaceForm").find("button.btn-gray").click();
		var url = "/a/space/savespace";
		var data = {"title":title, "description":description, "user.id":ownerId};
		startUp.postFormData(url, data, function(resultMap){
			if(resultMap && resultMap.data){
				$.cookie("spaceId", $("#checkedUser").attr("user-id") + "-" + resultMap.data.id, {expires:30, path:"/"});
				window.location.href = startUp.getRootPath() + "/a/index?spaceId=" + resultMap.data.id;
			}
		});
	});
	
	//快捷创建空间下的任务
	$(document).on("click", "#newSpaceTaskBtn", function(){
		var title = $("#newSpaceTaskForm").find("input[name='title']").val().trim();
		var description = $("#newSpaceTaskForm").find("textarea[name='description']").val().trim();
		if(!title){
			commonMethods.showAlertNav("任务标题不能为空!");
			return ;
		}else if(title.length > 50){
			commonMethods.showAlertNav("任务标题不能超出50个字符");
			return ;
		}
		var userId = $("#checkedUser").attr("user-id");
		var spaceId = $("#checkedSpace").attr("space-id");
		if(spaceId && userId){
			var url = "/a/task/savemytask";
			var data = {"title":title, "description":description, "user.id":userId, "spaceId":spaceId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$("#omnibutton_task").modal("hide");
					var menuType = $("#menuType").val();
					if("workspace" == menuType){
						var htmlStr = jointView.taskEach(null, resultMap.data);
						$("#taskItemsTbody").prepend(htmlStr);
					}else{
						commonMethods.operatResultAlert("创建任务成功,赶紧去工作台看看吧~~", 1);
					}
					$("#newSpaceTaskForm").find("input[name='title']").val("");
					$("#newSpaceTaskForm").find("textarea[name='description']").val("");
				}
			});
		}
	});
	
	//快捷创建空间下的项目
	$(document).on("click", "#newProjectQuickBtn", function(){
		var title = $("#newProjectQuickForm").find("input[name='title']").val().trim();
		var description = $("#newProjectQuickForm").find("textarea[name='description']").val().trim();
		if(!title){
			commonMethods.showAlertNav("项目名称不能为空!");
			return ;
		}else if(title.length > 50){
			commonMethods.showAlertNav("项目名称不能超出50个字!");
			return ;
		}
		var spaceId = $("#checkedSpace").attr("space-id");
		if(spaceId){
			var url = "/a/task/saveproject";
			var data = {"title":title, "description":description, "spaceId":spaceId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$("#omnibutton_project").modal("hide");
					var menuType = $("#menuType").val();
					if("project" == menuType){
						var projectStatus = $("#showDifferentProject").attr("project-status");
						if("0" == projectStatus){
							var htmlStr = jointView.projectEach(null, resultMap.data);
							$("#projectItemsUl").prepend(htmlStr);
						}else{
							$("#showDifferentProject").click();
						}
					}else{
						commonMethods.operatResultAlert("创建项目成功,赶紧去项目看看吧~~", 1);
					}
					$("#newProjectQuickForm").find("input[name='title']").val("");
					$("#newProjectQuickForm").find("textarea[name='description']").val("");
				}
			});
		}
	});
	
	//创建快捷话题
	$(document).on("click","#submit-modal-conversation-info",function(){
		var url = "/a/conversation/save";
		var title = $("#modal-conversation-title").val();
		var description = $("#modal-conversation-description").val();
		var spaceId = $("#checkedSpace").attr("space-id");
		if(title){
			if(title.length>50){return;}
			startUp.postAsyncData(url,{"title":title,"description":description,"resourceId":spaceId},function(data){
				$("#modal-conversation-title").val("");
				$("#modal-conversation-description").val("");
				$("#omnibutton_converse").modal("hide");
				var menuType = $("#menuType").val();
				if("theme" == menuType){
					$("#space-conversation-button").click();
				}else{
					commonMethods.operatResultAlert('发表成功，赶快到话题板块看看吧!',1);
				}
			});
		}else{
			commonMethods.showAlertNav('话题标题不能为空!');
		}
	});
	
	//提醒设置
	$(document).on("click", "#subscriptionMenu", function(){
		$("#subscriptionItemsDiv").empty();
		var url = "/a/message/findsubscription";
		var data = {};
		startUp.postFormData(url, data, function(resultMap){
			if(resultMap && resultMap.data){
				var htmlStr = "";
				var subscriptionMap = resultMap.data;
				if(subscriptionMap['subscriptionTypeList'].length > 0){
					var subscriptionTypeList = subscriptionMap['subscriptionTypeList'];
					$.each(subscriptionTypeList, function(idx, item){
						var subscriptionTypeArray = item.split("-");
						htmlStr += "<span class='tips'>*" + subscriptionTypeArray[0] + "</span>";
						var operateList = subscriptionMap[subscriptionTypeArray[1]];
						$.each(operateList, function(k, v){
							var operateArray = v.split("-");
							htmlStr += "<div class='form-group '>";
							htmlStr += "	<label class='col-sm-4 control-label'>" + operateArray[1] + "</label>";
							htmlStr += "	<div class='col-sm-4 '>";
							htmlStr += "		<label class='switch switch-weekday off' for='" + operateArray[0] + "'>";
							htmlStr += "			<input id='" + operateArray[0] + "' type='text' name='" + operateArray[0] + "' value='' />"; 
							htmlStr += "			<span class='swith-btn'></span>";
							htmlStr += "		</label>";
							htmlStr += "	</div>";
							htmlStr += "</div>";
						});
					});
				}
				$("#subscriptionItemsDiv").append(htmlStr);
				//根据用户订阅进行页面设置
				var userSubscriptionList = subscriptionMap['userSubscriptionList'];
				$.each(userSubscriptionList, function(m, e){
					$("#" + e.code).parent().removeClass("off").addClass("on");
				});
			}
		});
	});
	
	//消息订阅
	$(document).on("click", "#subscriptionItemsDiv .switch-weekday > input", function(){
		var code = $(this).attr("id");
		if(code){
			var url = "/a/message/saveusersubscription";
			var data = {"code":code};
			startUp.postAsyncData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var $codeParent = $("#" + code).parent();
					if($codeParent.hasClass("off")){
						$codeParent.removeClass("off").addClass("on");
					}else{
						$codeParent.removeClass("on").addClass("off");
					}
				}
			});
		}
	});
	
	//加载用户消息列表
	$(document).on("click", "#checkMessage", function(){
		$("#messageItemsDiv").empty();
		var spaceId = $("#checkedSpace").attr("space-id");
		if(spaceId){
			var url = "/a/message/findmessagelist";
			var data = {"spaceId":spaceId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$(".dropdown-menu.information-center").removeClass("message-center");
					var htmlStr = "";
					$.each(resultMap.data['messageList'], function(idx, item){
						htmlStr += headerView.messageEach(idx, item);
					});
					$("#messageItemsDiv").append(htmlStr);
					$(".information-center .info-numbers > b").text(resultMap.data['unReadMessageCount']);
				}
				if(resultMap && resultMap.data && resultMap.data.messageList.length<=0){
					$(".dropdown-menu.information-center").addClass("message-center");
				}
			});
		}
	});
	
	//全部消息标记为已读
	$(document).on("click", ".information-center .info-numbers .set-read", function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		if(spaceId){
			var url = "/a/message/updatereadstatusbyspaceid";
			var data = {"spaceId":spaceId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					var messageArray = $("#messageItemsDiv").children();
					$.each(messageArray, function(idx, item){
						$(item).removeClass("un-read");
					});
					$(".information-center .info-numbers > b").text("0");
					$("#checkMessage").removeClass("have-new");
				}
			});
		}
	});
	
	//单条消息标记为已读
	$(document).on("click", "#messageItemsDiv .info-list", function(){
		var $messageEach = $(this);
		var messageId = $messageEach.attr("id").replace("message-", "");
		var readClassFlag = $messageEach.hasClass("un-read");
		if(messageId && readClassFlag){
			var url = "/a/message/updatereadstatusbyid";
			var data = {"id":messageId};
			startUp.postFormData(url, data, function(resultMap){
				if(resultMap && resultMap.data){
					$messageEach.removeClass("un-read");
					if($("#messageItemsDiv").find(".un-read").size() == 0){
						$("#checkMessage").removeClass("have-new");
					}
				}
			});
		}
	});
	
	//个人设置模态窗加载完成后默认选中第一个选项卡
	$(document).on("show.bs.modal", "#personage_setting", function(){
		$("#userInfo").click();
	});
	
	//显示头像上传文件选择框
	$(document).on("click", "#userPhotoBtn", function(){
		$("#userPhotoFile").click();
	});
	
	//保存上传的头像文件
	$(document).on("change", "#userPhotoFile", function(){
		var path = $("#userPhotoFile").val();
		if(!path){
			commonMethods.showAlertNav("请选择文件！");
			return;
		}
		if(!path.endsWith(".jpg") && !path.endsWith(".JPG") && !path.endsWith(".PNG") && !path.endsWith(".png")){
			commonMethods.showAlertNav("您上传的头像文件格式不支持，请上传：jpg、JPG、PNG、png格式文件!");
			return;
		}
		var $photo = $("#userPhotoFile")[0];
		var formData = new FormData();
		$.each($photo.files, function(idx, item){
			formData.append(idx, item);
		});
		var url = "/a/attachment/uploadphoto";
		startUp.fileUpload(url, formData, function(resultMap){
			if(resultMap == "out"){
				commonMethods.showAlertNav("上传失败，上传的头像不能超过10M!");
			}else{
				$("#userPhotoImg").attr("src", startUp.getRootPath() + resultMap);
				$("#checkedUser img").attr("src", startUp.getRootPath() + resultMap);
			}
		});
	});
	
	//修改用户信息
	$(document).on("click", "#updateUserInfoBtn", function(){
		var name = $("#updateUserInfoForm").find("#name").val().trim();
		var email = $("#updateUserInfoForm").find("#email").val().trim();
		var remarks = $("#updateUserInfoForm").find("#remarks").val().trim();
		if(!name){
			commonMethods.showAlertNav("昵称不能为空!");
			return ;
		}
		var url ="/a/system/user/updateuserinfobyuserid";
		var data ={"name":name, "email":email?email:"", "remarks":remarks};
		startUp.postFormData(url, data, function(resultMap){
			if(resultMap.result == "1"){
				$("#checkedUser .user-name").text(name).attr("title", name);
				$("#personage_setting").modal("hide");
			}
		});
	});
	
	//修改用户密码
	$(document).on("click", "#updatePasswordBtn", function(){
		var oldPassword = $("#updatePasswordForm").find("#oldPassword").val().trim();
		var newPassword = $("#updatePasswordForm").find("#newPassword ").val().trim();
		var rePassword = $("#updatePasswordForm").find("#rePassword").val().trim();
		var url ="/a/system/user/updatepasswordbyuserId";
		var data ={"oldPassword":oldPassword, "newPassword":newPassword, "rePassword":rePassword};
		startUp.postFormData(url, data, function(resultMap){
			if(resultMap && resultMap.result == "-1"){//数据校验失败，修改密码失败
				$("#updatePasswordForm").find("#oldPasswordError").text("").text(resultMap.data.oldPasswordError);
				$("#updatePasswordForm").find("#newPasswordError").text("").text(resultMap.data.newPasswordError);
				$("#updatePasswordForm").find("#rePasswordError").text("").text(resultMap.data.rePasswordError);
			}else if(resultMap.result == "0"){
				window.location.href=startUp.getRootPath()+"/a/sys/logout";//修改密码成功，返回登录页面
			}
		});
	});
	
	//安全退出
	$(document).on("click", "#logout", function(){
		window.location.href=startUp.getRootPath()+"/a/sys/logout";
	});
	
});