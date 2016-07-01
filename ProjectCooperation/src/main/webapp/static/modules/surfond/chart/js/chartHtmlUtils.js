var chartHtmlUtils = {};
var stringUtils = {};

chartHtmlUtils.init = function(){
	
}
/**
 * 将数据类型如下:
 * var data = {demo1:demoVal};
 * 处理成辅助属性型数据设置到层，从而避免参数丢失
 * 处理后：
 * demo1='demoVal'
 * xiaocai	2016-3-24
 */
stringUtils.dataUtils = function(data){
	var dataHtml="";
	$.each(data, function (i, v) {
		dataHtml+=" "+i+"='"+v+"'";
	});
	return dataHtml;
}
/**
 * 获取饼状图html
 */
chartHtmlUtils.getPie = function(id,triggerClass,data){
	var html="<section id='"+id+"' "+stringUtils.dataUtils(data)+" charttype='"+chartUtils.CHART_TYPE_PIE+"' class='chartshow htmleaf-container consummator float self-motion1'>\
							<div id='chart_label"+id+"' class='chart_label'></div>\
							<div class='Complete-tasks'>任务完成量</div>\
							"+chartHtmlUtils.getDateCondition(id,triggerClass)+"\
							<div class='support'></div>\
							<div id='pie"+id+"'></div>\
							<div class='percent-sign'>\
								<span>已经完成&nbsp;\
									<img src='"+ctxSurfond+"/chart/images/dot_1.png'>\
									<span id='done"+id+"'></span>%&nbsp;&nbsp;</span>\
								<span>未完成&nbsp;\
									<img src='"+ctxSurfond+"/chart/images/dot_2.png'>\
									<span id='unDone"+id+"'></span>%</span>\
							</div>\
						</section>";
	return html;
}
/**
 * 数据分析html
 */
chartHtmlUtils.getDataAnalysis = function(id,triggerClass,data){
	var html="<section id='"+id+"' "+stringUtils.dataUtils(data)+" charttype='"+chartUtils.CHART_TYPE_DATA_ANALYSE+"' class='chartshow htmleaf-container consummator float self-motion2'>\
							<div id='chart_label"+id+"' class='chart_label'></div>\
							<div class='Complete-tasks'>数据分析</div>\
							"+chartHtmlUtils.getDateCondition(id,triggerClass)+"\
							<ul class='tertiary'>\
								<li>\
									<span class='percentum dataAnalysis1'>0</span>\
									<span class='up_png hide'><img src='"+ctxSurfond+"/chart/images/upward.png'></span>\
									<span class='down_png hide'><img src='"+ctxSurfond+"/chart/images/downward.png'></span>\
									<span class='text percent'></span>\
									<div>总任务数(人)</span>\
								</li>\
								<li>\
									<span class='percentum dataAnalysis2'>0</span>\
									<span class='up_png hide'><img src='"+ctxSurfond+"/chart/images/upward.png'></span>\
									<span class='down_png hide'><img src='"+ctxSurfond+"/chart/images/downward.png'></span>\
									<span class='text percent'></span>\
									<div>完成任务总数(人)</span>\
								</li>\
								<li>\
									<span class='percentum dataAnalysis3'>0</span>\
									<span class='up_png hide'><img src='"+ctxSurfond+"/chart/images/upward.png'></span>\
									<span class='down_png hide'><img src='"+ctxSurfond+"/chart/images/downward.png'></span>\
									<span class='text percent'></span>\
									<div>新增任务数(人)</span>\
								</li>\
							</ul>\
						</section>";
	return html;
}
/**
 * 圆形统计插件
 */
chartHtmlUtils.getCircliful = function(id,triggerClass,data){
	var html="<section id='"+id+"' "+stringUtils.dataUtils(data)+" charttype='"+chartUtils.CHART_TYPE_RADIALINDICATOR+"' class='chartshow htmleaf-container consummator float self-motion1'>\
							<div id='chart_label"+id+"' class='chart_label'></div>\
							<div class='Complete-tasks'>任务按时完成率</div>\
							"+chartHtmlUtils.getDateCondition(id,triggerClass)+"\
							<div id='circliful"+id+"' class='delivery' data-info='<span style=\"font-size:18px;\">按时率</span>' data-text='' ></div>\
							<div class='percent-sign total'>\
								<span>共<span class='totalTask' style='color: #FF7F00;'>0</span>个任务</span>\
								<div>按时完成的任务<span class='timelyDone' style='color: #FF7F00;'>0</span>个</div>\
							</div>\
						</section>";
	return html;
}
/**
 * 柱形图嵌曲线图
 */
