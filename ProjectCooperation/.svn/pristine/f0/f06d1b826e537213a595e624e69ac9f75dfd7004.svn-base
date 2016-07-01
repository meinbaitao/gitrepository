/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.chart.entity;

import java.util.Date;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 报表日志记录Entity
 * @author xiaocai
 * @version 2016-3-7
 */
public class ChartLog extends DataEntity<ChartLog> {
	
	private static final long serialVersionUID = 1L;
	private String sourceId;	// 数据源头
	private String type;		// 日志类型
	private String description;	// 日志摘要 
	private Date logDate;		// 记录时间（即日志作用时间）
	
	public ChartLog() {
		super();
	}

	public ChartLog(String id){
		super(id);
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getLogDate() {
		return logDate;
	}

	public void setLogDate(Date logDate) {
		this.logDate = logDate;
	}

	public String getSourceId() {
		return sourceId;
	}

	public void setSourceId(String sourceId) {
		this.sourceId = sourceId;
	}

	

	
	
	
	/*---------------------华丽的分割线--------------------------*/
	/**
	 * 类型
	 */
	/**
	 * 日志类型_空间_成员
	 */
	public static final String TYPE_SPACE_MEMBER="1";
	/**
	 * 日志类型_空间_任务_总数
	 */
	public static final String TYPE_SPACE_TASK_COUNT="2";
	/**
	 * 日志类型_空间_任务_完成_总数
	 */
	public static final String TYPE_SPACE_TASK_DONE_COUNT="3";
	/**
	 * 日志类型_空间_任务_新建数
	 */
	public static final String TYPE_SPACE_TASK_CREATE="4";
	/**
	 * 日志类型_空间_任务_按时未完成
	 */
	public static final String TYPE_SPACE_TASK_ONTIMEUNDONE="5";
	/**
	 * 日志类型_空间_任务_超时未完成
	 */
	public static final String TYPE_SPACE_TASK_OVERTIMEUNDONE="6";
	/**
	 * 日志类型_空间_任务_按时完成
	 */
	public static final String TYPE_SPACE_TASK_ONTIMEDONE="7";
	/**
	 * 日志类型_空间_任务_超时完成
	 */
	public static final String TYPE_SPACE_TASK_OVERTIMEDONE="8";
	/**
	 * 日志类型_项目_任务_按时未完成
	 */
	public static final String TYPE_PROJECT_TASK_ONTIMEUNDONE="9";
	/**
	 * 日志类型_项目_任务_超时未完成
	 */
	public static final String TYPE_PROJECT_TASK_OVERTIMEUNDONE="10";
	/**
	 * 日志类型_项目_任务_按时完成
	 */
	public static final String TYPE_PROJECT_TASK_ONTIMEDONE="11";
	/**
	 * 日志类型_项目_任务_超时完成
	 */
	public static final String TYPE_PROJECT_TASK_OVERTIMEDONE="12";
	/**
	 * 日志类型_团队_任务_总任务数
	 */
	public static final String TYPE_TEAM_TASK_COUNT="13";
	/**
	 * 日志类型_团队_任务_任务完成数
	 */
	public static final String TYPE_TEAM_TASK_DONE="14";
	/**
	 * 日志类型_团队_任务_任务新建
	 */
	public static final String TYPE_TEAM_TASK_CREATE="15";
	
	
}