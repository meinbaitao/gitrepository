package com.thinkgem.jeesite.modules.poj.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bt.surfond.attachment.dao.AttachmentDao;
import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.attachment.service.AttachmentService;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.SpringContextHolder;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 文件上传工具类
 * 
 * @author xjp
 * @date 2015-8-17
 */
@Component
public class UploadUtils {
	
	private static AttachmentDao attachmentDao = SpringContextHolder.getBean(AttachmentDao.class);
	
	private static AttachmentService attachmentService = SpringContextHolder.getBean(AttachmentService.class);
	/**
	 * 表单字段常量
	 */
	public static final String FORM_FIELDS = "form_fields";
	/**
	 * 文件域常量
	 */
	public static final String FILE_FIELDS = "file_fields";

	/**
	 * 上传目录
	 */
	public static final String BASEPATH = "upload";
	
	/**
	 * 附件存放目录
	 */
	public static final String DIRNAME = "files";
	
	// 最大文件大小
	private long maxSize = 1000000;

	// 文件保存目录路径
	private String savePath;
	
	
	public UploadUtils() {
		
	}
	
	
	/**
	 * 文件上传
	 * @param savePath 文件保存路径
	 * @param saveUrl 文件保存目录URL
	 * @param request
	 * @return
	 */
	public String uploadFile(HttpServletRequest request,MultipartFile file,Attachment attachment) {
		//获取当前URL
		String url = request.getRequestURL().toString();
		
		//获取当前上下文
		String contextPath = request.getContextPath();
		
		//截取上下文后部分
		url=url.substring(0,url.lastIndexOf("/"));
		if(StringUtils.isNotBlank(url)){
			url = url.split(contextPath)[1];
		}
		
		//获取文件存放根目录 D:/dm
		String basedir = Global.getConfig("files.basedir");
		
		//.../basePath/dirName/yyyyMMdd/
		String ymd = new SimpleDateFormat("yyyyMMdd").format(new Date());
		
		//获取上传的文件名
		String fileName =file.getOriginalFilename();
		
		//获取文件类型
		String type = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length());
		
		//保存数据库的URL
		String saveUrl = url+"/download?fileName="+ymd + "/"+fileName;
		
		//文件保存目录路径
		savePath = basedir+File.separator+ BASEPATH + File.separator+DIRNAME+File.separator+ymd+File.separator;
		
