package com.bt.surfond.space.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.dynamic.service.DynamicService;
import com.bt.surfond.organize.entity.Organize;
import com.bt.surfond.space.entity.Space;
import com.bt.surfond.space.service.SpaceService;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.poj.utils.JsonUtils;

/**
 * 空间信息Controller
 * @author dyl
 * @version 2015-09-30
 */
@Controller
@RequestMapping(value = "${adminPath}/space")
public class SpaceController extends BaseController {

	@Autowired
	private SpaceService spaceService;
	
	@Autowired
	private DynamicService dynamicService;
	
	/**
	 * 查询与当前登录用户关联的空间列表
	 * @param space
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findspacelist")
	public Map<String, Object> findSpaceList(Space space){
		return JsonUtils.jsonStringTo(spaceService.findSpaceList(space));
	}
	
	/**
	 * 根据空间编号查询与当前登录用户关联的空间
	 * @param space
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findspace")
	public Map<String, Object> findSpace(Space space){
		return JsonUtils.jsonStringTo(spaceService.findSpace(space));
	}
	
	/**
	 * 添加组织分组成员(邀请好友入口)
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "addOrganizeMember")
	@ResponseBody
	public Map<String, Object> addOrganizeMember(Organize organize,HttpServletRequest request){
		return spaceService.addOrganizeMember(organize);
	}
	
	/**
	 * 更新空间标题和描述
	 * @param space
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatetitleanddescriptionbyid")
	public Map<String, Object> updateTitleAndDescriptionById(Space space){
		spaceService.updateTitleAndDescriptionById(space);
		return JsonUtils.jsonStringTo(space);
	}
	
	/**
	 * 查询空间成员列表
	 * @param space
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findspacememberlist")
	public Map<String, Object> findSpaceMemberList(Space space){
		return JsonUtils.jsonStringTo(spaceService.findSpaceMemberList1(space));
	}
	
	/**
	 * 创建空间
	 * @param space
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "savespace")
	public Map<String, Object> saveSpace(Space space){
		spaceService.saveSpace(space);
		return JsonUtils.jsonStringTo(space);
	}
	
}