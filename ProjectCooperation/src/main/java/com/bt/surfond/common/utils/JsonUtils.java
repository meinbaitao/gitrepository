package com.bt.surfond.common.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;

/**
 * JSON封装、转换工具类
 * @author xjp
 * @version 2015-10-24
 */
public class JsonUtils {
	
	/**
	 * 封装返回客户端JSON格式
	 * @param response
	 * @param object
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Map<String, Object> jsonString(List list){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("result", "0");
		map.put("message", "success");
		map.put("count", "0");
		map.put("data","");
		if(null != list && list.size() > 0){
			map.put("count", list.size());
			map.put("data", list);
		}
		return map;
	}
	
	/**
	 * 封装返回客户端JSON格式
	 * @param result
	 * @return
	 */
	public static String jsonString(JSONObject jsonObj){
		jsonObj.put("result", "0");
		jsonObj.put("message", "success");
		return jsonObj.toString();
	}
	
	/**
	 * 封装返回客户端JSON格式
	 * @param t
	 * @return
	 */
	public static <T> Map<String, Object> jsonStringTo(T t){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("result", "0");
		map.put("message", "success");
		map.put("data", t);
		return map;
	}
	
	
	/**
	 * app客户端JSON格式
	 * @param t
	 * @return
	 */
	public static <T> Map<String, Object> jsonString(T t,String message,String status){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", status);
		map.put("message", message);
		map.put("result", t);
		return map;
	}
	
	/**
	 * 将字符串转为Map
	 * @param str
	 * @return
	 */
	public static Map<String, Object> toJsonMap(String key,String value,Map<String, Object> map){
		if(null!=map){
			map.put(key, value);
		}else{
			map = new HashMap<String, Object>();
			map.put(key, value);
		}
		return map;
	}
	
}
