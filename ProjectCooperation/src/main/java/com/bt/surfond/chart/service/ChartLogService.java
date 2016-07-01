/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.chart.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.chart.dao.ChartLogDao;
import com.bt.surfond.chart.entity.ChartLog;
import com.bt.surfond.common.Constants;
import com.bt.surfond.space.service.SpaceService;
import com.bt.surfond.task.service.ProjectTaskService;
import com.bt.surfond.team.service.TeamService;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;

/**
 * 报表日志记录 Service
 * @author xiaocai
 * @version 2016-3-7
 */
@Service
@Transactional(readOnly = true)
public class ChartLogService extends CrudService<ChartLogDao, ChartLog> {

	@Autowired
	private ChartLogDao chartLogDao;
	@Autowired
	private SpaceService spaceService;
	@Autowired
	private ProjectTaskService projectTaskService;
	@Autowired
	private TeamService teamService;
	
	/*-------------------------------初始化数值-----------------------------------*/
	/**
	 * 统计空间总任务数
	 * @param beforeDate 日期之前的总任务数
	 */
	@Transactional(readOnly = false)
	public void initSpaceTaskCount(Date beforeDate){
		Map<String, Object> m = new HashMap<String,Object>();
		if(beforeDate==null){
			beforeDate = new Date();
		}
		m.put("beforeDate", beforeDate);
		List<Map<String, Object>> list = spaceService.countSpaceTaskByCondition(m);
		List<Map<String, Object>> list2 = projectTaskService.getCountSpaceProjectTaskForChartLog(m);
		list = this.mapMergeUtils(list, list2, "count");
		this.initList(list, ChartLog.TYPE_SPACE_TASK_COUNT,beforeDate);
	}
	/**
	 * 统计空间任务完成数
	 * @param finishDate 该日期的任务完成数
	 */
	@Transactional(readOnly = false)
	public void initSpaceTaskDoneCount(Date finishDate){
		Map<String, Object> m = new HashMap<String,Object>();
		if(finishDate==null){
			finishDate = new Date();
		}
		m.put("finishDate", finishDate);
		m.put("taskStatus", Constants.TASK_STATUS_DONE);
		List<Map<String, Object>> list = spaceService.countSpaceTaskByCondition(m);
		List<Map<String, Object>> list2 = projectTaskService.getCountSpaceProjectTaskForChartLog(m);
		list = this.mapMergeUtils(list, list2, "count");
		this.initList(list, ChartLog.TYPE_SPACE_TASK_DONE_COUNT,finishDate);
	}
	/**
	 * 统计空间任务新建数
	 */
	@Transactional(readOnly = false)
	public void initSpaceTaskCreate(Date createDate){
		Map<String, Object> m = this.initCreateDate(createDate);
		List<Map<String, Object>> list = spaceService.countSpaceTaskByCondition(m);
		List<Map<String, Object>> list2 = projectTaskService.getCountSpaceProjectTaskForChartLog(m);
		list = this.mapMergeUtils(list, list2, "count");
		this.initList(list, ChartLog.TYPE_SPACE_TASK_CREATE,createDate);
	}
	/**
	 * 初始 任务数统计分析 数据
	 */
	@Transactional(readOnly = false)
	public void initSpaceTaskAnalyse(Date createDate){
//		Map<String, Object> m = this.initCreateDate(createDate);
		Map<String, Object> m = new HashMap<String,Object>();
		//按时未完成
		m.put("taskStatus", Constants.TASK_STATUS_UNDONE);
		m.put("isOntime", "onTimeUnDone");	
		List<Map<String, Object>> list = spaceService.countSpaceTaskByCondition(m);
		List<Map<String, Object>> list2 = projectTaskService.getCountSpaceProjectTaskForChartLog(m);
		list = this.mapMergeUtils(list, list2, "count");
		this.initList(list, ChartLog.TYPE_SPACE_TASK_ONTIMEUNDONE,createDate);
		//超时未完成
		m.put("isOntime", "overTimeUnDone");	
		list = spaceService.countSpaceTaskByCondition(m);
		list2 = projectTaskService.getCountSpaceProjectTaskForChartLog(m);
		list = this.mapMergeUtils(list, list2, "count");
		this.initList(list, ChartLog.TYPE_SPACE_TASK_OVERTIMEUNDONE,createDate);
		//按时完成
		m.put("taskStatus", Constants.TASK_STATUS_DONE);
		m.put("isOntime", "onTimeDone");	
		list = spaceService.countSpaceTaskByCondition(m);
		list2 = projectTaskService.getCountSpaceProjectTaskForChartLog(m);
		list = this.mapMergeUtils(list, list2, "count");
		this.initList(list, ChartLog.TYPE_SPACE_TASK_ONTIMEDONE,createDate);
		//超时完成
		m.put("isOntime", "overTimeDone");	
		list = spaceService.countSpaceTaskByCondition(m);
		list2 = projectTaskService.getCountSpaceProjectTaskForChartLog(m);
		list = this.mapMergeUtils(list, list2, "count");
		this.initList(list, ChartLog.TYPE_SPACE_TASK_OVERTIMEDONE,createDate);
	}
	/**
	 * 团队总任务数
	 */
	@Transactional(readOnly = false)
	public void initTeamTaskCount(Date date){
		Map<String, Object> m = this.initBeforeDate(date);
		//总任务数
		List<Map<String, Object>> list = teamService.countTeamTaskByCondition(m);
		this.initList(list, ChartLog.TYPE_TEAM_TASK_COUNT,date);
	}
	/**
	 * 团队任务完成数
	 * @param date
	 */
	@Transactional(readOnly = false)
	public void initTeamTaskDone(Date date){
		Map<String, Object> m = new HashMap<String,Object>();
		//任务完成数
		m.clear();
		m.put("finishDate", date);
		m.put("taskStatus", Constants.TASK_STATUS_DONE);
		List<Map<String, Object>> list = teamService.countTeamTaskByCondition(m);
		this.initList(list, ChartLog.TYPE_TEAM_TASK_DONE,date);
	}
	/**
	 * 团队任务新建数
	 * @param date
	 */
	@Transactional(readOnly = false)
	public void initTeamTaskCreate(Date date){
		Map<String, Object> m = this.initCreateDate(date);
		List<Map<String, Object>> list = teamService.countTeamTaskByCondition(m);
		this.initList(list, ChartLog.TYPE_TEAM_TASK_CREATE,date);
	}
	/**
	 * 初始项目的报表统计分析数据
	 */
	@Transactional(readOnly = false)
	public void initProjectTask(Date createDate){
		Map<String, Object> m = new HashMap<String,Object>();
		//按时未完成
		m.put("taskStatus", Constants.TASK_STATUS_UNDONE);
		m.put("isOntime", "onTimeUnDone");	
		List<Map<String, Object>> list = projectTaskService.countProjectTaskByCondition(m);
		this.initList(list, ChartLog.TYPE_PROJECT_TASK_ONTIMEUNDONE,createDate);
		//超时未完成
		m.put("isOntime", "overTimeUnDone");	
		list = projectTaskService.countProjectTaskByCondition(m);
		this.initList(list, ChartLog.TYPE_PROJECT_TASK_OVERTIMEUNDONE,createDate);
		//按时完成
		m.put("taskStatus", Constants.TASK_STATUS_DONE);
		m.put("isOntime", "onTimeDone");	
		list = projectTaskService.countProjectTaskByCondition(m);
		this.initList(list, ChartLog.TYPE_PROJECT_TASK_ONTIMEDONE,createDate);
		//超时完成
		m.put("isOntime", "overTimeDone");	
		list = projectTaskService.countProjectTaskByCondition(m);
		this.initList(list, ChartLog.TYPE_PROJECT_TASK_OVERTIMEDONE,createDate);
	}
	
