package com.bt.surfond.chart.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.chart.entity.ChartShow;
import com.bt.surfond.chart.service.ChartShowService;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.poj.utils.JsonUtils;

/**
 * 图表显示
 * @author xiaocai
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/chartShow")
public class ChartShowController {
	
	@Autowired
	private ChartShowService chartShowService;
	
	
	/**
	 * 根据用户选择进行添加需显示的报表数据 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "createChartShow")
	@ResponseBody
	public Map<String, Object> createChartShow(HttpServletRequest request){
		String sourceId = request.getParameter("sourceId");		// 数据源头
		String label = request.getParameter("label");			// 数据源头
		String type = request.getParameter("type");				// 报表类型
		String charttype = request.getParameter("charttype");	// 显示的图表类型
		ChartShow chartShow = new ChartShow(IdGen.uuid(),sourceId,label,type,charttype,"");
		chartShow = chartShowService.insert(chartShow);
		return JsonUtils.jsonStringTo(chartShow);
	}
	
	
	/**
	 * 根据当前用户获取对应的需要显示的报表数据
	 * @param projectTask
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "getCurrentUserChart")
	@ResponseBody
	public Map<String, Object> getCurrentUserChart(HttpServletRequest request){
		String type = request.getParameter("type");				// 报表类型
		Page<ChartShow> page = new Page<ChartShow>();
		ChartShow chartShow = new ChartShow();
		chartShow.setType(type);
		page = chartShowService.findPage(page, chartShow);
		return JsonUtils.jsonStringTo(page);
	}
	/**
	 * 删除显示的图表
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "deleteChartByCondition")
	@ResponseBody
	public Map<String, Object> deleteChartByCondition(HttpServletRequest request){
		String sourceId = request.getParameter("sourceId");		// 数据源头
		String label = request.getParameter("label");			// 数据源头
		String type = request.getParameter("type");				// 报表类型
		String charttype = request.getParameter("charttype");	// 显示的图表类型
		ChartShow chartShow = new ChartShow("",sourceId,label,type,charttype,"");
		boolean flag = chartShowService.deleteChartByCondition(chartShow);
		return JsonUtils.jsonStringTo(flag);
	}
	
}


