package com.bt.surfond.system.web;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.HttpClientUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.security.UsernamePasswordToken;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 登录Controller
 * @author xujianpeng
 * @version 2015-12-19
 */
@Controller
public class GrantLoginController extends BaseController{

	/**
	 * 授权登录接口
	 */
	@RequestMapping(value = "/m/grantLogin", method = RequestMethod.GET)
	public String grantLogin(HttpServletRequest request, HttpServletResponse response, Model model) {
		String loginName =request.getParameter("loginName");
		// 校验用户名密码
		User user = UserUtils.getByLoginName(loginName);
		if (user != null) {
			if(Constants.USER_TYPE_WEIXIN.equals(user.getUserType()) || Constants.USER_TYPE_QQ.equals(user.getUserType())){
				//创建Token
				AuthenticationToken token =new UsernamePasswordToken(user.getLoginName(), user.getLoginName().toCharArray(), false, "", "", false);
				//获取一个证书实例，将token放入实例中登录
				Subject currentUser = SecurityUtils.getSubject(); 
		        currentUser.login(token);
		        return "modules/surfond/index";
			}
		}
		model.addAttribute("message", "用户或密码错误, 请重试.");
		return "modules/sys/sysLogin";
	}
	
	
	
	/**
	 * 返回微信二维码接口
	 */
	@ResponseBody
	@RequestMapping(value = "/m/wx/appid", method = RequestMethod.POST)
	public String getWxAppId(HttpServletRequest request, HttpServletResponse response) {
		String url =request.getParameter("url");
		String wxUrl="";
		String result =HttpClientUtils.getHttpClient(url);
		String reg= "<img(.*?)/>";
        Matcher m = Pattern.compile(reg).matcher(result);
        while (m.find()) {  
            String r = m.group(1);
            wxUrl = r.split("src=")[1];
            wxUrl = wxUrl.replaceAll("\"", "");
        } 
		return renderString(response, wxUrl);
	}
}
