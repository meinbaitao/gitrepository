package com.bt.surfond.schedule.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.poj.utils.JsonUtils;
import com.bt.surfond.schedule.entity.Schedule;
import com.bt.surfond.schedule.service.ScheduleService;

/**
 * 任务调度Controller
 * @author xjp
 * @version 2015-11-19
 */
@Controller
@RequestMapping(value = "${adminPath}/schedule")
public class ScheduleController extends BaseController {

	@Autowired
	private ScheduleService scheduleService;
	
	/**
	 * 设置是否启动定时任务
	 * @param schedule
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "save")
	public String save(Schedule schedule,HttpServletRequest request, HttpServletResponse response) {
		JSONObject jsonObj = new JSONObject();
		//1.根据当前登录人，空间编号查询是否已设定开启提醒
		Schedule sch = scheduleService.findScheduleByTaskId(schedule);
		if(null !=sch && StringUtils.isNotBlank(sch.getId())){
			scheduleService.delSchedule(sch);
			jsonObj.put("deleteId", sch.getId());
		}else{
			schedule.setId(IdGen.uuid());
			schedule.setIsNewRecord(true);
			scheduleService.insert(schedule);
			jsonObj.put("id", schedule.getId());
		}
		return renderString(response,JsonUtils.jsonString(jsonObj),"application/json");
	}
	
	/**
	 * 查询是否已启动项目
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="list")
	public Map<String, Object> findProjectList(HttpServletRequest request, HttpServletResponse response) {
		List<Map<String, Object>> list =scheduleService.findSpaceListAndItsScheduleOptions();
		return JsonUtils.jsonString(list); 
	}
	
}