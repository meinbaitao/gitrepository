package com.bt.surfond.message.service;

import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.restlet.engine.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.bookmark.entity.Bookmark;
import com.bt.surfond.bookmark.service.BookmarkService;
import com.bt.surfond.comment.entity.Comment;
import com.bt.surfond.common.utils.push.PushMessage;
import com.bt.surfond.common.utils.push.PushUtils;
import com.bt.surfond.conversation.entity.Conversation;
import com.bt.surfond.message.common.Constants;
import com.bt.surfond.message.dao.MessageDao;
import com.bt.surfond.message.entity.Message;
import com.bt.surfond.push.entity.PushMapping;
import com.bt.surfond.push.service.PushMappingService;
import com.bt.surfond.task.entity.ProjectTask;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 消息service
 * @author dyl
 * @version 2016-02-24
 *
 */
@Service
@Transactional(readOnly = true)
public class MessageService extends CrudService<MessageDao, Message> {
	
	@Autowired
	private BookmarkService bookmarkService;
	
	@Autowired
	private PushMappingService pushMappingService;
	
	/**
	 * 插入用户订阅记录
	 * @param userId
	 * @param code
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveMessageSubscription(String userId, String code){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", IdGen.uuid());
		paramMap.put("userId", userId);
		paramMap.put("code", code);
		return dao.saveMessageSubscription(paramMap);
	}
	
	/**
	 * 查询用户订阅记录
	 * @param userId
	 * @param code
	 * @return
	 */
	public Map<String, Object> findMessageSubscription(String userId, String code){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("userId", userId);
		paramMap.put("code", code);
		return dao.findMessageSubscription(paramMap);
	}
	
	/**
	 * 删除用户订阅记录
	 * @param userId
	 * @param code
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteMessageSubscription(String userId, String code){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("userId", userId);
		paramMap.put("code", code);
		return dao.deleteMessageSubscription(paramMap);
	}
	
	/**
	 * 用户消息订阅
	 * @param userId
	 * @param code
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveUserSubscription(String userId, String code){
		Map<String, Object> paramMap = this.findMessageSubscription(userId, code);
		if(null == paramMap){
			return this.saveMessageSubscription(userId, code);
		}else{
			return this.deleteMessageSubscription(userId, code);
		}
	}
	
	/**
	 * 用户订阅全部
	 * @param userId
	 */
	@Transactional(readOnly = false)
	public void saveUserAllSubscription(String userId){
		 saveUserSubscription(userId, Constants.TASK_OWNER_CHANGE);//任务负责人改变
		 saveUserSubscription(userId, Constants.TASK_DUEDATE_CHANGE);//任务截止日期改变
		 saveUserSubscription(userId, Constants.TASK_DELETE_OPERATE);//任务被删除
		 saveUserSubscription(userId, Constants.TASK_OTHER_OPERATE);//任务其它详情改变
		 saveUserSubscription(userId, Constants.PROJECT_NEW_MEMBER);//新成员
		 saveUserSubscription(userId, Constants.PROJECT_DELETE_OPERATE);//项目被删除
		 saveUserSubscription(userId, Constants.CONVERSATION_CREATE_OPERATE);//新话题
		 saveUserSubscription(userId, Constants.CONVERSATION_NEW_COMMENT);//新评论
	}
	
	/**
	 * 查询用户订阅记录列表
	 * @param userId
	 * @return
	 */
	public List<Map<String, Object>> findMessageSubscriptionList(String userId){
		return dao.findMessageSubscriptionList(userId);
	}
	
	/**
	 * 查询当前用户在指定空间的消息列表
	 * @param message
	 * @return
	 */
	public List<Message> findMessageList(Message message){
		message.setPushUserId(UserUtils.getUser().getId());
		return dao.findMessageList(message);
	}
	
	/**
	 * 查询当前用户未读消息总数
	 * @param message
	 * @return
	 */
	public int findUnReadMessageCount(Message message){
		message.setPushUserId(UserUtils.getUser().getId());
		message.setReadStatus(Message.READ_STATUS_NO);
		return dao.findUnReadMessageCount(message);
	}
	
	/**
	 * 将当前用户在指定空间下的消息设置为已读
	 * @param message
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateReadStatusBySpaceId(Message message){
		message.setPushUserId(UserUtils.getUser().getId());
		message.setReadStatus(Message.READ_STATUS_YES);
		return dao.updateReadStatusBySpaceId(message);
	}
	
	/**
	 * 根据编号将消息标记为已读
	 * @param message
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateReadStatusById(Message message){
		message.setReadStatus(Message.READ_STATUS_YES);
		return dao.updateReadStatusById(message);
	}
	
	/**
	 * 查询当前用户在指定空间的消息列表(分模块)
	 * @param message
	 * @return
	 */
	public List<Message> findMessageListByType(Message message){
		message.setPushUserId(UserUtils.getUser().getId());
		return dao.findMessageListByType(message);
	}
	
	/**
	 * 查询@人的消息列表
	 * @param message
	 * @return
	 */
	public List<Message> findMessageListByAite(Message message){
		message.setPushUserId(UserUtils.getUser().getId());
		return dao.findMessageListByAite(message);
	}
	
