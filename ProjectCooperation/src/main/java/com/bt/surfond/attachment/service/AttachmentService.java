/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.attachment.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.auth.exception.NOPrivilegeException;
import com.bt.surfond.attachment.dao.AttachmentDao;
import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.space.service.SpaceService;
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.sys.dao.UserDao;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 附件信息Service
 * @author dyl
 * @version 2015-09-30
 */
@Service
@Transactional
public class AttachmentService extends CrudService<AttachmentDao, Attachment> {
	
	@Autowired
	private AttachmentDao dao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private SpaceService spaceService;
	@Autowired
	private ProjectTaskService taskService;

	/**
	 * 设置批量附件为被删除
	 * @param attachment
	 */
	@Transactional(readOnly = false)
	public void deleteMore(Attachment attachment){
		challenge(attachment.getTaskId());
		attachment.setDelFlag(Attachment.DEL_FLAG_DELETE);
		dao.deleteMore(attachment);
	}
	
	/**
	 * 根据类型ID查询附件
	 * @param attachment
	 * @return
	 */
	public List<Attachment> findAttachmentByTaskId(Attachment attachment){
		return dao.findAttachmentByTaskId(attachment);
	}
	
	/**
	 * 根据类型ID查询附件记录数
	 * @param attachment
	 * @return
	 */
	public int findAttachmentByTaskIdToCount(Attachment attachment){
		return dao.findAttachmentByTaskIdToCount(attachment);
	}
	
	/**
	 * 根据项目编号查询任务附件列表
	 * @param task
	 * @return
	 */
	public Map<String, Object> findAttachmentListByProject(ProjectTask projectTask){
		List<ProjectTask> projectList = taskService.findTaskList(projectTask);
		List<Attachment> list = new ArrayList<Attachment>();
		for (ProjectTask pro : projectList) {
			Attachment at = new Attachment();
			at.setTaskId(pro.getId());
			List<Attachment> attList = findAttachmentByTaskId(at);
			list.addAll(attList);
		}
		return JsonUtils.jsonString(list, "success", "1");
	}
	
	
	/**
	 * 取消上传文件
	 * 
	 */
	@Transactional(readOnly = false)
	public void deleteAttachment(String id){
		Attachment att = new Attachment();
		att.setId(id);
		dao.deleteAttachment(att);
	}

	/**
	 * 根据用户编号更新头像下载地址
	 * @param user
	 */
	@Transactional(readOnly = false)
	public int updataPhotoByUserId(User user) {
		return userDao.updataPhotoByUserId(user);
	}

	private void challenge(String projTaskId){
		ProjectTask projectTask = taskService.get(projTaskId);
		User user = UserUtils.getUser();
		if(!user.getId().equals(projectTask.getUser().getId())){
			throw new NOPrivilegeException("You have no privilege to do this operation");
		}
	}

}