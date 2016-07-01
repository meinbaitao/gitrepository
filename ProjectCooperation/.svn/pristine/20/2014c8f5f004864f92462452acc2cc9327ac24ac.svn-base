package com.bt.surfond.common.utils;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bt.surfond.attachment.dao.AttachmentDao;
import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.common.Constants;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSFile;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.SpringContextHolder;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 文件上传工具类
 * 
 * @author xjp
 * @date 2015-8-17
 */
@Component
public class UploadUtil {
	
	/**
	 * 注入附件信息
	 */
	private static AttachmentDao attachmentDao = SpringContextHolder.getBean(AttachmentDao.class);
	
	/**
	 * 数据库名称
	 */
	public static final String DB_NAME = "mongopc";
	/**
	 * 表名称
	 */
	public static final String DB_TABLE_NAME = "attachment";
	
	// 最大文件大小
	private long maxSize = 1000000;
	
	
	public UploadUtil() {
		
	}
	
	
	/**
	 * 上传文件
	 * @param request
	 * @param servletRequest
	 * @return
	 */
	public String fileUpload(MultipartHttpServletRequest multipart,HttpServletRequest request){
		MongoClient client = null;
		InputStream in =null;
		try{
			String taskId =request.getParameter("taskId");
			String type =request.getParameter("type");
			String status =request.getParameter("status");
			//获取当前URLhttp://www.clearcom.cn
			//http://localhost:8080/surfond/a/attachment/uploadFile
			String url = request.getRequestURL().toString();
			//String url = "http://www.clearcom.cn/a/attachment/uploadFile";
			
			//获取当前上下文
			String contextPath = request.getContextPath();
			//截取上下文后部分
			url=url.substring(0,url.lastIndexOf("/"));
			//获取域名
			String path = Global.getConfig("surfondPath");
			if(StringUtils.isNotBlank(url)){
				if(url.contains(path)){
					url = url.split(path)[1];
				}else{
					url = url.split(contextPath)[1];
				}
			}
			//1.链接MongoDB数据库
			client = new MongoClient(Global.getConfig("mongodb.host"), Integer.parseInt(Global.getConfig("mongodb.port")));
			//设置连接数据库名
			@SuppressWarnings("deprecation")
			DB db = client.getDB(DB_NAME);
			//设置表名
	        GridFS myFS = new GridFS(db,DB_TABLE_NAME);
			//2.获取上传文件集合
			Iterator<String> itr = multipart.getFileNames();
			//3.迭代文件集合获得文件流
			while(itr.hasNext()){
				//4.把文件流传入MongoDB驱动对象
				MultipartFile file = multipart.getFile(itr.next());
				
				if(file.getSize()<Constants.MXA_UPLOAD_FILE){
					in = file.getInputStream();
					//5.设置上传附件字段
					GridFSFile gfile = myFS.createFile(in);  
					String uuid =IdGen.uuid();
					//访问地址
					String saveUrl = url+"/download?id="+uuid;
					gfile.put("_id", uuid);
					gfile.put("filename", file.getOriginalFilename());
					gfile.put("attachType",file.getContentType());
					gfile.put("taskId",taskId);
					gfile.put("status",status);
					gfile.put("type",type);
					gfile.put("create_by",UserUtils.getUser().getId());
					gfile.put("create_date",new Date());
					gfile.put("url",saveUrl);
					//6.保存数据库到MongoDB  
					gfile.save(); 
					
					//把文件信息保存到附件表
					Attachment attachment = new Attachment();
					attachment.setSize(gfile.getLength()+"");
					attachment.setId(uuid);
					attachment.setName(file.getOriginalFilename());
					attachment.setAccessPath(saveUrl);
					attachment.setAttachmentType(file.getContentType());
					attachment.setTaskId(taskId);
					attachment.setStatus(status);
					attachment.setType(type);
					attachment.setIsNewRecord(true);
					attachment.preInsert();//调用insert之前生成当前用户信息
					attachmentDao.insert(attachment);
					return gfile.toString();
				}else{
					return Constants.MXA_UPLOAD_FILE_OUT;
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			//7.关闭mongoDB连接
			client.close();
			if(null !=in){
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}
	
	/**
	 * 手机端上传文件
	 * @param request
	 * @param servletRequest
	 * @return
	 */
	@SuppressWarnings({ "unused" })
	public String appFileUpload(HttpServletRequest request,String taskId,String type,String status){
		MongoClient client = null;
		InputStream in =null;
		try{
			//1.链接MongoDB数据库
			client = new MongoClient(Global.getConfig("mongodb.host"), Integer.parseInt(Global.getConfig("mongodb.port")));
			//设置连接数据库名
			@SuppressWarnings("deprecation")
			DB db = client.getDB(DB_NAME);
			//设置表名
	        GridFS myFS = new GridFS(db,DB_TABLE_NAME);
	        String str ="";
	        List<MultipartFile> list = null;
			//3.迭代文件集合获得文件流
	        try {
	        	list = ((MultipartHttpServletRequest)request).getFiles("files");
			} catch (Exception e) {
				return null;
			}
			for (MultipartFile file : list) {
				if(file.getSize()<Constants.MXA_UPLOAD_FILE_PICTURE){
					in = file.getInputStream();
					//5.设置上传附件字段
					GridFSFile gfile = myFS.createFile(in);  
					String uuid =IdGen.uuid();
					//访问地址
					String saveUrl = "/a/attachment/download?id="+uuid;
					gfile.put("_id", uuid);
					gfile.put("filename", file.getOriginalFilename());
					gfile.put("attachType",file.getContentType());
					gfile.put("taskId",taskId);
					gfile.put("status",status);
					gfile.put("type",type);
					gfile.put("create_by",UserUtils.getUser().getId());
					gfile.put("create_date",new Date());
					gfile.put("url",saveUrl);
					//6.保存数据库到MongoDB  
					gfile.save(); 
					
					//把文件信息保存到附件表
					Attachment attachment = new Attachment();
					attachment.setSize(gfile.getLength()+"");
					attachment.setId(uuid);
					attachment.setName(file.getOriginalFilename());
					attachment.setAccessPath(saveUrl);
					attachment.setAttachmentType(file.getContentType());
					attachment.setTaskId(taskId);
					attachment.setStatus(status);
					attachment.setType(type);
					attachment.setIsNewRecord(true);
					attachment.preInsert();//调用insert之前生成当前用户信息
					attachmentDao.insert(attachment);
					str = gfile.toString();
				}else{
					return Constants.MXA_UPLOAD_FILE_OUT;
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			//7.关闭mongoDB连接
			client.close();
			if(null !=in){
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return Constants.OPTION_SUCCESS;
	}
	
	
	/**
	 * 手机端发表语音
	 * @param request
	 * @param servletRequest
	 * @return
	 */
	@SuppressWarnings({ "unused" })
	public String appVioceFileUpload(HttpServletRequest request,String taskId,String type,String status,String timeLength){
		MongoClient client = null;
		InputStream in =null;
		try{
			
			System.out.println("appVioceFileUpload=======================================================");
			//1.链接MongoDB数据库
			client = new MongoClient(Global.getConfig("mongodb.host"), Integer.parseInt(Global.getConfig("mongodb.port")));
			//设置连接数据库名
			@SuppressWarnings("deprecation")
			DB db = client.getDB(DB_NAME);
			//设置表名
	        GridFS myFS = new GridFS(db,DB_TABLE_NAME);
	        String str ="";
	        List<MultipartFile> list = null;
			//3.迭代文件集合获得文件流
	        try {
	        	list = ((MultipartHttpServletRequest)request).getFiles("files");
	        	System.out.println("list=======================================================");
			} catch (Exception e) {
				return null;
			}
			for (MultipartFile file : list) {
				if(file.getSize()<Constants.MXA_UPLOAD_FILE_PICTURE){
					in = file.getInputStream();
					//5.设置上传附件字段
					GridFSFile gfile = myFS.createFile(in);  
					String uuid =IdGen.uuid();
					//访问地址
					String saveUrl = "/a/attachment/download?id="+uuid;
					gfile.put("_id", uuid);
					gfile.put("filename", file.getOriginalFilename());
					gfile.put("attachType",file.getContentType());
					gfile.put("taskId",taskId);
					gfile.put("status",status);
					gfile.put("type",type);
					gfile.put("create_by",UserUtils.getUser().getId());
					gfile.put("create_date",new Date());
					gfile.put("url",saveUrl);
					System.out.println("gfile.save=======================================================");
					//6.保存数据库到MongoDB  
					gfile.save(); 
					
					//把文件信息保存到附件表
					Attachment attachment = new Attachment();
					attachment.setSize(gfile.getLength()+"");
					attachment.setId(uuid);
					attachment.setName(file.getOriginalFilename());
					attachment.setAccessPath(saveUrl);
					attachment.setAttachmentType(file.getContentType());
					attachment.setTaskId(taskId);
					attachment.setStatus(status);
					attachment.setType(type);
					attachment.setIsNewRecord(true);
					attachment.setTimeLength(timeLength);
					attachment.preInsert();//调用insert之前生成当前用户信息
					System.out.println("attachmentDao.insert=======================================================");
					attachmentDao.insert(attachment);
					str = gfile.toString();
					System.out.println("str=======================================================");
				}else{
					return Constants.MXA_UPLOAD_FILE_OUT;
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			//7.关闭mongoDB连接
			client.close();
			if(null !=in){
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		System.out.println("SUCCESS=======================================================");
		return Constants.OPTION_SUCCESS;
	}

	/**
	 * 头像上传
	 * @param request
	 * @param servletRequest
	 * @return
	 */
	public String photoUpload(MultipartHttpServletRequest multipart,HttpServletRequest request){
		MongoClient client = null;
		InputStream in =null;
		try{
			//获取当前URL
			String url = request.getRequestURL().toString();
			//获取当前上下文
			String contextPath = request.getContextPath();
			//截取上下文后部分
			url=url.substring(0,url.lastIndexOf("/"));
			//获取域名
			String path = Global.getConfig("surfondPath");
			
			if(StringUtils.isNotBlank(url)){
				if(url.contains(path)){
					url = url.split(path)[1];
				}else{
					url = url.split(contextPath)[1];
				}
			}
			//1.链接MongoDB数据库
			client = new MongoClient(Global.getConfig("mongodb.host"), Integer.parseInt(Global.getConfig("mongodb.port")));
			//设置连接数据库名
			@SuppressWarnings("deprecation")
			DB db = client.getDB(DB_NAME);
			//设置表名
	        GridFS myFS = new GridFS(db,DB_TABLE_NAME);
			//2.获取上传文件集合
			Iterator<String> itr = multipart.getFileNames();
			//3.迭代文件集合获得文件流
			while(itr.hasNext()){
				//4.把文件流传入MongoDB驱动对象
				MultipartFile file = multipart.getFile(itr.next());
				if(file.getSize()<Constants.MXA_UPLOAD_FILE_PICTURE){
					in = file.getInputStream();
					//5.设置上传附件字段
					GridFSFile gfile = myFS.createFile(in);  
					String uuid =IdGen.uuid();
					//访问地址
					String saveUrl = url+"/download?id="+uuid;
					gfile.put("_id", uuid);
					gfile.put("filename", file.getOriginalFilename());
					gfile.put("attachType",file.getContentType());
					gfile.put("create_by",UserUtils.getUser().getId());
					gfile.put("create_date",new Date());
					gfile.put("url",saveUrl);
					//6.保存数据库到MongoDB  
					gfile.save(); 
					return saveUrl;
				}else{
					return Constants.MXA_UPLOAD_FILE_OUT;
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			//7.关闭mongoDB连接
			client.close();
			if(null !=in){
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}
	
	/**
	 * 头像上传
	 * @param request
	 * @param servletRequest
	 * @return
	 */
	public List<Attachment> appUploadFiles(MultipartHttpServletRequest multipart,HttpServletRequest request,String taskId){
		List<Attachment> attachments = new ArrayList<Attachment>();
		MongoClient client = null;
		InputStream in =null;
		try{
			//获取当前URL
			String url = request.getRequestURL().toString();
			//获取当前上下文
			String contextPath = request.getContextPath();
			//截取上下文后部分
			url=url.substring(0,url.lastIndexOf("/"));
			//获取域名
			String path = Global.getConfig("surfondPath");
			
			if(StringUtils.isNotBlank(url)){
				if(url.contains(path)){
					url = url.split(path)[1];
				}else{
					url = url.split(contextPath)[1];
				}
			}
			//1.链接MongoDB数据库
			client = new MongoClient(Global.getConfig("mongodb.host"), Integer.parseInt(Global.getConfig("mongodb.port")));
			//设置连接数据库名
			@SuppressWarnings("deprecation")
			DB db = client.getDB(DB_NAME);
			//设置表名
	        GridFS myFS = new GridFS(db,DB_TABLE_NAME);
			//2.获取上传文件集合
			Iterator<String> itr = multipart.getFileNames();
			//3.迭代文件集合获得文件流
			while(itr.hasNext()){
				//4.把文件流传入MongoDB驱动对象
				MultipartFile file = multipart.getFile(itr.next());
				if(file.getSize()<Constants.MXA_UPLOAD_FILE_PICTURE){
					in = file.getInputStream();
					//5.设置上传附件字段
					GridFSFile gfile = myFS.createFile(in);  
					String uuid =IdGen.uuid();
					//访问地址
					String saveUrl = url+"/download?id="+uuid;
					gfile.put("_id", uuid);
					gfile.put("filename", file.getOriginalFilename());
					gfile.put("attachType",file.getContentType());
					gfile.put("create_by",UserUtils.getUser().getId());
					gfile.put("create_date",new Date());
					gfile.put("url",saveUrl);
					//6.保存数据库到MongoDB  
					gfile.save(); 
					//把文件信息保存到附件表
					Attachment attachment = new Attachment();
					attachment.setSize(gfile.getLength()+"");
					attachment.setId(uuid);
					attachment.setName(file.getOriginalFilename());
					attachment.setAccessPath(saveUrl);
					attachment.setAttachmentType(file.getContentType());
					attachment.setTaskId(taskId);
					attachment.setStatus("0");
					attachment.setType(taskId);
					attachment.setIsNewRecord(true);
					attachment.preInsert();//调用insert之前生成当前用户信息
					attachmentDao.insert(attachment);
					attachments.add(attachment);
				}
			}
			return attachments;
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			//7.关闭mongoDB连接
			client.close();
			if(null !=in){
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}
	
	
	/**
	 * 文件下载
	 * @param request
	 * @param servletRequest
	 * @return
	 * @throws IOException 
	 */
	@SuppressWarnings("deprecation")
	public void download(HttpServletResponse response,HttpServletRequest request){
		MongoClient client = null;
		OutputStream sos =null;
		try{
			//获取数据库连接
			client = new MongoClient(Global.getConfig("mongodb.host"), Integer.parseInt(Global.getConfig("mongodb.port")));
			//获取数据库名称
			DB db = client.getDB(DB_NAME);
			//获取表名
			GridFS myFS = new GridFS(db,DB_TABLE_NAME); 
			//获取附件ID
			String id =request.getParameter("id");
			//根据附件ID查询附件
	        DBObject query=new BasicDBObject("_id",id);
	        //输出文件  
		    GridFSDBFile fileOut =myFS.findOne(query); 
		    if (fileOut != null) {
		    	//获取文件输出流
				sos = response.getOutputStream();
				//设置返回类型
				response.setContentType("application/octet-stream");
				// 获取原文件名
				String name = (String) fileOut.get("filename");
				String fileName = new String(name.getBytes("GBK"), "ISO8859-1");
				// 设置下载文件名
				response.addHeader("Content-Disposition", "attachment; filename=\""
						+ fileName + "\"");
				//向客户端输出文件
				fileOut.writeTo(sos);
				sos.flush();
			}
		}catch(IOException e){
			e.printStackTrace();
		}finally{
			if(null !=sos){
				try {
					sos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if(null !=client){
				client.close();
			}
		}
	}
	
	

	/**
	 * 上传验证,并初始化文件目录
	 * 
	 * @param request
	 */
	@SuppressWarnings("unused")
	private String validateField(HttpServletRequest request,MultipartFile multipart,String saveDirFile) {
		String errorInfo = "true";
		String contentType = request.getContentType();
		if (multipart == null || !contentType.startsWith("multipart")) {
			//System.out.println("请求不包含multipart/form-data流");
			errorInfo = "请求不包含multipart/form-data流";
		} else if (maxSize < multipart.getSize()) {
			//System.out.println("上传文件大小超出文件最大大小");
			errorInfo = "上传文件大小超出文件最大大小[" + maxSize + "]";
		}
		return errorInfo;
	}
}
