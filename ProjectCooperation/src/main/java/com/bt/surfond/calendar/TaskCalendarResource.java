package com.bt.surfond.calendar;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.dynamic.service.DynamicService;
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.modules.poj.utils.JsonUtils;

/**
 * 项目图表信息
 * @author mjs
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/calendar")
public class TaskCalendarResource {
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private DynamicService dynamicService;
	
	
	/**
	 * 根据空间编号查询所有项目的日程
	 * @param task 表单必须传递参数：spaceId
	 * @return
	 */
	@RequestMapping(value = "findCalendar")
	@ResponseBody
	public Object findTeamCalendarBySpaceId(ProjectTask task){
		return CalendarUtil.setCalendar(projectTaskService.findCalendar(task));
	}
	
	/**
	 * 创建任务(日程)
	 * @param projectTask
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "saveCalendar")
	@ResponseBody
	public Map<String, Object> saveTask(ProjectTask projectTask, HttpServletRequest request){
		projectTaskService.saveTask(projectTask);
		return JsonUtils.jsonStringTo(projectTask);
	}
	
	/**
	 * 修改任务(日程)
	 * @param projectTask
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "updateTask")
	@ResponseBody
	public Map<String, Object> updateTask(ProjectTask projectTask, HttpServletRequest request){
		projectTaskService.saveTask(projectTask);
		return JsonUtils.jsonStringTo(projectTask);
	}
	
	
	/**
	 * 修改任务(日程拖拽事件触发)
	 * @param projectTask
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "setCalendarDrag")
	@ResponseBody
	public Map<String, Object> setCalendarDrag(ProjectTask projectTask, HttpServletRequest request){
		projectTaskService.updateDueDateByTaskId(projectTask);
		return JsonUtils.jsonStringTo(projectTask);
	}
	
	
	/**
	 * 查询项目日程
	 * @return
	 */
	@RequestMapping(value = "findProjectTaskCalendar")
	@ResponseBody
	public List<Map<String, String>> findProjectTaskCalendar(ProjectTask projectTask, HttpServletRequest request){
		return CalendarUtil.setCalendar(projectTaskService.findTaskList(projectTask));
	}
	
	/**
	 * 查询项目日程
	 * @return
	 */
	@RequestMapping(value = "findSpaceTaskCalendar")
	@ResponseBody
	public List<Map<String, String>> findSpaceTaskCalendar(ProjectTask projectTask, HttpServletRequest request){
		return CalendarUtil.setCalendar(projectTaskService.findMyTaskList(projectTask));
	}
	
}


