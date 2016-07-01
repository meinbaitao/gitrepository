package com.bt.surfond.feedback.entity;

import java.util.ArrayList;
import java.util.List;

import com.bt.surfond.attachment.entity.Attachment;
import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 意见反馈信息Entity
 * @author mjs
 */
public class Feedback extends DataEntity<Feedback>{
	
	private static final long serialVersionUID = 1L;
	
	private String parentId;		//上级ID
	private String description;		//描述
	private String type;			//类型：0是意见,1是回复
	private String status;			//状态，0代表未读，1表示已读
	
	private String userName;		//临时创建人用户名
	private String userPhoto;		//临时创建人头像
	
	List<Attachment> attachments = new ArrayList<Attachment>();	//附件
	
	List<Feedback> comments = new ArrayList<Feedback>();//回复
	
	public List<Attachment> getAttachments() {
		return attachments;
	}
	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}
	public List<Feedback> getComments() {
		return comments;
	}
	public void setComments(List<Feedback> comments) {
		this.comments = comments;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPhoto() {
		return userPhoto;
	}
	public void setUserPhoto(String userPhoto) {
		this.userPhoto = userPhoto;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
