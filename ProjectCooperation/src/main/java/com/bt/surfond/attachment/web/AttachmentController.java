/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.attachment.web;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.attachment.service.AttachmentService;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.common.utils.UploadUtil;
import com.bt.surfond.conversation.service.ConversationService;
import com.bt.surfond.dynamic.service.DynamicService;
import com.bt.surfond.front.core.util.FileUploadUtils;
import com.bt.surfond.task.entity.ProjectTask;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 附件信息Controller
 * @author dyl
 * @version 2015-09-30
 */
@Controller
@RequestMapping(value = "${adminPath}/attachment")
public class AttachmentController extends BaseController {
	@Autowired
	private DynamicService dynamicService;
	@Autowired
	private AttachmentService attachmentService;
	@Autowired
	private ConversationService teamConversationService;
	
	@ModelAttribute
	public Attachment get(@RequestParam(required=false) String id) {
		Attachment entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = attachmentService.get(id);
		}
		if (entity == null){
			entity = new Attachment();
		}
		return entity;
	}
	
	/**
	 * 上传附件
	 * @param request
	 * @param servletRequest
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	@RequestMapping("/uploadFile")
	@ResponseBody
	public String upload(MultipartHttpServletRequest multipart,HttpServletRequest request) throws IllegalStateException, IOException{
		UploadUtil upload = new UploadUtil();
		return upload.fileUpload(multipart, request);
	}
	
	
	/**
	 * 下载附件
	 * @param schedule
	 * @param redirectAttributes
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "download")
	public void download(String id,HttpServletResponse response,HttpServletRequest request) throws UnsupportedEncodingException {
		//UploadUtil utils = new UploadUtil();
		FileUploadUtils.download(request, response);
		//utils.download(response, request);
	}
	
	
	/**
	 * 获取附件列表
	 * @param attachment
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "getAttachmentByTaskIdToCount")
	@ResponseBody
	public Map<String, Object> findAttachmentByTaskIdToCount(Attachment attachment, HttpServletRequest request, HttpServletResponse response, Model model){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("count", attachmentService.findAttachmentByTaskIdToCount(attachment));
		map.put("message", "附件数量");
		return map;
	}
	
	/**
	 * 查询项目附件
	 * @param projectTask
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "getAttachmentListByProject")
	@ResponseBody
	public Map<String, Object> findAttachmentListByProject(ProjectTask projectTask, HttpServletRequest request, HttpServletResponse response, Model model){
		return attachmentService.findAttachmentListByProject(projectTask);
	}
	
	
	/**
	 * 根据上级ID查询附件
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "findAttachmentListByResourceId")
	@ResponseBody
	public Map<String, Object> findAttachmentListByResourceId(Attachment attachment,HttpServletRequest request, HttpServletResponse response, Model model){
		return JsonUtils.jsonString(attachmentService.findAttachmentByTaskId(attachment), "success", "1");
	}
	
	
	
	/**
	 * 用户点取消上传的文件
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "deleteAttachment")
	@ResponseBody
	public String deleteAttachment(HttpServletRequest request){
		String path = request.getParameter("id");
		attachmentService.deleteAttachment(path);
		return "success";
	}
	
	/**
	 * 上传图片
	 * @param request
	 * @param servletRequest
	 * @return
	 */
	@RequestMapping(value = "uploadphoto")
	@ResponseBody
	public String uploadPhoto(MultipartHttpServletRequest multipart,HttpServletRequest request,HttpServletResponse response){
		UploadUtil upload = new UploadUtil();
		String message =  upload.photoUpload(multipart, request);
		User user = new User();
		user.setId(UserUtils.getUser().getId());
		user.setPhoto(message);
		int result = attachmentService.updataPhotoByUserId(user);
		UserUtils.clearCache();
		if(result == 1){
			return message;
		}
		return null;
	}
	
	/**
	 * 下载图片
	 * @param response
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "downloadphoto")
	public void downloadPhoto(HttpServletResponse response,HttpServletRequest request){
		UploadUtil upload = new UploadUtil();
		upload.download(response, request);
	}
	
	
}