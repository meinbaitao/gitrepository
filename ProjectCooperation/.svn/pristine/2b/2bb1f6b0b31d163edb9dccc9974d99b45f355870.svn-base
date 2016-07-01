/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.dynamic.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.common.Constants;
import com.bt.surfond.dynamic.dao.DynamicDao;
import com.bt.surfond.dynamic.entity.Dynamic;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 动态记录表Service
 * @author xjp
 * @version 2015-11-21
 */
@Service
@Transactional
public class DynamicService extends CrudService<DynamicDao, Dynamic> {
	
	public static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	
	@Autowired
	private DynamicDao dynamicDao;

	public Dynamic get(String id) {
		return super.get(id);
	}
	
	public List<Dynamic> findList(Dynamic dynamic) {
		return super.findList(dynamic);
	}
	
	public Page<Dynamic> findPage(Page<Dynamic> page, Dynamic dynamic) {
		return super.findPage(page, dynamic);
	}
	
	@Transactional(readOnly = false)
	public void save(Dynamic dynamic) {
		super.save(dynamic);
	}
	
	/**
	 * 任务和动态的操作记录
	 * @param IP
	 * @param resourceId
	 * @param aboutUserId
	 * @param taskId
	 * @param description
	 * @param type
	 * @param source
	 */
	@Transactional(readOnly = false)
	public void operateDynamic(String IP,String resourceId,String aboutUserId,String taskId,String description,String type,String source){
		Dynamic d = new Dynamic();
		User user = UserUtils.getUser();
		Date date = new Date();
		String year = format.format(date).substring(0,4);
		d.setId(IdGen.uuid());
		d.setCreateBy(user);								//创建人
		d.setCreateDate(date);								//创建时间
		d.setYear(year);									//年份
		d.setRemoteAddr(IP);								//客户端IP地址
		d.setIsNewRecord(true);								//新纪录
		if(UserUtils.getUser().getId().equals(aboutUserId)){
			d.setStatus("1");									//默认未读状态
		}else{
			d.setStatus("0");									//默认未读状态
		}
		d.setResourceId(resourceId);						//类型上级ID，如话题是属于空间的
		d.setType(type);									//设置类型
		d.setAboutUserId(aboutUserId);						//关联人
		d.setTaskId(taskId);								//所属记录
		d.setDescription(description);						//记录描述
		d.setSource(source);
		save(d);
	}
	
	@Transactional(readOnly = false)
	public void delete(Dynamic dynamic) {
		super.delete(dynamic);
	}
	
	/**
	 * 根据用户查询空间下与用户相关的任务记录
	 * @param spaceId
	 * @return
	 */
	public List<Dynamic> findAllOfOneUserInSpace(Dynamic dynamic){
		List<Dynamic> list = dynamicDao.findAllOfOneUserInSpace(dynamic);
		List<Dynamic> dynamics = new ArrayList<Dynamic>();
		for (Dynamic d : list) {
			Map<String, Object> map = new HashMap<String, Object>();
			JSONObject json = new JSONObject(d.getDescription());
			String content = json.optString("content");
			if(StringUtils.isNotBlank(content)){
				map.put("userName", d.getUserName());
				map.put("content", content);
				d.setMap(map);
				dynamics.add(d);
			}
		}
		return dynamics;
	}
	
	/**
	 * 根据用户查询空间下与用户相关的任务记录
	 * @param spaceId
	 * @return
	 */
	public List<Dynamic> findAllInTask(Dynamic dynamic){
		List<Dynamic> list = dynamicDao.findAllInTask(dynamic);
		List<Dynamic> dynamics = new ArrayList<Dynamic>();
		for (Dynamic d : list) {
			Map<String, Object> map = new HashMap<String, Object>();
			JSONObject json = new JSONObject(d.getDescription());
			String content = json.optString("content");
			if(StringUtils.isNotBlank(content)){
				map.put("userName", d.getUserName());
				map.put("content", content);
				d.setMap(map);
				dynamics.add(d);
			}
		}
		return dynamics;
	}
	
	/**
	 * 检查有没有未读动态
	 * @param spaceId
	 * @return
	 */
	public List<Dynamic> findByDynamicStatus(Dynamic dynamic){
		//设置未读查询参数
		dynamic.setStatus(Constants.DYNAMIC_STATUS_UNREAD);
		//设置当前登录用户
		dynamic.setAboutUserId(UserUtils.getUser().getId());
		return dynamicDao.findByDynamicStatus(dynamic);
	}
	
	/**
	 * 批量删除动态记录
	 * @param taskId
	 */
	@Transactional(readOnly = false)
	public void deleteMore(String taskId){
		Dynamic d = new Dynamic();
		d.setTaskId(taskId);
		dynamicDao.deleteMore(d);
	}
	/**
	 * 点击动态修改所有的未读消息改为已读
	 * @param spaceId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateDynamicStatus(String resourceId,String aboutUserId,String type){
		//设置未读查询参数
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resourceId", resourceId);
		map.put("type", type);
		map.put("status", Constants.DYNAMIC_STATUS_READ);
		map.put("aboutUserId", aboutUserId);
		map.put("delFlag", Dynamic.DEL_FLAG_NORMAL);
		return dynamicDao.updateDynamicStatus(map);
	}
	
	/**
	 * 根据用户ID查找用户动态
	 * @return
	 */
	public List<Dynamic> findDynamicByUserId(){
		Dynamic dynamic = new Dynamic();
		dynamic.setAboutUserId(UserUtils.getUser().getId());
		List<Dynamic> list = dao.findDynamicByUserId(dynamic);
		List<Dynamic> dynamics = new ArrayList<Dynamic>();
		for (Dynamic d : list) {
			Map<String, Object> map = new HashMap<String, Object>();
			JSONObject json = new JSONObject(d.getDescription());
			String content = json.optString("content");
			if(StringUtils.isNotBlank(content)){
				map.put("userName", d.getUserName());
				map.put("content", content);
				d.setMap(map);
				dynamics.add(d);
			}
		}
		return dynamics;
	}
	
	/**
	 * 保存任务记录
	 * @param dynamic
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveTaskRecord(Dynamic dynamic){
		dynamic.setType(Dynamic.TYPE_TASK);
		dynamic.setStatus(Dynamic.STATUS_UNREAD);
		dynamic.setYear(getCurrentYear());
		dynamic.preInsert();
		return dao.insert(dynamic);
	}
	
	/**
	 * 查询任务记录列表
	 * @param dynamic
	 * @return
	 */
	public List<Dynamic> findTaskRecordList(Dynamic dynamic){
		return dao.findTaskRecordList(dynamic);
	}
	
	/**
	 * 查询最新的任务记录
	 * @param dynamic
	 * @return
	 */
	public Dynamic findLastTaskRecord(Dynamic dynamic){
		return dao.findLastTaskRecord(dynamic);
	}
	
	/**
	 * 从记录中查询任务的历史负责人
	 * @param dynamic
	 * @return
	 */
	public List<Map<String, Object>> findHistoryOwnerByTaskId(Dynamic dynamic){
		return dao.findHistoryOwnerByTaskId(dynamic);
	}
	
	/**
	 * 获取当前年份
	 * @return
	 */
	private String getCurrentYear(){
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		return String.valueOf(cal.get(Calendar.YEAR));
	}
	
}