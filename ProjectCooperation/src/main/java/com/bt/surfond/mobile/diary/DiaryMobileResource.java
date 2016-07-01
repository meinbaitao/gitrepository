package com.bt.surfond.mobile.diary;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.front.core.util.FileUploadUtils;
import com.bt.surfond.front.core.util.JsonUtils;
import com.bt.surfond.front.diary.entity.Diary;
import com.bt.surfond.front.diary.service.DiaryService;
import com.thinkgem.jeesite.common.web.BaseController;

/**
 * 日志管理app接口
 * @author dyl
 *
 */
@Controller
@RequestMapping("${adminPath}/mobile/diary")
public class DiaryMobileResource extends BaseController {

	@Autowired
	private DiaryService diaryService;
	
	/**
	 * 新增日志
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> save(HttpServletRequest request){
		//保存日志
		String jsonObject = request.getParameter("jsonObject");
		if(StringUtils.isNotBlank(jsonObject)){
			JSONObject json = new JSONObject(jsonObject);
			Diary diary = new Diary();
			diary.setTaskId(json.optString("taskId"));
			diary.setTitle(json.optString("title"));
			diary.setContent(json.optString("content"));
			int result = diaryService.saveDiary(diary);
			
			//构建附件实例
			Attachment attachment = new Attachment();
			attachment.setType(diary.getId());
			attachment.setStatus(Attachment.TYPE_DIARY);
			FileUploadUtils.upload(request, attachment);
			
			//判断返回
			if(result > 0){
				return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, diaryService.find(diary));
			}
		}
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "保存日志信息失败！");
	}
	
	/**
	 * 根据ID查询日志
	 * @param diary
	 * @return
	 */
	@RequestMapping(value = "query", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> query(@RequestBody Diary diary){
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, diaryService.find(diary));
	}
	
	/**
	 * 根据传入条件查询日志列表
	 * @param diary
	 * @return
	 */
	@RequestMapping(value = "querylist", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> queryList(@RequestBody Diary diary){
		return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, diaryService.findList(diary));
	}
	
	/**
	 * 根据ID删除日志
	 * @param diary
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> delete(@RequestBody Diary diary){
		if(diaryService.deleteDiary(diary) > 0){
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_SUCCESS, diary.getId());
		}else{
			return JsonUtils.jsonString(JsonUtils.AJAX_HANDLE_FAILURE, "删除日志信息失败！");
		}
	}
	
}
