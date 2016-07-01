package com.bt.surfond.taskboard.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.taskboard.entity.TaskBoard;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 看板模块Dao
 * @author xujianpeng
 * @version 2016-03-22
 */
@MyBatisDao
public interface TaskBoardDao extends CrudDao<TaskBoard> {
	
	/**
	 * 初始化看板
	 * @param project
	 * @return
	 */
	public void initTaskBoard(TaskBoard taskBoard);
	
	
	/**
	 * 创建看板
	 * @param project
	 * @return
	 */
	public int saveTaskBoard(TaskBoard taskBoard);
	
	
	/**
	 * 创建看板关联关系
	 * @param project
	 * @return
	 */
	public int saveTaskBoardAndUser(Map<String, Object> map);
	
	
	/**
	 * 保存看板与任务关联关系
	 * @param project
	 * @return
	 */
	public int saveTaskBoardAndTask(Map<String, Object> map);
	
	
	/**
	 * 修改看板名称
	 * @param project
	 * @return
	 */
	public int updateName(TaskBoard taskBoard);
	
	
	/**
	 * 修改看板排序
	 * @param project
	 * @return
	 */
	public int updateSort(TaskBoard taskBoard);
	
	
	/**
	 * 根据类型查询看板
	 * @param project
	 * @return
	 */
	public List<TaskBoard> findListByType(TaskBoard taskBoard);
	
	
	/**
	 * 根据类型查询看板总数
	 * @param project
	 * @return
	 */
	public TaskBoard findCountByType(TaskBoard taskBoard);
	
	
	/**
	 * 根据类型查询看板
	 * @param project
	 * @return
	 */
	public Map<String, Object> findListByTaskBoardId(TaskBoard taskBoard);
	
	
}