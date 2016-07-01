/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.mobile.rest.bookmark;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.bookmark.entity.Bookmark;
import com.bt.surfond.bookmark.service.BookmarkService;
import com.bt.surfond.common.Constants;
import com.thinkgem.jeesite.common.web.BaseController;


/**
 * 收藏模块APP接口
 * @author xujianpeng
 * @version 2015-12-02
 */
@Controller
@RequestMapping(value = "${adminPath}/mobile/bookmark")
public class BookmarkMobileRsource extends BaseController {

	@Autowired
	private BookmarkService bookmarkService;
	
	/**
	 * 添加/取消收藏
	 * @param bookmark
	 * @return
	 */
	@RequestMapping(value = "saveordelbookmark")
	@ResponseBody
	public Map<String, Object> saveOrDelBookmark(@RequestBody Bookmark bookmark,HttpServletRequest request, HttpServletResponse response){
		int result = bookmarkService.saveOrDelBookmark(bookmark);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", "-1");
		map.put("message", Constants.APP_STATUS_FAIL);
		if(result>0){
			map.put("status", "1");	 
			map.put("message", Constants.APP_STATUS_SUCCESS);
		}
		map.put("result", result);
		return map;
	}
	
	
	/**
	 * 查询收藏列表
	 * @param bookmark
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "querybookmarklist",method = RequestMethod.GET)
	public String findBookMarkList(HttpServletRequest request, HttpServletResponse response){
		//此方法已废弃，2016-03-17
		Map<String, Object> map = new HashMap<String, Object>();
		List<Map<String, Object>> list = bookmarkService.findMobileBookMarkList();
		//根据当前登录人查询所有的收藏
		map.put("status", "1");
        map.put("message", list.size());
        map.put("result", list);
		return renderString(response, map);
	}
	
	
}