package com.bt.surfond.group.web;


import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.group.entity.Group;
import com.bt.surfond.group.service.GroupService;
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 团队表Controller
 * @author mjs
 * @version 2015-10-15
 */
@Controller
@RequestMapping(value = "${adminPath}/group")
public class GroupController extends BaseController {

	@Autowired
	private GroupService groupService;
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	
	/**
	 * 根据空间ID查询所有分组
	 */
	@ResponseBody
	@RequestMapping(value = "querygrouplist")
	public Map<String, Object> fondGroupList(Group group,HttpServletRequest request,HttpServletResponse response){
		
		return JsonUtils.jsonString(groupService.findGroupList(group));
	}
	
	/**
	 * 查询空间下所有成员
	 */
	@ResponseBody
	@RequestMapping(value = "querymemberlist")
	public Map<String, Object> findMemberListBySpaceId(Group group,HttpServletRequest request,HttpServletResponse response){
		
		return JsonUtils.jsonString(groupService.findMemberListBySpaceId(group));
	}
	
	/**
	 * 删除空间成员
	 * @param spaceId
	 * @param userId
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "deletegroupmember")
	public String deleteGroupMember(String spaceId, String userId, HttpServletResponse response){
		groupService.deleteGroupMember(spaceId, userId);
		return renderString(response, JsonUtils.jsonString(new JSONObject()), "application/json");
	}
	
	/**
	 * 更改空间成员状态
	 * @param spaceId
	 * @param userId
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "updatemembertype")
	public String updateMemberType(String spaceId, String userId, HttpServletResponse response){
		groupService.updateMemberType(spaceId, userId);
		return renderString(response, JsonUtils.jsonString(new JSONObject()), "application/json");
	}
	
	
	/**
	 * 拖动组添加项目/任务关注
	 * @param projectTask
	 * @param response
	 * @return
	 */
	/*@RequestMapping(value = "addgrouptaskprojectfollow")
	public String addGroupTaskProjectFollow(Group group,HttpServletRequest request, HttpServletResponse response){
		String taskId =request.getParameter("taskId");
		//根据组ID查询所有的成员
		List<Map<String, Object>> list =groupService.findMemberListByGroupId(group);
		ProjectTask poj = projectTaskService.findProjectTaskMemberIsExists(taskId);
		if(null !=list){
			for(int i=0;i<list.size();i++){
				Map<String, Object> map =list.get(i);
				if(null !=poj){
					if(!StringUtils.contains(poj.getUserIds(),map.get("id").toString())){
						String userId =map.get("id").toString();
						projectTaskService.saveProjectTaskMember(taskId,userId,Constants.MEMBER_TYPE_MEMBER);
					}
				}
			}
		}
		return renderString(response, JsonUtils.jsonString(new JSONObject()), "application/json");
	}*/
	
	
	
	
	
	
	//========================================================================================================
	
	/**
	 * 添加分组
	 * @param group
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "addgroup")
	public Map<String, Object> addGroup(Group group,HttpServletRequest request,HttpServletResponse response){
		groupService.addGroup(group);
		return JsonUtils.jsonStringTo(group);
	}
	
	/**
	 * 添加好友
	 * @param group
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "addGroupMember")
	public Map<String, Object> addGroupMember(HttpServletRequest request,HttpServletResponse response){
		String id = request.getParameter("groupId");
		String email = request.getParameter("email");
		return groupService.InviteMemberToGroup(id,email);
	}
	
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
		return JsonUtils.jsonString(groupService.findMyGroup(group));
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
	public List<Map<String, Object>> findGroupMemberByLikeName(HttpServletRequest request,HttpServletResponse response) {
		String name = request.getParameter("name");
		return groupService.findGroupMemberByLikeName(name);
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
		return groupService.findMyfriendsCount();
	}
	
	/**
	 * 查询每个组的成员列表
	 */
	@ResponseBody
	@RequestMapping(value = "findMemberListByGroupId")
	public Map<String, Object> findMemberListByGroupId(Group group,HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonStringTo(groupService.findGroupAndMembers(group));
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
	public Map<String, Object> deleteMemberOfGroup(Group group,HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonStringTo(groupService.deleteGroupMemberById(group.getId(), group.getUserId()));
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
	public Map<String, Object> updateGroupName(Group group,HttpServletRequest request,HttpServletResponse response) {
		return JsonUtils.jsonStringTo(groupService.updateGroupName(group));
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
	public Map<String, Object> deleteGroup(Group group,HttpServletRequest request,HttpServletResponse response) {
		return JsonUtils.jsonStringTo(groupService.deleteMyGroup(group));
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
	public Map<String, Object> moveGroupMember(Group group,HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonStringTo(groupService.moveGroupMember(group));
	}
	
	
	/**
	 * 查找我和好友之间的项目信息
	 * @param group
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findProjectInfoBetween")
	public Map<String, Object> findProjectInfoBetween(Group group,HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonStringTo(groupService.findProjectInfoBetween(group));
	}
	
	/**
	 * 查找我的项目信息
	 * @param group
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findMyProjectInfo")
	public Map<String, Object> findMyProjectInfo(Group group,HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonStringTo(groupService.findMyProjectInfo(group));
	}
	
	
	/**
	 * 查找我的好友中的邮箱类型
	 * @param group
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findEmailByMyFriend")
	public List<Map<String, Object>> findEmailByMyFriend(HttpServletRequest request,HttpServletResponse response){
		return groupService.findEmailByMyFriend(UserUtils.getUser());
	}
	
	
}