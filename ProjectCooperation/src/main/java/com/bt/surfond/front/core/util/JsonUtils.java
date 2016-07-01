package com.bt.surfond.front.core.util;

import java.util.HashMap;
import java.util.Map;

/**
 * json格式化工具类
 * @author dyl
 *
 */
public class JsonUtils {

	/**
	 * 格式化json数据
	 * @param status
	 * @param data
	 * @return
	 */
	public static <T> Map<String, Object> jsonString(String status, T data){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		resultMap.put("status", status);
		resultMap.put("data", data);
		return resultMap;
	}
	
	/**ajax请求处理结果：成功*/
	public static final String AJAX_HANDLE_SUCCESS = "1";
	
	/**ajax请求处理结果：失败*/
	public static final String AJAX_HANDLE_FAILURE = "0";
	
}
