package com.bt.surfond.team.service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.conversation.entity.Conversation;
import com.bt.surfond.front.project.service.ProjectService;
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.team.dao.TeamDao;
import com.bt.surfond.team.entity.Team;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 团队service层
 * @author dyl
 *
 */
@Service
@Transactional(readOnly = true)
public class TeamService extends CrudService<TeamDao, Team> {
	
	@Autowired
	private TeamDao teamDao;
	
	public void save(Team team){
		super.save(team);
	}
	
	public void delete(Team team){
		super.delete(team);
	}
	
	public Team get(String id){
		return super.get(id);
	}
	
	/**
	 * 新建一个团队信息
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> saveTeamInfo(Team team){
		if(StringUtils.isNotBlank(team.getUserId())){
			User user = new User();
			user.setId(team.getUserId());
			team.setUser(user);
		}else{
			team.setUser(UserUtils.getUser());
		}
		save(team);
		if(StringUtils.isNotBlank(team.getMembersId())){
			String[] userIds = team.getMembersId().split(";");
			for (String str : userIds) {
				if(findTeamMemberMapping(team.getId(), str)==null){
					if(str.equals(UserUtils.getUser().getId())){
						addTeamOneMember(team.getId(), str, Constants.MANAGE_TYPE);
					}else{
						addTeamOneMember(team.getId(), str, team.getType());
					}
				}
			}
		}else{
			addTeamOneMember(team.getId(), UserUtils.getUser().getId(), Constants.MANAGE_TYPE);
		}
		if(null != team.getUser()){
			if(findTeamMemberMapping(team.getId(), team.getUser().getId())==null){
				addTeamOneMember(team.getId(), team.getUser().getId(), Constants.MANAGE_TYPE);
			}
		}
		return JsonUtils.jsonString(team, "success", "1");
	}
	
	@Transactional(readOnly = false)
	public Map<String, Object> updateTeamInfo(Team team){
		Team te = get(team);
		te.setName(team.getName());
		if(StringUtils.isNotBlank(team.getUserId())){
			User user = new User();
			user.setId(team.getUserId());
			te.setUser(user);
		}
		te.setIsNewRecord(false);
		save(te);
		return JsonUtils.jsonString(te, "success", "1");
	}

	/**
	 * 解散一个团队信息
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> deleteTeamInfo(Team team){
		delete(team);
		return JsonUtils.jsonString("success", "success", "1");
	}
	
	/**
	 * 添加团队的单个成员
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> addTeamOneMember(String teamId,String userId,String type){
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		map.put("id", IdGen.uuid());
		map.put("teamId", teamId);
		map.put("userId", userId);
		map.put("type", type);
		int num = 0;
		Map<String, Object> existMap = findTeamMemberMapping(teamId, userId);
		if(null==existMap){
			num = teamDao.addTeamOneMember(map);
		}
		if(num>0){
			resultMap = JsonUtils.jsonString("success", "success", "1");
		}else{
			resultMap = JsonUtils.jsonString("fail", "fail", "0");
		}
		return resultMap;
	}
	
	/**
	 * 添加团队的多个成员
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> addTeamMoreMember(Team team){
		Team t = get(team);
		if(StringUtils.isNotBlank(team.getMembersId())){
			deleteMoreTeamMember(team);
			String[] userIds = team.getMembersId().split(";");
			for (String str : userIds) {
				if(findTeamMemberMapping(team.getId(), str)==null){
					if(str.equals(t.getCreateBy().getId())){
						addTeamOneMember(team.getId(), str, Constants.MANAGE_TYPE);
					}else{
						addTeamOneMember(team.getId(), str, team.getType());
					}
				}
			}
		}else{
			deleteMoreTeamMember(team);
		}
		return JsonUtils.jsonString(findAllMemberOfOneTeam(team), "success", "1");
	}
	
	/**
	 * 邀请团队的多个成员
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> inviteTeamMoreMember(Team team){
		if(StringUtils.isNotBlank(team.getMembersId())){
			String[] userIds = team.getMembersId().split(";");
			for (String str : userIds) {
				if(findTeamMemberMapping(team.getId(), str)==null){
						addTeamOneMember(team.getId(), str, team.getType());
				}
			}
		}else{
			deleteMoreTeamMember(team);
		}
		return JsonUtils.jsonString("success", "success", "1");
	}
	
	/**
	 * 移除团队的成员
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> deleteTeamMember1(Team team){
		Map<String, Object> existMap = findTeamMemberMapping(team.getId(), team.getUserId());
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if(null!=existMap){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", existMap.get("id"));
			teamDao.deleteTeamMember1(map);
			resultMap = JsonUtils.jsonString("success", "success", "1");
		}else{
			resultMap = JsonUtils.jsonString("fail", "fail", "0");
		}
		return resultMap;
	}
	
	/**
	 * 批量删除团队成员
	 * @param team
	 * @return
	 */
	public int deleteMoreTeamMember(Team team){
		return teamDao.deleteMoreTeamMember(team);
	}
	
	
	/**
	 * 查询成员是否在团队中
	 * @param team
	 * @return
	 */
	public Map<String, Object> findTeamMemberMapping(String teamId,String userId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("teamId", teamId);
		map.put("userId", userId);
		return teamDao.findTeamMemberMapping(map);
	}
	
