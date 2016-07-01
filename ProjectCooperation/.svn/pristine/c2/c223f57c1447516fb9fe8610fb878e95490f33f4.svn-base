package com.bt.surfond.chart.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.chart.entity.ChartLog;
import com.bt.surfond.common.Constants;
import com.bt.surfond.space.service.SpaceService;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.utils.ChartDateUtils;
import com.thinkgem.jeesite.common.utils.MathUtils;

/**
 * 空间报表 Service
 * @author xiaocai
 * @version 2016-2-24
 */
@Service
@Transactional
public class SpaceChartService {
	
	@Autowired
	private SpaceService spaceService;	//空间
	@Autowired
	private ProjectTaskService projectTaskService;	//项目任务
	@Autowired
	private ChartLogService chartLogService;	//报表记录日志
	
	
	
	/**
	 * 根据空间id获取相应的报表数据
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 */
	public Map<String,Object> getChartBySpaceId(String spaceId,String dataType,Date startDate,Date endDate){
		Map<String,Object> map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		//获取任务完成量数据
		Map<String,Object> taskDoneData = this.taskDoneAmount(spaceId, startDate, endDate);
		//数据分析
		Map<String,Object> dataAnalysis = this.dataAnalysis(spaceId, dataType, startDate, endDate);
		//任务按时完成率
		Map<String,Object> taskOnTimDoneData = this.taskOnTimeDone(spaceId, startDate, endDate);
		//成员累计点赞排名（前5）
		Map<String,Object> praiseAmountLimit5 = this.praiseAmountLimit5(spaceId, startDate, endDate);
		//任务数统计分析
		Map<String,Object> analyseData = this.analyseData(spaceId, dataType,startDate, endDate);
		//各成员按时完成情况
		Map<String,Object> memberDone = this.memberDone(spaceId, startDate, endDate);
		
		map.clear();
		map.put("taskDoneData", taskDoneData);
		map.put("dataAnalysis", dataAnalysis);
		map.put("taskOnTimDoneData", taskOnTimDoneData);
		map.put("praiseAmountLimit5", praiseAmountLimit5);
		map.put("analyseData", analyseData);
		map.put("memberDone", memberDone);
		return map;
	}
	
