package com.bt.surfond.front.core.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bt.surfond.attachment.dao.AttachmentDao;
import com.bt.surfond.attachment.entity.Attachment;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSFile;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.utils.SpringContextHolder;

/**
 * 文件上传工具类
 * @author dyl
 *
 */
@Component
public class FileUploadUtils {
	
	private static AttachmentDao attachmentDao = SpringContextHolder.getBean(AttachmentDao.class);

	/**
	 * 将文件保存到mongodb
	 * @param request
	 * @param attachment
	 * @return
	 */
	public static String upload(HttpServletRequest request, Attachment attachment){
		//首先检查是否上传了文件
		List<MultipartFile> multipartFileList;
		try {
			multipartFileList = ((MultipartHttpServletRequest)request).getFiles("files");
		} catch (Exception ex) {
			return null;//没有上传文件时出现转换异常直接返回
		}
		
		//获取数据库实例
		@SuppressWarnings("deprecation")
		DB db = MongoManager.client.getDB(MongoManager.DATABASE_NAME);
		//构建集合实例（文件）
		GridFS gridFS = new GridFS(db, MongoManager.COLLECTION_NAME);
		
		InputStream in = null;//先声明后使用，注意关流
		
		try {
			//获取文件数组并遍历处理
			if(null != multipartFileList){
				for(MultipartFile file : multipartFileList){
					//提取文件信息保存到附件表
					attachment.preInsert();
					attachment.setName(file.getOriginalFilename());
					attachment.setAttachmentType(file.getContentType());
					attachment.setAccessPath("/a/attachment/download?id=" + attachment.getId());
					attachment.setSize(file.getSize() + "");
					attachmentDao.insert(attachment);
					
					//将文件写入mongodb
					in = file.getInputStream();
					GridFSFile gridFSFile = gridFS.createFile(in);
					gridFSFile.put("_id", attachment.getId());
					gridFSFile.put("filename", attachment.getName());
					gridFSFile.put("attachment_type", attachment.getAttachmentType());
					gridFSFile.put("access_path", attachment.getAccessPath());
					gridFSFile.put("type", attachment.getType());
					gridFSFile.put("status", attachment.getStatus());
					gridFSFile.put("create_by", attachment.getCreateBy().getId());
					gridFSFile.put("create_date", attachment.getCreateDate());
					gridFSFile.save();
				}
			}
		} catch (IOException e) {
			throw new RuntimeException("文件写入mongodb失败！", e);
		} finally {
			if(null != in){
				try {
					in.close();
				} catch (IOException e) {
					throw new RuntimeException("文件写入mongodb时输入流关闭异常！", e);
				}
			}
		}
		return null;
	}
	
	/**
	 * 从mongodb下载文件
	 * @param request
	 * @param response
	 */
	public static void download(HttpServletRequest request, HttpServletResponse response){
		//取得_id参数
		String _id = request.getParameter("id");
		
		if(StringUtils.isNotBlank(_id)){
			//获取数据库实例
			@SuppressWarnings("deprecation")
			DB db = MongoManager.client.getDB(MongoManager.DATABASE_NAME);
			//构建集合实例（文件）
			GridFS gridFS = new GridFS(db, MongoManager.COLLECTION_NAME);
			
			//构建查询对象然后执行查询
			DBObject query=new BasicDBObject("_id", _id);
			GridFSDBFile gridFSDBFile = gridFS.findOne(query);
			
			if(null != gridFSDBFile){
				OutputStream out = null;
				try {
					//获取输出流
					out = response.getOutputStream();
					//设置响应正文MIME类型
					response.setContentType("application/octet-stream");
					//获取文件名并解决编码问题
					String name = (String) gridFSDBFile.get("filename");
					String fileName = new String(name.getBytes("GBK"), "ISO8859-1");
					//设置下载响应头
					response.addHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
					//向客户端输入文件
					gridFSDBFile.writeTo(out);
					out.flush();
				} catch (IOException e) {
					throw new RuntimeException("从mongodb读取文件失败！", e);
				} finally {
					if(null != out){
						try {
							out.close();
						} catch (IOException e) {
							throw new RuntimeException("从mongodb读取文件时输出流关闭异常！", e);
						}
					}
				}
			}
		}
	}
	
	
	static class MongoManager {
		
		/**
		 * 加载时创建mongodb客户端实例，该实例是单例的
		 */
		private static MongoClient client = 
				new MongoClient(Global.getConfig("mongodb.host"), 
						Integer.parseInt(Global.getConfig("mongodb.port")));
		/**
		 * 数据库名称
		 */
		private static String DATABASE_NAME = "mongopc";
		/**
		 * 存储附件的集合名
		 */
		private static String COLLECTION_NAME = "attachment";
	}
	
}