		//判断传入的目录是否存在，如果不存在则自动创建
		File saveDirFile = new File(savePath);
		if (!saveDirFile.exists()) {
			saveDirFile.mkdirs();
		}
		//验证上传规则
		String info = validateField(request,file,saveDirFile);
		if("true".equals(info)){
			int readByte = 0;
			FileOutputStream outs =null;
			InputStream is = null;
			try {
				// 打开源文件
				is = file.getInputStream();
				//打开目标文件的输出流
				outs = new FileOutputStream(saveDirFile+File.separator+fileName);
				byte[] buf = new byte[1024];
				// 一次读取1024个字节，当readByte为-1时表示文件已经读取完毕
				while ((readByte = is.read(buf)) != -1) {
					// 将读取的字节流写入到输出流
					outs.write(buf, 0, readByte);
				}
			}catch (FileNotFoundException e1) {
				e1.printStackTrace();
			}catch(IOException e){
				e.printStackTrace();
			}finally{
				if (outs != null) {
					try {
						outs.close();
					} catch (IOException oute) {
						oute.printStackTrace();
					}
				}
				if (is != null) {
					try {
						is.close();
					} catch (IOException ine) {
						ine.printStackTrace();
					}
				}
			}
			
			//把文件信息保存到附件表
			attachment.setId(IdGen.uuid());
			attachment.setAbsolutePath(savePath); //服务器存放地址
			attachment.setName(fileName);
			attachment.setAccessPath(saveUrl);
			attachment.setAttachmentType(type);
			attachment.preInsert();//调用insert之前生成当前用户信息
			attachmentDao.insert(attachment);
			return saveUrl;
		}
		return info;
	}

	/**
	 * 文件下载
	 * @param savePath 文件保存路径
	 * @param saveUrl 文件保存目录URL
	 * @param request
	 * @return
	 */
	public String download(HttpServletResponse response,HttpServletRequest request) {
		Attachment att = null;
		String id = request.getParameter("id");
		if(StringUtils.isNotBlank(id)){
			att = attachmentDao.get(id);
		}
		response.setCharacterEncoding("utf-8");
		response.setContentType("multipart/form-data;charset=utf-8");
		String userAgent = request.getHeader("User-Agent");
		//获取文件存放根目录 D:/dm
		String basedir = Global.getConfig("files.basedir");
		String fileName =att.getName();
		try {
			if(userAgent.contains("Firefox")){
					response.setHeader("Content-Disposition", "attachment;fileName*="+ URLEncoder.encode(att.getName(), "UTF-8"));
			}else{
					response.setHeader("Content-disposition", String.format("attachment; filename=\"%s\"", new String(fileName.getBytes("UTF-8"),"ISO-8859-1")));
					response.setCharacterEncoding("UTF-8"); 
			}
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		InputStream inputStream = null;
		OutputStream os =null;
		try {
			String path =basedir+File.separator + BASEPATH +File.separator + DIRNAME + File.separator + att.getCreateBy().getId() + File.separator;
			inputStream = new FileInputStream(new File(path + File.separator
					+ fileName));
			os = response.getOutputStream();
			byte[] b = new byte[2048];
			int length;
			while ((length = inputStream.read(b)) > 0) {
				os.write(b, 0, length);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != os) {
				try {
					os.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (null != inputStream) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			
		}
		return null;
	}
	
	
	
	
	/**
	 * 上传验证,并初始化文件目录
	 * 
	 * @param request
	 */
	private String validateField(HttpServletRequest request,MultipartFile file,File saveDirFile) {
		String errorInfo = "true";
		String contentType = request.getContentType();
		if (file == null || !contentType.startsWith("multipart")) {
			//System.out.println("请求不包含multipart/form-data流");
			errorInfo = "请求不包含multipart/form-data流";
		} else if (maxSize < file.getSize()) {
			//System.out.println("上传文件大小超出文件最大大小");
			errorInfo = "上传文件大小超出文件最大大小[" + maxSize + "]";
		} else if (!saveDirFile.isDirectory()) {// 检查目录
			errorInfo = "上传目录[" + savePath + "]不存在";
		}else if (StringUtils.isEmpty(file.getOriginalFilename())) {// 检查目录
			errorInfo = "请选择文件";
		} 
		return errorInfo;
	}
	
	/**
	 * 上传文件
	 * @param request
	 * @param servletRequest
	 * @return
	 */
	public List<Attachment> springMvcUpload(MultipartHttpServletRequest request,HttpServletRequest servletRequest){
		Iterator<String> itr = request.getFileNames();
		List<Attachment> list = new ArrayList<Attachment>();
		Attachment attachment = new Attachment();
		attachment.setTaskId(servletRequest.getParameter("taskId"));
		attachment.setType(servletRequest.getParameter("type"));
		attachment.setStatus(servletRequest.getParameter("status"));
		//获取当前URL
		String url = servletRequest.getRequestURL().toString();
		//获取当前上下文
		String contextPath = request.getContextPath();
		//截取上下文后部分
		url=url.substring(0,url.lastIndexOf("/"));
		if(StringUtils.isNotBlank(url)){
			url = url.split(contextPath)[1];
		}
		//获取文件存放根目录 D:/dm
		String basedir = Global.getConfig("files.basedir");
		while(itr.hasNext()){
			MultipartFile file = request.getFile(itr.next());
			User user = UserUtils.getUser();
			String userId = user.getId();
			//获取上传的文件名
			String fileName =file.getOriginalFilename();
			//获取文件类型
			String type = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length());
			//保存数据库的URL
			//文件保存目录路径
			savePath = basedir+File.separator+ BASEPATH + File.separator+DIRNAME+File.separator+userId+File.separator;
			//判断传入的目录是否存在，如果不存在则自动创建
			File saveDirFile = new File(savePath);
			if (!saveDirFile.exists()) {
				saveDirFile.mkdirs();
			}
			String uuid = IdGen.uuid();
			String saveUrl = url+"/download?id="+uuid;
			//把文件信息保存到附件表
			attachment.setId(uuid);
			attachment.setAbsolutePath(savePath); //服务器存放地址
			attachment.setName(fileName);
			attachment.setAccessPath(saveUrl);
			attachment.setAttachmentType(type);
			//attachment.preInsert();//调用insert之前生成当前用户信息
			attachment.setIsNewRecord(true);
			attachmentService.save(attachment);
			try {
				file.transferTo(new File(savePath + fileName));
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			list.add(attachment);
		}
		
		return list;
	}
	
	/**
	 * 上传文件
	 * @param request
	 * @param servletRequest
	 * @return
	 */
	public List<Attachment> uploadFile(MultipartHttpServletRequest request,HttpServletRequest servletRequest){
		Iterator<String> itr = request.getFileNames();
		List<Attachment> list = new ArrayList<Attachment>();
		Attachment attachment = new Attachment();
		attachment.setTaskId(servletRequest.getParameter("taskId"));
		attachment.setType(servletRequest.getParameter("type"));
		attachment.setStatus(servletRequest.getParameter("status"));
		//获取当前URL
		String url = servletRequest.getRequestURL().toString();
		//获取当前上下文
		String contextPath = request.getContextPath();
		//截取上下文后部分
		url=url.substring(0,url.lastIndexOf("/"));
		if(StringUtils.isNotBlank(url)){
			url = url.split(contextPath)[1];
		}
		//获取文件存放根目录 D:/dm
		String basedir = Global.getConfig("files.basedir");
		while(itr.hasNext()){
			MultipartFile file = request.getFile(itr.next());
			User user = UserUtils.getUser();
			String userId = user.getId();
			//获取上传的文件名
			String fileName =file.getOriginalFilename();
			//获取文件类型
			String type = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length());
			//保存数据库的URL
			//文件保存目录路径
			savePath = basedir+File.separator+ BASEPATH + File.separator+DIRNAME+File.separator+userId+File.separator;
			//判断传入的目录是否存在，如果不存在则自动创建
			File saveDirFile = new File(savePath);
			if (!saveDirFile.exists()) {
				saveDirFile.mkdirs();
			}
			String uuid = IdGen.uuid();
			String saveUrl = url+"/download?id="+uuid;
			//把文件信息保存到附件表
			attachment.setId(uuid);
			attachment.setAbsolutePath(savePath); //服务器存放地址
			attachment.setName(fileName);
			attachment.setAccessPath(saveUrl);
			attachment.setAttachmentType(type);
			//attachment.preInsert();//调用insert之前生成当前用户信息
			attachment.setIsNewRecord(true);
			attachmentService.save(attachment);
			try {
				file.transferTo(new File(savePath + fileName));
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			list.add(attachment);
		}
		
		return list;
	}
	
	/**
	 * 上传图片
	 * @param request
	 * @param servletRequest
	 * @return
	 */
	public Map<String, Object> uploadPhoto(MultipartHttpServletRequest request,HttpServletRequest servletRequest){
		Iterator<String> itr = request.getFileNames();
		//获取当前URL
		String url = servletRequest.getRequestURL().toString();
		//获取当前上下文
		String contextPath = request.getContextPath();
		//截取上下文后部分
		url=url.substring(0,url.lastIndexOf("/"));
		if(StringUtils.isNotBlank(url)){
			url = url.split(contextPath)[1];
		}
		//获取文件存放根目录 D:/dm
		String basedir = Global.getConfig("files.basedir");
		//要保存的目标文件
		String saveUrl = "";
		if(itr.hasNext()){
			MultipartFile file = request.getFile(itr.next());
			//.../basePath/dirName/yyyyMMddHHmmss/
			//String ymd = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
			User user = UserUtils.getUser();
			String userId = user.getId();
			//获取上传的文件名
			String fileName =file.getOriginalFilename();
			//获取文件类型
			String type = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length());
			
			if(!type.equalsIgnoreCase("jpg") && !type.equalsIgnoreCase("png")){
				Map<String, Object> resultMap =  JsonUtils.jsonString(0, saveUrl);
				resultMap.put("data", "请上传jpg或png格式的图片！");
				return resultMap;
			}
			
			//文件保存目录路径
			savePath = basedir+File.separator+ BASEPATH + File.separator+DIRNAME+File.separator+userId+File.separator;
			//判断传入的目录是否存在，如果不存在则自动创建
			File saveDirFile = new File(savePath);
			if (!saveDirFile.exists()) {
				saveDirFile.mkdirs();
			}
			saveUrl = url+"/downloadphoto?fileName="+userId+"/"+fileName;
			try {
				file.transferTo(new File(savePath + fileName));
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return JsonUtils.jsonString(1, saveUrl);
	}
	
	/**
	 * 下载图片
	 * @param response
	 * @param request
	 * @return
	 */
	public void downloadPhoto(HttpServletResponse response,HttpServletRequest request) {
		response.setCharacterEncoding("utf-8");
		response.setContentType("multipart/form-data;charset=utf-8");
		String fileName = request.getParameter("fileName");
		try {
			fileName = new String(fileName.getBytes("ISO-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException e2) {
			e2.printStackTrace();
		}
		String userAgent = request.getHeader("User-Agent");
		
		//获取文件存放根目录 D:/dm
		String basedir = Global.getConfig("files.basedir");
		
		String date = fileName.split("/")[0];
		try {
			fileName = URLEncoder.encode(fileName.split("/")[1], "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		if(userAgent.contains("Firefox")){
			response.setHeader("Content-Disposition", "attachment;fileName*=" + fileName);
		}else if(userAgent.contains("AppleWebKit")){
			try {
				response.setHeader("Content-disposition", String.format("attachment; filename=\"%s\"", new String(fileName.getBytes("UTF-8"),"ISO-8859-1")));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}else{
			response.setHeader("Content-Disposition", "attachment;fileName=" + fileName);
		}
		InputStream inputStream = null;
		OutputStream os =null;
		try {
			String path =basedir+File.separator + BASEPATH +File.separator + DIRNAME + File.separator + date + File.separator;
			File orderFile = new File(path + URLDecoder.decode(fileName, "UTF-8"));
			if(!orderFile.exists()){
				orderFile = new File(basedir+File.separator + BASEPATH +File.separator + DIRNAME + File.separator + "photo" + File.separator + "default.png");
			}
			inputStream = new FileInputStream(orderFile);
			os = response.getOutputStream();
			byte[] b = new byte[2048];
			int length;
			while ((length = inputStream.read(b)) > 0) {
				os.write(b, 0, length);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != os) {
				try {
					os.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (null != inputStream) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			
		}
	}
	
}
