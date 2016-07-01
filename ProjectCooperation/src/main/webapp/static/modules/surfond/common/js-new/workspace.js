 $(function(){
    var Doc=$(document);


      //任务删选效果
      $(document).on('click',".task-fliter>.dropdown-menu>li",function(){
            if(!$(this).hasClass("current")){
                 $(this).siblings(".current").removeClass('current');
                 $(this).addClass("current");
                 $(this).parents('.task-fliter').children('.fliter-condition').text($(this).text());
                 
                 var groupType = $(this).attr("tag")?$(this).attr("tag"):"0";
                 
                //调用查询任务方法
                var spaceId = $("#checkedSpace").attr("space-id");
             	var ownerId = $("#checkedUser").attr("user-id");
             	var createById = $("#checkedUser").attr("user-id");
             	if(spaceId){
             		var url = "/a/task/findmytasklist";
             		var data = {"spaceId":spaceId, "user.id":ownerId, "createBy.id":createById,"groupType":groupType};
             		jointMethods.loadTaskList(url, data);
             	}
            }
      });
      
  	//团队列表调用滚动条插件
		$(".teams-list>ul.list").niceScroll({
			cursorcolor: "#ccc",
			cursorwidth: '5',
			cursorborderradius: '3px',
			cursorborder: '',
			railpadding: {top: 2,right: -8,left: 0,bottom: 0},
			railalign: 'right'
		});
	
	
  //切换任务删选选中状态。。。
  $(document).on("click",".shortcut-fliter>li",function(){
	 $(this).siblings(".current").removeClass("current");
	 $(this).addClass("current");
  });
  
  
	//添加删选条件
	Doc.on("click", ".add-fliter-condition", function() {

		var add_task_tags_menu = $("#add-fliter-condition"),ThisLi=$(this).parents('li').eq(0);
		commonMethods.settingLocailty($(this).parents('li')[0], add_task_tags_menu);
		add_task_tags_menu.css({"left": parseInt(add_task_tags_menu.css("left")) - 100 + "px",display: "block"});
		Doc.unbind("click", hide_add_task_tags);
		Doc.bind("click", hide_add_task_tags);
		add_task_tags_menu.find('#fliterTitleBtn').unbind('click');
		add_task_tags_menu.find('#fliterTitleBtn').bind('click',function(){
			var HtmlStr="",title=$(this).prev('#fliterTitle').val().trim();
			if(title.length<0) return;
			HtmlStr="<li class='moveArea'>"+title+"<span class='number'>0</span>"+
		     "   <div class='dropdown'>		"+		
		     "     <span class='sicon-dropdown' data-toggle='dropdown'></span>	"+			
		     "     <ul class='dropdown-menu'>"+		
		     "        <li class='add-fliter-condition'>添加下一阶段条件</li>	"+		
		     "     </ul>	"+		
		     "    </div>"+
		     " </li> " 
		     ThisLi.after($(HtmlStr)) ;
			add_task_tags_menu.hide();
			$(this).prev('#fliterTitle').val("");
			Doc.unbind("click", hide_add_task_tags);
		  
		});
	});
	
	//隐藏添加标签框
	var hide_add_task_tags = function(event) {
		if (!($(event.target).hasClass("add-task-tags-menu") || $(event.target).parents(".add-task-tags-menu").length > 0)) {
			$("#add-fliter-condition").hide();
			Doc.unbind("click", hide_add_task_tags);
		}

	}
	
	
 })