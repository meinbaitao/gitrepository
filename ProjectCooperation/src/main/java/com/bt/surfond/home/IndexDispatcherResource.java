package com.bt.surfond.home;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bt.surfond.space.entity.Space;
import com.bt.surfond.space.service.SpaceService;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 首页转发控制
 * 
 * @author dyl
 * @version 2016-03-05
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/index")
public class IndexDispatcherResource extends BaseController {
	
	/**"菜单类型-转发地址"键值对*/
	private static Map<String, String> menubarMap = new HashMap<String, String>();
	/**默认菜单类型*/
	public static final String DEFAULT_NEMU_TYPE = "workspace";
	static {
		menubarMap.put("workspace", "modules/surfond/workspace");//工作台
		menubarMap.put("project", "modules/surfond/project");//项目
		menubarMap.put("organizational", "modules/surfond/organizational");//成员
		menubarMap.put("theme", "modules/surfond/theme");//话题
		menubarMap.put("calendar", "modules/surfond/calendar");//日程
		menubarMap.put("chart", "modules/surfond/chart");//图表统计
		menubarMap.put("tags", "modules/surfond/tags");//标签
		menubarMap.put("bookmark", "modules/surfond/bookmark");//收藏
		menubarMap.put("search", "modules/surfond/search");//搜索
	}
	
	@Autowired
	private SpaceService spaceService;

	/**
	 * 首页菜单页面公共转发处理方法
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = {"home", ""})
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		//检查是否超时,若超时则重定向到登录处理请求
		if(null == UserUtils.getUser()){
			return "redirect:" + Global.getAdminPath() + "/login";
		}
		
		spaceService.checkSpaceExists();
		
		String menuType = request.getParameter("menuType");//获取菜单类型
		String spaceId = request.getParameter("spaceId");//获取空间编号
		
		Space checkedSpace = null;
		if(StringUtils.isNotBlank(spaceId)){//spaceId有值,根据spaceId查询空间
			checkedSpace = spaceService.findSpace(new Space(spaceId));
		}else{//spaceId没有值,检查 cookies,若key为"spaceId"的cookie存在,从该cookie中取值,值得格式为"用户编号-空间编号"
			Cookie[] cookies = request.getCookies();
			for(int i = 0; null != cookies && i < cookies.length; i++){
				if("spaceId".equals(cookies[i].getName())){
					String cookieSpaceIdValue = cookies[i].getValue();
					if(StringUtils.isNotBlank(cookieSpaceIdValue)){
						String[] cookieSpaceIdValueArray = cookieSpaceIdValue.split("-");
						if(null != cookieSpaceIdValueArray && cookieSpaceIdValueArray.length == 2 && UserUtils.getUser().getId().equals(cookieSpaceIdValueArray[0])){
							checkedSpace = spaceService.findSpace(new Space(cookieSpaceIdValueArray[1]));
						}
					}
				}
			}
		}
		
		if(null == checkedSpace){//若执行此处逻辑,查询最早创建并且没有被删除的空间
			checkedSpace = spaceService.findEarlySpace(new Space());
		}
		
		//获取转发地址的菜单类型
		menuType = (null != menuType && menubarMap.containsKey(menuType)) ? menuType : DEFAULT_NEMU_TYPE;
		
		//将数据保存到request域中
		model.addAttribute("checkedSpace", checkedSpace);
		model.addAttribute("menuType", menuType);
		return menubarMap.get(menuType);
	}
	
	@RequestMapping(value = "index")
	public String support() {
		
		return "modules/surfond/index";
	}
	
	@RequestMapping(value = "workspace")
	public String workspace() {
		
		return "modules/surfond/workspace";
	}
	
	@RequestMapping(value = "project")
	public String project() {
		
		return "modules/surfond/project";
	}
	
	@RequestMapping(value = "theme")
	public String theme() {
		
		return "modules/surfond/theme";
	}

}
