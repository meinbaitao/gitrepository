package com.bt.surfond.tags.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.tags.entity.Tags;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 标签模块DAO接口
 * @author dyl
 * @version 2015-11-21
 */
@MyBatisDao
public interface TagsDao extends CrudDao<Tags> {
	
	/**
	 * 查询指定空间下标签列表
	 * @param tags
	 * @return
	 */
	public List<Tags> findTagsListBySpaceId(Tags tags);
	
	/**
	 * 添加任务标签
	 * @param paramMap
	 * @return
	 */
	public int saveTagsTask(Map<String, Object> paramMap);
	
	/**
	 * 删除任务标签
	 * @param tags
	 * @return
	 */
	public int deleteTagsTask(Tags tags);
	
	/**
	 * 删除指定任务下所有标签
	 * @param tags
	 * @return
	 */
	public int deleteAllTagsTask(Tags tags);

	/**
	 * 查询任务下的标签
	 * @param projectTask
	 * @return
	 */
	public List<Tags> findTaskTags(Tags tags);
	
}