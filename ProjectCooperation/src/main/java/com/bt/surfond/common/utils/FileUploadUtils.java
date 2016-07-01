package com.bt.surfond.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import org.junit.Test;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSFile;
import com.thinkgem.jeesite.common.utils.IdGen;


public class FileUploadUtils {
	
	

	@Test
	public void test() throws Exception{
//		InputStream in = new FileInputStream(new File("D:\\dm\\htq.png"));
//		String _id = FileUploadUtils.MongodbManager.writeFileToDB(in);
//		System.out.println(_id);//19dfce24fb3c4c75a88a57e0c944f105
		
		
		GridFSDBFile gridFSDBFile = FileUploadUtils.MongodbManager.readAsGridFSDBFile("19dfce24fb3c4c75a88a57e0c944f105");
//		OutputStream out = new FileOutputStream(new File("d:\\dm\\bb.png"));
		System.out.println(gridFSDBFile.getContentType());
		System.out.println(gridFSDBFile.getFilename());
		gridFSDBFile.writeTo(new File("d:\\dm\\cc.png"));
		
		
	}
	
	
	private static class MongodbManager {
		
		/**mongodb客户端连接实例*/
//		private static MongoClient client = new MongoClient(Global.getConfig("mongodb.host"), Integer.parseInt(Global.getConfig("mongodb.port")));
		private static MongoClient client = new MongoClient("192.168.1.175", Integer.parseInt("27017"));
		
		/**数据库名称*/
		private static String DATABASE_NAME = "mongopc";
		
		/**集合名称*/
		private static String COLLECTION_NAME = "attachment";
		
		/**
		 * 初始化mongodb客户端连接
		 * @return
		 * @throws ExceptionInInitializerError
		 */
		private static MongoClient getMongoClient() throws ExceptionInInitializerError{
			if(null == client){
				throw new ExceptionInInitializerError("mongo client instance can not be initial.");
			}
			return client;
		}
		
		/**
		 * 获取数据库实例
		 * @return
		 */
		private static DB getDB(){
			return getMongoClient().getDB(DATABASE_NAME);
		}
		
		/**
		 * 将文件写入mongodb数据库
		 * @param in 要写入数据库的文件输入流
		 * @return 返回文件在数据库中的唯一标识（ID）
		 */
		private static String writeFileToDB(InputStream in){
			GridFS gridFS = new GridFS(getDB(), COLLECTION_NAME);//相当于获取集合，没有则创建并返回
			
			GridFSFile gridFSFile = gridFS.createFile(in);//相当于创建新的文档
			
			String _id = IdGen.uuid();
			gridFSFile.put("_id", _id);
			gridFSFile.save();//保存都数据库
			return _id;
		}
		
		/**
		 * 从mongodb数据库读取文件
		 * @param _id 要读取文件在数据库的唯一标识
		 * @return
		 */
		private static GridFSDBFile readAsGridFSDBFile(String _id){
			GridFS gridFS = new GridFS(getDB(), COLLECTION_NAME);
			DBObject query = new BasicDBObject("_id", _id);
			return gridFS.findOne(query);
		}
		
	}
	
}
