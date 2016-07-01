package com.bt.surfond.front.core.common;

import com.bt.surfond.front.core.util.EmailUtils;
import com.thinkgem.jeesite.common.config.Global;

/**
 * 邮件内容模板
 * @author dyl
 *
 */
public class EmailModel {
	
	/**应用上下文*/
	private static String CONTEXT_PATH = Global.getConfig("surfondPath");
	
	/**
	 * 注册激活邮件模板
	 * @return
	 */
	public static String registActiveModel(){
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
		sb.append("<img src=\"cid:"+EmailUtils.CID_HTQ+"\">");
		sb.append("<img src=\"cid:"+EmailUtils.CID_SUR+"\">");
		sb.append("</div>");
		sb.append("<div class=\"container \">");
		sb.append("<h1>欢迎注册Surfond</h1>");
		sb.append("<p>");
		sb.append("欢迎使用Surfond，我们是一个不一样的协作平台。<br>");
		sb.append("在互联网+时代，为您提供最精致的工具，帮您打造最精实的执行力。");
		sb.append("</p>");
		sb.append("<a href=\""+"#"+"\" class=\"register\">点我完成注册</a>");
		sb.append("<p class=\"content\">");
		sb.append("如果点击无效，请复制并粘贴这个网址到浏览器地址栏<br>");
		sb.append("<span class='link'>"+"这里要填链接地址"+"</span>");
		sb.append("<br>这是系统自动发送的邮件，请不要直接回复哦。");
		sb.append("<br>需要联系我们，请致电4008-000-000，或发邮件到surfond@clearcom.com.cn");
		sb.append("<br>想更多地了解我们，您可以访问<a href=\""+"http://www.surfond.com"+"\">www.surfond.com</a>");
		sb.append("<br>或微信关注：广州柏涛");
		sb.append("<br>");
		sb.append("<img src=\"cid:"+EmailUtils.CID_QR+"\"/>");
		sb.append("</p>");
		sb.append("</div>");
		sb.append("</body>");
		sb.append("</html>");
		return sb.toString();
	}

}
