var Dom;
$(function() {
	Dom = {
		left_menu: $("#left-menu"),
		container: $(".container"),
		hideMenu_btn: $("#hideMenu-btn"),
		switch_target: $("[switch-target]").filter("[switch-target!='']"),
		comment_input_spread: $("#comment-input-spread"),
		task_list_container: $("#task-list-container"),
		task_details: $("#task_details"),
		task_zindex: $("#task_details_fixed_zindex"),
		close_task_details: "#task-list-container .rightward-btn,#task_details .operate_tag.closeDetail",
		personage_setting_btn: $("#personage_setting_btn"),
		panels_switch: "[panels-target]",
		log_task_container: $("#log_task_container .log_task_container"),
		project_members_invite: $("body .project-members-invite"),
		project_members_list: $("body .project-members-list"),
		subTasklist: $("#subTasklist"),
		sub_tast_appoint: $("body .sub-tast-appoint"),
		grid: $("#grid"),
		project_archives: $(".project-archives-list"),
		project_list: $(".project-lists"),
		textareaResponsible: $("#task_details .operate_tags .appoint"),
		a_remove: "a.file-style span.sicon-remove",
		imgPreview: "a.file-style span.sicon-remove.preview",
		memberGroupsList: $("#member-groups-list")
	}
	var matter = (function() {
		var Win = $(window),
			Doc = $(document),
			Body = $("body"),
			BodyHeight = $("body").height(),
			left_menu_width = 300;

		var defaultSetting = function() { //取消回车提交表单
			Doc.on('keydown', 'input,textarea', function(event) {

				var target, code, tag;
				if (!event) {

					event = window.event; //针对ie浏览器  
					target = event.srcElement;
					code = event.keyCode;
					if (code == 13) {
						tag = target.tagName;
						if (tag == "TEXTAREA") {
							return true;
						} else {
							return false;
						}
					}

				} else {

					target = event.target; //针对遵循w3c标准的浏览器，如Firefox  
					code = event.keyCode;
					if (code == 13) {
						tag = target.tagName;
						if (tag == "INPUT") {
							return false;
						} else {
							return true;
						}
					}

				}
			});
		};


		var plugin_call = function() { //一些插件的调用

	//项目列表调用滚动条插件
			/*Dom.project_list.niceScroll({
				cursorcolor: "#ccc",
				cursorwidth: '5',
				cursorborderradius: '3px',
				cursorborder: '',
				railpadding: {top: 2,right: 0,left: 2,bottom: 0},
				railalign: 'right'
			});*/

	//存档项目列表调用滚动条插件
			Dom.project_archives.niceScroll({
				cursorcolor: "#ccc",
				cursorwidth: '5',
				cursorborderradius: '3px',
				cursorborder: '',
				railpadding: {top: 2,right: 0,left: 2,bottom: 0},
				railalign: 'left'
			});

	//成员列表滚动插件    
			$(".members-list-container li.members-lists").niceScroll({
				cursorcolor: "#ccc",
				cursorwidth: '5',
				cursorborderradius: '3px',
				cursorborder: '',
				railpadding: {top: 2,right: 0,left: 2,bottom: 0}
			});

	//顶部导航条调用滚动插件 
			$(".panles-switc-scroll").niceScroll({
				cursorcolor: "#ccc",
				cursorwidth: '5',
				cursorborderradius: '3px',
				cursorborder: '',
				railpadding: {top: 2,right: 0,left: 2,bottom: 0},
				horizrailenabled: true,
				zindex: '5'
			});



	//指派记录调用滚动插件
	/*	$("#responsible-log").niceScroll({
			cursorcolor: "#A2D4ED",
			cursorwidth: '5',
			cursorborderradius: '3px',
			cursorborder: '',
			railpadding: {top: 2,right: 0,left: 2,bottom: 0},
			horizrailenabled: true,
			zindex: '5'
		})*/

			Doc.on('click', '.Wdateinput', function() {
				WdatePicker({dateFmt: 'yyyy-MM-dd',errDealMode: 2,autoPickDate: false,skin: "dynamic"});
			})

	}

		var niceScrollMethod = function(obj) {

			if (obj.length <= 0) {return};
			obj.niceScroll({
				cursorcolor: "#A2D4ED",
				cursorwidth: '5',
				cursorborderradius: '3px',
				cursorborder: '',
				railpadding: {top: 2,right: 0,left: 2,bottom: 0},
			});

		}


		var EventHandler = function() { //交互的事件绑定

	//禁用子元素事件。
			Doc.on('click', "[disableChildrenEvent='true'] *:not([enableChildrenEvent='true'])", function() {
				$(this).attr('contenteditable') == 'true' && ($(this).prop('contenteditable', 'false'), $(this).attr('trueContenteditable', 'true'));
				(this.tagName == "INPUT" || this.tagName == "TEXTAREA") && ($(this).prop('readonly', 'readonly'), $(this).attr('trueReadonly', 'false'));
				return false;
			});


	//恢复可编辑块区域。	  
			Doc.on('click', "[trueContenteditable='true'],[trueReadonly='false']", function() {

				if ($(this).parents('[disableChildrenEvent]').length == 0 && !$(this).attr('[disableChildrenEvent]')) {

					$(this).removeAttr("disableChildrenEvent").removeAttr("readonly").removeAttr("trueContenteditable").removeAttr("trueReadonly");
					$(this).attr('contenteditable', 'true');
					$(this).focus();
				}

			});

	//显示隐藏菜单
			Dom.hideMenu_btn.bind("click", function() {

				if (Dom.container.hasClass("menu-hide")) {

					Dom.container.stop().animate({
						'padding-left': left_menu_width
					}, '300', 'swing', function() {
						$(this).removeClass("menu-hide");
						Dom.hideMenu_btn.html("&lt;");
					});

				} else {

					Dom.container.stop().animate({
						'padding-left': "1px"
					}, '900', 'swing', function() {
						$(this).addClass("menu-hide");
						Dom.hideMenu_btn.html("&gt;");
					});

				}

			});


	//自定义tab切换方法
			Dom.switch_target.bind("click", function() {

				if ($(this).attr("switch-target") != "task-comment") {
					$(".task_details").addClass('not-ask-comment')
				} else {
					$(".task_details").removeClass('not-ask-comment')
				}

				if (!$(this).hasClass("current")) {
					if (!$("#" + $(this).attr("switch-target")).length > 0) return;
					$("#" + $(this).attr("switch-target")).addClass("current").siblings(".current").removeClass('current');
					$(this).addClass("current").siblings(".current").removeClass('current');
				}

			});


	//任务评论框展开/隐藏
			Dom.comment_input_spread.bind("click", function() {

				if ($(this).hasClass("spreaded")) { //如果已经展开就收起

					$(this).parent().stop().animate({"height": '110px'}, function() {
						Dom.comment_input_spread.removeClass("spreaded");
						$(this).css("position", 'relative');
						$(this).find(".task-comment-input").css({height: "100%","width": "100%"});
						$(this).removeClass("spreaded")
					});

				} else { //否者就做展开操作

					$(this).parent().css({"position": "absolute","bottom": "0px","z-index": "5","width":$(this).parent().prev('.task_details_container').width()});
					$(this).parent().stop().animate({"height": $(".task_details_container").height()}, function() {
						Dom.comment_input_spread.addClass("spreaded");
						$(this).addClass("spreaded");
						comment_add_file()
					});

				}

			});

	//显示详细任务栏
			Doc.on("click", "#grid tr", function() {
				$(this).addClass("hovered").siblings("tr.hovered").removeClass("hovered");
			});

			Doc.on("click", "#grid tr", function() {
				var parentWidth = Dom.task_list_container.width();			
				if (Dom.task_details.hasClass("task-details-hide")||Dom.task_details.hasClass("task-details-hide")||!Dom.task_details.is(":visible")) {
					Dom.task_details.css({'display':'block','right': "0"});
					Dom.task_details.stop().animate({"width": parentWidth * 0.75 < 600 ? "600px" : "75%"},function(){
						$(this).removeClass('task-details-hide');
					});
				}

				

			});

	//回车显示任务详情
			Doc.on("keydown", "#taskItemsTbody tr textarea", function(event) {
				if (event.keyCode == 13) {
					$(this).parents("tr").eq(0).dblclick();
					return false;
				}
			})

	//新建图表载入项目名称
			$('#add_project-charts').on('loaded.bs.modal', function(e) {
				$("#add_project-charts").find("#project_chart_name").keyup(function() {
					if ($(this).parent().hasClass("open")) return;
					$(this).siblings(".open_dropdown").click();
				});
			});

	//任务、图表、对话、动态面板切换
			Doc.on("click", Dom.panels_switch, function() {
				if ($(this).attr("panels-target") == "") return;
				var show_panels = $($(this).attr("panels-target"));
				if (show_panels.length <= 0) return;
				if ($(this).attr("panels-target") == '.task-nav' && show_panels.find("#task_details").length == 0) {
					Dom.task_details.css({"width": "0px","display": 'none'});
					Dom.log_task_container.css('width', "100%");
					Dom.task_list_container.css('width', "100%");
					show_panels.append(Dom.task_details);
				}

		        //如果点击的项目日历按钮，则将日历移动到项目列表下
				if ($(this).attr("panels-target") == '.task_calendar' && $(this).parents(".task-nav").length > 0) {
					$("#project-container").append(show_panels);
				} else {
			         //如果日历已经移动到项目区域下面且点击的是空间日历，则将日历移动出去
					if ($(this).attr("panels-target") == '.task_calendar' && show_panels.parents('.project-container').length > 0) {
						$(".right-container .right-container-scroll").append(show_panels);
					}
				}
				if ($(this).attr('add-class')) {
					$(".left ul.project-archives-list").is(':visible') && ($(".left .search>.show-archives-btn").click());
					Dom.left_menu.attr('class', 'left ' + $(this).attr('add-class'));

				} else if ($(this).parents('.show-favorite-list').length == 0 && $(this).parent(".operate-btn-nav").length <= 0) {
					Dom.left_menu.attr('class', 'left');
				}
				if ($(this).attr("hide-addtasknav") == "true") { //是否展示我的任务
					$(".list-container-nav").addClass("show-my-task");
				} else if ($(this).parent(".operate-btn-nav").length <= 0) {
					$(".list-container-nav").removeClass("show-my-task");
				}
				if ($(this).attr('no-left') == 'yes') { //是否隐藏left菜单
					$(".container.panels ").addClass('no-left');
					Dom.left_menu.addClass($(this).attr('add-class'));
				} else if ($(this).parent(".operate-btn-nav").length <= 0) {
					$(".container.panels ").removeClass('no-left');
					Dom.left_menu.removeClass('no-left');
				}

				if (show_panels.parents('.panels').length > 0) {
					show_panels.parents('.panels').siblings(".current").fadeOut(function() {
						$(this).removeClass("current");

						show_panels.parents('.panels').fadeIn(function() {
							$(this).addClass("current");

						})
					});
				}
				show_panels.siblings(".current").fadeOut(function() {
					$(this).removeClass("current");
					show_panels.fadeIn(function() {
						$(this).addClass("current");

						if ($(this).hasClass("task_calendar")) {
							$('#calendar').fullCalendar('destroy'); 
							full_calendar();
						}
					});
				});

		       //取消红点提示
				$(this).siblings('.numbers').is(":visible") && $(this).siblings('.numbers').addClass('hide');

			});


	//显示任务列表      
			Doc.on('click', ".operate-btn-nav .sicon-task", function() {
				$("#project-container .list-container-nav").siblings(".current").fadeOut(function() {
					$(this).removeClass("current");
				});
				$("#project-container .list-container-nav").fadeIn(function() {
					$(this).addClass("current");
				});
			});

	//显示发表话题表单
			$(".start-comment-div").bind("click", function() {
				$(this).slideUp(function() {
					$(this).next().slideDown();
					$(this).next().find("input").focus();
					$(this).siblings(".start-comment-post").show();
				});
			});

	//动态列表显示任务详情
			Doc.on("click", '#show_dynamic_page .log-task-title', function() {
				var status = this.getAttribute("status");
				var resourceId = this.getAttribute("resourceId");
				if (status) {
					if ($(this).hasClass("active") && Dom.task_details.is(":visible")) return;
					if ($("#log_task_container .conversations-list").is(':visible')) {
						hideConversationDetail()
					}
					Dom.log_task_container.find(".log-task-title.active").removeClass("active");
					$(this).addClass("active");
					if (Dom.log_task_container.next(".task_details").length <= 0) {
						Dom.task_details.width('0px');
						Dom.task_details.insertAfter(Dom.log_task_container);
					}
					if (Dom.task_details.hasClass("task-details-hide")||!Dom.task_details.is(":visible")) {
						Dom.task_details.show();
						Dom.log_task_container.css("border-radius", "4px 0px 0px 0px");
						Dom.task_details.stop().animate({width: '50%'}, function() {
							Doc.unbind('click', autoHideTaskDetails);
							Doc.bind('click', autoHideTaskDetails);
							$(".task-responsible>ul").scrollLeft($(".task-responsible>ul").find('li').length*$(".task-responsible>ul").find('li').width());
						});
						Dom.log_task_container.stop().animate({width: '50%'},function(){
							Dom.task_details.removeClass('task-details-hide');
						});
					}
				} else {
					if (resourceId) {
						showDynamicConversationDetail(resourceId);
						$(".sicon-conversation-comment").click();
					}
					if ($(this).hasClass("active") && Dom.task_details.is(":visible")) return;
					Dom.log_task_container.find(".log-task-title.active").removeClass("active");
					$(this).addClass("active");
					$("#log_task_container .conversations-list ").fadeIn();
					$("#log_task_container .conversations-list ").animate({'width': "50%",'display': 'block'},function(){
						Doc.unbind('click', autoHideConversationDetail);
						Doc.bind('click', autoHideConversationDetail);
					});
				}

			});

	//显示成员分组
			$("#membesr-show-btn").bind("click", function() {

				var _This = $(this);
				$(this).hide();
				if ($(this).hasClass("leftward-double")) {
					$(this).siblings("ul").hide();
					$(this).parent().height($(this).parent().height());
					$(this).parent().addClass("show");
					$(this).parent().animate({width: "280px"}, function() {
						_This.removeClass("leftward-double").addClass("rightward-double");
						_This.attr("title", '点击隐藏分组');
						$(this).find(".members-groups-container").fadeIn();
						niceScrollMethod($("#member-groups-list"));
						_This.show();
						$(".left-triangle").eq(0).click();
					});
					Doc.unbind("click", members_list_nav_autohide);
					Doc.bind("click", members_list_nav_autohide);


				} else{

					$(this).siblings("div").hide();
					_This.removeClass("rightward-double").addClass("leftward-double");
					$(this).parent().animate({width: "56px"}, function() {
						_This.attr("title", '点击展开成员分组');
						$(this).find(".members-list-container").fadeIn();
						$(this).removeClass("show");
						$(this).removeAttr("style");
						_This.show();

					});
					Doc.unbind("click", members_list_nav_autohide);
				}

			});

	//展开成员分组
			Doc.on("click", '.member-groups-title', function() {
				var _This = $(this);
				if ($(this).next('ul').is(":visible")) {
					$(this).next('ul').slideUp(function() {
						_This.find(".down-triangle").removeClass("down-triangle").addClass("left-triangle");
					});
				} else {
					$(this).next('ul').slideDown(function() {
						_This.find(".left-triangle").removeClass("left-triangle").addClass("down-triangle");
					});
				}

			});

	//@成员功能
			Doc.on("click", '.clickShowMembers', function() {

				var parets = $(this).parents(".divstyle");
				if (parets.length <= 0) {
					parets = $(this).parents('.comment-input-content')
				}
				if (parets.length <= 0) return;
				var textarea = parets.find("div.input-div").length > 0 ? parets.find("div.input-div")[0] : parets.find("div.task-comment-input")[0];
				if ($(textarea).length <= 0) return;
				dropdown_custom(textarea, Dom.project_members_list);
				Dom.project_members_list.show();
				Dom.project_members_list.find("div.invite").hide();
				$("body").bind("click", function(event) {
					Dom.project_members_list.hide();
					Dom.project_members_list.find("div.invite").show();
					$("body").unbind("click");
				});
				$(textarea).addClass("active");
				Doc.off("click", ".project-members-list .lists");
				Doc.on("click", ".project-members-list .lists", function() {
					$(textarea).append("<input class='remembersomeone' userId='"+$(this).attr("userId")+"' type='button' email='"+$(this).find(".email").text()+"' value='@" + $(this).find(".name").text() + "' onclick='return false;'> &nbsp;");
					textarea.focus();

				});

			});

			Doc.on("click", Dom.a_remove, function(event) {
				$(this).parent().remove();
				return false;
			});

	//给项成员管理列表发送邀请按钮绑定事件    
			$(".project-members-list").find("div.invite").bind("click", show_project_members_invite);


	// 任务指派
		/*	Doc.on("click", ".appoint-next>.members", function() {
				Dom.project_members_list.prepend("<div class='members-filter'><input type='text' class='textarea_members ' data-role='none' placeholder='请输入想要查询的成员名称'></div>");
				dropdown_custom(this, Dom.project_members_list);
				Dom.project_members_list.show();
				Dom.project_members_list.find("input").focus();
				Doc.unbind("click", projectMembersListAutoide);
				Doc.bind("click", projectMembersListAutoide);
				Doc.off("click", ".project-members-list .lists");
				Doc.on("click", ".project-members-list .lists", function() {

					if (jointMethods.updateTaskOwner($("#task_details").attr('task-id'), $(this).attr("member-id"))) {
						var divFrag = $("<div></div>").prepend($(this).find('.members').clone());
						divFrag.find('.members').removeClass('members');
						var members = html.taskResponsible(divFrag.html(), $(this).find('.name').text());
						taskResponsibleRenew(members, $(this).find(".name").text());

					} else {
						commonMethods.showAlertNav("指派失败！");
					}
					Dom.project_members_list.hide();
					Dom.project_members_list.find('.members-filter').remove();
					Doc.off("click", ".project-members-list .lists");

				});

			});*/


	//设置任务完成时间
			Doc.on("click", "#task_details .operate_tags .Wdate", function() {

				if (!$(this).attr("tHtml")) $(this).attr("tHtml", $(this).html().replace(/"/g, "'"));
				WdatePicker({
					startDate: '%y-%M-01 00:00:00',
					dateFmt: 'yyyy-MM-dd',
					oncleared: cleared,
					onpicked: pickedFunc,
					errDealMode: 2,
					autoPickDate: false
				});


				Doc.unbind("click", hide_WdatePicker);
				Doc.bind("click", hide_WdatePicker);

				function pickedFunc(dp) {
					clearWdateFmtErr();
					if (task.updateTaskDueDate($("#grid tr.hovered").attr('id').split("-")[1], dp.cal.getNewDateStr())) {
						Dom.grid.find("tr.hovered span.task-date").html('<span class="sicon-calendar16 "></span>' + dp.cal.getNewDateStr().replace(/\d{4}-{1}/, "")).removeClass('null');
						$(this).addClass("set");
					} else {
						$("#task-complete-date").html($("#task-complete-date").attr("thtml"));
					}


					return false;
				}

				function cleared() {
					clearWdateFmtErr();
					if (task.updateTaskDueDate($("#grid tr.hovered").attr('id').split("-")[1], "")) {
						if ($(this).hasClass("set")) {
							$(this).removeClass("set");
						}
						$(this).html("截止日期");
						Dom.grid.find("tr.hovered span.task-date").text("");
					} else {
						$("#task-complete-date").html($(this).attr("thtml"));
					}


				}

			});

	//设置子任务完成时间
			Doc.on("click", "#subTasklist>tbody>tr  .text-line-tags>.glyphicon", function() {
				WdatePicker({
					startDate: '%y-%M-01 00:00:00',
					dateFmt: 'yyyy-MM-dd',
					oncleared: cleared,
					onpicked: pickedFunc,
					errDealMode: 2
				});
				Doc.unbind("click", hide_WdatePicker);
				Doc.bind("click", hide_WdatePicker);
				if (!$(this).attr("tHtml")) {
					$(this).attr("tHtml", $(this).html().replace(/"/g, "'"))
				};

				function pickedFunc(dp) {
					clearWdateFmtErr();
					$(this).removeClass("glyphicon-calendar").addClass("set").css("display", "none");
					if (updateSubTaskDueDate(dp.cal.getNewDateStr())) {
						Dom.grid.find("tr.hovered span.task-date").text(dp.cal.getNewDateStr().replace(/\d{4}-{1}/, ""));
						$(this).text($(this).text().replace(/\d{4}-{1}/, ""));
						$(this).text($(this).text().replace(/-/g, "."));
						$(this).addClass("set").removeClass("glyphicon-calendar").css('display', 'inline-block');
					} else {
						if ($(this).attr("tHtml") == "") {
							$(this).addClass("glyphicon-calendar").removeClass("set").text("");
						} else {
							$(this).html($(this).attr("thtml"));
						}

					}

				}

				function cleared() {
					clearWdateFmtErr();
					if (updateSubTaskDueDate("")) {
						$(this).html($(this).attr("tHtml")).text("").addClass("glyphicon-calendar");
						if ($(this).hasClass("set")) {
							$(this).removeClass("set");
						}
					} else {
						$(this).html($(this).attr("tHtml"));
					}

				}
			});


	//添加标签
			Doc.on("click", "#add-task-tags", function() {
				var add_task_tags_menu = $("#add-task-tags-menu");
				dropdown_custom(this, add_task_tags_menu);
				add_task_tags_menu.css({"left": parseInt(add_task_tags_menu.css("left")) - 100 + "px",display: "block"});
				Doc.unbind("click", hide_add_task_tags);
				Doc.bind("click", hide_add_task_tags);
			});



	//查看存档
			Doc.on("click", "span.show-archives-btn", function() {
				if (Dom.project_archives.is(":visible")) {
					$(this).attr("title", "点击查看项目存档");
					$(this).text("查看存档");
					Dom.project_archives.fadeOut(function() {
						Dom.project_list.fadeIn();
					});
				} else {
					$(this).attr("title", "返回项目列表");
					$(this).text("返回");
					Dom.project_list.fadeOut(function() {
						Dom.project_archives.fadeIn();

					});
				}
			});


	//显示成员详情 
			Doc.on("mouseenter", ".members-list-nav .members", function() {
				var friendId = this.getAttribute("id");
				var userId = $("#checkedUser").attr("user-id");
				var result = "";
				var url = "";
				if (friendId) {
					if (friendId == userId) {
						url = "/a/group/findMyProjectInfo";
					} else {
						url = "/a/group/findProjectInfoBetween";
					}
					startUp.postAsyncData(url, {
						"userId": friendId
					}, function(data) {
						result = data;
					});
				}
				var $div = $("<div class='members'></div>");
				if ($(this).find("img").length > 0) {
					$div = $("<div></div>").append($div.append($(this).find("img").clone().show()));;
				} else if ($(this).attr("src") != '') {
					$div.append($(this).clone().addClass('members'));
				} else {
					$div.append("<div class='members'>" + $(this).attr("title") + "</div>");
				}
				if (Body.find(".member-details").length > 0) {
					Body.find(".member-details").remove();
				}
				Doc.unbind("click", hideMembersDetails);
				Doc.one("click", hideMembersDetails);
				str = html.showMemberDetails($div.html(), $(this).attr('title'), $(this).attr('email'));
				if($(this).parent('li.member').length>0){
					$(this).parents('li.member').append(str);
				}else{
					$(this).append(str)
				}
				var parentLi = this.tagName == "LI" ? $(this) : $(this).parents('li').eq(0);
				var memberDetails=Body.find(".member-details");
				var _top = parentLi.offset().top;
				_top + 150 > Body.height() && (_top = Body.height() - 150);
				memberDetails.css({"top": _top + "px",left: parseInt($(".members-list-nav").offset().left + 20) + "px"});
				memberDetails.find('.project-number').text(result.data.oursProject);
				memberDetails.find('.task-number').text(result.data.uncompletTask + "/" + result.data.allTask);
				memberDetails.show();
			});


	//隐藏成员信息信息   
			var hideMembersDetails = function() {
				if (Body.find(".member-details").length > 0) {
					Body.find(".member-details").remove();
				}
			};

			Doc.on("mouseleave", ".members-list-nav .member,.members-list-nav .members", hideMembersDetails);

	//评论展开
			Doc.on("click", ".list-subject-operat .show-comment", function() {

				var list_subject_operat = $(this).parents(".list-subject-operat").eq('0');
				if (list_subject_operat.hasClass("show-commented")) {
					list_subject_operat.removeClass("show-commented");
				} else {
					list_subject_operat.addClass("show-commented");
				}
				list_subject_operat.nextAll().slideToggle()
			});

	/*//图片展示
			Doc.on('click', '.files a img,.imgs-div img,.file-images img,.preview', function(e) {
				alert(1);
				if (Body.find('.imgEnlargeNav').length <= 0) {
					
					Body.append(html.showImageLargeDiv);
				}
				var imgEnlargeNav = Body.find('.imgEnlargeNav');
				imgEnlargeNav.fadeIn();
				var imgshowDiv = imgEnlargeNav.find('.imgshowDiv');
				if (imgshowDiv.find('img').length > 0) {
					imgshowDiv.find('img').remove();
				}

				if (this.tagName !== 'IMG') {
					imgshowDiv.prepend("<img src='"+$(this).parent().attr('href')+"'>");
				} else {
					imgshowDiv.prepend($(this).clone());
				}
				
				var img = imgshowDiv.find('img');
				
				var _height,_width; 
				img.load(function(){
					_height = img.height(),
					_width = img.width(); 
					if (img.height() > (Doc.height() * 0.9) || img.width() > (Doc.width() * 0.8)) {
						var imgSize = setImagSize(img.width(), img.height());
						_height = imgSize.dheight;
						_width = imgSize.dwidth;
					}
					if(_width<400){ img.css({'border-right-width':(400-_width)/2+'px','border-left-width':(400-_width)/2+'px'});_width=400 }
					if(_height<400){ img.css({'border-top-width':(400-_height)/2+'px','border-bottom-width':(400-_height)/2+'px'});_height=400 }
					img.css({'width': _width,'height': _height,	display:'block'});
					imgshowDiv.css({'height': _height + 'px','margin-top': -(_height / 2) + 'px'});
					imgshowDiv.css({'width': _width + 'px','margin-left': -(_width / 2) + 'px'});
					imgshowDiv.css({'position': 'fixed','top': '50%','left': '50%','background-color': '#fff'});
					imgshowDiv.find("span.icon-remove").one('click', function() {
						imgEnlargeNav.fadeOut(function() {
							imgshowDiv.removeAttr('style')
						});
					});
				});
				img.error(function(){
					imgEnlargeNav.hide();
				})
				return false;
			});*/


	//评论滚动热门话题fixed
			$("#conversations").scroll(function() {
				var cProjectList = $(this).find('.c-project-list');
				var This = $(this);
				if (!(cProjectList.css('position') == 'fixed')) {
					cProjectList.css({
						'top': This.offset().top + 'px',
						'left': cProjectList.offset().left + 'px',
						'width': cProjectList.width() + 'px'
					});
					cProjectList.css({'position': 'fixed'})
				}
			});

	//添加好友界面显示
			$('#add-friends,.members-count .btn.dropdown>.add-friends').bind('click', function() {
				$('.members-groups-container').children("div:not('.add-members-nav'),ul").fadeOut(function() {
					$('.members-groups-container').addClass("add");
					$(this).find('.add-members-input').fadeIn();

				})
			});

	//点击添加好友按钮显示好友添加页面
			$(".members-list-container .sicon-addMembers").bind('click', function() {
				$("#membesr-show-btn").click();
				$("#add-friends").click();
			});

	//从添加好友界面返回到好友列表界面      
			$("#back-members-list").bind('click', function() {
				$(this).siblings('.add-members-input').find('input').val('');
				$(this).siblings('.add-members-input').find('ul').hide();
				$('.add-members-nav>.add-members-result ').attr('class','add-members-result');
				$(this).parents(".add-members-nav").fadeOut(function() {
					$('.members-groups-container').removeClass('add').children("div:not('.add-members-nav'),ul").css('opacity', 'inherit').fadeIn();
					$(this).removeAttr('style');
				})

			});


	//添加分组交互      
			$("#add-groups").bind("click", function() {
				var AddGroupsDiv;
				if (Dom.memberGroupsList.find('.add-groups-li').length > 0) {
					AddGroupsDiv = Dom.memberGroupsList.find('.add-groups-li');
					AddGroupsDiv.show();
				} else {
					AddGroupsDiv = $(html.AddGroupsDiv());
					Dom.memberGroupsList.append(AddGroupsDiv);
				}
				AddGroupsDiv.find(".icon-remove").unbind('click');
				AddGroupsDiv.find(".icon-remove").one('click', function() {
					$(this).parents("li").hide();
				});

				scrollPosition(Dom.memberGroupsList, AddGroupsDiv);
				AddGroupsDiv.find("#add-groups-input").focus();
			});


	//项目责任人指派
			Doc.on("keyup", '#Project_details .project-who', function() {
				var thisInput = $(this);
				jointMethods.loadSpaceMemberList($(this).val());
				dropdown_custom(this, Dom.project_members_list);
				Dom.project_members_list.fadeIn();
				Doc.off('click', '.project-members-list .lists');
				Doc.on('click', '.project-members-list .lists', function() {
					thisInput.val($(this).find('div.name').text());
					thisInput.attr('member-id', $(this).attr('member-id'));
					projectMembersListHide();
				});
				Doc.bind("click", projectMembersListHide);
			})

	//项目邀请成员 
			Doc.on("keyup", '#Project-member .invivte-member', function(e) {
				var thisInput = $(this);
				if (e.keyCode == 8 && thisInput.val() == '') {
					thisInput.prev('.invite-member').find('.delete').click();
					thisInput.focus();
					return false;
				}
				dropdown_custom(this, Dom.project_members_list);
				Dom.project_members_list.fadeIn();
				Doc.off('click', '.project-members-list .lists');
				Doc.on('click', '.project-members-list .lists', function() {
					thisInput.before(commonView.inviteMeber($(this).find('.name').text(), $(this).find('.email').text(), $(this).attr('member-id')));
					projectMembersListHide();
					thisInput.val('');
					thisInput.focus();
					thisInput.removeAttr('placeholder');
					thisInput.css({width: '50px'});
				});
				Doc.bind("click", projectMembersListHide);
			})

	//取消成员邀请 
			Doc.on("click", '.invite-member .delete', function() {
				$(this).parents('.invite-member').remove();
				return false;
			});
			Doc.on("click", '.invite-member .member-info', function() {
				return false;
			})

	//改变表单位置
			Doc.on("click", ".invite-member,.invite-members-list .cursor-text", function() {
				$(this).before($(this).parent().find('input'));
				$(this).parent().find('input').focus();
			})

	//自定义select菜单交互      
			Doc.on('click', ".input-group.dropdown>.dropdown-menu>li", function() {
				$(this).parent('ul').prev('input[type=text]').val($(this).text())
			})

	//收藏夹页面取消项目、标签、成员的额收藏。      
			Doc.on('click', '.left.show-favorite-list li>.sicon-star', function() {
				$(this).parent('li').remove();

			})

	//@指派责任人
			$("#taskTitleInput").bind('keyup', function(e) {
				var ThisInput = this;
				var valstr = $(ThisInput).val();
				var index = $(ThisInput).getCursorPosition();
				var textLength = 0;
				for (i = 0, len = valstr.length; i < len; i++) {
					if (valstr.charCodeAt(i) >= 0 && valstr.charCodeAt(i) <= 128) {
						textLength += 1;
					} else {
						textLength += 2;
					}
				}
				dropdown_custom(ThisInput, Dom.project_members_list);
				if (captureAite(e)) {

					space.loadSpaceMemberList(valstr.substring(index, valstr.length));


					Dom.project_members_list.fadeIn();
					Dom.project_members_list.css('left', parseInt(Dom.project_members_list.css('left')) + textLength * 10 + 'px');

					Doc.bind("click", projectMembersListHide);

				} else {
					if (valstr.indexOf('@') >= 0) {
						space.loadSpaceMemberList(valstr.substring(valstr.lastIndexOf('@', index) + 1, index));
						Doc.unbind("click", projectMembersListHide);
						Doc.bind("click", projectMembersListHide);
						($("#mentionMember").children().length == 0) && $("#mentionMember").parent().hide();
						!($("#mentionMember").children().length == 0) && $("#mentionMember").parent().show();
					}
				}
				Doc.off('click', '.project-members-list .lists');
				Doc.on('click', '.project-members-list .lists', function() {
					if ($(ThisInput).parent().find('.set-task-who').length == 0) {
						$(ThisInput).parent().prepend("<div class='set-task-who'></div>");
					}
					$(ThisInput).parent().find('.set-task-who').html($(this).find('.members').clone());

					valstr = valstr.substring(0, index - 1) + valstr.substring(index, valstr.length);
					$(ThisInput).val(valstr).focus();
				});
				
					var projectId = $("#checkedProject").attr("project-id");
					if(projectId){
						//复制Excel表内容添加多条任务
						if(e.ctrlKey&&e.keyCode==86){
							//获取点击的项目ID
						var str=$(this).val().trim().split(/\s*\n\s*/),
							postStr="",
							json='{"count":"'+str.length+'","projectId":"'+projectId+'","result":{';
						
						for(var i=0,len=str.length;i<len;i++){
							if(str[i].length>50){
								str[i]=str[i].substring(0,50);
							}
							if(str[i].length>0){
								var title = str[i].replace(/\"/g, "");
								postStr+='"data'+i+'":"'+title+'",';
							}
						}
						if(postStr){
							postStr = postStr.substring(0,postStr.length-1);
							postStr = postStr.replace(/\s/g, "");
						}
						json =json+postStr+"}}";
						
						$(this).val("").attr("maxlength",'50');
						var url ="/a/task/savetasks";
						
						startUp.postFormData(url, {"data":json}, function(data){
							var url = "/a/task/findtasklist";
							var data = {"projectId":projectId};
							jointMethods.loadTaskList(url, data);
						});
					}
				}
			})
			


	//chrome评论复制之后a标签可以修复的问题修复           
			Doc.on('keyup', '.conversations-lists .input-div,.comment-input-content .task-comment-input', function(e) {
				if (e.keyCode == 86 && e.ctrlKey) {
					$(this).find("a[contenteditable!='false']").each(function() {
						$(this).attr({'contenteditable': 'false'}).append("<span title='取消@舒佳锦' class='icon-remove-sign'></span>");
						$(this).find('.icon-remove-sign').bind('click', function() {
							$(this).parent().remove();
						})
					})
				}
			})

	//添加好友，添加分组回车添加
			Doc.on('keyup', '#add-groups-input', function(e) {
				e.keyCode == 13 && ($(this).parent().nextAll('span#add-new-friend-group').click(), $(this).nextAll('span#add-friend-btn').click());
			})


	//项目列表点击成员icon显示成员列表
			Doc.on('click', '.project-lists .project-data>.sicon-spaceMemberGray20, .project-archives-list .project-data>.sicon-spaceMemberGray20', function() {
				$("#checkedProject").attr("project-id", $(this).parent().parent().attr("id").split("-")[1]);
				Doc.off('shown.bs.modal', '#Manage_Project');
				Doc.on('shown.bs.modal', '#Manage_Project', showProjectMemberMenu);
				Doc.off('loaded.bs.modal', '#Manage_Project');
				Doc.on('loaded.bs.modal', '#Manage_Project', showProjectMemberMenu);
				$('#Manage_Project').modal({
					remote: $('.operate-nav .project-details').attr('shref')
				});

			});
			
			/*Doc.on('click', '.project-details', function() {
				var projectId = project.getProjectIdFromDifferentMenu(this);
				$("#checkedProject").attr("project-id", projectId);
				var shref = $(this).attr('shref');
				$('#Manage_Project').modal({
					remote: shref
				});

			});*/

			var showProjectMemberMenu = function() {
				$(this).find('#projectMemberMenu').length > 0 && ($(this).find('#projectMemberMenu').click());
			}

	//任务描述没有是显示请输入任务描述
			$('.task-des-content').bind('click', function() {
				if ($(this).text() == '输入任务描述！') {
					$(this).text('');
				}
			})

	//左右滚动
			$(".scroll-right,.scroll-left").bind('click', function() {
				if ($(this).hasClass('disable')) {
					return false;
				}
				var ThisUl = $(this).siblings('ul#responsible-log');
				var ulWidth = (ThisUl.find('li').length - 1) * (ThisUl.find('li').eq(0).width()) + 44 + 18;

				if ($(this).hasClass('scroll-right')) {
					var scrollBack = scrollX(ThisUl, ThisUl.scrollLeft() + ThisUl.width() * 2 > ulWidth ? ulWidth - ThisUl.scrollLeft() - ThisUl.width() + 10 : ThisUl.width());              
					if ($(".scroll-left").hasClass('disable')&&ThisUl.scrollLeft()>0) { //向右滚动了，取消向左滚动的禁用
						$(".scroll-left").removeClass('disable');
					}
					if (ThisUl.scrollLeft() + ThisUl.width() + ThisUl.width() >= ulWidth && !($(".scroll-right").hasClass('disable'))) { //向右滚动了到了最后，禁用向右滚动
						$(".scroll-right").addClass('disable');
					}
				} else {
					var scrollBack = scrollX(ThisUl, ThisUl.scrollLeft() - ThisUl.width() <= 0 ? -ThisUl.scrollLeft() : -ThisUl.width());
					if (ThisUl.scrollLeft() - ThisUl.width() <= 3 && !($(".scroll-left").hasClass('disable'))) { //向左滚动了0，禁用向左滚动
						$(".scroll-left").addClass('disable');
					}
					if ($(".scroll-right").hasClass('disable')) { //向左滚动了，取消禁用向右滚动
						$(".scroll-right").removeClass('disable');
					}
				}
			});

	//任务评论ctrl+回车提交
			Doc.on('keyup','.comment-input-content .task-comment-input ',function(e){
	           if(e.ctrlKey&&e.keyCode==13){
	        	   $("#taskCommentSubmit").click();
	           }
	           
			})
	//话题ctrl+回车提交，话题平路ctrl+回车提交
			Doc.on('keyup','#conversationEmails,.comment_input .input-div ',function(e){
	           if(e.ctrlKey&&e.keyCode==13){
	        	   $(this).siblings('.emotion-line').find("input[type='button']").click();
	           }
	           
			})
			
			
			$("#taskCommentContent").keyup(function(){
				if($(this).text()!=='') $('.task-comment-input-submit>button').fadeIn();
			})
	//自定义开关交互

			var switch_each=function(){
				$(".switch-container").find("label.switch").each(function(){
					if($(this).find("input")[0].value == "on"){
						$(this).removeClass("off").addClass("on");
						$(this).children("input").val("on");
					}else{
						$(this).removeClass("on").addClass("off");
						$(this).children("input").val("off");
					}
				});
			}
			var switch_do=function(){
				var span_btn=$(this).next("span");
				if($(this)[0].value=="on"){
					span_btn.stop().animate({left:"2px"},"fast","swing",function(){
						$(this).parent().removeClass("on").addClass("off");
						$(this).parent().children("input").val("off");
					});
				}else{
					span_btn.stop().animate({left:$(this).parent().width()-span_btn.width()-2+"px"},"fast","swing",function(){
						$(this).parent().removeClass("off").addClass("on");
						$(this).parent().children("input").val("on");
					});
				}
			}
			//$("#personage_setting").on("loaded.bs.modal",switch_each);
			//$("#personage_setting").on("shown.bs.modal",switch_each);
		    //$(document).on("click",'.switch-container label.switch input[type=text]',switch_do);
	//交互的事件绑定结束   
		}


	//对话上传附件
		Doc.on("click", ".add-conversation-file", function() {
			$(this).find("input[type=file]").click();
			$(this).find("input[type=file]").change(function() {

			});
		});


	//隐藏添加标签框
		var hide_add_task_tags = function(event) {
			if (!($(event.target).hasClass("add-task-tags-menu") || $(event.target).parents(".add-task-tags-menu").length > 0)) {
				$("#add-task-tags-menu").hide();
				Doc.unbind("click", hide_add_task_tags);
			}

		}

	//隐藏日期选择插件   
		var hide_WdatePicker = function() {
				$dp.hide();
				clearWdateFmtErr();
				Doc.unbind("click", hide_WdatePicker);
			}

	//清除WdateFmtErr属性
		var clearWdateFmtErr = function() {
			$(".WdateFmtErr").each(function() {
				$(this).attr("class", $(this).attr("class").replace(/WdateFmtErr/gi, ""));
			});
		}

	// 获取并成员列表
		var get_member = function() {

			var AThis = this;
			if ($(AThis).val() == "") {
				Dom.project_members_list.hide();
				return false;
			}
			dropdown_custom(AThis, Dom.project_members_list);
			Dom.project_members_list.show()
			$("body").bind("click", function(event) {
				Dom.project_members_list.hide();
				$("body").unbind("click");
			});

		}

	//隐藏成员列表
		var projectMembersListHide = function() {
			Dom.project_members_list.fadeOut();
			Doc.unbind("click", projectMembersListHide);
		}

	//自动隐藏成员列表
		var projectMembersListAutoide = function(e) {
			if (!($(e.target).hasClass("project-members-list") || $(e.target).parents(".project-members-list").length > 0)) {
				Dom.project_members_list.hide();
				Doc.unbind("click", projectMembersListAutoide);
				Dom.project_members_list.find(".members-filter").remove();
			}
		}

	//表单失去焦点
		var textarea_blur = function(e) {

			if (!Dom.project_members_invite.is(":visible")) {
				if ($(this).parent().find(".add_members").length > 0) {
					$(this).parent().find(".add_members").show();
				} else {
					$(this).parents(".appoint").html("<span class='icon-user'></span>未分配").attr("id", "un_appoint");
				}
				$(this).remove();
			}

		}


	//显示发送项目成员邀请表单   
		var show_project_members_invite = function(event) {
			Dom.project_members_invite.find("#inviteEmail,#inviteName").val($(event.target).text().replace("邀请：", ""));
			Dom.project_members_invite.find("#inviteName").click();
			Dom.project_members_invite.css({
				top: Dom.project_members_list.css("top"),
				left: Dom.project_members_list.css("left"),
				right: Dom.project_members_list.css("right"),
				bottom: Dom.project_members_list.css("bottom"),
				display: "block"
			});
			event.stopPropagation();
			Doc.bind("click", hide_project_members_invite);
		}


	//隐藏发送项目成员邀请表单     
		var hide_project_members_invite = function(event) {
			var e = event;
			if (!($(e.target).hasClass("project-members-invite") || $(e.target).parents(".project-members-invite").length > 0)) {
				Dom.project_members_invite.hide();
				Doc.unbind("click", hide_project_members_invite);
				$(".operate_tags .appoint").find("textarea").blur();
			};

		}


	//自定义下拉菜单的位置
		var dropdown_custom = function(This, menu) {
			var x = $(This).offset().left,
				y = $(This).offset().top + $(This).height(),
				wy = Doc.height(),
				wx = Doc.width(),
				ux = menu.width(),
				uy = menu.height(),
				dropdown_menu = menu;

			dropdown_menu.css({"position": "fixed"});
			if (wy - y - $(This).height() > uy || y < uy) {
				dropdown_menu.css({
					"top": y + parseInt($(This).css("padding-top")) + parseInt($(This).css("padding-bottom")),
					bottom: "unset"
				});
			} else {
				dropdown_menu.css({"bottom": wy - y + $(This).height(),top: "unset"});
			}

			if (wx - x > ux) {
				dropdown_menu.css({"left": x - 10,right: "unset"});
			} else {
				dropdown_menu.css({"right": wx - x - $(This).width(),left: "unset"});
			}

		}


	//任务详细浮动
		var fixed_task_details = function() {

			if (!(Dom.task_zindex.is(":visible"))) {
				Dom.task_zindex.before(Dom.task_details);
				Dom.task_details.fadeIn(function(){
					$(".task-responsible>ul").scrollLeft($(".task-responsible>ul").find('li').length*$(".task-responsible>ul").find('li').width());
				});
				Dom.task_zindex.fadeIn();
				Dom.task_details.addClass("task_details_fixed").removeClass('task-details-hide');
				Dom.task_zindex.one("click", hide_task_zindex);
				
			}

		};

	//点击任务详情以外区域,并且点击区域不会展开任务详细，就关闭任务详细
		var autoHideTaskDetails = function(e) {
			
			if ($(e.target).hasClass("taskFiles") || $(e.target).parents(".taskFiles").length > 0) return ;
			if ($(e.target).hasClass("qqFace") || $(e.target).parents(".qqFace").length > 0) return ;
			if ($(e.target).hasClass("log-task-title") || $(e.target).parents(".log-task-title").length > 0) return false;
			if ($(e.target).hasClass("taskEach") || $(e.target).parents(".taskEach").length > 0) return false;
			if ($(e.target).hasClass("imgEnlargeNav") || $(e.target).parents(".imgEnlargeNav").length > 0) return ;
			if (!($(e.target).hasClass("add-task-tags-menu") || $(e.target).parents(".add-task-tags-menu").length > 0 || $(e.target).hasClass("task_details") || $(e.target).parents(".task_details").length > 0 || $(e.target).hasClass("project-members-list") || $(e.target).parents(".project-members-list").length > 0)) {
				Doc.unbind('click', autoHideTaskDetails);
				hideTaskDetails()
			};


		}

	//任务详细隐藏

		var hideTaskDetails = function() {
			if (Dom.task_list_container.is(":visible")) {
				Dom.task_list_container.find("tr.hovered").removeClass("hovered");
			}

			if (Dom.task_details.prev('.log_task_container').length > 0) {
				Dom.task_details.prev('.log_task_container').stop().animate({"width": "100%"})
			}
			Dom.task_details.addClass('not-padding-right');
			Dom.task_details.stop().animate({"width": "0px"},500, function() {
				$(this).removeClass('not-padding-right').addClass('task-details-hide');
			});
			Dom.log_task_container.find(".log-task-title.active").removeClass("active");
			return false;
		}
		$("#task_details .hideMenu-btn").bind('click',function(){
			
			if (Dom.task_details.hasClass("task-details-hide")) {
				var parentWidth = Dom.task_list_container.width();				
				Dom.task_details.stop().animate({'width': parentWidth * 0.75 < 600 ? "600px" : "75%"}, 
					function() {
					
					Dom.task_details.removeClass("task-details-hide");
					$("#task_details .hideMenu-btn").html("&gt;");
				});

			} else {
				Dom.task_details.stop().animate({'width': "0px"}, function() {
					$(this).addClass("task-details-hide");
					$("#task_details .hideMenu-btn").html("&lt;");
				});

			}
			
		});
		
	//隐藏话题详细	
		var hideConversationDetail=function(){
			if($("#log_task_container .conversations-list").is(":visible")){
				$("#log_task_container .conversations-list").stop().animate({"width": "0px"}, function() {
					$(this).css("display", "none");
				});
			}
		}
	//自动隐藏话题详细
		var autoHideConversationDetail=function(e){
			if ($(e.target).hasClass("qqFace") || $(e.target).parents(".qqFace").length > 0) return ;
			if ($(e.target).hasClass("imgEnlargeNav") || $(e.target).parents(".imgEnlargeNav").length > 0) return ;				
			if (!($(e.target).hasClass(".conversations-list") || $(e.target).parents(".conversations-list").length > 0 || $(e.target).hasClass("project-members-list") || $(e.target).parents(".project-members-list").length > 0)) {
				Doc.unbind('click', autoHideConversationDetail);
				hideConversationDetail()
			};
		}
		
	//任务详细浮动隐藏
		var hide_task_zindex = function() {
			var taskId = $("#task_details").attr("task-id");
			var title = $("#detailTaskTitle-" + taskId).text();
			if (title) {
				$(".calendar_" + taskId).children("div.one-claendar").text(title);
			} else {
				$(".calendar_" + taskId).children("div.one-claendar").text("未命名");
			}

			Dom.task_zindex.fadeOut();
			Dom.task_details.fadeOut(function() {
				Dom.task_details.removeClass("task_details_fixed");
				$(".panels.task-nav").append(Dom.task_details);
				if (Dom.task_details.width() != 0) {
					Dom.task_details.show();
				}
				Dom.task_details.hide();
			});

		};


	//显示拖动操作提示
		var remove_htime;
		var show_operat_info = function(text, time) {
			var htime = time ? time * 1000 : 1000;
			var alert_info;
			if ($("body").find("#alert_info").length > 0) { //如果已经加载，直接显示提示框
				alert_info = $("body #alert_info");
				clearTimeout(remove_htime);

			} else { //如果未加载，调用html对象加载。

				alert_info = $(html.alert_info());
				$("body").append(alert_info);
				var _width = -parseInt((alert_info.css('width')));
				alert_info.css({"margin-left": _width});
				alert_info.bind("mouseenter", function() {
					clearTimeout(remove_htime);
				});

				alert_info.bind("mouseleave", function() {
					remove_htime = setTimeout(hide_alert_info, htime);
				});

			}
			alert_info.show();
			alert_info.find(".content").html(text);
			alert_info.stop().animate({'margin-left': "0"}, function() {
				remove_htime = setTimeout(hide_alert_info, htime);
				$(this).find(".icon-remove").one("click", hide_alert_info);
			});

		}

	//隐藏操作提示框
		var hide_alert_info = function() {
			var _width = -parseInt(($("body #alert_info").css('width')));
			$("body #alert_info").stop().animate({'margin-left': _width}, function() {
				$(this).fadeOut();
				clearTimeout(remove_htime);
			});
		}

	//设置任务责任人  
		var taskResponsibleRenew = function(member_html, membersName) {
			$("#responsible-log").find('.last-child').removeClass("last-child");
		  	$("#responsible-log").find('.appoint-next').after(member_html);
		  	if($("#responsible-log").offset().left+$("#responsible-log").width()<$("#responsible-log").find('.appoint-next').offset().left&&$('.scroll-right').hasClass('disable')){
		  		$('.scroll-right.disable').removeClass('disable')
		  		$(".scroll-right").click();
		  	}
			Doc.find('.operate_tags .appoint').html('<span class="sicon-user"></span>' + membersName);
			Dom.grid.find("tr.hovered span.task-who,tr.move_there span.task-who").html('<span class="sicon-user"></span>' + membersName).removeClass("null");
		}

	
		

		
	//任务评论上传附件  
		var comment_add_file = function() {
			var _height = $(".task_details_container").height() - parseInt($('.comment-input-content').css('padding-top')) - parseInt($('.comment-input-content').css('padding-bottom'));
			$('#taskCommentContent').height(_height - $("#taskCommentAttachment").height() - 30);
			if (!$(".comment-input-content").hasClass('col') && $('#taskCommentContent').height() < $("#taskCommentAttachment").height()) {
				$(".comment-input-content").addClass('col')
			}
			if ($(".comment-input-content").hasClass('col')) {
				$('#taskCommentContent').css("height", '100%');
			}
		}

	//自动收起成员列表
		var members_list_nav_autohide = function(e) {
			if($("#membesr-show-btn").hasClass('rightward-double')){
				if (!($(e.target).hasClass("members-list-nav") || $(e.target).parents(".members-list-nav").length > 0)) {
					if ($(".members-groups-container").hasClass("moveing")) {
						$(".members-groups-container").removeClass("moveing");
						return;
					}
					$("#membesr-show-btn").click();
					Doc.unbind("click", members_list_nav_autohide);
				}
			}
		}

	//滚动到指定位置
		var scrollPosition = function(_parent, _child) {
			var PoffsetTop = _parent.offset().top,
				CoffsetTop = _child.offset().top,
				Pheight = _parent.height(),
				Cheight = _child[0].offsetHeight,
				PscrollTop = _parent.scrollTop(),
				scrollVal = CoffsetTop - PoffsetTop - Pheight - PscrollTop + Cheight;
			_parent.scrollTop(scrollVal);
		}


		var captureAite = function(e) {
			return e.keyCode == 50 && e.shiftKey;
		}

	//设置滚动图片大小
		var setImagSize = function(width, height) {
			var scale = (width * 0.8) / width;
			if (height >= width || height >= Doc.height() * 0.9) {
				var scale = (height * 0.9) / height;
			}
			height = height * scale;
			width = width * scale;
			if (height > (Doc.height() * 0.9) || width > (Doc.width() * 0.8)) {
				return setImagSize(width, height)
			} else {
				return {dwidth: width,dheight: height}
			}
		}

	//横向滚动  
		var doScrollX;
		var scrollX = function(obj, scrollVal) {
			var time = 1000,
				stepTime = 5,
				stepVal = scrollVal / (1000 / 5),
				scrollValAll = obj.scrollLeft() + scrollVal;
			clearInterval(doScrollX);
			doScrollX = setInterval(function() {
				var addVal = (stepVal > 0 ? Math.ceil(obj.scrollLeft()) : Math.floor(obj.scrollLeft())) + (stepVal > 0 ? Math.ceil(stepVal) : Math.floor(stepVal)) + 0.2;
				obj.scrollLeft(addVal);
				if (stepVal > 0 && obj.scrollLeft() >= scrollValAll) clearInterval(doScrollX);
				if (stepVal < 0 && obj.scrollLeft() <= scrollValAll) {
					obj.scrollLeft(Math.ceil(obj.scrollLeft() - 2));
					clearInterval(doScrollX);
				}
			}, stepTime)

			return obj.scrollLeft();

		}


		return {
			defaultSetting: defaultSetting,
			plugin_call: plugin_call,
			EventHandler: EventHandler,
			fixed_task_details: fixed_task_details,
			show_operat_info: show_operat_info,
			taskResponsibleRenew: taskResponsibleRenew,
			comment_add_file: comment_add_file
		}
	})();
	matter.defaultSetting(); //执行一些默认设置，清除一些浏览器默认行为 
	matter.plugin_call(); //加载插件
	matter.EventHandler(); //执行操作DOM元素的交互

	//members_drag(); //成员拖动方法执行

	//task_drag(); //任务拖动排序


});
