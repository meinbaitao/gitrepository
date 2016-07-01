/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.template.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.bt.surfond.template.entity.Template;
import com.bt.surfond.template.service.TemplateService;

/**
 * 空间模板Controller
 * @author xjp
 * @version 2015-12-02
 */
@Controller
@RequestMapping(value = "${adminPath}/template")
public class TemplateController extends BaseController {

	@Autowired
	private TemplateService templateService;
	
	@ModelAttribute
	public Template get(@RequestParam(required=false) String id) {
		Template entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = templateService.get(id);
		}
		if (entity == null){
			entity = new Template();
		}
		return entity;
	}
	
	
	@RequestMapping(value = {"list", ""})
	public String list(Template template, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<Template> page = templateService.findPage(new Page<Template>(request, response), template); 
		model.addAttribute("page", page);
		return "surfond/template/templateList";
	}

	
	
	@RequestMapping(value = "save")
	public String save(Template template,HttpServletResponse response) {
		
		templateService.save(template);
		
		return "redirect:"+Global.getAdminPath()+"/template/template/?repage";
	}
	
}