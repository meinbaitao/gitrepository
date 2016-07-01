package com.bt.surfond.push.dao;

import com.bt.surfond.push.entity.PushMapping;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 推送映射dao接口
 * @author dyl
 * @version 2016-02-24
 *
 */
@MyBatisDao
public interface PushMappingDao extends CrudDao<PushMapping> {
	
	/**
	 * 更新推送映射信息
	 * @param pushMapping
	 * @return
	 */
	public int updatePushMapping(PushMapping pushMapping);
	
	/**
	 * 根据当前用户查询推送映射
	 * @param pushMapping
	 * @return
	 */
	public PushMapping findPushMappingByUserId(String userId);

}
