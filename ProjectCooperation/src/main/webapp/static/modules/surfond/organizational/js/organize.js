
$(function(){
	
	organize.OneSapceOrganizesToList();			//预先加载空间组织成员架构2
	organize.showAllSpaceMember();				//预先加载空间成员
	
	$('#Add-Director').on('shown.bs.modal',function(){	//加载添加部门框负责人模态框
		organize.showSpaceMemberToTeamResponsible();		//模态框加载空间成员，预选团队负责人
	});
	$("#add-section").on('shown.bs.modal',function(){	//加载添加部门框
		$("#show-add-organize-error").empty();
	});
	$('#Add-Department').on('shown.bs.modal',function(){//加载添加部门框选择的部门模态框
		$("#show-department-name").attr("type","1");
		organize.showOrganizeListToInviateMember();		//模态框加载空间部门，供邀请成员选择部门
	});
	$('#add-staff').on('shown.bs.modal',function(){		//加载添加员工框
		$("#organize-show-add-member-error").empty();
		$("#space-organize-base-info").click();
		var organizeId = $("#show-department-name").attr("organizeId");
		var type = $("#show-department-name").attr("type");
		var organizeName = $("#show-department-name").attr("title");
		if(organizeId){			//如果是选中了部门而添加员工则模态框加载改部门信息
			if(type=='0'){
				$("#invite-organize-id").empty();
				$("#invite-organize-id").append("<span id='member_"+organizeId+"'>"+organizeName+"</span>");
			}
		}
	});
	
	$('#space-organize-modal').on('shown.bs.modal',function(){			//空间成员模态框
		var organizeId = $("#to-show-on-modal").attr("organizeId");
		var organizeName = $("#to-show-on-modal").attr("organizeName");
		var userId = $("#to-show-on-modal").attr("userId");
		var userName = $("#to-show-on-modal").attr("userName");
		var createUserName = $("#to-show-on-modal").attr("createUserName");
		var type = $("#to-show-on-modal").attr("type");
		if(type=='0'){
			$("#edit-organize-name").attr("readonly","readonly");
		}else{
			$("#edit-organize-name").attr("readonly",false);
		}
		$("#edit-organize-name").val(organizeName);
		$("#edit-organize-name").attr("name",organizeId);
		$("#edit-organize-creater").val(createUserName);
		var changeUser = $("#to-show-on-modal").attr("change-user");
		if(changeUser=='0'){
			$("#space_Responsible").html("<span user-id='member_"+userId+"'>"+userName+"</span>");
		}
	});
	
});


var organize = {};


/**
 * 根据空间查找空间下的所有组织(workspace.jsp)
 */
organize.showSpaceOrganizeMember = function(data){
	
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
			$.each(data.result,function(k,v){
				if(v.type=='0'){
					noGroup += organizeView.showSapceOrganizeMembers(null,v);
				}else{
					group += organizeView.showSapceOrganizeMembers(null,v);
				}
			});
			$("#show-space-member-list").append(group+noGroup);
		}
	});
}




/**
 * 根据空间查找空间下的所有组织
 */
organize.getOneSapceOrganizes = function(){
	var url = "/a/organize/getOneSapceOrganizes";
	var spaceId = $("#checkedSpace").attr("space-id");
	var result = "";
	startUp.postAsyncData(url,{"spaceId":spaceId},function(data){
		result = data;
	});
	return result;
}

/**
 * (organizational.jsp)显示组织列表
 */
organize.OneSapceOrganizesToList = function(){
	var spaceId = $("#checkedSpace").attr("space-id");
	if(!spaceId){
		return;
	}
	var data = organize.getOneSapceOrganizes();
	$("#space-organize-member-list").empty();
	if(data){
		if(data.result.length>0){
			var htmlStrNoGroup = "";
			var htmlStrGroup = "";
			$.each(data.result,function(k,v){
				if(v.type=='0'){
					htmlStrNoGroup += organizeView.splitOneOrganizeCss(null,v);
				}else{
					htmlStrGroup += organizeView.splitOneOrganizeCss(null,v);
				}
			});
			$("#space-organize-member-list").append(htmlStrGroup+htmlStrNoGroup);
		}
	}
}


/**
 * 显示所有空间成员
 */
