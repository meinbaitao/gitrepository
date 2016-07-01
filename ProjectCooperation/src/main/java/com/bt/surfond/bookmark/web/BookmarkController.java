/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.bookmark.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.bookmark.entity.Bookmark;
import com.bt.surfond.bookmark.service.BookmarkService;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.poj.utils.JsonUtils;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 收藏信息Controller
 * @author xjp
 * @version 2015-12-02
 */
@Controller
@RequestMapping(value = "${adminPath}/bookmark")
public class BookmarkController extends BaseController {

	@Autowired
	private BookmarkService bookmarkService;
	
	/**
	 * 添加/取消收藏
	 * @param bookmark
	 * @return
	 */
	@RequestMapping(value = "saveordeletebookmark")
	@ResponseBody
	public Map<String, Object> saveOrDeleteBookmark(Bookmark bookmark){
		bookmarkService.saveOrDelBookmark(bookmark);
		return JsonUtils.jsonStringTo(bookmark);
	}
	
	/**
	 * 获取收藏数
	 * @param bookmark
	 * @return
	 */
	@RequestMapping(value = "findBookMarkMember")
	@ResponseBody
	public Map<String, Object> findBookMarkMember(Bookmark bookmark,HttpServletRequest request,HttpServletResponse response){
		return JsonUtils.jsonStringTo(bookmarkService.findBookmarkMember(bookmark));
	}

	
	/**
	 * 查询收藏列表
	 * @param bookmark
	 * @return
	 */
	/*@ResponseBody
	@RequestMapping(value = "querybookmarklist",method = RequestMethod.GET)
	public String findBookMarkList(HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		String spaceId =request.getParameter("spaceId");
		if(StringUtils.isBlank(spaceId)){
			spaceId="";
		}
		List<Map<String, Object>> list = bookmarkService.findBookMarkList(spaceId);
		//根据当前登录人查询所有的收藏
		map.put("status", "1");
        map.put("message", list.size());
        map.put("result", list);
		return renderString(response, map);
	}*/
	
	/**
	 * 查询当前用户收藏列表
	 * @param bookmark
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findBookmarkGroupByUser")
	public Map<String, Object> findBookmarkGroupByUser(Bookmark bookmark,HttpServletRequest request){
		bookmark.setCreateBy(UserUtils.getUser());
		return bookmarkService.findBookmarkGroupByUser(bookmark);
	}
	
	
	/**
	 * 根据用户查找用户收藏的项目
	 * @param bookmark
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findBookmarkProjectByUser")
	public Map<String, Object> findBookmarkProjectByUser(Bookmark bookmark,HttpServletRequest request){
		return bookmarkService.findBookmarkProjectByUser(bookmark);
	}
	
	/**
	 * 根据用户查找用户收藏的标签
	 * @param bookmark
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findBookmarkTasgByUser")
	public Map<String, Object> findBookmarkTasgByUser(Bookmark bookmark,HttpServletRequest request){
		return bookmarkService.findBookmarkTasgByUser(bookmark);
	}
	
	/**
	 * 根据用户查找用户收藏的话题
	 * @param bookmark
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findBookmarkConversationByUser")
	public Map<String, Object> findBookmarkConversationByUser(Bookmark bookmark,HttpServletRequest request){
		return bookmarkService.findBookmarkConversationByUser(bookmark);
	}
	
	/**
	 * 根据用户查找用户收藏的成员
	 * @param bookmark
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findBookmarkMemberByUser")
	public Map<String, Object> findBookmarkMemberByUser(Bookmark bookmark,HttpServletRequest request){
		return bookmarkService.findBookmarkMemberByUser(bookmark);
	}
	
	
}