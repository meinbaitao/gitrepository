/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.conversation.entity;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.comment.entity.Comment;
import com.thinkgem.jeesite.common.persistence.AttrEntity;

/**
 * 团队话题表Entity
 * @author mjs
 * @version 2015-10-15
 */
public class Conversation extends AttrEntity<Conversation> {
	
	private static final long serialVersionUID = 1L;
	private String title;		// 标题
	private String description;		// 描述
	private Integer praiseAmount;		// 被赞数
	private String type;		//话题类型(0:空间话题)
	private String status;		// 状态
	private Integer sort;		// 排序
	private String resourceId;		// 团队/空间编号
	private String userName;	// 用来保存创建人用户名
	private String userId;		// 用来保存创建人用户ID
	private String address;		//定位
	private String source;		//来源PP/PC
	

	private String photo;		//头像地址
	private String email;
	private String isPraise;		//当前用户是否点过赞
	private Integer commentCount;		//当前话题的评论数
	private String spaceName;		// 空间名称
	private String favoriteFlag;  //收藏
	private String spaceId;		//话题所属空间编号
	private String metionmember;	//艾特到的人的编号，用“；”隔开
	
	
	public String getFavoriteFlag() {
		return favoriteFlag;
	}

	public void setFavoriteFlag(String favoriteFlag) {
		this.favoriteFlag = favoriteFlag;
	}

	public String getSpaceName() {
		return spaceName;
	}

	public void setSpaceName(String spaceName) {
		this.spaceName = spaceName;
	}

	public Integer getCommentCount() {
		return commentCount;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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

	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}

	List<Comment> conversationComment;	//对话下的所有评论
	List<Attachment> attachment;		//对话下的所有附件
	

	public String getPhoto() {
		return photo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getIsPraise() {
		return isPraise;
	}

	public void setIsPraise(String isPraise) {
		this.isPraise = isPraise;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	
	public List<Attachment> getAttachment() {
		return attachment;
	}

	public void setAttachment(List<Attachment> attachment) {
		this.attachment = attachment;
	}

	public List<Comment> getConversationComment() {
		return conversationComment;
	}

	public void setConversationComment(
			List<Comment> conversationComment) {
		this.conversationComment = conversationComment;
	}

	public Conversation() {
		super();
	}

	public Conversation(String id){
		super(id);
	}

	@Length(min=0, max=50, message="标题长度必须介于 0 和 50 之间")
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	@Length(min=0, max=255, message="描述长度必须介于 0 和 255 之间")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	@Length(min=0, max=11, message="被赞数长度必须介于 0 和 11 之间")
	public Integer getPraiseAmount() {
		return praiseAmount;
	}

	public void setPraiseAmount(Integer praiseAmount) {
		this.praiseAmount = praiseAmount;
	}
	
	@Length(min=0, max=1, message="状态长度必须介于 0 和 1 之间")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}
	
	@Length(min=0, max=64, message="团队编号长度必须介于 0 和 64 之间")
	public String getResourceId() {
		return resourceId;
	}

	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}

	public String getSpaceId() {
		return spaceId;
	}

	public void setSpaceId(String spaceId) {
		this.spaceId = spaceId;
	}

	public String getMetionmember() {
		return metionmember;
	}

	public void setMetionmember(String metionmember) {
		this.metionmember = metionmember;
	}
	
}