package com.bt.mobile.rest.message;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.message.entity.Message;
import com.bt.surfond.message.service.MessageService;
import com.thinkgem.jeesite.common.web.BaseController;

/**
 * 消息接口
 * @author dyl
 * @version 2016-03-24
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/mobile/message")
public class MessageInfoMobileResource extends BaseController{
	
	@Autowired
	private MessageService messageService;

	/**
	 * 查询消息列表(分类)
	 * @param message
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findmessagelistbytb")
	public Map<String, Object> findMessageListByTB(@RequestBody Message message){
		return JsonUtils.jsonString(messageService.findMessageListByTB(message), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 查询消息列表(最新)
	 * @param message
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findmessagelastbytb")
	public Map<String, Object> findMessageLastByTB(@RequestBody Message message){
		return JsonUtils.jsonString(messageService.findMessageLastByTB(message), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 标记单条消息已读
	 * @param message
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatereadstatusbyid")
	public Map<String, Object> updateReadStatusById(@RequestBody Message message){
		messageService.updateReadStatusById(message);
		return JsonUtils.jsonString("", "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 查询当前用户未读消息总数(分类)
	 * @param message
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findmessagecountbytb")
	public Map<String, Object> findMessageCountByTB(@RequestBody Message message){
		return JsonUtils.jsonString(messageService.findMessageCountByTB(message), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 标记消息列表已读(分类)
	 * @param message
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatereadstatusbytb")
	public Map<String, Object> updateReadStatusByTB(@RequestBody Message message){
		messageService.updateReadStatusByTB(message);
		return JsonUtils.jsonString("", "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 根据主键查询消息
	 * @param message
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "querymessage")
	public Map<String, Object> queryMessage(@RequestBody Message message){
		return JsonUtils.jsonString(messageService.get(message), "", Constants.APP_STATUS_SUCCESS);
	}
}
