package com.bt.mobile.rest.task;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.group.entity.Group;
import com.bt.surfond.group.service.GroupService;
import com.thinkgem.jeesite.modules.sys.entity.User;

/**
 * 手机端接口(好友)
 * @author 
 * @version 2015-10-08
 */
@Controller
@RequestMapping(value = "${adminPath}/group/info")
public class GroupInfoMobileResource {

	@Autowired
	private GroupService groupService;

	/**
	 * 查詢用戶的所有分組和好友
	 * @param group
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findMyGroup")
	public Map<String, Object> findMyGroup(Group group,HttpServletRequest request, HttpServletResponse response){
		return JsonUtils.jsonString(groupService.findMyGroup(group), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 添加分组
	 * @param group
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "addgroup")
	public Map<String, Object> addGroup(@RequestBody Group group,HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonString(groupService.addGroup(group), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 添加好友
	 * @param group
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "addGroupMember")
	public Map<String, Object> addGroupMember(@RequestBody User user, HttpServletRequest request,HttpServletResponse response){
		return groupService.InviteMemberToGroup(user.getId(),user.getEmail());
	}
	
	/**
	 * 根据名字模糊查找好友
	 * @param group
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findGroupMemberByLikeName")
	public List<Map<String, Object>> findGroupMemberByLikeName(@RequestBody User user, HttpServletRequest request,HttpServletResponse response) {
		return groupService.findGroupMemberByLikeName(user.getName());
	}
	
	/**
	 * 查找我的好友总数
	 * @param group
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findMyfriendsCount")
	public Map<String, Object> findMyfriendsCount(HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonString(groupService.findMyfriendsCount(), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 查询单个组的成员列表
	 */
	@ResponseBody
	@RequestMapping(value = "findMemberListByGroupId")
	public Map<String, Object> findMemberListByGroupId(@RequestBody Group group,HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonString(groupService.findGroupAndMembers(group), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 移除分组成员
	 * @param group
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deleteMemberOfGroup")
	public Map<String, Object> deleteMemberOfGroup(@RequestBody Group group,HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonString(groupService.deleteGroupMemberById(group.getId(), group.getUserId()), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 修改分组的名称
	 * @param group
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updateGroupName")
	public Map<String, Object> updateGroupName(@RequestBody Group group,HttpServletRequest request,HttpServletResponse response) {
		return JsonUtils.jsonString(groupService.updateGroupName(group), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 移除分组
	 * @param group
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deleteGroup")
	public Map<String, Object> deleteGroup(@RequestBody Group group,HttpServletRequest request,HttpServletResponse response) {
		return JsonUtils.jsonString(groupService.deleteMyGroup(group), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 移动分组成员
	 * @param group
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "moveGroupMember")
	public Map<String, Object> moveGroupMember(@RequestBody Group group,HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonString(groupService.moveGroupMember(group), "", Constants.APP_STATUS_SUCCESS);
	}
	
}
