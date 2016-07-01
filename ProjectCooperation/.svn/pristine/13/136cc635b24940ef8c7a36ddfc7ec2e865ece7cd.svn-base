/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.schedule.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.schedule.entity.Schedule;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 任务调度DAO接口
 * @author xjp
 * @version 2015-11-19
 */
@MyBatisDao
public interface ScheduleDao extends CrudDao<Schedule> {
	
	/**
	 * 查询当前用户关联的空间列表及其调度选项
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> findSpaceListAndItsScheduleOptions(Map<String, Object> paramMap);
	
	
	/**
	 * 根据空间ID与登录人查询是否已设置提醒
	 */
	public Schedule findScheduleByTaskId(Schedule schedule);
	
	/**
	 * 物理删除
	 * @param schedule
	 */
	public void delSchedule(Schedule schedule);
	
	
	/**
	 * 根据状态查询需要执行的空间定时任务
	 */
	public List<Schedule> findScheduleByStatus(Schedule schedule);
}