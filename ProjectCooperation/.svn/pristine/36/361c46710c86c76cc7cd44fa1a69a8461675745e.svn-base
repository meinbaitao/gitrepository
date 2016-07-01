var members_drag = (function() { //成员拖动
	var Doc = $(document);
	Doc.on("mousedown", ".members-list-nav .drag-hander,#space-members-lists .members,.member-groups .member", function(e) {

		var text, _This = $(this),oneCount=1;	
		var ePageY=e.pageY,ePageX=e.pageX;
		text = $(this).text();
		
		var drag_div = $("<div class='drag_div'></div>");
		if ($(this).hasClass("members")||$(this).hasClass("member")) { //如果是成员的复制
			drag_div.addClass("members");
		}
  
		if ($(this).find("img").length != 0) { //如果有图片就把图片当背景复制
			var img_url = $(this).find("img").attr("src");
			$(this).find("img").hide();
			if($(this).hasClass("members")){
				$(this).css({
					"background-image": "url(" + img_url + ")",
					"background-size": "cover"
				});
			}else{
				$(this).find('.members').css({
					"background-image": "url(" + img_url + ")",
					"background-size": "cover"
				});
			}
	
			drag_div.css({
				"background-image": "url(" + img_url + ")",
				"background-size": "cover"
			});
		}
        

		
		
		$("body").append(drag_div);
		drag_div.text(text);
		$("body").addClass("display-select");
		if ($(this).hasClass("groups-name") || $(this).hasClass("members")|| $(this).hasClass("member")) { //团队关注任务或者任务指派

			mouseoverEvent = "#grid tr,#task_details,.project-choice";

			if((_This.hasClass('members')||_This.hasClass('member'))&&_This.parents(".member-groups").length>0){
				mouseoverEvent = "#grid tr,#task_details,.member-groups-list .member-groups,.project-choice";
			}
			
			if(navigator.userAgent.indexOf('Chrome')>-1){
				$('textarea:not([disabled])').attr({'disabled':'true','sdisabled':'true'});
			}
			Doc.unbind("mousemove");
			Doc.bind("mousemove", function(e) {
				if(ePageY===e.pageY&&ePageX===e.pageX){ //chrome下在mousedown事件响应后move事件也会跟着响应，根据判断坐标来判断是否真的移动。
					ePageY=-10;
					return false;
				}
				if(_This.parents(".member-groups").length>0&&_This.parents(".member-groups").eq(0).find(".down-triangle").length>0){
					_This.parents(".member-groups").find(".down-triangle").attr("class","left-triangle");
					_This.parents(".member-groups").children("ul").hide();
					_This.parents(".member-groups").addClass("member-groups-hide");
					}
				
				
				
				if(oneCount===1){
					bind_mouseenter($(mouseoverEvent));
					_This.addClass("this_move");
					if(_This.hasClass('members')||_This.hasClass('member')){
						$("#grid,#task_details,.member-groups-list .member-groups,.project-choice").addClass("drag-container");
						_This.parents(".member-groups").removeClass("drag-container");
					}else{
						$("#grid,#task_details,.project-choice").addClass("drag-container");
					}
					
				
					oneCount=2;
					_This.parents(".members-groups-container").addClass("moveing");
					
				}
				drag_div_move(e);
				
			});
		
			var membersMouseUp= function() {

				mousemoveStop($(mouseoverEvent));
				if ($(".move_there").length <= 0) {
					$(".this_move").removeClass("this_move");
					
					$(".move_there").removeClass("move_there");
					Doc.unbind("mouseup");
					return;
				}
				var title_name = $(".move_there").find(".text-line-title textarea").val();
				var taskId = $(".move_there")[0].id.split("-")[1];
				var userId =$(".this_move").attr("id")?$(".this_move").attr("id"):$(".this_move").find('.members').attr("id");
				var task_who = $(".move_there .task-who").text();
				if ($(".move_there").hasClass('task_details')) {
				    taskId = $(".move_there").attr('task-id');
					title_name = $(".move_there").find(".taskTitle").text();
					task_who = $("tr.hovered .task-who").text()
				}
				if($(".move_there").hasClass("member-groups")){
					title_name=$(".move_there").find("span.groups-name").text();
				}
				if($(".move_there").hasClass("project-choice")){
					title_name=$(".move_there").find("span.project-title").text();
					taskId=$(".move_there").attr('project-id');
		
				}
           
				if($(".this_move").hasClass("members")||$(".this_move").hasClass("member")) {
					 if($(".move_there").hasClass("member-groups")){
						 //移动成员到分组
						 var oldGroupId=$(".member-groups-hide").find('.member-groups-title').attr('groupid'),
						     newGroupId=$(".move_there").find('.member-groups-title').attr('groupid'),
						     userId=$(".this_move").attr("id")?$(".this_move").attr("id"):$(".this_move").find('.members').attr("id"),
						     memberName=$(".this_move").attr("title")?$(".this_move").attr("title"):$(".this_move").find('.members').attr("title"),
						    moveDom=$(".this_move").hasClass("member")?$(".this_move"):$(".this_move").parent();
						 if(moveGroupMember(oldGroupId,newGroupId,userId)){
							 
							 $(".move_there").children("ul").append(moveDom);							 
							 $(".member-groups-hide").find(".groups-number").text("("+($(".member-groups-hide").find(".groups-number").text().replace(/[(]|[)]/g,"")-1)+")");
							 $(".move_there").find(".groups-number").text("("+($(".move_there").find(".groups-number").text().replace(/[(]|[)]/g,"")-1+2)+")");
							 $(".member-groups-hide").removeClass("member-groups-hide");
							 $(".move_there").addClass("member-groups-hide");
							 commonMethods.operatResultAlert('移动到了成功');
						 }else{
							 commonMethods.operatResultAlert("移动成员失败", 5);
						 }
						 
					 }else{
						   if($(".move_there").hasClass("project-choice")){
							   //拖动成员到项目
							   var backVal= task.addMemberToProject(taskId,userId,0);
							   if(backVal&&backVal.count!='0'){
								   commonMethods.operatResultAlert(backVal.remind);
							   }else{
								   commonMethods.operatResultAlert(backVal.remind, 10);
							   }
							  
							   
						   }else{
							 //添加任务责任人服务
								if (task.updateTaskOwner(taskId,userId)) {
									var membersName = $(".this_move").attr("title");
									if ($(".this_move").find("img").length > 0) {
										members_log = $("<div></div>").append($(".this_move").find("img").eq(0).clone());
										members_log.find("img").attr({
											"class": "members",
											"title": membersName
										}).removeAttr("style");
									} else {
										members_log = $("<div></div>").append("<div class='members' title='" + membersName + "'>" + membersName + "</div>");
									}
									member = html.taskResponsible(members_log.html(), $(".this_move").attr("title"));
									matter.taskResponsibleRenew(member, membersName);
									commonMethods.operatResultAlert('任务指派成功');
								}
						   }
							
					 }

					
				}else{
					var groupId = $(".this_move").parent().attr("groupId");
					if($(".move_there").hasClass("project-choice")){						
						//添加组项目(参数为组ID)
						//start 用户行为分析
						startUp.iBehavior("moduleNO_37");
						//end 用户行为分析
						   var backVal= task.addMemberToProject(taskId,groupId,1);
						
						   if(backVal&&backVal.count!='0'){
							   commonMethods.operatResultAlert(backVal.remind);
						   }else{
							   commonMethods.operatResultAlert(backVal.remind, 10);
						   }
						//matter.show_operat_info("" + $(".this_move").text() + '成员已关注"' + title_name + '"项目', 10);
					   }else{
						   if (task.addGroupTaskProjectFollow(groupId, taskId)) {
								//添加组关注任务(参数为组ID)
								commonMethods.operatResultAlert("" + $(".this_move").text() + '成员成功关注该任务');
							}
					   }
					

				}

				$(".this_move").removeClass("this_move");
				
				$(".move_there").removeClass("move_there");
                $(".member-groups-hide").find("span.left-triangle").click();
                $(".member-groups-hide").removeClass("member-groups-hide");
				Doc.unbind("mouseup");
				
				
			}
			Doc.unbind("mouseup",membersMouseUp);
			Doc.bind("mouseup",membersMouseUp);
			return ;
		}

	});

});
var task_drag = (function() { //任务拖动
	var Doc = $(document);
	Doc.on("mousedown", ".grid .drag-hander", function() {
		var _this = $(this),
			text = $(_this).next("td.grid_cell_string").find(".text-line-title textarea").text(),
			drag_div = $("<div class='drag_div'></div>").text(text);
		$("body").append(drag_div);
		$("body").addClass("display-select");

		Doc.bind("mousemove", function(e) {
			_this.parents(".grid").eq(0).addClass("drag-container");
			_this.parent("tr").addClass("this_move");
			drag_div_move(e);
			bind_mouseenter(_this.parents(".grid").eq(0).find("tr"), true);



		});

		Doc.one("mouseup", function() {
			var start = parseInt($(".this_move").attr("index")),
				end = parseInt($(".move_there").hasClass("bottom") ? parseInt($(".move_there").attr("index")) + 1 : $(".move_there").attr("index"));
			var id_arr = [];
			mousemoveStop(_this.parents(".grid").eq(0).find("tr"));
			if ($(".move_there").length > 0 && !($(".move_there").hasClass("this_move")) && $(".this_move").length > 0) {
				if ($(".move_there").hasClass("bottom")) {
					$(".move_there").after($(".this_move"));
				} else {
					$(".move_there").before($(".this_move"));
				}
			}
			if (start < end) {
				for (i = start; i < end; i++) {
					$(".this_move").parents("table.grid").find("tr").eq(i - 1).attr("index", i).find("td.grid_cell_item_number").text(i);
					id_arr.push($(".this_move").parents("table.grid").find("tr").eq(i - 1).attr("id"));
				}

				//sortTask(id_arr+"",1);

			} else {

				for (i = end; i < start + 1; i++) {
					$(".this_move").parents("table.grid").find("tr").eq(i - 1).attr("index", i).find("td.grid_cell_item_number").text(i);
					id_arr.push($(".this_move").parents("table.grid").find("tr").eq(i - 1).attr("id"));

				}

			}
			
			$(".move_there").removeClass("move_there");
			$(".this_move").removeClass("this_move");
			$(".bottom").removeClass("bottom");

			return false;
		});

	});
});


