/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.attachment.dao;

import java.util.List;

import com.bt.surfond.attachment.entity.Attachment;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 附件信息DAO接口
 * @author dyl
 * @version 2015-09-30
 */
@MyBatisDao
public interface AttachmentDao extends CrudDao<Attachment> {
	/**
	 * Task根据编号查找附件
	 * @param attachment
	 * @return
	 */
	public List<Attachment> findAttachmentByTaskId(Attachment attachment);
	
	/**
	 * 根据编号查找附件记录数
	 * @param attachment
	 * @return
	 */
	public int findAttachmentByTaskIdToCount(Attachment attachment);
	
	/**
	 * 多条设置附件为被删除
	 * @param attachment
	 */
	public void deleteMore(Attachment attachment);
	
	/**
	 * 取消上传的文件
	 * @param attachment
	 */
	public void deleteAttachment(Attachment attachment);

	
}