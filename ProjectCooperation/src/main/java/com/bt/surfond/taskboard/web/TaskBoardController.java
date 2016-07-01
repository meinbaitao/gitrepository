package com.bt.surfond.taskboard.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.taskboard.entity.TaskBoard;
import com.bt.surfond.taskboard.service.TaskBoardService;
import com.thinkgem.jeesite.common.web.BaseController;

/**
 * 看板模块
 * @author xujianpeng
 * @version 2016-03-22
 */
@Controller
@RequestMapping(value = "${adminPath}/board")
public class TaskBoardController extends BaseController {

	@Autowired
	private TaskBoardService taskBoardService;
	
	
	/**
	 * 初始化看板
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "init" )
	public Map<String, Object> initTaskBoard(TaskBoard taskBoard,HttpServletRequest request,HttpServletResponse response){
		taskBoardService.initTaskBoard(taskBoard);
		return JsonUtils.jsonString("SUCCESS","",Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 创建看板
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "save")
	public Map<String, Object> saveTaskBoard(TaskBoard taskBoard,HttpServletRequest request,HttpServletResponse response){
		
		int result = taskBoardService.saveTaskBoard(taskBoard);
		
		return JsonUtils.jsonString(result,"",Constants.APP_STATUS_SUCCESS);
	}
	
	
	/**
	 * 保存看板与任务关联关系
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "saveTaskBoardAndTask")
	public Map<String, Object> saveTaskBoardAndTask(TaskBoard taskBoard,HttpServletRequest request,HttpServletResponse response){
		
		int result = taskBoardService.saveTaskBoardAndTask(taskBoard);
		
		return JsonUtils.jsonString(result,"",Constants.APP_STATUS_SUCCESS);
	}
	
	
	/**
	 * 修改看板名称
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatename")
	public Map<String, Object> updateName(TaskBoard taskBoard,HttpServletRequest request,HttpServletResponse response){
		
		
		
		return null;
	}

	/**
	 * 修改看板排序
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updatesort")
	public Map<String, Object> updateSort(TaskBoard taskBoard,HttpServletRequest request,HttpServletResponse response){
		
		return null;
	}
	
	/**
	 * 删除看板
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "delete")
	public Map<String, Object> delete(TaskBoard taskBoard,HttpServletRequest request,HttpServletResponse response){
		
		return null;
	}
	
	/**
	 * 根据当前登陆人查询看板
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findlistbytype")
	public Map<String, Object> findListByType(TaskBoard taskBoard,HttpServletRequest request,HttpServletResponse response){
		
		return JsonUtils.jsonString(taskBoardService.findListByType(taskBoard),"",Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 根据类型查询看板
	 * @param project
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findlistbyid")
	public Map<String, Object> findListByTaskBoardId(TaskBoard taskBoard,HttpServletRequest request,HttpServletResponse response){
		
		return null;
	}
	
	
	
}