package com.bt.surfond.front.project.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.front.core.entity.ActiveUser;
import com.bt.surfond.task.entity.ProjectTask;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 项目dao接口
 * @author dyl
 *
 */
@MyBatisDao
public interface ProjectDao extends CrudDao<ProjectTask> {
	
	/**
	 * 根据ID查询项目
	 */
	ProjectTask get(ProjectTask project);
	
	/**
	 * 插入记录
	 */
	int insert(ProjectTask project);
	
	/**
	 * 根据ID更新项目信息
	 */
	int update(ProjectTask project);
	
	/**
	 * 根据ID删除项目
	 */
	int delete(ProjectTask project);
	
	/**
	 * 保存空间-项目的关联关系
	 * @param paramMap
	 * @return
	 */
	int insertSpaceProject(Map<String, Object> paramMap);

	/**
	 * 保存项目-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	int insertProjectMember(Map<String, Object> paramMap);
	
	/**
	 * 查询项目-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	Map<String, Object> findProjectMember(Map<String, Object> paramMap);
	
	/**
	 * 删除项目-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	int deleteProjectMember(Map<String, Object> paramMap);
	
	/**
	 * 查询项目成员列表
	 * @param project
	 * @return
	 */
	List<ActiveUser> findProjectMemberList(ProjectTask project);
	
	/**
	 * 查询指定团队下的项目列表
	 * @param project
	 * @return
	 */
	List<ProjectTask> findListInTeam(ProjectTask project);
	
}
