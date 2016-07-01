package com.bt.surfond.tags.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.tags.entity.Tags;
import com.bt.surfond.tags.service.TagsService;
import com.thinkgem.jeesite.common.web.BaseController;

/**
 * 标签模块Controller
 * @author dyl
 * @version 2015-11-21
 */
@Controller
@RequestMapping(value = "${adminPath}/tags")
public class TagsController extends BaseController {

	@Autowired
	private TagsService tagsService;
	
	/**
	 * 创建标签
	 * @param tags
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "savetags")
	public Map<String, Object> saveTags(Tags tags){
		tagsService.saveTags(tags);
		return JsonUtils.jsonStringTo(tags);
	}
	
	/**
	 * 查询指定空间下标签列表
	 * @param tags
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value =  "findtagslistbyspaceid")
	public Map<String, Object> findTagsListBySpaceId(Tags tags){
		return JsonUtils.jsonStringTo(tagsService.findTagsListBySpaceId(tags));
	}
	
	/**
	 * 添加任务标签
	 * @param tags
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "savetagstask")
	public Map<String, Object> saveTagsTask(Tags tags){
		tagsService.saveTagsTask(tags);
		return JsonUtils.jsonStringTo(tags);
	}
	
	/**
	 * 删除任务标签
	 * @param tags
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deletetagstask")
	public Map<String, Object> deleteTagsTask(Tags tags){
		tagsService.deleteTagsTask(tags);
		return JsonUtils.jsonStringTo(tags);
	}
	
	/**
	 * 删除标签
	 * @param tags
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deletetags")
	public Map<String, Object> deleteTags(Tags tags){
		tagsService.deleteTags(tags);
		return JsonUtils.jsonStringTo(tags);
	}
	
}