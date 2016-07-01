package com.bt.surfond.common.utils;

import org.apache.commons.lang3.StringUtils;

import com.bt.surfond.common.Constants;
import com.bt.surfond.space.entity.Space;
import com.bt.surfond.task.entity.ProjectTask;
import com.thinkgem.jeesite.common.config.Global;


public class EmailModel {
	
	/**
	 * 项目路径
	 */
	private static String PATH = Global.getConfig("surfondPath");

	
	/**
	 * 注册激活邮件模板
	 * @param toEmail
	 * @return
	 */
	public static String registModel(String toEmail,String code){
		StringBuffer sb = new StringBuffer();
		sb.append("<!DOCTYPE html>");
		sb.append("<html lang=\"en\">");
		sb.append("<head>");
		sb.append("<meta charset=\"UTF-8\">");
		sb.append("<title>surfond邮件</title>");
		sb.append("<style type=\"text/css\">");
		sb.append(".logo{ margin: 50px auto 30px;width:250px;text-align: center;}");
		sb.append(".container{ width: 666px;margin: 0px auto;padding:50px 20px;border:solid 1px #00b1f1;font-family: \"\5B8B\4F53\";}");
		sb.append(".container h1{font-size: 24px;font-family: \"\5B8B\4F53\";text-align: center;}");
		sb.append(".container p{text-align: center;font-size: 12px;line-height: 24px;}");
		sb.append(".container a.register{display: block; margin:20px auto;width:340px;height: 40px;line-height: 40px; text-decoration: none;font-size: 16px;color: #fff; background-color: #00b1f1; text-align: center;}");
		sb.append(".container p>span.link{color:#0000ff; text-decoration: underline;}");
		sb.append(".container p.content{margin-top:50px;line-height: 32px; }");
		sb.append("</style>");
		sb.append("</head>");
		sb.append("<body>");
		sb.append("<div class=\"logo\">");
		sb.append("<img src=\"cid:"+Constants.EMAIL_LOGO_HTQ+"\">");
		sb.append("<img src=\"cid:"+Constants.EMAIL_LOGO_SURFOND+"\">");
		sb.append("</div>");
		sb.append("<div class=\"container \">");
		sb.append("<h1>欢迎注册Surfond</h1>");
		sb.append("<p>");
		sb.append("欢迎使用Surfond，我们是一个不一样的协作平台。<br>");
		sb.append("在互联网+时代，为您提供最精致的工具，帮您打造最精实的执行力。");
		sb.append("</p>");
		sb.append("<a href=\""+PATH+"/m/system/user/activationUser?emailCode="+toEmail+"&code="+code+"\" class=\"register\">点我完成注册</a>");
		sb.append("<p class=\"content\">");
		sb.append("如果点击无效，请复制并粘贴这个网址到浏览器地址栏<br>");
		sb.append("<span class='link'>"+PATH+"/m/system/user/activationUser?emailCode="+toEmail+"&code="+code+"</span>");
		sb.append("<br>这是系统自动发送的邮件，请不要直接回复哦。");
		sb.append("<br>需要联系我们，请致电4008-000-000，或发邮到surfond@clearcom.com.cn");
		sb.append("<br>想更多地了解我们，您可以访问<a href=\""+Constants.EMAIL_LINK_SURFOND+"\">www.surfond.com</a>");
		sb.append("<br>或微信关注：广州柏涛");
		sb.append("<br>");
		sb.append("<img src=\"cid:"+Constants.EMAIL_QR_CODE+"\"/>");
		sb.append("</p>");
		sb.append("</div>");
		sb.append("</body>");
		sb.append("</html>");
		return sb.toString();
	}
	
