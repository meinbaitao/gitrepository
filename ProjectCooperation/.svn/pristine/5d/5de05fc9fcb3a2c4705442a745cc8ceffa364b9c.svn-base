package com.bt.surfond.task.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.task.entity.ProjectTask;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 项目与任务信息DAO接口
 * @author dyl
 * @version 2015-09-30
 */
@MyBatisDao
public interface ProjectTaskDao extends CrudDao<ProjectTask> {
	
	/**
	 * 查询项目中最大的排序值
	 * @param projectTask
	 * @return
	 */
	public int findMaxProjectSort(ProjectTask projectTask);
	
	/**
	 * 保存(项目/任务)-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	public int saveProjectTaskMember(Map<String, Object> paramMap);
	
	/**
	 * 保存空间-(项目/任务)的关联关系
	 * @param paramMap
	 * @return
	 */
	public int saveSpaceProjectTask(Map<String, Object> paramMap);
	
	/**
	 * 删除(项目/任务)-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	public int deleteProjectTaskMember(Map<String, Object> paramMap);
	
	/**
	 * 查询项目列表
	 * @param projectTask
	 * @return
	 */
	public List<ProjectTask> findProjectList(ProjectTask projectTask);
	
	/**
	 * 查询项目列表
	 * @param projectTask
	 * @return
	 */
	public List<ProjectTask> findAllProjectList(ProjectTask projectTask);
	
	/**
	 * 查询团队下项目列表
	 * @param projectTask
	 * @return
	 */
	public List<ProjectTask> findTeamProjectList(ProjectTask projectTask);
	
	/**
	 * 主键查询项目
	 * @param projectTask
	 * @return
	 */
	public ProjectTask findProject(ProjectTask projectTask);
	
	/**
	 * 修改(项目/任务)状态
	 * @param projectTask
	 * @return
	 */
	public int updateStatusById(ProjectTask projectTask);
	
	/**
	 * 查询任务中最大的排序值
	 * @param projectTask
	 * @return
	 */
	public int findMaxTaskSort(ProjectTask projectTask);
	
	/**
	 * 保存项目-任务的关联关系
	 * @param paramMap
	 * @return
	 */
	public int saveProjectTaskMapping(Map<String, Object> paramMap);
	
	/**
	 * 查询任务列表
	 * @param projectTask
	 * @return
	 */
	public List<ProjectTask> findTaskList(ProjectTask projectTask);
	
	/**
	 * 查询我的任务列表
	 * @param projectTask
	 * @return
	 */
	public List<ProjectTask> findMyTaskList(ProjectTask projectTask);
	
	/**
	 * 查询标签下的任务列表
	 * @param projectTask
	 * @return
	 */
	public List<ProjectTask> findTagsTaskList(ProjectTask projectTask);
	
	/**
	 * 主键查询任务
	 * @param projectTask
	 * @return
	 */
	public ProjectTask findTask(ProjectTask projectTask);
	
	/**
	 * 修改(项目/任务)标题
	 * @param projectTask
	 * @return
	 */
	public int updateTitleById(ProjectTask projectTask);
	
	/**
	 * 修改(项目/任务)描述
	 * @param projectTask
	 * @return
	 */
	public int updateDescriptionById(ProjectTask projectTask);
	
	/**
	 * 修改(项目/任务)截止时间
	 * @param projectTask
	 * @return
	 */
	public int updateDueDateById(ProjectTask projectTask);
	
	/**
	 * 保存记录-成员点赞的关联关系
	 * @param paramMap
	 * @return
	 */
	public int saveMemberPraise(Map<String, Object> paramMap);
	
	/**
	 * 查询记录-成员点赞的关联关系
	 * @param paramMap
	 * @return
	 */
	public Map<String, Object> findMemberPraise(Map<String, Object> paramMap);
	
	/**
	 * 删除记录-成员点赞的关联关系
	 * @param paramMap
	 * @return
	 */
	public int deleteMemberPraise(Map<String, Object> paramMap);
	
	/**
	 * 将指定记录的被赞数加一
	 * @param projectTask
	 * @return
	 */
	public int updatePraiseAmountUpById(ProjectTask projectTask);
	
	/**
	 * 将指定记录的被赞数减一
	 * @param projectTask
	 * @return
	 */
	public int updatePraiseAmountDownById(ProjectTask projectTask);
	
	/**
	 * 删除空间-(项目/任务)的关联关系
	 * @param paramMap
	 * @return
	 */
	public int deleteSpaceProjectTask(Map<String, Object> paramMap);
	
	/**
	 * 删除项目-任务的关联关系
	 * @param paramMap
	 * @return
	 */
	public int deleteProjectTaskMapping(Map<String, Object> paramMap);
	
	/**
	 * 修改(项目/任务)负责人
	 * @param projectTask
	 * @return
	 */
	public int updateOwnerById(ProjectTask projectTask);
	
	/**
	 * 查询指定任务的子任务列表
	 * @param projectTask
	 * @return
	 */
	public List<ProjectTask> findSubTaskList(ProjectTask projectTask);
	
	/**
	 * 修改(项目/任务)部分信息
	 * @param projectTask
	 * @return
	 */
	public int updatePartInfoById(ProjectTask projectTask); 
	
	/**
	 * 查询(项目/任务)成员
	 * @param paramMap
	 * @return
	 */
	public Map<String, Object> findProjectTaskMember(Map<String, Object> paramMap);
	
	/**
	 * 查询(项目/任务)成员列表
	 * @param projectTask
	 * @return
	 */
	public List<Map<String, Object>> findProjectTaskMemberList(ProjectTask projectTask);
	
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
	/**
	 * 统计项目任务数
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> countProjectTaskByCondition(Map<String, Object> map);
	/**
	 * 获取当前用户相关的项目
	 * @param projectTask
	 * @return
	 */
	public List<ProjectTask> getCurrentUserProject(ProjectTask projectTask);
	
	public int countSpaceProjectTaskByCondition(Map<String, Object> map);
	public List<Map<String, Object>> getCountSpaceProjectTaskByCondition(Map<String, Object> map);
	public List<Map<String, Object>> sumPraiseAmountByCondition(Map<String, Object> map);
	public List<Map<String, Object>> getCountSpaceProjectTaskForChartLog(Map<String, Object> map);
	
	/**
	 * 手机端查询任务列表(包含团队名称)
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> findAppProjectList(ProjectTask projectTask);

	/**
	 * 查找项目下的任务数
	 * @param task
	 * @return
	 */
	public Integer findOneProjectTaskCount(ProjectTask task);
	
}