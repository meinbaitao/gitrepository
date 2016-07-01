package com.bt.surfond.task.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.attachment.dao.AttachmentDao;
import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.dynamic.entity.Dynamic;
import com.bt.surfond.dynamic.service.DynamicService;
import com.bt.surfond.message.service.MessageService;
import com.bt.surfond.space.entity.Space;
import com.bt.surfond.tags.entity.Tags;
import com.bt.surfond.tags.service.TagsService;
import com.bt.surfond.task.dao.ProjectTaskDao;
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.team.entity.Team;
import com.bt.surfond.team.service.TeamService;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 项目与任务信息Service
 * @author dyl
 * @version 2015-09-30
 */
@Service
@Transactional(readOnly = true)
public class ProjectTaskService extends CrudService<ProjectTaskDao, ProjectTask> {
	
	@Autowired
	private ProjectTaskDao projectTaskDao; 
	
	@Autowired
	private TagsService tagsService;
	
	@Autowired
	private DynamicService dynamicService;
	
	@Autowired
	private AttachmentDao attachmentDao;
	
	@Autowired
	private MessageService messageService;
	
	@Autowired
	private TeamService teamService;
	
	//================================项目从此处开始
	
	/**
	 * 创建项目
	 * @param project
	 */
	@Transactional(readOnly = false)
	public int saveProject(ProjectTask project){
		project.setType(ProjectTask.TYPE_PROJECT);
		project.setStatus(ProjectTask.STATUS_PROJECT_NORMAL);
		project.setPraiseAmount(0);
		project.setSort(dao.findMaxProjectSort(project));
		//如果负责人为空则默认为当前创建者
		if(null !=project.getUser() && StringUtils.isBlank(project.getUser().getId())){
			project.setUser(UserUtils.getUser());
		}
		project.preInsert();
		dao.insert(project);
		//如果创建时直接取成员则迭代添加，否则添加当前创建人
		if(StringUtils.isNotBlank(project.getUserIds())){
			String[] arr = project.getUserIds().split(";");
			for(int i=0;i<arr.length;i++){
				this.saveProjectMember(project.getId(),arr[i]);
			}
		}else{
			this.saveProjectMember(project.getId(), UserUtils.getUser().getId());
		}
		return this.saveSpaceProject(project.getSpaceId(), project.getId());
	}
	
	/**
	 * 创建团队下项目
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveTeamProject(ProjectTask project){
		project.setType(ProjectTask.TYPE_PROJECT);
		project.setStatus(ProjectTask.STATUS_PROJECT_NORMAL);
		project.setPraiseAmount(0);
		project.setSort(dao.findMaxProjectSort(project));
		project.setUser(UserUtils.getUser());
		project.preInsert();
		List<User> teamUserList = teamService.findAllMemberOfOneTeam(new Team(project.getTeamId()));
		if(null != teamUserList){
			StringBuilder sb = new StringBuilder();
			for(User tu : teamUserList){
				sb.append(tu.getId()).append(";");
			}
			project.setUserIds(sb.toString());
			this.saveProjectMembers(project);
		}
		return dao.insert(project);
	}
	
	/**
	 * 保存项目-成员的关联关系
	 * @param projectId
	 * @param userId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveProjectMember(String projectId, String userId){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", IdGen.uuid());
		paramMap.put("recordId", projectId);
		paramMap.put("userId", userId);
		return dao.saveProjectTaskMember(paramMap);
	}
	
	/**
	 * 保存空间-项目的关联关系
	 * @param spaceId
	 * @param projectId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveSpaceProject(String spaceId, String projectId){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", IdGen.uuid());
		paramMap.put("spaceId", spaceId);
		paramMap.put("recordId", projectId);
		return dao.saveSpaceProjectTask(paramMap);
	}
	
	/**
	 * 删除项目-成员的关联关系
	 * @param projectId
	 * @param userId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteProjectMember(String projectId, String userId){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("recordId", projectId);
		paramMap.put("userId", userId);
		return dao.deleteProjectTaskMember(paramMap);
	}
	
	/**
	 * 查询项目列表
	 * @param project
	 * @return
	 */
	public List<ProjectTask> findProjectList(ProjectTask project){
		project.setType(ProjectTask.TYPE_PROJECT);
		return dao.findProjectList(project);
	}
	
