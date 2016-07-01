package com.bt.surfond.message.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.message.common.Constants;
import com.bt.surfond.message.entity.Message;
import com.bt.surfond.message.service.MessageService;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 消息controller
 * @author dyl
 * @version 2016-02-24
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/message")
public class MessageController extends BaseController {

	@Autowired
	private MessageService messageService;
	
	/**
	 * 订阅类型集合
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findsubscription")
	public Map<String, Object> findSubscription(){
		Map<String, Object> resultMap = Constants.subscriptionMap;
		resultMap.put("userSubscriptionList", messageService.findMessageSubscriptionList(UserUtils.getUser().getId()));
		return JsonUtils.jsonStringTo(resultMap);
	}
	
	/**
	 * 用户消息订阅
	 * @param message
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "saveusersubscription")
	public Map<String, Object> saveUserSubscription(Message message){
		messageService.saveUserSubscription(UserUtils.getUser().getId(), message.getCode());
		return JsonUtils.jsonStringTo(message);
	}
	
	/**
	 * 查询当前用户在指定空间的消息列表
	 * @param message
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findmessagelist")
	public Map<String, Object> findMessageList(Message message){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("messageList", messageService.findMessageList(message));
		resultMap.put("unReadMessageCount", messageService.findUnReadMessageCount(message));
		return JsonUtils.jsonStringTo(resultMap);
	}
	
	/**
	 * 查询当前用户在指定空间中的未读消息总数
	 * @param message
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findunreadmessagecount")
	public Map<String, Object> findUnReadMessageCount(Message message){
		return JsonUtils.jsonStringTo(messageService.findUnReadMessageCount(message));
	}
	
	/**
	 * 将当前用户在指定空间下的消息设置为已读
	 * @param message
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatereadstatusbyspaceid")
	public Map<String, Object> updateReadStatusBySpaceId(Message message){
		messageService.updateReadStatusBySpaceId(message);
		return JsonUtils.jsonStringTo(message);
	}
	
	/**
	 * 根据编号将消息标记为已读
	 * @param message
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatereadstatusbyid")
	public Map<String, Object> updateReadStatusById(Message message){
		messageService.updateReadStatusById(message);
		return JsonUtils.jsonStringTo(message);
	}
	
}
