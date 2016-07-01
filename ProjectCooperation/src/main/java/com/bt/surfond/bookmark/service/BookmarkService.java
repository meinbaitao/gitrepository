/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.bookmark.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.bookmark.dao.BookmarkDao;
import com.bt.surfond.bookmark.entity.Bookmark;
import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 收藏信息Service
 * @author xjp
 * @version 2015-12-02
 */
@Service
@Transactional(readOnly = true)
public class BookmarkService extends CrudService<BookmarkDao, Bookmark> {
	
	/**
	 * 查询APP端收藏列表
	 * @param bookmark
	 * @return
	 */
	public List<Map<String, Object>> findMobileBookMarkList(){
		//获取当前登录人
		User user = UserUtils.getUser();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", user.getId());
		map.put("taskType", Constants.TASK);
		map.put("bookMarkProject", Constants.BOOKMARK_TYPE_PROJECT);
		map.put("bookMarkSpace", Constants.BOOKMARK_TYPE_SPACE);
		map.put("bookMarkConverstion", Constants.BOOKMARK_TYPE_CONVERSATION);
		map.put("delFlag", Bookmark.DEL_FLAG_NORMAL);
		map.put("bookmarkMember", Constants.BOOKMARK_TYPE_USER);
		map.put("bookmarkTask", Constants.BOOKMARK_TYPE_TASK);
		List<Map<String, Object>> list = dao.findMobileBookMarkList(map);		
		return list;
	}
	
	
	/**
	 * 查询收藏列表
	 * @param bookmark
	 * @return
	 */
	/*public List<Map<String, Object>> findBookMarkList(String spaceId){
		//获取当前登录人
		User user = UserUtils.getUser();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", user.getId());
		map.put("taskType", Constants.TASK);
		map.put("bookMarkProject", Constants.BOOKMARK_TYPE_PROJECT);
		map.put("bookMarkConverstion", Constants.BOOKMARK_TYPE_CONVERSATION);
		map.put("delFlag", Bookmark.DEL_FLAG_NORMAL);
		map.put("status", Constants.TASK_STATUS_DONE);
		map.put("bookmarkTags", Constants.BOOKMARK_TYPE_TAG);
		map.put("bookmarkMember", Constants.BOOKMARK_TYPE_USER);
		map.put("spaceId", spaceId);
		List<Map<String, Object>> list = dao.findBookMarkList(map);		
		return list;
	}*/
	
	
	/**
	 * 添加/取消收藏
	 * @param bookmark
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveOrDelBookmark(Bookmark bookmark){
		//获取当前用户
		bookmark.setCreateBy(UserUtils.getUser());
		int result = 0;
		if(dao.getWhetherExist(bookmark)>0){
			//取消收藏
			result = dao.deleteBookmark(bookmark);
		}else{
			//添加收藏
			bookmark.preInsert();
			result = dao.insert(bookmark);
		}
		return result;
	}
	
	/**
	 * 查找收藏数量
	 * @param bookmark
	 * @return
	 */
	public int findBookmarkMember(Bookmark bookmark){
		return dao.findBookmarkMember(bookmark);
	}
	
	/**
	 * 根据收藏类型编号查询收藏人
	 * @param bookmark
	 * @return
	 */
	public List<Bookmark> findBookmarkUser(Bookmark bookmark){
		return dao.findBookmarkUser(bookmark);
	}
	
	
	/**
	 * 查询当前用户收藏列表
	 * @param bookmark
	 * @return
	 */
	public Map<String, Object> findBookmarkGroupByUser(Bookmark bookmark){
		bookmark.setCreateBy(UserUtils.getUser());
		return JsonUtils.jsonString(dao.findBookmarkGroupByUser(bookmark), "success", "1");
	}
	
	
	/**
	 * 根据用户查找用户收藏的项目
	 * @param bookmark
	 * @return
	 */
	public Map<String, Object> findBookmarkProjectByUser(Bookmark bookmark){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("type", bookmark.getType());
		map.put("spaceId", bookmark.getSpaceId());
		map.put("createById", UserUtils.getUser().getId());
		map.put("delFlag", Bookmark.DEL_FLAG_NORMAL);
		return JsonUtils.jsonString(dao.findBookmarkProjectByUser(map), "success", "1");
	}
	
	/**
	 * 根据用户查找用户收藏的标签
	 * @param bookmark
	 * @return
	 */
	public Map<String, Object> findBookmarkTasgByUser(Bookmark bookmark){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("type", bookmark.getType());
		map.put("spaceId", bookmark.getSpaceId());
		map.put("createById", UserUtils.getUser().getId());
		map.put("delFlag", Bookmark.DEL_FLAG_NORMAL);
		return JsonUtils.jsonString(dao.findBookmarkTasgByUser(map), "success", "1");
	}
	
	/**
	 * 根据用户查找用户收藏的话题
	 * @param bookmark
	 * @return
	 */
	public Map<String, Object> findBookmarkConversationByUser(Bookmark bookmark){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("type", bookmark.getType());
		map.put("spaceId", bookmark.getSpaceId());
		map.put("createById", UserUtils.getUser().getId());
		map.put("delFlag", Bookmark.DEL_FLAG_NORMAL);
		return JsonUtils.jsonString(dao.findBookmarkConversationByUser(map), "success", "1");
	}
	
	/**
	 * 根据用户查找用户收藏的成员
	 * @param bookmark
	 * @return
	 */
	public Map<String, Object> findBookmarkMemberByUser(Bookmark bookmark){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("type", bookmark.getType());
		map.put("spaceId", bookmark.getSpaceId());
		map.put("createById", UserUtils.getUser().getId());
		map.put("delFlag", Bookmark.DEL_FLAG_NORMAL);
		return JsonUtils.jsonString(dao.findBookmarkMemberByUser(map), "success", "1");
	}
	
}