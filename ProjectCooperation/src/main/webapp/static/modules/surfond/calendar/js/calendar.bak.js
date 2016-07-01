/**
 * ========================
 * =======		任务日程信息
 * ========================
 */

/**
 * 日程模块点击事件
 */
$(document).on("click","#right-task-calendar",function(){
	var spaceId = $("#checkedSpace").attr("space-id");
	if(!spaceId){
		return;
	}
	//window.location为http://localhost:8080/tts6/user/teachertts6?pMUploadHomework=success
    history.pushState("","","?optionType=spaceClendar");
    $("#checkedProject").attr("task-type","")
    $("#checkedProject").attr("project-id","")
	$(".project-lists").find("li.current").removeClass("current");
	$(".project-archives-list").find("li.current").removeClass("current");
	full_calendar();
});


/**
 * 获取日程信息
 */
function getCalendarData(){
	//start 用户行为分析
	startUp.iBehavior("moduleNO_17");
	//end 用户行为分析
	var data = "";
	var spaceId = "";
	var projectId = "";
	var userId = "";
	var createById = "";
	var tagsId = "";
	var taskType = $("#checkedProject").attr("task-type");
	var nextId = "0";
	if(taskType=="0"){//查询我的任务日程
		spaceId = $("#checkedSpace").attr("space-id");
		createById = $("#checkedUser").attr("user-id");
		userId = $("#checkedUser").attr("user-id");
	}else if(taskType=="1"){////查询项目下的任务日程
		spaceId = $("#checkedSpace").attr("space-id");
		projectId = $("#checkedProject").attr("project-id");
		nextId = "1";
	}else if(taskType=="2"){//查询空间成员中与我共同参与的项目任务日程
		spaceId = $("#checkedSpace").attr("space-id");
		userId = $("#checkedProject").attr("member-id");
		createById = $("#checkedProject").attr("member-id");
		nextId = "2";
	}else if(taskType=="3"){//查询标签任务日程
		nextId = "3";
		tagsId = $("#checkedProject").attr("tags-id");
	}else{
		spaceId = $("#checkedSpace").attr("space-id");
		createById = $("#checkedUser").attr("user-id");
		userId = $("#checkedUser").attr("user-id");
	}
	var url = "/a/calendar/findCalendar";
	var dataSource = {"tagsId":tagsId, "spaceId":spaceId, "projectId":projectId, "user.id":userId,"createBy.id":createById, "nextId":nextId};
	startUp.postAsyncData(url,dataSource,function(result){
		$('#calendar').empty();
		data = result;
	});
	return data;
}

/**
 * 预加载日程信息
 */

function full_calendar(){
	
	$('#calendar').empty();
	var data = "";
	var spaceId = $("#checkedSpace").attr("space-id");
	if(spaceId){
		data = getCalendarData();
	}
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		defaultDate: '2015-12-12',
		selectable: true,
		selectHelper: true,
		select: function(start, end) {
			if(!$("#checkedSpace").attr("space-id")){
				return;
			}
			var projectId = $("#checkedProject").attr("project-id");
			if(projectId){
				//start = formatDateTime(start);
				end = formatDateTime(end);
				$("#Add_Task").modal({
					remote:startUp.getRootPath()+"/static/modules/"+varsion+"/surfond/modal/add_task.html"
				});
				$("#Add_Task").on("shown.bs.modal",function(e){
					$("#Add_Task #addTaskBtn").unbind("click");
					$("#Add_Task #addTaskBtn").bind("click",function(){
						var title=$("#Add_Task #add_task_title").val();
						var projectId = $("#checkedProject").attr("project-id");
						var url = "/a/calendar/saveCalendar";
						if(title){
							var parameter = {"projectId":projectId,"title":title,"dueDate":end};
							if(title.length<49){
								startUp.postAsyncData(url,parameter,function(result){
									if(result.result=='0'){
										var id = result.data.id;
										var eventData;
										eventData = {
												id:id,
												title: title,
												start: start,
												end: end,
												className:"calendar_"+id
										};
										$('#calendar').fullCalendar('renderEvent', eventData, false);
										$("#newSpaceBtnClose").click();
										$("#Add_Task #add_task_title").val("");
										$("#Add_Task #addTaskBtn").unbind("click");
									}
								});
							}else{
								commonMethods.showAlertNav("标题过长,无法添加!");
							}
						}
					});
				});
				$('#calendar').fullCalendar('unselect');
			}
			
		},
		//单击事件项时触发 
        eventClick: function(calEvent, jsEvent, view) { 
        	$("#calendar").attr("status",calEvent.id);
            showTaskDetail(calEvent.id);
            matter.fixed_task_details();
        },
		//拖动事件 
		eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {	
			var taskId = event.id;
			var startTime = event.start;
			if(startTime){startTime = formatDateTime(startTime);}
			var dueDate = new Date(startTime);
			var url = "/a/calendar/setCalendarDrag";
			startUp.postAsyncData(url,{"id":taskId,"dueDate":dueDate},function(data){});
    	},
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: data,
		eventRender: function(event, element) {//数据初始化函数拼装
			element.html();
			if(event.color=='green'){			//绿色则为已完成	
				element.html("<div style='overflow:hidden;background-color: #7596a5;color:#fff;' class='one-claendar calendar-color-"+event.id+"' title='"+event.title+"'>" +  event.title + "</div>");  
			}else{								//否则为未完成
				element.html("<div style='overflow:hidden;background-color: #e1e8ec' class='one-claendar calendar-color-"+event.id+"' title='"+event.title+"'>" +  event.title + "</div>");
			}
	    }
	});
}

/**
 * 获取日程数据
 * @returns {String}
 */
function getCalendar(){
	var checkedSpaceId = $("input[name='checkedSpaceId']").val();
	var userId = $("#checkedUserId").val();
	var projectName = getProjectName();
	var data = "";
	var url = "/a/poj/projectTask/findMyCalendar?spaceId="+checkedSpaceId+"&user.id="+userId;
	startUp.getAsyncData(url,function(result){
		data = result;
	}); 
	return data;
}


/**
 * 转换时间格式
 */
var formatDateTime = function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes();  
    var second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute;  
    return y + '-' + m + '-' + d+' '+h+':'+minute + ":" +second;  
};

/**
 * 将一个日期和当前日期相比(只比较yyyy-MM-dd)
 */
var compareToNow = function(date){
	var thenDate = new Date(formatDateTime(date));
	var then_year = thenDate.getFullYear();
	var then_month = thenDate.getMonth()+1;
	var then_day = thenDate.getDate();
	//当前日期
	var today = new Date();
	var today_year = today.getFullYear();
	var today_month = today.getMonth()+1;
	var today_day = today.getDate();
	
	if(then_year>today_year || then_year==today_year){
		if(then_month>today_month || then_month==today_month){
			if(then_day>today_day || then_day==today_day){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}else{
		return false;
	}
}



