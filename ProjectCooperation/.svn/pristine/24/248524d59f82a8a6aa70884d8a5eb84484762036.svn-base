package com.bt.mobile.rest.task;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.common.utils.UploadUtil;
import com.bt.surfond.dynamic.entity.Dynamic;
import com.bt.surfond.dynamic.service.DynamicService;
import com.bt.surfond.space.entity.Space;
import com.bt.surfond.space.service.SpaceService;
import com.bt.surfond.tags.entity.Tags;
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;




/**
 * 手机端接口
 * @author 
 * @version 2015-10-08
 */
@Controller
@RequestMapping(value = "${adminPath}/mobile/task")
public class TaskInfoMobileRsource extends BaseController {
	
	/**
	 * 空间服务层
	 */
	@Autowired
	private SpaceService spaceService;
	
	/**
	 * 动态服务层
	 */
	@Autowired
	private DynamicService dynamicService;
	/**
	 * 项目、任务服务层
	 */
	@Autowired
	private ProjectTaskService projectTaskService;
	
	/**
	 * 创建空间
	 * @param request
	 * @param response
	 * @return
	
	@RequestMapping(value ="createspace",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> createSpace(@RequestBody Space space, HttpServletRequest request, HttpServletResponse response) {
		spaceService.saveSpace(space);
		return JsonUtils.jsonString(spaceService.findSpace(space), "创建空间成功!", Constants.APP_STATUS_SUCCESS);
	}
	 */
	
	
	/**
	 * 查询空间列表
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="queryspacelist",method = RequestMethod.POST)
	public Map<String, Object> findSpaceList(@RequestBody Space space, HttpServletRequest request, HttpServletResponse response) {
		return JsonUtils.jsonString(spaceService.findSpaceList(space), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 查询空间成员列表
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="queryspacememberlist",method = RequestMethod.POST)
	public Map<String,Object> findSpaceMemberList(@RequestBody Space space,HttpServletRequest request, HttpServletResponse response) {
		return JsonUtils.jsonString(spaceService.findSpaceMemberList1(space), "", Constants.APP_STATUS_SUCCESS);
	}
	
	
	/**
	 * 创建项目
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value ="createproject",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> createProject(@RequestBody ProjectTask project,HttpServletRequest request, HttpServletResponse response) {
		project.setIp(StringUtils.getRemoteAddr(request));
		project.setSource(Constants.OPTION_PP);
		//负责人
		User user = new User();
		user.setId(project.getOwnerId());
		project.setUser(user);
		projectTaskService.saveProject(project);
		return JsonUtils.jsonString(projectTaskService.findProject(project), "创建项目成功!", Constants.APP_STATUS_SUCCESS);
	}

	
	/**
	 * 查询项目列表
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="queryprojectlist",method = RequestMethod.POST)
	public Map<String, Object> findProjectList(@RequestBody ProjectTask project,HttpServletRequest request, HttpServletResponse response) {
		
		return JsonUtils.jsonString(projectTaskService.findAppProjectList(project), "", Constants.APP_STATUS_SUCCESS);
	}
	
	
	/**
	 * 创建任务
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value ="createtask",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> createTask(HttpServletRequest request, HttpServletResponse response) {
		String jsonObject = request.getParameter("jsonObject");
		JSONObject json = new JSONObject(jsonObject);
		ProjectTask task = new ProjectTask();
		String ownerId = json.optString("ownerId");
		String title = json.optString("title");
		String description = json.optString("description");
		String projectId = json.optString("projectId");
		String spaceId = json.optString("spaceId");
		String dueDate = json.optString("dueDate");
		String tagsId = json.optString("tagsId");
		
		if(StringUtils.isNotBlank(ownerId)){
			User user = new User();
			user.setId(ownerId);
			task.setOwnerId(ownerId);
			task.setUser(user);
		}
		if(StringUtils.isNotBlank(title)){task.setTitle(title);}
		if(StringUtils.isNotBlank(description)){task.setDescription(description);}
		if(StringUtils.isNotBlank(projectId)){task.setProjectId(projectId);}
		if(StringUtils.isNotBlank(spaceId)){task.setSpaceId(spaceId);}
		if(StringUtils.isNotBlank(dueDate)){task.setDueDate(dueDate);}
		if(StringUtils.isNotBlank(tagsId)){task.setTagsId(tagsId);}
		
		task.setIp(StringUtils.getRemoteAddr(request));
		task.setSource(Constants.OPTION_PP);
		if(StringUtils.isNotBlank(projectId)){
			projectTaskService.saveTask(task);
		}else{
			projectTaskService.saveMyTask(task);
		}
		new UploadUtil().appFileUpload(request, task.getId(), task.getId(), Constants.TASK);
		return JsonUtils.jsonString(projectTaskService.findTask(task), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 修改任务标题
	 * @param task
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatetaskname", method = RequestMethod.POST)
	public Map<String, Object> updateTitleById(@RequestBody ProjectTask task){
		projectTaskService.updateTitleByTaskId(task);
		return JsonUtils.jsonString("", "", Constants.APP_STATUS_SUCCESS); 
	}
	
	
	/**
	 * 删除任务
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="deltask",method = RequestMethod.POST)
	public Map<String, Object> delTask(@RequestBody ProjectTask projectTask, HttpServletRequest request, HttpServletResponse response) {
		projectTaskService.delete(projectTask);
		return JsonUtils.jsonString("", "", Constants.APP_STATUS_SUCCESS);
	}

	/**
	 * 修改任务所属项目
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="updatebelongtaskproject",method = RequestMethod.POST)
	public Map<String, Object> updateBelongTaskProject(@RequestBody ProjectTask projectTask,HttpServletRequest request, HttpServletResponse response) {
		int result = 0;
		if(StringUtils.isBlank(projectTask.getProjectId())){
			result =projectTaskService.addBelongTaskProject(projectTask);
		}else{
			result =projectTaskService.updateBelongTaskProject(projectTask);
		}
		if(result> 0){
			return JsonUtils.jsonString(result, "成功", Constants.APP_STATUS_SUCCESS);
		}else{
			return JsonUtils.jsonString(result, "失败", Constants.APP_STATUS_FAIL);
		}
	}
	
	/**
	 * 修改任务描述
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="updatetaskdesc",method = RequestMethod.POST)
	public Map<String, Object> updateTaskDesc(@RequestBody ProjectTask task,HttpServletRequest request, HttpServletResponse response) {
		task.setIp(StringUtils.getRemoteAddr(request));
		task.setDynamicDescription(task.getDescription());
		projectTaskService.updateDescriptionByTaskId(task);
		return JsonUtils.jsonString("", "", Constants.APP_STATUS_SUCCESS);
	}
	
	
	/**
	 * 修改任务责任人
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="updatetaskpersonliable",method = RequestMethod.POST)
	public Map<String, Object> updateTaskPersonLiable(@RequestBody ProjectTask task,HttpServletRequest request, HttpServletResponse response) {
		task.setIp(StringUtils.getRemoteAddr(request));
		task.setSource(Constants.OPTION_PP);
		User user = new User();
		user.setId(task.getOwnerId());
		task.setUser(user);
		projectTaskService.updateOwnerByTaskId(task);
		return JsonUtils.jsonString("", "", Constants.APP_STATUS_SUCCESS);
	}
	
	
	/**
	 * 添加、修改、删除任务的截止日期（时间，及重复次数周期）
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="updatetaskenddate",method = RequestMethod.POST)
	public Map<String, Object> updateTaskEndDate(@RequestBody ProjectTask task,HttpServletRequest request, HttpServletResponse response) {
		task.setIp(StringUtils.getRemoteAddr(request));
		task.setDynamicDescription(task.getDescription());
		projectTaskService.updateDueDateByTaskId(task);
		return JsonUtils.jsonString("", "", Constants.APP_STATUS_SUCCESS);
	}
	
	
	/**
	 * 根据项目查询任务列表
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="querytasklist",method = RequestMethod.POST)
	public Map<String,Object> findTaskList(@RequestBody ProjectTask task,HttpServletRequest request, HttpServletResponse response) {
		if(StringUtils.isNotBlank(task.getOwnerId())){
			User user = new User();
			user.setId(task.getOwnerId());
			task.setUser(user);
		}
		if(StringUtils.isNotBlank(task.getCreateById())){
			User createBy = new User();
			createBy.setId(task.getCreateById());
			task.setCreateBy(createBy);
		}
		return JsonUtils.jsonString(projectTaskService.findTaskList(task), "", Constants.APP_STATUS_SUCCESS);
	}
	
	
	
	/**
	 * 查询我的任务列表
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="querymytasklist",method = RequestMethod.POST)
	public Map<String,Object> queryMyTaskList(@RequestBody ProjectTask task,HttpServletRequest request, HttpServletResponse response) {
		task.setCreateBy(UserUtils.getUser());
		task.setUser(UserUtils.getUser());
		task.setStatus(Constants.TASK_STATUS_UNDONE);
		return JsonUtils.jsonString(projectTaskService.findMyTaskList(task), "", Constants.APP_STATUS_SUCCESS);
	}
	
	
	/**
	 * 根据任务ID查询任务明细
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="querytaskdetail",method = RequestMethod.POST)
	public Map<String, Object> findTaskDetail(@RequestBody ProjectTask task,HttpServletRequest request, HttpServletResponse response) {
		task = projectTaskService.findTask(task);
		List<Tags> tagsList = new ArrayList<Tags>();
		if(StringUtils.isNotBlank(task.getTagsId())){
			String[] tagsIdArray = task.getTagsId().split(";");
			String[] tagsTitleArray = task.getTagsTitle().split(";");
			for(int i = 0; null != tagsIdArray && i < tagsIdArray.length; i++){
				Tags tags = new Tags();
				tags.setId(tagsIdArray[i]);
				tags.setTitle(tagsTitleArray[i]);
				tagsList.add(tags);
			}
		}
		task.setTagsList(tagsList);
		return JsonUtils.jsonString(task, "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 对任务点赞/取消点赞
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="taskpraise",method = RequestMethod.POST)
	public Map<String, Object> taskPraise(@RequestBody ProjectTask task,HttpServletRequest request, HttpServletResponse response) {
		int str = projectTaskService.praiseForTask(task);
		ProjectTask task_ = projectTaskService.get(task);
		Map<String, Object> resultMap = JsonUtils.jsonString(task_.getPraiseAmount(), "", Constants.APP_STATUS_SUCCESS);
		resultMap.put("optionType", str);
		return resultMap;
	}
	
	
	/**
	 * 根据任务ID查找任务的操作记录
	 * @param dynamic
	 * @param redirectAttributes
	 * @return
	 */
	@RequestMapping(value = "finddynamicbytask")
	@ResponseBody
	public Map<String, Object> findDynamicByTask(@RequestBody Dynamic dynamic,HttpServletRequest request,HttpServletResponse response) {
		return JsonUtils.jsonString(dynamicService.findTaskRecordList(dynamic), "success", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 根据当前用户查找与我相关的动态记录
	 * @param dynamic
	 * @param redirectAttributes
	 * @return
	 */
	@RequestMapping(value = "finddynamicbyuserid")
	@ResponseBody
	public Map<String, Object> findDynamicByUserId(HttpServletRequest request,HttpServletResponse response) {
		//return JsonUtils.jsonString(dynamicService.findDynamicByUserId(), "", Constants.APP_STATUS_SUCCESS);
		return JsonUtils.jsonString(dynamicService.findDynamicByUserId(), "success", Constants.APP_STATUS_SUCCESS);
	}
	
	
	/**
	 * 标记任务完成
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="marktaskfinish",method = RequestMethod.POST)
	public Map<String, Object> markTaskFinish(@RequestBody ProjectTask projectTask,HttpServletRequest request, HttpServletResponse response) {
		projectTaskService.updateStatusByTaskId(projectTask);
		return JsonUtils.jsonString(projectTask.getStatus(), "success", Constants.APP_STATUS_SUCCESS);
	}
	
}