	/**
	 * 查询项目列表
	 * @param project
	 * @return
	 */
	public List<ProjectTask> findAllProjectList(ProjectTask project){
		project.setType(ProjectTask.TYPE_PROJECT);
		return dao.findAllProjectList(project);
	}
	
	/**
	 * 主键查询项目
	 * @param project
	 * @return
	 */
	public ProjectTask findProject(ProjectTask project){
		return dao.findProject(project);
	}
	
	/**
	 * 修改项目状态
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateStatusByProjectId(ProjectTask project){
		project.preUpdate();
		return dao.updateStatusById(project);
	}
	
	/**
	 * 逻辑删除项目
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteProject(ProjectTask project){
		ProjectTask opt = this.findProject(project);
		int result = dao.delete(project);
		messageService.addMessageForDeleteProject(opt, project, this.findProjectMemberList(project));
		return result;
	}
	
	/**
	 * 修改项目部分信息
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updatePartInfoByProjectId(ProjectTask project){
		project.preUpdate();
		//处理项目成员的关系
		if(null != project.getUser() && StringUtils.isNotBlank(project.getUser().getId())){
			project.setUserIds(project.getUser().getId());
			this.saveProjectMembers(project);
		}
		return dao.updatePartInfoById(project);
	}
	
	/**
	 * 查询项目成员
	 * @param projectId
	 * @param userId
	 * @return
	 */
	public Map<String, Object> findProjectMember(String projectId, String userId){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("recordId", projectId);
		paramMap.put("userId", userId);
		paramMap.put("DEL_FLAG_NORMAL", ProjectTask.DEL_FLAG_NORMAL);
		return dao.findProjectTaskMember(paramMap);
	}
	
	/**
	 * 查询项目成员列表
	 * @param project
	 * @return
	 */
	public List<Map<String, Object>> findProjectMemberList(ProjectTask project){
		return dao.findProjectTaskMemberList(project);
	}
	
	/**
	 * 邀请项目成员
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> saveProjectMembers(ProjectTask project){
		ProjectTask opt = this.findProject(project);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if(StringUtils.isNotBlank(project.getUserIds())){
			StringBuilder remind = new StringBuilder();
			String[] userIdsArray = project.getUserIds().split(";");
			for(int i = 0; null != userIdsArray && i < userIdsArray.length; i++){
				String userId = userIdsArray[i];
				Map<String, Object> projectMember = this.findProjectMember(project.getId(), userId);
				if(null == projectMember){
					this.saveProjectMember(project.getId(), userId);
					remind.append(UserUtils.get(userId).getName() + " 已被邀请进入项目;");
					project.setUserId(userId);
					messageService.addMessageForInviteProjectMember(opt, project, this.findProjectMemberList(project));
				}else{
					remind.append(UserUtils.get(userId).getName() + " 已经是项目成员,无需重复邀请;");
				}
			}
			resultMap.put("remind", remind);
		}
		return resultMap;
	}
	
	/**
	 * 邀请项目成员
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveProjectMembersOfCopy(String projectId,String userId){
		return saveProjectMember(projectId, userId);
	}
	
	/**
	 * 查询团队列表及其所有团队成员列表和项目列表
	 * @param project
	 * @return
	 */
	public List<Team> findTeamListBySpaceId(ProjectTask project){
		project.setType(ProjectTask.TYPE_PROJECT);
		Team team = new Team();
		team.setSpaceId(project.getSpaceId());
		List<Team> teamList = teamService.findTeamListOfMine(team);
		if(null != teamList){
			for(Team t : teamList){
				t.setUsers(teamService.findAllMemberOfOneTeam(t));
				project.setTeamId(t.getId());
				t.setProjectTasks(dao.findTeamProjectList(project));
			}
		}
		return teamList;
		
	}
	