chartHtmlUtils.getColumnAndSpline = function(id,triggerClass,data){
	var html="<section id='"+id+"' "+stringUtils.dataUtils(data)+" charttype='"+chartUtils.CHART_TYPE_COLUMNANDSPLINE+"' class='chartshow receptacle11 reunion htmleaf-container consummator'>\
						<div id='chart_label"+id+"' class='chart_label'></div>\
							<div class='Complete-tasks'>各成员按完成情况</div>\
						"+chartHtmlUtils.getDateCondition(id,triggerClass)+"\
						<div id='columnAndSpline"+id+"' style='width:100%;height:230px;margin:0 auto;margin-top: 29px;'</div>\
					</section>";
	return html;
}
/**
 * 数据统计分析
 */
chartHtmlUtils.getTaskDataAnalysis = function(id,triggerClass,data){
	var html="<section id='"+id+"' "+stringUtils.dataUtils(data)+" charttype='"+chartUtils.CHART_TYPE_RADIALINDICATOR2+"' class='chartshow receptacle11 measure htmleaf-container consummator' >\
						<div id='chart_label"+id+"' class='chart_label'></div>\
							<div class='Complete-tasks'>数据统计分析</div>\
						"+chartHtmlUtils.getDateCondition(id,triggerClass)+"\
						<div class='flutter'>\
							<div class='flutter_div left1'>\
								<div id='unDoneCount"+id+"'>0</div>\
								<span>未完成任务数(个)</span>\
							</div>\
							<div id='taskDataChart"+id+"' class='delivery' data-info='' data-text='<img style='padding-left:55px;padding-top:70px;' src='"+ctxSurfond+"/chart/images/gou.png'>' ></div>\
							<div class='flutter_div right2'>\
								<div id='doneCount"+id+"'>0</div>\
								<span>已完成任务数(个)</span>\
							</div>\
						</div>\
						<div class='punctuality'>\
							<ul>\
								<li>\
									<span id='onTimeUnDone"+id+"'>0</span>\
									<span class='up_png hide'><img src='"+ctxSurfond+"/chart/images/upward.png'></span>\
									<span class='down_png hide'><img src='"+ctxSurfond+"/chart/images/downward.png'></span>\
									<div>按时未完成(个)</div>\
								</li>\
								<li >\
									<span id='overTimeUnDone"+id+"'>0</span>\
									<span class='up_png hide'><img src='"+ctxSurfond+"/chart/images/upward.png'></span>\
									<span class='down_png hide'><img src='"+ctxSurfond+"/chart/images/downward.png'></span>\
									<div>超时未完成(个)</div>\
								</li>\
							</ul>\
							<ul></ul>\
							<ul></ul>\
							<ul>\
								<li>\
									<span id='onTimeDone"+id+"'>0</span>\
									<span class='up_png hide'><img src='"+ctxSurfond+"/chart/images/upward.png'></span>\
									<span class='down_png hide'><img src='"+ctxSurfond+"/chart/images/downward.png'></span>\
									<div>按时完成(个)</div>\
								</li>\
								<li >\
									<span id='overTimeDone"+id+"'>0</span>\
									<span class='up_png hide'><img src='"+ctxSurfond+"/chart/images/upward.png'></span>\
									<span class='down_png hide'><img src='"+ctxSurfond+"/chart/images/downward.png'></span>\
									<div>超时完成(个)</div>\
								</li>\
							</ul>\
						</div>\
					</section>";
	return html;
}














/**
 * 日期控件html
 */
