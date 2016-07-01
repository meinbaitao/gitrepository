package com.bt.surfond.chart.web;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.chart.service.TeamChartService;
import com.bt.surfond.team.entity.Team;
import com.thinkgem.jeesite.common.utils.DateUtils;

/**
 * 项目图表信息
 * @author xiaocai
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/team/chart")
public class TeamChartController {
	
	@Autowired
	private TeamChartService teamChartService;
	
	/**
	 * 根据空间Id获取相关的团队列表数据
	 * @param team
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "getTeamsBySpaceId")
	@ResponseBody
	public Map<String, Object> getTeamsBySpaceId(Team team, HttpServletRequest request){
		String spaceId = request.getParameter("spaceId");
		String name = request.getParameter("name");
		List<Team> list = teamChartService.getCurrentUserTeamBySpaceIdAndName(spaceId,name);
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("teamList", list);
		return map;
	}
	/**
	 * 根据团队Id获取数据分析的报表数据
	 * @param team
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "getTeamChartDataAnalysisByTeamId")
	@ResponseBody
	public Map<String, Object> getTeamChartDataAnalysisByTeamId(Team team, HttpServletRequest request){
		String teamId = request.getParameter("teamId");
		String dateType = request.getParameter("dateType");
		Date startDate = DateUtils.parseDate(request.getParameter("startDate"), DateUtils.YMD_HMS);
		Date endDate = DateUtils.parseDate(request.getParameter("endDate"), DateUtils.YMD_HMS);
		Map<String,Object> map = teamChartService.dataAnalysis(teamId, dateType, startDate, endDate);
		return map;
	}
	/**
	 * 根据团队Id获取相关的任务量完成情况
	 * @param team
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "getTeamChartDoneAmountByTeamId")
	@ResponseBody
	public Map<String, Object> getTeamChartDoneAmountByTeamId(Team team, HttpServletRequest request){
		String teamId = request.getParameter("teamId");
		Date startDate = DateUtils.parseDate(request.getParameter("startDate"), DateUtils.YMD_HMS);
		Date endDate = DateUtils.parseDate(request.getParameter("endDate"), DateUtils.YMD_HMS);
		Map<String,Object> map = teamChartService.taskDoneAmount(teamId, startDate, endDate);
		return map;
	}
	/**
	 * 根据团队Id获取相关的成员数据
	 * @param team
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "getTeamChartMemberDoneByTeamId")
	@ResponseBody
	public Map<String, Object> getTeamChartMemberDoneByTeamId(Team team, HttpServletRequest request){
		String teamId = request.getParameter("teamId");
		Date startDate = DateUtils.parseDate(request.getParameter("startDate"), DateUtils.YMD_HMS);
		Date endDate = DateUtils.parseDate(request.getParameter("endDate"), DateUtils.YMD_HMS);
		Map<String,Object> map = teamChartService.memberDone(teamId, startDate, endDate);
		return map;
	}
	
	
//	@RequestMapping(value = "getChartBySpaceId")
//	@ResponseBody
//	public Map<String, Object> getChartBySpaceId(ProjectTask projectTask, HttpServletRequest request){
//		String spaceId = request.getParameter("spaceId");
//		Date startDate = DateUtils.parseDate(request.getParameter("startDate"), DateUtils.YMD);
//		Date endDate = DateUtils.parseDate(request.getParameter("endDate"), DateUtils.YMD);
////		Map<String,Object> map = projectChartService.getChartBySpaceId(spaceId, startDate, endDate);
//		Map<String,Object> map = spaceChartService.getChartBySpaceId(spaceId, null, null);
////		projectTask.setIp(StringUtils.getRemoteAddr(request));
////		projectTask.setSource(Constants.OPTION_PC);
////		projectTaskService.saveProject(projectTask);
////		return JsonUtils.jsonStringTo(projectTaskService.findProject(projectTask));
//		return map;
//	}
	
}


