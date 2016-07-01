package com.bt.chart;

import java.util.Date;
import java.util.Map;

import org.junit.After;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.bt.basic.BasicTest;
import com.bt.surfond.chart.service.TeamChartService;
import com.thinkgem.jeesite.common.utils.ChartDateUtils;
import com.thinkgem.jeesite.common.utils.DateUtils;


/**
 * 
 * @author xiaocai
 *
 */
public class TeamChartServiceTest extends BasicTest{

	private final String teamId="f06aa9acd1da499a904523c81a65ae1c";
	private final String dateType=ChartDateUtils.week;
	private final Date endDate=ChartDateUtils.getEndDateByWeek(4);
	private final Date startDate=ChartDateUtils.getWeekStartDateByEndDate(endDate);
	
	@Autowired
	private TeamChartService teamChartService;
	
	@After
	public void outPrintlnCondition(){
		System.out.println("startDate:"+DateUtils.formatDate(startDate,DateUtils.YMD_HMS));
		System.out.println("endDate:"+DateUtils.formatDate(endDate,DateUtils.YMD_HMS));
	}
	
	@Test
	public void taskDoneAmount(){
		Map<String,Object> map = teamChartService.taskDoneAmount(teamId, startDate, endDate);
		System.out.println("获取任务完成量数据:"+map);
	}
	@Test
	public void dataAnalysis(){
		Map<String,Object> map = teamChartService.dataAnalysis(teamId, dateType, startDate, endDate);
		System.out.println("数据分析:"+map);
	}
	@Test
	public void memberDone(){
		Map<String,Object> map = teamChartService.memberDone(teamId, startDate, endDate);
		System.out.println("各成员按时完成情况:"+map);
	}
	
//	@Test
//	public void getChartByTeamId(){
//		String spaceId = "";
//		Map<String,Object> map = teamChartService.getChartByTeamId(spaceId, null, null);
//		System.out.println(map);
//		System.out.println("countTaskDone:"+map.get("countTaskDone"));
//		System.out.println("countTaskTimelyDone:"+map.get("countTaskTimelyDone"));
//	}
	
}
