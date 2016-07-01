package com.bt.surfond.common.utils;

import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.commons.lang3.StringUtils;

import com.bt.surfond.common.Constants;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.utils.IdGen;


/**
 * JavaMail工具类
 * @author mjs
 *
 */
public class EmailUtils {
	
	/**
	 * 邮箱服务地址
	 */
	private static String EMAIL_HONST = Global.getConfig("email_host");							
	/**
	 * 账号
	 */
	private static String EMAIL_USERNAME = Global.getConfig("email_username");				
	/**
	 * 密码
	 */
	private static String EMAIL_PASSWORD = Global.getConfig("email_password");	
	private static final String EMAIL_IMG_FILE = "/email_images/" ;
	/**
	 * 邮件图片路径
	 */
	private static String IMG_PATH =Global.getConfig("files.basedir");
	/**
	 * 最原始邮件发送(内容纯文本)
	 * @param email_host	邮件服务地址
	 * @param toSomeOne		收件人账号
	 * @param title			邮件主题
	 * @param content		邮件内容
	 * @param email_username发件人账号
	 * @param email_password发件人密码
	 * @return
	 */
	public static String sendTextMail(String toSomeOne,String title,String content){
		if(StringUtils.isNotBlank(EMAIL_USERNAME)){
			if(StringUtils.isNotBlank(toSomeOne)){
				Transport transport =null;
				try {
					//创建属性对象
					Properties props = new Properties();
					props.put("mail.smtp.host", EMAIL_HONST);
			        props.put("mail.smtp.auth", "true");
			        //创建邮件会话，并将属性存入会话
					Session session = Session.getInstance(props);
					session.setDebug(false);
					//创建邮件信息
					MimeMessage massage = new MimeMessage(session);
					//创建一个邮件源地址
					InternetAddress addressFrom = new InternetAddress(EMAIL_USERNAME);
					massage.setFrom(addressFrom);
					//创建一个收件地址
					InternetAddress addressTo = new InternetAddress(toSomeOne);
					massage.setRecipient(Message.RecipientType.TO, addressTo);
					massage.setSubject(title, "utf-8");
					Multipart mp = new MimeMultipart();
					MimeBodyPart bodyPart = new MimeBodyPart();
					bodyPart.setContent(content, "text/plain;charset=utf-8");
					mp.addBodyPart(bodyPart);
					massage.setContent(mp);
					massage.setSentDate(new Date());
					transport = session.getTransport("smtp");
					transport.connect(EMAIL_HONST, EMAIL_USERNAME, EMAIL_PASSWORD);
					transport.sendMessage(massage,massage.getRecipients(MimeMessage.RecipientType.TO));
				} catch (Exception e) {
					e.printStackTrace();
					return "error";
				}finally{
					if(null !=transport){
						try {
							transport.close();
						} catch (MessagingException e) {
							e.printStackTrace();
						}
					}
				}
			}else{
				return "收信人地址为空！";
			}
		}else{
			return "发信人地址为空！";
		}
		return "success";
	}
	
	/**
	 * 最原始邮件发送(内容可接受html)
	 * @param email_host	邮件服务地址
	 * @param toSomeOne		收件人账号
	 * @param title			邮件主题
	 * @param content		邮件内容
	 * @param email_username发件人账号
	 * @param email_password发件人密码
	 * @return
	 */
	public static String sendHtmlEmail(String toSomeOne,String title,String content){
		if(StringUtils.isNotBlank(EMAIL_USERNAME)){
			if(StringUtils.isNotBlank(toSomeOne)){
				Transport transport = null;
				try {
					//创建属性对象
					Properties props = new Properties();
					props.put("mail.smtp.host", EMAIL_HONST);
			        props.put("mail.smtp.auth", "true");
			        //创建邮件会话，并将属性存入会话
					Session session = Session.getInstance(props);
					session.setDebug(false);
					//创建邮件信息
					MimeMessage massage = new MimeMessage(session);
					//创建一个邮件源地址
					InternetAddress addressFrom = new InternetAddress(EMAIL_USERNAME);
					massage.setFrom(addressFrom);
					//创建一个收件地址
					InternetAddress addressTo = new InternetAddress(toSomeOne);
					massage.setRecipient(Message.RecipientType.TO, addressTo);
					massage.setSubject(title, "utf-8");
					Multipart mp = new MimeMultipart();
					MimeBodyPart bodyPart = new MimeBodyPart();
					bodyPart.setContent(content, "text/html;charset=utf-8");
					mp.addBodyPart(bodyPart);
			        
					massage.setContent(mp);
					massage.setSentDate(new Date());
					transport = session.getTransport("smtp");
					transport.connect(EMAIL_HONST, EMAIL_USERNAME, EMAIL_PASSWORD);
					transport.sendMessage(massage,massage.getRecipients(MimeMessage.RecipientType.TO));
				} catch (Exception e) {
					e.printStackTrace();
					return "error";
				}finally{
					if(null !=transport){
						try {
							transport.close();
						} catch (MessagingException e) {
							e.printStackTrace();
						}
					}
				}
			}else{
				return "收信人地址为空！";
			}
		}else{
			return "发信人地址为空！";
		}
		return "success";
	}
	
