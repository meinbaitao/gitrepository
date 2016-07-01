package com.bt.surfond.common.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * JSON转化字符串工具类
 * @author dyl
 *
 */
public class JsonFormatUtils {
	
	/**
	 * 格式化json字符串
	 * @param result 服务处理结果，此参数使用本类常量AJAX_SERVICE_SUCCESS和AJAX_SERVICE_FAILURE分别表示处理成功和失败
	 * @param t 要格式化的数据
	 * @return
	 */
	public static <T> Map<String, Object> jsonString(String result, T t){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", result);	//处理的结果
		resultMap.put("message", "success");	//请求到达处理后正常返回
		resultMap.put("data", t);
		return resultMap;
	}
	
	/**ajax服务调用处理结果：成功*/
	public static final String AJAX_SERVICE_SUCCESS = "0";
	/**ajax服务调用处理结果：失败*/
	public static final String AJAX_SERVICE_FAILURE = "-1";

}
