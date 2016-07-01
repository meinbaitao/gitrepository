package com.bt.surfond.taskboard.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.taskboard.dao.TaskBoardDao;
import com.bt.surfond.taskboard.entity.TaskBoard;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;


/**
 * 看板模块
 * @author xujianpeng
 * @version 2016-03-22
 */
@Service
@Transactional(readOnly = true)
public class TaskBoardService extends CrudService<TaskBoardDao, TaskBoard> {
	
	@Autowired
	private TaskBoardDao taskBoardDao; 
	
	
	/**
	 * 初始化看板
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public void initTaskBoard(TaskBoard taskBoard){
		taskBoard.preInsert();
		taskBoard.setType("0");
		int result = this.findCountByType(taskBoard);
		if(result<=0){
			taskBoardDao.initTaskBoard(taskBoard);
		}
	}
	
	/**
	 * 创建看板
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveTaskBoard(TaskBoard taskBoard){
		//获取看板ID
		String boardId = IdGen.uuid();
		taskBoard.setId(boardId);
		//创建看板
		taskBoardDao.insert(taskBoard);
		
		//创建看板关联关系
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", IdGen.uuid());
		map.put("boardId", boardId);
		map.put("resourceId", UserUtils.getUser().getId());
		return taskBoardDao.saveTaskBoardAndUser(map);
	}
	

	/**
	 * 保存看板与任务关联关系
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveTaskBoardAndTask(TaskBoard taskBoard){		
		//创建看板关联关系
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", IdGen.uuid());
		map.put("boardId", taskBoard.getId());
		map.put("resourceId", taskBoard.getTaskId());
		return taskBoardDao.saveTaskBoardAndTask(map);
	}
	
	/**
	 * 修改看板名称
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateName(TaskBoard taskBoard){
		
		return taskBoardDao.updateName(taskBoard);
	}

	/**
	 * 修改看板排序
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateSort(TaskBoard taskBoard){
		
		return 0;
	}
	
	/**
	 * 根据类型查询看板
	 * @param project
	 * @return
	 */
	public List<TaskBoard> findListByType(TaskBoard taskBoard){
		
		return taskBoardDao.findListByType(taskBoard);
	}
	
	/**
	 * 根据类型查询看板总数
	 * @param project
	 * @return
	 */
	public int findCountByType(TaskBoard taskBoard){
		TaskBoard tb =taskBoardDao.findCountByType(taskBoard);
		if(null !=tb){
			return tb.getCount();
		}
		return 0;
	}
	
	/**
	 * 根据看板ID查看任务
	 * @param project
	 * @return
	 */
	public Map<String, Object> findListByTaskBoardId(TaskBoard taskBoard){
		
		return null;
	}
	
}