//拓展图表位置
var drag_div_move = function(e) {
		$(".drag_div").css({
			"display": "block",
			"top": (e.pageY) +5+ "px",
			"left": (e.pageX) +5+ "px"
		});
	}


//给允许拖放的标签绑定mouseenter事件
var bind_mouseenter = function(label, move_space) {
		label.unbind("mouseenter");
		label.bind("mouseenter", function() {
			if ($(this).hasClass("move_there")) {
				return;
			} else {
				
				$(".move_there").removeClass("move_there");
				$(this).find("textarea").blur();
				$(this).addClass("move_there");
			}
			$(this).unbind("mouseleave");
			$(this).bind("mouseleave", function() {
				$(".move_there").removeClass("move_there");
			});
		});

		if (move_space) {
			label.unbind("mouseover");
			label.bind("mouseover", function(e) {
				if (e.pageY - $(this).offset().top > $(this).height() / 2) {
					$(this).addClass("bottom");
				} else {
					if ($(this).hasClass("bottom")) {
						$(this).removeClass("bottom");
					}
				}
			});
			label.unbind("mouseleave");
			label.bind("mouseleave", function(e) {
				if ($(this).hasClass("bottom")) {
					$(this).removeClass("bottom");
				}
			});
		}

		
	}

//给允许拖放的标签取消绑定mouseenter事件
var mousemoveStop = function(label) {
	$(document).unbind("mousemove");
	if(navigator.userAgent.indexOf('Chrome')>-1){
		$('textarea[sdisabled]').removeAttr('disabled');
		$('textarea[sdisabled]').removeAttr('sdisabled');
	}
	$('.this_move').find('img').show();
	label.unbind("mouseleave");
	label.unbind("mouseover");
	$("body").removeClass("display-select");
	$(".drag_div").text("").remove();
	$(".drag-container").unbind("mouseleave");
	label.unbind("mouseenter");
	$(".drag-container").removeClass("drag-container");
}

//取消表单选中事件
var noSelect=function(){
    $(this).blur();
    return false;
}