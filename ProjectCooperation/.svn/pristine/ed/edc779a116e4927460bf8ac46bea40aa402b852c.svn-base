package com.bt.surfond.feedback.web;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.feedback.entity.Feedback;
import com.bt.surfond.feedback.service.FeedbackService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.web.BaseController;

/**
 * 团队表Controller
 * @author mjs
 * @version 2015-10-15
 */
@Controller
@RequestMapping(value = "${adminPath}/feedback")
public class FeedbackController extends BaseController {
	
	@Autowired
	private FeedbackService feedbackService;
	
	/**
	 * 发表意见反馈
	 * @param feedback
	 * @return
	 */
	@RequestMapping("save")
	@ResponseBody
	public Feedback save(Feedback feedback,HttpServletRequest request){
		if(StringUtils.isBlank(feedback.getType())){feedback.setType(Constants.FEEDBACK_TYPE);}
		if(StringUtils.isBlank(feedback.getId())){feedback.setId(IdGen.uuid());}
		feedback.setIsNewRecord(true);
		if(StringUtils.isBlank(feedback.getStatus())){feedback.setStatus(Constants.FEEDBACK_STATUS_TYPE);}
		feedbackService.save(feedback);
		return feedbackService.findOneFeedbackInfo(feedback);
	}
	
	/**
	 * 查找所有的意见反馈
	 * @param feedback
	 * @return
	 */
	@RequestMapping("findAllFeedbackInfo")
	@ResponseBody
	public List<Feedback> findAllFeedbackInfo(Feedback feedback){
		try{
			feedbackService.updateFeedbackNewCommentCount(feedback);
		}catch(Exception e){
			e.printStackTrace();
		}
		feedback.setType(Constants.FEEDBACK_TYPE);
		return feedbackService.findAllFeedbackInfo(feedback);
	}
	
	/**
	 * 查找当前用户意见反馈的回复新数据
	 * @param feedback
	 * @return
	 */
	@RequestMapping("findAllFeedbackNewCommentCount")
	@ResponseBody
	public Map<String, Object> findAllFeedbackNewCommentCount(Feedback feedback) {
		Map<String, Object> map = new HashMap<String, Object>();
		int count = feedbackService.findAllFeedbackNewCommentCount(feedback);
		map.put("count", count);
		map.put("message", "success");
		return map;
	}
	
	
}