	/**
	 * 查询空间下的团队下的项目列表
	 * @param project
	 * @return
	 */
	public List<ProjectTask> findTeamProjectList(ProjectTask project){
		project.setType(ProjectTask.TYPE_PROJECT);
		return dao.findTeamProjectList(project);
	}
	
	//================================项目到此处结束
	
	//================================任务从此处开始
	
	/**
	 * 创建项目下任务
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveTask(ProjectTask task){
		task.setType(ProjectTask.TYPE_TASK);
		task.setStatus(ProjectTask.STATUS_TASK_UNDONE);
		task.setPraiseAmount(0);
		task.setSort(dao.findMaxTaskSort(task));
		task.preInsert();
		dao.insert(task);
		//开始记录
		Dynamic dynamic = new Dynamic();
		String description = "";
		if(null != task.getUser() && StringUtils.isNotBlank(task.getUser().getId())){
			if(UserUtils.getUser().getId().equals(task.getUser().getId())){
				description = " 创建了任务并将负责人指定为 自己";
			}else{
				description = " 创建了任务并将负责人指定为 " + UserUtils.get(task.getUser().getId()).getName();
			}
			dynamic.setAboutUserId(task.getUser().getId());
		}else{
			description = " 创建了任务";
		}
		dynamic.setTaskId(task.getId());
		dynamic.setDescription(description);
		dynamic.setRemoteAddr(task.getIp());
		dynamic.setResourceId(task.getSpaceId());
		dynamicService.saveTaskRecord(dynamic);
		//结束记录
		messageService.addMessageForCreateTaskAite(task);
		return this.saveProjectTaskMapping(task.getProjectId(), task.getId());
	}
	
	/**
	 * 创建空间下任务
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveMyTask(ProjectTask task){
		task.setType(ProjectTask.TYPE_TASK);
		task.setStatus(ProjectTask.STATUS_TASK_UNDONE);
		task.setPraiseAmount(0);
		task.setSort(dao.findMaxTaskSort(task));
		task.preInsert();
		dao.insert(task);
		//开始记录
		Dynamic dynamic = new Dynamic();
		String description = "";
		if(null != task.getUser() && StringUtils.isNotBlank(task.getUser().getId())){
			if(UserUtils.getUser().getId().equals(task.getUser().getId())){
				description = " 创建了任务并将负责人指定为 自己";
			}else{
				description = " 创建了任务并将负责人指定为 " + UserUtils.get(task.getUser().getId()).getName();
			}
			dynamic.setAboutUserId(task.getUser().getId());
		}else{
			description = " 创建了任务";
		}
		dynamic.setTaskId(task.getId());
		dynamic.setDescription(description);
		dynamic.setRemoteAddr(task.getIp());
		dynamic.setResourceId(task.getSpaceId());
		dynamicService.saveTaskRecord(dynamic);
		//结束记录
		return this.saveSpaceTask(task.getSpaceId(), task.getId());
	}
	
	/**
	 * 保存空间-任务的关联关系
	 * @param spaceId
	 * @param taskId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveSpaceTask(String spaceId, String taskId){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", IdGen.uuid());
		paramMap.put("spaceId", spaceId);
		paramMap.put("recordId", taskId);
		return dao.saveSpaceProjectTask(paramMap);
	}
	
	/**
	 * 保存项目-任务的关联关系
	 * @param projectId
	 * @param taskId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveProjectTaskMapping(String projectId, String taskId) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", IdGen.uuid());
		paramMap.put("projectId", projectId);
		paramMap.put("taskId", taskId);
		return dao.saveProjectTaskMapping(paramMap);
	}
	
	/**
	 * 查询项目任务列表
	 * @param task
	 * @return
	 */
	public List<ProjectTask> findTaskList(ProjectTask task){
		task.setType(ProjectTask.TYPE_TASK);
		return dao.findTaskList(task);
	}
	
