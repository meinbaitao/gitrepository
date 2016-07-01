package com.bt.surfond.mobile.user;

import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.front.core.util.JsonUtils;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.service.SystemService;

/**
 * 系统信息管理app接口
 * @author dyl
 *
 */
@Controller
@RequestMapping("${adminPath}/mobile/stm")
public class SystemMobileResource {

	@Autowired
	private SystemService systemService;
	
	/**
	 * 修改用户信息
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "updateuserinfomation", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateUserInfomation(@RequestBody User user){
		if(systemService.updateUserInfomation(user) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, "修改用户信息成功！");
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "修改用户信息失败！");
	}
	
	/**
	 * 根据id集合查询用户信息集合
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "finduserinfomationlist", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> findUserInfomationList(@RequestBody String jsonObject){
		JSONObject json = new JSONObject(jsonObject);
		String userIds = (String) json.opt("userIds");
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, systemService.findUserInfomationList(userIds));
	}
	
}
