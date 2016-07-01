/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.bt.surfond.bookmark.dao;

import java.util.List;
import java.util.Map;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.bt.surfond.bookmark.entity.Bookmark;

/**
 * 收藏信息DAO接口
 * @author xjp
 * @version 2015-12-02
 */
@MyBatisDao
public interface BookmarkDao extends CrudDao<Bookmark> {
	
	/**
	 * 查询是否存在收藏记录
	 * @param bookmark
	 * @return
	 */
	public int getWhetherExist(Bookmark bookmark);
	
	/**
	 * 删除收藏记录
	 * @param bookmark
	 * @return
	 */
	public int deleteBookmark(Bookmark bookmark);
	
	/**
	 * 查询APP端收藏列表
	 * @param bookmark
	 * @return
	 */
	public List<Map<String, Object>> findMobileBookMarkList(Map<String, Object> map);
	
	/**
	 * 查找收藏数量
	 * @return
	 */
	public int findBookmarkMember(Bookmark bookmark);
	
	/**
	 * 根据收藏类型编号查询收藏人
	 * @param bookmark
	 * @return
	 */
	public List<Bookmark> findBookmarkUser(Bookmark bookmark);
	
	/**
	 * 查询当前用户收藏列表
	 * @param bookmark
	 * @return
	 */
	public List<Map<String, Object>> findBookmarkGroupByUser(Bookmark bookmark);
	
	
	/**
	 * 根据用户查找用户收藏的项目
	 * @param bookmark
	 * @return
	 */
	public List<Map<String, Object>> findBookmarkProjectByUser(Map<String, Object> map);
	
	/**
	 * 根据用户查找用户收藏的标签
	 * @param bookmark
	 * @return
	 */
	public List<Map<String, Object>> findBookmarkTasgByUser(Map<String, Object> map);
	
	/**
	 * 根据用户查找用户收藏的话题
	 * @param bookmark
	 * @return
	 */
	public List<Map<String, Object>> findBookmarkConversationByUser(Map<String, Object> map);
	
	/**
	 * 根据用户查找用户收藏的成员
	 * @param bookmark
	 * @return
	 */
	public List<Map<String, Object>> findBookmarkMemberByUser(Map<String, Object> map);
	
	
	
}