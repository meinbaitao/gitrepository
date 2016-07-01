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
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.utils.ChartDateUtils;

/**
 * 项目报表 Service
 * @author xiaocai
 * @version 2016-2-29
 */
@Service
@Transactional
public class ProjectChartService {
	
	@Autowired
	private ProjectTaskService projectTaskService;	//项目
	@Autowired
	private ChartLogService chartLogService;	//报表
	
	
	/**
	 * 根据空间id获取当前用户所属团队数据
	 * @param spaceId
	 * @return
	 */
	public List<ProjectTask> getCurrentUserTeamBySpaceIdAndTitle(String spaceId,String title){
		return projectTaskService.getCurrentUserProjectBySpaceIdAndTitle(spaceId, title);
	}
	
	/**
	 * 根据项目id获取相应的报表数据
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 */
	public Map<String,Object> getChartByProjectId(String projectId,String dataType,Date startDate,Date endDate){
		Map<String,Object> map = this.getChartParameterMapInit(projectId, startDate, endDate);
		//获取任务完成量数据
		Map<String,Object> taskDoneData = this.taskDoneAmount(projectId, startDate, endDate);
		//任务数统计分析
		Map<String,Object> analysiData = this.analysiData(projectId, dataType, startDate, endDate);
		//各成员按时完成情况
		Map<String,Object> memberDone = this.memberDone(projectId, startDate, endDate);
		
		map.clear();
		map.put("taskDoneData", taskDoneData);
		map.put("analysiData", analysiData);
		map.put("memberDone", memberDone);
		return map;
	}
	
	
	/**
	 * 任务完成量(实时统计)
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public Map<String,Object> taskDoneAmount(String projectId,Date startDate,Date endDate){
		Map<String,Object> map = this.getChartParameterMapInit(projectId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		int done = projectTaskService.countTaskByCondition(map);		//已完成
		map = this.getChartParameterMapInit(projectId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_UNDONE);	//未完成
		int unDone = projectTaskService.countTaskByCondition(map);
		
		map.clear();
		map.put("done", done);
		map.put("unDone", unDone);
		return map;
	}
	/**
	 * 数据完成统计
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public Map<String,Object> analysiData(String projectId,String dataType,Date startDate,Date endDate){
		Map<String,Object> map = this.getChartParameterMapInit(projectId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		int done = projectTaskService.countTaskByCondition(map);		//已完成
		map = this.getChartParameterMapInit(projectId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_UNDONE);	//未完成
		int unDone = projectTaskService.countTaskByCondition(map);
		//1.按时未完成
		map = this.getChartParameterMapInit(projectId, startDate, endDate);
		int onTimeUnDone = this.countAnalyse(map, "onTimeUnDone", Constants.TASK_STATUS_UNDONE);	
		//2.超时未完成overtime
		map = this.getChartParameterMapInit(projectId, startDate, endDate);
		int overTimeUnDone = this.countAnalyse(map, "overTimeUnDone", Constants.TASK_STATUS_UNDONE);	
		//3.按时完成
		map = this.getChartParameterMapInit(projectId, startDate, endDate);
		int onTimeDone = this.countAnalyse(map, "onTimeDone", Constants.TASK_STATUS_DONE);	
		//4.超时完成
		map = this.getChartParameterMapInit(projectId, startDate, endDate);
		int overTimeDone = this.countAnalyse(map, "overTimeDone", Constants.TASK_STATUS_DONE);
		//对比数据时间
		Date lastStartDate = ChartDateUtils.getLastDate(startDate,dataType);
		Date lastEndDate = ChartDateUtils.getLastDate(endDate,dataType);
		map.clear();
		map.put("sourceId", projectId);
		map.put("startDate", lastStartDate);
		map.put("endDate", lastEndDate);
		map.put("type", ChartLog.TYPE_PROJECT_TASK_ONTIMEUNDONE);
		int onTimeUnDoneOld = chartLogService.countByCondition(map);
		map.put("type", ChartLog.TYPE_PROJECT_TASK_OVERTIMEUNDONE);
		int overTimeUnDoneOld = chartLogService.countByCondition(map);
		map.put("type", ChartLog.TYPE_PROJECT_TASK_ONTIMEDONE);
		int onTimeDoneOld = chartLogService.countByCondition(map);
		map.put("type", ChartLog.TYPE_PROJECT_TASK_OVERTIMEDONE);
		int overTimeDoneOld = chartLogService.countByCondition(map);
		
		map.clear();
		map.put("done", done);
		map.put("unDone", unDone);
		map.put("onTimeUnDone", onTimeUnDone);
		map.put("overTimeUnDone", overTimeUnDone);
		map.put("onTimeDone", onTimeDone);
		map.put("overTimeDone", overTimeDone);
		map.put("onTimeUnDoneOld", onTimeUnDoneOld);
		map.put("overTimeUnDoneOld", overTimeUnDoneOld);
		map.put("onTimeDoneOld", onTimeDoneOld);
		map.put("overTimeDoneOld", overTimeDoneOld);
		return map;
	}
	/**
	 * 成员完成情况（实时数据）
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public Map<String,Object> memberDone(String projectId,Date startDate,Date endDate){
		Map<String, Object> map = this.getChartParameterMapInit(projectId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		List<Map<String, Object>> countTaskDone = projectTaskService.getCountTaskByCondition(map);
		map = this.getChartParameterMapInit(projectId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		map.put("isOntime", "onTimeDone");	
		List<Map<String, Object>> countTaskTimelyDone = projectTaskService.getCountTaskByCondition(map);
		//对返回的成员结果数据进行处理
		Map<String, Object> countTaskMap = this.memberDoneUtils(countTaskDone, countTaskTimelyDone);
		
		map.clear();
		map.put("countTaskMap", countTaskMap);
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
	
	
	
	
	
	
	
	
	
	/**
	 * 统计分析
	 * @param map
	 * @param flag 是否超时
	 * @param taskStatus 任务状态
	 * @return
	 */
	private int countAnalyse(Map<String,Object> map,
			String isOntime,String taskStatus){
		map.put("taskStatus", taskStatus);
		map.put("isOntime", isOntime);	
		return projectTaskService.countTaskByCondition(map);	
	}
	/**
	 * 根据空间id获取相应的报表数据
	 * 参数初始化
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	private Map<String,Object> getChartParameterMapInit(String projectId,Date startDate,Date endDate){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("projectId", projectId);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		return map;
	}
	
}