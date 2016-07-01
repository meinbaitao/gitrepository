package com.bt.surfond.calendar;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bt.surfond.common.Constants;
import com.bt.surfond.task.entity.ProjectTask;
import com.thinkgem.jeesite.common.utils.StringUtils;

/**
 * 将任务组装成日历格式的数据
 * @author mjs
 *
 */
public class CalendarUtil {
	
	/**
	 * 将任务组装成日历格式的数据
	 * @param list
	 * @return
	 */
	public static List<Map<String,String>> setCalendar(List<ProjectTask> list){
		List<Map<String,String>> mapList = new ArrayList<Map<String,String>>();
		for (ProjectTask p : list) {
			if(p.getDueDate()!=null){
				Map<String,String> map = new HashMap<String,String>();
				map.put("id", p.getId());
				if(StringUtils.isNotBlank(p.getTitle())){
					map.put("title", p.getTitle());
				}else{
					map.put("title", "未命名");
				}
				String end = p.getDueDate();
				map.put("start", end);
				map.put("end", end);
				if(StringUtils.isNotBlank(p.getStatus())){
					if(Constants.TASK_STATUS_DONE.equals(p.getStatus())){
						map.put("color", "green");
					}else if(Constants.TASK_STATUS_UNDONE.equals(p.getStatus())){
						map.put("color", "#1C86EE");
					}
				}
				map.put("className", "calendar_"+p.getId());
				mapList.add(map);
			}
		}
		return mapList;
	}
	
}
