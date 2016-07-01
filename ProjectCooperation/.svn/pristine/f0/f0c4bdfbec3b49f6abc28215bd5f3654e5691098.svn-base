package com.bt.surfond.task.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.dynamic.service.DynamicService;
import com.bt.surfond.group.service.GroupService;
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.poj.utils.JsonUtils;

/**
 * 项目与任务信息Controller
 * @author dyl
 * @version 2015-09-30
 */
@Controller
@RequestMapping(value = "${adminPath}/task")
public class ProjectTaskController extends BaseController {

	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private DynamicService dynamicService;
	
	@Autowired
	private GroupService groupService;
	
	//================================项目从此处开始
	
	/**
	 * 创建项目
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "saveproject")
	public Map<String, Object> saveProject(ProjectTask project){
		projectTaskService.saveProject(project);
		return JsonUtils.jsonStringTo(project);
	}
	
	/**
	 * 创建团队下项目
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "saveteamproject")
	public Map<String, Object> saveTeamProject(ProjectTask project){
		projectTaskService.saveTeamProject(project);
		return JsonUtils.jsonStringTo(project);
	}
	
	/**
	 * 查询项目列表
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findprojectlist")
	public Map<String, Object> findProjectList(ProjectTask project){
		return JsonUtils.jsonStringTo(projectTaskService.findProjectList(project));
	}
	
	/**
	 * 查询项目列表
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findallprojectlist")
	public Map<String, Object> findAllProjectList(ProjectTask project){
		return JsonUtils.jsonStringTo(projectTaskService.findAllProjectList(project));
	}
	
	/**
	 * 主键查询项目
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findproject")
	public Map<String, Object> findProject(ProjectTask project){
		return JsonUtils.jsonStringTo(projectTaskService.findProject(project));
	}
	
	/**
	 * 修改项目状态
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatestatusbyprojectid")
	public Map<String, Object> updateStatusByProjectId(ProjectTask project){
		projectTaskService.updateStatusByProjectId(project);
		return JsonUtils.jsonStringTo(project);
	}
	
	/**
	 * 移除项目成员
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deleteprojectmember")
	public Map<String, Object> deleteProjectMember(ProjectTask project){
		projectTaskService.deleteProjectMember(project.getProjectId(), project.getUserId());
		return JsonUtils.jsonStringTo(project);
	}
	
	/**
	 * 逻辑删除项目
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deleteproject")
	public Map<String, Object> deleteProject(ProjectTask project){
		projectTaskService.deleteProject(project);
		return JsonUtils.jsonStringTo(project);
	}
	
	/**
	 * 修改项目部分信息
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatepartinfobyprojectid")
	public Map<String, Object> updatePartInfoByProjectId(ProjectTask project){
		projectTaskService.updatePartInfoByProjectId(project);
		return JsonUtils.jsonStringTo(project);
	}
	
	/**
	 * 查询项目成员列表
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findprojectmemberlist")
	public Map<String, Object> findProjectMemberList(ProjectTask project){
		return JsonUtils.jsonStringTo(projectTaskService.findProjectMemberList(project));
	}
	
	/**
	 * 邀请项目成员
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "saveprojectmembers")
	public Map<String, Object> saveProjectMembers(ProjectTask project){
		return JsonUtils.jsonStringTo(projectTaskService.saveProjectMembers(project));
	}
	
	/**
	 * 查询团队列表及其所有团队成员列表和项目列表
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findteamlistbyspaceid")
	public Map<String, Object> findTeamListBySpaceId(ProjectTask project){
		return JsonUtils.jsonStringTo(projectTaskService.findTeamListBySpaceId(project)); 
	}
	
	/**
	 * 查询空间下的所有团队下的项目列表
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findteamprojectlist")
	public Map<String, Object> findTeamProjectList(ProjectTask project){
		return JsonUtils.jsonStringTo(projectTaskService.findTeamProjectList(project));
	}
	
	//================================项目到此处结束
	
	//================================任务从此处开始
	
	/**
	 * 创建项目下任务
	 * @param task
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "savetask")
	public Map<String, Object> saveTask(ProjectTask task, HttpServletRequest request){
		task.setIp(request.getRemoteAddr());
		projectTaskService.saveTask(task);
		return JsonUtils.jsonStringTo(projectTaskService.findTask(task));
	}
	
	/**
	 * 创建空间下任务
	 * @param task
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "savemytask")
	public Map<String, Object> saveMyTask(ProjectTask task, HttpServletRequest request){
		task.setIp(request.getRemoteAddr());
		projectTaskService.saveMyTask(task);
		return JsonUtils.jsonStringTo(projectTaskService.findTask(task));
	}
	
	/**
	 * 批量创建任务
	 * @param task
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "savetasks")
	public Map<String, Object> saveTasks(ProjectTask task, HttpServletRequest request){
		//获取json字符串
		String tasks = request.getParameter("data");
		//转换为json格式
		JSONObject jsonObj = new JSONObject(tasks);
		//获取json中的任务标题名称
		String result =jsonObj.optString("result");
		JSONObject jsonTask = new JSONObject(result);
		//获取节点数量
		String count =jsonObj.optString("count");
		String projectId = jsonObj.optString("projectId");
		//获取项目ID
		task.setProjectId(projectId);
		if(StringUtils.isNotBlank(count)){
			for(int i=0;i<Integer.parseInt(count);i++){
				task.setTitle(jsonTask.optString("data"+i));
				task.setIp(request.getRemoteAddr()); 
				projectTaskService.saveTask(task);
			}
		}
		return JsonUtils.jsonStringTo(projectTaskService.findTask(task));
	}
	
	/**
	 * 查询任务列表
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findtasklist")
	public Map<String, Object> findTaskList(ProjectTask task){
		return JsonUtils.jsonStringTo(projectTaskService.findTaskList(task));
	}
	
	/**
	 * 查询我的任务列表
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findmytasklist")
	public Map<String, Object> findMyTaskList(ProjectTask task){
		return JsonUtils.jsonStringTo(projectTaskService.findMyTaskList(task));
	}
	
	/**
	 * 查询标签下的任务列表
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findtagstasklist")
	public Map<String, Object> findTagsTaskList(ProjectTask task){
		return JsonUtils.jsonStringTo(projectTaskService.findTagsTaskList(task));
	}
	
	/**
	 * 主键查询任务
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findtask")
	public Map<String, Object> findTask(ProjectTask task){
		return JsonUtils.jsonStringTo(projectTaskService.findTask(task));
	}
	
	/**
	 * 修改任务标题
	 * @param task
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatetitlebytaskid")
	public Map<String, Object> updateTitleByTaskId(ProjectTask task, HttpServletRequest request){
		task.setIp(StringUtils.getRemoteAddr(request));
		projectTaskService.updateTitleByTaskId(task);
		return JsonUtils.jsonStringTo(task);
	}
	
	/**
	 * 修改任务描述
	 * @param task
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatedescriptionbytaskid")
	public Map<String, Object> updateDescriptionByTaskId(ProjectTask task, HttpServletRequest request){
		task.setIp(StringUtils.getRemoteAddr(request));
		projectTaskService.updateDescriptionByTaskId(task);
		return JsonUtils.jsonStringTo(task);
	}
	
	/**
	 * 标记/取消标记任务完成
	 * @param task
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatestatusbytaskid")
	public Map<String, Object> updateStatusByTaskId(ProjectTask task, HttpServletRequest request){
		task.setIp(request.getRemoteAddr());
		projectTaskService.updateStatusByTaskId(task);
		return JsonUtils.jsonStringTo(task);
	}
	
	/**
	 * 修改任务截止时间
	 * @param task
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updateduedatebytaskid")
	public Map<String, Object> updateDueDateByTaskId(ProjectTask task, HttpServletRequest request){
		if(StringUtils.isBlank(task.getDueDate())){
			task.setDueDate(null);
		}
		task.setIp(request.getRemoteAddr());
		projectTaskService.updateDueDateByTaskId(task);
		return JsonUtils.jsonStringTo(task);
	}
	
	/**
	 * 对任务点赞/取消点赞
	 * @param task
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "praisefortask")
	public Map<String, Object> praiseForTask(ProjectTask task, HttpServletRequest request){
		task.setIp(request.getRemoteAddr());
		projectTaskService.praiseForTask(task);
		return JsonUtils.jsonStringTo(task);
	}
	
	/**
	 * 逻辑删除任务
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deletetask")
	public Map<String, Object> deleteTask(ProjectTask task){
		projectTaskService.deleteTask(task);
		return JsonUtils.jsonStringTo(task);
	}
	
	/**
	 * 添加任务所属项目
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "addbelongtaskproject")
	public Map<String, Object> addBelongTaskProject(ProjectTask task){
		projectTaskService.addBelongTaskProject(task);
		return JsonUtils.jsonStringTo(task);
	}
	
	/**
	 * 修改任务所属项目
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatebelongtaskproject")
	public Map<String, Object> updateBelongTaskProject(ProjectTask task){
		projectTaskService.updateBelongTaskProject(task);
		return JsonUtils.jsonStringTo(task);
	}
	
	/**
	 * 修改任务负责人
	 * @param task
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value =  "updateownerbytaskid")
	public Map<String, Object> updateOwnerByTaskId(ProjectTask task, HttpServletRequest request){
		task.setIp(request.getRemoteAddr());
		projectTaskService.updateOwnerByTaskId(task);
		return JsonUtils.jsonStringTo(task);
	}
	
	/**
	 * 查询指定任务的子任务列表
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findsubtasklist")
	public Map<String, Object> findSubTaskList(ProjectTask task){
		return JsonUtils.jsonStringTo(projectTaskService.findSubTaskList(task));
	}
	
	/**
	 * 创建子任务
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "savesubtask")
	public Map<String, Object> saveSubTask(ProjectTask task){
		projectTaskService.saveSubTask(task);
		return JsonUtils.jsonStringTo(task);
	}
	
	//================================任务到此处结束
	
	
	
	/**
	 * 复制任务
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "copyTask")
	public Map<String, Object> copyTask(ProjectTask task) {
		return 	projectTaskService.copyTask(task);
	}
	
	/**
	 * 复制项目
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "copyProject")
	public Map<String, Object> copyProject(ProjectTask task) {
		return 	projectTaskService.copyProject(task);
	}
	
	
	/**
	 * 查找项目下的任务数
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findOneProjectTaskCount")
	public Map<String, Object> findOneProjectTaskCount(ProjectTask task) {
		return 	projectTaskService.findOneProjectTaskCount(task);
	}
		
}