	/**
	 * 查询消息列表(分类)(专供app使用)
	 * @param message
	 * @return
	 */
	public List<Message> findMessageListByTB(Message message){
		List<Message> messageList = null;
		if(Message.PUSH_CONVERSATION.equals(message.getType())){//话题相关
			message.setMsgType(Message.MESSAGE_TYPE_CONV);
			messageList = this.findMessageListByType(message);
		}else if(Message.PUSH_TASK.equals(message.getType())){//任务相关
			message.setMsgType(Message.MESSAGE_TYPE_TASK);
			messageList = this.findMessageListByType(message);
		}else if(Message.PUSH_AITE.equals(message.getType())){//@到我的,我是大王
			message.setMsgType(Message.MESSAGE_TYPE_CONV);
			message.setOtherMsgType(Message.MESSAGE_TYPE_TASK);
			messageList = this.findMessageListByAite(message);
		}
		if(null != messageList){
			for(Message m : messageList){
				m.setContent(replaceContent(m.getContent()));
			}
		}
		return messageList;
	}
	
	/**
	 * 查询当前用户在指定空间的消息(最新)(分模块)
	 * @param message
	 * @return
	 */
	public Message findMessageLastByType(Message message){
		message.setPushUserId(UserUtils.getUser().getId());
		return dao.findMessageLastByType(message);
	}
	
	/**
	 * 查询@人的消息(最新)
	 * @param message
	 * @return
	 */
	public Message findMessageLastByAite(Message message){
		message.setPushUserId(UserUtils.getUser().getId());
		return dao.findMessageLastByAite(message);
	}
	
	/**
	 * 查询消息列表(最新)(专供app使用)
	 * @param message
	 * @return
	 */
	public Map<String, Message> findMessageLastByTB(Message message){
		message.setReadStatus(Message.READ_STATUS_NO);
		Map<String, Message> messageMap = new HashMap<String, Message>();
		message.setMsgType(Message.MESSAGE_TYPE_CONV);
		Message conv_message = this.findMessageLastByType(message);
		if(null != conv_message){
			conv_message.setContent(replaceContent(conv_message.getContent()));
			conv_message.setUnReadCount(String.valueOf(this.findMessageCountByType(message)));
			messageMap.put("conv", conv_message);
		}
		
		message.setMsgType(Message.MESSAGE_TYPE_TASK);
		Message task_message = this.findMessageLastByType(message);
		if(null != task_message){
			task_message.setContent(replaceContent(task_message.getContent()));
			task_message.setUnReadCount(String.valueOf(this.findMessageCountByType(message)));
			messageMap.put("task", task_message);
		}
		
		message.setMsgType(Message.MESSAGE_TYPE_CONV);
		message.setOtherMsgType(Message.MESSAGE_TYPE_TASK);
		Message aite_message = this.findMessageLastByAite(message);
		if(null != aite_message){
			aite_message.setContent(replaceContent(aite_message.getContent()));
			aite_message.setUnReadCount(String.valueOf(this.findMessageCountByAite(message)));
			messageMap.put("aite", aite_message);
		}
		return messageMap;
	}
	
	/**
	 * 查询当前用户在指定空间的消息总数(分模块)
	 * @param message
	 * @return
	 */
	public int findMessageCountByType(Message message){
		message.setPushUserId(UserUtils.getUser().getId());
		return dao.findMessageCountByType(message);
	}
	
	/**
	 * 查询@人的消息总数
	 * @param message
	 * @return
	 */
	public int findMessageCountByAite(Message message){
		message.setPushUserId(UserUtils.getUser().getId());
		return dao.findMessageCountByAite(message);
	}
	
	/**
	 * 查询当前用户的未读消息总数(分类)(专供app使用)
	 * @param message
	 * @return
	 */
	public Map<String, Integer> findMessageCountByTB(Message message){
		message.setReadStatus(Message.READ_STATUS_NO);
		Map<String, Integer> messageMap = new HashMap<String, Integer>();
		message.setMsgType(Message.MESSAGE_TYPE_CONV);
		int conv_count = this.findMessageCountByType(message);
		messageMap.put("conv", conv_count);
		
		message.setMsgType(Message.MESSAGE_TYPE_TASK);
		int task_count = this.findMessageCountByType(message);
		messageMap.put("task", task_count);
		
		message.setMsgType(Message.MESSAGE_TYPE_CONV);
		message.setOtherMsgType(Message.MESSAGE_TYPE_TASK);
		int aite_count = this.findMessageCountByAite(message);
		messageMap.put("aite", aite_count);
		return messageMap;
	}
	
	/**
	 * 标记当前用户消息列表已读(分模块)
	 * @param message
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateReadStatusByType(Message message){
		message.setPushUserId(UserUtils.getUser().getId());
		return dao.updateReadStatusByType(message);
	}
	
	/**
	 * 标记@我的消息列表已读
	 * @param message
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateReadStatusByAite(Message message){
		message.setPushUserId(UserUtils.getUser().getId());
		return dao.updateReadStatusByAite(message);
	}
	
	/**
	 * 标记消息列表已读(分类)(专供app使用)
	 * @param message
	 */
	@Transactional(readOnly = false)
	public void updateReadStatusByTB(Message message){
		message.setReadStatus(Message.READ_STATUS_YES);
		if(Message.PUSH_CONVERSATION.equals(message.getType())){//话题相关
			message.setMsgType(Message.MESSAGE_TYPE_CONV);
			this.updateReadStatusByType(message);
		}else if(Message.PUSH_TASK.equals(message.getType())){//任务相关
			message.setMsgType(Message.MESSAGE_TYPE_TASK);
			this.updateReadStatusByType(message);
		}else if(Message.PUSH_AITE.equals(message.getType())){//@到我的,我是大王
			message.setMsgType(Message.MESSAGE_TYPE_CONV);
			message.setOtherMsgType(Message.MESSAGE_TYPE_TASK);
			this.updateReadStatusByAite(message);
		}
	}
	
