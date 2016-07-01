package com.bt.surfond.message.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public final class Constants {

	public static Map<String, Object> subscriptionMap = new HashMap<String, Object>();
	static {
		//任务提醒类型
		List<String> taskOperateList = new ArrayList<String>();
		taskOperateList.add(Constants.TASK_OWNER_CHANGE + "-" + "任务负责人改变");
		taskOperateList.add(Constants.TASK_DUEDATE_CHANGE + "-" + "任务截止日期改变");
		taskOperateList.add(Constants.TASK_DELETE_OPERATE + "-" + "任务被删除");
		taskOperateList.add(Constants.TASK_OTHER_OPERATE + "-" + "任务其它详情改变");
		//项目提醒类型
		List<String> projectOperateList = new ArrayList<String>();
		projectOperateList.add(Constants.PROJECT_NEW_MEMBER + "-" + "新成员");
		projectOperateList.add(Constants.PROJECT_DELETE_OPERATE + "-" + "项目被删除");
		//话题提醒类型
		List<String> conversationOperateList = new ArrayList<String>();
		conversationOperateList.add(Constants.CONVERSATION_CREATE_OPERATE + "-" + "新话题");
		conversationOperateList.add(Constants.CONVERSATION_NEW_COMMENT + "-" + "新评论");
		//提醒的总类型
		List<String> subscriptionTypeList = new ArrayList<String>();
		subscriptionTypeList.add("任务-taskOperateList");
		subscriptionTypeList.add("项目-projectOperateList");
		subscriptionTypeList.add("话题-conversationOperateList");
		
		subscriptionMap.put("taskOperateList", taskOperateList);
		subscriptionMap.put("projectOperateList", projectOperateList);
		subscriptionMap.put("conversationOperateList", conversationOperateList);
		subscriptionMap.put("subscriptionTypeList", subscriptionTypeList);
	}
	
	/**
	 * 任务负责人改变
	 */
	public final static String TASK_OWNER_CHANGE = "TOC_00";
	
	/**
	 * 任务截止日期改变
	 */
	public final static String TASK_DUEDATE_CHANGE = "TDC_01";
	
	/**
	 * 任务被删除
	 */
	public final static String TASK_DELETE_OPERATE = "TDO_02";
	
	/**
	 * 任务其它详情改变
	 */
	public final static String TASK_OTHER_OPERATE = "TOO_09";
	
	/**
	 * 新成员
	 */
	public final static String PROJECT_NEW_MEMBER = "PNM_10";
	
	/**
	 * 项目被删除
	 */
	public final static String PROJECT_DELETE_OPERATE = "PDO_11";
	
	/**
	 * 新话题
	 */
	public final static String CONVERSATION_CREATE_OPERATE = "CCO_20";
	
	/**
	 * 新评论
	 */
	public final static String CONVERSATION_NEW_COMMENT = "CNC_21";
	
	/**
	 * 无法拒绝的提醒
	 */
	public final static String ME_IS_KING = "MIK_99";
	
}
