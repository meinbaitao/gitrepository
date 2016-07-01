package com.bt.surfond.front.core.entity;

import java.io.Serializable;

import javax.mail.Address;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.commons.lang3.StringUtils;

import com.thinkgem.jeesite.common.config.Global;

/**
 * 邮件信息实体
 * @author dyl
 *
 */
public class EmailEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String host;			//邮件服务器地址
	private String from;			//发件人
	private String password;		//发件人认证密码
	private String recipients;		//收件人（多个是用英文逗号隔开）
	private String subject;			//主题
	private String content;			//内容
	
	/**邮箱服务器地址*/
	public static final String EMAIL_HOST = Global.getConfig("email_host");
	/**系统邮箱账号*/
	public static final String EMAIL_FROM = Global.getConfig("email_username");
	/**系统邮箱密码*/
	public static final String EMAIL_PASSWORD = Global.getConfig("email_password");
	
	public EmailEntity(){
		this.host = EMAIL_HOST;
		this.from = EMAIL_FROM;
		this.password = EMAIL_PASSWORD;
	}
	
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRecipients() {
		return recipients;
	}
	public void setRecipients(String recipients) {
		this.recipients = recipients;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	/**
	 * 将包含多个邮箱地址并用逗号隔开的字符串转换成Address数组
	 * @param recipients
	 * @return
	 * @throws AddressException
	 */
	public Address[] getAddress() throws AddressException{
		Address[] address = null;
		if(StringUtils.isNotBlank(recipients)){
			String[] recipientsArray = recipients.split(",");
			if(null != recipientsArray){
				address = new InternetAddress[recipientsArray.length];
				for(int i = 0; i < recipientsArray.length; i++){
					address[i] = new InternetAddress(recipientsArray[i]);
				}
			}
		}
		return address;
	}
	
}
