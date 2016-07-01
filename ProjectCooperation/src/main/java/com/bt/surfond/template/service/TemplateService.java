/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.template.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.bt.surfond.template.entity.Template;
import com.bt.surfond.template.dao.TemplateDao;

/**
 * 空间模板Service
 * @author xjp
 * @version 2015-12-02
 */
@Service
@Transactional(readOnly = true)
public class TemplateService extends CrudService<TemplateDao, Template> {

	public Template get(String id) {
		return super.get(id);
	}
	
	public List<Template> findList(Template template) {
		return super.findList(template);
	}
	
	public Page<Template> findPage(Page<Template> page, Template template) {
		return super.findPage(page, template);
	}
	
	@Transactional(readOnly = false)
	public void save(Template template) {
		super.save(template);
	}
	
	@Transactional(readOnly = false)
	public void delete(Template template) {
		super.delete(template);
	}
	
	/**
	 * 添加模板
	 */
	@Transactional(readOnly = false)
	public int addTemplate(Template template) {
		template.preInsert();
		return dao.insert(template);
	}
	
	/**
	 * 修改模板
	 */
	@Transactional(readOnly = false)
	public int updateTemplate(Template template) {
		template.preUpdate();
		return dao.update(template);
	}
	
	
}