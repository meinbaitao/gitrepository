package com.bt.surfond.organize.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.organize.entity.Organize;
import com.bt.surfond.organize.service.OrganizeService;
import com.thinkgem.jeesite.common.web.BaseController;

/**
 * 空间信息Controller
 * @author mjs
 * @version 2016-02-25
 */
@Controller
@RequestMapping(value = "${adminPath}/organize")
public class OrganizeController extends BaseController {

	@Autowired
	private OrganizeService organizeService;
	
	/**
	 * 添加组织分组
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "addOrganizeInfo")
	@ResponseBody
	public Map<String, Object> addOrganizeInfo(Organize organize,HttpServletRequest request){
		return organizeService.addOrganizeInfo(organize);
	}
	
	/**
	 * 删除组织分组
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "deleteOrganizeInfo")
	@ResponseBody
	public Map<String, Object> deleteOrganizeInfo(Organize organize,HttpServletRequest request){
		return organizeService.deleteOrganizeInfo(organize);
	}
	
	/**
	 * 移除组织分组成员
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "deleteOrganizeMember")
	@ResponseBody
	public Map<String, Object> deleteOrganizeMember(Organize organize,HttpServletRequest request){
		return organizeService.deleteOrganizeMember1(organize);
	}
	
	/**
	 * 成员更换组织分组
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "updateOrganizeMember")
	@ResponseBody
	public Map<String, Object> updateOrganizeMember(Organize organize,HttpServletRequest request){
		return organizeService.updateOrganizeMember1(organize);
	}
	
	/**
	 * 根据空间查找空间下的所有组织(包括组织成员)
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "findOneSapceOrganizes")
	@ResponseBody
	public Map<String, Object> findOneSapceOrganizes(Organize organize,HttpServletRequest request){
		return organizeService.findOneSapceOrganizesAndMembers(organize);
	}
	
	/**
	 * 根据空间查找空间下的所有组织(不包括组织成员)
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "getOneSapceOrganizes")
	@ResponseBody
	public Map<String, Object> getOneSapceOrganizes(Organize organize,HttpServletRequest request){
		return JsonUtils.jsonString(organizeService.findOneSapceOrganizes(organize), "success", "1");
	}
	
	/**
	 * 查找组织分组里的成员
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "findOneOrganizeMembers")
	@ResponseBody
	public Map<String, Object> findOneOrganizeMembers(Organize organize,HttpServletRequest request){
		return organizeService.findMembersMapByOrganize(organize);
	}
	
	/**
	 * 查找空间下所有组织的成员 
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findMembersBySpace")
	@ResponseBody
	public Map<String, Object> findMembersBySpace(Organize organize,HttpServletRequest request){
		return organizeService.findMembersBySpace(organize);
	}
	
	/**
	 * 查找该空间下的部门名字是否存在
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findOrganizeNameBySpace")
	@ResponseBody
	public Map<String, Object> findOrganizeNameBySpace(Organize organize,HttpServletRequest request){
		return organizeService.findOrganizeNameBySpace(organize);
	}
	
	/**
	 * 编辑组织分组
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "updateOrganizeInfo")
	@ResponseBody
	public Map<String, Object> updateOrganizeInfo(Organize organize,HttpServletRequest request){
		return organizeService.updateOrganizeInfo(organize);
	}
	
	/**
	 * 根据ID查找组织基本信息
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findOneOrganizeBaseInfo")
	@ResponseBody
	public Map<String, Object> findOneOrganizeBaseInfo(Organize organize,HttpServletRequest request){
		return organizeService.findOneOrganizeBaseInfo(organize);
	}
	
	/**
	 * 查询组织下的成员数量
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findOneOrganizeMemberCount")
	@ResponseBody
	public Map<String, Object> findOneOrganizeMemberCount(Organize organize,HttpServletRequest request){
		return organizeService.findOneOrganizeMemberCount(organize);
	}
	
	
}