package com.bt.surfond.front.core.util;

import java.io.File;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import javax.mail.internet.MimeMultipart;
import javax.servlet.ServletContext;

import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import com.bt.surfond.front.core.entity.EmailEntity;

/**
 * 邮件工具类
 * @author dyl
 *
 */
public class EmailUtils {
	
	public static final String CID_HTQ = "htq.png";
	
	public static final String CID_SUR = "surfond.png";
	
	public static final String CID_QR = "qrcode.jpg";
	
	
	/**
	 * 发送邮件
	 * @param emailEntity
	 * @return
	 */
	public static void send(EmailEntity emailEntity) {
		WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
		ServletContext servletContext = webApplicationContext.getServletContext();
		String path = servletContext.getRealPath("/static/modules/surfond/regist/image");
		
		Transport transport = null;
		try {
			//构建属性对象
			Properties props = new Properties();
			props.put("mail.smtp.host", emailEntity.getHost());
			props.put("mail.smtp.auth", true);
			
			//根据属性创建邮件会话对象
			Session session = Session.getInstance(props);
			session.setDebug(true);//开启调试模式
			
			//创建一封邮件
			MimeMessage message = new MimeMessage(session);
			//设置发件人
			message.setFrom(new InternetAddress(emailEntity.getFrom()));
			//设置收件人，一到多个
			message.setRecipients(RecipientType.TO, emailEntity.getAddress());
			//设置主题
			message.setSubject(emailEntity.getSubject(), "UTF-8");
			//设置发送日期
			message.setSentDate(new Date());
			
			MimeMultipart mp = new MimeMultipart();
			mp.setSubType("related");
			message.setContent(mp);
			
			MimeBodyPart bp = new MimeBodyPart();
			bp.setContent(emailEntity.getContent(), "text/html;charset=UTF-8");
			mp.addBodyPart(bp);
			
			MimeBodyPart htq = new MimeBodyPart();
			htq.setDataHandler(new DataHandler(new FileDataSource(path + File.separator + CID_HTQ)));
			htq.setContentID(CID_HTQ);
			mp.addBodyPart(htq);
			
			MimeBodyPart sur = new MimeBodyPart();
			sur.setDataHandler(new DataHandler(new FileDataSource(path + File.separator + CID_SUR)));
			sur.setContentID(CID_SUR);
			mp.addBodyPart(sur);
			
			MimeBodyPart qr = new MimeBodyPart();
			qr.setDataHandler(new DataHandler(new FileDataSource(path + File.separator + CID_QR)));
			qr.setContentID(CID_QR);
			mp.addBodyPart(qr);
			
			transport = session.getTransport("smtp");
			transport.connect(emailEntity.getHost(), emailEntity.getFrom(), emailEntity.getPassword());
			transport.sendMessage(message, message.getAllRecipients());
		} catch (Exception e) {
			throw new RuntimeException("发送邮件失败！", e);
		} finally {
			if(null != transport){
				try {
					transport.close();
				} catch (MessagingException e) {
					throw new RuntimeException("发送邮件关闭发送对象异常！", e);
				}
			}
		}
	}
	
}
