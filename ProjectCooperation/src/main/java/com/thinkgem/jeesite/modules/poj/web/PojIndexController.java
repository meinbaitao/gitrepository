package com.thinkgem.jeesite.modules.poj.web;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.space.entity.Space;
import com.bt.surfond.space.service.SpaceService;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.web.BaseController;
import com.bt.surfond.common.Constants;
import com.thinkgem.jeesite.modules.poj.utils.JsonUtils;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

@Controller
@RequestMapping(value = "${adminPath}/aindex")
public class PojIndexController extends BaseController{
	
	@Autowired
	private SpaceService spaceService;
	
	@RequestMapping(value = {"home", ""})
	public String list(String spaceId, HttpServletRequest request, HttpServletResponse response, Model model) {
		if(null == UserUtils.getUser()){
			return "redirect:" + Global.getAdminPath() + "/login";
		}
		Space checkedSpace = null;
		if(StringUtils.isNotBlank(spaceId)){//页面传递参数spaceId,用户选择指定的空间,此时根据spaceId查询对应的空间
			checkedSpace = spaceService.findSpace(new Space(spaceId));
			//若checkedSpace为空,页面传递参数spaceId错误,查询不到对应的空间①
			if(null != checkedSpace && Constants.SPACE_TYPE_PERSONAL.equals(checkedSpace.getType()) && !UserUtils.getUser().getId().equals(checkedSpace.getCreateBy().getId())){
				checkedSpace = null;//若执行此句代码,说明页面传递参数spaceId查询到了其他用户的个人空间,错误的参数spaceId导致错误操作,将checkedSpace置为空②
			}
		}else{//页面没有传递参数spaceId,用户首次或退出后再次登录本系统,此时获取cookie中的访问记录
			String cookieSpaceIdValue = "";
			Cookie[] cookieArray = request.getCookies();
			for(int i = 0; null != cookieArray && i < cookieArray.length; i++){
				if("spaceId".equals(cookieArray[i].getName())){//获取key为"cookieSpaceId"的cookie的值,该值为用户上次访问停留的空间的编号,该值对应的格式为[用户编号][-][空间编号]
					cookieSpaceIdValue = cookieArray[i].getValue();
				}
			}
			if(StringUtils.isNotBlank(cookieSpaceIdValue)){//用户退出后重新访问本系统,并且cookie中记录有用户上次访问停留的空间的编号,此时解析cookieSpaceIdValue并查询对应的空间
				String[] cookieSpaceIdValueArray = cookieSpaceIdValue.split("-");
				if(null != cookieSpaceIdValueArray && cookieSpaceIdValueArray.length == 2 && UserUtils.getUser().getId().equals(cookieSpaceIdValueArray[0])){
					checkedSpace = spaceService.findSpace(new Space(cookieSpaceIdValueArray[1]));
				}
				//若checkedSpace为空,cookie信息记录错误或同一浏览器前后登录不同的账号③
			}
			//若cookieSpaceIdValue为空(即checkedSpace为空),表明用户首次访问本系统或用户退出后重新访问本系统但cookie中没有记录其上次访问停留的空间的编号④
		}
		String isSpaceShow = "";
		if(null == checkedSpace){//若执行此中代码,页面需要做判断显示
			//int spaceAmount = spaceService.findSpaceCount(new Space());
			/*if(spaceAmount > 0){
				isSpaceShow = "choose-space-show";
			}else{
				isSpaceShow = "choose-space-null-show";
			}*/
		}
		//将用户选择的spaceId保存到cookie中返回给浏览器
		/*Cookie cookie = new Cookie("spaceId", UserUtils.getUser().getId() + "-" + checkedSpace.getId());
		cookie.setMaxAge(1 * 60 * 60 * 24 * 7);
		response.addCookie(cookie);*/
		//查询首页需要显示的数据并将其保存到域对象中
		model.addAttribute("checkedSpace", checkedSpace);
		model.addAttribute("isSpaceShow", isSpaceShow);
		return "modules/surfond/index";
	}
	
	@RequestMapping(value = "support")
	public String support(HttpServletRequest request) {
		
		return "modules/surfond/support";
	}
	
	@RequestMapping(value = "workspace")
	public String workspace() {
		
		return "modules/surfond/workspace";
	}
	
	@RequestMapping(value = "organizational")
	public String organizational(HttpServletRequest request, Model model) {
		String spaceId = request.getParameter("spaceId");
		Space checkedSpace = spaceService.findSpace(new Space(spaceId));
		model.addAttribute("checkedSpace", checkedSpace);
		model.addAttribute("spaceId", spaceId);
		return "modules/surfond/organizational";
	}
	
	@RequestMapping(value = "project")
	public String project() {
		
		return "modules/surfond/project";
	}
	
	@RequestMapping(value = "theme")
	public String theme() {
		
		return "modules/surfond/theme";
	}
	
	/**
	 * 生成随机的UUID
	 * @return
	 */
	@RequestMapping(value = "getuuid")
	@ResponseBody
	public Map<String, Object> getUUID(){
		return JsonUtils.jsonStringTo(IdGen.uuid());
	}
	
}