	/**
	 * 查询我的任务列表
	 * @param task
	 * @return
	 */
	public List<ProjectTask> findMyTaskList(ProjectTask task){
		task.setType(ProjectTask.TYPE_TASK);
		return dao.findMyTaskList(task);
	}
	
	/**
	 * 查询标签下的任务列表
	 * @param task
	 * @return
	 */
	public List<ProjectTask> findTagsTaskList(ProjectTask task){
		task.setType(ProjectTask.TYPE_TASK);
		return dao.findTagsTaskList(task);
	}
	
	/**
	 * 主键查询任务
	 * @param task
	 * @return
	 */
	public ProjectTask findTask(ProjectTask task){
		task.setPraiseType(Constants.PRAISE_TYPE_TASK);
		return dao.findTask(task);
	}
	
	/**
	 * 修改任务标题
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateTitleByTaskId(ProjectTask task){
		task.preUpdate();
		//开始记录
		Dynamic dynamic = new Dynamic();
		dynamic.setTaskId(task.getId());
		dynamic.setDescription(" 将标题修改为 " + task.getTitle());
		dynamic.setRemoteAddr(task.getIp());
		dynamic.setResourceId(task.getSpaceId());
		dynamicService.saveTaskRecord(dynamic);
		//结束记录
		return dao.updateTitleById(task);
	}
	
	/**
	 * 修改任务描述
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateDescriptionByTaskId(ProjectTask task){
		task.preUpdate();
		//开始记录
		Dynamic dynamic = new Dynamic();
		dynamic.setTaskId(task.getId());
		dynamic.setDescription(" 将描述修改为 " + task.getDynamicDescription());
		dynamic.setRemoteAddr(task.getIp());
		dynamic.setResourceId(task.getSpaceId());
		dynamicService.saveTaskRecord(dynamic);
		//结束记录
		return dao.updateDescriptionById(task);
	}
	
	/**
	 * 标记/取消标记任务完成
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateStatusByTaskId(ProjectTask task){
		ProjectTask t = this.get(task);
		String status = ProjectTask.STATUS_TASK_DONE;
		String finishDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		if(ProjectTask.STATUS_TASK_DONE.equals(t.getStatus())){
			status = ProjectTask.STATUS_TASK_UNDONE;
			finishDate = null;
		}
		task.setStatus(status);
		task.setFinishDate(finishDate);
		task.preUpdate();
		//开始记录
		Dynamic dynamic = new Dynamic();
		String description = "";
		if(ProjectTask.STATUS_TASK_DONE.equals(status)){
			description = " 将状态修改为 [已完成]";
		}else{
			description = " 将状态修改为 [未完成]";
		}
		dynamic.setTaskId(task.getId());
		dynamic.setDescription(description);
		dynamic.setRemoteAddr(task.getIp());
		dynamic.setResourceId(task.getSpaceId());
		dynamicService.saveTaskRecord(dynamic);
		//结束记录
		ProjectTask opt = this.findTask(task);
		int result = dao.updateStatusById(task);
		messageService.addMessageForUpdateTaskStatus(opt, task);
		return result;
	}
	
	/**
	 * 修改任务截止时间
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateDueDateByTaskId(ProjectTask task){
		task.preUpdate();
		//开始记录
		Dynamic dynamic = new Dynamic();
		String description = "";
		if(StringUtils.isNotBlank(task.getDueDate())){
			description = " 将截止时间修改为 " + task.getDueDate();
		}else{
			description = " 将截止时间清空了";
		}
		dynamic.setTaskId(task.getId());
		dynamic.setDescription(description);
		dynamic.setRemoteAddr(task.getIp());
		dynamic.setResourceId(task.getSpaceId());
		dynamicService.saveTaskRecord(dynamic);
		//结束记录
		ProjectTask opt = this.findTask(task);
		int result = dao.updateDueDateById(task);
		messageService.addMessageForUpdateTaskDueDate(opt, task);
		return result;
	}
	
	/**
	 * 保存任务-成员点赞关联关系
	 * @param userId
	 * @param taskId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveMemberPraiseForTask(String userId, String taskId){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", IdGen.uuid());
		paramMap.put("userId", userId);
		paramMap.put("recordId", taskId);
		paramMap.put("type", Constants.PRAISE_TYPE_TASK);
		return dao.saveMemberPraise(paramMap);
	}
	
	/**
	 * 查询任务-成员点赞的关联关系
	 * @param userId
	 * @param taskId
	 * @return
	 */
	public Map<String, Object> findMemberPraiseForTask(String userId, String taskId){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("userId", userId);
		paramMap.put("recordId", taskId);
		return dao.findMemberPraise(paramMap);
	}
	
