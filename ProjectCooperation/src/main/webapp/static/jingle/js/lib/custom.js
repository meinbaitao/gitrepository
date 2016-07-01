/*
 *自定义js方法
 */

$(function(){
	$(document).on("tap",".dropmenu[show_target][site_target]",dropmenu_do);//显示下拉选项
	$(document).on("tap","ul.menu-lists>li",dropmenu_choice);//选中选项
	$(document).on("tap",".affirm-chooice",affirm_chooice);//确认选中
	$(document).on("tap",".task-show-method",change_task_show_model);//切换任务显示模式
	//$(".task-show-method").trigger("tap");
	$(document).on("swipeUp","ul.task-list.layer",current_swipeUp);//向下切换任务
	$(document).on("swipeDown","ul.task-list.layer",current_swipeDown);//向上切换任务
	$(document).on("tap","ul.task-list.layer li:not('.current')",tap_task_change);//点击切换任务
	$(document).on("tap","ul.task-list.layer li.current,ul.task-list.list-model li",show_detalis);//点击显示任务详情
	$(document).on("tap","ul.task-list.list-model li span.check-icon",task_checked);//列表模式下选中任务
	
	$(document).on("tap",".task-list.layer.task-detalis .show-task",show_detalis_task);//显示或隐藏任务详细
	
	$(document).on("tap",".task-list.layer.task-detalis .affirm-complete>a",affirm_task_complete);//确认任务完成
	$(document).on("tap",".task-list.layer li.current .affirm-complete ",affirm_task_complete_list);//确认任务完成
	
	$(document).on("focus",".convarsation-input>textarea",input_convarsation)//评论输入框获得焦点
})

/*
 * 点击下拉菜单按钮执行显示或者隐藏操作
 * 
 */

var dropmenu_do=function(event){
	$("#index_section").scrollTop(0);
	$(".space-nav").addClass("fixed");
	$(".filtrate-menu").addClass("fixed");
	$(".affirm-chooice").css({"position":"fixed","top":"0px","left":"0px","height":$(document).height(),"display":"block"});
	if($(this).hasClass("active")){
		
		$(this).removeClass("active");
		$(this).find("span.icon-sort-up").attr("class","icon-sort-down");		
		$($(this).attr("show_target")).slideUp();
	}else{
		if($(".dropmenu.active").length>=1){
			hide_dropmenu();
		}
		$(this).addClass("active");
		$(this).find("span.icon-sort-down").attr("class","icon-sort-up");
		show_dropmenu($(this).attr("show_target"),$(this).attr("site_target"));
		
	}
}
/*
 * 隐藏下拉菜单
 */
var hide_dropmenu=function(){
	$(".menu-lists.open").removeClass("open").hide();
	$(".menu-lists.open").parents("section.active").css("overflow","auto");
	$(".dropmenu.active").find("span.icon-sort-up").attr("class","icon-sort-down");
	$(".dropmenu.active").removeClass("active");   //隐藏已经显示的菜单
	$(".affirm-chooice").hide();
}
/*
 * show_target string  要显示selector
 * site_target string  对齐位置selector
 * 显示下拉菜单
 */

var show_dropmenu=function(show_target,site_target){
	$(show_target).parents("section.active").css("overflow","hidden");
	$(show_target).css({"position":"fixed","top":$(site_target).offset().top+$(site_target).height(),"left":$(site_target).offset().left,"max-height":$(window).height()-$(site_target).offset().top-$(site_target).height()-10});
	$(show_target).slideDown(function(){
		$(this).addClass("open");
		$(this).css("overflow","auto");
	});
}

/*
 * 选项选中
 */
