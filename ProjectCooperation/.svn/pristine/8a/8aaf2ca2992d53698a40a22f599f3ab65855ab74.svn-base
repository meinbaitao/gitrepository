/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.feedback.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.attachment.service.AttachmentService;
import com.bt.surfond.common.Constants;
import com.bt.surfond.feedback.dao.FeedbackDao;
import com.bt.surfond.feedback.entity.Feedback;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 意见反馈信息Service
 * @author mjs
 */
@Service
@Transactional
public class FeedbackService extends CrudService<FeedbackDao, Feedback> {
	
	@Autowired
	private FeedbackDao feedbackDao;
	
	@Autowired
	private AttachmentService attachmentService;
	
	public Feedback get(String id) {
		return super.get(id);
	}
	
	public List<Feedback> findList(Feedback feedback) {
		return super.findList(feedback);
	}
	
	public Page<Feedback> findPage(Page<Feedback> page, Feedback feedback) {
		return super.findPage(page, feedback);
	}
	
	@Transactional(readOnly = false)
	public void save(Feedback feedback) {
		super.save(feedback);
	}
	
	/**
	 * 查找所有的意见反馈
	 * @param feedback
	 * @return
	 */
	public List<Feedback> findAllFeedbackInfo(Feedback feedback){
		feedback.setType(Constants.FEEDBACK_TYPE);
		feedback.setCreateBy(UserUtils.getUser());
		String email = UserUtils.getUser().getEmail();
		String adminEmail = Global.getConfig("email_username");
		List<Feedback> list = null;
		if(adminEmail.equals(email)){
			list = feedbackDao.AdminfindAllFeedbackInfo(feedback);
		}else{
			list = feedbackDao.findAllFeedbackInfo(feedback);
		}
		for (Feedback f : list) {
			Feedback fb = new Feedback();
			fb.setParentId(f.getId());
			Attachment attachment = new Attachment();
			attachment.setTaskId(f.getId());
			List<Attachment> attachments = attachmentService.findAttachmentByTaskId(attachment);
			if(null!=attachments){
				f.setAttachments(attachments);
			}
			List<Feedback> comments = findAllFeedbackCommentListByParentId(fb);
			if(null!=comments){
				f.setComments(comments);
			}
		}
		return list;
	}
	
	/**
	 * 根据反馈信息Id查找相应的回复
	 * @param feedback
	 * @return
	 */
	public List<Feedback> findAllFeedbackCommentListByParentId(Feedback feedback){
		feedback.setType(Constants.FEEDBACK_COMMENT_TYPE);
		List<Feedback> list = feedbackDao.findAllFeedbackCommentListByParentId(feedback);
		for (Feedback f : list) {
			Attachment attachment = new Attachment();
			attachment.setTaskId(f.getId());
			List<Attachment> attachments = attachmentService.findAttachmentByTaskId(attachment);
			if(null!=attachments){
				f.setAttachments(attachments);
			}
		}
		return list;
	}
	
	/**
	 *  查找单个意见反馈/回复信息 
	 * @return
	 */
	public Feedback findOneFeedbackInfo(Feedback feedback){
		Feedback f = feedbackDao.findOneFeedbackInfo(feedback);
		Attachment attachment = new Attachment();
		attachment.setTaskId(f.getId());
		List<Attachment> attachments = attachmentService.findAttachmentByTaskId(attachment);
		if(null!=attachments){
			f.setAttachments(attachments);
		}
		return f;
	} 
	
	/**
	 * 查找用户的意见反馈的新的回复数
	 * @param feedback
	 * @return
	 */
	public int findAllFeedbackNewCommentCount(Feedback feedback){
		feedback.setStatus(Constants.FEEDBACK_STATUS_TYPE);
		feedback.setCreateBy(UserUtils.getUser());
		feedback.setType(Constants.FEEDBACK_COMMENT_TYPE);
		return feedbackDao.findAllFeedbackNewCommentCount(feedback);
	}
	
	/**
	 * 标记回复已读
	 * @param feedback
	 */
	public int updateFeedbackNewCommentCount(Feedback feedback){
		feedback.setStatus(Constants.FEEDBACK_STATUS_TYPE);
		feedback.setCreateBy(UserUtils.getUser());
		feedback.setType(Constants.FEEDBACK_COMMENT_TYPE);
		return feedbackDao.updateFeedbackNewCommentCount(feedback);
	}
	
	
}