	/**
	 * 更换团队的成员
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> updateTeamMember(Team team){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> existMap = findTeamMemberMapping(team.getId(), team.getUserId());
		if(null!=existMap){
			map.put("teamId", team.getNewTeamId());
			map.put("id", existMap.get("id"));
		}
		int num = teamDao.updateTeamMember(map);
		if(num>0){
			resultMap = JsonUtils.jsonString("success", "success", "1");
		}else{
			resultMap = JsonUtils.jsonString("fail", "fail", "0");
		}
		return resultMap;
	}
	
	
	/**
	 * 根据团队ID查找团队成员
	 * @param team
	 * @return
	 */
	public Map<String, Object> findAllMemberOfOneTeamToMap(Team team){
		return JsonUtils.jsonString(findAllMemberOfOneTeam(team), "success", "1");
	}
	
	
	/**
	 * 根据团队ID查找团队成员
	 * @param team
	 * @return
	 */
	public List<User> findAllMemberOfOneTeam(Team team){
		return teamDao.findAllMemberOfOneTeam(team);
	}
	
	/**
	 * 根据空间ID查找空间下所有的团队，包括团队下所有的成员和所有项目
	 * @param team
	 * @return
	 */
	public Map<String, Object> findAllTeamOfOneSpace(Team team){
		List<Team> list = teamDao.findAllTeamOfOneSpace(team);
		for (Team t : list) {
			List<User> users = findAllMemberOfOneTeam(t);
			t.setUsers(users);
			List<ProjectTask> projectTasks = findProjectTasksByTeam(t);
			t.setProjectTasks(projectTasks);
		}
		return JsonUtils.jsonString(list, "success", "1");
	}
	
	
	/**
	 * 根据团队ID查找团队下的项目
	 * @return
	 */
	public List<ProjectTask> findProjectTasksByTeam(Team team){
		return teamDao.findProjectTasksByTeam(team);
	}
	
	
	/**
	 * 根据用户和空间查找用户所在的团队信息
	 * @param team
	 * @return
	 */
	public List<Team> findTeamListOfMine(Team team){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", UserUtils.getUser().getId());
		map.put("spaceId", team.getSpaceId());
		map.put("delFlag", Team.DEL_FLAG_NORMAL);
		return teamDao.findAllTeamOfMine(map);
	}
	
	/**
	 * 根据用户和空间查找用户所在的团队信息
	 * @param team
	 * @return
	 */
	public Map<String, Object> findAllTeamOfMine(Team team){
		List<Team> list = findTeamListOfMine(team);
		for (Team t : list) {
			List<User> users = findAllMemberOfOneTeam(t);
			t.setUsers(users);
			t.setUserCount(users.size());
			List<ProjectTask> projectTasks = findProjectTasksByTeam(t);
			t.setProjectTasks(projectTasks);
			t.setProjectCount(projectTasks.size());
			List<Conversation> conversations = findTeamConversations(t);
			t.setConversationCount(conversations.size());
		}
		return JsonUtils.jsonString(list, "success", "1");
	}
	