var dropmenu_choice=function() {
	$(".dropmenu.active").html($(this).text()+"<span class='icon-sort-down'></span>");
	//按空间筛选任务
	if($(this).parents("#space-lists").length>0){
		var param ='{"spaceId":"'+this.id+'"}';
		myTaskList(param);
		projectList(this.id);
		ownerList(this.id);
		$("#spaceId").val(this.id);
	}
	//按 项目筛选任务
	if($(this).parents("#project-lists").length>0){
		var param ='{"spaceId":"'+$("#spaceId").val()+'","projectId":"'+this.id+'"}';
		$("#projectId").val(this.id);
		myTaskList(param);
	}

	//按 时间筛选
	if($(this).parents("#time-status-list").length>0){
		var param ='{"spaceId":"'+$("#spaceId").val()+'","projectId":"'+$("#projectId").val()+'","duedatestatus":"'+this.id+'"}';
		$("#dueDate").val(this.id);
		myTaskList(param);
	}
	
	//按 人员筛选任务
	if($(this).parents("#task-who-lists").length>0){
		var param ='{"spaceId":"'+$("#spaceId").val()+'","ownerId":"'+this.id+'","projectId":"'+$("#projectId").val()+'"}';
		myTaskList(param);
	}
	hide_dropmenu();
}	
	
	
/*
* 确认筛选 
*/

var affirm_chooice=function(){
	if($(".dropmenu.active").length>=1){
		hide_dropmenu();
	}else{
		$(".affirm-chooice").hide();
	}
}
	
/*
 * 切换任务显示模式
 */	
var change_task_show_model=function(){


	if($("ul.task-list").hasClass("list-model")){
		$(document).bind('touchmove', function (event) {
			event.preventDefault();
			}, false);
		$("body").height(document.documentElement.clientHeight);
		$("ul.task-list").removeClass("list-model").addClass("layer").hide();
		var translateZ=50,step=25,lis=$("ul.task-list").children("li");
		lis.hide();
		$(lis[0]).addClass("current");
		for(var i=0,len=lis.length;i<len&&i<6;i++){
		   $(lis[i]).attr("style","transform:translateZ(-"+(translateZ+(step*i))+"px);-webkit-transform:translateZ(-"+(translateZ+(step*i))+"px);top:"+((step+10)*i)+"px;z-index:"+(len+1-i)+";").show();
		   translateZ+=step;
		}
		$("ul.task-list").show();
	
	}else{
		$(document).unbind('touchmove');
		$("ul.task-list").removeClass("layer").addClass("list-model");
		$("ul.task-list").children("li").removeAttr("style").show();
	}
}

/*
* 上划操作 
*/

//var current_swipeUp=function(){
//		var Ncurrent=$(this).find("li.current"),Nlis=Ncurrent.nextAll("li"),Plis=Ncurrent.prevAll(),translateZ=50,step=25;
//		if(Nlis.length<=0){
//			return false;
//		}
//		Plis.removeAttr("style").hide();
///*	    Ncurrent.removeClass("current").slideUp("300",function(){
//	    	$(Nlis[0]).addClass("current");
//	    	for(var i=0,len=Nlis.length;i<len&&i<6;i++){
//	    	   $(Nlis[i]).attr("style","transform:translateZ(-"+(translateZ+(step*i))+"px);-webkit-transform:translateZ(-"+(translateZ+(step*i))+"px);top:"+((step+10)*i)+"px;z-index:"+(len+1-i)+";");
//	    	   translateZ+=step;
//	    	}
//	    	Ncurrent.removeAttr("style").hide();
//	    	
//	    });*/
//	 
//	
//}
/**
 * 上划动画
 */
var current_swipeUp=function(animation_li){

	var Ncurrent=$(this).find("li.current"),Nlis=Ncurrent.nextAll("li"),Plis=Ncurrent.prevAll(),translateZ=50,step=25,Z=50*6;
	if(Nlis.length<=0){
		return false;
	}


	$(document).off("swipeUp","ul.task-list.layer",current_swipeUp);
	$(document).off("swipeDown","ul.task-list.layer",current_swipeDown);//取消滑动操作事件绑定，防止动画再执行时再次滑动。
	Plis.removeAttr("style").hide();
	
	var time=300,astep=25,t_step=Ncurrent.height()/(300/25),Z_step=Z/(300/25),t;
	
	Ncurrent.animate({top:-(Ncurrent.height()-20)+'px'},animation_li_z);
	
	function  animation_li_z(){
		t=window.setInterval(animation_li_z_do,astep);
		Ncurrent.css("z-index","0");
	 	$(Nlis[0]).addClass("current");
    	for(var i=0,len=Nlis.length;i<len&&i<6;i++){
    	   $(Nlis[i]).attr("style","transform:translateZ(-"+(translateZ+(step*i))+"px);-webkit-transform:translateZ(-"+(translateZ+(step*i))+"px);top:"+((step+10)*i)+"px;z-index:"+(len+1-i)+";");
    	   translateZ+=step;
    	}
		Ncurrent.animate({top:'0px'},function(){
			$(this).removeAttr("style").removeClass("current").hide();
			$(document).on("swipeUp","ul.task-list.layer",current_swipeUp);//向下切换任务
			$(document).on("swipeDown","ul.task-list.layer",current_swipeDown);//再次绑定滑动操作。
			});
	}
	function animation_li_z_do(){	//平滑改变z轴的值	
		if(parseInt(Ncurrent.css('webkitTransform').split(",")[14])>-Z){
			Ncurrent[0].style.webkitTransform = "translateZ("+(parseInt(Ncurrent.css('webkitTransform').split(",")[14])-Z_step)+"px)";
			
		}else{
			window.clearInterval(t);
		}
		
	}
}