organize.showAllSpaceMember = function(){
	var spaceId = $("#checkedSpace").attr("space-id");
	if(!spaceId){
		return;
	}	
	var url = "/a/organize/findMembersBySpace";
	var departments = organize.getOneSapceOrganizes();
	
	startUp.postFormData(url,{"spaceId":spaceId},function(data){
		$("#show-all-space-member").empty();
		if(data.result.length>0){
			$("#show-department-member-count").empty();
			$("#show-department-member-count").append(data.result.length);
			var htmlStr = "";
			$.each(data.result,function(k,v){
				htmlStr += organizeView.splitOneSpaceMemberCss(null,v,departments);
			});
			$("#show-all-space-member").append(htmlStr);
		}
	});
	
}





/**
 * 添加组织分组
 */
$(document).on("input","#addNewOrganizeName",function(event){
	//if(event.keyCode == "13"){
		var url = "/a/organize/findOrganizeNameBySpace";
		var spaceId = $("#checkedSpace").attr("space-id");
		var name = $("#addNewOrganizeName").val();
		
		var arrayDept = $(".to-update-organize").first().children("option");
		if(arrayDept){
			$.each(arrayDept,function(k,v){
				var str = $(v).text();
				if(name==str){
					$("#show-add-organize-error").empty();
					$("#show-add-organize-error").append("输入的部门信息已存在，请重新输入!");
					$("#show-add-organize-error").css("display","block");
					$("#submitNewOrganizeInfo").attr("status","0");
					return false;
				}else{
					$("#show-add-organize-error").empty();
					$("#submitNewOrganizeInfo").attr("status","1");
				}
			});
		}
});
$(document).on("click","#submitNewOrganizeInfo",function(){
	var type = this.getAttribute("status");
	if(type=='1'){
		organize.addNewOrganizeInfo();
	}else{
		$("#show-add-organize-error").empty();
		$("#show-add-organize-error").append("部门名称为空或者已存在，请重新输入!");
		$("#show-add-organize-error").css("display","block");
		$("#submitNewOrganizeInfo").attr("status","0");
	}
});
organize.addNewOrganizeInfo = function(){
	var url = "/a/organize/addOrganizeInfo";
	var spaceId = $("#checkedSpace").attr("space-id");
	if(!spaceId){
		return;
	}
	var status = $("#submitNewOrganizeInfo").attr("status");
	var name = $("#addNewOrganizeName").val().trim();
	if(name){
		if(name.length>15){return;}
		if(status=='1'){
			startUp.postFormData(url,{"spaceId":spaceId,"name":name},function(data){
				if(data.message=='repeat'){
					$("#show-add-organize-error").empty();
					$("#show-add-organize-error").append("输入的部门信息已存在，请重新输入!");
					$("#show-add-organize-error").css("display","block");
				}else if(data.message=='success'){
					$("#add-section").modal("hide");
					organize.OneSapceOrganizesToList();
					$("#addNewOrganizeName").val("");
					commonMethods.operatResultAlert('创建成功!',1);
					$(".to-update-organize").append("<option value='"+data.result.id+"'>"+data.result.name+"</option>");
				}
				$("#submitNewOrganizeInfo").attr("status","0");
			});
		}
	}else{
		$("#show-add-organize-error").empty();
		$("#show-add-organize-error").append("部门名称为空或者已存在，请重新输入!");
		$("#show-add-organize-error").css("display","block");
		$("#submitNewOrganizeInfo").attr("status","0");
	}
}


/**
 * 删除组织分组
 */
