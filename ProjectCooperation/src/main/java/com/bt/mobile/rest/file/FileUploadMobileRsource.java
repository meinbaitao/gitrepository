package com.bt.mobile.rest.file;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.attachment.service.AttachmentService;
import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.common.utils.UploadUtil;
import com.bt.surfond.dynamic.service.DynamicService;
import com.bt.surfond.task.service.ProjectTaskService;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;


/**
 * 任务协作手机服务类
 * @author 
 * @version 2015-10-08
 */
@Controller
public class FileUploadMobileRsource extends BaseController {
	
	@Autowired
	private AttachmentService attachmentService;
	
	@Autowired
	private DynamicService dynamicService;
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	
	/**
	 * 上传头像MongoDB
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping(value = "${adminPath}/mobile/files/upload")
	@ResponseBody
	public String upload(MultipartHttpServletRequest multipart,HttpServletRequest request,HttpServletResponse response) throws IOException {
		UploadUtil utils = new UploadUtil();
		Map<String, Object> map = new HashMap<String, Object>();
		String message = utils.photoUpload(multipart,request);
		map.put("message", "上传成功！");
		map.put("result",message);
		map.put("status", Constants.APP_STATUS_SUCCESS);
		//判断是否上传成功
		if(!Constants.MXA_UPLOAD_FILE_OUT.equals(message)){
			map.put("message", "您上传的图片过大，上传失败！");
			User user = new User();
			user.setId(UserUtils.getUser().getId());
			user.setPhoto(message);
			attachmentService.updataPhotoByUserId(user);
			UserUtils.clearCache();
		}
		return renderString(response, map);
	}
	
	/**
	 * 下载图片MongoDB
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping(value = "${adminPath}/mobile/files/download")
	public void download(HttpServletRequest request,HttpServletResponse response) throws IOException {
		UploadUtil utils = new UploadUtil();
		utils.download(response, request);
	}
	
	/**
	 * 	根据话题/评论/任务ID获取下面的附件列表
	 */
	@ResponseBody
	@RequestMapping(value = "${adminPath}/mobile/files/appfileupload")
	public Map<String,Object> appFileupload(@RequestBody Attachment attachment, HttpServletRequest request, HttpServletResponse response){
		return JsonUtils.jsonString(attachmentService.findAttachmentByTaskId(attachment), "", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 根据附件ID删除附件
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "${adminPath}/mobile/files/appdeleteattachment")
	@ResponseBody
	public String appDeleteAttachment(@RequestBody Attachment attachment, HttpServletRequest request){
		String id = attachment.getId();
		JSONObject josnObj = new JSONObject();
		attachmentService.deleteAttachment(id);
		josnObj.put("message", "");
		josnObj.put("result", "success");
		josnObj.put("status", "1");
		return josnObj.toString();
	}
	
	
	/**
	 * 上传附件
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping(value = "${adminPath}/mobile/files/uploadfiles")
	@ResponseBody
	public Map<String,Object> uploadFiles(MultipartHttpServletRequest multipart,HttpServletRequest request,HttpServletResponse response) throws IOException {
		UploadUtil utils = new UploadUtil();
		String jsonObject = request.getParameter("jsonObject");
		JSONObject json = new JSONObject(jsonObject);
		String taskId = json.optString("taskId");
		Map<String, Object> map = new HashMap<String, Object>();
		List<Attachment> list = utils.appUploadFiles(multipart,request,taskId);
		map.put("message", "上传成功！");
		map.put("result",list);
		map.put("status", Constants.APP_STATUS_SUCCESS);
		return map;
	}
	
}