/**
* 下滑操作 
*/

/*var current_swipeDown=function(){
	var Ncurrent=$(this).find("li.current"),Nlis=Ncurrent.nextAll("li"),Pli=Ncurrent.prev("li"),translateZ=50,step=25;
	if(Pli.length<=0){	 
		return false;
	}
	Nlis.removeAttr("style").hide();
	Ncurrent.removeClass("current");
	$(Pli).addClass("current").slideDown("300");
	 $(Pli).attr("style","transform:translateZ(-"+translateZ+"px);-webkit-transform:translateZ(-"+translateZ+"px);top:0px;z-index:6;");
	 translateZ+=step;
	 Ncurrent.attr("style","transform:translateZ(-"+(translateZ+step)+"px);-webkit-transform:translateZ(-"+(translateZ+step)+"px);top:"+(step+10)+"px;z-index:5;");
	 translateZ+=step;
	for(var i=2,j=0,len=Nlis.length;j<len&&i<6;i++){
	   $(Nlis[j]).attr("style","transform:translateZ(-"+(translateZ+(step*i))+"px);-webkit-transform:translateZ(-"+(translateZ+(step*i))+"px);top:"+((step+10)*i)+"px;z-index:"+(6-i)+";");
	   translateZ+=step;
	   j++;
	}
	
}*/
/**
* 下滑动画
*/

var current_swipeDown=function(){
	
	var Ncurrent=$(this).find("li.current"),Nlis=Ncurrent.nextAll("li"),Pli=Ncurrent.prev("li"),translateZ=50,step=25,Z=-50;
	if(Pli.length<=0){	 
		return false;
	}
	Nlis.not("[style]").hide();
	Nlis.filter(":visible").last().hide();
	Ncurrent.removeClass("current");
	$(document).off("swipeUp","ul.task-list.layer",current_swipeUp);
	$(document).off("swipeDown","ul.task-list.layer",current_swipeDown);//取消滑动操作事件绑定，防止动画再执行时再次滑动。
	
	$(Pli).addClass("current").show();
	
   var time=300,astep=25,t_step=Ncurrent.height()/(time/astep),Z_step=250/(time/astep),t;
   console.log( Pli.height());
   Pli.attr("style","transform:translateZ(-300px);-webkit-transform:translateZ(-300px);");
   var Nlis=Pli.nextAll("li");
	for(var i=1,j=0,len=Nlis.length;j<len&&i<6;i++){
	   $(Nlis[j]).attr("style","transform:translateZ(-"+(translateZ+(step*i))+"px);-webkit-transform:translateZ(-"+(translateZ+(step*i))+"px);top:"+((step+10)*i)+"px;z-index:"+(6-i)+";");
	   translateZ+=step;
	   j++;
	}
    Pli.animate({top:-(Pli.height()-20)+'px'},animation_li_z);
  
	
    function animation_li_z() {
      t=window.setInterval(animation_li_z_do,astep);
      Pli.css("z-index","7");
     	
	}
    
    function animation_li_z_do(){	//平滑改变z轴的值	
		if(parseInt(Pli.css('webkitTransform').split(",")[14])<Z){
			Pli[0].style.webkitTransform = "translateZ("+(parseInt(Pli.css('webkitTransform').split(",")[14])+Z_step)+"px)";
			
		}else{
			window.clearInterval(t);
			Pli.animate({top:'0px'},function(){
				  $(document).on("swipeUp","ul.task-list.layer",current_swipeUp);
				  $(document).on("swipeDown","ul.task-list.layer",current_swipeDown);//再次绑定滑动操作。
				});
		}
		
	}
//	 $(Pli).attr("style","transform:translateZ(-"+translateZ+"px);-webkit-transform:translateZ(-"+translateZ+"px);top:0px;z-index:6;");
//	 translateZ+=step;
//	 Ncurrent.attr("style","transform:translateZ(-"+(translateZ+step)+"px);-webkit-transform:translateZ(-"+(translateZ+step)+"px);top:"+(step+10)+"px;z-index:5;");
//	 translateZ+=step;
//	for(var i=2,j=0,len=Nlis.length;j<len&&i<6;i++){
//	   $(Nlis[j]).attr("style","transform:translateZ(-"+(translateZ+(step*i))+"px);-webkit-transform:translateZ(-"+(translateZ+(step*i))+"px);top:"+((step+10)*i)+"px;z-index:"+(6-i)+";");
//	   translateZ+=step;
//	   j++;
//	}
	
}
/*
 *点击切换任务
 */
