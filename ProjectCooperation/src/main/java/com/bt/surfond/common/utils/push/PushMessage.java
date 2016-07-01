package com.bt.surfond.common.utils.push;

import java.io.Serializable;

/**
 * 推送消息参数设置类，可设置推送内容、推送响应方式等。
 * 
 * @author dyl
 * @version 2016-02-18
 *
 */
public class PushMessage implements Serializable {

	private static final long serialVersionUID = -2665007479339501201L;

	// 推送设置
	private String alias;// 用户别名
	private boolean offline;// 是否设置离线有效时长
	private long offlineExpireTime;// 离线有效时长
	private int pushNetWorkType;// 推送网络环境

	// 模板设置
	private String title;// 标题
	private String text;// 内容
	private String logo;// 标记
	private String logoUrl;// 标记地址
	private boolean ring;// 是否响铃
	private boolean vibrate;// 是否震动
	private boolean clearable;// 是否可清除
	private String url;// 内容跳转地址
	private int transmissionType;// 启动类型
	
	//ios特殊设置
	private String deviceToken;//苹果设备唯一标识
	private String category;//ios后台接收内容
	private String body;//通知栏内容
	
	/** 推送网络环境：不限制 */
	public static final int PUSH_NETWORK_TYPE_ALL = 0;
	/** 推送网络环境：仅WiFi*/
	public static final int PUSH_NETWORK_TYPE_WIFI = 1;

	/** 接收透传消息后应用启动类型：强制 */
	public static final int TRANSMISSION_TYPE_FORCED = 1;
	/** 接收透传消息后应用启动类型：等待 */
	public static final int TRANSMISSION_TYPE_WAIT = 2;

	public PushMessage() {
		this.offline = true;
		this.offlineExpireTime = 24 * 3600 * 1000;
		this.pushNetWorkType = PushMessage.PUSH_NETWORK_TYPE_ALL;
		this.logo = "icon.png";
		this.logoUrl = "http://bazhua.igexin.com/file/2016/0/28/11/14539509814044443.txt";
		this.ring = true;
		this.vibrate = true;
		this.clearable = true;
		this.url = "http://www.surfond.com";
		this.transmissionType = PushMessage.TRANSMISSION_TYPE_WAIT;
	}

	public PushMessage(String alias, String text) {
		this();
		this.alias = alias;
		this.text = text;
	}

	public PushMessage(String alias, String title, String text) {
		this(alias, text);
		this.title = title;
	}

	public PushMessage(String alias, String title, String text, String url) {
		this(alias, title, text);
		this.url = url;
	}
	
	public PushMessage(String alias, String text, String deviceToken, String body, String category){
		this(alias, text);
		this.deviceToken = deviceToken;
		this.body = body;
		this.category = category;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public boolean isOffline() {
		return offline;
	}

	public void setOffline(boolean offline) {
		this.offline = offline;
	}

	public long getOfflineExpireTime() {
		return offlineExpireTime;
	}

	public void setOfflineExpireTime(long offlineExpireTime) {
		this.offlineExpireTime = offlineExpireTime;
	}

	public int getPushNetWorkType() {
		return pushNetWorkType;
	}

	public void setPushNetWorkType(int pushNetWorkType) {
		this.pushNetWorkType = pushNetWorkType;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public boolean isRing() {
		return ring;
	}

	public void setRing(boolean ring) {
		this.ring = ring;
	}

	public boolean isVibrate() {
		return vibrate;
	}

	public void setVibrate(boolean vibrate) {
		this.vibrate = vibrate;
	}

	public boolean isClearable() {
		return clearable;
	}

	public void setClearable(boolean clearable) {
		this.clearable = clearable;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public int getTransmissionType() {
		return transmissionType;
	}

	public void setTransmissionType(int transmissionType) {
		this.transmissionType = transmissionType;
	}

	public String getDeviceToken() {
		return deviceToken;
	}

	public void setDeviceToken(String deviceToken) {
		this.deviceToken = deviceToken;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

}
