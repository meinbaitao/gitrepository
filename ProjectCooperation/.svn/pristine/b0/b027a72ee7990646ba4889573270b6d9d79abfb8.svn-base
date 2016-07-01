package com.bt.surfond.common.utils;

import java.io.IOException;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpConnectionManagerParams;
import org.apache.commons.httpclient.params.HttpMethodParams;


/**
 * 调用外部服务
 * @author xjp
 * @date 2015-8-17
 */
public class HttpClientUtils {
	
	/**
	 * 设置连接超时时间
	 */
	public static final int CONNECTION_TIMEOUT = 6000;
	
	/**
	 * 设置读取时间
	 */
	public static final int SO_TIMEOUT = 6000;
	
	
	public HttpClientUtils() {
		
	}
	
	public static String getHttpClient(String url) {
        String result = "";
        // 构造HttpClient的实例
        HttpClient httpClient = new HttpClient();
        
        HttpConnectionManagerParams  managerParams  =httpClient.getHttpConnectionManager().getParams();
        //设置连接时间
        managerParams.setConnectionTimeout(CONNECTION_TIMEOUT);
        //设置读取时间
        managerParams.setSoTimeout(SO_TIMEOUT);
        
        // 创建GET方法的实例
        GetMethod getMethod = new GetMethod(url);

        // 使用系统提供的默认的恢复策略
        getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler());
        try {
            // 执行getMethod
            int statusCode = httpClient.executeMethod(getMethod);
            if (statusCode == HttpStatus.SC_OK) {
            	// 处理内容
            	result = getMethod.getResponseBodyAsString();
            }
        } catch (HttpException e) {
            // 发生致命的异常，可能是协议不对或者返回的内容有问题
            System.out.println("Please check your provided http address!");
            e.printStackTrace();
        } catch (IOException e) {
            // 发生网络异常
            e.printStackTrace();
        } finally {
            // 释放连接
            getMethod.releaseConnection();
        }
        return result;
    }
}
