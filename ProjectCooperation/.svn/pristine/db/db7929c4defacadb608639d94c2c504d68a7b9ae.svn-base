/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.feedback.dao;

import java.util.List;

import com.bt.surfond.feedback.entity.Feedback;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 反馈信息DAO接口
 * @author mjs
 */
@MyBatisDao
public interface FeedbackDao extends CrudDao<Feedback> {
	
	/**
	 * 查找所有的意见反馈
	 * @param feedback
	 * @return
	 */
	public List<Feedback> findAllFeedbackInfo(Feedback feedback);
	
	/**
	 * 查找所有的意见反馈
	 * @param feedback
	 * @return
	 */
	public List<Feedback> AdminfindAllFeedbackInfo(Feedback feedback);
	
	/**
	 * 根据反馈信息Id查找相应的回复
	 * @param feedback
	 * @return
	 */
	public List<Feedback> findAllFeedbackCommentListByParentId(Feedback feedback);
	
	
	
	/**
	 *  查找单个意见反馈/回复信息 
	 * @return
	 */
	public Feedback findOneFeedbackInfo(Feedback feedback);
	
	/**
	 *  查找用户的意见反馈的新的回复数
	 * @return
	 */
	public int findAllFeedbackNewCommentCount(Feedback feedback);
	
	/**
	 * 标记新回复已读
	 * @param feedback
	 * @return
	 */
	public int updateFeedbackNewCommentCount(Feedback feedback);
	
}