/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.chart.entity;

import java.util.Date;

import com.thinkgem.jeesite.common.persistence.DataEntity;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 报表显示Entity
 * @author xiaocai
 * @version 2016-3-28
 */
public class ChartShow extends DataEntity<ChartShow> {
	
	private static final long serialVersionUID = 1L;
	private String sourceId;	// 数据源头
	private String label;		// 报表标签
	private String type;		// 报表类型
	private String charttype;	// 显示的图表类型
	private String description;	// 日志摘要 
	
	@Override
	public String toString(){
		String str="报表显示：";
		str+="\tId：";
		str+=this.id;
		str+="\t标签：";
		str+=this.label;
		str+="\t报表类型：";
		str+=this.type;
		str+="\t图表类型：";
		str+=this.charttype;
		str+="\n";
		return str;
	}
	
	public ChartShow(){
		super();
	}
	
	public ChartShow(String id,String sourceId,String label,String type,String charttype,String description){
		this.id=id;
		this.sourceId=sourceId;
		this.label=label;
		this.type=type;
		this.charttype=charttype;
		this.description=description;
		this.createDate=new Date();
		this.createBy=UserUtils.getUser();
	}
	
	public String getSourceId() {
		return sourceId;
	}
	public void setSourceId(String sourceId) {
		this.sourceId = sourceId;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCharttype() {
		return charttype;
	}
	public void setCharttype(String charttype) {
		this.charttype = charttype;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	/**
	 * 报表类型
	 */
	/**
	 * 空间
	 */
	public static final String TYPE_SPACE="space";

	/**
	 * 团队
	 */
	public static final String TYPE_TEAM="team";
	/**
	 * 项目
	 */
	public static final String TYPE_PROJECT="project";
	
	
	/**
	 * 图表类型
	 */
	
	/**
	 * 饼状图
	 */
	public static final String CHART_TYPE_PIE="pie";
	/**
	 * 数据分析
	 */
	public static final String CHART_TYPE_DATA_ANALYSE="dataAnalyse";
	/**
	 * 圆形进度指示器(任务按时完成率)
	 */
	public static final String CHART_TYPE_RADIALINDICATOR="radialIndicator";
	/**
	 * 点赞排行前5
	 */
	public static final String CHART_TYPE_PRAISE="praise";
	/**
	 * 圆形进度指示器2(任务数据统计分析)
	 */
	public static final String CHART_TYPE_RADIALINDICATOR2="radialIndicator2";
	/**
	 * 柱形加曲线 (ColumnAndSpline)
	 */
	public static final String CHART_TYPE_COLUMNANDSPLINE="columnAndSpline";
	
}