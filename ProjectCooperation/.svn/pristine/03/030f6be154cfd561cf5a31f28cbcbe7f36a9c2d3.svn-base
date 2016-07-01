package com.bt.surfond.schedule.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.chart.service.ChartLogService;
import com.bt.surfond.schedule.dao.ScheduleDao;
import com.bt.surfond.schedule.entity.Schedule;
import com.thinkgem.jeesite.common.service.CrudService;


@Service
@Lazy(false)
@Transactional(readOnly = true)
public class ScheduleChartLogService extends CrudService<ScheduleDao, Schedule>{
		
		@Autowired
		private ChartLogService chartLogService;
		
		/**
		 * 23点，每20分钟执行一次进行报表数据的生成修改
		 * @Scheduled(cron="0 0/5 *  * * ? ")
		 */
		@Scheduled(cron="0 0/20 23 * * ?")
		@Transactional(readOnly = false)
		public void initReportChart(){
			Date d = new Date();
//			d = ChartDateUtils.getLastDay(d);
			chartLogService.initSpaceTaskCount(d);		//统计空间总任务数
			chartLogService.initSpaceTaskDoneCount(d);	//统计空间任务完成数
			chartLogService.initSpaceTaskCreate(d);		//统计空间任务新建数
			chartLogService.initSpaceTaskAnalyse(d);	//初始 任务数统计分析 数据
			chartLogService.initTeamTaskCount(d);		//团队总任务数
			chartLogService.initTeamTaskDone(d);		//团队任务完成数
			chartLogService.initTeamTaskCreate(d);		//团队任务新建数
			chartLogService.initProjectTask(d);			//初始项目的报表统计分析数据
		}
		
		
		
}