	/**
	 * 邀请邮件模板---------未有账号模板(邀请注册)
	 * @param email
	 * @param formUserName
	 * @param addressName
	 * @return
	 */
	public static String inviteModelNoAccount(String email,String formUserName,Space sapce,String organizeId){
		StringBuffer sb = new StringBuffer();
		sb.append("<!DOCTYPE html>");
		sb.append("<html lang=\"en\">");
		sb.append("<head>");
		sb.append("<meta charset=\"UTF-8\">");
		sb.append("<title>surfond邮件</title>");
		sb.append("<style type=\"text/css\">");
		sb.append(".logo{ margin: 50px auto 30px;width:250px;text-align: center;}");
		sb.append(".container{ width: 666px;margin: 0px auto;padding:50px 20px;border:solid 1px #00b1f1;font-family: \"\5B8B\4F53\";}");
		sb.append(".container h1{font-size: 24px;font-family: \"\5B8B\4F53\";text-align: center;}");
		sb.append(".container p{text-align: center;font-size: 12px;line-height: 24px;}");
		sb.append(".container a.register{display: block; margin:20px auto;width:340px;height: 40px;line-height: 40px; text-decoration: none;font-size: 16px;color: #fff; background-color: #00b1f1; text-align: center;}");
		sb.append(".container p>span.link{color:#0000ff; text-decoration: underline;}");
		sb.append(".container p.content{margin-top:50px;line-height: 32px; }");
		sb.append("</style>");
		sb.append("</head>");
		sb.append("<body>");
		sb.append("<div class=\"logo\">");
		sb.append("<img src=\"cid:"+Constants.EMAIL_LOGO_HTQ+"\">");
		sb.append("<img src=\"cid:"+Constants.EMAIL_LOGO_SURFOND+"\">");
		sb.append("</div>");
		sb.append("<div class=\"container \">");
		sb.append("<h1>"+formUserName+"  邀请您加入 《"+sapce.getTitle()+"》空间</h1>");
		sb.append("<p>");
		sb.append("欢迎使用Surfond，我们是一个不一样的协作平台。<br>");
		sb.append("在互联网+时代，为您提供最精致的工具，帮您打造最精实的执行力。");
		sb.append("</p>");
		if(StringUtils.isNotBlank(organizeId)){
			sb.append("<a href=\""+PATH+"/m/system/user/innerRegist?email="+email+"&spaceId="+sapce.getId()+"&organizeId="+organizeId+"\" class=\"register\">点击注册,赶快参与《"+sapce.getTitle()+"》空间吧</a>");
		}else{
			sb.append("<a href=\""+PATH+"/m/system/user/innerRegist?email="+email+"\" class=\"register\">点击注册,赶快加入《"+sapce.getTitle()+"》空间吧</a>");
		}
		sb.append("<p class=\"content\">");
		sb.append("如果点击无效，请复制并粘贴这个网址到浏览器地址栏<br>");
		if(StringUtils.isNotBlank(organizeId)){
			sb.append("<span class='link'>"+PATH+"/m/system/user/innerRegist?email="+email+"&spaceId="+sapce.getId()+"&organizeId="+organizeId+"</span>");
		}else{
			sb.append("<span class='link'>"+PATH+"/m/system/user/innerRegist?email="+email+"&spaceId="+sapce.getId()+"</span>");
		}
		sb.append("<br>这是系统自动发送的邮件，请不要直接回复哦。");
		sb.append("<br>需要联系我们，请致电4008-000-000，或发邮到surfond@clearcom.com.cn");
		sb.append("<br>想更多地了解我们，您可以访问<a href=\""+Constants.EMAIL_LINK_SURFOND+"\">www.surfond.com</a>");
		sb.append("<br>或微信关注：广州柏涛");
		sb.append("<br>");
		sb.append("<img src=\"cid:"+Constants.EMAIL_QR_CODE+"\"/>");
		sb.append("</p>");
		sb.append("</div>");
		sb.append("</body>");
		sb.append("</html>");
		return sb.toString();
	}
	
	
	/**
	 * 邀请邮件模板---------已有账号模板
	 * @param email
	 * @param formUserName
	 * @param addressName
	 * @return
	 */
	public static String inviteModelHasAccount(String email,String formUserName,Space sapce,ProjectTask projectTask){
		StringBuffer sb = new StringBuffer();
		sb.append("<!DOCTYPE html>");
		sb.append("<html lang=\"en\">");
		sb.append("<head>");
		sb.append("<meta charset=\"UTF-8\">");
		sb.append("<title>surfond邮件</title>");
		sb.append("<style type=\"text/css\">");
		sb.append(".logo{ margin: 50px auto 30px;width:250px;text-align: center;}");
		sb.append(".container{ width: 666px;margin: 0px auto;padding:50px 20px;border:solid 1px #00b1f1;font-family: \"\5B8B\4F53\";}");
		sb.append(".container h1{font-size: 24px;font-family: \"\5B8B\4F53\";text-align: center;}");
		sb.append(".container p{text-align: center;font-size: 12px;line-height: 24px;}");
		sb.append(".container a.register{display: block; margin:20px auto;width:340px;height: 40px;line-height: 40px; text-decoration: none;font-size: 16px;color: #fff; background-color: #00b1f1; text-align: center;}");
		sb.append(".container p>span.link{color:#0000ff; text-decoration: underline;}");
		sb.append(".container p.content{margin-top:50px;line-height: 32px; }");
		sb.append("</style>");
		sb.append("</head>");
		sb.append("<body>");
		sb.append("<div class=\"logo\">");
		sb.append("<img src=\"cid:"+Constants.EMAIL_LOGO_HTQ+"\">");
		sb.append("<img src=\"cid:"+Constants.EMAIL_LOGO_SURFOND+"\">");
		sb.append("</div>");
		sb.append("<div class=\"container \">");
		if(null!=projectTask){
			sb.append("<h1>"+formUserName+" 邀请您加入 《"+sapce.getTitle()+"》空间下的项目:"+projectTask.getTitle()+"</h1>");
		}else{
			sb.append("<h1>"+formUserName+" 邀请您加入 《"+sapce.getTitle()+"》空间</h1>");
		}
		sb.append("<p>");
		sb.append("欢迎使用Surfond，我们是一个不一样的协作平台。<br>");
		sb.append("在互联网+时代，为您提供最精致的工具，帮您打造最精实的执行力。");
		sb.append("</p>");
		if(null!=projectTask){
			sb.append("<a href=\""+PATH+"/a/login\" class=\"register\">登录参与《"+projectTask.getTitle()+"》项目</a>");
		}else{
			sb.append("<a href=\""+PATH+"/a/login\" class=\"register\">登录加入《"+sapce.getTitle()+"》空间</a>");
		}
		sb.append("<p class=\"content\">");
		sb.append("如果点击无效，请复制并粘贴这个网址到浏览器地址栏<br>");
		sb.append("<span class='link'>"+PATH+"/a/login</span>");
		sb.append("<br>这是系统自动发送的邮件，请不要直接回复哦。");
		sb.append("<br>需要联系我们，请致电4008-000-000，或发邮到surfond@clearcom.com.cn");
		sb.append("<br>想更多地了解我们，您可以访问<a href=\""+Constants.EMAIL_LINK_SURFOND+"\">www.surfond.com</a>");
		sb.append("<br>或微信关注：广州柏涛");
		sb.append("<br>");
		sb.append("<img src=\"cid:"+Constants.EMAIL_QR_CODE+"\"/>");
		sb.append("</p>");
		sb.append("</div>");
		sb.append("</body>");
		sb.append("</html>");
		return sb.toString();
	}
	
	
	/**
	 * 忘记密码邮件模板
	 * @param id
	 * @return
	 */
	public static String setPasswordModel(String id,String code){
		StringBuffer sb = new StringBuffer();
		sb.append("<!DOCTYPE html>");
		sb.append("<html lang=\"en\">");
		sb.append("<head>");
		sb.append("<meta charset=\"UTF-8\">");
		sb.append("<title>surfond邮件</title>");
		sb.append("<style type=\"text/css\">");
		sb.append(".logo{ margin: 50px auto 30px;width:250px;text-align: center;}");
		sb.append(".container{ width: 666px;margin: 0px auto;padding:50px 20px;border:solid 1px #00b1f1;font-family: \"\5B8B\4F53\";}");
		sb.append(".container h1{font-size: 24px;font-family: \"\5B8B\4F53\";text-align: center;}");
		sb.append(".container p{text-align: center;font-size: 12px;line-height: 24px;}");
		sb.append(".container a.register{display: block; margin:20px auto;width:340px;height: 40px;line-height: 40px; text-decoration: none;font-size: 16px;color: #fff; background-color: #00b1f1; text-align: center;}");
		sb.append(".container p>span.link{color:#0000ff; text-decoration: underline;}");
		sb.append(".container p.content{margin-top:50px;line-height: 32px; }");
		sb.append("</style>");
		sb.append("</head>");
		sb.append("<body>");
		sb.append("<div class=\"logo\">");
		sb.append("<img src=\"cid:"+Constants.EMAIL_LOGO_HTQ+"\">");
		sb.append("<img src=\"cid:"+Constants.EMAIL_LOGO_SURFOND+"\">");
		sb.append("</div>");
		sb.append("<div class=\"container \">");
		sb.append("<h1>忘记密码了么？没关系</h1>");
		sb.append("<p>");
		sb.append("</p>");
		sb.append("<a href=\""+PATH+"/m/system/user/innerUpdatePassword?userCode="+id+"&code="+code+"\" class=\"register\">点我设置新密码</a>");
		sb.append("<p class=\"content\">");
		sb.append("如果点击无效，请复制并粘贴这个网址到浏览器地址栏<br>");
		sb.append("<span class='link'>"+PATH+"/m/system/user/innerUpdatePassword?userCode="+id+"&code="+code+"</span>");
		sb.append("<br>这是系统自动发送的邮件，请不要直接回复哦。");
		sb.append("<br>需要联系我们，请致电4008-000-000，或发邮到surfond@clearcom.com.cn");
		sb.append("<br>想更多地了解我们，您可以访问<a href=\""+Constants.EMAIL_LINK_SURFOND+"\">www.surfond.com</a>");
		sb.append("<br>或微信关注：广州柏涛");
		sb.append("<br>");
		sb.append("<img src=\"cid:"+Constants.EMAIL_QR_CODE+"\"/>");
		sb.append("</p>");
		sb.append("</div>");
		sb.append("</body>");
		sb.append("</html>");
		return sb.toString();
	}
	
	
	
	
	/**
	 * 任务提醒邮件模板
	 * @param message
	 * @return
	 */
	public static String taskPromptModel(String message){
		StringBuffer sb = new StringBuffer();
		sb.append("<!DOCTYPE html>");
		sb.append("<html lang=\"en\">");
		sb.append("<head>");
		sb.append("<meta charset=\"UTF-8\">");
		sb.append("<title>surfond邮件</title>");
		sb.append("<style type=\"text/css\">");
		sb.append(".logo{ margin: 50px auto 30px;width:250px;text-align: center;}");
		sb.append(".container{ width: 666px;margin: 0px auto;padding:50px 20px;border:solid 1px #00b1f1;font-family: \"\5B8B\4F53\";}");
		sb.append(".container h1{font-size: 24px;font-family: \"\5B8B\4F53\";text-align: center;}");
		sb.append(".container p{text-align: center;font-size: 12px;line-height: 24px;}");
		sb.append(".container a.register{display: block; margin:20px auto;width:340px;height: 40px;line-height: 40px; text-decoration: none;font-size: 16px;color: #fff; background-color: #00b1f1; text-align: center;}");
		sb.append(".container p>span.link{color:#0000ff; text-decoration: underline;}");
		sb.append(".container p.content{margin-top:50px;line-height: 32px; }");
		sb.append("</style>");
		sb.append("</head>");
		sb.append("<body>");
		sb.append("<div class=\"logo\">");
		sb.append("<img src=\"cid:"+Constants.EMAIL_LOGO_HTQ+"\">");
		sb.append("<img src=\"cid:"+Constants.EMAIL_LOGO_SURFOND+"\">");
		sb.append("</div>");
		sb.append("<div class=\"container \">");
		sb.append("<h1>Surfond小秘书温馨提醒</h1>");
		sb.append("<p>");
		//内容---------------------------------------
		sb.append("</p>");
		sb.append("<p class=\"content\">");
		sb.append("<br>这是系统自动发送的邮件，请不要直接回复哦。");
		sb.append("<br>需要联系我们，请致电4008-000-000，或发邮到surfond@clearcom.com.cn");
		sb.append("<br>想更多地了解我们，您可以访问<a href=\""+Constants.EMAIL_LINK_SURFOND+"\">www.surfond.com</a>");
		sb.append("<br>或微信关注：广州柏涛");
		sb.append("<br>");
		sb.append("<img src=\"cid:"+Constants.EMAIL_QR_CODE+"\"/>");
		sb.append("</p>");
		sb.append("</div>");
		sb.append("</body>");
		sb.append("</html>");
		return sb.toString();
	}
	
