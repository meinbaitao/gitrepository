package com.bt.surfond.system.web;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.EmailModel;
import com.bt.surfond.common.utils.EmailUtils;
import com.bt.surfond.group.service.GroupService;
import com.bt.surfond.message.service.MessageService;
import com.bt.surfond.organize.service.OrganizeService;
import com.bt.surfond.space.service.SpaceService;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.service.SystemService;

@Controller
@RequestMapping(value = "/m/system/user")
public class RegisterController extends BaseController {

	@Autowired
	private SystemService systemService;
	
	@Autowired
	private SpaceService spaceService;
	
	@Autowired 
	private GroupService groupService;
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private OrganizeService organizeService;
	
	@Autowired
	private MessageService messageService;
	
	
	
	/**
	 * 进入主页页面
	 * @return
	 */
	@RequestMapping(value = "innerRegist")
	public String innerRegist(Model model,HttpServletRequest request){
		String email = request.getParameter("email");
		String spaceId = request.getParameter("spaceId");
		String projectId = request.getParameter("projectId");
		if(StringUtils.isNotBlank(email)){
			model.addAttribute("userName", email);
		}
		if(StringUtils.isNotBlank(spaceId)){
			model.addAttribute("spaceId", spaceId);
		}
		if(StringUtils.isNotBlank(projectId)){
			model.addAttribute("projectId", projectId);
		}
		return "modules/sys/sysRegist";
	}
	
	
	/**
	 * 用户注册
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "register")
	public String register(@Validated User user,Model model,HttpServletRequest request,RedirectAttributes redirectAttributes){
		try{
			String spaceId = request.getParameter("spaceId");
			String organizeId = request.getParameter("organizeId");
			User u = systemService.getUserByEmail(user.getEmail());
			String id = IdGen.uuid();
			if(u!=null){
				if("1".equals(u.getLoginFlag())){
					model.addAttribute("username", u.getEmail());
					return "modules/sys/sysHasRegisted";
				}else{
					u.setPassword(SystemService.entryptPassword(user.getPassword()));
					systemService.update(user);
					String send = EmailUtils.registSendMail(user.getEmail(), "Surfond账号注册", EmailModel.registModel(user.getEmail(),u.getCode()));
					if("success".equals(send)){
						request.setAttribute("message", "(此账号已被注册过，但未激活)"+u.getEmail());
						return "modules/sys/sysRegistSendEmail";
					}
				}
			}else{
				if(StringUtils.isNotBlank(user.getEmail())){
					//String strName = user.getEmail().split("@")[0];
					user.setId(id);
					user.setName(user.getLoginName());
					//user.setLoginName(user.getName());
					user.setCreateBy(new User(id));
					user.setCreateDate(new Date());
					user.setUpdateBy(new User(id));
					user.setUpdateDate(new Date());
					user.setPassword(SystemService.entryptPassword(user.getPassword()));
					user.setLoginFlag(Constants.USER_CANNOT_LOGIN);
					user.setCode(id);
					user.setUserType(Constants.USER_TYPE);
					String send = "";
					try{
						send = EmailUtils.registSendMail(user.getEmail(), "Surfond账号注册", EmailModel.registModel(user.getEmail(),id));
					}catch(Exception e){
						e.printStackTrace();
						addMessage(redirectAttributes, "您刚刚输入的邮箱可能有误，请确认后再注册！");
						return "redirect:" +"innerRegist";
					}
					if(systemService.register(user) > 0){
						messageService.saveUserAllSubscription(user.getId());
						if(StringUtils.isNotBlank(spaceId)&&StringUtils.isNotBlank(organizeId)){
							if(null==organizeService.findSpaceMemberMapping(spaceId, user.getId())){
								organizeService.addOrganizeMemberOption(organizeId, user.getId(), null);
							}
						}
						if("success".equals(send)){
							request.setAttribute("message", user.getEmail());
							return "modules/sys/sysRegistSendEmail";
						}
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			addMessage(redirectAttributes, "系统异常！");
			model.addAttribute("messages", "系统异常！");
		}
		return "redirect:" +"innerRegist";
	}
	
	
	/**
	 * 激活用户
	 * @return
	 */
	@RequestMapping(value = "activationUser")
	public String activationUser(HttpServletRequest request,Model model,RedirectAttributes redirectAttributes){
		String email = request.getParameter("emailCode");
		String code = request.getParameter("code");
		User user = systemService.getUserByEmail(email);
		String userName = "";
		if(user!=null&&StringUtils.isNotBlank(code)){
			if(StringUtils.isNotBlank(user.getLoginFlag()) && "1".equals(user.getLoginFlag())){
				return "modules/sys/sysOverDue";
			}else{
				if(StringUtils.isNotBlank(email)){
					if(code.equals(user.getCode())){
						user.setCode(IdGen.uuid());
						String activation = systemService.activationUser(email);
						if("1".equals(activation)){
							User u = new User();
							u.setEmail(email);
							//addMessage(redirectAttributes, "激活成功！");
							userName = systemService.getUserByEmail(email).getLoginName();
							model.addAttribute("userName", userName);
						}
					}else{
						return "modules/sys/sysOverDue";
					}
				}
			}
		}else{
			return "modules/sys/sysOverDue";
		}
		return "redirect:" + Global.getAdminPath() + "/login";
	}
	
	
	/**
	 * 进入忘记密码页面
	 * @return
	 */
	@RequestMapping(value = "innerForgetPassword")
	public String innerForgetPassword(HttpServletRequest request,Model model){
		return "modules/sys/sysForgetPassword";
	}
	
