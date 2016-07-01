package com.bt.surfond.push.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.push.dao.PushMappingDao;
import com.bt.surfond.push.entity.PushMapping;
import com.thinkgem.jeesite.common.service.CrudService;

/**
 * 推送映射service
 * @author dyl
 * @version 2016-02-24
 *
 */
@Service
@Transactional(readOnly = true)
public class PushMappingService extends CrudService<PushMappingDao, PushMapping> {
	
	/**
	 * 更新推送映射信息
	 * @param pushMapping
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updatePushMapping(PushMapping pushMapping){
		return dao.updatePushMapping(pushMapping);
	}
	
	/**
	 * 根据当前用户查询推送映射
	 * @param pushMapping
	 * @return
	 */
	public PushMapping findPushMappingByUserId(String userId){
		return dao.findPushMappingByUserId(userId);
	}

}
