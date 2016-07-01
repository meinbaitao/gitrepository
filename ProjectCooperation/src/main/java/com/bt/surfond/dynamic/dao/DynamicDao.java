/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.dynamic.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.dynamic.entity.Dynamic;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 动态记录表DAO接口
 * @author xjp
 * @version 2015-11-21
 */
@MyBatisDao
public interface DynamicDao extends CrudDao<Dynamic> {
	
	/**
	 * 根据用户查找空间下与用户相关的任务记录信息
	 * @param map
	 * @return
	 */
	public List<Dynamic> findAllOfOneUserInSpace(Dynamic dynamic);
	
	/**
	 * 根据用户查找与用户相关的任务记录信息(不分空间)
	 * @param map
	 * @return
	 */
	public List<Dynamic> findDynamicByUserId(Dynamic dynamic);
	
	/**
	 * 根据任务ID查找任务下的操作记录
	 * @param map
	 * @return
	 */
	public List<Dynamic> findAllInTask(Dynamic dynamic);
	
	
	/**
	 * 检查有没有未读动态
	 * @param user
	 * @param spaceId
	 * @return
	 */
	public List<Dynamic> findByDynamicStatus(Dynamic dynamic);
	
	/**
	 * 批量删除动态记录
	 */
	public void deleteMore(Dynamic dynamic);
	
	/**
	 * 点击动态修改所有的未读消息改为已读
	 * @param spaceId
	 * @return
	 */
	public int updateDynamicStatus(Map<String, Object> map);
	
	/**
	 * 查询任务记录列表
	 * @param dynamic
	 * @return
	 */
	public List<Dynamic> findTaskRecordList(Dynamic dynamic);
	
	/**
	 * 查询最新的任务记录
	 * @param dynamic
	 * @return
	 */
	public Dynamic findLastTaskRecord(Dynamic dynamic);
	
	/**
	 * 从记录中查询任务的历史负责人
	 * @param dynamic
	 * @return
	 */
	public List<Map<String, Object>> findHistoryOwnerByTaskId(Dynamic dynamic);
	
}