package com.bt.surfond.team.web;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.team.entity.Team;
import com.bt.surfond.team.service.TeamService;
import com.thinkgem.jeesite.common.web.BaseController;

/**
 * 团队信息Controller
 * @author mjs
 * @version 2016-02-23
 */
@Controller
@RequestMapping(value = "${adminPath}/team")
public class TeamController extends BaseController {

	@Autowired
	private TeamService teamService;
	
	/**
	 * 新建一个团队信息
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "saveTeamInfo")
	@ResponseBody
	public Map<String, Object> saveTeamInfo(Team team, Model model, HttpServletRequest request){
		return teamService.saveTeamInfo(team);
	}
	
	/**
	 * 修改团队信息
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "updateTeamInfo")
	@ResponseBody
	public Map<String, Object> updateTeamInfo(Team team, Model model, HttpServletRequest request){
		return teamService.updateTeamInfo(team);
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
	public Map<String, Object> deleteTeamInfo(Team team, Model model, HttpServletRequest request){
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
	public Map<String, Object> addTeamMoreMember(Team team, Model model, HttpServletRequest request){
		return teamService.addTeamMoreMember(team);
	}
	
	/**
	 * 邀请团队的多个成员
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "inviteTeamMoreMember")
	@ResponseBody
	public Map<String, Object> inviteTeamMoreMember(Team team, Model model, HttpServletRequest request){
		return teamService.inviteTeamMoreMember(team);
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
	public Map<String, Object> updateTeamResponsibiliter(Team team, Model model, HttpServletRequest request){
		return teamService.updateTeamResponsibiliter(team);
	}
	
	
	/**
	 * 移除团队的成员
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "deleteTeamMember")
	@ResponseBody
	public Map<String, Object> deleteTeamMember(Team team, Model model, HttpServletRequest request){
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
	public Map<String, Object> updateTeamMember(Team team, Model model, HttpServletRequest request){
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
	public Map<String, Object> findAllMemberOfOneTeam(Team team, Model model, HttpServletRequest request){
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
	public Map<String, Object> findAllTeamOfOneSpace(Team team, Model model, HttpServletRequest request){
		return teamService.findAllTeamOfOneSpace(team);
	}
	
	
	/**
	 * 根据用户和空间查找用户所在的团队信息
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findAllTeamOfMine")
	@ResponseBody
	public Map<String, Object> findAllTeamOfMine(Team team, Model model, HttpServletRequest request){
		return teamService.findAllTeamOfMine(team);
	}
	
	/**
	 * 根据ID查找团队基本信息
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findOneTeamBaseInfo")
	@ResponseBody
	public Map<String, Object> findOneTeamBaseInfo(Team team, Model model, HttpServletRequest request){
		return teamService.findOneTeamBaseInfo(team);
	}
	
	/**
	 * 查找团队下存在的项目和话题数总和
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findOneTeamProjectAndConversationCount")
	@ResponseBody
	public Map<String, Object> findOneTeamProjectAndConversationCount(Team team, Model model, HttpServletRequest request){
		return teamService.findOneTeamProjectAndConversationCount(team);
	}
	
}