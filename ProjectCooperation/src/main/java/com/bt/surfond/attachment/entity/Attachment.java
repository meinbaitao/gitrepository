package com.bt.surfond.attachment.entity;

import com.bt.surfond.front.core.entity.ActiveUser;
import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 附件实体
 * @author dyl
 *
 */
public class Attachment extends DataEntity<Attachment> {
	
	private static final long serialVersionUID = 1L;
	private String name;		// 附件名称
	private String attachmentType;		// 附件类型
	private String absolutePath;		// 绝对路径
	private String accessPath;		// 访问路径
	private String taskId;		// 任务ID
	private String type;		//所属类型的ID
	private String status;		//附件所属类型:3-日志；
	private String size;		//附件大小
	private String timeLength;	//音频时长
	
	//============
	private ActiveUser activeCreateBy;		//创建者信息
	
	private String userName;	//上传人名字，显示用
	private String userId;		//用户ID
	
	//============
	/**附件所属类型：日志*/
	public static final String TYPE_DIARY = "3";
	
	public Attachment() {
		super();
	}
	public Attachment(String id) {
		super(id);
	}
	public String getName() {
		return name == null ? "" : name.trim();
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAttachmentType() {
		return attachmentType == null ? "" : attachmentType.trim();
	}
	public void setAttachmentType(String attachmentType) {
		this.attachmentType = attachmentType;
	}
	public String getAbsolutePath() {
		return absolutePath == null ? "" : absolutePath.trim();
	}
	public void setAbsolutePath(String absolutePath) {
		this.absolutePath = absolutePath;
	}
	public String getAccessPath() {
		return accessPath == null ? "" : accessPath.trim();
	}
	public void setAccessPath(String accessPath) {
		this.accessPath = accessPath;
	}
	public String getTaskId() {
		return taskId == null ? "" : taskId.trim();
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getType() {
		return type == null ? "" : type.trim();
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getStatus() {
		return status == null ? "" : status.trim();
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getSize() {
		return size == null ? "" : size.trim();
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getTimeLength() {
		return timeLength == null ? "" : timeLength.trim();
	}
	public void setTimeLength(String timeLength) {
		this.timeLength = timeLength;
	}
	public ActiveUser getActiveCreateBy() {
		return activeCreateBy;
	}
	public void setActiveCreateBy(ActiveUser activeCreateBy) {
		this.activeCreateBy = activeCreateBy;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}