	/**
	 * 删除任务-成员点赞的关联关系
	 * @param userId
	 * @param taskId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteMemberPraiseForTask(String userId, String taskId){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("userId", userId);
		paramMap.put("recordId", taskId);
		return dao.deleteMemberPraise(paramMap);
	}
	
	/**
	 * 对任务点赞/取消点赞
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int praiseForTask(ProjectTask task){
		String praiseFlag = "0";
		Map<String, Object> memberPraise = this.findMemberPraiseForTask(UserUtils.getUser().getId(), task.getId());
		if(null == memberPraise){//点赞
			this.saveMemberPraiseForTask(UserUtils.getUser().getId(), task.getId());
			dao.updatePraiseAmountUpById(task);
			praiseFlag = "1";
		}else{//取消点赞
			this.deleteMemberPraiseForTask(UserUtils.getUser().getId(), task.getId());
			dao.updatePraiseAmountDownById(task);
		}
		//开始记录
		Dynamic dynamic = new Dynamic();
		String description = "";
		if("1".equals(praiseFlag)){
			description = " 点赞了";
		}else{
			description = " 取消点赞了";
		}
		dynamic.setTaskId(task.getId());
		dynamic.setDescription(description);
		dynamic.setRemoteAddr(task.getIp());
		dynamic.setResourceId(task.getSpaceId());
		dynamicService.saveTaskRecord(dynamic);
		//结束记录
		return Integer.parseInt(praiseFlag);
	}
	
	/**
	 * 逻辑删除任务
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteTask(ProjectTask task){
		ProjectTask opt = this.findTask(task);
		int result = dao.delete(task);
		messageService.addMessageForDeleteTask(opt, task);
		return result;
	}
	
	/**
	 * 删除空间-任务的关联关系
	 * @param spaceId
	 * @param taskId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteSpaceTask(String spaceId, String taskId){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("spaceId", spaceId);
		paramMap.put("recordId", taskId);
		return dao.deleteSpaceProjectTask(paramMap);
	}
	
	/**
	 * 删除项目-任务的关联关系
	 * @param projectId
	 * @param taskId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteProjectTaskMapping(String projectId, String taskId){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("projectId", projectId);
		paramMap.put("taskId", taskId);
		return dao.deleteProjectTaskMapping(paramMap);
	}
	
	/**
	 * 添加任务所属项目
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int addBelongTaskProject(ProjectTask task){
		if(StringUtils.isNotBlank(task.getId()) 
				&& StringUtils.isNotBlank(task.getSpaceId()) 
					&& StringUtils.isNotBlank(task.getNewProjectId())){
			//删除空间-任务的关联关系
			this.deleteSpaceTask(task.getSpaceId(), task.getId());
			//添加项目-任务的关联关系
			return this.saveProjectTaskMapping(task.getNewProjectId(), task.getId());
		}
		return 0;
	}
	
	/**
	 * 修改任务所属项目
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateBelongTaskProject(ProjectTask task){
		if(StringUtils.isNotBlank(task.getId()) 
				&& StringUtils.isNotBlank(task.getProjectId()) 
					&& StringUtils.isNotBlank(task.getNewProjectId())){
			//删除项目-任务的关联关系(旧)
			this.deleteProjectTaskMapping(task.getProjectId(), task.getId());
			//添加项目-任务的关联关系(新)
			return this.saveProjectTaskMapping(task.getNewProjectId(), task.getId());
		}
		return 0;
	}
	
	/**
	 * 修改任务负责人
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateOwnerByTaskId(ProjectTask task){
		task.preUpdate();
		//开始记录
		Dynamic dynamic = new Dynamic();
		String description =  "";
		if(null != task.getUser() && StringUtils.isNotBlank(task.getUser().getId())){
			if(UserUtils.getUser().getId().equals(task.getUser().getId())){
				description = " 将负责人修改为 自己";
			}else{
				description = " 将负责人修改为 " + UserUtils.get(task.getUser().getId()).getName();
			}
			dynamic.setAboutUserId(task.getUser().getId());
		}else{
			description = " 将负责人清除了";
		}
		dynamic.setTaskId(task.getId());
		dynamic.setDescription(description);
		dynamic.setRemoteAddr(task.getIp());
		dynamic.setResourceId(task.getSpaceId());
		dynamicService.saveTaskRecord(dynamic);
		//结束记录
		ProjectTask opt = this.findTask(task);
		int result = dao.updateOwnerById(task);
		messageService.addMessageForUpdateTaskOwner(opt, task);
		//检查成员的关系
		if(StringUtils.isNotBlank(opt.getProjectId()) 
				&& null != task.getUser() 
					&& StringUtils.isNotBlank(task.getUser().getId())){//该任务是项目下任务,且指派了新负责人,因此需要处理项目成员的关系
			ProjectTask project = new ProjectTask(opt.getProjectId());
			project.setUserIds(task.getUser().getId());
			project.setSpaceId(task.getSpaceId());
			this.saveProjectMembers(project);
		}
		return result;
	}
	
	/**
	 * 查询指定任务的子任务列表
	 * @param task
	 * @return
	 */
	public List<ProjectTask> findSubTaskList(ProjectTask task){
		return dao.findSubTaskList(task);
	}
	
