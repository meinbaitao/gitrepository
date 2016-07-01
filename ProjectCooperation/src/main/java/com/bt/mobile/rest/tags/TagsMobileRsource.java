/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.mobile.rest.tags;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.tags.entity.Tags;
import com.bt.surfond.tags.service.TagsService;
import com.thinkgem.jeesite.common.web.BaseController;


/**
 * 标签模块APP接口
 * @author xujianpeng
 * @version 2015-12-02
 */
@Controller
@RequestMapping(value = "${adminPath}/mobile/tag")
public class TagsMobileRsource extends BaseController {

	@Autowired
	private TagsService tagsService;
	
	
	/**
	 * 添加标签
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="createtag")
	public Map<String, Object> createTag(@RequestBody Tags tags, HttpServletRequest request, HttpServletResponse response) {
		tagsService.saveTags(tags);
		return JsonUtils.jsonString(tags, "", Constants.APP_STATUS_SUCCESS);
	}
	
	
	
	/**
	 * 查询标签
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="querytaglist")
	public Map<String,Object> findTagList(@RequestBody Tags tags, HttpServletRequest request, HttpServletResponse response) {
		return JsonUtils.jsonString(tagsService.findTagsListBySpaceId(tags), "", Constants.APP_STATUS_SUCCESS);
	}

	
	/**
	 * 删除标签
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="deltag")
	public String delTag(HttpServletRequest request, HttpServletResponse response) {
		
		
		return null;
	}
	
	/**
	 * 添加任务标签
	 * @param tags
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "addtasktags")
	public Map<String, Object> addTaskTags(@RequestBody Tags tags,HttpServletRequest request, HttpServletResponse response) {
		tagsService.saveTagsTask(tags);
		return JsonUtils.jsonString("", "", Constants.APP_STATUS_SUCCESS);
	}
	
	
	/**
	 * 删除任务标签
	 * @param tags
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deltasktags")
	public Map<String, Object> delTaskTags(@RequestBody Tags tags,HttpServletRequest request, HttpServletResponse response) {
		tagsService.deleteTagsTask(tags);
		return JsonUtils.jsonString("", "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 保存任务标签
	 * @param task
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "operatetagstask")
	@ResponseBody
	public Map<String, Object> operateTagsTask(@RequestBody Tags tags, HttpServletRequest request, HttpServletResponse response){
		tagsService.operateTagsTask(tags);
		return JsonUtils.jsonString("", "", Constants.APP_STATUS_SUCCESS);
	}
	
}