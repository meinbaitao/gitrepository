package com.bt.mobile.rest.conversation;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.common.utils.UploadUtil;
import com.bt.surfond.conversation.entity.Conversation;
import com.bt.surfond.conversation.service.ConversationService;
import com.bt.surfond.dynamic.service.DynamicService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.service.SystemService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;


/**
 * 话题APP接口
 * @author xujianpeng
 * @version 2016-03-17
 */
@Controller
@RequestMapping(value = "${adminPath}/mobile/conversation")
public class ConversationMobileRsource extends BaseController {
	
	@Autowired
	private ConversationService conversationService;
	
	@Autowired
	private SystemService systemService;
	
	@Autowired
	private DynamicService dynamicService;
	
	/**
	 * 创建会话(所属空间)
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="createconversation")
	public Map<String,Object> createConversation(HttpServletRequest request, HttpServletResponse response) {
		String jsonObject = request.getParameter("jsonObject");
		JSONObject json = new JSONObject(jsonObject);
		Conversation conversation = new Conversation();
		String description = json.optString("description");
		String resourceId = json.optString("resourceId");
		String title = json.optString("title");
		String address = json.optString("address");
		
		if(StringUtils.isNotBlank(description)){conversation.setDescription(description);}
		if(StringUtils.isNotBlank(resourceId)){conversation.setResourceId(resourceId);}
		if(StringUtils.isNotBlank(title)){conversation.setTitle(title);}
		if(StringUtils.isNotBlank(address)){conversation.setAddress(address);}
		
		if(StringUtils.isBlank(conversation.getTitle())){return null;}//判断标题为空直接返回
		if(StringUtils.isBlank(conversation.getId())){conversation.setId(IdGen.uuid());}//判断ID为空给其新建ID
		Conversation c = conversationService.findConversationMaxSort(conversation);
		if(c!=null && null!=c.getSort()){
			conversation.setSort(c.getSort()+1);
		}else{
			conversation.setSort(0);
		}
		//处理@成员
		conversation.setMetionmember((String)json.optString("metionmember"));
		//处理IE中文乱码
		try {conversation.setTitle(URLDecoder.decode(conversation.getTitle(), "UTF-8"));} catch (UnsupportedEncodingException e) {e.printStackTrace();}
		conversation.setStatus("0");
		conversation.setDelFlag("0");
		conversation.setIsNewRecord(true);
		conversation.setPraiseAmount(0);
		conversation.setSource(Constants.OPTION_PP);
		
		String uploadResult = new UploadUtil().appFileUpload(request, conversation.getId(), conversation.getId(), "0");
		if(StringUtils.isNotBlank(uploadResult) || StringUtils.isNotBlank(conversation.getTitle())){
			conversationService.save(conversation);
		}
		
		return JsonUtils.jsonString(conversationService.findOneConversation(conversation), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 查询会话列表(根据空间ID)
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="queryconversationlist")
	public Map<String,Object> findConversationList(@RequestBody Conversation conversation,HttpServletRequest request, HttpServletResponse response) {
		
		return JsonUtils.jsonString(conversationService.findByOneSpace(conversation), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 查询会话详情(根据会话ID)
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="queryconversationdetail")
	public Map<String,Object> findConversationDetail(@RequestBody Conversation conversation,HttpServletRequest request, HttpServletResponse response) {
		return JsonUtils.jsonString(conversationService.findOneConversation(conversation),"",Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 对会话点赞(根据会话ID)
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="conversationpraise")
	public String conversationPraise(@RequestBody Conversation conversation,HttpServletRequest request, HttpServletResponse response) {
		return conversationService.conversationPraise(conversation);
	}
	
	/**
	 * 删除话题(根据会话ID)
	 * @param conversation
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="deleteconversation")
	public String deleteconversation(@RequestBody Conversation conversation,HttpServletRequest request, HttpServletResponse response){
		Conversation con = conversationService.get(conversation);
		JSONObject josnObj = new JSONObject();
		if(null!=con.getCreateBy() && UserUtils.getUser().getId().equals(con.getCreateBy().getId())){
			dynamicService.deleteMore(conversation.getId());
			conversationService.delete(conversation);
			josnObj.put("result", "success");
			josnObj.put("message", "success");
			josnObj.put("status", Constants.APP_STATUS_SUCCESS);
		}else{
			josnObj.put("result", "-1");
			josnObj.put("message", "失败！");
			josnObj.put("status", Constants.APP_STATUS_FAIL);
		}
		return josnObj.toString();
	}
	
	/**
	 * 查找点赞记录的用户(根据记录ID查找其被点赞的用户)
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="findpraisemember")
	public Map<String,Object> findPraiseMember(@RequestBody Conversation conversation,HttpServletRequest request, HttpServletResponse response) {
		return JsonUtils.jsonString(conversationService.findPraiseMember(conversation.getId()),"",Constants.APP_STATUS_SUCCESS);
	}
	
	
}