	/**
	 * 根据团队ID查找团队下的话题
	 * @param team
	 * @return
	 */
	public List<Conversation> findTeamConversations(Team team){
		return teamDao.findTeamConversations(team);
	}

	/**
	 * 更换团队负责人
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> updateTeamResponsibiliter(Team team) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		int num = teamDao.updateTeamResponsibiliter(team);
		if(num>0){
			resultMap = JsonUtils.jsonString("success", "success", "1");
		}else{
			resultMap = JsonUtils.jsonString("fail", "fail", "0");
		}
		return resultMap;
	}
	/**
	 * 根据条件统计相关数据
	 * @param map
	 * @return
	 */
	public int countTaskByCondition(Map<String, Object> map){
		map = this.initConditionMap(map);
		if(map.containsKey("taskStatus")){
			if(Constants.TASK_STATUS_DONE.equals(map.get("taskStatus").toString())){
				map.put("isFinish", "done");
			}else{
				map.put("isFinish", "unDone");
			}
		}else{
			map.put("isFinish", "all");
		}
		return teamDao.countTaskByCondition(map);
	}
	/**
	 * 根据条件统计相关列表数据
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> getCountTaskByCondition(Map<String, Object> map){
		map = this.initConditionMap(map);
		List<Map<String, Object>> list = teamDao.getCountTaskByCondition(map);
		if(list==null){
			list = new ArrayList<Map<String, Object>>();
		}
		return list;
	}
	public List<Map<String, Object>> countTeamTaskByCondition(Map<String, Object> map){
		map = this.initConditionMap(map);
		List<Map<String, Object>> list = teamDao.countTeamTaskByCondition(map);
		if(list==null){
			list = new ArrayList<Map<String, Object>>();
		}
		return list;
	}
	private Map<String, Object> initConditionMap(Map<String, Object> map){
		map.put("DEL_FLAG_NORMAL", Team.DEL_FLAG_NORMAL);
		map.put("type", Constants.PROJECTTASK_TYPE_TASK);
		return map;
	}
	
	
	/**
	 * 根据ID查找团队基本信息
	 * @param team
	 * @return
	 */
	public Map<String, Object> findOneTeamBaseInfo(Team team){
		return JsonUtils.jsonString(teamDao.findOneTeamBaseInfo(team), "success", "1");
	}
	/**
	 * 获取当前用户相关的团队
	 * @param team
	 * @return
	 */
	public List<Team> getCurrentUserTeam(Team team){
		List<Team> list = teamDao.getCurrentUserTeam(team);
		if(list==null){
			list = new ArrayList<Team>();
		}
		return list;
	}
	/**
	 * 根据空间Id获取当前用户相关的团队信息
	 * @param spaceId
	 * @return
	 */
	public List<Team> getCurrentUserTeamBySpaceIdAndName(String spaceId,String name){
		Team team = new Team();
		team.setSpaceId(spaceId);
		team.setName(name);
		return this.getCurrentUserTeam(team);
	}

	/**
	 * 查找团队下存在的项目和话题数总和
	 * @param team
	 * @return
	 */
	public Map<String, Object> findOneTeamProjectAndConversationCount(Team team) {
		return JsonUtils.jsonString(teamDao.findOneTeamProjectAndConversationCount(team), "success", "1");
	}
	
	
	/* write at the last ： what i do is what i want. */
	
	/**
	 * 根据ID查询团队
	 */
	public Team get(Team team){
		return teamDao.get(team);
	}
	
	/**
	 * 新增团队
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveTeam(Team team){
		team.preInsert();
		int result = teamDao.insert(team);
		
		//负责人也应该是团队成员
		this.saveOwnerToTeamMember(team);
		
		//团队创建者应该是该团队的成员
		team.setMemberId(UserUtils.getUser().getId());
		this.saveTeamMember(team);
		
		//新增团队时批量添加成员
		this.saveTeamMembers(team);
		
		return result;
	}
	
	/**
	 * 批量添加团队成员
	 * @param team
	 */
	@Transactional(readOnly = false)
	public int saveTeamMembers(Team team){
		int result = 0;
		if(null != team && StringUtils.isNotBlank(team.getMemberIds())){
			String[] memberIdsArray = team.getMemberIds().split(",");
			for(int i = 0; null != memberIdsArray && i < memberIdsArray.length; i++){
				Team t = new Team();
				t.setId(team.getId());
				t.setMemberId(memberIdsArray[i]);
				result += this.saveTeamMember(t);
			}
		}
		return result;
	}
	
