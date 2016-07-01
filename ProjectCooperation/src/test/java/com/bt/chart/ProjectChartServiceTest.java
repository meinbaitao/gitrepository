package com.bt.chart;

import java.util.Date;
import java.util.Map;

import org.junit.After;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.bt.basic.BasicTest;
import com.bt.surfond.chart.service.ProjectChartService;
import com.thinkgem.jeesite.common.utils.ChartDateUtils;
import com.thinkgem.jeesite.common.utils.DateUtils;


/**
 * 
 * @author xiaocai
 *
 */
public class ProjectChartServiceTest extends BasicTest{

	private final String projectId="a7c48468fe6b4ecda34acdc7675ca2a7";
	private final String dateType=ChartDateUtils.week;
	private final Date endDate=ChartDateUtils.getEndDateByWeek(4);
	private final Date startDate=ChartDateUtils.getWeekStartDateByEndDate(endDate);
	
	@Autowired
	private ProjectChartService projectChartService;
	
	@After
	public void outPrintlnCondition(){
		System.out.println("startDate:"+DateUtils.formatDate(startDate,DateUtils.YMD_HMS));
		System.out.println("endDate:"+DateUtils.formatDate(endDate,DateUtils.YMD_HMS));
	}
	
	
	@Test	
	public void taskDoneAmount(){	//tested
		Map<String,Object> map = projectChartService.taskDoneAmount(projectId, startDate, endDate);
		System.out.println("任务完成量:"+map);
	}
	
	@Test
	public void analysiData(){
		Map<String,Object> map = projectChartService.analysiData(projectId, dateType, startDate, endDate);
		System.out.println("任务数统计分析:"+map);
	}
	
	@Test
	public void memberDone(){	//tested
		Map<String,Object> map = projectChartService.memberDone(projectId, startDate, endDate);
		System.out.println("任务数统计分析:"+map);
	}
//	@Test
//	public void getChartByProjectId(){
//		String spaceId = "";
//		Map<String,Object> map = projectChartService.getChartByProjectId(spaceId, null, null);
//		System.out.println(map);
//		System.out.println("countTaskDone:"+map.get("countTaskDone"));
//		System.out.println("countTaskTimelyDone:"+map.get("countTaskTimelyDone"));
//	}
	
}