$(document).on("click",".delete-space-organize",function(){
	var organizeId = this.getAttribute("status");			//组织ID
	var url = "/a/organize/deleteOrganizeInfo";
	var spaceId = $("#checkedSpace").attr("space-id");		//空间ID
	var status = $("#show-department-name").attr("status"); //右侧显示部门名称和成员数量那里的状态
	
	if(organizeId){
		var yz_url = "/a/organize/findOneOrganizeMemberCount";
		startUp.postFormData(yz_url,{"id":organizeId},function(data){
			if(data.result>0){
				commonMethods.showConfirmNav("该分组下有"+data.result+"名成员将移到未分组中，是否确定要删除该组织分组?",function(){
					startUp.postFormData(url,{"id":organizeId,"spaceId":spaceId},function(data){
						organize.OneSapceOrganizesToList();
						if(status=='0'){
							$("#show-department-name").empty();
							$("#show-department-name").append("所有成员");
							organize.showAllSpaceMember();
						}else{
							if($("#organize-each-"+organizeId).length>0){
								$("#organize-each-"+organizeId).click();
							}else{
								$("#show-department-name").empty();
								$("#show-department-name").append("所有成员");
								organize.showAllSpaceMember();
							}
						}
						commonMethods.operatResultAlert('删除成功!',1);
					});
				},"no");
			}else{
				commonMethods.showConfirmNav("是否确定要删除该组织分组?",function(){
					startUp.postFormData(url,{"id":organizeId,"spaceId":spaceId},function(data){
						organize.OneSapceOrganizesToList();
						if(status=='0'){
							$("#show-department-name").empty();
							$("#show-department-name").append("所有成员");
							organize.showAllSpaceMember();
						}else{
							if($("#organize-each-"+organizeId).length>0){
								$("#organize-each-"+organizeId).click();
							}else{
								$("#show-department-name").empty();
								$("#show-department-name").append("所有成员");
								organize.showAllSpaceMember();
							}
						}
						commonMethods.operatResultAlert('删除成功!',1);
					});
				},"no");
			}
		});
	}
});



/**
 * 添加组织分组成员(邀请好友入口)
 */
$(document).on("click","#invite-user-to-space-organize",function(){
	var spaceId = $("#checkedSpace").attr("space-id");
	if(!spaceId){
		return;
	}
	var url = "/a/space/addOrganizeMember";
	var email = $("#invite-email").val();
	var status = $("#show-department-name").attr("status");
	var organizeId = "";
	
	var str = $("#invite-organize-id").html();
	$str = $("<div></div>");
	$str.html(str);
	var as=$str.find("span");
	for(var i=0;i<as.length;i++){
		var thisuserid = $(as[i]).attr("id");
		if(thisuserid){
			thisuserid = thisuserid.replace("member_","");
			organizeId = thisuserid;
		}
	}
	if(email){
		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(reg.test(email)){
			startUp.postAsyncData(url,{"id":organizeId,"email":email,"spaceId":spaceId},function(data){
				$("#show-department-name").attr("type","0");
				if(data.result=='success'){
					if(status=='0'){
						$("#show-department-name").empty();
						$("#show-department-name").append("所有成员");
						organize.showAllSpaceMember();
					}else{
						$("#organize-each-"+organizeId).click();
					}
					$("#add-staff").modal("hide");
					commonMethods.operatResultAlert('邀请成功!',1);
					
					$("#invite-email").val("");
					$("#invite-organize-id").html("");
				}else if(data.result=='repeat'){
					$("#organize-show-add-member-error").empty();
					$("#organize-show-add-member-error").append("该用户已是空间成员!");
					$("#organize-show-add-member-error").css("display","block");
				}else if(data.result=='noAccount'){
					$("#organize-show-add-member-error").empty();
					$("#organize-show-add-member-error").append("该用户未注册，已发送注册邀请!");
					$("#organize-show-add-member-error").css("display","block");
				}
			});
		}else{
			$("#organize-show-add-member-error").empty();
			$("#organize-show-add-member-error").append("邮箱格式不正确!");
			$("#organize-show-add-member-error").css("display","block");
		}
	}else{
		$("#organize-show-add-member-error").empty();
		$("#organize-show-add-member-error").append("邮箱格式不正确!");
		$("#organize-show-add-member-error").css("display","block");
	}
});


/**
 * 添加组织分组成员(邀请好友入口-编辑页面)
 */
$(document).on("keydown","#modal-invite-organize-member",function(event){
	var spaceId = $("#checkedSpace").attr("space-id");
	if(!spaceId){
		return;
	}
	if(event.keyCode == "13"){
		var url = "/a/space/addOrganizeMember";
		var email = $("#modal-invite-organize-member").val();
		var organizeId = $("#to-show-on-modal").attr("organizeId");
		if(email){
			var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if(reg.test(email)){
				startUp.postFormData(url,{"id":organizeId,"email":email,"spaceId":spaceId},function(data){
					if(data.result=='success'){
						$("#modal-invite-organize-member").val("");
						$("#modal-show-space-organize-member").click();
					}else if(data.result=='repeat'){
						commonMethods.showAlertNav('该用户已是空间成员!');
					}else if(data.result=='noAccount'){
						$("#modal-invite-organize-member").val("");
						commonMethods.showAlertNav('该用户未注册，已发送注册邀请!');
					}
				});
			}else{
				commonMethods.showAlertNav('邮箱格式不正确!');
			}
		}else{
			commonMethods.showAlertNav('邮箱格式不正确!');
		}
	}
});


