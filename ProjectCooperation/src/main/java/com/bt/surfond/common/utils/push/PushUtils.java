package com.bt.surfond.common.utils.push;

import com.gexin.rp.sdk.base.IPushResult;
import com.gexin.rp.sdk.base.ITemplate;
import com.gexin.rp.sdk.base.impl.SingleMessage;
import com.gexin.rp.sdk.base.impl.Target;
import com.gexin.rp.sdk.base.payload.APNPayload;
import com.gexin.rp.sdk.exceptions.RequestException;
import com.gexin.rp.sdk.http.IGtPush;
import com.gexin.rp.sdk.template.APNTemplate;
import com.gexin.rp.sdk.template.LinkTemplate;
import com.gexin.rp.sdk.template.TransmissionTemplate;
import com.thinkgem.jeesite.common.config.Global;

/**
 * APP消息推送工具类
 * 
 * @author dyl
 * @version 2016-02-18
 *
 */
public final class PushUtils {

	/*private static final String appID = "ycPe3nntSkAbEvgOpYjdKA";
	private static final String appKey = "rNC87URcIA8p5k3lxOfepA";
	private static final String masterSecret = "ElAshWUp4w6rajg8Cfj8L7";*/
	/*private static final String appID = "pjwA4g49Ex7BkQVqvFWj53";
	private static final String appKey = "YleORavcGQ8MkTvIOYMyI7";
	private static final String masterSecret = "fLGPECidqK9LRPB80Wf068";*/
	private static final String appID = Global.getConfig("appID");
	private static final String appKey = Global.getConfig("appKey");
	private static final String masterSecret = Global.getConfig("masterSecret");
	private static final String host = "http://sdk.open.api.igexin.com/apiex.htm";
	private static final IGtPush push = new IGtPush(host, appKey, masterSecret);

	/**
	 * 对单个Android用户推送消息（通知栏）
	 * 
	 * @param pushMessage
	 * @return
	 */
	public static String pushBarToSingle(PushMessage pushMessage) {
		LinkTemplate template = new LinkTemplate();
		template.setAppId(appID);
		template.setAppkey(appKey);
		template.setTitle(pushMessage.getTitle());
		template.setText(pushMessage.getText());
		template.setLogo(pushMessage.getLogo());
		template.setLogoUrl(pushMessage.getLogoUrl());
		template.setIsRing(pushMessage.isRing());
		template.setIsVibrate(pushMessage.isVibrate());
		template.setIsClearable(pushMessage.isClearable());
		template.setUrl(pushMessage.getUrl());
		return pushToSingle(pushMessage, template);
	}

	/**
	 * 对单个Android用户推送消息（透传）
	 * 
	 * @param pushMessage
	 * @return
	 */
	public static String pushThrToSingle(PushMessage pushMessage) {
		TransmissionTemplate template = new TransmissionTemplate();
		template.setAppId(appID);
		template.setAppkey(appKey);
		template.setTransmissionType(pushMessage.getTransmissionType());
		template.setTransmissionContent(pushMessage.getText());
		return pushToSingle(pushMessage, template);
	}
	
	/**
	 * 对单个Android用户推送消息
	 * 
	 * @param pushMessage
	 * @param template
	 * @return
	 */
	private static String pushToSingle(PushMessage pushMessage,
			ITemplate template) {
		SingleMessage message = new SingleMessage();
		message.setOffline(pushMessage.isOffline());
		message.setOfflineExpireTime(pushMessage.getOfflineExpireTime());
		message.setData(template);
		message.setPushNetWorkType(pushMessage.getPushNetWorkType());

		// 对指定别名的目标推送消息
		Target target = new Target();
		target.setAppId(appID);
		target.setAlias(pushMessage.getAlias());

		IPushResult ret = null;
		try {
			ret = push.pushMessageToSingle(message, target);
		} catch (RequestException e) {
			ret = push.pushMessageToSingle(message, target, e.getRequestId());
		}
		return ret != null ? ret.getResponse().toString() : "{error=服务器响应异常}";
	}
	
	/**
	 * 对单个IOS用户推送消息(通知栏)
	 * @param pushMessage
	 * @return
	 */
	public static String pushToSingle(PushMessage pushMessage){
        APNTemplate t = new APNTemplate();
        APNPayload apnpayload = new APNPayload();
        //apnpayload.setSound("");
        APNPayload.DictionaryAlertMsg alertMsg = new APNPayload.DictionaryAlertMsg();
        //alertMsg.setTitle("aaaaaa");
        alertMsg.setBody(pushMessage.getBody());
        //alertMsg.setTitleLocKey("ccccc");
        //alertMsg.setActionLocKey("ddddd");
        
        apnpayload.setAlertMsg(alertMsg);
        apnpayload.setCategory(pushMessage.getCategory());

        t.setAPNInfo(apnpayload);
        SingleMessage sm = new SingleMessage();
        sm.setData(t);
        IPushResult ret = push.pushAPNMessageToSingle(appID, pushMessage.getDeviceToken(), sm);
        return ret != null ? ret.getResponse().toString() : "{error=服务器响应异常}";
	}
	
}
