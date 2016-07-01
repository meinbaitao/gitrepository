//一些共用方法的取
var commonMethods = {
  defaultSetting : function(){//取消回车提交表单
	  $(document).on('keydown','input,textarea',function(event){	

		 var target, code, tag;  
         if (!event) {  
             event = window.event; //针对ie浏览器  
             target = event.srcElement;  
             code = event.keyCode;  
             if (code == 13) {  
                 tag = target.tagName;  
                 if (tag == "TEXTAREA") { return true; }  
                 else { return false; }  
             }  
         }else {  
             target = event.target; //针对遵循w3c标准的浏览器，如Firefox  
             code = event.keyCode;  
             if (code == 13) {  
                 tag = target.tagName;  
                 if (tag == "INPUT") { return false; }  
                 else { return true; }   
             }  
         }  
	});
	 
  }, 
//显示确认框
  showConfirmNav:function (title, yes, no) {

		var str = "";
		if ($("body").find('.delete-bg-shade').length > 0) {
			$(".delete-bg .confirm-info").html(title);
		} else {
			str = commonView.showConfirmDiv(title);
			$("body").append(str)
		}

		$("body").find('.delete-bg-shade').fadeIn(function() {
			$(this).unbind('click');
			$(this).bind('click', function() {
				commonMethods.hideConfirmNav();
				if (no && typeof(no) == 'function') no();
			});
		});
		$("body").find('.delete-bg').fadeIn(function() {
			$(this).find('.confirm-yes').unbind("click");
			$(this).find('.confirm-yes').bind("click", function() {
				commonMethods.hideConfirmNav();
				if (yes && typeof(yes) == 'function') yes();
			});
			$(this).find('.confirm-no').unbind("click");
			$(this).find('.confirm-no').bind("click", function() {
				commonMethods.hideConfirmNav();
				if (no && typeof(no) == 'function') no();
			});
		});
	},

//隐藏确认框
	hideConfirmNav:	function() {
		$("body").find('.delete-bg-shade').fadeOut();
		$("body").find('.delete-bg').fadeOut()
	},

//显示提示框
	showAlertNav:function(title, yes, no) {

		var str = "";
		if ($("body").find('.alert-bg-shade').length > 0) {
			$(".alert-bg .alert-info").html(title);
		} else {
			str = commonView.showAlertDiv(title);
			$("body").append(str)
		}

		$("body").find('.alert-bg-shade').fadeIn(function() {
			$(this).unbind('click');
			$(this).bind('click', function() {
				commonMethods.hideAlertNav();
			});
		});
		$("body").find('.alert-bg').fadeIn(function() {
			$(this).find('.alert-yes').unbind("click");
			$(this).find('.alert-yes').bind("click", function() {
				commonMethods.hideAlertNav();
			});

		});
		return false;
	},


//隐藏提示框
	hideAlertNav:function () {
		$("body").find('.alert-bg-shade').fadeOut();
		$("body").find('.alert-bg').fadeOut();
	},
	//显示操作结构提示框
	operatResultAlert:function (content,result){
		var timeOut='';
		if($('body>.operat-result-alert').length>0){
			$('body>.operat-result-alert').fadeOut(function(){
				$(this).remove();
			})
		}
		
		operatResultAlertHtml=$(commonView.operatResultAlert(content,result));
		$("body").append(operatResultAlertHtml);
		operatResultAlertHtml.find('.close-operat-alert').click(function(){
			operatResultAlertHtml.fadeOut(function(){$(this).remove()})
		});
		operatResultAlertHtml.animate({'top':'50px'},function(){
			timeout=setTimeout(function(){operatResultAlertHtml.fadeOut(2000,function(){$(this).remove()})},3000);
		});
		
		
	},
	//自定义下拉菜单的位置
	
	settingLocailty:function(relative, LocailtyElements) {
		if(relative.length<1||LocailtyElements.length<1){ return };
		var x = $(relative).offset().left,
			y = $(relative).offset().top + $(relative).height(),
			wy = $(document).height(),
			wx = $(document).width(),
			ux = LocailtyElements.width(),
			uy = LocailtyElements.height();

		LocailtyElements.css({"position": "fixed"});
		if (wy - y - $(relative).height() > uy || y < uy) {
			LocailtyElements.css({
				"top": y + parseInt($(relative).css("padding-top")) + parseInt($(relative).css("padding-bottom")),
				bottom: "unset"
			});
		} else {
			LocailtyElements.css({"bottom": wy - y + $(relative).height(),top: "unset"});
		}

		if (wx - x > ux) {
			LocailtyElements.css({"left": x - 10,right: "unset"});
		} else {
			LocailtyElements.css({"right": wx - x - $(relative).width(),left: "unset"});
		}

	},
	
    //空间选中成员	
	mebersSelected:function(mebers){
		
		 var CopyLi=mebers.parents('li').eq(0).clone();
		 
		     closeSpan=$("<span class='close-operat-alert'></span>"); 
		     CopyLi.find('label').remove();	       
	         CopyLi.append(closeSpan);
	         closeSpan.click(commonMethods.cancelSelected);
	      $("#AddTeamMembers .selected-area .member-list").prepend(CopyLi);
	       mebers.parent().addClass('selected');
	       mebers.prop('checked',true);
	}, 
	
	//取消空间成员选中
	cancelSelected:function(){
		var MoveLi= $("#AddTeamMembers .select-area .member-list").find("li[user-id="+$(this).parent().attr('user-id')+"]");
		    MoveLi.find('AddTeamMembers .sicon-checkbox>input').prop('checked',false);
		    MoveLi.find('.sicon-checkbox').removeClass('selected');
		    if(MoveLi.parents('li').length>0){
		    	MoveLi.parents('li').eq(0).find('.group-info>.sicon-checkbox>input').prop('checked',false);
		    	MoveLi.parents('li').eq(0).find('.group-info>.sicon-checkbox').removeClass('selected');
		    }
		    $(this).parent('li').remove();
	},
	//空间成员回选
	backMebersSelected:function(mebers,modal){
		
		$(mebers).each(function(){
            var uId=$(this).attr('user-id'),
                checkedLi=$(modal+" .select-area").find("li[user-id="+uId+"]");
                commonMethods.mebersSelected(checkedLi.find(".sicon-checkbox>input"));               
            
            
		});

	}
	
	

  
}


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

