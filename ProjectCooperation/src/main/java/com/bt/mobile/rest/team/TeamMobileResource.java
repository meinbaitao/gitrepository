package com.bt.mobile.rest.team;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.front.core.util.JsonUtils;
import com.bt.surfond.team.entity.Team;
import com.bt.surfond.team.service.TeamService;
import com.thinkgem.jeesite.common.web.BaseController;

/**
 * 团队管理app接口
 * @author dyl
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/mobile/team")
public class TeamMobileResource extends BaseController {

	@Autowired
	private TeamService teamService;
	
	
	/**
	 * 根据用户和空间查找用户所在的团队信息
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findteambyspaceid")
	@ResponseBody
	public Map<String, Object> findAllTeamOfMine(@RequestBody Team team, HttpServletRequest request){
		
		return teamService.findAllTeamOfMine(team);
	}
	
	
	
	/**
	 * 新建一个团队信息
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "saveTeamInfo")
	@ResponseBody
	public Map<String, Object> saveTeamInfo(@RequestBody Team team, HttpServletRequest request){
		
		return teamService.saveTeamInfo(team);
	}
	
	/**
	 * 解散一个团队信息
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "deleteTeamInfo")
	@ResponseBody
	public Map<String, Object> deleteTeamInfo(Team team, HttpServletRequest request){
		
		return teamService.deleteTeamInfo(team);
	}
	
	/**
	 * 添加团队的多个成员
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "addTeamMoreMember")
	@ResponseBody
	public Map<String, Object> addTeamMoreMember(Team team,HttpServletRequest request){
		
		return teamService.addTeamMoreMember(team);
	}
	
	/**
	 * 更换团队负责人
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "updateTeamResponsibiliter")
	@ResponseBody
	public Map<String, Object> updateTeamResponsibiliter(Team team, HttpServletRequest request){
		
		return teamService.updateTeamResponsibiliter(team);
	}
	
	
	/**
	 * 移除团队的成员
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "deleteTeamMember1")
	@ResponseBody
	public Map<String, Object> deleteTeamMember(Team team, HttpServletRequest request){
		
		return teamService.deleteTeamMember1(team);
	}
	
	/**
	 * 更换团队的成员
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "updateTeamMember")
	@ResponseBody
	public Map<String, Object> updateTeamMember(Team team, HttpServletRequest request){
		
		return teamService.updateTeamMember(team);
	}
	
	
	/**
	 * 根据团队ID查找团队成员
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findAllMemberOfOneTeam")
	@ResponseBody
	public Map<String, Object> findAllMemberOfOneTeam(Team team, HttpServletRequest request){
		
		return teamService.findAllMemberOfOneTeamToMap(team);
	}
	
	/**
	 * 根据空间ID查找空间下所有的团队，包括团队下所有的成员和所有项目
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findAllTeamOfOneSpace")
	@ResponseBody
	public Map<String, Object> findAllTeamOfOneSpace(Team team, HttpServletRequest request){
		
		return teamService.findAllTeamOfOneSpace(team);
	}
	
	/* write at the last ： what i do is what i want. */
	
	/**
	 * 新增团队
	 * @param team
	 * @return
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> save(@RequestBody Team team){
		if(teamService.saveTeam(team) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, teamService.get(team));
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "保存团队信息失败！");
	}
	
	/**
	 * 根据ID修改团队信息
	 * @param team
	 * @return
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> update(@RequestBody Team team){
		if(teamService.update(team) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, teamService.get(team));
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "修改团队信息失败！");
	}
	
	/**
	 * 根据ID删除团队
	 * @param team
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> delete(@RequestBody Team team){
		if(teamService.deleteTeam(team) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, team.getId());
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "删除团队信息失败！");
	}
	
	/**
	 * 添加团队成员
	 * @param team
	 * @return
	 */
	@RequestMapping(value = "saveteammember", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveTeamMember(@RequestBody Team team){
		if(teamService.saveTeamMember(team) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, "添加团队成员成功！");
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "添加团队成员失败！");
	}
	
	/**
	 * 删除团队成员
	 * @param team
	 * @return
	 */
	@RequestMapping(value = "deleteteammember", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteTeamMember(@RequestBody Team team){
		if(teamService.deleteTeamMember(team) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, "删除团队成员成功！");
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "删除团队成员失败！");
	}
	
	/**
	 * 根据ID查询团队信息及其成员列表
	 * @param team
	 * @return
	 */
	@RequestMapping(value = "query", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> query(@RequestBody Team team){
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, teamService.find(team));
	}
	
	/**
	 * 查询当前登录用户在当前空间下参与的团队列表
	 * @param team
	 * @return
	 */
	@RequestMapping(value = "querylist", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> queryList(@RequestBody Team team){
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, teamService.findList(team));
	}
	
	/**
	 * 跨空间：个人所在空间所有团队列表
	 * @param team
	 * @return
	 */
	@RequestMapping(value = "querylistignorespace", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> queryListIgnoreSpace(@RequestBody Team team){
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, teamService.findListIgnoreSpace(team));
	}
	
	/**
	 * 批量添加团队成员
	 * @param team
	 * @return
	 */
	@RequestMapping(value = "saveteammembers", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveTeamMembers(@RequestBody Team team){
		if(teamService.saveTeamMembers(team) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, "添加团队成员成功！");
		}else{
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "添加团队成员失败！");
		}
	}
	
	/**
	 * 批量删除团队成员
	 * @param team
	 * @return
	 */
	@RequestMapping(value = "deleteteammembers", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteTeamMembers(@RequestBody Team team){
		if(teamService.deleteTeamMembers(team) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, "删除团队成员成功！");
		}else{
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "删除团队成员失败！");
		}
	}
	
}