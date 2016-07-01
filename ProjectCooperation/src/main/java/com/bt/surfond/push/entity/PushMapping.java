package com.bt.surfond.push.entity;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 推送映射实体
 * @author dyl
 * @version 2016-02-24
 *
 */
public class PushMapping extends DataEntity<PushMapping> {

	private static final long serialVersionUID = 783042479025279501L;
	
	private String alias;	//别名
	private String cid;		//手机设备CID
	private String deviceToken;		//IOS设备唯一标识
	private String deviceType;		//设备类型：0-Android设备；1-IOS设备
	
	/**设备类型：Android设备*/
	public static final String DEVICE_TYPE_ANDROID = "0";
	/**设备类型：IOS设备*/
	public static final String DEVICE_TYPE_IOS = "1";
	
	public PushMapping(){
		super();
	}
	
	public PushMapping(String id){
		super(id);
	}
	
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public String getCid() {
		return cid;
	}
	public void setCid(String cid) {
		this.cid = cid;
	}
	public String getDeviceToken() {
		return deviceToken;
	}
	public void setDeviceToken(String deviceToken) {
		this.deviceToken = deviceToken;
	}
	public String getDeviceType() {
		return deviceType;
	}
	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
	
}
