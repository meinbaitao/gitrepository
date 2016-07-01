/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.template.entity;

import org.hibernate.validator.constraints.Length;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 空间模板Entity
 * @author xjp
 * @version 2015-12-02
 */
public class Template extends DataEntity<Template> {
	
	private static final long serialVersionUID = 1L;
	private String name;		// 模板名称
	private String description;		// 模板描述
	private String spaceId;		// 空间ID
	private String type;		// 模板类型
	private String modelLink;		// 模板链接
	
	public Template() {
		super();
	}

	public Template(String id){
		super(id);
	}

	@Length(min=0, max=50, message="模板名称长度必须介于 0 和 50 之间")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	@Length(min=0, max=64, message="空间ID长度必须介于 0 和 64 之间")
	public String getSpaceId() {
		return spaceId;
	}

	public void setSpaceId(String spaceId) {
		this.spaceId = spaceId;
	}
	
	@Length(min=1, max=1, message="模板类型长度必须介于 1 和 1 之间")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	public String getModelLink() {
		return modelLink;
	}

	public void setModelLink(String modelLink) {
		this.modelLink = modelLink;
	}
	
}