	/**
	 * 获取收藏人
	 * @param pushUserIdSet
	 * @param resourceId
	 */
	public void getBookmarkUser(Set<String> pushUserIdSet, String resourceId){
		Bookmark bookmark = new Bookmark();
		bookmark.setResourceId(resourceId);
		List<Bookmark> bookmarkUserList = bookmarkService.findBookmarkUser(bookmark);
		if(null != bookmarkUserList){
			for(Bookmark b : bookmarkUserList){
				if(null != b && null != b.getCreateBy()){
					pushUserIdSet.add(b.getCreateBy().getId());
				}
			}
		}
	}
	
	/**
	 * 获取成员列表
	 * @param pushUserIdSet
	 * @param memberList
	 */
	public void getMemberList(Set<String> pushUserIdSet, List<Map<String, Object>> memberList){
		if(null != memberList){
			for(Map<String, Object> member : memberList){
				pushUserIdSet.add(member.get("id").toString());
			}
		}
	}
	
	/**
	 * 获取成员列表
	 * @param pushUserIdSet
	 * @param metionmember
	 */
	public void getUserSet(Set<String> pushUserIdSet, String metionmember){
		if(StringUtils.isNotBlank(metionmember)){
			String[] aiteUserIds = metionmember.split(";");
			for(int i = 0; null != aiteUserIds && i < aiteUserIds.length; i++){
				pushUserIdSet.add(aiteUserIds[i]);
			}
		}
	}
	
