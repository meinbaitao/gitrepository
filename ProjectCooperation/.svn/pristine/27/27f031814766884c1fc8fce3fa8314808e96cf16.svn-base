package com.bt.surfond.tags.entity;

import org.hibernate.validator.constraints.Length;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 标签模块Entity
 * @author dyl
 * @version 2015-11-21
 */
public class Tags extends DataEntity<Tags> {
	
	private static final long serialVersionUID = 1L;
	private String spaceId;		// 空间编号
	private String title;		// 标签名称
	
	//==========
	private String taskId;		//任务编号
	private String favoriteFlag;//收藏标记
	private String taskAmount;//任务数量
	private String tagsIds;//标签编号字符串,用";"隔开

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public Tags() {
		super();
	}

	public Tags(String id){
		super(id);
	}

	@Length(min=1, max=64, message="空间编号长度必须介于 1 和 64 之间")
	public String getSpaceId() {
		return spaceId;
	}

	public void setSpaceId(String spaceId) {
		this.spaceId = spaceId;
	}
	
	@Length(min=1, max=64, message="标签名称长度必须介于 1 和 64 之间")
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFavoriteFlag() {
		return favoriteFlag;
	}

	public void setFavoriteFlag(String favoriteFlag) {
		this.favoriteFlag = favoriteFlag;
	}

	public String getTaskAmount() {
		return taskAmount;
	}

	public void setTaskAmount(String taskAmount) {
		this.taskAmount = taskAmount;
	}

	public String getTagsIds() {
		return tagsIds;
	}

	public void setTagsIds(String tagsIds) {
		this.tagsIds = tagsIds;
	}
	
}