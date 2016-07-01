package com.bt.surfond.team.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.conversation.entity.Conversation;
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.team.entity.Team;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.sys.entity.User;


/**
 * 团队dao接口
 * @author dyl
 *
 */
@MyBatisDao
public interface TeamDao extends CrudDao<Team> {
	
	
	/** 添加团队的单个成员
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	public int addTeamOneMember(Map<String, Object> map);
	
	/**
	 * 移除团队的成员
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	public int deleteTeamMember1(Map<String, Object> map);
	
	/**
	 * 批量移除团队的成员
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	public int deleteMoreTeamMember(Team team);
	
	
	/**
	 * 更换团队的成员
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	public int updateTeamMember(Map<String, Object> map);
	
	
	/**
	 * 查找团队成员是否存在 
	 * @param map
	 * @return
	 */
	public Map<String, Object> findTeamMemberMapping(Map<String, Object> map);
	
	
	
	/**
	 * 根据团队ID查找团队成员
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	public List<User> findAllMemberOfOneTeam(Team team);
	
	/**
	 * 根据空间ID查找空间下所有的团队
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	public List<Team> findAllTeamOfOneSpace(Team team);
	
	
	/**
	 * 根据用户和空间查找用户所在的团队信息
	 * @param team
	 * @param model
	 * @param request
	 * @return
	 */
	public List<Team> findAllTeamOfMine(Map<String, Object> map);
	
	/**
	 * 根据团队ID查找团队下的项目
	 * @param team
	 * @return
	 */
	public List<ProjectTask> findProjectTasksByTeam(Team team);
	/**
	 * 根据条件统计相关数据
	 * @param map
	 * @return
	 */
	public int countTaskByCondition(Map<String, Object> map);
	/**
	 * 根据条件统计相关列表数据
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> getCountTaskByCondition(Map<String, Object> map);
	public List<Map<String, Object>> countTeamTaskByCondition(Map<String, Object> map);
	
	/**
	 * 更换团队负责人
	 * @param team
	 * @return
	 */
	public int updateTeamResponsibiliter(Team team);

	/**
	 * 根据团队ID查找团队下的话题
	 * @param team
	 * @return
	 */
	public List<Conversation> findTeamConversations(Team team);

	/**
	 * 根据ID查找团队基本信息
	 * @param team
	 * @return
	 */
	public Team findOneTeamBaseInfo(Team team);
	
	/**
	 * 获取当前用户相关的团队
	 * @param team
	 * @return
	 */
	public List<Team> getCurrentUserTeam(Team team);

	/**
	 * 查找团队下存在的项目和话题数总和
	 * @param team
	 * @return
	 */
	public Integer findOneTeamProjectAndConversationCount(Team team);
	
	/* write at the last ： what i do is what i want. */
	
	/**
	 * 根据ID查询团队
	 */
	Team get(Team team);
	
	/**
	 * 插入团队记录
	 */
	int insert(Team team);
	
	/**
	 * 根据ID更新团队信息
	 */
	int update(Team team);
	
	/**
	 * 根据ID删除团队
	 */
	int delete(Team team);
	
	/**
	 * 保存团队-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	int insertTeamMember(Map<String, Object> paramMap);
	
	/**
	 * 查询团队-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	Map<String, Object> findTeamMember(Map<String, Object> paramMap);
	
	/**
	 * 删除团队-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	int deleteTeamMember(Map<String, Object> paramMap);
	
	/**
	 * 根据ID查询团队信息及其成员列表
	 * @param team
	 * @return
	 */
	Team find(Team team);
	
	/**
	 * 查询当前登录用户在当前空间下参与的团队
	 */
	List<Team> findList(Team team);
	
	/**
	 * 跨空间：个人所在空间所有团队列表
	 * @param team
	 * @return
	 */
	public List<Team> findListIgnoreSpace(Team team);
	
}