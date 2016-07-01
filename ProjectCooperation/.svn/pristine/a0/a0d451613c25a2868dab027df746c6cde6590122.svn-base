package com.bt.chart;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.bt.basic.BasicTest;
import com.bt.surfond.chart.entity.ChartShow;
import com.bt.surfond.chart.service.ChartShowService;
import com.thinkgem.jeesite.common.persistence.Page;


/**
 * 
 * @author xiaocai
 *
 */
public class ChartShowServiceTest extends BasicTest{

	@Autowired
	private ChartShowService chartShowService;
	
	@Test
	public void findPage(){	
		Page<ChartShow> page = new Page<ChartShow>();
		ChartShow chartShow = new ChartShow();
		Page<ChartShow> p = chartShowService.findPage(page, chartShow);
		System.out.println(p.getList());
	}
	
	
	
	
}
