package com.bt.mobile.rest.task;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.EmailModel;
import com.bt.surfond.common.utils.EmailUtils;
import com.bt.surfond.group.entity.Group;
import com.bt.surfond.group.service.GroupService;
import com.bt.surfond.space.service.SpaceService;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.service.SystemService;


/**
 * 手机端接口
 * @author 
 * @version 2016-06-12
 */
@Controller
@RequestMapping(value = "/m/app/user/info")
public class UserInfoMobileResource {
	
	@Autowired
	private SystemService systemService;
	
	@Autowired
	private SpaceService spaceService;
	
	@Autowired 
	private GroupService groupService;
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	/**
	 * 手机端用户注册
	 * @param user
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="appregister")
	@ResponseBody
	public Map<String, Object> appregister(@RequestBody User user,HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		if(StringUtils.isNotBlank(user.getEmail()) && StringUtils.isNotBlank(user.getPassword())){
			map.put("message", "success");
			String result = "";
			try{
				User u = systemService.getUserByEmail(user.getEmail());
				if(u!=null){
					if("1".equals(u.getLoginFlag())){
						result = Constants.OPTION_SUCCESS_YOURSELF;
					}else{
						String send = EmailUtils.registSendMail(user.getEmail(), "Surfond账号注册", EmailModel.registModel(user.getEmail(),u.getCode()));
						if("success".equals(send)){
							result = Constants.OPTION_SUCCESS_TOW;
						}
					}
				}else{
					String id = IdGen.uuid();
					if(StringUtils.isNotBlank(user.getEmail())){
						String strName = user.getEmail().split("@")[0];
						user.setId(id);
						user.setName(strName);
						user.setLoginName(user.getEmail());
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
							result = Constants.APP_STATUS_FAIL;
						}
						if(systemService.register(user) > 0){
								Group group = new Group();
								group.setType(Constants.GROUP_TYPE_NOGROUPED);
								group.setTitle(Constants.GROUP_TYPE_DEFAULT_TITLE);
								group.setCreateBy(user);
								group.setUpdateBy(user);
								Group gp = groupService.addGroup(group);
								if(null!=gp){
									groupService.addGroupMember(id, gp.getId(), Constants.MEMBER_TYPE_VISITOR);
								}
							if("success".equals(send)){
								result = Constants.OPTION_SUCCESS;
							}
						}
					}
				}
			}catch(Exception e){
				e.printStackTrace();
			}
			map.put("result", result);
			map.put("status", "1");
		}else{
			map.put("message", "字段验证不通过");
			map.put("result", "失败");
			map.put("status", "0");
		}
		return map;
	}
	
	/**
	 * 手机端修改密码
	 * @param user
	 * @param request
	 * @param response
	 * @return
	 */
	public Map<String, Object> updatepassword(User user,HttpServletRequest request,HttpServletResponse response){
		
		return null;
	}
	
	
	
	
}