/**
 * 取消邀请
 */
$(document).on("click","#cancel-invite-user-to-space-organize",function(){
	$("#invite-email").val("");
	$("#invite-organize-id").html("");
	$("#show-department-name").attr("type","0");
});


/**
 * 移除组织分组成员
 */
$(document).on("click",".remove-space-member",function(){
	var url = "/a/organize/deleteOrganizeMember";
	var organizeId = this.getAttribute("organizeid");
	var userId = this.getAttribute("userid");
	This = this;
	var status = $("#show-department-name").attr("status"); 
	if(organizeId){
		commonMethods.showConfirmNav("是否确定要删除该成员?",function(){
			startUp.postFormData(url,{"id":organizeId,"userId":userId},function(data){
				if(data.result=='success'){
					if(status=='0'){
						$("#show-department-name").empty();
						$("#show-department-name").append("所有成员");
						organize.showAllSpaceMember();
					}else{
						$("#organize-each-"+organizeId).click();
					}
				}
			});
		},"no");
	}
	
});


/**
 * 成员更换组织分组
 */
$(document).on("change",".to-update-organize",function(){
	var url = "/a/organize/updateOrganizeMember";
	var organizeId = $(this).attr("organizeid");
	var newOrganizeId = $(this).children('option:selected').attr("value");
	var userId = $(this).attr("user-id");
	var status = $("#show-department-name").attr("status");
	
	if(organizeId){
		commonMethods.showConfirmNav("是否确定要移动该成员?",function(){
			startUp.postFormData(url,{"id":organizeId,"userId":userId,"newOrganizeId":newOrganizeId},function(data){
				if(status=='0'){
					$("#show-department-name").empty();
					$("#show-department-name").append("所有成员");
					organize.showAllSpaceMember();
				}else{
					$("#organize-each-"+organizeId).click();
				}
			});
		},function(){
			if(status=='0'){
				$("#show-department-name").empty();
				$("#show-department-name").append("所有成员");
				organize.showAllSpaceMember();
			}else{
				$("#organize-each-"+organizeId).click();
			}
		});
	}
});



/**
 * 查找组织分组里的成员
 */
$(document).on("click",".space-department-each",function(){
	
	var organizeId = this.getAttribute("organizeId");
	var organizeName = this.getAttribute("organizeName");
	var departments = organize.getOneSapceOrganizes();
	
	if(organizeName){
		$("#show-department-name").empty();
		$("#show-department-name").append(organizeName);
		$("#show-department-name").attr("status","1");
		$("#show-department-name").attr("title",organizeName);
		$("#show-department-name").attr("organizeId",organizeId);
	}
	var url = "/a/organize/findOneOrganizeMembers";
	startUp.postFormData(url,{"id":organizeId},function(data){
		$("#show-all-space-member").empty();
		$("#show-department-member-count").empty();
		$("#show-department-member-count").append(data.result.length);
		if(data.result.length>0){
			var htmlStr = "";
			$.each(data.result,function(k,v){
				htmlStr += organizeView.splitOneSpaceMemberCss(null,v,departments);
			});
			$("#show-all-space-member").append(htmlStr);
		}
	});
});


/**
 * 邀请成员时选择的部门列表
 */
organize.showOrganizeListToInviateMember = function(){
	$("#show-space-organize-list").empty();
	var data = organize.getOneSapceOrganizes();
	if(data){
		if(data.result.length>0){
			var htmlStr = "";
			$.each(data.result,function(k,v){
				htmlStr += organizeView.splitOneOrganizeToInviateCss(null,v);
			});
			$("#show-space-organize-list").append(htmlStr);
		}
	}
}


/**
 * 根据ID编辑空间组织
 */
