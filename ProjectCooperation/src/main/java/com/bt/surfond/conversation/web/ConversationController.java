/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.conversation.web;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.conversation.entity.Conversation;
import com.bt.surfond.conversation.service.ConversationService;
import com.bt.surfond.dynamic.service.DynamicService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.service.SystemService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 话题信息Controller
 * @author dyl
 * @version 2015-10-22
 */
@Controller
@RequestMapping(value = "${adminPath}/conversation")
public class ConversationController extends BaseController {
	@Autowired
	private ConversationService conversationService;
	
	@Autowired
	private DynamicService dynamicService;
	
	@Autowired
	private SystemService systemService;
	
	/**
	 * 根据项目/空间ID查询会话列表
	 * @param conversation
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = {"list", ""})
	@ResponseBody
	public Map<String, Object> list(Conversation conversation, HttpServletRequest request, HttpServletResponse response, Model model) {
		return JsonUtils.jsonString(conversationService.findByOneSpace(conversation), "success", "1");
	}
	
	/**
	 * 取消话题
	 * @param conversation
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "cancelConversation")
	@ResponseBody
	public String cancelConversation(Conversation conversation, HttpServletRequest request){
		Conversation con = conversationService.get(conversation);
		JSONObject josnObj = new JSONObject();
		if(null!=con && null!=con.getCreateBy() && UserUtils.getUser().getId().equals(con.getCreateBy().getId())){
			dynamicService.deleteMore(conversation.getId());
			conversationService.delete(conversation);
			josnObj.put("data", "success");
		}
		return JsonUtils.jsonString(josnObj);
	}
	
	/**
	 * 添加话题
	 * @param conversation
	 * @param model
	 * @param request
	 * @param redirectAttributes
	 * @return
	 */
	@RequestMapping(value = "save")
	@ResponseBody
	public Conversation save(Conversation conversation, Model model, HttpServletRequest request,RedirectAttributes redirectAttributes) {
		
		if(StringUtils.isBlank(conversation.getTitle())){return null;}//判断标题为空直接返回
		if(StringUtils.isBlank(conversation.getId())){conversation.setId(IdGen.uuid());}//判断ID为空给其新建ID
		//处理IE中文乱码
		try {conversation.setTitle(URLDecoder.decode(conversation.getTitle(), "UTF-8"));} catch (UnsupportedEncodingException e) {e.printStackTrace();}
		Conversation c = conversationService.findConversationMaxSort(conversation);
		if(null!=c && null!=c.getSort()){
			conversation.setSort(c.getSort()+1);
		}else{
			conversation.setSort(0);
		}
		conversation.setMetionmember(request.getParameter("metionmember"));
		conversation.setStatus("0");
		conversation.setDelFlag("0");
		conversation.setIsNewRecord(true);
		conversation.setPraiseAmount(0);
		conversation.setSource(Constants.OPTION_PC);
		conversationService.save(conversation);
		return conversationService.findOneConversation(conversation);
	}
	/**
	 * 点赞与取消点赞
	 * @param conversation
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "praiseConversation")
	@ResponseBody
	public String praiseConversation(Conversation conversation, HttpServletRequest request){
		return conversationService.conversationPraise(conversation);
	}
	
	/**
	 * 查询热门话题
	 * @param conversation
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findHotConversationList")
	@ResponseBody
	public Map<String, Object> findHotConversationList(Conversation conversation, HttpServletRequest request){
		return JsonUtils.jsonString(conversationService.findHotConversation(conversation), "success", "1");
	}
	
	/**
	 * 根据ID查找单个话题
	 * @return
	 */
	@RequestMapping(value = "findOneConversation")
	@ResponseBody
	public Map<String, Object> findOneConversation(Conversation conversation, HttpServletRequest request){
		return JsonUtils.jsonString(conversationService.findOneConversation(conversation), "success", "1");
	}
	
	/**
	 * 获取当前用户的信息
	 * @return
	 */
	@RequestMapping(value = "findThisUserInfo")
	@ResponseBody
	public Object findThisUserInfo(){
		Map<String, Object> map = new HashMap<String, Object>();
		User user = UserUtils.getUser();
		map.put("userId", user.getId());
		map.put("userName", user.getName());
		map.put("loginName", user.getLoginName());
		map.put("photo", user.getPhoto());
		map.put("email", user.getEmail());
		map.put("phone", user.getPhone());
		return map;
	}
}