	/**
	 * 创建子任务
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveSubTask(ProjectTask task){
		task.setType(ProjectTask.TYPE_TASK);
		task.setStatus(ProjectTask.STATUS_TASK_UNDONE);
		task.setPraiseAmount(0);
		task.setSort(dao.findMaxTaskSort(task));
		task.preInsert();
		return dao.insert(task);
	}
	
	//================================任务到此处结束
	
	/**
	 * 日程查询
	 * @param projectTask
	 * @return
	 */
	public List<ProjectTask> findCalendar(ProjectTask projectTask){
		List<ProjectTask> list = new ArrayList<ProjectTask>();
		projectTask.setType(Constants.PROJECTTASK_TYPE_TASK);
		if("0".equals(projectTask.getNextId())){
			//list = dao.findMyTaskList(projectTask);
		}else if("1".equals(projectTask.getNextId())){
			//list = dao.findTaskList(projectTask);
		}else if("2".equals(projectTask.getNextId())){
			projectTask.setOtherType(Constants.PROJECTTASK_TYPE_PROJECT);
			//list = dao.findMemberTaskList(projectTask);
		}else if("3".equals(projectTask.getNextId())){
			//list = dao.findTagsTaskList(projectTask);
		}
		return list;
	}

	/**
	 * 根据条件统计相关数据
	 * @param map
	 * @return
	 */
	public int countTaskByCondition(Map<String, Object> map){
		map = this.initMap(map);
		return projectTaskDao.countTaskByCondition(map);
	}
	/**
	 * 根据条件统计相关列表数据
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> getCountTaskByCondition(Map<String, Object> map){
		map = this.initMap(map);
		List<Map<String, Object>> list = dao.getCountTaskByCondition(map);
		if(list==null){
			list = new ArrayList<Map<String, Object>>();
		}
		return list;
	}
	/**
	 * 根据项目id进行分组统计项目数据
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> countProjectTaskByCondition(Map<String, Object> map){
		map = this.initMap(map);
		List<Map<String, Object>> list = projectTaskDao.countProjectTaskByCondition(map);
		if(list==null){
			list = new ArrayList<Map<String, Object>>();
		}
		return list;
	}
	private Map<String, Object> initMap(Map<String, Object> map){
		map.put("DEL_FLAG_NORMAL", Space.DEL_FLAG_NORMAL);
		map.put("projectType", Constants.PROJECTTASK_TYPE_PROJECT);
		map.put("taskType", Constants.PROJECTTASK_TYPE_TASK);
		map.put("currentUserId", UserUtils.getUser().getId());
		if(map.containsKey("taskStatus")){
			if(Constants.TASK_STATUS_DONE.equals(map.get("taskStatus").toString())){
				map.put("isFinish", "done");
			}else{
				map.put("isFinish", "unDone");
			}
		}else{
			map.put("isFinish", "all");
		}
		return map;
	}

	/**
	 * 复制任务
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> copyTask(ProjectTask task) {
		copyTaskOption(task,null);
		return JsonUtils.jsonString("success", "success", "1");
	}
	
	public void copyTaskOption(ProjectTask task,String newPrjectId){
		String taskId = task.getId();
		ProjectTask projectTask = findTask(task);
		
		ProjectTask pro = new ProjectTask();
		pro.setSpaceId(task.getSpaceId());
		pro.setTitle(task.getTitle());								//标题
		if(StringUtils.isNotBlank(task.getDueDate())){				//截止日期
			pro.setDueDate(projectTask.getDueDate());
		}
		if(StringUtils.isNotBlank(task.getUserId())){				//负责人
			User user = new User();
			if(null!=projectTask.getUser()){
				user.setId(projectTask.getUser().getId());
			}
			pro.setUser(user);
		}
		if(StringUtils.isNotBlank(task.getDescription())){			//描述
			pro.setDescription(projectTask.getDescription());
		}
		int num = 0;
		if(StringUtils.isNotBlank(task.getProjectId())){
			if(StringUtils.isNotBlank(newPrjectId)){
				pro.setProjectId(newPrjectId);
			}else{
				pro.setProjectId(projectTask.getProjectId());
			}
			num = saveTask(pro);
		}else{
			num = saveMyTask(pro);
		}
		if(num>0){
			String newTaskId = pro.getId();
			if(StringUtils.isNotBlank(task.getSubTask())){			//子任务
				ProjectTask p = new ProjectTask();
				p.setParentId(taskId);
				List<ProjectTask> list = findSubTaskList(p);
				for (ProjectTask pr : list) {
					pr.setId(IdGen.uuid());
					pr.setParentId(newTaskId);
					saveSubTask(pr);
				}
			}
			if(StringUtils.isNotBlank(task.getTags())){				//标签
				Tags tag = new Tags();
				tag.setTaskId(task.getId());
				List<Tags> tags = tagsService.findTaskTags(tag);
				for (Tags t : tags) {
					t.setTaskId(newTaskId);
					tagsService.saveTagsTask(t);
				}
			}
			if(StringUtils.isNotBlank(task.getAttachment())){		//附件
				Attachment attachment = new Attachment();
				attachment.setTaskId(taskId);
				List<Attachment> attachments = attachmentDao.findAttachmentByTaskId(attachment);
				for (Attachment att : attachments) {
					att.setIsNewRecord(true);
					att.setTaskId(newTaskId);
					att.setId(IdGen.uuid());
					att.preInsert();
					attachmentDao.insert(att);
				}
			}
		}
	}

	/**
	 * 复制项目
	 * @param task
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> copyProject(ProjectTask task) {
		ProjectTask projectTask = findProject(task);
		ProjectTask pro = new ProjectTask();
		pro.setSpaceId(task.getSpaceId());
		pro.setTitle(task.getTitle()); 							//标题
		if(StringUtils.isNotBlank(task.getDescription())){		//描述
			pro.setDescription(projectTask.getDescription());
		}
		if(StringUtils.isNotBlank(task.getUserId())){			//负责人
			if(null!=projectTask.getUser()){
				User user = new User();
				user.setId(projectTask.getUser().getId());
				pro.setUser(user);
			}
		}
		int num = 0;
		if(StringUtils.isNotBlank(projectTask.getTeamId())){
			pro.setTeamId(projectTask.getTeamId());
			num = saveTeamProject(pro);
		}else{
			num = saveProject(pro);
		}
		if(num>0){
			if(StringUtils.isNotBlank(task.getMembers())){			//成员
				List<Map<String, Object>> members =  findProjectMemberList(task);
				for (Map<String, Object> map : members) {
					String userId = map.get("id").toString();
					if(StringUtils.isNotBlank(userId)){
						if(!UserUtils.getUser().getId().equals(userId)){
							saveProjectMembersOfCopy(pro.getId(),userId);
						}
					}
				}
			}
			if(StringUtils.isNotBlank(task.getTask())){				//任务
				ProjectTask pt = new ProjectTask();
				pt.setProjectId(task.getId());
				List<ProjectTask> tasks = findTaskList(pt);
				for (ProjectTask t : tasks) {
					t.setDescription("1");
					t.setUserId("1");
					t.setSubTask("1");
					t.setAttachment("1");
					t.setTags("1");
					t.setProjectId("1");
					t.setDueDate("1");
					t.setSpaceId(task.getSpaceId());
					copyTaskOption(t,pro.getId());
				}
			}
		}
		return JsonUtils.jsonString(pro, "success", "1");
	}
	/**
	 * 获取当前用户相关的项目
	 * @param projectTask
	 * @return
	 */
	public List<ProjectTask> getCurrentUserProject(ProjectTask projectTask){
		projectTask.setType(ProjectTask.TYPE_PROJECT);
		List<ProjectTask> list = projectTaskDao.getCurrentUserProject(projectTask);
		if(list==null){
			list = new ArrayList<ProjectTask>();
		}
		return list;
	}
	