	/*-------------------------------共用调用方法-----------------------------------------*/
	/**
	 * 初始插入列表数据
	 * @param list
	 * @param chartType
	 */
//	private void initList(List<Map<String, Object>> list,String chartType){
//		ChartLog chartLog = new ChartLog();
//		Date logDate = new Date();
//		for(Map<String, Object> map:list){
//			chartLog = this.spaceChartLogUtils(chartLog, map, chartType, logDate);
//			this.saveUtils(chartLog);
//		}
//	}
	private void initList(List<Map<String, Object>> list,String chartType,Date logDate){
		ChartLog chartLog = new ChartLog();
		if(logDate==null){
			logDate = new Date();
		}
		for(Map<String, Object> map:list){
			chartLog = this.spaceChartLogUtils(chartLog, map, chartType, logDate);
			this.saveUtils(chartLog);
		}
	}
	/**
	 * 保存数据
	 * @param chartLog
	 */
	@Transactional(readOnly = false)
	public void saveUtils(ChartLog chartLog){
		ChartLog cl = chartLogDao.getOneByCondition(chartLog);
		if(cl==null){
			chartLogDao.insert(chartLog);
		}else{
			chartLog.setId(cl.getId());
			chartLogDao.update(chartLog);
		}
	}
	/**
	 * 初始创建时间条件
	 * @param m
	 * @param createDate
	 * @return
	 */
	private Map<String, Object> initCreateDate(Date createDate){
		Map<String, Object> m = new HashMap<String,Object>();
		if(createDate==null){
			createDate = new Date();
		}
		m.put("createDate", createDate);
		return m;
	}
	/**
	 * 初始化beforeDate
	 * @param beforeDate
	 * @return
	 */
	private Map<String, Object> initBeforeDate(Date beforeDate){
		Map<String, Object> m = new HashMap<String,Object>();
		if(beforeDate==null){
			beforeDate = new Date();
		}
		m.put("beforeDate", beforeDate);
		return m;
	}
	/**
	 * 空间日志实体生成共用方法
	 * @param chartLog
	 * @param map
	 * @param type
	 * @param now
	 * @return
	 */
	private ChartLog spaceChartLogUtils(ChartLog chartLog,Map<String, Object> map,String type,Date logDate){
		chartLog = new ChartLog();
		chartLog.setId(IdGen.uuid());
		chartLog.setType(type);
		chartLog.setSourceId(map.get("id").toString());
		chartLog.setDescription(map.get("count").toString());
		chartLog.setCreateDate(new Date());
		chartLog.setLogDate(logDate);
		return chartLog;
	}
	/**
	 * 数据合并
	 * @param map1
	 * @param map2
	 * @param countKey
	 * @return
	 */
	public List<Map<String, Object>> mapMergeUtils(List<Map<String, Object>> map1,List<Map<String, Object>> map2,String countKey){
		Map<String, Map<String, Object>> maps = new HashMap<String, Map<String,Object>>();
		for(Map<String, Object> m:map1){
			maps.put(m.get("id").toString(), m);
		}
		String key="";
		for(Map<String, Object> m:map2){
			key = m.get("id").toString();
			if(maps.containsKey(key)){
				int count1 = Integer.parseInt(maps.get(key).get(countKey).toString());
				int count2 = Integer.parseInt(m.get(countKey).toString());
				m.put(key, (count1+count2));
				maps.put(key, m);
			}else{
				maps.put(key, m);
			}
		}
		List<Map<String, Object>> resMap = new ArrayList<Map<String, Object>>();
		for(String k : maps.keySet()){
			resMap.add(maps.get(k));
		}
		return resMap;
	}
	/*-----------------------------report log end--------------------------------------*/
	
//	放弃模块
//	/**
//	 * 初始统计空间成员数
//	 */
//	@Transactional(readOnly = false)
//	public void initSpaceMember(){
//		List<Map<String, Object>> list = spaceService.countSpanceMember(new HashMap<String,Object>());
//		this.initList(list, ChartLog.TYPE_SPACE_MEMBER);
//	}
	
	
	
