package com.bt.mobile.rest.version.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.mobile.rest.version.entity.AppVersion;
import com.bt.mobile.rest.version.service.AppVersionService;
import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;


/**
 * 任务协作手机服务类
 * @author 
 * @version 2015-10-08
 */
@Controller
public class AppVersionMobileRsource extends BaseController {
	
	@Autowired
	private AppVersionService appVersionService;

	/**
	 * 检测手机端应用更新
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value ="${mobliePath}/mobile/files/checkupdate")
	@ResponseBody
	public Map<String, Object> checkUpdate(@RequestBody AppVersion version,HttpServletRequest request, HttpServletResponse response) {
		//获取当前URL
		String url = request.getRequestURL().toString();
		//截取上下文后部分
		url=url.substring(0,url.lastIndexOf("/"))+"/download/";
		
		Map<String, Object> obj = new HashMap<String, Object>();
		version.setStatus("2");
		AppVersion v = appVersionService.findVersion(version);
		
		if(v !=null && !StringUtils.equalsIgnoreCase(v.getVersion(),version.getVersion())){
			
			if("ios".equals(v.getType())){
				//IOS下载
				obj.put("url",v.getUrl());
			}else{
				//下载APK地址
				obj.put("url",url+v.getType()+"/"+v.getName());
			}
			obj.put("versionNum", v.getVersion());
			obj.put("updateFlag", "0");
			obj.put("desc", v.getDesc());
			obj.put("size", v.getSize());
			return JsonUtils.jsonString(obj, "更新版本", Constants.APP_STATUS_SUCCESS);
		}
		obj.put("updateFlag", "-1");
		return JsonUtils.jsonString(obj, "最新版本", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 下载附件
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "${mobliePath}/mobile/files/download/{type}/{apkName}")
	public String download(@PathVariable String type,@PathVariable String apkName, HttpServletResponse response,HttpServletRequest request) throws UnsupportedEncodingException {
		String basedir = Global.getConfig("files.basedir");
		
		InputStream inputStream = null;
		OutputStream os =null;
		try {
			inputStream = new FileInputStream(new File(basedir + File.separator
					+ apkName+".apk"));
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
	
}