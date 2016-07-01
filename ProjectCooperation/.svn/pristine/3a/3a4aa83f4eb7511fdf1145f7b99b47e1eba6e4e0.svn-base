package com.bt.mobile.rest.task;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.comment.entity.Comment;
import com.bt.surfond.comment.service.CommentService;
import com.bt.surfond.common.utils.JsonUtils;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.poj.common.Constants;



/**
 * 微信端服务
 * @author 
 * @version 2015-10-08
 */
@Controller
@RequestMapping(value = "${adminPath}/task/wx")
public class WeiXinTaskMobileRsource extends BaseController {
	
	/**
	 * 项目、任务Service
	 */
	//@Autowired
	//private ProjectTaskService projectTaskService;
	
	/**
	 * 评论 Service
	 */
	@Autowired
	private CommentService commentService;
	
	
/*	@RequestMapping(value = {"detail", ""})
	public String list(HttpServletRequest request, HttpServletResponse response,Model model) {
		String id =request.getParameter("id");
		ProjectTask task = new ProjectTask();
		task.setId(id);
		task.setType(Constants.SPACE_TYPE_PUBLIC);
		ProjectTask taskDetail = projectTaskService.findTaskByTaskId(task);
		if(null !=taskDetail.getDueDate()){
			model.addAttribute("dueDate",DateFormatUtils.format(taskDetail.getDueDate(),"yyyy-MM-dd"));
		}
		model.addAttribute("task",taskDetail);
		return "modules/sys/taskDetails";
	}*/
	
	/**
	 * 查询评论列表
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value ="taskcommentlist")
	public Map<String, Object> findCommentList(@RequestBody Comment comment,HttpServletRequest request, HttpServletResponse response) {
		//对任务评论
		comment.setType(Constants.PRAISE_TYPE_TASK_COMMENT);
		List<Comment> commentList =commentService.findCommentListByTaskId(comment);
		Map<String, Object> map = new HashMap<String, Object>();
		if(null !=commentList){
			map.put("count", commentList.size());
			map.put("currentUserId",comment.getCurrentUser().getId());
			map.put("data", commentList);
		}
		return commentList !=null?map:JsonUtils.jsonString(commentList);
	}
	
	
	@RequestMapping(value = {"mytask", ""})
	public String mytask(HttpServletRequest request, HttpServletResponse response,Model model) {
		return "modules/sys/myTaskList";
	}
	
//	/**
//	 * 对任务评论,并直接返回评论实体
//	 * @param request
//	 * @param response
//	 * @param model
//	 * @return
//	 */
//	@ResponseBody
//	@RequestMapping(value ="savecomment")
//	public Map<String, Object> taskComment(@RequestBody Comment comment,HttpServletRequest request, HttpServletResponse response) {
//		//对任务评论,并直接返回评论实体
//		String id = IdGen.uuid();
//		comment.setId(id);
//		int result =commentService.saveTaskComment(comment);
//		if(result==1){
//			comment =commentService.get(id);
//		}
//		return JsonUtils.jsonString(result,comment);
//	}
	
}