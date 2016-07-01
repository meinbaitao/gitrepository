package com.bt.surfond.message.entity;

import com.bt.surfond.message.common.Constants;
import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 消息实体
 * @author dyl
 * @version 2016-02-24
 *
 */
public class Message extends DataEntity<Message> {

	private static final long serialVersionUID = 8383445422074586632L;
	
	private String recordId;	//任务、话题、项目编号
	private String content;		//消息内容
	private String msgType;		//消息类型：0-任务；1-话题；2-项目
	private String pushUserId;		//消息接收人
	private String readStatus;		//查看状态：0-未读；1-已读
	private String spaceId;		//空间编号
	private String subsType;	//订阅类型
	
	/**消息类型：任务*/
	public static final String MESSAGE_TYPE_TASK = "0";
	/**消息类型：话题*/
	public static final String MESSAGE_TYPE_CONV = "1";
	/**消息类型：项目*/
	public static final String MESSAGE_TYPE_PROJECT = "2";
	
	/**查看状态：未读*/
	public static final String READ_STATUS_NO = "0";
	/**查看状态：已读*/
	public static final String READ_STATUS_YES = "1";
	
	/**手机端推送类型:话题*/
	public static final String PUSH_CONVERSATION = "0";
	/**手机端推送类型:任务*/
	public static final String PUSH_TASK = "1";
	/**手机端推送类型:@我的*/
	public static final String PUSH_AITE = "2";
	
	
	//==========
	private String code;	//订阅类型
	private String type;	//查询列表类型(参数)
	private String unReadCount;//未读消息 总数
	private String otherMsgType;	//查询参数(数据库)
	private String commonType = Constants.ME_IS_KING;	//通用类型,用户查询不需设置开关的提醒
	
	public Message(){
		super();
	}
	
	public Message(String id){
		super(id);
	}
	
	public String getRecordId() {
		return recordId;
	}
	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getMsgType() {
		return msgType;
	}
	public void setMsgType(String msgType) {
		this.msgType = msgType;
	}
	public String getPushUserId() {
		return pushUserId;
	}
	public void setPushUserId(String pushUserId) {
		this.pushUserId = pushUserId;
	}
	public String getReadStatus() {
		return readStatus;
	}
	public void setReadStatus(String readStatus) {
		this.readStatus = readStatus;
	}
	public String getSpaceId() {
		return spaceId;
	}
	public void setSpaceId(String spaceId) {
		this.spaceId = spaceId;
	}

	public String getSubsType() {
		return subsType;
	}

	public void setSubsType(String subsType) {
		this.subsType = subsType;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCommonType() {
		return commonType;
	}

	public void setCommonType(String commonType) {
		this.commonType = commonType;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getOtherMsgType() {
		return otherMsgType;
	}

	public void setOtherMsgType(String otherMsgType) {
		this.otherMsgType = otherMsgType;
	}

	public String getUnReadCount() {
		return unReadCount;
	}

	public void setUnReadCount(String unReadCount) {
		this.unReadCount = unReadCount;
	}
	
}