commonMethods.defaultSetting();//取消回车提交表单的情况

$(function(){	
	var Doc=$(document),
	    Body=$("body"),
	    Dom={
		    taskDetails:$(".main-container-scroll #task_details"),
		    projectMembersList:$("body .project-members-list"),
		    grid:$(".task-container>.list-container>table"),
		    siconRemove:"span.deleteTaskTags,span.cancelFile"
		};
	    //搜索操作相应的效果
	    $(".website-search>input").bind("click",function(){
	    	if(!$(this).parent().hasClass('active')){
	    		$(this).parent().addClass('active');
	    		$(this).attr("placeholder","搜索");
	    		$(this).parent().animate({'margin-left':"-218px",'width':'218px'},function(){
	    			$(this).find('input').val($(this).find('input').attr('old-val'));
	    		});
	    	}
	    });
	  //1231  
	    $(document).on('blur',".website-search.active>input",function(){

			 $(this).attr("old-val",$(this).val()).val("");
			 $(this).parent().removeClass('open');
			 $(this).attr("placeholder","");
    		 $(this).parent().animate({'margin-left':"-60px",'width':'60px'},function(){
    			$(this).removeClass('active');
    		});
    		
	    });
   
	    $(document).on('keyup',".website-search.active>input",function(e){
	      if($(this).val().trim()!==''){
	    	$(this).parent().addClass('open');
	    	$(this).siblings('.dropdown-menu').prepend("<li>"+$(this).val().trim()+"</li>")
	      }
	     /* if(e.which == 13){
	    		location.href = "index?menuType=search";
	        } */
	    })
//显示任务详情
	Doc.on("click", ".list-container>table tr .text-line-title,.list-container>table tr .text-line-tags ", function() {	
		$(this).parents('tr').eq(0).addClass("current");
		$(this).parents('tr').eq(0).siblings("tr.current").removeClass("current");
		if (Dom.taskDetails.hasClass("task-details-hide")||Dom.taskDetails.hasClass("task-details-hide")||!Dom.taskDetails.is(":visible")) {
			Dom.taskDetails.css({'display':'block','width': "65%"});
			Dom.taskDetails.stop().animate({"right": "0"},function(){
				$(this).removeClass('task-details-hide');
			});
		}
	});
//隐藏任务详情栏
	Doc.on("click", "#task_details .hideMenu-btn", function() {
		if (Dom.taskDetails.hasClass("task-details-hide")) {
			Dom.taskDetails.css({'display':'block','width': "65%"});
			Dom.taskDetails.stop().animate({'right':  "0"}, 
				function() {
				Dom.taskDetails.removeClass("task-details-hide");
				$("#task_details .hideMenu-btn").html("&gt;");
			});
		} else {
			Dom.taskDetails.css({'display':'block','width': "65%"});
			Dom.taskDetails.stop().animate({'right': "-65%"}, function() {
				$(this).addClass("task-details-hide");
				$("#task_details .hideMenu-btn").html("&lt;");
				Dom.taskDetails.css({'display':'none'});
			});
		}
	});
	//当焦点移到快速发起任务框内的时候，详情页面应该收起
    Doc.on('click',".add-task-nav",function(){
    	Dom.taskDetails.stop().animate({'right': "-65%"}, function() {
			$(this).addClass("task-details-hide");
			$("#task_details .hideMenu-btn").html("&lt;");
			Dom.taskDetails.css({'display':'none'});
		});
	});
    Doc.on('click',".list-container .taskEach .text-line-grid>div:not(:first-child)",function(){
    	Dom.taskDetails.css({'display':'block','width': "65%"});
    	Dom.taskDetails.stop().animate({'right': "0"},function() {
			$(this).removeClass("task-details-hide");
			$("#task_details .hideMenu-btn").html("&gt;");
		});
	});
	// 任务指派
	Doc.on("click", ".appoint-next>.members", function() {
		$(".project-members-list").removeClass("positiontop1");
		$("#mentionMember").empty();
		Dom.projectMembersList.find("#mentionMember").remove();
		Dom.projectMembersList.prepend("<div class='members-filter'><input type='text' class='textarea_members ' data-role='none' placeholder='请输入想要查询的成员名称'></div>");
		Dom.projectMembersList.append("<div id='mentionMember'></div>");
		commonMethods.settingLocailty(this, $(".project-members-list"));
		Dom.projectMembersList.show();
		Dom.projectMembersList.find("input").focus();
		Doc.unbind("click", projectMembersListAutoide);
		Doc.bind("click", projectMembersListAutoide);
		Doc.off("click", ".project-members-list .lists");
		Doc.on("click", ".project-members-list .lists", function() {
			
			if (jointMethods.updateTaskOwner($("#task_details").attr('task-id'), $(this).attr("member-id"))) {
				var divFrag = $("<div></div>").prepend($(this).find('.members').clone());
				divFrag.find('.members').removeClass('members');
				var members = commonView.taskResponsible(divFrag.html(), $(this).find('.name').text());
				taskResponsibleRenew(members, $(this).find(".name").text());
				$("#task-" + $("#task_details").attr('task-id')).find("span.task-who").text($(this).find('.members').attr("title"));
				$("#appoint").empty().append("<span class='sicon-user'></span>" + $(this).find('.members').attr("title"));
			} else {
				CommonMethods.showAlertNav("指派失败！");
			}
			Dom.projectMembersList.hide();
			Dom.projectMembersList.find('.members-filter').remove();
			Doc.off("click", ".project-members-list .lists");
		});
	});
//设置任务责任人  
	var taskResponsibleRenew = function(member_html, membersName) {
		$("#responsible-log").find('.last-child').removeClass("last-child");
	  	$("#responsible-log").find('.appoint-next').after(member_html);
	  	if($("#responsible-log").offset().left+$("#responsible-log").width()<$("#responsible-log").find('.appoint-next').offset().left&&$('.scroll-right').hasClass('disable')){
	  		$('.scroll-right.disable').removeClass('disable')
	  		$(".scroll-right").click();
	  	}
		Doc.find('.operate_tags .appoint').html('<span class="sicon-user"></span>' + membersName);
		Dom.grid.find("tr.current span.task-who,tr.move_there span.task-who").html('<span class="sicon-user"></span>' + membersName).removeClass("null");
	}
//隐藏成员列表
	var projectMembersListHide = function() {
		Dom.projectMembersList.fadeOut();
		Doc.unbind("click", projectMembersListHide);
	}
//自动隐藏成员列表
	var projectMembersListAutoide = function(e) {
		if (!($(e.target).hasClass("project-members-list") || $(e.target).parents(".project-members-list").length > 0)) {
			Dom.projectMembersList.hide();
			Doc.unbind("click", projectMembersListAutoide);
			Dom.projectMembersList.find(".members-filter").remove();
		}
	}
//空间成员选中
	$(document).on('click',"#new_team .add-members-sign",function(){
		//Doc.off("click", "#AddTeamMembers .sicon-checkbox input");
		var AddUrl=ctxSurfond+'/modal/Add-Director.html';
		$('#Add-Director').modal({
			remote:AddUrl
			})
			$('#Add-Director').modal('show');
    });	
//展开空间成员分组
    $(document).on('click',".member-group>.group-info>span",function(){
        var triangle=$(this).parent().children('span').eq(0);
        if(triangle.hasClass("triangle-left")){//展开分组

          $(this).parent().next('ul').stop().slideDown(function(){
               triangle.attr('class','triangle-down')
          });
        }else{//收起分组
          $(this).parent().next('ul').stop().slideUp(function(){
               triangle.attr('class','triangle-left')
          });
        }
    });		
//空间成员选中
    $(document).on('click','#AddTeamMembers .sicon-checkbox input',function(){
		if(this.checked){
			if($(this).parents('li').eq(0).hasClass('member-group')){
				$(this).parents('li.member-group').find("ul label").each(function(){
					
					if(!$(this).find("input")[0].checked){
						//$(this).trigger('click');
						commonMethods.mebersSelected($(this).find("input"));	
					}
				})
				 $(this).parent().addClass('selected');
			}else{
				commonMethods.mebersSelected($(this));
			}
		}else{
			if($(this).parents('li').eq(0).hasClass('member-group')){
				   $(this).parent().removeClass('selected');
				   $(this).parents('li.member-group').find("ul label").each(function(){
					var userID=$(this).parent('li').attr('user-id');
					//$(this).click();
					$(this).removeClass('selected');
					$("#AddTeamMembers .selected-area .member-list").find("li[user-id="+userID+"]").remove();
				})
			}else{
			   var userID=$(this).parents('li').attr('user-id');
			   $("#AddTeamMembers .selected-area .member-list").find("li[user-id="+userID+"]").remove();
			   $(this).parent().removeClass('selected');
			}
			if($(this).parents('li.member-group').length>0){
			$(this).parents('li.member-group').eq(0).find('.group-info>.sicon-checkbox>input').prop('checked',false);
			$(this).parents('li.member-group').eq(0).find('.group-info>.sicon-checkbox').removeClass('selected');
			}
		}
	});
    Doc.on("click", "#AddTeamMembers .select-content .member-group li", function(event) {
    	$(this).find("input").trigger('click');
		
    });
//载入添加空间成员模态框   》多选
	Doc.on('click',".team-members>.sicon-addTeamMember,#new_team .add-members",function(){
		var AddTeamMembersUrl=ctxSurfond+'/modal/AddTeamMembers.html';
	     if($(this).parents(".team-members").length>0||$(this).parents("#new_team").length>0||$(this).parents("#add-staff").length>0){
	 		$('#AddTeamMembers').on("shown.bs.modal",function(){
	 			$("#AddTeamMembers .select-area .member-group li").append("<div class='group-members-div'></div>");
	 			$("#AddTeamMembers .botton>.btn-orange").unbind('click');
		 		$("#AddTeamMembers .botton>.btn-orange").bind("click",function(){
		 			  //$("#Add-Director .selected-area .member-list>li").remove();
		 	          var membersStr='';
		 	          var CopyLi=$("#AddTeamMembers .selected-area .member-list>li").clone();
		 	          $("#AddTeamMembers .selected-area .member-list>li").each(function(){
		 	        	  membersStr+="<span user-id='"+$(this).attr("user-id")+"'>"+$(this).find(".member-name").text()+";</span>" ;
		 	          });		 	         
		 	       $("#AddTeamMembers .selected-area .member-list").html("");
		 	       $("#AddTeamMembers .select-area .member-list .sicon-checkbox.selected>input").prop('checked',false);
		 	       $("#AddTeamMembers .select-area .member-list .sicon-checkbox.selected").removeClass('selected');
		 	       //$('#new_team').modal('show');
		 	       $("#members-list").html(membersStr);
		 	       $("#AddTeamMembers .selected-area .member-list>li").remove();
			 	   $("#AddTeamMembers .selected-area .member-list").append(CopyLi);
		 		})
		 		$("#AddTeamMembers .botton>.btn-gray").unbind('click');
		 		$("#AddTeamMembers .botton>.btn-gray").bind("click",function(){ 
		 		});
	 		});
	     };
		$('#AddTeamMembers').modal({
			remote:AddTeamMembersUrl
			})
	});
//模态框切换
    Doc.on('click',".team-members>.sicon-addTeamMember",function(){
	 		$('#AddTeamMembers').on("shown.bs.modal",function(){		
	 			$('#AddTeamMembers .btn-gray').attr("data-target","");
	 			$('#AddTeamMembers .btn-orange').attr("data-target","");
	 			$('#AddTeamMembers .btn-orange').attr("id","save-team-members");
	 		});
	});
    Doc.on('click',".sicon-addTeam",function(){
	 		$('#AddTeamMembers').on("shown.bs.modal",function(){		
	 			$('#AddTeamMembers .btn-gray').attr("data-target","#new_team");
	 			$('#AddTeamMembers .btn-orange').attr("data-target","#new_team");
	 			$('#AddTeamMembers .btn-orange').attr("id","");
	 		});
	});
//全选反选
	Doc.on("click", "#AddTeamMembers .select-area .group-info>label>input", function(event) {
		    if(this.checked){    
		        $(this).parent().parent().next().find("input").attr("checked", true);
		    	$(this).parent().parent().next().find("label").addClass("selected");
		    }else{    
		    	$(this).parent().parent().next().find("input").attr("checked", false);
		    	$(this).parent().parent().next().find("label").removeClass("selected");
		    }    
	});
	Doc.on("DOMNodeInserted", "#AddTeamMembers .selected-area .member-list li", function(event) {
	    $(this).find(".group-members-div").remove();
	});
//载入添加成员模态框 》单选
	Doc.on('click',"#add-staff .add-members",function(){
	     if($(this).parents("#add-staff").length>0){
	 		$('#Add-Department').on("shown.bs.modal",function(){		
	 			$("#Add-Department .botton>.btn-orange").unbind('click');
		 		$("#Add-Department .botton>.btn-orange").bind("click",function(){
		 	          var membersStr='';
		 	          var CopyLi=$("#Add-Department .selected-area .member-list>li").clone();
		 	          var liID=CopyLi.attr("user-id") ;
		 	          var userID=$('.selected-area .member-list').children().attr('user-id');
		 	          $(".selected-area .member-list>li").each(function(){
		 	        	  membersStr+="<span id='"+userID+"'>"+$(this).find(".member-name").text()+"</span>";
		 	          });		 	         
		 	      $(".selected-area .member-list").html("");
		 	      $(".select-area .member-list .sicon-checkbox.selected>input").prop('checked',false);
		 	      $(".select-area .member-list .sicon-checkbox.selected").removeClass('selected');
		 	      $('#add-staff').modal('show');	
		 	      $(".dropdown-div .invite-organize-id").children().remove();
		 	      $(".dropdown-div .invite-organize-id").append(membersStr);
		 	      $(".dropdown-div .invite-organize-id").children("span:nth-child(2)").remove();
		 	      $("#Add-Department .selected-area .member-list>li").remove();
		 	      $("#Add-Department .selected-area .member-list").append(CopyLi);
		 	      
		 	      
		 	      $('#Add-Department').on("shown.bs.modal",function(){
		 	    	  		
		 	    	 		$(".select-content li").children("label").removeClass("selected");
		 	    	 		$(".select-content li").each(function() {
		 	    	 		var id=$(this).attr('user-id');
			 	    		if(id==liID){
			 	    			$(this).children("label").addClass("selected");
			 	    			$(this).children("input").prop('checked',true);
			 	    		};
		 	    	 	}) ;		
		 	     	});
		 		}) ;
	 		});
	     };
	});
//载入添加成员模态框 》单选
	Doc.on('click',"#new_team .add-members-sign,#space-organize-modal .space_members_sign,#space-team-edit-modal .team_members_sign",function(){
		 var i=$(this);
	     if($(this).parents("#new_team").length>0||$(this).parents("#space-organize-modal").length>0||$(this).parents("#space-team-edit-modal").length>0){
	 		$('#Add-Director').on("shown.bs.modal",function(){	
	 			 if(i.hasClass('team_members_sign')){
			 	    	$(this).find(".btn-gray ").attr("data-target","#space-team-edit-modal");
			 	      }else if(i.hasClass('space_members_sign')){
			 	    	 $(this).find(".btn-gray ").attr("data-target","#space-organize-modal");
			 	      }else{
			 	    	 $(this).find(".btn-gray ").attr("data-target","#new_team");
			 	      };
	 			$("#Add-Director .botton>.btn-orange").unbind('click');
		 		$("#Add-Director .botton>.btn-orange").bind("click",function(){
		 	          var membersStr='';
		 	          var CopyLi=$("#Add-Director .selected-area .member-list>li").clone();
		 	          
		 	          var liID=CopyLi.attr("user-id") ;
		 	          var userID=$('.selected-area .member-list').children().attr('user-id');
		 	          
		 	          $("#Add-Director .selected-area .member-list>li").each(function(){
		 	        	  membersStr+="<span user-id='"+userID+"'>"+$(this).find(".member-name").text()+"</span>";
		 	          });		 	         
		 	      $(".selected-area .member-list").html("");
		 	      $(".select-area .member-list .sicon-checkbox.selected>input").prop('checked',false);
		 	      $(".select-area .member-list .sicon-checkbox.selected").removeClass('selected')
		 	      if(i.hasClass('team_members_sign')){
		 	    	$('#space-team-edit-modal').modal('show');
		 	      }else if(i.hasClass('space_members_sign')){
		 	    	 $('#space-organize-modal').modal('show');
		 	      }else{
		 	    	 $('#new_team').modal('show');
		 	      };
		 	      $("#newTeamResponsible,#space_Responsible,#team_Responsible").children().remove();
		 	      $("#newTeamResponsible,#space_Responsible,#team_Responsible").append(membersStr);
		 	      $(" #newTeamResponsible,#space_Responsible,#team_Responsible").children("span:nth-child(2)").remove();
		 	      $('#Add-Director').on("shown.bs.modal",function(){
			 		$("#Add-Director .selected-area .member-list>li").remove();
				 	  $("#Add-Director .selected-area .member-list").append(CopyLi);
	 	    	 		$(".select-content li").children("label").removeClass("selected");
	 	    	 		$(".select-content li").each(function() {
	 	    	 		var id=$(this).attr('user-id');
		 	    		if(id==liID){
		 	    			$(this).children("label").addClass("selected");
		 	    			$(this).children("input").prop('checked',true);
		 	    		};
	 	    	 	  }) ;		
	 	     		});
		 		}) 
	 		});
	     };
	});
//隐藏添加空间成员模态框
	$('#AddTeamMembers').on("hidden.bs.modal",function(){
		$(this).find(".selected-area .member-list").html("")
	});
//负责人单选
	Doc.on("click", "#Add-Department .select-area .member-list>li,#Add-Director .select-area .group-members>li", function(event) {
		if($("#Add-Department .sicon-checkbox").length>0||$("#Add-Director .sicon-checkbox").length>0){
			 $("#Add-Department .sicon-checkbox,#Add-Director .sicon-checkbox").removeClass("selected");
			 $("#Add-Department .sicon-checkbox,#Add-Director .sicon-checkbox").prop('checked',false);
			 $(this).children("label").addClass("selected");
			 $(this).children("input").prop('checked',true);
			 var userID=$(this).attr('user-id');
			 var wer=$(this).children("span:last-child").text();
			 var src=$("#Add-Department .selected,#Add-Director .selected").next(".member-portrait").find("img").attr("src");
			 var clone=$(this).find("span").clone();
			 var htmlStr = "";
			 htmlStr += 		   "<li user-id='"+userID+"'>" ;
			 if(src==undefined){
				 htmlStr +=				"<span class='member-portrait'>" ;
				 htmlStr +=				"</span>" ;
			 }else{
				 htmlStr +=				"<span class='member-portrait'>" ;
				 htmlStr +=					"<img src='"+ src +"'>" ;
				 htmlStr +=				"</span>" ;
			 };		
			     htmlStr +=				"<span class='member-name' user-id='"+userID+"'>"+wer+"</span>" ;
			     htmlStr +=				"<span class='close-operat-alert'></span>" ;
			     htmlStr +=		    "</li>";
			     $("#Add-Department .selected-area .member-list,#Add-Director .selected-area .member-list").children().remove();
		        $(".selected-area .member-list").append(htmlStr);
		};
			$("#Add-Department .close-operat-alert,#Add-Director .close-operat-alert").click(function(){
			 $(".selected-area .member-list").children().remove();
			 $("#Add-Department .sicon-checkbox,#Add-Director .sicon-checkbox").removeClass("selected");
			 $("#Add-Department .sicon-checkbox,#Add-Director .sicon-checkbox").prop('checked',false);
			});
	});
//编辑->负责人回选
	Doc.on("click", ".team_members_sign", function() {
		var t=$(this).prev().find("span").attr("user-id");
		$('#Add-Director').on("shown.bs.modal",function(){
			$("#Add-Director .selected-area .member-list>li").remove();
   	 		$(".select-content li").children("label").removeClass("selected");
			$('#Add-Director').find(".select-area").find(".group-members").find("li").each(function() {
				var y=$(this).attr("user-id");
				if(y==t){
					$(this).trigger('click');
				}
			});
		});
	});
//移除标签
	Doc.on("click", "#Add-Department .close-operat-alert,#Add-Director .close-operat-alert", function(event) {
		$(this).parent().remove();
		$("#Add-Department .sicon-checkbox,#Add-Director .sicon-checkbox").removeClass("selected");
		 $("#Add-Department .sicon-checkbox,#Add-Director .sicon-checkbox").prop('checked',false);
	});
//移除标签和附件
	Doc.on("click", Dom.siconRemove, function(event) {
		$(this).parent().remove();
		return false;
	});
//图片展示
	Doc.on('click', '.file-images img,.file-style.haspreview .preview,.task-file-content .files a>img,.file-images img,.file-style.haspreview .preview,.task-file-content .files a>img', function(e) {
		if (Body.find('.imgEnlargeNav').length <= 0) {
			Body.append(commonView.showImageLargeDiv());
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
	});
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
//设置任务完成时间
	Doc.on("click", "#task_details .operate-tags .Wdate", function() {

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
			if (jointMethods.updateTaskDueDate($("#task_details").attr('task-id'), dp.cal.getNewDateStr())) {
				$("#task-" + $("#task_details").attr('task-id')).find(".task-date ").show().empty().append("<span class='sicon-calendar16'></span>" + dp.cal.getNewDateStr().substring(5, 10)).removeClass("null");
				$(this).addClass("set");
			} else {
				$("#task-complete-date").html($("#task-complete-date").attr("thtml"));
			}
			return false;
		}
		function cleared() {
			clearWdateFmtErr();
			if (jointMethods.updateTaskDueDate($("#taskItemsTbody > tr.current").attr('id').split("-")[1], null)) {
				if ($(this).hasClass("set")) {
					$(this).removeClass("set");
				}
				$(this).html("截止日期");
				//Dom.grid.find("tr.current span.task-date").empty();
				$("#taskItemsTbody > tr.current").find(".task-date").hide().empty();
			} else {
				$("#task-complete-date").html($(this).attr("thtml"));
			}
		}
	});
//设置子任务完成时间
	Doc.on("click", "table.subTasklist>tbody>tr  .text-line-tags>.glyphicon-calendar", function() {
		var taskId = $(this).parents("tr.subTaskEach").attr("id").replace("subTask-", "");;
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
			if (jointMethods.updateSubTaskDueDate(taskId, dp.cal.getNewDateStr())) {
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
//清楚子任务完成时间设置
		function cleared() {
			clearWdateFmtErr();
			if (jointMethods.updateSubTaskDueDate(taskId, "")) {
				$(this).html($(this).attr("tHtml")).text("").addClass("glyphicon-calendar");
				if ($(this).hasClass("set")) {
					$(this).removeClass("set");
				}
			} else {
				$(this).html($(this).attr("tHtml"));
			}
		}
	});
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
//添加标签
		Doc.on("click", "#add-task-tags", function() {
			var add_task_tags_menu = $("#add-task-tags-menu");
			commonMethods.settingLocailty(this, add_task_tags_menu);
			add_task_tags_menu.css({"left": parseInt(add_task_tags_menu.css("left")) - 100 + "px",display: "block"});
			Doc.unbind("click", hide_add_task_tags);
			Doc.bind("click", hide_add_task_tags);
		});
//隐藏添加标签框
			var hide_add_task_tags = function(event) {
				if (!($(event.target).hasClass("add-task-tags-menu") || $(event.target).parents(".add-task-tags-menu").length > 0)) {
					$("#add-task-tags-menu").hide();
					Doc.unbind("click", hide_add_task_tags);
				}
			}
//显示输入标题
			 $(document).on('click',".subject-field",function(){
				 $(this).slideUp(300);
				 $(function(){setInterval(function(){
					 $(".subject-field-pulldown").slideDown(500);
				 },300);})
		      });
//显示评论
			 $(document).on('click',".reveal-show",function(){
			   if($(this).length>0){
				 if( $(this).parent().parent().next().css("display")=="none"){
					 $(this).parent().parent().next().slideDown(500);
					 $(this).parent().parent().addClass("border-radius");
					 }else{
						 $(this).parent().parent().next().slideUp(500);
						 $(this).parent().parent().removeClass("border-radius");
					 }
				 };
		      });
//任务评论@成员功能
				Doc.on("click", '.clickShowMembers', function() {
					var parets = $(this).parents(".divstyle");
					if (parets.length <= 0) {
						parets = $(this).parents('.comment-input-content')
					}
					if (parets.length <= 0) return;
					var textarea = parets.find("div.input-div").length > 0 ? parets.find("div.input-div")[0] : parets.find("div.task-comment-input")[0];
					if ($(textarea).length <= 0) return;
					commonMethods.settingLocailty(textarea, Dom.projectMembersList);
					Dom.projectMembersList.show();
					Dom.projectMembersList.find("div.invite").hide();
					$("body").bind("click", function(event) {
						Dom.projectMembersList.hide();
						Dom.projectMembersList.find("div.invite").show();
						$("body").unbind("click");
					});
					$(textarea).addClass("active");
					Doc.off("click", ".project-members-list .lists");
					Doc.on("click", ".project-members-list .lists", function() {
						$(textarea).append("<input class='remembersomeone' userId='"+$(this).attr("member-id")+"' type='button' email='"+$(this).find(".email").text()+"' value='@" + $(this).find(".name").text() + "' onclick='return false;'> &nbsp;");
						textarea.focus();
					});
				});
//话题选中背景色改变
				 $(document).on('click',".distance-header>div",function(){
					 if($(".distance-header>div").hasClass("background-color")){
						 $(".distance-header>div").removeClass("background-color");
						 $(".distance-header>div").removeClass("border-bottom");
						 $(this).addClass("background-color");	
						 $(this).addClass("border-bottom");
						 }			 
			      });
//报表类型点击事件
			 $(document).on('click',".projecttype>li",function(){
				 if($(this).children('p').css("display")=="none"){
					 $(this).children('p').show();		 
					 }else{
						 $(this).children('p').hide();
					 }	 
		      });
//成员拖动事件
			 $(document).on('click',".emotion-line>ul .lists",function(event){
				  var infotext=$(this).find(".name").html();
				  var infotemail=$(this).find(".email").html();
				  var userId = this.getAttribute("member-id");
				  html="<input class='remembersomeone' type='button' userId='"+userId+"' email='"+infotemail+"' value='"+"@"+infotext+"'onclick='return false;'>" +
				  		"&nbsp;" ;
				  $(this).parent().parent().parent().prev().append(html);
		      });
//任务列表全屏
			 $(document).on('click',".sicon-fullScreen",function(){
				if ($(this).hasClass("fullScreened")) {
					$(this).removeClass("fullScreened");
					$(this).parents(".right-container-scroll").removeClass("fullScreened");
					$(".project-list").show();
					$(".roof-container,.main-container-scroll").removeClass("full-set")
				} else if( !$(this).hasClass("fullScreened") ) {
					$(this).addClass("fullScreened");
					$(this).parents(".right-container-scroll").addClass("fullScreened");
					$(".project-list").hide();
					$(".roof-container,.main-container-scroll").addClass("full-set")
					
				}
			});
//任务描述没有是显示请输入任务描述
			 $(document).on('click',".task-des-content",function(){
					if ($(this).text() == '输入任务描述！') {
						$(this).text('');
					}
				})
//日程-项目详情模态框
			$(function(){ 	 
		 		$('#Add_Task').on("shown.bs.modal",function(){		
					$(function(){ 	 
						$('#Add_Task .appoint').remove();
						$('#Add_Task .task-details-container li a').attr("href","");
						$('#Add_Task .tab-content>div').attr("id","");
						$('#Add_Task .task-details-container li:first-child a').attr("href","#first");
						$('#Add_Task .task-details-container li:nth-child(2) a').attr("href","#second");
						$('#Add_Task .task-details-container li:nth-child(3) a').attr("href","#third");
						$('#Add_Task .task-details-container li:nth-child(4) a').attr("href","#fourst");
						$('#Add_Task .tab-content .comment-lists').attr("id","first");
						$('#Add_Task .tab-content .task-list-container').attr("id","second");
						$('#Add_Task .tab-content .task-file-list-nav').attr("id","third");
						$('#Add_Task .tab-content .log-task-container').attr("id","fourst");
					 });
				//显示复制任务模态框
					$('#Add_Task .operate-tags>span:last-child').bind('click', function() {
						$('#Add_Task').modal('hide');
					});
		 		});
			 });		
  //复制项目选中
			$(document).on('click',"#CopyProject .pitch label,#CopyTask .pitch label",function(event){
				if($(this).hasClass("selected")){
					$(this).removeClass("selected");
					$(this).find("input").prop('checked',false);
				}else{
					$(this).addClass("selected");
					$(this).find("input").prop('checked',true);
				}
				Doc.unbind("click", "#CopyProject .pitch label,#CopyTask .pitch label");
		      });
	//文本框下拉
		    $(document).on('keyup',"#add-team-message .columns input,#add-project-message .columns input",function(){
		    	$(this).parent().next().fadeIn();
		    });
		    $(document).on('click',"#teamShow li,#projectShow li",function(){
		    	$(this).parent().fadeOut();
		    });
		    $(document).not("#teamShow,#projectShow").click(function(){
		    	     if($("#teamShow,#projectShow").css('display')=='block'){
		    	     $("#teamShow,#projectShow").fadeOut();
		    	  }
		    });
	//切换样式效果
		    $(document).on('click',".modal-header li",function(){
		    	if($(this).hasClass("active")){
		    		$(".modal-header li").children().removeClass("default-selected");
		    		$(this).children().addClass("default-selected");
		    	}
		      });
	//下拉框优化
		    /*******v01*******/
		    Doc.on('click',".projectEach .dropdown .glyphicon",function(){
		    	var e=$(document.body).outerHeight(true);
		    	var r=$(this).offset().top;
		    	var h=$(this).height();
		    	var g=e-r;
		    	$(".projectEach .dropdown .glyphicon").next().removeClass("margintop");
		    	if(g<=160){
		    		$(this).next().addClass("margintop");
		    	}
		    });
		    /*******v02*******/
		    Doc.on('click',".sicon-dropdown",function(){
		    	var e=$(document.body).outerHeight(true);
		    	var r=$(this).offset().top;
		    	var h=$(this).height();
		    	var g=e-r;
		    	$(this).next().removeClass("margin_top");
		    	$(this).next().removeClass("margin__top");
		    	if( $(this).next().find("li").length==3 ){
		    		if(g<=100){
			    		$(this).next().addClass("margin_top");
			    	}
		    	}else if( $(this).next().find("li").length==1 ){
		    		if(g<=60){
			    		$(this).next().addClass("margin__top");
			    	}
		    	}
		    });
		//鼠标hover事件
		    Doc.on('mouseover',".projectEach,#space-organize-member-list li",function(){$(this).find("div").show();});
		    Doc.on('mouseout',".projectEach,#space-organize-member-list li",function(){$(this).find("div").hide();});
		//任务描述没有是显示请输入任务描述
			Doc.on('click',".conversation-Emails",function(){$("#conversationEmails").trigger('focus');});
			Doc.on('click',".input-div-placeholder",function(){$(this).next().trigger('focus');});
			Doc.on('DOMSubtreeModified',"#conversationEmails,.comment-box .input-div",function(){
				if(!$(this).text()==""||$(this).find("input").length>0||$(this).find("img").length>0){
					$(this).prev().hide();
				}else{
					$(this).prev().show();
				}
			});
		//点击页面元素事件
		    $(document).click(function(e){ 
				 e = window.event || e; // 兼容IE7
				 obj = $(e.srcElement || e.target);
				 if (	$(obj).is("#Add_Task .appoint-next .members") ) {
					 $("#Add_Task .project-members-list").removeClass("positiontop2");
					 $("#Add_Task .project-members-list").addClass("positiontop1");
					 
				 }else if( $(obj).is(".sicon-related.clickShowMembers") ){
					 $("#Add_Task .project-members-list").addClass("positiontop2");
					 $("#Add_Task .project-members-list").removeClass("positiontop1");
				 }
				 });
		 //截取文本
		    $(function(){
		    	setTimeout(function(){
		    		$(".sicon-notification").each(function(){
	 					var s = $(this).html();
	 					var i=s.substring(0,200).length;
	 					var str = s.substring(0,30)+"...";
	 					if(i<=30){
	 						$(this).html(s);
	 					}else if(i>30){
	 						$(this).html(str);
	 						$(this).attr("title",s);
	 					}
	 				  });
		    		},200)
		    });
		    Doc.on('DOMNodeInserted',".sicon-notification",function(){
		    	$(this).each(function(){
 					var s = $(this).html();
 					var i=s.substring(0,200).length;
 					var str = s.substring(0,30)+"...";
 					if(i<=30){
 						$(this).html(s);
 					}else if(i>30){
 						$(this).html(str);
 						$(this).attr("title",s);
 					}
 				  });
			});
		    Doc.on('click',".bookmark-object-each,.team-project .projectEach,.tagsInMenuEach,.projectEach",function(){
		    	setTimeout(function(){
		    		$(".sicon-notification").each(function(){
	 					var s = $(this).html();
	 					var i=s.substring(0,200).length;
	 					var str = s.substring(0,30)+"...";
	 					if(i<=30){
	 						$(this).html(s);
	 					}else if(i>30){
	 						$(this).html(str);
	 						$(this).attr("title",s);
	 					}
	 				  });
		    		},200)
			});
	//成员数变化
		    Doc.on('DOMNodeInserted',"#my-team-info-list li .team-members",function(){
		    	var s=$(this).parent().find(".team-date").children("span").eq(0).html();
		    	var str = s.substring(0,5);
		    	var e=$(this).children("span").length-1;
		    	$(this).parent().find(".team-date").children("span").eq(0).html(str+e);
			});
	//滚动条的优化
			 $(function(){
				 $(".distance-header>div:first-child").addClass("border-bottom");
				 $("#bookmark-show-right .list-container,.task-responsible-log,#show-bookmark-group-list,.space-members.put-away .member-list,.dropdown-menu .space-list,.left-sidebar,.info-lists,.list-container.rolling,.task-details .task-details-container,.search-switch").niceScroll({  
					 cursorcolor:"#ccc",  
					 cursoropacitymax:1,  
					 touchbehavior:false,  
					 cursorwidth:"5px",  
					 cursorborder:"0",  
					 cursorborderradius:"5px"
				 }); 
			 });
			 $(function(){ 	 
				 $(".framework-left>ul,.tab-content,.task-container-scroll.distance-center,.space-members.distance-left,.main-container-scroll.roll,.roof-container.fixed").niceScroll({  
					 cursorcolor:"transparent",  
					 cursoropacitymax:1,  
					 touchbehavior:false,  
					 cursorwidth:"6px",  
					 cursorborder:"0",  
					 cursorborderradius:"5px"
				 }); 
			 });
});
		


