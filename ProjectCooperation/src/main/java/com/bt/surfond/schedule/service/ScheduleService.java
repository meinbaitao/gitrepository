/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.schedule.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.schedule.dao.ScheduleDao;
import com.bt.surfond.schedule.entity.Schedule;
import com.bt.surfond.space.entity.Space;
import com.thinkgem.jeesite.common.service.CrudService;
import com.bt.surfond.common.Constants;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 任务调度Service
 * @author xjp
 * @version 2015-11-19
 */
@Service
@Transactional(readOnly = true)
public class ScheduleService extends CrudService<ScheduleDao, Schedule> {

	/**
	 * 设置是否定时启动任务
	 * @param schedule
	 * @return
	 */
	@Transactional(readOnly = false)
	public int insert(Schedule schedule) {
		schedule.preInsert();
		return this.dao.insert(schedule);
	}
	
	/**
	 * 查询当前用户关联的空间列表及其调度选项
	 * @param space
	 * @return
	 */
	public List<Map<String, Object>> findSpaceListAndItsScheduleOptions(){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("DEL_FLAG_NORMAL", Space.DEL_FLAG_NORMAL);
		paramMap.put("status", Constants.SPACE_STATUS_SPACE);
		paramMap.put("type", Constants.SPACE_TYPE_PUBLIC);
		paramMap.put("personalType", Constants.SPACE_TYPE_PERSONAL);
		paramMap.put("userId", UserUtils.getUser().getId());
		paramMap.put("remindType", com.bt.surfond.common.Constants.TASK_TYPE_REMIND);
		paramMap.put("dayRemind", com.bt.surfond.common.Constants.DAY_STATUS_REMIND);
		paramMap.put("weekRemind", com.bt.surfond.common.Constants.WEEK_STATUS_REMIND);
		return dao.findSpaceListAndItsScheduleOptions(paramMap);
	}
	
	/**
	 * 根据空间ID与登录人查询是否已设置提醒
	 */
	public Schedule findScheduleByTaskId(Schedule schedule){
		return dao.findScheduleByTaskId(schedule);
	}
	
	/**
	 * 物理删除
	 * @param schedule
	 */
	@Transactional(readOnly = false)
	public void delSchedule(Schedule schedule){
		dao.delSchedule(schedule);
	}
}