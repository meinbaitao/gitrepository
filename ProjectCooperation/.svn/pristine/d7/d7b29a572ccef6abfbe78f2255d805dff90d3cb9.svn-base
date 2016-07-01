package com.bt.chart;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.junit.After;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.bt.basic.BasicTest;
import com.bt.surfond.chart.service.SpaceChartService;
import com.thinkgem.jeesite.common.utils.ChartDateUtils;
import com.thinkgem.jeesite.common.utils.DateUtils;


/**
 * 
 * @author xiaocai
 *
 */
public class SpaceChartServiceTest extends BasicTest{

	private final String spaceId="02fd93c22aa1428794f2eb2bc788918e";
	private final String dateType=ChartDateUtils.day;
	private final Date endDate=ChartDateUtils.getEndDate(new Date());//ChartDateUtils.getEndDateByWeek(4);
	private final Date startDate=ChartDateUtils.getStartDate(endDate);
	
	@Autowired
	private SpaceChartService spaceChartService;
	
	@After
	public void outPrintlnCondition(){
		System.out.println("startDate:"+DateUtils.formatDate(startDate,DateUtils.YMD_HMS));
		System.out.println("endDate:"+DateUtils.formatDate(endDate,DateUtils.YMD_HMS));
	}
	
	@Test
	public void taskDoneAmount(){
		Map<String,Object> map = spaceChartService.taskDoneAmount(spaceId, startDate,endDate);
		System.out.println("任务完成量:"+map);
	}
	@Test
	public void dataAnalysis(){
		Map<String,Object> map = spaceChartService.dataAnalysis(spaceId, dateType,startDate,endDate);
		System.out.println("数据分析:"+map);
	}
	@Test
	public void taskOnTimeDone(){
		Map<String,Object> map = spaceChartService.taskOnTimeDone(spaceId,startDate,endDate);
		System.out.println("任务按时完成率:"+map);
	}
	@Test
	public void praiseAmountLimit5(){
		Map<String,Object> map = spaceChartService.praiseAmountLimit5(spaceId,startDate,endDate);
		System.out.println("成员累计点赞（前5）:"+map);
	}
	@Test
	public void analyseData(){
		Map<String,Object> map = spaceChartService.analyseData(spaceId,dateType,startDate,endDate);
		System.out.println("任务数据统计分析:"+map);
	}
	@Test
	public void memberDone(){
		Map<String,Object> map = spaceChartService.memberDone(spaceId,startDate,endDate);
		System.out.println("各成员数据分析:"+map);
	}
	
	public Map<String,Integer> sortMap(Map<String,Integer> oldMap) {  
        ArrayList<Map.Entry<String, Integer>> list = new ArrayList<Map.Entry<String, Integer>>(oldMap.entrySet());  
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
	@Test
	public void mt() {  
		Map<String, Integer> myMap = new LinkedHashMap<String, Integer>();  
        myMap.put("1", 1);  
        myMap.put("2", 4);  
        myMap.put("3", 3);  
        myMap.put("4", 9);  
        myMap.put("5", 6);  
        myMap.put("6", 2); 
        
        System.out.println("===================mapStart==================");  
        for(String k:myMap.keySet()){  
            System.out.println(k + ":" + myMap.get(k));  
        }  
        System.out.println("===================mapEnd==================");  
        
        myMap = this.sortMap(myMap);
        
        System.out.println("===================mapStart==================");  
        for(String k:myMap.keySet()){  
            System.out.println(k + ":" + myMap.get(k));  
        }  
        System.out.println("===================mapEnd==================");  
    }  
//	@Test
//	public void getChartBySpaceId(){
//		String spaceId = "f2c9e978342840d59fb173bbafd53487";
//		Date sd = ChartDateUtils.getEndDateByWeek(1);
//		Date ed = ChartDateUtils.getWeekStartDateByEndDate(ChartDateUtils.getEndDateByWeek(1));
//		Map<String,Object> map = spaceChartService.getChartBySpaceId(spaceId, sd,ed);
//		System.out.println(map);
////		map.put("onTimeUnDone", onTimeUnDone);
////		map.put("overTimeUnDone", overTimeUnDone);
////		map.put("onTimeDone", onTimeDone);
////		map.put("overTimeDone", overTimeDone);
////		System.out.println("countTaskDone:"+map.get("countTaskDone"));
////		System.out.println("countTaskTimelyDone:"+map.get("countTaskTimelyDone"));
////		System.out.println("countTaskMap:"+map.get("countTaskMap"));
////		System.out.println("overTimeDone:"+map.get("overTimeDone"));
////		System.out.println("countTaskTimelyDone:"+map.get("countTaskTimelyDone"));
//		System.out.println("dataMap:"+map.get("dataMap"));
//	}
	
}
