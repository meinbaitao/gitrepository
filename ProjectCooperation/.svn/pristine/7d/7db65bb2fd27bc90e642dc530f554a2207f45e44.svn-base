package com.bt.surfond.mobile.space;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.front.core.util.JsonUtils;
import com.bt.surfond.space.entity.Space;
import com.bt.surfond.space.service.SpaceService;

/**
 * 空间管理app接口
 * @author dyl
 *
 */
@Controller
@RequestMapping("${adminPath}/mobile/space")
public class SpaceMobileResource {

	@Autowired
	private SpaceService spaceService;
	
	/**
	 * 新增空间
	 * @param space
	 * @return
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> save(@RequestBody Space space){
		if(spaceService.saveSpace(space) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, spaceService.get(space));
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "新增空间信息失败！");
	}
	
	/**
	 * 根据ID更新空间
	 * @param space
	 * @return
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> update(@RequestBody Space space){
		if(spaceService.update(space) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, spaceService.get(space));
		}else{
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "修改空间信息失败！");
		}
	}
	
	/**
	 * 根据ID查询空间
	 * @param space
	 * @return
	 */
	@RequestMapping(value = "query", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> query(@RequestBody Space space){
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, spaceService.get(space));
	}
	
	/**
	 * 跨空间：个人所在空间所有成员列表
	 * @param space
	 * @return
	 */
	@RequestMapping(value = "querymemberlistignorespace", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> queryMemberListIgnoreSpace(@RequestBody Space space){
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, spaceService.findMemberListIgnoreSpace(space));
	}
	
	/**
	 * 查询空间成员列表
	 * @param space
	 * @return
	 */
	@RequestMapping(value = "findspacememberlist", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> findSpaceMemberList(@RequestBody Space space){
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, spaceService.findSpaceMemberList(space));
	}
	
}