var tap_task_change=function(){
	var _this=this;
	$(this).siblings("li:not('.current')").hide();
	$(this).prevAll("li.current").removeClass("current").slideUp("300",function(){
		$(_this).addClass("current");
		var translateZ=50,step=25,lis=$(_this).nextAll("li");
		$(_this).attr("style","transform:translateZ(-"+translateZ+"px);-webkit-transform:translateZ(-"+translateZ+"px);top:0px;z-index:6;");
		 translateZ+=step;
		 for(var i=1,j=0,len=lis.length;j<len&&i<6;i++){
			   $(lis[j]).attr("style","transform:translateZ(-"+(translateZ+(step*i))+"px);-webkit-transform:translateZ(-"+(translateZ+(step*i))+"px);top:"+((step+10)*i)+"px;z-index:"+(6-i)+";");
			   translateZ+=step;
			   j++;
	  }
	});
	
}
/*
 * 显示任务详情
 */
var show_detalis=function(){
	$(this).find("a.task-details")[0].click();
}

/**
 * 列表模式下选中任务
 * 
 */

var task_checked=function(){
	return false;
}


/**
*显示或隐藏任务详情 
*/

var show_detalis_task=function(){
	var Pul=$(this).parents("ul.task-list"),pli=$(this).parent("li"),_this=this;
	pli.slideUp("300",function(){
		
		if(Pul.hasClass("hied-task")){
			Pul.removeClass("hied-task");
			$(_this).text("收起");
		}else{
			Pul.addClass("hied-task");
			$(_this).text("展开");
		}
		pli.slideDown("300");
	});
	
}

/**
 * 确认任务完成
 */

var  affirm_task_complete=function(){

	marktaskfinish($("#taskId").val());
}

/**
 * 对话输入框获得焦点
 */
var input_convarsation=function(){
	$(this).unbind("keyup");
	$(this).bind("keyup",function(){
	    var str = $(this).val().split(/\n/).length;
        if(str>2&&str<6){
        	$(this).css("height",40+parseInt($(this).css("line-height"))*(str-1));} 
        if(str>=6){
        	$(this).css("height",40+parseInt($(this).css("line-height"))*5);
        }
		if($(this).val()==""){
			
			$(this).parent().removeClass("inputing");
			$(this).nextAll("button").unbind("click");
			$(this).height(40);
		}else if(!$(this).parent().hasClass("inputing")){
			$(this).parent().addClass("inputing");
			$(this).width($(this).parent().width()-(2*($(this).parent().find("span.icon-rss").width()+$(this).parent().find("span.icon-smile").width()+$(this).parent().find("button").width())));
			$(this).nextAll("button").bind("click",set_message);
		}
		
	})
}

/**
 * 评论发送
 */

