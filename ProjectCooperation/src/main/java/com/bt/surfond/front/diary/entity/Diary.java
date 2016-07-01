package com.bt.surfond.front.diary.entity;

import java.util.List;

import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.front.core.entity.ActiveUser;
import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 日志实体
 * @author dyl
 *
 */
public class Diary extends DataEntity<Diary>{

	private static final long serialVersionUID = 1L;
	private String title;		//标题
	private String content;		//内容
	private String taskId;		//任务ID
	
	//============
	private ActiveUser activeCreateBy;		//创建者信息
	private List<Attachment> attachmentList;	//附件列表
	
	public Diary() {
		super();
	}
	public Diary(String id){
		super(id);
	}
	public String getTitle() {
		return title == null ? "" : title.trim();
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content == null ? "" : content.trim();
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getTaskId() {
		return taskId == null ? "" : taskId.trim();
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public ActiveUser getActiveCreateBy() {
		return activeCreateBy;
	}
	public void setActiveCreateBy(ActiveUser activeCreateBy) {
		this.activeCreateBy = activeCreateBy;
	}
	public List<Attachment> getAttachmentList() {
		return attachmentList;
	}
	public void setAttachmentList(List<Attachment> attachmentList) {
		this.attachmentList = attachmentList;
	}
	
}
