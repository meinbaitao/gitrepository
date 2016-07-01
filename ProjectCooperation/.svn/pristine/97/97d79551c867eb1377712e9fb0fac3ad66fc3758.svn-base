/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.dynamic.entity;

import java.util.HashMap;
import java.util.Map;

import org.hibernate.validator.constraints.Length;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 动态记录表Entity
 * @author xjp
 * @version 2015-11-21
 */
public class Dynamic extends DataEntity<Dynamic> {
	
	private static final long serialVersionUID = 1L;
	private String taskId;				// 任务编号
	private String type;				// 类型,0是话题，1是任务
	private String description;			// 日志描述
	private String remoteAddr;			// 操作IP地址
	private String year;				// 年份
	private String aboutUserId;			//关联的用户ID
	private String unreadCount; 				//未读
	private String status;				//状态(0是未读，1是已读)
	private String address;		//定位
	private String source;		//来源PP/PC
	private String resourceId;		//数据类型ID
	
	//==========
	private String dynamicDescription;//组装后的任务记录
	private String beginDate;		//查询条件开始时间
	private String endDate;			//查询条件结束时间
	private String createById;		//创建人ID
	private Map<String, Object> map = new HashMap<String, Object>();//临时存储描述
	
	/**类型:话题*/
	public static final String TYPE_CONV = "0";
	/**类项:任务*/
	public static final String TYPE_TASK = "1";
	
	/**状态:未读*/
	public static final String STATUS_UNREAD = "0";
	/**状态:已读*/
	public static final String STATUS_READ = "1";
	
	public String getUnreadCount() {
		return unreadCount;
	}

	public Map<String, Object> getMap() {
		return map;
	}

	public String getCreateById() {
		return createById;
	}

	public void setCreateById(String createById) {
		this.createById = createById;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}
	public String getBeginDate() {
		return beginDate;
	}

	public void setBeginDate(String beginDate) {
		this.beginDate = beginDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public void setUnreadCount(String unreadCount) {
		this.unreadCount = unreadCount;
	}

	
	public String getResourceId() {
		return resourceId;
	}

	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}

	public String getAboutUserId() {
		return aboutUserId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setAboutUserId(String aboutUserId) {
		this.aboutUserId = aboutUserId;
	}

	private String userName;			//操作人的名字
	private String photo;				//操作人的
	
	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public Dynamic() {
		super();
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Dynamic(String id){
		super(id);
	}

	@Length(min=0, max=64, message="任务编号长度必须介于 0 和 64 之间")
	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	
	@Length(min=0, max=1, message="类型长度必须介于 0 和 1 之间")
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
	
	@Length(min=0, max=255, message="操作IP地址长度必须介于 0 和 255 之间")
	public String getRemoteAddr() {
		return remoteAddr;
	}

	public void setRemoteAddr(String remoteAddr) {
		this.remoteAddr = remoteAddr;
	}
	
	@Length(min=0, max=10, message="年份长度必须介于 0 和 10 之间")
	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getDynamicDescription() {
		return dynamicDescription;
	}

	public void setDynamicDescription(String dynamicDescription) {
		this.dynamicDescription = dynamicDescription;
	}

}