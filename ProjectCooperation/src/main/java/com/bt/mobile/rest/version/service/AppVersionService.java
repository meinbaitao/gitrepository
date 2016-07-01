package com.bt.mobile.rest.version.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.mobile.rest.version.dao.AppVersionDao;
import com.bt.mobile.rest.version.entity.AppVersion;
import com.thinkgem.jeesite.common.service.CrudService;

/**
 * 评论信息Service
 * @author dyl
 * @version 2015-09-30
 */
@Service
@Transactional
public class AppVersionService extends CrudService<AppVersionDao, AppVersion> {
	
	@Autowired
	private AppVersionDao appVersionDao;
	
	/**
	 * 根据版本号、手机类型查询最新版本
	 * @param version
	 * @return
	 */
	public AppVersion findVersion(AppVersion version){
		
		return appVersionDao.findVersion(version);
	}
	
}