	/*------------------------------- 查看数据 -----------------------------------*/
	
	
	public int countByCondition(Map<String, Object> map){
		int res = 0;
		List<ChartLog> list = this.selectByCondition(map);
		if(list.size()>0){
			String count = this.selectByCondition(map).get(0).getDescription();
			if(StringUtils.isNotBlank(count)){
				res = Integer.parseInt(count);
			}
		}
		return res;
	}
	
	/**
	 * 根据条件获取列表数据
	 * @param map
	 * @return
	 */
	public List<ChartLog> selectByCondition(Map<String, Object> map){
		List<ChartLog> list = chartLogDao.selectByCondition(map);
		if(list==null){
			list = new ArrayList<ChartLog>();
		}
		return list;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	public ChartLog get(String id) {
		return chartLogDao.get(id);
	}
	
	public Page<ChartLog> find(Page<ChartLog> page, ChartLog chartLog) {
		chartLog.setPage(page);
		page.setList(chartLogDao.findList(chartLog));
		return page;
	}
	
	@Transactional(readOnly = false)
	public void save(ChartLog chartLog) {
		super.save(chartLog);
	}
	
	@Transactional(readOnly = false)
	public void delete(ChartLog chartLog) {
		chartLogDao.delete(chartLog);
	}
	
}
