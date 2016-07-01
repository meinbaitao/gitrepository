/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.conversation.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.conversation.entity.Conversation;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 话题信息DAO接口
 * @author mjs
 * @version 2015-10-22
 */
@MyBatisDao
public interface ConversationDao extends CrudDao<Conversation> {
	
	/**
	 * 根据(空间或者项目)ID查找会话列表(包括会话下的所有评论和附件和点赞记录、包括所有评论下的附件和点赞记录)
	 * @param conversation
	 * @return
	 */
	public List<Conversation> findByResourceId(Conversation conversation);
	
	/**
	 * 获取话题详情
	 * @param conversation
	 * @return
	 */
	public Conversation findOneConversation(Conversation conversation);
	
	/**
	 * 查询话题最大排序值
	 * @param conversation
	 * @return
	 */
	public Conversation findConversationMaxSort(Conversation conversation);
	
	/**
	 * 用户对会话点赞改变对话点赞数量
	 * @param conversation
	 */
	public void conversationPraise(Conversation conversation);
	
	/**
	 * 查找热点话题
	 * @param conversation
	 * @return
	 */
	public List<Conversation> findHotConversation(Conversation conversation);
	
	/**
	 * 查找点赞记录是否存在
	 * @param map
	 * @return
	 */
	public Map<String,Object> findPraiseRecode(Map<String,Object> map);
	
	/**
	 * 查找点赞记录的用户信息
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> findPraiseRecodeMembers(Map<String,Object> map);
	
}