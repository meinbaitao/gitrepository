package com.bt.chart;

import java.util.Date;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.bt.basic.BasicTest;
import com.bt.surfond.chart.service.ChartLogService;
import com.thinkgem.jeesite.common.utils.ChartDateUtils;
import com.thinkgem.jeesite.common.utils.DateUtils;


/**
 * 
 * @author xiaocai
 *
 */
public class ChartLogServiceTest extends BasicTest{

	private final Date createDate=ChartDateUtils.getLastDay(new Date());//DateUtils.parseDate("2016-03-08 00:00:00");
	private final Date endDate=ChartDateUtils.getEndDateByWeek(4);
	
	@Autowired
	private ChartLogService chartLogService;
	
	@Test
	public void initSpaceTaskCount(){	//初始化空间的任务总数
		chartLogService.initSpaceTaskCount(endDate);
	}
	@Test
	public void initSpaceTaskDoneCount(){	//初始化空间的任务完成总数
		chartLogService.initSpaceTaskDoneCount(endDate);
	}
	@Test
	public void initSpaceTaskCreate(){	//初始化空间的任务新建总数
		chartLogService.initSpaceTaskCreate(createDate);
	}
	@Test
	public void initSpaceTaskAnalyse(){	//初始化空间的任务数据统计
		chartLogService.initSpaceTaskAnalyse(createDate);
	}
	@Test
	public void initTeamTaskCount(){	//团队任务总数
		chartLogService.initTeamTaskCount(endDate);
	}
	@Test
	public void initTeamTaskDone(){		//团队任务完成数
		chartLogService.initTeamTaskDone(endDate);
	}
	@Test
	public void initTeamTaskCreate(){	//团队任务创建数
		chartLogService.initTeamTaskCreate(createDate);
	}
	@Test	
	public void initProjectTask(){		//项目数据分析-数据
		chartLogService.initProjectTask(createDate);
	}
	
	
	
	
}
