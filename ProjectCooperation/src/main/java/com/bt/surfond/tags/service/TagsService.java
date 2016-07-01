package com.bt.surfond.tags.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.auth.exception.NOPrivilegeException;
import com.bt.surfond.tags.dao.TagsDao;
import com.bt.surfond.tags.entity.Tags;
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 标签模块Service
 * @author dyl
 * @version 2015-11-21
 */
@Service
@Transactional(readOnly = true)
public class TagsService extends CrudService<TagsDao, Tags> {

	@Autowired
	private ApplicationContext appContext;

	/**
	 * 创建标签
	 * @param tags
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveTags(Tags tags) {
		tags.preInsert();
		return dao.insert(tags);
	}
	
	/**
	 * 查询指定空间下标签列表
	 * @param tags
	 * @return
	 */
	public List<Tags> findTagsListBySpaceId(Tags tags){
		return dao.findTagsListBySpaceId(tags);
	}
	
	/**
	 * 添加任务标签
	 * @param tags
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveTagsTask(Tags tags){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", IdGen.uuid());
		paramMap.put("taskId", tags.getTaskId());
		paramMap.put("tagsId", tags.getId());
		return dao.saveTagsTask(paramMap);
	}
	
	/**
	 * 删除任务标签
	 * @param tags
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteTagsTask(Tags tags){
		challenge(tags.getTaskId());
		
		return dao.deleteTagsTask(tags);
	}
	
	/**
	 * 删除标签
	 * @param tags
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteTags(Tags tags){
		return dao.delete(tags);
	}
	
	/**
	 * 添加多个任务标签
	 * @param tags
	 * @return
	 */
	@Transactional(readOnly = false)
	public int operateTagsTask(Tags tags){
		//challenge(tags.getTaskId());
		dao.deleteAllTagsTask(tags);
		int count = 0;
		if(StringUtils.isNotBlank(tags.getTagsIds())){
			String[] tagsIdsArray = tags.getTagsIds().split(";");
			for(int i = 0; null != tagsIdsArray && i < tagsIdsArray.length; i++){
				Tags t = new Tags(tagsIdsArray[i]);
				t.setTaskId(tags.getTaskId());
				this.saveTagsTask(t);
				count++;
			}
		}
		return count;
	}
	
	private void challenge(String projTaskId){
		ProjectTaskService taskService = appContext.getBean(ProjectTaskService.class);
		ProjectTask projectTask = taskService.get(projTaskId);
		User user = UserUtils.getUser();
		if(!user.getId().equals(projectTask.getUser().getId())){
			throw new NOPrivilegeException("You have no privilege to do this operation");
		}
	}

	
	/**
	 * 查询任务下的标签
	 * @param tags
	 * @return
	 */
	public List<Tags> findTaskTags(Tags tags) {
		return dao.findTaskTags(tags);
	}
}