	/**
	 * 意见反馈
	 * @param message
	 * @return
	 */
	public static String feedbackModel(String name,String loginName,String date,String content,String iphone,String email){
		StringBuffer sb = new StringBuffer();
		sb.append("<!DOCTYPE html>");
		sb.append("<html lang=\"en\">");
		sb.append("<head>");
		sb.append("<meta charset=\"UTF-8\">");
		sb.append("<title>意见反馈</title>");
		sb.append("<style type=\"text/css\">");
		sb.append("body{margin:0;padding:0;}");
		sb.append(".index{width:700px;height:600px;margin: 60px auto;border: 1px solid;height: auto !important}");
		sb.append("#header{color: #27A5DE;text-align: right;padding-right: 35px;}");
		sb.append(".body>h1{color: #E1A54D;}");
		sb.append(".body{margin: auto;width: 600px;height: 400px;color: #595959;height: auto !important}");
		sb.append(".body>div{margin: 5px 0px 0px 5px;}");
		sb.append(".body p{display: inline-flex;}");
		sb.append(".footer{text-align: center;color:#B1B1B1;padding-top: 30px;}");
		sb.append(".content{line-height: 24px;}");
		sb.append("</style>");
		sb.append("</head>");
		sb.append("<body>");
		sb.append("<div class=\"index\">");
		sb.append("<div class=\"row\">");
		sb.append("<h1 id=\"header\" class=\"col-sm-3 col-sm-offset-9\">Surfond</h1>");
		sb.append("</div>");
		sb.append("<div class=\"body\">");
		sb.append("<h1>客户意见反馈</h1>");
		sb.append("<div >客户昵称："+name+"</div>");
		sb.append("<div>客户账号："+loginName+"</div>");
		sb.append("<div>发送时间："+date+"</div>");
		sb.append("<div>联系方式："+iphone+"</div>");
		sb.append("<div ><span>反馈内容：</span><span class=\"content\">"+content+"</span></div>");
		sb.append("</div>");
		sb.append("<div class=\"footer\">");
		sb.append("<p>广州市柏涛信息技术有限责任公司</p>");
		sb.append("<p>www.surfond.com</p>");
		sb.append("</div>");
		sb.append("<br><br><br><br><br><br><br><br><br><br><br><br>");
		sb.append("</div>");
		sb.append("</body>");
		sb.append("</html>");
		return sb.toString();
	}

	
	/**
	 * 产品官网留言
	 * @param message
	 * @return
	 */
	public static String feedbackModel(String name,String phone,String company,String content,String email){
		StringBuffer sb = new StringBuffer();
		sb.append("<!DOCTYPE html>");
		sb.append("<html lang=\"en\">");
		sb.append("<head>");
		sb.append("<meta charset=\"UTF-8\">");
		sb.append("<title>产品留言</title>");
		sb.append("<style type=\"text/css\">");
		sb.append("body{margin:0;padding:0;}");
		sb.append(".index{width:700px;height:600px;margin: 60px auto;border: 1px solid;height: auto !important}");
		sb.append("#header{color: #27A5DE;text-align: right;padding-right: 35px;}");
		sb.append(".body>h1{color: #E1A54D;}");
		sb.append(".body{margin: auto;width: 600px;height: 400px;color: #595959;height: auto !important}");
		sb.append(".body>div{margin: 5px 0px 0px 5px;}");
		sb.append(".body p{display: inline-flex;}");
		sb.append(".footer{text-align: center;color:#B1B1B1;padding-top: 30px;}");
		sb.append(".content{line-height: 24px;}");
		sb.append("</style>");
		sb.append("</head>");
		sb.append("<body>");
		sb.append("<div class=\"index\">");
		sb.append("<div class=\"row\">");
		sb.append("<h1 id=\"header\" class=\"col-sm-3 col-sm-offset-9\">Surfond</h1>");
		sb.append("</div>");
		sb.append("<div class=\"body\">");
		sb.append("<h1>客户产品留言</h1>");
		sb.append("<div >客户昵称："+name+"</div>");
		sb.append("<div>客户电话："+phone+"</div>");
		sb.append("<div>客户公司："+company+"</div>");
		sb.append("<div>客户邮箱："+email+"</div>");
		sb.append("<div ><span>留言内容：</span><span class=\"content\">"+content+"</span></div>");
		sb.append("</div>");
		sb.append("<div class=\"footer\">");
		sb.append("<p>广州市柏涛信息技术有限责任公司</p>");
		sb.append("<p>www.surfond.com</p>");
		sb.append("</div>");
		sb.append("<br><br><br><br><br><br><br><br><br><br><br><br>");
		sb.append("</div>");
		sb.append("</body>");
		sb.append("</html>");
		return sb.toString();
	}
	
}
