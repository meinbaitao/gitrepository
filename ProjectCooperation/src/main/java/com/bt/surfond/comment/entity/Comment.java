package com.bt.surfond.comment.entity;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.conversation.entity.Conversation;
import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 评论信息Entity
 * @author dyl
 * @version 2015-09-30
 */
public class Comment extends DataEntity<Comment> {
	
	private static final long serialVersionUID = 1L;
	private String description;		// 描述
	private Integer praiseAmount;		// 被赞数
	private String type;		// 评论类型(0是对话评论，1是任务评论)
	private String status;		// 状态：（预留）
	private Integer sort;		// 排序
	private String resourceId;		// 任务编号
	private String address;		//定位
	private String source;		//来源PP/PC
	private String commentType;	//评论类型，0是普通评论，1是语音评论
	
	//临时数据
	private String createById;//暂存评论人编号
	private String createByName;//暂存评论人姓名
	private String createByEmail;//暂存评论人邮箱
	private String createByPhoto;//暂存评论人头像地址
	private String praiseFlag;//点赞标记，若当前用户对本评论点赞，则值为任务评论点赞类型常量值
	private String dynamicDescription;//暂存去格式的评论描述
	private String metionmember;//被@的人的编号，用“；”隔开
	private String spaceId;//空间编号
	private String conversationId;//评论所属话题编号
	private Conversation conversation;//评论所属话题
	
	private List<Attachment> attachment = new ArrayList<Attachment>();
	
	public List<Attachment> getAttachment() {
		return attachment;
	}

	public void setAttachment(List<Attachment> attachment) {
		this.attachment = attachment;
	}

	public Comment() {
		super();
	}

	public Comment(String id){
		super(id);
	}
	
	public String getCommentType() {
		return commentType;
	}

	public void setCommentType(String commentType) {
		this.commentType = commentType;
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

	@Length(min=0, max=255, message="描述长度必须介于 0 和 255 之间")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public Integer getPraiseAmount() {
		return praiseAmount;
	}

	public void setPraiseAmount(Integer praiseAmount) {
		this.praiseAmount = praiseAmount;
	}
	
	@Length(min=0, max=1, message="类型：（预留）长度必须介于 0 和 1 之间")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	@Length(min=0, max=1, message="状态：（预留）长度必须介于 0 和 1 之间")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	@NotNull(message="排序不能为空")
	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}
	
	@Length(min=0, max=64, message="任务编号长度必须介于 0 和 64 之间")
	public String getResourceId() {
		return resourceId;
	}

	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}

	public String getCreateByName() {
		return createByName;
	}

	public void setCreateByName(String createByName) {
		this.createByName = createByName;
	}

	public String getPraiseFlag() {
		return praiseFlag;
	}

	public void setPraiseFlag(String praiseFlag) {
		this.praiseFlag = praiseFlag;
	}

	public String getCreateById() {
		return createById;
	}

	public void setCreateById(String createById) {
		this.createById = createById;
	}

	public String getCreateByEmail() {
		return createByEmail;
	}

	public void setCreateByEmail(String createByEmail) {
		this.createByEmail = createByEmail;
	}

	public String getCreateByPhoto() {
		return createByPhoto;
	}

	public void setCreateByPhoto(String createByPhoto) {
		this.createByPhoto = createByPhoto;
	}

	public String getDynamicDescription() {
		return dynamicDescription;
	}

	public void setDynamicDescription(String dynamicDescription) {
		this.dynamicDescription = dynamicDescription;
	}

	public String getSpaceId() {
		return spaceId;
	}

	public void setSpaceId(String spaceId) {
		this.spaceId = spaceId;
	}

	public Conversation getConversation() {
		return conversation;
	}

	public void setConversation(Conversation conversation) {
		this.conversation = conversation;
	}

	public String getConversationId() {
		return conversationId;
	}

	public void setConversationId(String conversationId) {
		this.conversationId = conversationId;
	}

	public String getMetionmember() {
		return metionmember;
	}

	public void setMetionmember(String metionmember) {
		this.metionmember = metionmember;
	}

}