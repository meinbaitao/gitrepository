 $(function(){
	var   Dom = {
				hideMenu_btn: $("#hideMenu-btn"),
				container: $(".main-container-scroll>.main-container"),
				project_archives: $(".project-archives-list"),
				project_list: $(".project-lists"),
				panels_switch: "[panels-target]",
				projectMembersList:$("body .project-members-list"),
				},
		  Doc = $(document),
		  left_menu_width = 310;
	 
		//显示隐藏菜单
		Dom.hideMenu_btn.bind("click", function() {

			if (Dom.container.hasClass("menu-hide")) {

				Dom.container.stop().animate({'padding-left': left_menu_width}, '300', 'swing', function() {
					$(this).removeClass("menu-hide");
					Dom.hideMenu_btn.html("&lt;");
				});

			} else {

				Dom.container.stop().animate({'padding-left': "1px"}, '900', 'swing', function() {
					$(this).addClass("menu-hide");
					Dom.hideMenu_btn.html("&gt;");
				});

			}

		});
		
		//项目列表调用滚动条插件
		Dom.project_list.niceScroll({
			cursorcolor: "#ccc",
			cursorwidth: '5',
			cursorborderradius: '3px',
			cursorborder: '',
			railpadding: {top: 2,right: 0,left: 2,bottom: 0},
			railalign: 'right'
		});

        //存档项目列表调用滚动条插件
		Dom.project_archives.niceScroll({
			cursorcolor: "#ccc",
			cursorwidth: '5',
			cursorborderradius: '3px',
			cursorborder: '',
			railpadding: {top: 2,right: 0,left: 2,bottom: 0},
			railalign: 'right'
		});
		

		//查看存档
		Doc.on("click", "span.show-archives-btn", function() {
			if (Dom.project_archives.is(":visible")) {
				$(this).attr("title", "点击查看项目存档");
				$(this).text("查看存档");
				Dom.project_archives.fadeOut(function() {
					Dom.project_list.fadeIn(function(){
						var size = Dom.project_list.find(".current").size();
						if(size == 1){
							Dom.project_list.animate({scrollTop:0},1);
						}
					});
				});
			} else {
				$(this).attr("title", "返回项目列表");
				$(this).text("返回");
				Dom.project_list.fadeOut(function() {
					Dom.project_archives.fadeIn(function(){
						var size = Dom.project_archives.find(".current").size();
						if(size == 1){
							Dom.project_archives.animate({scrollTop:0},1);
						}
					});
				});
			}
		});
		
	      //展开团队项目
	      $(document).on('click',".team-project>.group-info>span",function(){

	          var triangle=$(this).parent().children('span').eq(0);
	          if(triangle.hasClass("triangle-left")){//展开分组

	            $(this).parent().next('.team-project-list').stop().slideDown(function(){
	                 triangle.attr('class','triangle-down size6')
	            });
	          }else{//收起分组
	            $(this).parent().next('.team-project-list').stop().slideUp(function(){
	                 triangle.attr('class','triangle-left size6')
	            });
	          }
	      });
	      
	    //任务、图表、对话、动态面板切换
			Doc.on("click", Dom.panels_switch, function() {

				if ($(this).attr("panels-target") == "") return;
				var show_panels = $($(this).attr("panels-target"));
				if (show_panels.length <= 0) return;
				show_panels.siblings(".current").fadeOut(function() {
					$(this).removeClass("current");
					show_panels.fadeIn(function() {
						$(this).addClass("current");
						if ($(this).hasClass("task-calendar")) {
							$('#calendar').fullCalendar('destroy'); 
							full_calendar();
						}
					});
				});
			})
			//@指派责任人
			$(document).on('keyup',"#taskTitleInput",function(e){
					 
		      
			//$("#taskTitleInput").bind('keyup', function(e) {
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
				commonMethods.settingLocailty(ThisInput, Dom.projectMembersList);
				if (captureAite(e)) {

				


					Dom.projectMembersList.fadeIn();
					Dom.projectMembersList.css('left', parseInt(Dom.projectMembersList.css('left')) + textLength * 10 + 'px');

					Doc.bind("click", projectMembersListHide);

				} else {
					if (valstr.indexOf('@') >= 0) {
						
						var spaceId = $("#checkedSpace").attr("space-id");
						if(!spaceId){return;}
						var teamId = $("#show-bookmark-group-list").attr("teamid");
						$("#mentionMember").empty();
						$(".to-include-metion-member").empty();
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
				//复制Excel表内容添加多条任务
				var projectId = $("#checkedProject").attr("project-id");
				if(projectId){
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
			});
			
			var captureAite = function(e) {
				return e.keyCode == 50 && e.shiftKey;
			}
			
			
			//隐藏成员列表
			var projectMembersListHide = function() {
				Dom.projectMembersList.fadeOut();
				Doc.unbind("click", projectMembersListHide);
			}
 })
 
 
 
 
 
 
 
 