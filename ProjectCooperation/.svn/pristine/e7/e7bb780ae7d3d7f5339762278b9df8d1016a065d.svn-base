var chartUtils = {};

chartUtils.init = function(){
	
}

//空间
chartUtils.TYPE_SPACE="space";
//团队
chartUtils.TYPE_TEAM="team";
//项目
chartUtils.TYPE_PROJECT="project";

/**
 * 图表类型
 */
//饼状图
chartUtils.CHART_TYPE_PIE="pie";
//数据分析
chartUtils.CHART_TYPE_DATA_ANALYSE="dataAnalyse";
//圆形进度指示器(任务按时完成率)
chartUtils.CHART_TYPE_RADIALINDICATOR="radialIndicator";
//点赞排行前5
chartUtils.CHART_TYPE_PRAISE="praise";
//圆形进度指示器2(任务数据统计分析)
chartUtils.CHART_TYPE_RADIALINDICATOR2="radialIndicator2";
//柱形加曲线 (ColumnAndSpline)
chartUtils.CHART_TYPE_COLUMNANDSPLINE="columnAndSpline";


/*
 * 加载饼状图
 * id 标签id
 * num1 数值1
 * num2 数值2
 */
chartUtils.loadPie = function(id,num1,num2){
	if(num2==0&&num1==0){
		num2=1;
	}
	$('#'+id).highcharts({
        chart: {
        	height:180,
        	width:163
        },
        title: {
            text: ''
        },
        dataLabels: { 
            enabled: false  //不显示饼状图数据标签 
        },
        series: [{
            type: 'pie',
            name: '',
            size:163,
            enableMouseTracking:false,
            dataLabels: { 
                enabled: false  //不显示饼状图数据标签 
            } ,
            data: [
                {
                    color:"#26B6E8",
                    y: num1
                },
                {
                    color:"#EAEFF3",
                    y: num2
                }
            ]
        }], 
        credits: { 
            enabled: false //不显示highCharts版权信息 
        }, 
        exporting: { 
            enabled: false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示 
        } 
    }); 
}
/*
 * 加载圆环图
 * id 标签id
 * value 所占百分比
 * size 环形大小
 * 其余相关属性在html中设置
 * 
 */
chartUtils.radialIndicator = function(id,value,size,dataText,dataInfo,dataImg){
	$('#'+id).empty();
	
	if(!dataText){
		dataText="";
	}
	if(!dataInfo){
		dataInfo="";
	}
	if(!dataImg){
		dataImg="";
	}
	
	$('#'+id).append("<span style='padding-left:"+(size-15)+"px;padding-top:"+(size-20)+"px;position: absolute;font-size:20px;float:left;' >"+dataText+"</span>");
	$('#'+id).append("<span style='padding-left:"+(size-25)+"px;padding-top:"+(size+30)+"px;position: absolute;font-size:20px;float:left;' >"+dataInfo+"</span>");
	$('#'+id).append("<span style='position: absolute;font-size:20px;float:left;' >"+dataImg+"</span>");
	$('#'+id).radialIndicator({
		radius:size,	//定义圆形指示器的内部的圆的半径。
		barWidth:12,		//定义圆形指示器的刻度条的宽度。
		barBgColor:"#eee",	//定义圆形指示器的刻度条的背景颜色。
		barColor:"#FFD700",		//定义渊声巷指示器的刻度条颜色。如果提供一个颜色范围对象作为值，插件会将该范围的颜色插入（如果 interpolate选项为true）在指定的位置。
		showPercentage : false, // option
		displayNumber:false,
		fontSize:38,
	    initValue:value
	});
}

/*
 * 加载进度条
 * id 标签id
 * value 进度值
 */
chartUtils.loadProgress = function(id,value,width,height,barColor){
	$("#"+id).empty();
	var progress = $("#"+id).Progress({
		width: width, // 长度
		height: height, // 高度
		percent: value, // 显示进度
		backgroundColor: '#B8B8B8', // 进度条的背景色
		barColor: barColor, // 进度条颜色
		radius: 4, // 进度条圆角的半径
		fontSize: 0, // 字体大小
		fontColor: '#fff', //字体颜色
		increaseSpeed: 3, // 进度条增加的速度
		animate: true // 是否动画
	}); 
}
/* 
 * 加载柱形图和曲线
 * id 标签id
 */
chartUtils.loadHighchartsColumnAndSpline = function(id,title,xAxisVal,columnName,columnVal,splineName,splineVal){
	$('#'+id).highcharts({                                          
		chart: {  
			type: 'column'
			},                                                                
		title: {                                                          
			text: title 
		},  
		//x轴
		xAxis: {  
			title:{
				text:'',
			},
			categories: xAxisVal
		},     
		yAxis: { 
			title:{
				text:'',
			},
			min: 0
		},
		tooltip: {                                                        
			formatter: function() {                                       
			    var s;                                                    
			    if (this.point.name) { // the pie chart                   
			        s = ''+                                               
			            this.point.name +': '+ this.y +' fruits';         
			    } else {                                                  
			        s = ''+                                               
			            this.x  +': '+ this.y;                            
			    }                                                         
			    return s;                                                 
			}                                                             
		},                                                                
		series: [{                                                              
				type: 'column',   
				shadow:true,
				name: columnName,            
				data: columnVal,
				maxPointWidth:20                                 
			}, {                                                              
				type: 'spline',                                               
				name: splineName,                                              
				data: splineVal,                               
				color:'white' ,
				lineWidth : 0 ,
//				enableMouseTracking:false,
//				stickyTracking:false,
				marker: {                                                     
					lineWidth: 2,                                               
					lineColor: Highcharts.getOptions().colors[3],  
					fillColor: 'white'                                          
				}                                                             
			}], 
        credits: { 
            enabled: false //不显示highCharts版权信息 
        }, 
        exporting: { 
            enabled: false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示 
        }                                                                
	});                      
}

