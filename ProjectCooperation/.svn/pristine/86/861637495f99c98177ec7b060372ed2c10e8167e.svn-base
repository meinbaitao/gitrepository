package com.bt.surfond.mobile.project;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.front.core.util.JsonUtils;
import com.bt.surfond.front.project.service.ProjectService;
import com.bt.surfond.task.entity.ProjectTask;
import com.thinkgem.jeesite.common.web.BaseController;

/**
 * 项目管理app接口
 * @author dyl
 *
 */
@Controller
@RequestMapping("${adminPath}/mobile/project")
public class ProjectMobileResource extends BaseController {
	
	@Autowired
	private ProjectService projectService;
	
	/**
	 * 新增项目（空间下的项目）
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> save(@RequestBody ProjectTask project){
		if(projectService.saveProject(project) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, projectService.get(project));
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "保存项目信息失败！");
	}
	
	/**
	 * 新增项目（团队下的项目）
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "saveinteam", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveInTeam(@RequestBody ProjectTask project){
		if(projectService.saveProjectInTeam(project) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, projectService.get(project));
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "保存项目信息失败！");
	}
	
	/**
	 * 根据ID查询项目信息
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "query", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> query(@RequestBody ProjectTask project){
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, projectService.get(project));
	}
	
	/**
	 * 根据ID修改项目信息
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> update(@RequestBody ProjectTask project){
		if(projectService.update(project) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, projectService.get(project));
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "修改项目信息失败！");
	}
	
	/**
	 * 根据ID删除项目
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> delete(@RequestBody ProjectTask project){
		if(projectService.deleteProject(project) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, project.getId());
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "删除项目信息失败！");
	}
	
	/**
	 * 添加项目成员
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "saveprojectmember", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveProjectMember(@RequestBody ProjectTask project){
		if(projectService.saveProjectMember(project) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, "添加项目成员成功！");
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "添加项目成员失败！");
	}
	
	/**
	 * 删除项目成员
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "deleteprojectmember", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteProjectMember(@RequestBody ProjectTask project){
		if(projectService.deleteProjectMember(project) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, "删除项目成员成功！");
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "删除项目成员失败！");
	}
	
	/**
	 * 查询项目成员列表
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "queryprojectmemberlist", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> queryProjectMemberList(@RequestBody ProjectTask project){
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, projectService.findProjectMemberList(project));
	}
	
	/**
	 * 批量添加项目成员
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "saveprojectmembers", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveProjectMembers(@RequestBody ProjectTask project){
		if(projectService.saveProjectMembers(project) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, "添加项目成员成功！");
		}else{
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "添加项目成员失败！");
		}
	}
	
	/**
	 * 批量删除项目成员
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "deleteprojectmembers", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteProjectMembers(@RequestBody ProjectTask project){
		if(projectService.deleteProjectMembers(project) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, "删除项目成员成功！");
		}else{
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "删除项目成员失败！");
		}
	}

}
