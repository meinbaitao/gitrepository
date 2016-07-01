/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.bookmark.entity;

import org.hibernate.validator.constraints.Length;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 收藏信息Entity
 * @author xjp
 * @version 2015-12-02
 */
public class Bookmark extends DataEntity<Bookmark> {
	
	private static final long serialVersionUID = 1L;
	private String title;			// 收藏标题
	private String url;				// 收藏地址
	private String type;			// 收藏类型
	private String resourceId;		//收藏类型ID	
	private String description;     //描述
	private String address;         //地址
	private String spaceId;		//空间ID
	
	
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getResourceId() {
		return resourceId;
	}

	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}

	public Bookmark() {
		super();
	}

	public Bookmark(String id){
		super(id);
	}

	@Length(min=0, max=50, message="收藏标题长度必须介于 0 和 50 之间")
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	@Length(min=0, max=1, message="收藏类型长度必须介于 0 和 1 之间")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSpaceId() {
		return spaceId;
	}

	public void setSpaceId(String spaceId) {
		this.spaceId = spaceId;
	}
	
}