	/**
	 * 最原始邮件发送(内容可接受html)
	 * @param email_host	邮件服务地址
	 * @param toSomeOne		收件人账号
	 * @param title			邮件主题
	 * @param content		邮件内容
	 * @param email_username发件人账号
	 * @param email_password发件人密码
	 * @return
	 */
	public static String sendHtmlMail(String toSomeOne,String title,String content){
		if(StringUtils.isNotBlank(EMAIL_USERNAME)){
			if(StringUtils.isNotBlank(toSomeOne)){
				Transport transport =null;
				try {
					//创建属性对象
					Properties props = new Properties();
					props.put("mail.smtp.host", EMAIL_HONST);
			        props.put("mail.smtp.auth", "true");
			        //创建邮件会话，并将属性存入会话
					Session session = Session.getInstance(props);
					session.setDebug(false);
					//创建邮件信息
					MimeMessage massage = new MimeMessage(session);
					//创建一个邮件源地址
					InternetAddress addressFrom = new InternetAddress(EMAIL_USERNAME);
					massage.setFrom(addressFrom);
					//创建一个收件地址
					InternetAddress addressTo = new InternetAddress(toSomeOne);
					massage.setRecipient(Message.RecipientType.TO, addressTo);
					massage.setSubject(title, "utf-8");
					Multipart mp = new MimeMultipart();
					MimeBodyPart bodyPart = new MimeBodyPart();
					bodyPart.setContent(content, "text/html;charset=utf-8");
					mp.addBodyPart(bodyPart);
					//设置邮件图片——海豚圈
			        MimeBodyPart htq = new MimeBodyPart();
			        htq.setDataHandler(new DataHandler(new FileDataSource(IMG_PATH+EMAIL_IMG_FILE+Constants.EMAIL_LOGO_HTQ)));
			        htq.setContentID(Constants.EMAIL_LOGO_HTQ);
			        //设置邮件图片——Surfond
			        MimeBodyPart surfond = new MimeBodyPart();
			        surfond.setDataHandler(new DataHandler(new FileDataSource(IMG_PATH+EMAIL_IMG_FILE+Constants.EMAIL_LOGO_SURFOND)));
			        surfond.setContentID(Constants.EMAIL_LOGO_SURFOND);
			        //设置邮件图片——二维码
			        MimeBodyPart qrCode = new MimeBodyPart();
			        qrCode.setDataHandler(new DataHandler(new FileDataSource(IMG_PATH+EMAIL_IMG_FILE+Constants.EMAIL_QR_CODE)));
			        qrCode.setContentID(Constants.EMAIL_QR_CODE);
			        //描述数据关系
			        mp.addBodyPart(htq);
			        mp.addBodyPart(surfond);
			        mp.addBodyPart(qrCode);
			        ((MimeMultipart) mp).setSubType("related");
			        
					massage.setContent(mp);
					massage.setSentDate(new Date());
					transport = session.getTransport("smtp");
					transport.connect(EMAIL_HONST, EMAIL_USERNAME, EMAIL_PASSWORD);
					transport.sendMessage(massage,massage.getRecipients(MimeMessage.RecipientType.TO));
					transport.close();
				} catch (Exception e) {
					e.printStackTrace();
					return "error";
				}finally{
					if(null !=transport){
						try {
							transport.close();
						} catch (MessagingException e) {
							e.printStackTrace();
						}
					}
				}
			}else{
				return "收信人地址为空！";
			}
		}else{
			return "发信人地址为空！";
		}
		return "success";
	}
	
	/**
	 *  自己注册账号，发送html内容邮件
	 * 	用柏涛邮箱服务、柏涛固定账号-----自定义内容，验证激活
	 * @param toSomeOne	收件人
	 * @param content 自定义内容
	 * @return
	 */
	public static String registSendMail(String toSomeOne,String title,String content){
		return sendHtmlMail(toSomeOne, title, content);
	}
	
	public static void main(String[] args) {
		registSendMail("mjs@clearcom.com.cn", "注册邀请", EmailModel.registModel("mjsClearcom.com.cn", IdGen.uuid()));
	}
	
	/**
	 * 邀请成员，发送html内容邮件(不是系统用户)要有注册链接
	 * 	用柏涛邮箱服务、柏涛固定账号-----自定义内容
	 * @param userName	发件人
	 * @param password	密码
	 * @param toSomeOne	收件人
	 * @return
	 */
	public static String inviteSendMailNoAccount(String toSomeOne,String title,String content){
		return sendHtmlMail(toSomeOne, title, content);
	}
		
	
	/**
	 * 邀请成员，发送html内容邮件(已经是系统用户)
	 * 	用柏涛邮箱服务、柏涛固定账号-----自定义内容
	 * @param fromUser
	 * @param password
	 * @param toUser
	 * @param content
	 * @return
	 */
	public static String inviteSendMailHasAccount(String toUser,String title,String content){
		return sendHtmlMail(toUser, title, content);
	}
	
	
	
}
