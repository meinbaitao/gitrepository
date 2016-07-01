/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.chart.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.chart.entity.ChartLog;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 报表日志记录DAO接口
 * @author xiaocai
 * @version 2016-3-7
 */
@MyBatisDao
public interface ChartLogDao extends CrudDao<ChartLog> {
	/**
	 * 根据条件统计相关数据
	 * @param map
	 * @return
	 */
	public List<ChartLog> selectByCondition(Map<String, Object> map);
	/**
	 * 根据相应的条件获取单条数据
	 * @param chartLog
	 * @return
	 */
	public ChartLog getOneByCondition(ChartLog chartLog);
}