//获取筛选条件的"天"的下拉列表
chartHtmlUtils.getDaySelectHtml = function(){
	var d = new Date().getDay();
	var html="<option value='1' "+chartHtmlUtils.getDaySel(d==1)+">周一</option>\
		<option value='2' "+chartHtmlUtils.getDaySel(d==2)+">周二</option>\
		<option value='3' "+chartHtmlUtils.getDaySel(d==3)+">周三</option>\
		<option value='4' "+chartHtmlUtils.getDaySel(d==4)+">周四</option>\
		<option value='5' "+chartHtmlUtils.getDaySel(d==5)+">周五</option>\
		<option value='6' "+chartHtmlUtils.getDaySel(d==6)+">周六</option>\
		<option value='7' "+chartHtmlUtils.getDaySel(d==0)+">周日</option>\
		";
//	html="<option value='0'>今天</option>";
//	dateSecondCondition.attr("disabled","disabled");
//	html="<option value='0'>周日</option>\
//		<option value='1'>周一</option>\
//		<option value='2'>周二</option>\
//		<option value='3'>周三</option>\
//		<option value='4'>周四</option>\
//		<option value='5'>周五</option>\
//		<option value='6'>周六</option>";
	return html;
}
//获取筛选条件的"周"的下拉列表
chartHtmlUtils.getWeekSelectHtml = function(){
	var d = new Date().getDay();
	var html="<option value='this' selected='selected'>本周</option>\
		<option value='last' >上周</option>";
//	html="<option value='0'>周日</option>\
//	<option value='1'>周一</option>\
//	<option value='2'>周二</option>\
//	<option value='3'>周三</option>\
//	<option value='4'>周四</option>\
//	<option value='5'>周五</option>\
//	<option value='6'>周六</option>";
//dateSecondCondition.removeAttr("disabled");
	return html;
}
//获取筛选条件的"月"的下拉列表
chartHtmlUtils.getMonthSelectHtml = function(){
	var m = new Date().getMonth()+1;
	var html="<option value='1' "+chartHtmlUtils.getDaySel(m==1)+">一月</option>\
		<option value='2' "+chartHtmlUtils.getDaySel(m==2)+">二月</option>\
		<option value='3' "+chartHtmlUtils.getDaySel(m==3)+">三月</option>\
		<option value='4' "+chartHtmlUtils.getDaySel(m==4)+">四月</option>\
		<option value='5' "+chartHtmlUtils.getDaySel(m==5)+">五月</option>\
		<option value='6' "+chartHtmlUtils.getDaySel(m==6)+">六月</option>\
		<option value='7' "+chartHtmlUtils.getDaySel(m==6)+">七月</option>\
		<option value='8' "+chartHtmlUtils.getDaySel(m==6)+">八月</option>\
		<option value='9' "+chartHtmlUtils.getDaySel(m==6)+">九月</option>\
		<option value='10' "+chartHtmlUtils.getDaySel(m==6)+">十月</option>\
		<option value='11' "+chartHtmlUtils.getDaySel(m==6)+">十一月</option>\
		<option value='12' "+chartHtmlUtils.getDaySel(m==6)+">十二月</option>";
//	html="<option value='1'>1</option>\
//	<option value='2'>2</option>\
//	<option value='3'>3</option>\
//	<option value='4'>4</option>\
//	<option value='5'>5</option>\
//	<option value='6'>6</option>\
//	<option value='7'>7</option>\
//	<option value='8'>8</option>\
//	<option value='9'>9</option>\
//	<option value='10'>10</option>\
//	<option value='11'>11</option>\
//	<option value='12'>12</option>\
//	<option value='13'>13</option>\
//	<option value='14'>14</option>\
//	<option value='15'>15</option>\
//	<option value='16'>16</option>\
//	<option value='17'>17</option>\
//	<option value='18'>18</option>\
//	<option value='19'>19</option>\
//	<option value='20'>20</option>\
//	<option value='21'>21</option>\
//	<option value='22'>22</option>\
//	<option value='23'>23</option>\
//	<option value='24'>24</option>\
//	<option value='25'>25</option>\
//	<option value='26'>26</option>\
//	<option value='27'>27</option>\
//	<option value='28'>28</option>";
//dateSecondCondition.removeAttr("disabled");
	return html;
}
//判断选中
chartHtmlUtils.getDaySel = function(flag){
	if(flag){
		return "selected='selected'";
	}
	return "";
}
//动态生成时间下拉菜单
chartHtmlUtils.getDateCondition = function(id,triggerClass){
	var html="<div class='Complete-tasks position'>\
					<div class='mistaken chartclose'>×</div>\
					<ul pid='"+id+"' class='lengthy'>\
						<li>\
							<select id='dateSecondCondition"+id+"' class='"+triggerClass+" dateSecondCondition' >\
								"+chartHtmlUtils.getDaySelectHtml()+"\
							</select>\
						</li>\
						<li>\
							<select id='dateCondition"+id+"' class='"+triggerClass+" dateCondition'>\
								<option value='day'>日</option>\
								<option value='week'>周</option>\
								<option value='month'>月</option>\
							</select>\
						</li>\
					</ul>\
				</div>";
	return html;
}


