package com.bt.surfond.comment.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.bt.surfond.comment.entity.Comment;
import com.bt.surfond.comment.service.CommentService;
import com.bt.surfond.common.Constants;
import com.bt.surfond.conversation.service.ConversationService;
import com.bt.surfond.dynamic.service.DynamicService;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.poj.utils.JsonUtils;
import com.thinkgem.jeesite.modules.sys.service.SystemService;

/**
 * 评论信息Controller
 * @author mjs
 * @version 2015-09-30
 */
@Controller
@RequestMapping(value = "${adminPath}/comment")
public class CommentController extends BaseController {
	@Autowired
	private CommentService commentService;
	
	@Autowired
	private DynamicService dynamicService;
	
	@Autowired
	private SystemService systemService;
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private ConversationService conversationService;
	
	
	/**
	 * 根据评论编号删除评论
	 * @param comment
	 * @return
	 */
	@RequestMapping(value = "deleteComment")
	@ResponseBody
	public String deleteComment(Comment comment,HttpServletRequest request){
		dynamicService.deleteMore(comment.getId());
		return commentService.deleteComment(comment);
	}
	
	/**
	 * 对评论点赞与取消评论点赞
	 * @param comment
	 * @return
	 */
	@RequestMapping(value = "dopraiseforcomment")
	@ResponseBody
	public String doPraiseForComment(Comment comment,HttpServletRequest request){
		return commentService.doPraiseOrCancelPraise(comment);
	}
	
	/**
	 * 根据评论编号查询评论
	 * @param comment
	 * @return
	 */
	@RequestMapping(value = "findcommentbycommentid")
	@ResponseBody
	public Comment findCommentByCommentId(Comment comment){
		return commentService.findCommentByCommentId(comment);
	}
	
	/**
	 * 根据(会话/任务)ID查询会话的所有评论
	 * @param comment
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = {"list", ""})
	@ResponseBody
	public List<Comment> list(Comment comment, HttpServletRequest request, HttpServletResponse response, Model model) {
		return commentService.findByCoversation(comment); 
	}
	
	/**
	 * 添加会话评论
	 * @param comment
	 * @param model
	 * @param redirectAttributes
	 * @return
	 */
	@RequestMapping(value = "save")
	@ResponseBody
	public Comment save(Comment comment,HttpServletRequest request, Model model, RedirectAttributes redirectAttributes) {
		if(StringUtils.isBlank(comment.getId())){comment.setId(IdGen.uuid());}
		comment.setSort(0);
		comment.setStatus("0");
		comment.setDelFlag("0");
		comment.setPraiseAmount(0);
		comment.setSource(Constants.OPTION_PC);
		comment.setIsNewRecord(true);
		comment.setMetionmember(request.getParameter("metionmember"));
		comment.setConversation(conversationService.get(comment.getConversationId()));
		commentService.save(comment);
		return commentService.findCommentByCommentId(comment);
	}
	
	/**
	 * 获取被评论数
	 * @param bookmark
	 * @return
	 */
	@RequestMapping(value = "findCommentMember")
	@ResponseBody
	public Map<String, Object> findCommentMember(Comment comment,HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonStringTo(commentService.findCommentMember(comment));
	}
	
}