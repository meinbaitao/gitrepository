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

import com.bt.surfond.chart.service.ProjectChartService;
import com.bt.surfond.task.entity.ProjectTask;
import com.thinkgem.jeesite.common.utils.DateUtils;

/**
 * 项目图表信息
 * @author xiaocai
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/project/chart")
public class ProjectChartController {
	
	@Autowired
	private ProjectChartService projectChartService;
	
	/**
	 * 根据空间id获取当前用户的项目
	 * @param projectTask
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "getCurrentUserTeamBySpaceIdAndTitle")
	@ResponseBody
	public Map<String, Object> getCurrentUserTeamBySpaceIdAndTitle(ProjectTask projectTask, HttpServletRequest request){
		String spaceId = request.getParameter("spaceId");
		String title = request.getParameter("title");
		List<ProjectTask> list = projectChartService.getCurrentUserTeamBySpaceIdAndTitle(spaceId, title);
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("projectList", list);
		return map;
	}
	
	/**
	 * 任务完成量
	 * @param projectTask
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "taskDoneAmount")
	@ResponseBody
	public Map<String, Object> taskDoneAmount(ProjectTask projectTask, HttpServletRequest request){
		String projectId = request.getParameter("projectId");
		Date startDate = DateUtils.parseDate(request.getParameter("startDate"), DateUtils.YMD_HMS);
		Date endDate = DateUtils.parseDate(request.getParameter("endDate"), DateUtils.YMD_HMS);
		Map<String,Object> map = projectChartService.taskDoneAmount(projectId, startDate, endDate);
		return map;
	}
	
	/**
	 * 项目数据分析
	 * @param projectTask
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "analysiData")
	@ResponseBody
	public Map<String, Object> analysiData(ProjectTask projectTask, HttpServletRequest request){
		String projectId = request.getParameter("projectId");
		String dataType = request.getParameter("dataType");
		Date startDate = DateUtils.parseDate(request.getParameter("startDate"), DateUtils.YMD_HMS);
		Date endDate = DateUtils.parseDate(request.getParameter("endDate"), DateUtils.YMD_HMS);
		Map<String,Object> map = projectChartService.analysiData(projectId, dataType, startDate, endDate);
		return map;
	}
	/**
	 * 项目成员数据统计
	 * @param projectTask
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "memberDone")
	@ResponseBody
	public Map<String, Object> memberDone(ProjectTask projectTask, HttpServletRequest request){
		String projectId = request.getParameter("projectId");
		Date startDate = DateUtils.parseDate(request.getParameter("startDate"), DateUtils.YMD_HMS);
		Date endDate = DateUtils.parseDate(request.getParameter("endDate"), DateUtils.YMD_HMS);
		Map<String,Object> map = projectChartService.memberDone(projectId, startDate, endDate);
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