	/**
	 * 修改任务负责人时往消息表插入消息
	 * @param beforeTask
	 * @param afterTask
	 */
	@Transactional(readOnly = false)
	public void addMessageForUpdateTaskOwner(ProjectTask beforeTask, ProjectTask afterTask){
		if(null != beforeTask && null != afterTask){
			Message message = new Message();
			message.setRecordId(beforeTask.getId());
			message.setSubsType(Constants.TASK_OWNER_CHANGE);
			message.setMsgType(Message.MESSAGE_TYPE_TASK);
			message.setReadStatus(Message.READ_STATUS_NO);
			message.setSpaceId(afterTask.getSpaceId());
			
			Set<String> pushUserIdSet = new HashSet<String>();
			if(null != beforeTask.getCreateBy()){
				pushUserIdSet.add(beforeTask.getCreateBy().getId());//任务创建人
			}
			if(null != beforeTask.getUser()){
				pushUserIdSet.add(beforeTask.getUser().getId());//任务负责人（之前）
			}
			if(null != afterTask.getUser()){
				pushUserIdSet.add(afterTask.getUser().getId());//任务负责人（之后）
			}
			pushUserIdSet.add(beforeTask.getProjectOwnerId());//任务所属项目负责人
			getBookmarkUser(pushUserIdSet, beforeTask.getProjectId());//任务所属项目收藏人
			
			String content = "";
			String spaceId = afterTask.getSpaceId();
			String projectId = beforeTask.getProjectId();
			String taskId = beforeTask.getId();
			String taskTitle = beforeTask.getTitle();
			String beforeOwnerId = "";
			String beforeOwnerName = "";
			if(null != beforeTask.getUser() && StringUtils.isNotBlank(beforeTask.getUser().getId())){
				beforeOwnerId = beforeTask.getUser().getId();
				beforeOwnerName = beforeTask.getUser().getName();
			}
			String afterOwnerId = "";
			String afterOwnerName = "";
			if(null != afterTask.getUser() && StringUtils.isNotBlank(afterTask.getUser().getId())){
				afterOwnerId = afterTask.getUser().getId();
				afterOwnerName = UserUtils.get(afterOwnerId).getName();
			}
			String operatorId = UserUtils.getUser().getId();
			String operatorName = UserUtils.getUser().getName();
			String operatorTime = DateUtils.format(new Date(), "yyyy-MM-dd");
			
			message.setIsNewRecord(true);
			message.preInsert();
			
			for(String pushUserId : pushUserIdSet){
				if(StringUtils.isNotBlank(pushUserId) && !pushUserId.equals(UserUtils.getUser().getId())){
					String showBeforeOwnerName = beforeOwnerName;
					if(pushUserId.equals(beforeOwnerId)){
						showBeforeOwnerName = "你";
					}
					String showAfterOwnerName = afterOwnerName;
					if(pushUserId.equals(afterOwnerId)){
						showAfterOwnerName = "你";
					}
					if(StringUtils.isBlank(beforeOwnerId)){
						if(StringUtils.isBlank(afterOwnerId)){
							return;
						}else{
							content = MessageFormat.format("任务{0}的负责人被指定为{1}，操作人{2}，操作时间{3}。", 
									"<a href='javascript:void(0);' class='tasktitle' space-id='" + spaceId + "' project-id='" + projectId + "' task-id='" + taskId + "'>" + taskTitle + "</a>",
									"<a href='javascript:void(0);' class='afterownername' afterowner-id='" + afterOwnerId + "'>" + showAfterOwnerName + "</a>",
									"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
									operatorTime);
						}
					}else{
						if(StringUtils.isBlank(afterOwnerId)){
							content = MessageFormat.format("任务{0}的负责人由{1}更改为无负责人，操作人{2}，操作时间{3}。", 
									"<a href='javascript:void(0);' class='tasktitle' space-id='" + spaceId + "' project-id='" + projectId + "' task-id='" + taskId + "'>" + taskTitle + "</a>",
									"<a href='javascript:void(0);' class='beforeownername' beforeowner-id='" + beforeOwnerId + "'>" + showBeforeOwnerName + "</a>",
									"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
									operatorTime);
						}else{
							content = MessageFormat.format("任务{0}的负责人由{1}更改为{2}，操作人{3}，操作时间{4}。", 
									"<a href='javascript:void(0);' class='tasktitle' space-id='" + spaceId + "' project-id='" + projectId + "' task-id='" + taskId + "'>" + taskTitle + "</a>",
									"<a href='javascript:void(0);' class='beforeownername' beforeowner-id='" + beforeOwnerId + "'>" + showBeforeOwnerName + "</a>",
									"<a href='javascript:void(0);' class='afterownername' afterowner-id='" + afterOwnerId + "'>" + showAfterOwnerName + "</a>",
									"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
									operatorTime);
						}
					}
					message.setContent(content);
					message.setId(IdGen.uuid());
					message.setPushUserId(pushUserId);
					dao.insert(message);
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_TASK, message.getSubsType());//手机推送
				}
			}
		}
	}
	
	/**
	 * 改变任务的截止日期时往消息表插入消息
	 * @param beforeTask
	 * @param afterTask
	 */
	@Transactional(readOnly = false)
	public void addMessageForUpdateTaskDueDate(ProjectTask beforeTask, ProjectTask afterTask) {
		if(null != beforeTask && null != afterTask){
			Message message = new Message();
			message.setRecordId(beforeTask.getId());
			message.setSubsType(Constants.TASK_DUEDATE_CHANGE);
			message.setMsgType(Message.MESSAGE_TYPE_TASK);
			message.setReadStatus(Message.READ_STATUS_NO);
			message.setSpaceId(afterTask.getSpaceId());
			
			Set<String> pushUserIdSet = new HashSet<String>();
			if(null != beforeTask.getCreateBy()){
				pushUserIdSet.add(beforeTask.getCreateBy().getId());//任务创建人
			}
			if(null != beforeTask.getUser()){
				pushUserIdSet.add(beforeTask.getUser().getId());//任务负责人
			}
			pushUserIdSet.add(beforeTask.getProjectOwnerId());//任务所属项目负责人
			getBookmarkUser(pushUserIdSet, beforeTask.getProjectId());//任务所属项目收藏人
			
			String content = "";
			String spaceId = afterTask.getSpaceId();
			String projectId = beforeTask.getProjectId();
			String taskId = beforeTask.getId();
			String taskTitle = beforeTask.getTitle();
			String beforeDueDate = beforeTask.getDueDate();
			String afterDueDate = afterTask.getDueDate();
			String operatorId = UserUtils.getUser().getId();
			String operatorName = UserUtils.getUser().getName();
			String operatorTime = DateUtils.format(new Date(), "yyyy-MM-dd");
			if(StringUtils.isBlank(beforeDueDate)){
				if(StringUtils.isBlank(afterDueDate)){
					return;
				}else{
					content = MessageFormat.format("任务{0}的截止时间被指定为{1}，操作人{2}，操作时间{3}。", 
							"<a href='javascript:void(0);' class='tasktitle' space-id='" + spaceId + "' project-id='" + projectId + "' task-id='" + taskId + "'>" + taskTitle + "</a>",
							afterDueDate,
							"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
							operatorTime);
				}
			}else{
				if(StringUtils.isBlank(afterDueDate)){
					content = MessageFormat.format("任务{0}的截止时间由{1}更改为无截止日期，操作人{2}，操作时间{3}。", 
							"<a href='javascript:void(0);' class='tasktitle' space-id='" + spaceId + "' project-id='" + projectId + "' task-id='" + taskId + "'>" + taskTitle + "</a>",
							beforeDueDate,
							"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
							operatorTime);
				}else{
					content = MessageFormat.format("任务{0}的截止时间由{1}更改为{2}，操作人{3}，操作时间{4}。", 
							"<a href='javascript:void(0);' class='tasktitle' space-id='" + spaceId + "' project-id='" + projectId + "' task-id='" + taskId + "'>" + taskTitle + "</a>",
							beforeDueDate,
							afterDueDate,
							"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
							operatorTime);
				}
			}
			
			message.setContent(content);
			message.setIsNewRecord(true);
			message.preInsert();
			
			for(String pushUserId : pushUserIdSet){
				if(StringUtils.isNotBlank(pushUserId) && !pushUserId.equals(UserUtils.getUser().getId())){
					message.setId(IdGen.uuid());
					message.setPushUserId(pushUserId);
					dao.insert(message);
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_TASK, message.getSubsType());//手机推送
				}
			}
		}
	}
	
	/**
	 * 删除任务时往消息表插入消息
	 * @param beforeTask
	 * @param afterTask
	 */
	@Transactional(readOnly = false)
	public void addMessageForDeleteTask(ProjectTask beforeTask, ProjectTask afterTask){
		if(null != beforeTask && null != afterTask){
			Message message = new Message();
			message.setRecordId(beforeTask.getId());
			message.setSubsType(Constants.TASK_DELETE_OPERATE); 
			message.setMsgType(Message.MESSAGE_TYPE_TASK);
			message.setReadStatus(Message.READ_STATUS_NO);
			message.setSpaceId(afterTask.getSpaceId());
			
			Set<String> pushUserIdSet = new HashSet<String>();
			if(null != beforeTask.getCreateBy()){
				pushUserIdSet.add(beforeTask.getCreateBy().getId());//任务创建人
			}
			if(null != beforeTask.getUser()){
				pushUserIdSet.add(beforeTask.getUser().getId());//任务负责人
			}
			pushUserIdSet.add(beforeTask.getProjectCreateById());//任务所属项目创建人
			pushUserIdSet.add(beforeTask.getProjectOwnerId());//任务所属项目负责人
			getBookmarkUser(pushUserIdSet, beforeTask.getProjectId());//任务所属项目收藏人
			
			String content = "";
			String spaceId = afterTask.getSpaceId();
			String projectId = beforeTask.getProjectId();
			String taskId = beforeTask.getId();
			String taskTitle = beforeTask.getTitle();
			String operatorId = UserUtils.getUser().getId();
			String operatorName = UserUtils.getUser().getName();
			String operatorTime = DateUtils.format(new Date(), "yyyy-MM-dd");
			content = MessageFormat.format("任务{0}被删除了，操作人{1}，操作时间{2}。", 
					"<a href='javascript:void(0);' class='tasktitle' space-id='" + spaceId + "' project-id='" + projectId + "' task-id='" + taskId + "'>" + taskTitle + "</a>",
					"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
					operatorTime);
			
			message.setContent(content);
			message.setIsNewRecord(true);
			message.preInsert();
			
			for(String pushUserId : pushUserIdSet){
				if(StringUtils.isNotBlank(pushUserId) && !pushUserId.equals(UserUtils.getUser().getId())){
					message.setId(IdGen.uuid());
					message.setPushUserId(pushUserId);
					dao.insert(message);
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_TASK, message.getSubsType());//手机推送
				}
			}
		}
	}
	
	/**
	 * 创建任务@人时往消息表插入消息
	 * @param task
	 */
	@Transactional(readOnly = false)
	public void addMessageForCreateTaskAite(ProjectTask afterTask){
		if(null != afterTask && null != afterTask.getUser() && afterTask.isAite()){
			Message message = new Message();
			message.setRecordId(afterTask.getId());
			message.setSubsType(Constants.ME_IS_KING);
			message.setMsgType(Message.MESSAGE_TYPE_TASK);
			message.setReadStatus(Message.READ_STATUS_NO);
			message.setSpaceId(afterTask.getSpaceId());
			
			Set<String> pushUserIdSet = new HashSet<String>();
			pushUserIdSet.add(afterTask.getUser().getId());//创建任务时@的人
			
			String content = "";
			String spaceId = afterTask.getSpaceId();
			String projectId = afterTask.getProjectId();
			String taskId = afterTask.getId();
			String taskTitle = afterTask.getTitle();
			String aiteUserId = afterTask.getUser().getId();
			String aiteUserName = afterTask.getUser().getName();
			String operatorId = UserUtils.getUser().getId();
			String operatorName = UserUtils.getUser().getName();
			String operatorTime = DateUtils.format(new Date(), "yyyy-MM-dd");
			
			message.setIsNewRecord(true);
			message.preInsert();
			
			for(String pushUserId : pushUserIdSet){
				if(StringUtils.isNotBlank(pushUserId) && !pushUserId.equals(UserUtils.getUser().getId())){
					String showAiteUserName = aiteUserName;
					if(pushUserId.equals(aiteUserId)){
						showAiteUserName = "你";
					}
					content = MessageFormat.format("任务{0}提到了{1}，并将任务负责人指定为{2}，操作人{3}，操作时间{4}。", 
							"<a href='javascript:void(0);' class='tasktitle' space-id='" + spaceId + "' project-id='" + projectId + "' task-id='" + taskId + "'>" + taskTitle + "</a>",
							"<a href='javascript:void(0);' class='aiteusername' aiteuser-id='" + aiteUserId + "'>" + showAiteUserName + "</a>",
							"<a href='javascript:void(0);' class='aiteusername' aiteuser-id='" + aiteUserId + "'>" + showAiteUserName + "</a>",
							"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
							operatorTime);
					message.setContent(content);
					message.setId(IdGen.uuid());
					message.setPushUserId(pushUserId);
					dao.insert(message);
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_TASK, message.getSubsType());//手机推送
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_AITE, message.getSubsType());//手机推送
				}
			}
		}
	}
	
	/**
	 * 改变任务状态（完成/未完成）时往消息表插入消息
	 * @param beforeTask
	 * @param afterTask
	 */
	@Transactional(readOnly = false)
	public void addMessageForUpdateTaskStatus(ProjectTask beforeTask, ProjectTask afterTask){
		if(null != beforeTask && null != afterTask){
			Message message = new Message();
			message.setRecordId(beforeTask.getId());
			message.setSubsType(Constants.TASK_OTHER_OPERATE);
			message.setMsgType(Message.MESSAGE_TYPE_TASK);
			message.setReadStatus(Message.READ_STATUS_NO);
			message.setSpaceId(afterTask.getSpaceId());
			
			Set<String> pushUserIdSet = new HashSet<String>();
			if(null != beforeTask.getCreateBy()){
				pushUserIdSet.add(beforeTask.getCreateBy().getId());//任务创建人
			}
			if(null != beforeTask.getUser()){
				pushUserIdSet.add(beforeTask.getUser().getId());//任务负责人
			}
			pushUserIdSet.add(beforeTask.getProjectCreateById());//任务所属项目创建人
			pushUserIdSet.add(beforeTask.getProjectOwnerId());//任务所属项目负责人
			getBookmarkUser(pushUserIdSet, beforeTask.getProjectId());//任务所属项目收藏人
			
			String content = "";
			String spaceId = afterTask.getSpaceId();
			String projectId = beforeTask.getProjectId();
			String taskId = beforeTask.getId();
			String taskTitle = beforeTask.getTitle();
			String operatorId = UserUtils.getUser().getId();
			String operatorName = UserUtils.getUser().getName();
			String operatorTime = DateUtils.format(new Date(), "yyyy-MM-dd");
			if(ProjectTask.STATUS_TASK_DONE.equals(afterTask.getStatus())){
				content = MessageFormat.format("任务{0}已经完成了，操作人{1}，操作时间{2}。", 
						"<a href='javascript:void(0);' class='tasktitle' space-id='" + spaceId + "' project-id='" + projectId + "' task-id='" + taskId + "'>" + taskTitle + "</a>",
						"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
						operatorTime);
			}else{
				content = MessageFormat.format("任务{0}被取消完成了，操作人{1}，操作时间{2}。", 
						"<a href='javascript:void(0);' class='tasktitle' space-id='" + spaceId + "' project-id='" + projectId + "' task-id='" + taskId + "'>" + taskTitle + "</a>",
						"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
						operatorTime);
			}
			
			message.setContent(content);
			message.setIsNewRecord(true);
			message.preInsert();
			
			for(String pushUserId : pushUserIdSet){
				if(StringUtils.isNotBlank(pushUserId) && !pushUserId.equals(UserUtils.getUser().getId())){
					message.setId(IdGen.uuid());
					message.setPushUserId(pushUserId);
					dao.insert(message);
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_TASK, message.getSubsType());//手机推送
				}
			}
		}
	}
	
	/**
	 * 创建话题时往消息表插入消息
	 * @param conversation
	 * @param spaceMemberList
	 */
	@Transactional(readOnly = false)
	public void addMessageForCreateConversation(Conversation conversation, List<Map<String, Object>> spaceMemberList){
		if(null != conversation){
			Message message = new Message();
			message.setRecordId(conversation.getId());
			message.setSubsType(Constants.CONVERSATION_CREATE_OPERATE);
			message.setMsgType(Message.MESSAGE_TYPE_CONV);
			message.setReadStatus(Message.READ_STATUS_NO);
			message.setSpaceId(conversation.getSpaceId());
			
			Set<String> pushUserIdSet = new HashSet<String>();
			getMemberList(pushUserIdSet, spaceMemberList);//空间所有成员
			
			String content = "";
			String spaceId = conversation.getSpaceId();
			String conversationId = conversation.getId();
			String conversationTitle = conversation.getTitle();
			String operatorId = UserUtils.getUser().getId();
			String operatorName = UserUtils.getUser().getName();
			String operatorTime = DateUtils.format(new Date(), "yyyy-MM-dd");
			content = MessageFormat.format("新的话题{0}被创建了，操作人{1}，操作时间{2}。", 
					"<a href='javascript:void(0);' class='conversationtitle' space-id='" + spaceId + "' conversation-id='" + conversationId + "'>" + conversationTitle + "</a>",
					"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
					operatorTime);
			
			message.setContent(content);
			message.setIsNewRecord(true);
			message.preInsert();
			
			for(String pushUserId : pushUserIdSet){
				if(StringUtils.isNotBlank(pushUserId) && !pushUserId.equals(UserUtils.getUser().getId())){
					message.setId(IdGen.uuid());
					message.setPushUserId(pushUserId);
					dao.insert(message);
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_CONVERSATION, message.getSubsType());//手机推送
				}
			}
		}
	}
	
	/**
	 * 创建话题@人时往消息表插入消息
	 * @param conversation
	 */
	@Transactional(readOnly = false)
	public void addMessageForCreateConversationAite(Conversation conversation){
		if(null != conversation){
			Message message = new Message();
			message.setRecordId(conversation.getId());
			message.setSubsType(Constants.ME_IS_KING);
			message.setMsgType(Message.MESSAGE_TYPE_CONV);
			message.setReadStatus(Message.READ_STATUS_NO);
			message.setSpaceId(conversation.getSpaceId());
			
			Set<String> pushUserIdSet = new HashSet<String>();
			getUserSet(pushUserIdSet, conversation.getMetionmember());
			
			String content = "";
			String spaceId = conversation.getSpaceId();
			String conversationId = conversation.getId();
			String conversationTitle = conversation.getTitle();
			String operatorId = UserUtils.getUser().getId();
			String operatorName = UserUtils.getUser().getName();
			String operatorTime = DateUtils.format(new Date(), "yyyy-MM-dd");
			
			message.setIsNewRecord(true);
			message.preInsert();
			
			for(String pushUserId : pushUserIdSet){
				if(StringUtils.isNotBlank(pushUserId) && !pushUserId.equals(UserUtils.getUser().getId())){
					content = MessageFormat.format("话题{0}提到了{1}，操作人{2}，操作时间{3}。", 
							"<a href='javascript:void(0);' class='conversationtitle' space-id='" + spaceId + "' conversation-id='" + conversationId + "'>" + conversationTitle + "</a>",
							"<a href='javascript:void(0);' class='aiteusername' aiteuser-id='" + pushUserId + "'>" + "你" + "</a>",
							"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
							operatorTime);
					message.setContent(content);
					message.setId(IdGen.uuid());
					message.setPushUserId(pushUserId);
					dao.insert(message);
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_CONVERSATION, message.getSubsType());//手机推送
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_AITE, message.getSubsType());//手机推送
				}
			}
		}
	}
	
	/**
	 * 添加话题评论时往消息表插入消息
	 * @param comment
	 * @param participantList
	 */
	@Transactional(readOnly = false)
	public void addMessageForCreateConversationComment(Comment comment, List<Comment> participantList){
		if(null != comment && null != comment.getConversation() && com.bt.surfond.common.Constants.CONV.equals(comment.getType())){
			Message message = new Message();
			message.setRecordId(comment.getConversation().getId());
			message.setSubsType(Constants.CONVERSATION_NEW_COMMENT);
			message.setMsgType(Message.MESSAGE_TYPE_CONV);
			message.setReadStatus(Message.READ_STATUS_NO);
			message.setSpaceId(comment.getSpaceId());
			
			Set<String> pushUserIdSet = new HashSet<String>();
			if(null != comment.getConversation().getCreateBy()){
				pushUserIdSet.add(comment.getConversation().getCreateBy().getId());//评论所属话题创建人
			}
			getBookmarkUser(pushUserIdSet, comment.getConversation().getId());//评论所属话题收藏人
			if(null != participantList){
				for(Comment c : participantList){
					if(null != c && null !=  c.getCreateBy()){
						pushUserIdSet.add(c.getCreateBy().getId());
					}
				}
			}
			
			String content = "";
			String spaceId = comment.getSpaceId();
			String conversationId = comment.getConversation().getId();
			String conversationTitle = comment.getConversation().getTitle();
			String commentId = comment.getId();
			String commentDescription = comment.getDescription();
			String operatorId = UserUtils.getUser().getId();
			String operatorName = UserUtils.getUser().getName();
			String operatorTime = DateUtils.format(new Date(), "yyyy-MM-dd");
			content = MessageFormat.format("话题{0}有新的评论{1}，操作人{2}，操作时间{3}。", 
					"<a href='javascript:void(0);' class='conversationtitle' space-id='" + spaceId + "' conversation-id='" + conversationId + "'>" + conversationTitle + "</a>",
					"<a href='javascript:void(0);' class='commentdescription' comment-id='" + commentId + "'>" + commentDescription + "</a>",
					"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
					operatorTime);
			
			message.setContent(content);
			message.setIsNewRecord(true);
			message.preInsert();
			
			for(String pushUserId : pushUserIdSet){
				if(StringUtils.isNotBlank(pushUserId) && !pushUserId.equals(UserUtils.getUser().getId())){
					message.setId(IdGen.uuid());
					message.setPushUserId(pushUserId);
					dao.insert(message);
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_CONVERSATION, message.getSubsType());//手机推送
				}
			}
		}
	}
	
	/**
	 * 话题评论@人时往消息表插入消息
	 * @param comment
	 */
	@Transactional(readOnly = false)
	public void addMessageForCreateConversationCommentAite(Comment comment){
		if(null != comment && null != comment.getConversation() && com.bt.surfond.common.Constants.CONV.equals(comment.getType())){
			Message message = new Message();
			message.setRecordId(comment.getConversation().getId());
			message.setSubsType(Constants.ME_IS_KING);
			message.setMsgType(Message.MESSAGE_TYPE_CONV);
			message.setReadStatus(Message.READ_STATUS_NO);
			message.setSpaceId(comment.getSpaceId());
			
			Set<String> pushUserIdSet = new HashSet<String>();
			getUserSet(pushUserIdSet, comment.getMetionmember());
			
			String content = "";
			String spaceId = comment.getSpaceId();
			String conversationId = comment.getConversation().getId();
			String conversationTitle = comment.getConversation().getTitle();
			String commentId = comment.getId();
			String commentDescription = comment.getDescription();
			String operatorId = UserUtils.getUser().getId();
			String operatorName = UserUtils.getUser().getName();
			String operatorTime = DateUtils.format(new Date(), "yyyy-MM-dd");
			
			message.setIsNewRecord(true);
			message.preInsert();
			
			for(String pushUserId : pushUserIdSet){
				if(StringUtils.isNotBlank(pushUserId) && !pushUserId.equals(UserUtils.getUser().getId())){
					content = MessageFormat.format("话题{0}的评论{1}提到了{2}，操作人{3}，操作时间{4}。", 
							"<a href='javascript:void(0);' class='conversationtitle' space-id='" + spaceId + "' conversation-id='" + conversationId + "'>" + conversationTitle + "</a>",
							"<a href='javascript:void(0);' class='commentdescription' comment-id='" + commentId + "'>" + commentDescription + "</a>",
							"<a href='javascript:void(0);' class='aiteusername' aiteuser-id='" + pushUserId + "'>" + "你" + "</a>",
							"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
							operatorTime);
					message.setContent(content);
					message.setId(IdGen.uuid());
					message.setPushUserId(pushUserId);
					dao.insert(message);
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_CONVERSATION, message.getSubsType());//手机推送
					this.sendPushFinally(message.getId(), pushUserId, content, Message.PUSH_AITE, message.getSubsType());//手机推送
				}
			}
		}
	}
	
	/**
	 * 删除项目时往消息表插入消息
	 * @param beforeProject
	 * @param afterProject
	 * @param projectMemberList
	 */
	@Transactional(readOnly = false)
	public void addMessageForDeleteProject(ProjectTask beforeProject, ProjectTask afterProject, List<Map<String, Object>> projectMemberList){
		if(null != beforeProject && null != afterProject){
			Message message = new Message();
			message.setRecordId(beforeProject.getId());
			message.setSubsType(Constants.PROJECT_DELETE_OPERATE);
			message.setMsgType(Message.MESSAGE_TYPE_PROJECT);
			message.setReadStatus(Message.READ_STATUS_NO);
			message.setSpaceId(afterProject.getSpaceId());
			
			Set<String> pushUserIdSet = new HashSet<String>();
			getMemberList(pushUserIdSet, projectMemberList);//项目所有成员
			
			String content = "";
			String spaceId = afterProject.getSpaceId();
			String projectId = beforeProject.getId();
			String projectTitle = beforeProject.getTitle();
			String operatorId = UserUtils.getUser().getId();
			String operatorName = UserUtils.getUser().getName();
			String operatorTime = DateUtils.format(new Date(), "yyyy-MM-dd");
			content = MessageFormat.format("项目{0}被删除了，操作人{1}，操作时间{2}。", 
					"<a href='javascript:void(0);' class='projecttitle' space-id='" + spaceId + "' project-id='" + projectId + "'>" + projectTitle + "</a>",
					"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
					operatorTime);
			
			message.setContent(content);
			message.setIsNewRecord(true);
			message.preInsert();
			
			for(String pushUserId : pushUserIdSet){
				if(StringUtils.isNotBlank(pushUserId) && !pushUserId.equals(UserUtils.getUser().getId())){
					message.setId(IdGen.uuid());
					message.setPushUserId(pushUserId);
					dao.insert(message);
				}
			}
		}
	}

	/**
	 * 邀请项目成员是往消息表插入记录
	 * @param opt
	 * @param project
	 * @param findProjectMemberList
	 */
	public void addMessageForInviteProjectMember(ProjectTask beforeProject, ProjectTask afterProject, List<Map<String, Object>> projectMemberList) {
		if(null != beforeProject && null != afterProject){
			Message message = new Message();
			message.setRecordId(beforeProject.getId());
			message.setSubsType(Constants.PROJECT_NEW_MEMBER);
			message.setMsgType(Message.MESSAGE_TYPE_PROJECT);
			message.setReadStatus(Message.READ_STATUS_NO);
			message.setSpaceId(afterProject.getSpaceId());
			
			Set<String> pushUserIdSet = new HashSet<String>();
			getMemberList(pushUserIdSet, projectMemberList);//项目所有成员
			
			String content = "";
			String spaceId = afterProject.getSpaceId();
			String projectId = beforeProject.getId();
			String projectTitle = beforeProject.getTitle();
			String memberId = afterProject.getUserId();
			String memberName = UserUtils.get(afterProject.getUserId()).getName();
			String operatorId = UserUtils.getUser().getId();
			String operatorName = UserUtils.getUser().getName();
			String operatorTime = DateUtils.format(new Date(), "yyyy-MM-dd");
			content = MessageFormat.format("项目{0}加入了新成员{1},操作人{2}，操作时间{3}。", 
					"<a href='javascript:void(0);' class='projecttitle' space-id='" + spaceId + "' project-id='" + projectId + "'>" + projectTitle + "</a>",
					"<a href='javascript:void(0);' class='membername' member-id='" + memberId + "'>" + memberName + "</a>",
					"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
					operatorTime);
			
			message.setIsNewRecord(true);
			message.preInsert();
			
			for(String pushUserId : pushUserIdSet){
				if(StringUtils.isNotBlank(pushUserId) && !pushUserId.equals(UserUtils.getUser().getId())){
					if(pushUserId.equals(memberId)){//被邀请的是自己,消息通知的也是最近
						String showMemberName = "你";
						content = MessageFormat.format("{0}加入了项目{1},操作人{2}，操作时间{3}。", 
								"<a href='javascript:void(0);' class='membername' member-id='" + memberId + "'>" + showMemberName + "</a>",
								"<a href='javascript:void(0);' class='projecttitle' space-id='" + spaceId + "' project-id='" + projectId + "'>" + projectTitle + "</a>",
								"<a href='javascript:void(0);' class='operatorname' operator-id='" + operatorId + "'>" + operatorName + "</a>",
								operatorTime);
					}
					message.setContent(content);
					message.setId(IdGen.uuid());
					message.setPushUserId(pushUserId);
					dao.insert(message);
				}
			}
		}
	}
	
	/**
	 * 推送
	 * @param pushUserId
	 * @param content
	 * @param pushType
	 */
	private void sendPushFinally(String id, String pushUserId, String content, String pushType, String code){
		Map<String, Object> ms = this.findMessageSubscription(pushUserId, code);
		if(Constants.ME_IS_KING.equals(code) || ms != null){
			PushMapping pushMapping = pushMappingService.findPushMappingByUserId(pushUserId);
			if(null != pushMapping){//当前登录用户存在映射,需要推送消息
				String text = "{\"id\":\"" + id + "\",\"type\":\"" + pushType + "\",\"msg\":\"" + replaceContent(content) + "\"}";
				if(PushMapping.DEVICE_TYPE_ANDROID.equals(pushMapping.getDeviceType())){
					if(StringUtils.isNotBlank(pushMapping.getAlias())){
						PushUtils.pushThrToSingle(new PushMessage(pushMapping.getAlias(), text));
					}
				}else if(PushMapping.DEVICE_TYPE_IOS.equals(pushMapping.getDeviceType())){
					if(StringUtils.isNotBlank(pushMapping.getDeviceToken())){
						PushUtils.pushToSingle(new PushMessage(pushMapping.getAlias(), null, pushMapping.getDeviceToken(), replaceContent(content), text));
					}
				}
			}
		}
	}
	
	/**
	 * 替换内容文本
	 * @param content
	 * @return
	 */
	private String replaceContent(String content){
		return content.replaceAll("\\[metion_", " ").replaceAll("_surfond_.*?\\]", " ").replaceAll("<a.*?href='.*?>", "[").replaceAll("</a>", "]");
	}
	
	
	
}