	/**
	 * 批量删除团队成员
	 * @param team
	 */
	@Transactional(readOnly = false)
	public int deleteTeamMembers(Team team){
		int result = 0;
		if(null != team && StringUtils.isNotBlank(team.getMemberIds())){
			String[] memberIdsArray = team.getMemberIds().split(",");
			for(int i = 0; null != memberIdsArray && i < memberIdsArray.length; i++){
				Team t = new Team();
				t.setId(team.getId());
				t.setMemberId(memberIdsArray[i]);
				result += this.deleteTeamMember(t);
			}
		}
		return result;
	}
	
	/**
	 * 根据ID更新团队信息
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public int update(Team team){
		team.preUpdate();
		int result = teamDao.update(team);
		
		//负责人也应该是团队成员
		this.saveOwnerToTeamMember(team);
		
		return result;
	}
	
	/**
	 * 根据ID删除团队
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteTeam(Team team){
		return teamDao.delete(team);
	}
	
	/**
	 * 查询团队成员
	 * @param team
	 * @return
	 */
	public Map<String, Object> findTeamMember(Team team){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("teamId", team.getId());
		paramMap.put("memberId", team.getMemberId());
		return teamDao.findTeamMember(paramMap);
	}
	
	/**
	 * 添加团队成员
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveTeamMember(Team team){
		Map<String, Object> teamMember = this.findTeamMember(team);
		if(null == teamMember){
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("id", IdGen.uuid());
			paramMap.put("teamId", team.getId());
			paramMap.put("memberId", team.getMemberId());
			return teamDao.insertTeamMember(paramMap);
		}
		return com.bt.surfond.front.core.common.Constants.SERVICE_HANDLE_FAILURE;
	}
	
	/**
	 * 将团队负责人加入团队成员中
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveOwnerToTeamMember(Team team){
		if(null != team && StringUtils.isNotBlank(team.getOwnerId())){
			Team t = new Team();
			t.setId(team.getId());
			t.setMemberId(team.getOwnerId());
			return this.saveTeamMember(t);
		}
		return com.bt.surfond.front.core.common.Constants.SERVICE_HANDLE_FAILURE;
	}
	
	/**
	 * 删除团队成员
	 * @param team
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteTeamMember(Team team){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("teamId", team.getId());
		paramMap.put("memberId", team.getMemberId());
		int result = teamDao.deleteTeamMember(paramMap);
		
		//删除团队成员后应将其下所有项目中对应的该成员也一并删除。。恶心啊
		WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
		ProjectService projectService = webApplicationContext.getBean(ProjectService.class);
		
		//查询指定团队下的项目列表
		ProjectTask project = new ProjectTask();
		project.setTeamId(team.getId());
		List<ProjectTask> projectList = projectService.findListInTeam(project);
		
		//遍历项目列表逐一删除其中指定的成员
		if(null != projectList){
			for(ProjectTask pp : projectList){
				pp.setMemberId(team.getMemberId());
				projectService.deleteProjectMember(pp);
			}
		}
		
		return result;
	}
	
	/**
	 * 根据ID查询团队信息及其成员列表
	 * @param team
	 * @return
	 */
	public Team find(Team team){
		return teamDao.find(team);
	}
	
	/**
	 * 查询当前登录用户在当前空间下参与的团队
	 */
	public List<Team> findList(Team team){
		return teamDao.findList(team);
	}
	
	/**
	 * 跨空间：个人所在空间所有团队列表
	 * @param team
	 * @return
	 */
	public List<Team> findListIgnoreSpace(Team team){
		return teamDao.findListIgnoreSpace(team);
	}
	
}