	/**
	 * 根据空间Id获取当前用户相关的团队信息
	 * @param spaceId
	 * @return
	 */
	public List<ProjectTask> getCurrentUserProjectBySpaceIdAndTitle(String spaceId,String title){
		ProjectTask projectTask = new ProjectTask();
		projectTask.setSpaceId(spaceId);
		projectTask.setTitle(title);
		return this.getCurrentUserProject(projectTask);
	}
	
	public int countSpaceProjectTaskByCondition(Map<String, Object> map){
		map = this.initMap(map);
		return projectTaskDao.countSpaceProjectTaskByCondition(map);
	}
	
	public List<Map<String, Object>> getCountSpaceProjectTaskByCondition(Map<String, Object> map){
		map = this.initMap(map);
		List<Map<String, Object>> list = projectTaskDao.getCountTaskByCondition(map);
		if(list==null){
			list = new ArrayList<Map<String, Object>>();
		}
		return list;
	}
	public List<Map<String, Object>> sumPraiseAmountByCondition(Map<String, Object> map){
		map = this.initMap(map);
		List<Map<String, Object>> list = projectTaskDao.sumPraiseAmountByCondition(map);
		if(list==null){
			list = new ArrayList<Map<String, Object>>();
		}
		return list;
	}
	public List<Map<String, Object>> getCountSpaceProjectTaskForChartLog(Map<String, Object> map){
		map = this.initMap(map);
		List<Map<String, Object>> list = projectTaskDao.getCountSpaceProjectTaskForChartLog(map);
		if(list==null){
			list = new ArrayList<Map<String, Object>>();
		}
		return list;
	}
	
	/**
	 * 手机端查询任务列表(包含团队名称)
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> findAppProjectList(ProjectTask projectTask){
		projectTask.setType(Constants.PROJECT);
		return projectTaskDao.findAppProjectList(projectTask);
	}

	/**
	 * 查找项目下的任务数
	 * @param task
	 * @return
	 */
	public Map<String, Object> findOneProjectTaskCount(ProjectTask task) {
		return JsonUtils.jsonString(projectTaskDao.findOneProjectTaskCount(task), "success", "1");
	}
	
}