package com.bt.surfond.message.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.message.entity.Message;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 消息dao接口
 * @author dyl
 * @version 2016-02-24
 *
 */
@MyBatisDao
public interface MessageDao extends CrudDao<Message> {

	/**
	 * 插入用户订阅记录
	 * @param paramMap
	 * @return
	 */
	public int saveMessageSubscription(Map<String, Object> paramMap);
	
	/**
	 * 查询用户订阅记录
	 * @param paramMap
	 * @return
	 */
	public Map<String, Object> findMessageSubscription(Map<String, Object> paramMap);
	
	/**
	 * 删除用户订阅记录
	 * @param paramMap
	 * @return
	 */
	public int deleteMessageSubscription(Map<String, Object> paramMap);
	
	/**
	 * 查询用户订阅记录列表
	 * @param userId
	 * @return
	 */
	public List<Map<String, Object>> findMessageSubscriptionList(String userId);
	
	/**
	 * 查询当前用户在指定空间的消息列表
	 * @param message
	 * @return
	 */
	public List<Message> findMessageList(Message message);
	
	/**
	 * 查询当前用户未读消息总数
	 * @param message
	 * @return
	 */
	public int findUnReadMessageCount(Message message);
	
	/**
	 * 将当前用户在指定空间下的消息设置为已读
	 * @param message
	 * @return
	 */
	public int updateReadStatusBySpaceId(Message message);
	
	/**
	 * 根据编号将消息标记为已读
	 * @param message
	 * @return
	 */
	public int updateReadStatusById(Message message);
	
	/**
	 * 查询当前用户在指定空间的消息列表(分模块)
	 * @param message
	 * @return
	 */
	public List<Message> findMessageListByType(Message message);
	
	/**
	 * 查询@人的消息列表
	 * @param message
	 * @return
	 */
	public List<Message> findMessageListByAite(Message message);
	
	/**
	 * 查询当前用户在指定空间的消息(最新)(分模块)
	 * @param message
	 * @return
	 */
	public Message findMessageLastByType(Message message);
	
	/**
	 * 查询@人的消息(最新)
	 * @param message
	 * @return
	 */
	public Message findMessageLastByAite(Message message);
	
	/**
	 * 查询当前用户在指定空间的消息总数(分模块)
	 * @param message
	 * @return
	 */
	public int findMessageCountByType(Message message);
	
	/**
	 * 查询@人的消息总数
	 * @param message
	 * @return
	 */
	public int findMessageCountByAite(Message message);
	
	/**
	 * 标记当前用户消息列表已读(分模块)
	 * @param message
	 * @return
	 */
	public int updateReadStatusByType(Message message);
	
	/**
	 * 标记@我的消息列表已读
	 * @param message
	 * @return
	 */
	public int updateReadStatusByAite(Message message);

}
