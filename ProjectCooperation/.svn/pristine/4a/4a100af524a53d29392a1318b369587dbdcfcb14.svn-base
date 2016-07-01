package com.bt.surfond.chart.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.chart.entity.ChartLog;
import com.bt.surfond.common.Constants;
import com.bt.surfond.team.entity.Team;
import com.bt.surfond.team.service.TeamService;
import com.thinkgem.jeesite.common.utils.ChartDateUtils;
import com.thinkgem.jeesite.common.utils.MathUtils;

/**
 * 团队报表 Service
 * @author xiaocai
 * @version 2016-2-29
 */
@Service
@Transactional
public class TeamChartService {
	
	@Autowired
	private TeamService teamService;	//团队
	@Autowired
	private ChartLogService chartLogService;	//报表日志数据
	
	
	/**
	 * 根据空间id获取当前用户所属团队数据
	 * @param spaceId
	 * @return
	 */
	public List<Team> getCurrentUserTeamBySpaceIdAndName(String spaceId,String name){
		return teamService.getCurrentUserTeamBySpaceIdAndName(spaceId,name);
	}
	/**
	 * 根据团队id获取相应的报表数据
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 */
	public Map<String,Object> getChartByTeamId(String teamId,String dataType,Date startDate,Date endDate){
		Map<String,Object> map = this.getChartParameterMapInit(teamId, startDate, endDate);
		//获取任务完成量数据taskDoneAmount
		Map<String,Object> taskDoneAmount = this.taskDoneAmount(teamId, startDate, endDate);
		//数据分析dataMap
		Map<String,Object> dataAnalysis = this.dataAnalysis(teamId, dataType, startDate, endDate);
		//各成员按时完成情况memberDone
		Map<String,Object> memberDone = this.memberDone(teamId, startDate, endDate);
		
		map.clear();
		map.put("taskDoneAmount", taskDoneAmount);
		map.put("dataAnalysis", dataAnalysis);
		map.put("memberDone", memberDone);
		return map;
	}
	/**
	 * 成员完成情况
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public Map<String,Object> memberDone(String teamId,Date startDate,Date endDate){
		Map<String,Object> map = this.getChartParameterMapInit(teamId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		List<Map<String, Object>> countTaskDone = teamService.getCountTaskByCondition(map);
		map = this.getChartParameterMapInit(teamId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		map.put("isOntime", "onTimeDone");	//按时完成条件
		List<Map<String, Object>> countTaskTimelyDone = teamService.getCountTaskByCondition(map);
		//对返回的成员结果数据进行处理
		Map<String, Object> countTaskMap = this.memberDoneUtils(countTaskDone, countTaskTimelyDone);
		
		map.clear();
		map.put("countTaskMap", countTaskMap);
		return map;
	}
	
	/**
	 * 任务完成量
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public Map<String,Object> taskDoneAmount(String teamId,Date startDate,Date endDate){
		Map<String,Object> map = this.getChartParameterMapInit(teamId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		int count = teamService.countTaskByCondition(map);		//已完成
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		map.put("isOntime", "onTimeDone");	//按时完成条件
		int timelyDone = teamService.countTaskByCondition(map);
		
		map.clear();
		map.put("timelyDone", timelyDone);
		map.put("count", count);
		map.put("percent",MathUtils.convertDouble((double)timelyDone/count)*100);
		return map;
	}
	/**
	 * 数据分析 （当前季度的数据和上一季度的数据进行对比）
	 * 任务完成数
	 * 总任务数
	 * 新增任务数
	 * @return
	 */
	public Map<String,Object> dataAnalysis(String teamId,String dateType,Date startDate,Date endDate){
		Date lastStartDate = ChartDateUtils.getLastDate(startDate,dateType);
		Date lastEndDate = ChartDateUtils.getLastDate(endDate,dateType);
		Map<String,Object> map = new HashMap<String,Object>();
		//任务总数(从报表数据中读取)
		map.put("sourceId", teamId);
		map.put("logDate", endDate);
		map.put("type", ChartLog.TYPE_TEAM_TASK_COUNT);
//		int count = chartLogService.countByCondition(map);		//查询时间段的任务总数
		map.put("beforeDate", endDate);
		int count = this.getAataAnalysisCount(startDate, map);
		map.put("logDate", lastEndDate);
		int countOld = chartLogService.countByCondition(map);	//对比时间段的任务总数
		
		map.clear();
		map.put("logDate", endDate);
		map.put("type", ChartLog.TYPE_TEAM_TASK_DONE);
		map.put("startDate",startDate);
		map.put("endDate",endDate);
//		int done = chartLogService.countByCondition(map);		//查询时间段的任务完成总数
		int done = this.getAataAnalysisCount(startDate, map);
		map.put("logDate", lastEndDate);
		map.put("sourceId", teamId);
		int doneOld = chartLogService.countByCondition(map);		//查询时间段的任务完成总数
		
		map.clear();
		map.put("sourceId", teamId);
		map.put("type", ChartLog.TYPE_TEAM_TASK_CREATE);
		map.put("startDate",startDate);
		map.put("endDate",endDate);
//		int createCount = chartLogService.countByCondition(map);		//查询时间段的任务新建总数
		int createCount = this.getAataAnalysisCount(startDate, map);
		map.put("startDate",lastStartDate);
		map.put("endDate",lastEndDate);
		int createCountOld = chartLogService.countByCondition(map);		//查询时间段的任务新建总数
//		
//		map = this.getChartParameterMapInit(spaceId, startDate, endDate);
//		map.put("type", ChartLog.TYPE_SPACE_TASK_COUNT);
//		int countOld = chartLogService.countByCondition(map);	//任务总数
//		map = this.getChartParameterMapInit(spaceId, lastStartDate, lastEndDate);
//		map.put("taskStatus", Constants.TASK_STATUS_DONE);
//		int doneOld = spaceService.countTaskByCondition(map);	//完成总数
//		map = this.getChartParameterMapInit(spaceId, lastStartDate, lastEndDate);
//		map.put("taskStatus", Constants.TASK_STATUS_DONE);
//		int createCountOld = spaceService.countTaskByCondition(map);	//新建数
//		
		map.clear();
		map.put("count", count);
		map.put("countOld", countOld);
		map.put("done", done);
		map.put("doneOld", doneOld);
		map.put("createCount", createCount);
		map.put("createCountOld", createCountOld);
		return map;
	}
	/**
	 * 判断要拉取数据的方向（实时还是报表）
	 * @param d
	 * @param map
	 * @return
	 */
	public int getAataAnalysisCount(Date d,Map<String,Object> map){
		int count=0;
		if(ChartDateUtils.validationToDay(d)){
			count = teamService.countTaskByCondition(map);
		}else{
			count = chartLogService.countByCondition(map);
		}
		return count;
	}
	/**
	 * 根据空间id获取相应的报表数据
	 * 参数初始化
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	private Map<String,Object> getChartParameterMapInit(String teamId,Date startDate,Date endDate){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("teamId", teamId);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		return map;
	}
	
	/**
	 * 用户任务完成情况数据处理，
	 * 将数据拆分成两个数组，方便界面调用直接 显示报表数据
	 * @param countTaskDone
	 * @param countTaskTimelyDone
	 * @return
	 */
	public Map<String, Object> memberDoneUtils(List<Map<String, Object>> countTaskDone,List<Map<String, Object>> countTaskTimelyDone){
		Map<String, Object> m = new HashMap<String,Object>();
		Map<String, Object> countTaskDones = new HashMap<String,Object>();
		Map<String, Object> countTaskTimelyDones = new HashMap<String,Object>();
		
		String sName[] = new String[countTaskDone.size()];		//用户名
		Integer[] sDone = new Integer[countTaskDone.size()];		//任务完成数
		Integer sTimelyDone[] = new Integer[countTaskDone.size()];//按时完成数
		
		for(int i=0;i<countTaskDone.size();i++){
			m = countTaskDone.get(i);
			countTaskDones.put(m.get("userName")+"", m.get("count"));
		}
		for(int i=0;i<countTaskTimelyDone.size();i++){
			m = countTaskTimelyDone.get(i);
			countTaskTimelyDones.put(m.get("userName")+"", m.get("count"));
		}
		int j=0;
		for(String key:countTaskDones.keySet()){
			sName[j] = key;
			sDone[j] = Integer.parseInt(countTaskDones.get(key).toString());
			if(countTaskTimelyDones.containsKey(key)){
				sTimelyDone[j]=Integer.parseInt(countTaskTimelyDones.get(key).toString());
			}else{
				sTimelyDone[j]=0;
			}
			j+=1;
		}
		m.clear();
		m.put("name", sName);
		m.put("countTaskDone", sDone);
		m.put("countTaskTimelyDone", sTimelyDone);
		return m;
	}
}