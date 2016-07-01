/**
 * ========================
 * =======		任务日程信息
 * ========================
 */

$(function(){
	var menuType = $("#menuType").val();
	if("calendar" == menuType){					//判断如果是在空间日程页面初始化日程插件
		$('#calendar').fullCalendar('destroy'); 
		full_calendar();
	}
});




/**
 * 预加载日程信息
 */
function full_calendar(){
	var data = findCalendarData();				//获取日程任务参数
	$('#calendar').fullCalendar({
		//theme: true,							//日程主题
		header: {
			left: 'prev,next today',			//	昨天/明天/今天 按钮
			center: 'title',					//标题(当前年月)
			right: 'month,agendaWeek,agendaDay'
		},
		monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],	//月份显示,可中文英文
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],							//星期显示,可中文英文
		buttonText: {
		    today: '今天',		//今天按钮上显示的文字（不指定中文则为英文today）
		    month: '月',			//右侧按钮月（不指定中文则为英文month）
		    week: '周',			//右侧按钮周（不指定中文则为英文week）
		    day: '日'			//右侧按钮日（不指定中文则为英文day）
		},
		defaultDate: new Date(),	//默认加载日程为当前时间
		selectable: true,			
		selectHelper: true,
		select: function(start, end) {//点击日程中的某一天触发(可触发新增任务)
		},
		//单击事件项时触发 
        eventClick: function(calEvent, jsEvent, view) { //点击某一条任务触发(可触发任务详细查看)
        	$("#calendar").attr("status",calEvent.id);
        	var projectId = $("#checkedProject").attr("project-id");
        	if(projectId){
        		$('#Add_Task').modal('show');
        		$(document).off("shown.bs.modal", "#Add_Task");
        		$(document).on("shown.bs.modal", "#Add_Task", function(){
        			$("#Add_Task").insertAfter(".main-container-scroll .right");
        			$("#add-task-tags-menu").appendTo("#Add_Task .modal-content");
        			$(".project-members-list").appendTo("#Add_Task .modal-content");
        			
        		});
        		$(document).off("hidden.bs.modal", "#Add_Task");
        		$(document).on("hidden.bs.modal", "#Add_Task", function(){
        			$("#Add_Task").insertAfter("#CopyTask");
        			$("#add-task-tags-menu").insertBefore("#Add_Task");
        			$(".project-members-list").insertBefore("#Add_Task");
        		});
        	}else{
        		$('#Add_Task').modal('show');
        		
        	}
        	$(".task-details").attr("task-id", calEvent.id);
        	taskDetailsView.showTaskDetail(calEvent.id);
        },
        eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {	//拖动事件 
        	var taskId = event.id;
			var startTime = event.start._d;
			if(startTime){startTime = formatDateTime(startTime);}
			var dueDate = startTime;
			var url = "/a/calendar/setCalendarDrag";
			startUp.postFormData(url,{"id":taskId,"dueDate":dueDate},function(data){});
    	},
		editable: true,							//将日程设置可编辑
		eventLimit: true, 						//限制某一天的日程数量（多出的部分显示  》更多）
		events: data,							//数据初始化函数
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
 * 项目附件按钮触发
 */
$(document).on("click","#modelTaskCalendar",function(){
	$('#calendar').fullCalendar('destroy'); 	//摧毁整个日程重新加载
	full_calendar();
});

/**
 * 查找项目日程
 */
function findCalendarData(){
	var result = "";
	var spaceId = $("#checkedSpace").attr("space-id");			//空间ID
	var projectId = $("#checkedProject").attr("project-id");	//项目ID
	var userId = $("#checkedUser").attr("user-id");				//用户ID
	
	var url = "";
	if(projectId){												//请求项目
		url = "/a/calendar/findProjectTaskCalendar";
		startUp.postAsyncData(url,{"projectId":projectId},function(data){
			result = data;
		});
	}else{
		var menuType = $("#menuType").val();					//请求空间
		if("calendar" == menuType){
			url = "/a/calendar/findSpaceTaskCalendar";
			startUp.postAsyncData(url,{"spaceId":spaceId, "user.id":userId, "createBy.id":userId},function(data){
				result = data;
			});
		}
	}
	return result;
}


/**
 * 转换时间格式
 */
var formatDateTime = function (date) {  
	var now = new Date();
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    	m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    	d = d < 10 ? ('0' + d) : d;  
    var h = now.getHours();  
    	h = h < 10 ? ('0' + h) : h;
    var minute = now.getMinutes();  
    	minute = minute < 10 ? ('0' + minute) : minute;
    var second = now.getSeconds()
    	second = second < 10 ? ('0' + second) : second;  
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