$(document).on("click",".update-space-organize",function(){//点击编辑组织时将组织信息存于页面，等模态框加载是获取
	var organizeId = this.getAttribute("status");
	var url = "/a/organize/findOneOrganizeBaseInfo";
	startUp.postFormData(url,{"id":organizeId},function(data){
		if(data.result){
			$("#to-show-on-modal").attr("organizeId","");
			$("#to-show-on-modal").attr("organizeName","");
			$("#to-show-on-modal").attr("userId","");
			$("#to-show-on-modal").attr("userName","");
			$("#to-show-on-modal").attr("createUserId","");
			$("#to-show-on-modal").attr("createUserName","");
			$("#to-show-on-modal").attr("type","");
			$("#to-show-on-modal").attr("organizeId",data.result.id);
			$("#to-show-on-modal").attr("organizeName",data.result.name);
			$("#to-show-on-modal").attr("userId",data.result.userId);
			$("#to-show-on-modal").attr("userName",data.result.userName);
			$("#to-show-on-modal").attr("createUserId",data.result.createById);
			$("#to-show-on-modal").attr("createUserName",data.result.createByName);
			$("#to-show-on-modal").attr("type",data.result.type);
			
			$("#to-show-on-modal").attr("change-user","0");
		}
	});
});//切换负责人时标志
$(document).on("click","#save-remmember-space-member",function(){
	$("#to-show-on-modal").attr("change-user","1");
});

/**
 * 修改组织基本信息
 */
$(document).on("click","#submit-to-edit-oragnize",function(){
	var url = "/a/organize/updateOrganizeInfo";
	var name = $("#edit-organize-name").val();
	var id = $("#edit-organize-name").attr("name");
	var userId = "";
	var organizeName = $("#to-show-on-modal").attr("organizeName");
	var spaceId = $("#checkedSpace").attr("space-id");
	var str = $("#space_Responsible").html();
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
	if(name){
		if(name.length>15){return;}
		startUp.postFormData(url,{"id":id,"name":name,"userId":userId,"spaceId":spaceId},function(data){
			if(data.message=='success'){
				$("#space-organize-modal").modal("hide");
				commonMethods.operatResultAlert('修改成功!',1);
				organize.OneSapceOrganizesToList();
			}else if(data.message=='noGroup'){
				$("#edit-organize-name").val("未分组");
			}else if(data.message=='repeat'){
				$("#edit-organize-name").val(organizeName);
			}
		});
	}else{
	}
});


/**
 * 切换成员管理查看空间成员
 */
$(document).on("click","#modal-show-space-organize-member",function(){
	var organizeId = $("#to-show-on-modal").attr("organizeId");
	var url = "/a/organize/findOneOrganizeMembers";
	if(organizeId){
		startUp.postFormData(url,{"id":organizeId},function(data){
			$("#show-this-organize-list").empty();
			var htmlStr = "";
			if(data.result.length>0){
				$.each(data.result,function(k,v){
					htmlStr += organizeView.showorganizeModalMember(null,v);
				});
			}
			$("#show-this-organize-list").append(htmlStr);
		});
	}
});

/**
 * 添加团队成员时显示空间成员，预选团队负责人
 */
organize.showSpaceMemberToTeamResponsible = function(){
	
	var url = "/a/organize/findOneSapceOrganizes";
	var spaceId = $("#checkedSpace").attr("space-id");
	
	startUp.postAsyncData(url,{"spaceId":spaceId},function(data){
		$("#show-sapce-member-to-team-responsible").empty();
		if(data.result.length>0){
			var htmlStr = "";
			$.each(data.result,function(k,v){
				htmlStr += organizeView.showSpaceMemberToTeamResponsible(null,v);
			});
			$("#show-sapce-member-to-team-responsible").append(htmlStr);
		}
	});
}
//展开组织架构
$(document).on("click", ".hidden-structure", function(){
    if(!$(this).hasClass("m")){
    	$(this).removeClass("l");
    	$(this).addClass("m");
    	$(".main-container-scroll").animate({"padding-left":10});
	    $(".main-container>div").animate({margin:"0 0 0 -309px"},300);
	    $(this).empty();
	    $(this).append("&gt;");
    }else if(!$(this).hasClass("l")){
    	$(this).removeClass("m");
    	$(this).addClass("l");
	    $(".main-container>div").animate({margin:"0"},300);
	    $(this).empty();
	    $(this).append("&lt;");
    }
});
//下拉框优化
$(document).on("click", ".unappropriated .glyphicon", function(){
	var e=$(document.body).outerHeight(true);
	var r=$(this).offset().top;
	var g=e-r;
	$(this).next().removeClass("margin-top1");
	$(this).next().removeClass("margin-top2");
	if(g<=80){
		if($(this).next().children("li").length==2){
			$(this).next().addClass("margin-top1");
		}else{
			$(this).next().addClass("margin-top2");
		}
	}
	
});