var set_message=function(){
	var text=$(this).siblings("textarea").val();
	    text=text.replace(/[\r\n]/g,'<br/>');
	    text=text.replace(/[\s]/g,'&nbsp;&nbsp;');
	if(!(text=="")){
		var str="<div class='conversation my-conversation'>"+
			    "  <img class='portrait' src='"+ctxStatic+"/jingle/image/del/portrait-me.png' />"+
			    "  <div class='content'>"+
			    "       <span class='triangle'></span>"                                                                     
			    "    </div>"+
			    "</div>";
		$("#task_detalis_section .conversations").append(str);
		$("#task_detalis_section .conversations .conversation").last().find("div.content").append(text);
		$(this).siblings("textarea").val("");
		$("#task_detalis_section").scrollTop($("#task_detalis_section").height());
		$(this).siblings("textarea").focus();
	}else{
		$(this).parent().removeClass("inputing");
		$(this).nextAll("button").unbind("click");
	}
}


/**
 * 列表确定任务完成
 */
var affirm_task_complete_list=function(){
	var _this=this;
	$("ul.task-list.layer").trigger("swipeUp");
	$(this).parent("li").slideUp("300",function(){
		
		var url="/a/task/info/marktaskfinish";
		var param ='{"id":"'+$(_this).attr("id")+'"}';
		startUp.postData(url,param,function(data){
			$(_this).parent("li").remove();
		});
	});
}
/**
 * 查询我的任务列表
 */
var myTaskList = function(param){
	var url="/a/task/info/searchtasklist";
	startUp.postData(url,param,function(data){
		var taskList =$("#task-list");
		taskList.text("");
		
		$.each(data.data, function(idx, item){
			if(!item){ return;}
			var name =item.user?dealWithUndefined(item.user.name):"未选择责任人",
				title=dealWithUndefined(item.title),
				description = item.description?item.description:"暂无任务描述",
				project = item.projectName?item.projectName:"暂无项目",
				createDate =item.createDate?item.createDate:"未设定截至日期";
			
			var li ="<li>"
				    +"<span class='check-icon icon-check-empty'></span>"
					+"<h2 class='task-title'>"
						+"<a class='task-details' data-target='section' data-icon='info' href='#task_detalis_section?id="+item.id+"'>"+title+"</a>"
					+"</h2>"
					+"<p class='task-content'>"+description+"</p>"
					+"<h3 class='father-project '>"
						+"<img src='"+ctxStatic+"/jingle/image/father-project.png' class='icon-folder-close'>"
						+"<a href='javascript:void(0);'>"+project+"</a>"
					+"</h3>"
					+"<div class='taks-who-data'>"
						+"<span class='name'>"+name+"</span>"
						+"<span class='data'>"+createDate+"</span>"
					+"</div>"
					+"<div class='affirm-complete' id='"+item.id+"'>确认完成</div>"
				+"</li>";
				taskList.append(li);
		});
	});
}	

/**
 * 查询我的任务列表
 */
var myTaskList = function(param,type){
	var url="/a/task/info/findmytasklist";
	startUp.postData(url,param,function(data){
		var taskList =$("#task-list");
		taskList.text("");
		$.each(data.data, function(idx, item){
			if(!item){ return;}
			var name =item.user?dealWithUndefined(item.user.name):"未选择责任人",
				title=dealWithUndefined(item.title),
				description = item.description?item.description:"暂无任务描述",
				project = item.projectName?item.projectName:"暂无项目",
				createDate =item.createDate?item.createDate:"未设定截至日期";
			
			var li ="<li>"
				    +"<span class='check-icon icon-check-empty'></span>"
					+"<h2 class='task-title'>"
						+"<a class='task-details' data-target='section' data-icon='info' href='#task_detalis_section?id="+item.id+"'>"+title+"</a>"
					+"</h2>"
					+"<p class='task-content'>"+description+"</p>"
					+"<h3 class='father-project '>"
						+"<img src='"+ctxStatic+"/jingle/image/father-project.png' class='icon-folder-close'>"
						+"<a href='javascript:void(0);'>"+project+"</a>"
					+"</h3>"
					+"<div class='taks-who-data'>"
						+"<span class='name'>"+name+"</span>"
						+"<span class='data'>"+createDate+"</span>"
					+"</div>"
					+"<div class='affirm-complete' id='"+item.id+"'>确认完成</div>"
				+"</li>";
				taskList.append(li);
		});
	});
}	


