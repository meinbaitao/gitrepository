package com.bt.mobile.rest.sys;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.web.servlet.Cookie;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.EmailModel;
import com.bt.surfond.common.utils.EmailUtils;
import com.bt.surfond.common.utils.JsonUtils;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.security.UsernamePasswordToken;
import com.thinkgem.jeesite.modules.sys.security.SystemAuthorizingRealm.Principal;
import com.thinkgem.jeesite.modules.sys.service.SystemService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * APP登录、注册、修改密码
 * @author xujianpeng
 * @version 2015-12-19
 */
@Controller
public class AppLoginMobileResource extends BaseController{
	
	@Autowired
	private SystemService systemService;
	
	
	/**
	 * 登录
	 */
	@RequestMapping(value = "${mobliePath}/login", method = RequestMethod.POST)
	public String login(HttpServletRequest request, HttpServletResponse response, Model model) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			//获取登录名
			String loginName =request.getParameter("loginName");
			//获取密码
			String password =request.getParameter("password");
			//获取远程IP地址
			String host = StringUtils.getRemoteAddr((HttpServletRequest)request);
			
			if(StringUtils.isBlank(password)){
				password="";
			}
			//创建Token
			AuthenticationToken token =new UsernamePasswordToken(loginName, password.toCharArray(), false, host, "", false);
			//UserUtils.clearCache();
			//获取一个证书实例，将token放入实例中登录
			Subject currentUser = SecurityUtils.getSubject(); 
	        currentUser.login(token);
	        Principal principal = UserUtils.getPrincipal();
	        DefaultWebSessionManager dm = new DefaultWebSessionManager();
	        Cookie template = dm.getSessionIdCookie();
	        Cookie cookie = new SimpleCookie(template);
	        cookie.setName("jeesite.session.id");
			cookie.setValue(principal.getSessionid()); 
			cookie.setHttpOnly(true);
			cookie.saveTo(request, response);
	        map.put("status", "1");
	        map.put("message", "登录成功.");
	        map.put("result", principal);
			return renderString(response, map);
		}catch(Exception e){
			map.put("status", "-1");
			map.put("message", "用户或密码错误, 请重试.");
			map.put("result", "{}");
			return renderString(response, map);
		}
	}
	
	
	
	/**
	 * 退出登录
	 */
	@RequestMapping(value = "${mobliePath}/logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpServletResponse response){
		UserUtils.getSubject().logout();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", "1");
		map.put("message", "退出成功!");
		map.put("result", "success");
		return renderString(response, map);
	}
	
	
	/**
	 * 用户信息个人资料
	 */
	@ResponseBody
	@RequestMapping(value = "${adminPath}/queryuserinfo", method = RequestMethod.POST)
	public Map<String,Object> findUserDetail(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) {
		
		return JsonUtils.jsonString(systemService.getUser(user.getId()), "", Constants.APP_STATUS_SUCCESS);
	}
	
	
	
	/**
	 * 修改个人信息
	 */
	@ResponseBody
	@RequestMapping(value = "${adminPath}/app/updateuser", method = RequestMethod.POST)
	public Map<String,Object> updateUser(@RequestBody User user,HttpServletRequest request, HttpServletResponse response) {
		int result = systemService.updateUserName(user);
		if(result>0){
			return JsonUtils.jsonString(result, "修改信息成功!", Constants.APP_STATUS_SUCCESS);
		}
		return JsonUtils.jsonString(result, "修改信息失败!", Constants.APP_STATUS_FAIL);
	}
	
	
	/**
	 * 修改密码
	 */
	@SuppressWarnings("static-access")
	@ResponseBody
	@RequestMapping(value = "${adminPath}/app/updatepassword", method = RequestMethod.POST)
	public Map<String,Object> updatePassword(@RequestBody User user,HttpServletRequest request, HttpServletResponse response) {
		int result =0;
		User u = UserUtils.getUser();
		if(systemService.validatePassword(user.getPassword(), u.getPassword())){
			result = systemService.updatePasswordById(user.getId(), user.getLoginName(), user.getNewPassword());
			if(result>0){
				return JsonUtils.jsonString(result, "修改密码成功!", Constants.APP_STATUS_SUCCESS);
			}
		}
		return JsonUtils.jsonString(result, "修改密码失败!", Constants.APP_STATUS_FAIL);
	}
	
	
	/**
	 * 意见反馈
	 * 邮件发送
	 */
	@ResponseBody
	@RequestMapping(value = "${adminPath}/app/feedback", method = RequestMethod.POST)
	public Map<String,Object> feedback(@RequestBody User user,HttpServletRequest request, HttpServletResponse response, Model model) {
		String content = user.getRemarks();
		User u = UserUtils.getUser();
		Map<String, Object> map = new HashMap<String, Object>();
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日 E HH时mm分");
		//邮件发送
		String result = EmailUtils.sendHtmlEmail(Global.getConfig("email_username"), "Surfond客户意见反馈", EmailModel.feedbackModel(u.getName(),u.getLoginName(),format.format(new Date()),content,user.getPhone(),""));
		map.put("status", "1");
		map.put("message", "反馈成功!");
		map.put("result", result);
		return map;
	}
}
