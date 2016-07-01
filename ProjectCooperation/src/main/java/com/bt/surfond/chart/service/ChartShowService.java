/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.chart.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.chart.dao.ChartShowDao;
import com.bt.surfond.chart.entity.ChartShow;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;

/**
 * 报表日志记录 Service
 * @author xiaocai
 * @version 2016-3-7
 */
@Service
@Transactional(readOnly = true)
public class ChartShowService extends CrudService<ChartShowDao, ChartShow> {

	@Autowired
	private ChartShowDao chartShowDao;
	
	
	/**
	 * 获取单条数据
	 * @param chartShow
	 * @return
	 */
	public ChartShow getOne(ChartShow chartShow) {
		return chartShowDao.getOne(chartShow);
	}
	
	public Page<ChartShow> find(Page<ChartShow> page, ChartShow chartShow) {
		chartShow.setPage(page);
		page.setList(chartShowDao.findList(chartShow));
		return page;
	}
	/**
	 * 插入数据
	 * @param chartShow
	 * @return
	 */
	@Transactional(readOnly = false)
	public ChartShow insert(ChartShow chartShow) {
		ChartShow c = this.getOne(chartShow);
		if(c!=null){	//验证数据，防止重复插入
			return c;
		}else{
			chartShowDao.insert(chartShow);
		}
		return chartShow;
	}
	/**
	 * 删除数据
	 * @param chartShow
	 * @return
	 */
	@Transactional(readOnly = false)
	public boolean deleteChartByCondition(ChartShow chartShow) {
		int res = chartShowDao.deleteChartByCondition(chartShow);
		return res>=1;
	}
	
	
	public ChartShow get(String id) {
		return chartShowDao.get(id);
	}
	
	@Transactional(readOnly = false)
	public void save(ChartShow chartShow) {
		super.save(chartShow);
	}
	
	@Transactional(readOnly = false)
	public void delete(ChartShow chartShow) {
		chartShowDao.delete(chartShow);
	}
	
}