	/**
	 * 任务完成量
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public Map<String,Object> taskDoneAmount(String spaceId,Date startDate,Date endDate){
		Map<String,Object> map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		int done = spaceService.countTaskByCondition(map);		//已完成
		int done2 = projectTaskService.countSpaceProjectTaskByCondition(map);	//空间下的团队的任务
		done+=done2;
		map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_UNDONE);	//未完成
		int unDone = spaceService.countTaskByCondition(map);
		int unDone2 = projectTaskService.countSpaceProjectTaskByCondition(map);	//空间下的团队的任务
		unDone+=unDone2;
		
		map.clear();
		map.put("done", done);
		map.put("unDone", unDone);
		return map;
	}
	/**
	 * 任务按时完成
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public Map<String,Object> taskOnTimeDone(String spaceId,Date startDate,Date endDate){
		Map<String,Object> map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		int count = spaceService.countTaskByCondition(map);		//已完成
		int count2 = projectTaskService.countSpaceProjectTaskByCondition(map);	//空间下的团队的任务
		count+=count2;
		map.put("isOntime", "onTimeDone");	//按时完成条件
		int timelyDone = spaceService.countTaskByCondition(map);
		int timelyDone2 = projectTaskService.countSpaceProjectTaskByCondition(map);	//空间下的团队的任务
		timelyDone+=timelyDone2;
		map.clear();
		map.put("timelyDone",timelyDone);
		map.put("count",count);
		double d = MathUtils.convertDouble((double)timelyDone/count);
		map.put("percent",new BigDecimal((d*100)+"").setScale(0, BigDecimal.ROUND_HALF_UP));
		
		return map;
	}
	/**
	 * 点赞总数前5
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public Map<String,Object> praiseAmountLimit5(String spaceId,Date startDate,Date endDate){
		Map<String,Object> map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		map.put("start", 0);
		map.put("size", 5);
		List<Map<String, Object>> praiseAmount = spaceService.sumPraiseAmountByCondition(map);
		List<Map<String, Object>> praiseAmount2 = projectTaskService.sumPraiseAmountByCondition(map);
		praiseAmount = this.mapMergeUtils(praiseAmount, praiseAmount2, "praiseamount");
		Map<String,Integer> m = this.praiseAmountUtils(praiseAmount);
		m = this.sortMapByVal(m);	//对结果进行排序处理
		map.clear();
		map.put("praiseAmount",praiseAmount);
		map.put("res",m);
		return map;
	}
	/**
	 * 讲list转换成 用户名-密码
	 * @param list
	 * @return
	 */
	private Map<String,Integer> praiseAmountUtils(List<Map<String, Object>> list){
		Map<String,Integer> map = new HashMap<String,Integer>();
		String userName = "";
		int count = 0;
		for(Map<String, Object> m:list){
			userName = m.get("userName").toString();
			count = Integer.parseInt(m.get("praiseamount").toString());
			map.put(userName, count);
		}
		return map;
	}
	/**
	 * 根据map的value进行排序
	 * @param map
	 * @return
	 */
	public Map<String,Integer> sortMapByVal(Map<String,Integer> map) {  
        ArrayList<Map.Entry<String, Integer>> list = new ArrayList<Map.Entry<String, Integer>>(map.entrySet());  
        Collections.sort(list, new Comparator<Map.Entry<String, Integer>>() {  
            @Override  
            public int compare(Entry<java.lang.String, Integer> arg0,  
                    Entry<java.lang.String, Integer> arg1) {  
            	return arg1.getValue() - arg0.getValue();  
            }  
        });  
        Map<String,Integer> newMap = new LinkedHashMap<String, Integer>();  
        for (int i = 0; i < list.size(); i++) {  
            newMap.put(list.get(i).getKey(), list.get(i).getValue());  
        }  
        return newMap;  
    }
	/**
	 * 数据完成统计
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public Map<String,Object> analyseData(String spaceId,String dataType,Date startDate,Date endDate){
		Map<String,Object> map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		int done = spaceService.countTaskByCondition(map);		//已完成
		int done2 = projectTaskService.countSpaceProjectTaskByCondition(map);		//已完成
		done+=done2;
		map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_UNDONE);	//未完成
		int unDone = spaceService.countTaskByCondition(map);
		int unDone2 = projectTaskService.countSpaceProjectTaskByCondition(map);
		unDone+=unDone2;
		//1.按时未完成
		map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		int onTimeUnDone = this.countAnalyse(map, "onTimeUnDone", Constants.TASK_STATUS_UNDONE);
		int onTimeUnDone2 = this.countProjectTaskAnalyse(map, "onTimeUnDone", Constants.TASK_STATUS_UNDONE);
		onTimeUnDone+=onTimeUnDone2;
		//2.超时未完成overtime
		map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		int overTimeUnDone = this.countAnalyse(map, "overTimeUnDone", Constants.TASK_STATUS_UNDONE);
		int overTimeUnDone2 = this.countProjectTaskAnalyse(map, "overTimeUnDone", Constants.TASK_STATUS_UNDONE);
		overTimeUnDone+=overTimeUnDone2;
		//3.按时完成
		map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		int onTimeDone = this.countAnalyse(map, "onTimeDone", Constants.TASK_STATUS_DONE);	
		int onTimeDone2 = this.countProjectTaskAnalyse(map, "onTimeDone", Constants.TASK_STATUS_DONE);	
		onTimeDone+=onTimeDone2;
		//4.超时完成
		map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		int overTimeDone = this.countAnalyse(map, "overTimeDone", Constants.TASK_STATUS_DONE);
		int overTimeDone2 = this.countProjectTaskAnalyse(map, "overTimeDone", Constants.TASK_STATUS_DONE);
		overTimeDone+=overTimeDone2;
		//对比数据时间
		Date lastStartDate = ChartDateUtils.getLastDate(startDate,dataType);
		Date lastEndDate = ChartDateUtils.getLastDate(endDate,dataType);
		map.clear();
		map.put("sourceId", spaceId);
		map.put("startDate", lastStartDate);
		map.put("endDate", lastEndDate);
		map.put("type", ChartLog.TYPE_SPACE_TASK_ONTIMEUNDONE);
		int onTimeUnDoneOld = chartLogService.countByCondition(map);
		map.put("type", ChartLog.TYPE_SPACE_TASK_OVERTIMEUNDONE);
		int overTimeUnDoneOld = chartLogService.countByCondition(map);
		map.put("type", ChartLog.TYPE_SPACE_TASK_ONTIMEDONE);
		int onTimeDoneOld = chartLogService.countByCondition(map);
		map.put("type", ChartLog.TYPE_SPACE_TASK_OVERTIMEDONE);
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
	 * 数据分析 （当前季度的数据和上一季度的数据进行对比）
	 * 任务完成数
	 * 总任务数
	 * 新增任务数
	 * @return
	 */
	public Map<String,Object> dataAnalysis(String spaceId,String dateType,Date startDate,Date endDate){
		Date lastStartDate = ChartDateUtils.getLastDate(startDate,dateType);
		Date lastEndDate = ChartDateUtils.getLastDate(endDate,dateType);
		Map<String,Object> map = new HashMap<String,Object>();//this.getChartParameterMapInit(spaceId, startDate, endDate);
		
		//任务总数(从报表数据中读取)
		map.put("sourceId", spaceId);
		map.put("logDate", endDate);
		map.put("type", ChartLog.TYPE_SPACE_TASK_COUNT);
		map.put("beforeDate", endDate);
		int count = this.getAataAnalysisCount(startDate, map);	//查询任务总量
		map.put("logDate", lastEndDate);
		int countOld = chartLogService.countByCondition(map);	//对比时间段的任务总数
		
		map.clear();
		map.put("startDate",startDate);
		map.put("endDate",endDate);
		map.put("type", ChartLog.TYPE_SPACE_TASK_DONE_COUNT);
		map.put("finishDate", endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
//		int done = chartLogService.countByCondition(map);		//查询时间段的任务完成总数
		int done = this.getAataAnalysisCount(startDate, map);
		
		map.put("startDate",lastStartDate);
		map.put("endDate",lastEndDate);
		map.put("sourceId", spaceId);
		int doneOld = chartLogService.countByCondition(map);		//查询对比时间段的任务完成总数
		map.clear();
		map.put("sourceId", spaceId);
		map.put("type", ChartLog.TYPE_SPACE_TASK_CREATE);
		map.put("startDate",startDate);
		map.put("endDate",endDate);
		map.put("createDate", endDate);
//		int createCount = chartLogService.countByCondition(map);		//查询时间段的任务新建总数
		int createCount = this.getAataAnalysisCount(startDate, map);		//查询时间段的任务新建总数
		map.put("startDate",lastStartDate);
		map.put("endDate",lastEndDate);
		int createCountOld = chartLogService.countByCondition(map);		//查询时间段的任务新建总数
		
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
			count = spaceService.countTaskByCondition(map);
			int count2 = projectTaskService.countSpaceProjectTaskByCondition(map);
			count+=count2;
		}else{
			count = chartLogService.countByCondition(map);
		}
		return count;
	}
	/**
	 * 成员完成情况
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public Map<String,Object> memberDone(String spaceId,Date startDate,Date endDate){
		Map<String, Object> map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		List<Map<String, Object>> countTaskDone = spaceService.getCountTaskByCondition(map);
		List<Map<String, Object>> countTaskDone2 = projectTaskService.getCountSpaceProjectTaskByCondition(map);
		countTaskDone = this.mapMergeUtils(countTaskDone, countTaskDone2,"count");
		map = this.getChartParameterMapInit(spaceId, startDate, endDate);
		map.put("taskStatus", Constants.TASK_STATUS_DONE);
		map.put("isOntime", "onTimeDone");	
		List<Map<String, Object>> countTaskTimelyDone = spaceService.getCountTaskByCondition(map);
		List<Map<String, Object>> countTaskTimelyDone2 = projectTaskService.getCountSpaceProjectTaskByCondition(map);
		countTaskTimelyDone = this.mapMergeUtils(countTaskTimelyDone, countTaskTimelyDone2,"count");
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
	 * 合并两份数据
	 * @param map1
	 * @param map2
	 * @return
	 */
	public List<Map<String, Object>> mapMergeUtils(List<Map<String, Object>> map1,List<Map<String, Object>> map2,String countKey){
		Map<String, Map<String, Object>> maps = new HashMap<String, Map<String,Object>>();
		for(Map<String, Object> m:map1){
			maps.put(m.get("userName").toString(), m);
		}
		String key="";
		for(Map<String, Object> m:map2){
			if(m.containsKey("userName")){
				key = m.get("userName").toString();
				if(maps.containsKey(key)){
					int count1 = Integer.parseInt(maps.get(key).get(countKey).toString());
					int count2 = Integer.parseInt(m.get(countKey).toString());
					m.put(key, (count1+count2));
					maps.put(key, m);
				}else{
					maps.put(key, m);	
				}
			}
		}
		List<Map<String, Object>> resMap = new ArrayList<Map<String, Object>>();
		for(String k : maps.keySet()){
			resMap.add(maps.get(k));
		}
		return resMap;
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
		return spaceService.countTaskByCondition(map);	
	}
	
	private int countProjectTaskAnalyse(Map<String,Object> map,
			String isOntime,String taskStatus){
		map.put("taskStatus", taskStatus);
		map.put("isOntime", isOntime);	
		return projectTaskService.countSpaceProjectTaskByCondition(map);	
	}
	
	/**
	 * 根据空间id获取相应的报表数据
	 * 参数初始化
	 * @param spaceId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	private Map<String,Object> getChartParameterMapInit(String spaceId,Date startDate,Date endDate){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("spaceId", spaceId);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		return map;
	}
	
}