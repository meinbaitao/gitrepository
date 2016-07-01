/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.dynamic.web;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.dynamic.entity.Dynamic;
import com.bt.surfond.dynamic.service.DynamicService;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;

/**
 * 动态记录表Controller
 * @author xjp
 * @version 2015-11-21
 */
@Controller
@RequestMapping(value = "${adminPath}/dynamic")
public class DynamicController extends BaseController {

	@Autowired
	private DynamicService dynamicService;
	
	@ModelAttribute
	public Dynamic get(@RequestParam(required=false) String id) {
		Dynamic entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = dynamicService.get(id);
		}
		if (entity == null){
			entity = new Dynamic();
		}
		return entity;
	}
	
	/**
	 * 根据用户查找空间下雨用户相关的任务操作记录
	 * @param dynamic
	 * @param redirectAttributes
	 * @return
	 */
	@RequestMapping(value = "findBySpaceAndUser")
	@ResponseBody
	public String findBySpaceAndUser(Dynamic dynamic,HttpServletRequest request,HttpServletResponse response) {
		try{
			dynamicService.updateDynamicStatus(dynamic.getResourceId(),dynamic.getAboutUserId(),dynamic.getType());
		}catch(Exception e){
			e.printStackTrace();
		}
		return renderString(response,dynamicService.findAllOfOneUserInSpace(dynamic));
	}
	
	/**
	 * 根据任务ID查找任务的操作记录
	 * @param dynamic
	 * @param redirectAttributes
	 * @return
	 */
	@RequestMapping(value = "findByTask")
	@ResponseBody
	public List<Dynamic> findByTask(Dynamic dynamic,HttpServletRequest request) {
		return dynamicService.findAllInTask(dynamic);
	}
	
	
	/**
	 * 检查有没有未读动态
	 * @param dynamic
	 * @param redirectAttributes
	 * @return
	 */
	@RequestMapping(value = "findByDynamicStatus")
	@ResponseBody
	public Map<String, Object> findByDynamicStatus(Dynamic dynamic,HttpServletRequest request,HttpServletResponse response) {
		List<Dynamic> dyn = dynamicService.findByDynamicStatus(dynamic);
		return JsonUtils.jsonString(dyn);
	}
	
	/**
	 * 查询任务记录列表
	 * @param dynamic
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findtaskrecordlist")
	public Map<String, Object> findTaskRecordList(Dynamic dynamic){
		return JsonUtils.jsonStringTo(dynamicService.findTaskRecordList(dynamic));
	}
	
	/**
	 * 查询最新的任务记录
	 * @param dynamic
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findlasttaskrecord")
	public Map<String, Object> findLastTaskRecord(Dynamic dynamic){
		return JsonUtils.jsonStringTo(dynamicService.findLastTaskRecord(dynamic));
	}
	
	/**
	 * 从记录中查询任务的历史负责人
	 * @param dynamic
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findhistoryownerbytaskid")
	public Map<String, Object> findHistoryOwnerByTaskId(Dynamic dynamic){
		return JsonUtils.jsonStringTo(dynamicService.findHistoryOwnerByTaskId(dynamic));
	}
	
	/**
	 * 授权用户信息
	 */
	public static class DynamicMessge implements Serializable {

		private static final long serialVersionUID = 1L;
		
		private String desc; // 编号
		private String userName; // 登录名

		public DynamicMessge(Dynamic dynamic) {
			this.desc = dynamic.getDescription();
			this.userName = dynamic.getUserName();
			
		}

		public String getDesc() {
			return desc;
		}

		public String getUserName() {
			return userName;
		}
	}
}