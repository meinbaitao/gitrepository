/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.schedule.entity;

import org.hibernate.validator.constraints.Length;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 任务调度Entity
 * @author xjp
 * @version 2015-11-19
 */
public class Schedule extends DataEntity<Schedule> {
	
	private static final long serialVersionUID = 1L;
	private String type;		// 调度类型
	private String status;		// 状态：0一天提醒,1七天提醒
	private String taskId;		// 需要调度的任务编号
	
	public Schedule() {
		super();
	}

	public Schedule(String id){
		super(id);
	}

	@Length(min=0, max=1, message="调度类型长度必须介于 0 和 1 之间")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	@Length(min=0, max=1, message="状态：0一天提醒,1七天提醒长度必须介于 0 和 1 之间")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	@Length(min=0, max=64, message="需要调度的任务编号长度必须介于 0 和 64 之间")
	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	
}