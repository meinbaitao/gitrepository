package com.bt.mobile.rest.version.dao;


import com.bt.mobile.rest.version.entity.AppVersion;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 评论信息DAO接口
 * @author dyl
 * @version 2015-09-30
 */
@MyBatisDao
public interface AppVersionDao extends CrudDao<AppVersion> {
	
	/**
	 * 根据版本号、手机类型查询最新版本
	 * @param version
	 * @return
	 */
	public AppVersion findVersion(AppVersion version);
}