package com.bt.mobile.rest.comment;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.comment.entity.Comment;
import com.bt.surfond.comment.service.CommentService;
import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.common.utils.UploadUtil;
import com.bt.surfond.conversation.service.ConversationService;
import com.bt.surfond.dynamic.service.DynamicService;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.service.SystemService;

/**
 * 手机端-评论信息Controller
 * @author mjs
 * @version 2015-09-30
 */
@Controller
@RequestMapping(value = "${adminPath}/mobile/comment")
public class CommentMobileRsource extends BaseController {
	
	@Autowired
	private CommentService commentService;
	@Autowired
	private DynamicService dynamicService;
	@Autowired
	private SystemService systemService;
	@Autowired
	private ConversationService conversationService;
	@Autowired
	private ProjectTaskService projectTaskService;
	
	/**
	 * 查询评论列表(根据上级ID查找)
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="findcommentlist",method = RequestMethod.POST)
	public Map<String,Object> findCommentList(@RequestBody Comment comment,HttpServletRequest request, HttpServletResponse response) {
		return JsonUtils.jsonString(commentService.findByCoversation(comment),"",Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 评论点赞、取消点赞(根据评论ID点赞、取消点赞)
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="commentpraise",method = RequestMethod.POST)
	public String commentPraise(@RequestBody Comment comment,HttpServletRequest request, HttpServletResponse response) {
		return commentService.doPraiseOrCancelPraise(comment);
	}
	
	/**
	 * 发表评论
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@ResponseBody 
	@RequestMapping(value ="conversationcomment",method = RequestMethod.POST)
	public Map<String,Object> conversationComment(HttpServletRequest request, HttpServletResponse response) {
		String jsonObject = request.getParameter("jsonObject");
		JSONObject json = new JSONObject(jsonObject);
		Comment comment = new Comment();
		String description = json.optString("description");
		String resourceId = json.optString("resourceId");
		String type = json.optString("type");
		
		if(StringUtils.isNotBlank(description)){comment.setDescription(description);}
		if(StringUtils.isNotBlank(resourceId)){comment.setResourceId(resourceId);}
		if(StringUtils.isNotBlank(type)){comment.setType(type);}
		comment.setId(IdGen.uuid());
		comment.setSort(0);
		comment.setStatus("0");
		comment.setDelFlag("0");
		comment.setPraiseAmount(0);
		comment.setIsNewRecord(true);
		comment.setSource(Constants.OPTION_PP);
		//处理@成员
		comment.setMetionmember((String)json.optString("metionmember"));
		
		String uploadResultString = new UploadUtil().appFileUpload(request, comment.getId(), resourceId, type);
		if(StringUtils.isNotBlank(uploadResultString) || StringUtils.isNotBlank(comment.getDescription())){
			commentService.save(comment);
		}
		
		return JsonUtils.jsonString(commentService.findCommentByCommentId(comment), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 发表评论语音
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@ResponseBody 
	@RequestMapping(value ="voiceconversationComment",method = RequestMethod.POST)
	public Map<String,Object> voiceconversationComment(HttpServletRequest request, HttpServletResponse response) {
		String jsonObject = request.getParameter("jsonObject");
		JSONObject json = new JSONObject(jsonObject);
		Comment comment = new Comment();
		String resourceId = json.optString("resourceId");
		String type = json.optString("type");
		String timeLength = json.optString("timeLength");
		
		if(StringUtils.isNotBlank(resourceId)){comment.setResourceId(resourceId);}
		if(StringUtils.isNotBlank(type)){comment.setType(type);}
		
		comment.setId(IdGen.uuid());
		comment.setSort(0);
		comment.setStatus("0");
		comment.setDelFlag("0");
		comment.setPraiseAmount(0);
		comment.setCommentType(Constants.VOICE_COMMENT_TYPE);
		comment.setIsNewRecord(true);
		comment.setSource(Constants.OPTION_PP);
		//处理@成员
		comment.setMetionmember((String)json.optString("metionmember"));
		
		String uploadResultString = new UploadUtil().appVioceFileUpload(request, comment.getId(), resourceId, type,timeLength);
		if(StringUtils.isNotBlank(uploadResultString) || StringUtils.isNotBlank(comment.getDescription())){
			commentService.save(comment);
		}
		
		return JsonUtils.jsonString(commentService.findCommentByCommentId(comment), "", Constants.APP_STATUS_SUCCESS);
	}

	/**
	 * 删除评论(根据评论ID删除评论)
	 * @param comment
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="deleteComment",method = RequestMethod.POST)
	public String deleteComment(@RequestBody Comment comment,HttpServletRequest request, HttpServletResponse response){
		dynamicService.deleteMore(comment.getId());
		return commentService.deleteComment(comment);
	}
	
	
}