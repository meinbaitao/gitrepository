package com.bt.surfond.chart.web;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.chart.service.SpaceChartService;
import com.bt.surfond.task.entity.ProjectTask;
import com.thinkgem.jeesite.common.utils.DateUtils;

/**
 * 项目图表信息
 * @author xiaocai
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/space/chart")
public class SpaceChartController {
	
	@Autowired
	private SpaceChartService spaceChartService;
	
	@RequestMapping(value = "getChartBySpaceId")
	@ResponseBody
	public Map<String, Object> getChartBySpaceId(ProjectTask projectTask, HttpServletRequest request){
		String spaceId = request.getParameter("spaceId");
		String dataType = request.getParameter("dataType");
		Date startDate = DateUtils.parseDate(request.getParameter("startDate"), DateUtils.YMD_HMS);
		Date endDate = DateUtils.parseDate(request.getParameter("endDate"), DateUtils.YMD_HMS);
//		ChartDateUtils.
		Map<String,Object> map = spaceChartService.getChartBySpaceId(spaceId, dataType, startDate, endDate);
//		Map<String,Object> map = spaceChartService.getChartBySpaceId(spaceId, null, null);
//		projectTask.setIp(StringUtils.getRemoteAddr(request));
//		projectTask.setSource(Constants.OPTION_PC);
//		projectTaskService.saveProject(projectTask);
//		return JsonUtils.jsonStringTo(projectTaskService.findProject(projectTask));
		return map;
	}
	
}


