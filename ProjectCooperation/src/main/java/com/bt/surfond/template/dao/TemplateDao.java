/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.template.dao;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.bt.surfond.template.entity.Template;

/**
 * 空间模板DAO接口
 * @author xjp
 * @version 2015-12-02
 */
@MyBatisDao
public interface TemplateDao extends CrudDao<Template> {
	
}