	/**
	 * 发送一封重置密码的邮件
	 * @param user
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "sendUpdateEmail")
	public String sendUpdateEmail(@Validated User user,HttpServletRequest request,Model model,RedirectAttributes redirectAttributes){
		try{
			String email = user.getLoginName();
			if(StringUtils.isNotBlank(email)){
				User u = systemService.getUserByEmail(email);
				if(u!=null){
					EmailUtils.sendHtmlMail(email, "surFond设置密码", EmailModel.setPasswordModel(u.getId(),u.getCode()));
					request.setAttribute("message", email);
				}else{
					request.setAttribute("message", "您刚刚输入的账号不存在，请先注册账号！");
					return "modules/sys/sysRegist";
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "modules/sys/sysForgetPasswordSendEmail";
	}
	
	
	/**
	 * 从邮箱进入重置密码页面
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "innerUpdatePassword")
	public String innerUpdatePassword(HttpServletRequest request,Model model){
		String id = request.getParameter("userCode");
		String code = request.getParameter("code");
		User user = systemService.getUser(id);
		if(null!=user && StringUtils.isNotBlank(code)){
			if(code.equals(user.getCode())){
				model.addAttribute("updateId", id);
				model.addAttribute("code", code);
				return "modules/sys/sysNewPassword";
			}else{
				return "modules/sys/sysOverDue";
			}
		}else{
			return "modules/sys/sysOverDue";
		}
	}
	
	
	/**
	 * 重置密码
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "updatePassword")
	public String updatePassword(@Validated User user,HttpServletRequest request,Model model,RedirectAttributes redirectAttributes){
		if(StringUtils.isNotBlank(user.getId())){
			String code = user.getCode();
			User u = systemService.getUser(user.getId());
			if(u!=null && StringUtils.isNotBlank(code)){
				if(StringUtils.isNotBlank(user.getCode())&&code.equals(u.getCode())){
					u.setPassword(SystemService.entryptPassword(user.getPassword()));
					u.setCode(IdGen.uuid());
					user.setUpdateBy(user);
					user.setUpdateDate(new Date());
					String result = systemService.emailUpdatePassWord(u);
					addMessage(redirectAttributes, "密码已修改成功，赶快登录吧！");
					if(StringUtils.isNotBlank(result)){
						request.setAttribute("userName", result);
					}
				}else{
					return "modules/sys/sysOverDue";
				}
			}else{
				return "modules/sys/sysOverDue";
			}
		}else{
			return "modules/sys/sysOverDue";
		}
		return "modules/sys/sysNewPasswordSuccess";
	}
	
	
	/**
	 *  根据用户名查找 用户信息   验证用名是否存在 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "findUserInfoByUserLoginName")
	@ResponseBody
	public User findUserInfoByUserLoginName(User user){
		return systemService.findUserInfoByUserLoginName(user);
	};
	
	/**
	 *  根据邮箱查找 用户信息   验证邮箱是否存在  
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "findUserInfoByUserEmail")
	@ResponseBody
	public User findUserInfoByUserEmail(User user){
		return systemService.findUserInfoByUserEmail(user);
	};
	
}