/**
 * 根据空间查询项目列表
 */
var projectList = function(spaceId){
	var url="/a/task/info/projectlistbyspace";
	var param ='{"spaceId":"'+spaceId+'"}';
	startUp.postData(url,param,function(data){
		var projectList =$("#project-lists");
		projectList.text("");
		var li ="<li id=''>全部项目</li>";
		$.each(data.data, function(idx, item){
			if(!item){ return;}
			var projectId =item.projectId?dealWithUndefined(item.projectId):"",
				title=dealWithUndefined(item.title);
			li +="<li id='"+projectId+"'>"+title+"</li>";
		});
		projectList.append(li);
	});
}

/**
 * 根据空间查询成员
 */
var ownerList = function(spaceId){
	var url="/a/task/info/spacememberlist";
	var param ='{"id":"'+spaceId+'"}';
	startUp.postData(url,param,function(data){
		var ownerList =$("#task-who-lists");
		ownerList.html("");
		var li ="<li id=''>全部</li>";
		$.each(data.data, function(idx, item){
			if(!item){ return;}
			var id =dealWithUndefined(item.id),
				name=dealWithUndefined(item.name);
			li +="<li id='"+id+"'>"+name+"</li>";
		});
		ownerList.append(li);
	});
}

/**
 *标记完成任务 
 */
var marktaskfinish = function(taskId){
	var url="/a/task/info/marktaskfinish";
	var param ='{"id":"'+taskId+'"}';
	startUp.postData(url,param,function(data){
		var param ='{"spaceId":"'+$("#spaceId").val()+'"}';
		J.showToast('任务完成！', 'success');
		if($("#type").val()=="2"){
			myTaskList(param,true);
			J.Router.goTo('#mytask_section?type=2');
		}else{
			myTaskList(param);
			J.Router.goTo('#index_section?index');
		}
	});
}

/**
 * 查询空间列表
 */
var spaceList = function(){
	var url="/a/task/info/spacelist";
	startUp.getData(url,function(data){
		var li ="";
		var spaceList =$("#space-lists");
		spaceList.text("");
		$.each(data.data, function(idx, item){
			if(!item){ return;}
			if(item.title=="我的空间"){
				$(".active-space").append(item.title+"<span class='icon-sort-down'></span>");
				spaceList.prepend("<li class='active' id='"+item.id+"'>"+item.title+"</li>");
				$("#spaceId").val(item.id);
				var param ='{"spaceId":"'+item.id+'"}';
				myTaskList(param);
				projectList(item.id);
				ownerList(item.id);
			}else{
				li +="<li id='"+item.id+"'>"+item.title+"</li>";
			}
		});
		spaceList.append(li);
	});
}

/**
 * 查询任务评论列表
 */
var commentlist = function(){
	var taskId = $("#taskId").val();
	var url="/a/task/wx/taskcommentlist";
	var param ='{"taskId":"'+taskId+'"}';
	startUp.postData(url,param,function(data){
		var div ="";
		var cuser = data.currentUserId;
		var commentList =$("#commentList");
		commentList.text("");
		$.each(data.data, function(idx, item){
			if(!item){ return;}
			var createName =dealWithUndefined(item.createByName),
				createByPhoto=dealWithUndefined(item.createByPhoto),
				createById =dealWithUndefined(item.createById),
				description =dealWithUndefined(item.description);
			if(cuser !=createById){
				div ='<div class="conversation">'
					+'<img class="portrait" src="'+createByPhoto+'" />'
					+'<div class="content">'
						+'<span class="name">'+createName+'</span>'
						+'<span class="triangle triangle-left"></span>'
						+description
					+'</div>'
					+'</div>';
				commentList.append(div);
			}else{
				div ='<div class="conversation my-conversation">'
					+'<img class="portrait" src="'+createByPhoto+'" />'
					+'<div class="content">'
						+'<span class="name">'+createName+'</span>'
						+'<span class="triangle triangle-right"></span>'
						+description
					+'</div>'
					+'</div>';
				commentList.append(div);
			}
		});
	});
}

