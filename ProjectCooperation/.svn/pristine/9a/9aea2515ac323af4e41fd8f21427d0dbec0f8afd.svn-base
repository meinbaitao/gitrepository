package com.bt.surfond.system.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.poj.utils.JsonUtils;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.service.SystemService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

@Controller
@RequestMapping(value = "${adminPath}/system/user")
public class UseradminController extends BaseController {

	@Autowired
	private SystemService systemService;
	
	/**
	 * 获取当前登录用户
	 * @return
	 */
	@RequestMapping(value = "getuser")
	@ResponseBody
	public Map<String, Object> getUser(){
		return JsonUtils.jsonStringTo(UserUtils.getUser());
	}
	
	/**
	 * 修改密码
	 * @param oldPassword 旧密码
	 * @param newPassword 新密码
	 * @param rePassword 重复新密码
	 * @return
	 */
	@RequestMapping(value = "updatepasswordbyuserId")
	@ResponseBody
	public Map<String, Object> updatePasswordByUserId(String oldPassword, String newPassword, String rePassword){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		Map<String, Object> errors = new HashMap<String, Object>();
		User user = UserUtils.getUser();
		//1、校验旧密码
		if(StringUtils.isBlank(oldPassword)){
			errors.put("oldPasswordError", "旧密码不能为空！");
		}else{
			if(!SystemService.validatePassword(oldPassword, user.getPassword())){
				errors.put("oldPasswordError", "旧密码错误！");
			}
		}
		//2、校验新密码
		if(StringUtils.isBlank(newPassword)){
			errors.put("newPasswordError", "新密码不能为空！");
		}else{
			if(newPassword.length() < 6 || newPassword.length() > 20){
				errors.put("newPasswordError", "新密码必须在6~20为之间！");
			}
		}
		//3、校验重复密码
		if(StringUtils.isBlank(rePassword)){
			errors.put("rePasswordError", "确认密码不能为空！");
		}else{
			if(!rePassword.equals(newPassword)){
				errors.put("rePasswordError", "两次密码输入不一致！");
			}
		}
		if(errors.size() > 0){
			resultMap.put("result", "-1");
			resultMap.put("data", errors);
			return resultMap;
		}
		//表单数据校验通过，修改密码
		systemService.updatePasswordById(user.getId(), user.getLoginName(), newPassword);
		resultMap.put("result", "0");
		resultMap.put("data", "修改密码成功！");
		return resultMap;
	}
	
	/**
	 * 更新用户部分信息
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "updateuserinfobyuserid")
	@ResponseBody
	public Map<String, Object> updateUserInfoByUserId(HttpServletRequest request){
		User user = UserUtils.getUser();
		user.setName(request.getParameter("name"));
		user.setEmail(request.getParameter("email"));
		user.setRemarks(request.getParameter("remarks"));
		int result = systemService.updateUserInfoByUserId(user);
		//修改完个人设置清除当前用户缓存
		UserUtils.clearCache();
		return JsonUtils.jsonString(result,"修改个人信息成功！");
	}
	
}
