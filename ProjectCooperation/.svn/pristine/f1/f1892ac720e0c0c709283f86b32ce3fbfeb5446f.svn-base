var chart = {};

chart.init = function(){
	
}

$(function(){
	$("#spaceDateSecondCondition").html(chartHtmlUtils.getDaySelectHtml());
	onload();
	function onload(){	//加载初始空间的数据
		var spaceId = $("#checkedSpace").attr("space-id");
		if(!spaceId){
			commonMethods.showAlertNav('请选择空间.');
			return;
		}
		chart.onloadProjectChar($("#checkedSpace").attr("space-id"),$("#spaceDateCondition"),$("#spaceDateSecondCondition"));
	}
	var teamTxtVal;
	$(document).on("keyup", "#teamTxt",function(){	//加载当前用户团队信息
		var spaceId = $("#checkedSpace").attr("space-id");
		var val = $.trim($(this).val());
//		if(teamTxtVal!=val){	//监控值不变的情况不请求后台数据
//			teamTxtVal=val;
			chart.loadTeams(spaceId,val);
//		}
	});
	var projectTxtVal;
	$(document).on("keyup", "#projectTxt",function(){	//加载当前用户项目信息
		var spaceId = $("#checkedSpace").attr("space-id");
		var val = $.trim($(this).val());
//		if(projectTxtVal!=val){	//监控值不变的情况不请求后台数据
//			projectTxtVal=val;
			chart.loadProjects(spaceId,val);
//		}
	});
	$(document).on("click", ".teamli",function(){	//选择团队
		var name = $(this).attr("name");
		var teamId = $(this).attr("id");
		$("#teamTxt").val(name);
		$("#teamTxt").attr("teamId",teamId);
	});
	$(document).on("click", ".projectli",function(){	//选择项目
		var title = $(this).attr("title");
		var projectId = $(this).attr("id");
		$("#projectTxt").val(title);
		$("#projectTxt").attr("projectId",projectId);
	});
	//团队选择需要显示的数据
	$(document).on("click", "#teamBtn",function(){
		var teamId = $("#teamTxt").attr("teamId");
		var teamName = $("#teamTxt").val();
		var data = {teamId:teamId,sourceId:teamId,type:chartUtils.TYPE_TEAM};
		if($(".rise").is(":visible")){	//数据分析
			var id = new Date().getTime();
			var html=chartHtmlUtils.getDataAnalysis(id,"teamChartDataAnalysis",data,teamName);
			$("#teamChart").prepend(html);
			$("#chart_label"+id).html(teamName);
//			sourceId,label,type,charttype
			chart.createChartShow(teamId,teamName,chartUtils.TYPE_TEAM,chartUtils.CHART_TYPE_DATA_ANALYSE);
			chart.loadTeamChartDataAnalysis(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
		}
		if($(".combine").is(":visible")){	//任务按时完成率
			var id = new Date().getTime();
			var html=chartHtmlUtils.getCircliful(id,"teamTaskDone",data);
			$("#teamChart").prepend(html);
			$("#chart_label"+id).html(teamName);
			chart.createChartShow(teamId,teamName,chartUtils.TYPE_TEAM,chartUtils.CHART_TYPE_RADIALINDICATOR);
			chart.loadTeamChartDoneAmount(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
		}
		if($(".schedule").is(":visible")){	//各成员完成情况
			var id = new Date().getTime();
			var html=chartHtmlUtils.getColumnAndSpline(id,"teamChartMemberDone",data);
			$("#teamChart").prepend(html);
			$("#chart_label"+id).html(teamName);
			chart.createChartShow(teamId,teamName,chartUtils.TYPE_TEAM,chartUtils.CHART_TYPE_COLUMNANDSPLINE);
			chart.loadTeamChartMemberDone(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
		}
		$(".closebtn").trigger("click");
	});
	//项目选择需要显示的数据
	$(document).on("click", "#projectBtn",function(){
		var projectId = $("#projectTxt").attr("projectId");
		var projectName = $("#projectTxt").val();
		var data = {projectId:projectId,sourceId:projectId,type:chartUtils.TYPE_PROJECT};
		if($(".wedfsf").is(":visible")){	//任务完成量
			var id = new Date().getTime();
			var html=chartHtmlUtils.getPie(id,"projectDateCondition",data);
			$("#projectChart").prepend(html);
			$("#chart_label"+id).html(projectName);
			chart.createChartShow(projectId,projectName,chartUtils.TYPE_PROJECT,chartUtils.CHART_TYPE_PIE);
			chart.loadProjectChartTaskDone(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
		}
		if($(".statistics").is(":visible")){	//任务数统计分析
			var id = new Date().getTime();
			var html=chartHtmlUtils.getTaskDataAnalysis(id,"projectTaskDataAnalysis",data);
			$("#projectChart").prepend(html);
			$("#chart_label"+id).html(projectName);
			chart.createChartShow(projectId,projectName,chartUtils.TYPE_PROJECT,chartUtils.CHART_TYPE_RADIALINDICATOR2);
			chart.loadProjectChartAnalysiData(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
		}
		if($(".schedule").is(":visible")){	//各成员完成情况
			var id = new Date().getTime();
			var html=chartHtmlUtils.getColumnAndSpline(id,"projectMemberDone",data);
			$("#projectChart").prepend(html);
			$("#chart_label"+id).html(projectName);
			chart.createChartShow(projectId,projectName,chartUtils.TYPE_PROJECT,chartUtils.CHART_TYPE_COLUMNANDSPLINE);
			chart.loadProjectChartMemberDone(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
		}
		$(".closebtn").trigger("click");
	});
	
	//空间筛选时间条件加载数据
	$(document).on("change", "#spaceDateSecondCondition,#spaceDateCondition",function(){
		chart.onloadProjectChar($("#checkedSpace").attr("space-id"),$("#spaceDateCondition"),$("#spaceDateSecondCondition"));
	});
	//团队筛选时间条件加载-数据分析
	$(document).on("change", ".teamChartDataAnalysis",function(){
		var elementId = $(this).parent().parent().attr("pid");
		chart.loadTeamChartDataAnalysis(elementId,$("#dateCondition"+elementId),$("#dateSecondCondition"+elementId));
	});
	//团队筛选时间条件加载-任务按时完成率
	$(document).on("change", ".teamTaskDone",function(){
		var elementId = $(this).parent().parent().attr("pid");
		chart.loadTeamChartDoneAmount(elementId,$("#dateCondition"+elementId),$("#dateSecondCondition"+elementId));
	});
	//团队筛选时间条件加载-各成员完成情况
	$(document).on("change", ".teamChartMemberDone",function(){
		var elementId = $(this).parent().parent().attr("pid");
		chart.loadTeamChartMemberDone(elementId,$("#dateCondition"+elementId),$("#dateSecondCondition"+elementId));
	});
	//项目筛选时间条件加载-任务完成量
	$(document).on("change", ".projectDateCondition",function(){
		var elementId = $(this).parent().parent().attr("pid");
		chart.loadProjectChartTaskDone(elementId,$("#dateCondition"+elementId),$("#dateSecondCondition"+elementId));
	});
	//项目筛选时间条件加载-任务数数据分析
	$(document).on("change", ".projectTaskDataAnalysis",function(){
		var elementId = $(this).parent().parent().attr("pid");
		chart.loadProjectChartAnalysiData(elementId,$("#dateCondition"+elementId),$("#dateSecondCondition"+elementId));
	});
	//项目筛选时间条件加载-各成员完成数据
	$(document).on("change", ".projectMemberDone",function(){
		var elementId = $(this).parent().parent().attr("pid");
		chart.loadProjectChartMemberDone(elementId,$("#dateCondition"+elementId),$("#dateSecondCondition"+elementId));
	});
	//点击 团队分析 -加载默认已经新增过的团队报表
	$(document).on("click", "#teamChartShow",function(){
		$("#spaceDateConditionUl").addClass("hide");
		$("#teamChart").children(".chartshow").remove();
		var url = "/a/chartShow/getCurrentUserChart";
		var data = {type:chartUtils.TYPE_TEAM};
		startUp.postFormData(url, data, function(resultMap){
			$.each(resultMap.data.list, function(i, item){
				chart.loadTeamChart(item);
			});
		});
	});
	//点击项目分析 -加载默认已经新增过的团队报表
	$(document).on("click", "#projectChartShow",function(){
		$("#spaceDateConditionUl").addClass("hide");
		$("#projectChart").children(".chartshow").remove();
		var url = "/a/chartShow/getCurrentUserChart";
		var data = {type:chartUtils.TYPE_PROJECT};
		startUp.postFormData(url, data, function(resultMap){
			$.each(resultMap.data.list, function(i, item){
				chart.loadProjectChart(item);
			});
		});
	});
	$(document).on("click", "#spaceChartShow",function(){
		$("#spaceDateConditionUl").removeClass("hide");
	});
	//删除选择加载的图表。
	$(document).on("click", ".chartclose",function(){
		var charttype = $(this).parent().parent().attr("charttype");
		var sourceId = $(this).parent().parent().attr("sourceId");
		var type = $(this).parent().parent().attr("type");
		$(this).parent().parent().remove();
		var url = "/a/chartShow/deleteChartByCondition";
		var data = {sourceId:sourceId,type:type,charttype:charttype};
		startUp.postFormData(url, data, function(resultMap){
			if(resultMap.data){
//				commonMethods.showAlertNav("删除成功");
				commonMethods.operatResultAlert("删除成功",1);
			}
		});
	});
	
	//选择日期条件
	$(document).on("change", ".dateCondition",function(){
		var val = $(this).val();
		var dateSecondCondition = $(this).parent().siblings().find(".dateSecondCondition");
		dateSecondCondition.empty();
		var html="";
		if(val=='day'){
			html = chartHtmlUtils.getDaySelectHtml();
		}else if(val=='week'){
			html = chartHtmlUtils.getWeekSelectHtml();
		}else if(val=='month'){
			html = chartHtmlUtils.getMonthSelectHtml();
		}
		dateSecondCondition.html(html);
	});
});

//加载团队-数据分析
chart.loadTeamChartDataAnalysis = function(elementId,dates,dateSecond){	
	var teamId = $("#"+elementId).attr("teamId");
	var dateType = dates.val();
	var dateSecondCondition = dateSecond.val();
	var startDate = chartDateUtils.getStartDateByCondition(dateType,dateSecondCondition);
	var endDate = chartDateUtils.getEndDateByCondition(dateType,dateSecondCondition);
	if(teamId){
		var url = "/a/team/chart/getTeamChartDataAnalysisByTeamId";
		var data = {teamId:teamId,dateType:dateType,startDate:startDate,endDate:endDate};
		startUp.postFormData(url, data, function(resultMap){
			chart.loadDataAnalysis(elementId,resultMap);
		});
	}
}
//加载团队-任务按时完成率
chart.loadTeamChartDoneAmount = function(elementId,dates,dateSecond){	
	var teamId = $("#"+elementId).attr("teamId");
	var dateType = dates.val();
	var dateSecondCondition = dateSecond.val();
	var startDate = chartDateUtils.getStartDateByCondition(dateType,dateSecondCondition);
	var endDate = chartDateUtils.getEndDateByCondition(dateType,dateSecondCondition);
	if(teamId){
		var url = "/a/team/chart/getTeamChartDoneAmountByTeamId";
		var data = {teamId:teamId,startDate:startDate,endDate:endDate};
		startUp.postFormData(url, data, function(resultMap){
			chart.loadTaskOnTimDoneData(elementId,"circliful"+elementId,resultMap);
		});
	}
}
//加载团队-各成员完成情况
chart.loadTeamChartMemberDone = function(elementId,dates,dateSecond){	
	var teamId = $("#"+elementId).attr("teamId");
	var dateType = dates.val();
	var dateSecondCondition = dateSecond.val();
	var startDate = chartDateUtils.getStartDateByCondition(dateType,dateSecondCondition);
	var endDate = chartDateUtils.getEndDateByCondition(dateType,dateSecondCondition);
	if(teamId){
		var url = "/a/team/chart/getTeamChartMemberDoneByTeamId";
		var data = {teamId:teamId,startDate:startDate,endDate:endDate};
		startUp.postFormData(url, data, function(resultMap){
			chart.loadMemberDone("columnAndSpline"+elementId,resultMap);
		});
	}
}
//加载项目-任务完成量
chart.loadProjectChartTaskDone = function(elementId,dates,dateSecond){
	var projectId = $("#"+elementId).attr("projectId");
	var dateType = dates.val();
	var dateSecondCondition = dateSecond.val();
	var startDate = chartDateUtils.getStartDateByCondition(dateType,dateSecondCondition);
	var endDate = chartDateUtils.getEndDateByCondition(dateType,dateSecondCondition);
	if(projectId){
		var url = "/a/project/chart/taskDoneAmount";
		var data = {projectId:projectId,startDate:startDate,endDate:endDate};
		startUp.postFormData(url, data, function(resultMap){
			chart.loadTaskDoneData(elementId,resultMap);
		});
	}
}
//加载项目-任务数数据分析
chart.loadProjectChartAnalysiData = function(elementId,dates,dateSecond){	
	var projectId = $("#"+elementId).attr("projectId");
	var dateType = dates.val();
	var dateSecondCondition = dateSecond.val();
	var startDate = chartDateUtils.getStartDateByCondition(dateType,dateSecondCondition);
	var endDate = chartDateUtils.getEndDateByCondition(dateType,dateSecondCondition);
	if(projectId){
		var url = "/a/project/chart/analysiData";
		var data = {projectId:projectId,dateType:dateType,startDate:startDate,endDate:endDate};
		startUp.postFormData(url, data, function(resultMap){
			chart.loadAnalyseData(elementId,resultMap);
		});
	}
}
//加载项目-各成员完成情况
chart.loadProjectChartMemberDone = function(elementId,dates,dateSecond){	
	var projectId = $("#"+elementId).attr("projectId");
	var dateType = dates.val();
	var dateSecondCondition = dateSecond.val();
	var startDate = chartDateUtils.getStartDateByCondition(dateType,dateSecondCondition);
	var endDate = chartDateUtils.getEndDateByCondition(dateType,dateSecondCondition);
	if(projectId){
		var url = "/a/project/chart/memberDone";
		var data = {projectId:projectId,startDate:startDate,endDate:endDate};
		startUp.postFormData(url, data, function(resultMap){
			chart.loadMemberDone("columnAndSpline"+elementId,resultMap);
		});
	}
}
//加载团队列表数据
chart.loadTeams = function(spaceId,name){	
	if(spaceId){
		var url = "/a/team/chart/getTeamsBySpaceId";
		var data = {spaceId:spaceId, name:name};
		startUp.postFormData(url, data, function(resultMap){
			$("#teamShow").empty();
			var html="";
			$.each(resultMap.teamList, function(i, item){
				html+="<li class='teamli' id='"+item.id+"' name='"+item.name+"'>"+item.name+"</li>";
			});
			$("#teamShow").html(html);
		});
	}
}
//加载项目
chart.loadProjects = function(spaceId,title){	
	if(spaceId){
		var url = "/a/project/chart/getCurrentUserTeamBySpaceIdAndTitle";
		var data = {spaceId:spaceId,title:title};
		startUp.postFormData(url, data, function(resultMap){
			$("#projectShow").empty();
			var html="";
			$.each(resultMap.projectList, function(i, item){
				html+="<li class='projectli' id='"+item.id+"' title='"+item.title+"'>"+item.title+"</li>";
			});
			$("#projectShow").html(html);
		});
	}
}

//加载空间报表
chart.onloadProjectChar = function(spaceId,dates,dateSecond){
	if(!spaceId){
		spaceId = $("#checkedSpace").attr("space-id");
	}
	var dateType = dates.val();
	var dateSecondCondition = dateSecond.val();
	var startDate = chartDateUtils.getStartDateByCondition(dateType,dateSecondCondition);
	var endDate = chartDateUtils.getEndDateByCondition(dateType,dateSecondCondition);
	var url = "/a/space/chart/getChartBySpaceId";
	var data = {spaceId:spaceId,startDate:startDate,endDate:endDate,dateType:dateType};
	startUp.postAsyncData(url, data, function(resultMap){
		//任务完成量
		chart.loadTaskDoneData("spaceChartTaskDone",resultMap.taskDoneData);
		//数据分析
		chart.loadDataAnalysis("spaceDataAnalysis",resultMap.dataAnalysis);
		//任务完成率
		chart.loadTaskOnTimDoneData("spaceDoneAmount","spaceCircliful",resultMap.taskOnTimDoneData);
		//成员累计点赞数（前五）
		chart.loadPraiseAmountLimit5(resultMap.praiseAmountLimit5);
		//任务数据统计分析
		chart.loadAnalyseData("spaceAnalysiData",resultMap.analyseData);
		//各成员完成情况
		chart.loadMemberDone("columnAndSpline",resultMap.memberDone);
	});
}

//任务完成量
chart.loadTaskDoneData = function(id,taskDoneData){
	var done = taskDoneData.done;
	var unDone = taskDoneData.unDone;
	var count = (done+unDone);
	chartUtils.loadPie("pie"+id,done,unDone);
	$("#done"+id).html(Math.round(parseFloat(done/count).toFixed(2)*100));
	$("#unDone"+id).html(Math.round((1-parseFloat(done/count).toFixed(2))*100));
}

//数据分析
chart.loadDataAnalysis = function(id,dataAnalysis){
	var dom = $("#"+id);
	chart.dataAnalysisContrast(dom.children().find(".dataAnalysis1"),dataAnalysis.count,dataAnalysis.countOld);
	chart.dataAnalysisContrast(dom.children().find(".dataAnalysis2"),dataAnalysis.done,dataAnalysis.doneOld);
	chart.dataAnalysisContrast(dom.children().find(".dataAnalysis3"),dataAnalysis.createCount,dataAnalysis.createCountOld);
}
chart.dataAnalysisContrast = function(idObj,num1,num2){
	idObj.html(num1);
	var c = parseInt(num1-num2);
	if(num1>num2){
		idObj.siblings(".up_png").removeClass("hide");
		idObj.siblings(".down_png").addClass("hide");
		if(num2==0){
			idObj.siblings(".percent").html("("+Math.round(100)+"%)");
		}else{
			idObj.siblings(".percent").html("("+Math.round(parseFloat(c/num2).toFixed(2)*100)+"%)");
		}
		
	}else if(num1<num2){
		idObj.siblings(".up_png").addClass("hide");
		idObj.siblings(".down_png").removeClass("hide");
		if(num1==0){
			idObj.siblings(".percent").html("("+Math.round(100)+"%)");
		}else{
			idObj.siblings(".percent").html("("+Math.round(parseFloat(c/num1).toFixed(2)*100)+"%)");
		}
		
	}else{
		idObj.siblings(".up_png").addClass("hide");
		idObj.siblings(".down_png").addClass("hide");
		idObj.siblings(".percent").html("(0%)");
	}
}
//任务完成率
chart.loadTaskOnTimDoneData = function(pid,id,taskOnTimDoneData){
	var idObj = $("#"+pid);
	idObj.children().find(".totalTask").html(taskOnTimDoneData.count);
	idObj.children().find(".timelyDone").html(taskOnTimDoneData.timelyDone);
	if(!taskOnTimDoneData.timelyDone){
		taskOnTimDoneData.timelyDone=0;
	}
	var dataText = "<span style='padding-top:50px;color:#FF7F00;font-size:38px;'>"+taskOnTimDoneData.percent+"</span><span style='font-size:18px;'>%</span>";
	if(!taskOnTimDoneData.percent){
		taskOnTimDoneData.percent=0;
	}
	chartUtils.radialIndicator(id,taskOnTimDoneData.percent,110,dataText,"按时率");
}
//加载点赞数前5
chart.loadPraiseAmountLimit5 = function(praiseAmountLimit5){
	var praiseAmount = praiseAmountLimit5.praiseAmount;
	var map = praiseAmountLimit5.res;
	var cs = ["#3ABC50", "#26B6E8", "#FCC55E", "#FE9965", "#E25252"];
	if(praiseAmount.length>0){
		var i=0;
		$.each(map,function(key,values){
			$(values).each(function(){
//				console.log(key+"\t" + this); 
				$("#countenanceTxt"+i).parent().removeClass("hide");
				$("#countenanceTxt"+i).html(key);
				$("#countenance"+i).html(this);
				chartUtils.loadProgress("container"+i,this,350,8,cs[i]);
			});
			i+=1;
		});  
//		for(var i=0;i<length;i++){
//			$("#countenanceTxt"+i).parent().removeClass("hide");
//			var obj = praiseAmount[i];
//			$("#countenanceTxt"+i).html(obj.userName);
//			chartUtils.loadProgress("container"+i,obj.praiseamount,350,8,cs[i]);
//			$("#countenance"+i).html(obj.praiseamount);
//		}
		
	}/*else{
		for(var i=0;i<5;i++){
			var obj = praiseAmount[i];
			$("#countenanceTxt"+i).html("");
			chartUtils.loadProgress("container"+i,0,350,8,cs[i]);
			$("#countenance"+i).html(0);
		}
	}*/
	
}
//任务数据统计分析
chart.loadAnalyseData = function(id,analyseData){
	$("#doneCount"+id).html(analyseData.done);
	$("#unDoneCount"+id).html(analyseData.unDone);
	chart.analyseDataContrast("onTimeUnDone"+id,analyseData.onTimeUnDone,analyseData.onTimeUnDoneOld);
	chart.analyseDataContrast("overTimeUnDone"+id,analyseData.overTimeUnDone,analyseData.overTimeUnDoneOld);
	chart.analyseDataContrast("onTimeDone"+id,analyseData.onTimeDone,analyseData.onTimeDoneOld);
	chart.analyseDataContrast("overTimeDone"+id,analyseData.overTimeDone,analyseData.overTimeDoneOld);
	var dataText = $("#gouImg").attr("attrImg");
	chartUtils.radialIndicator("taskDataChart"+id,parseFloat(analyseData.done/(analyseData.done+analyseData.unDone)).toFixed(2)*100,110,"","",dataText);
}
chart.analyseDataContrast = function(id,num1,num2){
	var idObj = $("#"+id);
	idObj.html(num1);
	var c = parseInt(num1+num2);
	if(num1>num2){
		idObj.siblings(".up_png").removeClass("hide");
		idObj.siblings(".down_png").addClass("hide");
	}else if(num1<num2){
		idObj.siblings(".up_png").addClass("hide");
		idObj.siblings(".down_png").removeClass("hide");
	}else{
		idObj.siblings(".up_png").addClass("hide");
		idObj.siblings(".down_png").addClass("hide");
	}
}
//各成员完成情况
chart.loadMemberDone = function(id,memberDone){
	var countTaskMap = memberDone.countTaskMap;
	var xAxisVal = countTaskMap.name;//['张三', '李四', '王五', '赵六', '孙七','周八'];
	var splineVal = countTaskMap.countTaskDone;
	var columnVal = countTaskMap.countTaskTimelyDone;//[15, 18, 23, 33, 28,16];
	chartUtils.loadHighchartsColumnAndSpline(id,"",xAxisVal,"按时完成任务数",columnVal,"完成任务总数",splineVal);
}
/**
 * sourceId 	源数据ID
 * label		报表标签
 * type			报表类型，如：团队、项目
 * charttype	图表类型
 */
chart.createChartShow = function(sourceId,label,type,charttype){	
	if(sourceId){
		var url = "/a/chartShow/createChartShow";
		var data = {sourceId:sourceId,label:label,type:type,charttype:charttype};
		startUp.postFormData(url, data, function(resultMap){
			
		});
	}
}
//加载 团队分析 列表数据
chart.loadTeamChart = function(obj){	
	var data = {teamId:obj.sourceId,sourceId:obj.sourceId,type:chartUtils.TYPE_TEAM};
	if(obj.charttype==chartUtils.CHART_TYPE_DATA_ANALYSE){	//数据分析
		var id = new Date().getTime();
		var html=chartHtmlUtils.getDataAnalysis(id,"teamChartDataAnalysis",data);
		$("#teamChart").prepend(html);
		$("#chart_label"+id).html(obj.label);
		chart.loadTeamChartDataAnalysis(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
	}else if(obj.charttype==chartUtils.CHART_TYPE_RADIALINDICATOR){	//任务按时完成率
		var id = new Date().getTime();
		var html=chartHtmlUtils.getCircliful(id,"teamTaskDone",data);
		$("#teamChart").prepend(html);
		$("#chart_label"+id).html(obj.label);
		chart.loadTeamChartDoneAmount(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
	}else if(obj.charttype==chartUtils.CHART_TYPE_COLUMNANDSPLINE){	//各成员完成情况
		var id = new Date().getTime();
		var html=chartHtmlUtils.getColumnAndSpline(id,"teamChartMemberDone",data);
		$("#teamChart").prepend(html);
		$("#chart_label"+id).html(obj.label);
		chart.loadTeamChartMemberDone(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
	}
}
//加载 项目分析 列表数据
chart.loadProjectChart = function(obj){	
	var data = {projectId:obj.sourceId,sourceId:obj.sourceId,type:chartUtils.TYPE_PROJECT};
	if(obj.charttype==chartUtils.CHART_TYPE_PIE){	//数据分析
		var id = new Date().getTime();
		var html=chartHtmlUtils.getPie(id,"projectDateCondition",data);
		$("#projectChart").prepend(html);
		$("#chart_label"+id).html(obj.label);
		chart.loadProjectChartTaskDone(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
	}else if(obj.charttype==chartUtils.CHART_TYPE_RADIALINDICATOR2){	//任务按时完成率
		var id = new Date().getTime();
		var html=chartHtmlUtils.getTaskDataAnalysis(id,"projectTaskDataAnalysis",data);
		$("#projectChart").prepend(html);
		$("#chart_label"+id).html(obj.label);
		chart.loadProjectChartAnalysiData(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
	}else if(obj.charttype==chartUtils.CHART_TYPE_COLUMNANDSPLINE){	//各成员完成情况
		var id = new Date().getTime();
		var html=chartHtmlUtils.getColumnAndSpline(id,"projectMemberDone",data);
		$("#projectChart").prepend(html);
		$("#chart_label"+id).html(obj.label);
		chart.loadProjectChartMemberDone(id,$("#dateCondition"+id),$("#dateSecondCondition"+id));
	}
}

