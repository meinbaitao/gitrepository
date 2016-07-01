
var chartDateUtils = function(){
	var oneDay = 1000 * 60 * 60 * 24;
};

//今天
var today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);

/**
 * 根据选择条件获取开始时间
 */
chartDateUtils.getStartDateByCondition = function(dateCondition,dateSecondCondition){
	var today = new Date();
	if(dateCondition=='day'){
		var d = today.getDay();
		var t = today.getTime()+((dateSecondCondition-d)*24*60*60*1000);
		today = new Date(t);
	}else if(dateCondition=='week'){
		if(dateSecondCondition=='this'){	//本周
			var d = today.getDay();
			var t = today.getTime()+((1-d)*24*60*60*1000);
			today = new Date(t);	
		}else if(dateSecondCondition=='last'){	//上周
			var d = today.getDay();
			var t = today.getTime()+(((1-d)*24*60*60*1000)-(7*24*60*60*1000));
			today = new Date(t);
		}
	}else if(dateCondition=='month'){
		today.setDate(1);
		today.setMonth(dateSecondCondition-1);
	}
	return today.toLocaleDateString().replace("/","-").replace("/","-")+" 00:00:00";
}
/**
 * 根据选择条件获取结束时间
 */
chartDateUtils.getEndDateByCondition = function(dateCondition,dateSecondCondition){
	var today = new Date();
	if(dateCondition=='day'){
		var d = today.getDay();
		var t = today.getTime()+((dateSecondCondition-d)*24*60*60*1000);
		today = new Date(t);
	}else if(dateCondition=='week'){
		if(dateSecondCondition=='this'){	//本周
			var d = today.getDay();
			var t = today.getTime()+((7-d)*24*60*60*1000);
			today = new Date(t);	
		}else if(dateSecondCondition=='last'){	//上周
			var d = today.getDay();
			var t = today.getTime()+(((7-d)*24*60*60*1000)-(7*24*60*60*1000));
			today = new Date(t);
		}
	}else if(dateCondition=='month'){
		today.setDate(1);
		today.setMonth(dateSecondCondition);
		today.setDate(0);
	}
	return today.toLocaleDateString().replace("/","-").replace("/","-")+" 23:59:59";
}

chartDateUtils.getStartDate = function(){
	var today = new Date();
	return today.toLocaleDateString().replace("/","-").replace("/","-")+" 00:00:00";
}
chartDateUtils.getEndDate = function(){
	var today = new Date();
	return today.toLocaleDateString().replace("/","-").replace("/","-")+" 23:59:59";
}
chartDateUtils.getEndDateByType = function(dataType,dateSecondCondition){
	var endDate = chartDateUtils.getEndDate();
	if(dataType=='week'){
		endDate = chartDateUtils.getEndDateByWeek(dateSecondCondition);
	}else if(dataType=='month'){
		endDate = chartDateUtils.getMonthEndDateByDay(dateSecondCondition);
	}
	return endDate;
}
chartDateUtils.getStartDateByType = function(dataType,date){
	var startDate = chartDateUtils.getStartDate();
	if(dataType=='week'){
		startDate = chartDateUtils.getStartDateByWeekEndDate(date);
	}else if(dataType=='month'){
		startDate = chartDateUtils.getMonthStartDateByEndDate(date);
	}
	return startDate;
}
//获取周报结束时间
chartDateUtils.getEndDateByWeek = function(week){	
	var oneDay = 1000 * 60 * 60 * 24;
	var today = new Date();
	var weeks = today.getDay();
	if(parseInt(weeks)<=week){
		var s = today+oneDay * (week - weeks);
		today.setDate(today.getDate()+(week - weeks));
		today.setDate(today.getDate()-7);
	}else{
		today = new Date(today-oneDay * (weeks - week));
	}
	return today.toLocaleDateString().replace("/","-").replace("/","-")+" 23:59:59";
}
//根据周报的结束时间获取开始时间
chartDateUtils.getStartDateByWeekEndDate = function(d){	
	var today = new Date(d);
	today.setDate(today.getDate()-6);
	return today.toLocaleDateString().replace("/","-").replace("/","-")+" 00:00:00";
}
//获取月报结束时间
chartDateUtils.getMonthEndDateByDay = function(day){	
	var today = new Date();
	var days = today.getDate();
	today.setDate(day);
	if(parseInt(days)<=day){
		today.setMonth(today.getMonth()-1);
	}
	return today.toLocaleDateString().replace("/","-").replace("/","-")+" 23:59:59";
}
//获取月报开始时间
chartDateUtils.getMonthStartDateByEndDate = function(d){	
	var today = new Date(d);
	today.setMonth(today.getMonth()-1);
	return today.toLocaleDateString().replace("/","-").replace("/","-")+" 00:00:00";
}


/*-----------------------------------------------------------------------*/
//当前季度
chartDateUtils.currentQuarter = function(){	
	var date = new Date();
	var mm = date.getMonth()+1;
	if(parseInt(mm)>=1&&parseInt(mm)<=3){
		return 1;
	}else if(parseInt(mm)>=4&&parseInt(mm)<=6){
		return 2;
	}else if(parseInt(mm)>=7&&parseInt(mm)<=9){
		return 3;
	}else if(parseInt(mm)>=10&&parseInt(mm)<=12){
		return 4;
	}
}

//根据季度获取开始时间
chartDateUtils.getStartDateByQuarter = function(quarter){	
	var date = new Date();
	var yy = date.getFullYear();
	return chartDateUtils.getQuarterStartDate(yy,quarter);
}

//获取当前季度的结束时间
chartDateUtils.getEndDateByQuarter = function(quarter){	
	var date = new Date();
	var yy = date.getFullYear();
	return chartDateUtils.getQuarterEndDate(yy,quarter);
}
//季度开始时间
chartDateUtils.getQuarterStartDate = function(yy,quarter){	
	if(parseInt(quarter)==1){
		return yy+"-01-01 00:00:00";
	}else if(parseInt(quarter)==2){
		return yy+"-04-01 00:00:00";
	}else if(parseInt(quarter)==3){
		return yy+"-07-01 00:00:00";
	}else if(parseInt(quarter)==4){
		return yy+"-10-01 00:00:00";
	}else{
		return "";
	}
}
//季度结束时间
chartDateUtils.getQuarterEndDate = function(yy,quarter){	
	if(parseInt(quarter)==1){
		return yy+"-03-31 23:59:59";
	}else if(parseInt(quarter)==2){
		return yy+"-06-30 23:59:59";
	}else if(parseInt(quarter)==3){
		return yy+"-09-30 23:59:59";
	}else if(parseInt(quarter)==4){
		return yy+"-12-31 23:59:59";
	}else{
		return "";
	}
}



