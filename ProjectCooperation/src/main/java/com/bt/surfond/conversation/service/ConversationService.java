/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.conversation.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.common.annotation.SurfondAuthMeta;
import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.attachment.service.AttachmentService;
import com.bt.surfond.comment.service.CommentService;
import com.bt.surfond.common.Constants;
import com.bt.surfond.conversation.dao.ConversationDao;
import com.bt.surfond.conversation.entity.Conversation;
import com.bt.surfond.message.service.MessageService;
import com.bt.surfond.space.entity.Space;
import com.bt.surfond.space.service.SpaceService;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.sys.dao.UserDao;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;



/**
 * 话题信息Service
 * @author mjs
 * @version 2015-10-22
 */
@Service
@Transactional
public class ConversationService extends CrudService<ConversationDao, Conversation> {

	@Autowired
	private ConversationDao conversationDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private CommentService commentService;
	@Autowired
	private AttachmentService attService;
	@Autowired
	private SpaceService spaceService;
	@Autowired
	private MessageService messageService;
	
	@Transactional(readOnly = false)
	public void save(Conversation conversation) {
		super.save(conversation);
		messageService.addMessageForCreateConversation(conversation, spaceService.findSpaceMemberList1(new Space(conversation.getSpaceId())));
		messageService.addMessageForCreateConversationAite(conversation);
	}
	
	/**
	 * 取消会话
	 */
	@Transactional(readOnly = false)
	@SurfondAuthMeta( parameterName = "conversation", paramType = SurfondAuthMeta.ParameterType.AttrEntity)
	public void delete(Conversation conversation) {
		super.delete(conversation);
	}
	/**
	 * 根据空间/团队ID查询对话列表
	 * @param conversation
	 * @return
	 */
	public List<Conversation> findByOneSpace(Conversation conversation){
		User user = UserUtils.getUser();
		conversation.setCurrentUser(user);
		List<Conversation> list = conversationDao.findByResourceId(conversation);
		for (Conversation c : list) {
			Attachment at = new Attachment();
			at.setTaskId(c.getId());
			List<Attachment> conAtt = attService.findAttachmentByTaskId(at);
			if(null!=conAtt){
				c.setAttachment(conAtt);
			}
		}
		return list;
	}
	
	
	/**
	 * 创建会话
	 * @param conversation
	 * @return
	 */
	@Transactional(readOnly = false)
	public int addConversation(Conversation conversation){
		if (conversation.getIsNewRecord()){
			conversation.preInsert();
			return dao.insert(conversation);
		}else{
			conversation.preUpdate();
			return dao.update(conversation);
		}
	}
	/**
	 * 对会话点赞与取消点赞
	 * @param conversation
	 */
	@Transactional(readOnly = false)
	public String conversationPraise(Conversation conversation) {
		Conversation c = get(conversation);
		if(null!=c){
			String amount = "";
			JSONObject josnObj = new JSONObject();
			Map<String,Object> map = findPraiseRecord(conversation.getId());
			if(null!=map){
				int num = commentService.deletePraiseInfo(c.getId());
				if(num>0){
					if(c.getPraiseAmount()>0){
						Integer count = c.getPraiseAmount() - 1;
						amount = count.toString();
						c.setPraiseAmount(count);
						dao.conversationPraise(c);
					}
				}
				josnObj.put("optionType", Constants.CANCEL_PRAISE);
			}else{
				int bl = commentService.savePraiseInfo(c.getId(),Constants.CONVERSATION_DO_PRAISE);
				if(bl>0){
						Integer count = c.getPraiseAmount() + 1;
						amount = count.toString();
						c.setPraiseAmount(count);
						dao.conversationPraise(c);
				}
				josnObj.put("optionType", Constants.DO_PRAISE);
			}
			josnObj.put("message", "");
			josnObj.put("result", amount);
			josnObj.put("status", "1");
			return josnObj.toString();
		}
		return null;
	}
	/**
	 * 查找点赞记录是否存在
	 * @param conversation
	 * @return
	 */
	public Map<String,Object> findPraiseRecord(String id){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("recordId", id);
		map.put("userId", UserUtils.getUser().getId());
		return dao.findPraiseRecode(map);
	}
	
	/**
	 * 查找单个话题详情
	 * @param conversation
	 * @return
	 */
	public Conversation findOneConversation(Conversation conversation){
		conversation.setCurrentUser(UserUtils.getUser());
		Conversation c = conversationDao.findOneConversation(conversation);
		if(null!=c){
			Attachment at = new Attachment();
			at.setTaskId(c.getId());
			List<Attachment> conAtt = attService.findAttachmentByTaskId(at);
			if(null!=conAtt){
				c.setAttachment(conAtt);
			}
		}
		return c;
	}
	
	/**
	 * 查找热点话题
	 * @param conversation
	 * @return
	 */
	public List<Conversation> findHotConversation(Conversation conversation){
		conversation.setCommentCount(Constants.HOT_CONVERSATION_COUNT);
		return conversationDao.findHotConversation(conversation);
	}
	
	/**
	 * 查询话题最大排序值
	 * @param conversation
	 * @return
	 */
	public Conversation findConversationMaxSort(Conversation conversation){
		return conversationDao.findConversationMaxSort(conversation);
	}
	
	/**
	 * 查找点赞记录的用户
	 * @param id
	 * @return
	 */
	public List<Map<String,Object>> findPraiseMember(String id){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("id", id);
		List<Map<String,Object>> m = dao.findPraiseRecodeMembers(map);
		return m;
	}
	
}