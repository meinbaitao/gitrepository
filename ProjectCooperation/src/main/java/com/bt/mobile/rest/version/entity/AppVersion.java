package com.bt.mobile.rest.version.entity;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 评论信息Entity
 * @author dyl
 * @version 2015-09-30
 */
public class AppVersion extends DataEntity<AppVersion> {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 版本号
	 */
	private String version;
	
	/**
	 * 包名
	 */
	private String name;
	
	/**
	 * 下载地址
	 */
	private String url;
	/**
	 * 手机类型
	 */
	private String type;
	/**
	 * 状态: 0可选更新，1强制更新，2最新版本
	 */
	private String status;
	/**
	 * 版本更新内容描述
	 */
	private String desc;
	
	
	/**
	 * 文件大小
	 * @return
	 */
	private String size;
	
	
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
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
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}