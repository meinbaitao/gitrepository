package com.bt.surfond.schedule.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.bt.surfond.schedule.dao.ScheduleDao;
import com.bt.surfond.schedule.entity.Schedule;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.sys.dao.UserDao;


@Service
@Lazy(false)
public class ScheduleTaskService extends CrudService<ScheduleDao, Schedule>{
		
		@Autowired
		private UserDao userDao;
	
		/**
		 * 任务到期提醒，(一天提醒)
		 */
		@Scheduled(cron = "0 0 23 * * ?")
		public void taskDayExpireRemind() {
//			System.out.println(new Date().getTime()+"===++++++++++++++++++++++++++++++++++++++++++++++");
//			//1.查询状态是否有设置调度
//			Schedule schedule = new Schedule();
//			schedule.setType(Constants.TASK_TYPE_REMIND);
//			schedule.setStatus(Constants.DAY_STATUS_REMIND);
//			List<Schedule> scheduleList =dao.findScheduleByStatus(schedule);
//			if(null !=scheduleList){
//				System.out.println(scheduleList.size());
//			}
			
			//2.根据设置的人、空间查询任务列表
			//3.组装邮件内容
			//4.邮件发送
		}
		
		/**
		 * 任务到期提醒，(七天提醒)
		 */
		@Scheduled(cron = "0 0 23 * * ?")
		public void taskWeekExpireRemind() {
			System.out.println(new Date().getTime()+"===++++++++++++++++++++++++++++++++++++++++++++++");
			//1.查询状态是否有设置调度
			//2.根据设置的人、空间查询任务列表
			//3.组装邮件内容
			//4.邮件发送
		}
		
		
		
		
}