//季度初始化
chartUtils.initQuarter = function(id){	
	var date = new Date();
	var yy = date.getFullYear();
	var mm = date.getMonth()+1;
	var quarter=0;
	var yyOld = date.getFullYear()-1;
	var sDate = new Array(4);
	var eDate = new Array(4);
	var quarterArr = new Array(8);
	
	if(parseInt(mm)>=1&&parseInt(mm)<=3){
		quarter = 1;
		sDate[1]=chartDateUtils.getStartDate(yyOld,4);
		sDate[2]=chartDateUtils.getStartDate(yyOld,3);
		sDate[3]=chartDateUtils.getStartDate(yyOld,2);
		
		eDate[1]=chartDateUtils.getEndDate(yyOld,4);
		eDate[2]=chartDateUtils.getEndDate(yyOld,3);
		eDate[3]=chartDateUtils.getEndDate(yyOld,2);
		
		quarterArr[0]="一";
		quarterArr[1]="四";
		quarterArr[2]="三";
		quarterArr[3]="二";
		
		quarterArr[0+4]=1;
		quarterArr[1+4]=4;
		quarterArr[2+4]=3;
		quarterArr[3+4]=2;
	}else if(parseInt(mm)>=4&&parseInt(mm)<=6){
		quarter = 2;
		sDate[1]=chartDateUtils.getStartDate(yy,1);
		sDate[2]=chartDateUtils.getStartDate(yyOld,4);
		sDate[3]=chartDateUtils.getStartDate(yyOld,3);
		
		eDate[1]=chartDateUtils.getEndDate(yy,1);
		eDate[2]=chartDateUtils.getEndDate(yyOld,4);
		eDate[3]=chartDateUtils.getEndDate(yyOld,3);
		
		quarterArr[0]="二";
		quarterArr[1]="一";
		quarterArr[2]="四";
		quarterArr[3]="三";
		
		quarterArr[0+4]=2;
		quarterArr[1+4]=1;
		quarterArr[2+4]=4;
		quarterArr[3+4]=3;
	}else if(parseInt(mm)>=7&&parseInt(mm)<=9){
		quarter = 3;
		sDate[1]=chartDateUtils.getStartDate(yy,2);
		sDate[2]=chartDateUtils.getStartDate(yy,1);
		sDate[3]=chartDateUtils.getStartDate(yyOld,4);
		
		eDate[1]=chartDateUtils.getEndDate(yy,2);
		eDate[2]=chartDateUtils.getEndDate(yy,1);
		eDate[3]=chartDateUtils.getEndDate(yyOld,4);

		quarterArr[0]="三";
		quarterArr[1]="二";
		quarterArr[2]="一";
		quarterArr[3]="四";
		
		quarterArr[0+4]=3;
		quarterArr[1+4]=2;
		quarterArr[2+4]=1;
		quarterArr[3+4]=4;
	}else if(parseInt(mm)>=10&&parseInt(mm)<=12){
		quarter = 4;
		sDate[1]=chartDateUtils.getStartDate(yy,3);
		sDate[2]=chartDateUtils.getStartDate(yy,2);
		sDate[3]=chartDateUtils.getStartDate(yy,1)+"";
		
		eDate[1]=chartDateUtils.getEndDate(yy,3);
		eDate[2]=chartDateUtils.getEndDate(yy,2);
		eDate[3]=chartDateUtils.getEndDate(yy,1);

		quarterArr[0]="四";
		quarterArr[1]="三";
		quarterArr[2]="二";
		quarterArr[3]="一";
		
		quarterArr[0+4]=4;
		quarterArr[1+4]=3;
		quarterArr[2+4]=2;
		quarterArr[3+4]=1;
	}
	sDate[0]=chartDateUtils.getStartDate(yy,quarter);
	eDate[0]=chartDateUtils.getEndDate(yy,quarter);
	
	
	var html = "<li class='quarter quarterClick' startDate='"+sDate[0]+"' endDate='"+eDate[0]+"' quarter='"+quarterArr[0+4]+"'>第"+quarterArr[0]+"季度</li>\
				<li class='quarter ' startDate='"+sDate[1]+"' endDate='"+eDate[1]+"' quarter='"+quarterArr[1+4]+"'>第"+quarterArr[1]+"季度</li>\
				<li class='quarter ' startDate='"+sDate[2]+"' endDate='"+eDate[2]+"' quarter='"+quarterArr[2+4]+"'>第"+quarterArr[2]+"季度</li>\
				<li class='quarter ' startDate='"+sDate[3]+"' endDate='"+eDate[3]+"' quarter='"+quarterArr[3+4]+"'>第"+quarterArr[3]+"季度</li>";
	$("#"+id).html(html);
}



