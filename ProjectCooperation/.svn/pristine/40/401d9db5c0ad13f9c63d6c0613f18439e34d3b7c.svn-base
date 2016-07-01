package com.bt.surfond.group.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.group.entity.Group;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;


/**
 * 团队表DAO接口
 * @author mjs
 * @version 2015-10-15
 */
@MyBatisDao
public interface GroupDao extends CrudDao<Group> {
	
	
	/**
	 * 查询所有分组
	 */
	public List<Group> findGroupList(Group group);
	
	
	/**
	 * 查询每个组的成员列表
	 */
	public List<Map<String, Object>> findMemberListByGroupId(Group group);
	
	
	/**
	 * 添加分组成员
	 */
	public int addGroupMember(Map<String, Object> map);
	
	
	/**
	 * 根据空间ID查询所有的空间成员
	 * @param group
	 * @return
	 */
	public List<Map<String, Object>> findMemberListBySpaceId(Group group);
	
	/**
	 * 查询空间下成员
	 * @param map
	 * @return
	 */
	public Map<String, Object> findMemberBySpaceId(Map<String, Object> map);
	
	/**
	 * 查询空间下成员是否存在
	 * @param paramMap
	 * @return
	 */
	public int findMemberIsExistBySpaceId(Map<String, Object> map);
	
	/**
	 * 查找空间下分组中的最大排序值
	 * @param group
	 * @return
	 */
	public int findMaxGroupSortBySpaceId(Group group);
	
	/**
	 * 查询空间中的未分组
	 */
	public Group findNoGroupedBySpaceId(Group group);
	
	/**
	 * 更改空间成员状态
	 * @param map
	 * @return
	 */
	public int updateMemberType(Map<String, Object> paramMap);
	
	/**
	 * 删除空间成员
	 * @param paramMap
	 * @return
	 */
	public int deleteGroupMember(Map<String, Object> paramMap);

	/**
	 * 查詢用戶的所有分組和好友
	 * @param group
	 * @return
	 */
	public List<Map<String, Object>> findMyGroupAndGroupMember(Group group);
	
	/**
	 * 查詢用戶的所有分組
	 * @param group
	 * @return
	 */
	public List<Group> findMyGroup(Group group);
	
	/**
	 * 根据创建人和类型查詢单个分组
	 * @param group
	 * @return
	 */
	public Group findGroupByUserAndType(Group group);
	
	/**
	 * 根据用户名模糊查找好友
	 * @param group
	 * @return
	 */
	public List<Map<String, Object>> findGroupMemberByLikeName(Map<String, Object> map);
	
	/**
	 * 修改分组名称
	 * @param group
	 * @return
	 */
	public int updateGroupName(Group group);
	
	/**
	 * 删除分组成员
	 * @return
	 */
	public int deleteGroupMemberById(Map<String, Object> map);
	
	/**
	 * 添加分组成员
	 * @return
	 */
	public int addMemberToGroup(Map<String, Object> map);
	
	/**
	 * 查找我的好友总数
	 * @param map
	 * @return
	 */
	public int findMyfriendsCount(Map<String, Object> map);
	
	/**
	 * 查找我的好友是否存在
	 * @param map
	 * @return
	 */
	public Map<String, Object> findGroupMemberIfExsit(Map<String, Object> map);
	
	
	/**
	 * 查找我和好友之间共同参与的项目和信息
	 * @param map
	 * @return
	 */
	public Map<String, Object> findProjectInfoBetween(Map<String, Object> map);
	
	/**
	 * 查找我的项目信息
	 * @param map
	 * @return
	 */
	public Map<String, Object> findMyProjectInfo(Map<String, Object> map);
	
	/**
	 * 修改分组成员(删除分组)
	 * @param group
	 * @return
	 */
	public int updateGroupMemberToMyGroup(Group group);
	
	
	/**
	 * 组ID查询下面所有的用户ID，并用分号组装
	 * @param group
	 * @return
	 */
	public String findMemberByGroupId(String groupId);
	
	/**
	 * 将好友重新编组
	 * @param map
	 * @return
	 */
	public int updateGroupMemberToNewGroup(Map<String, Object> map);
	
	/**
	 * 查找我的好友中的邮箱类型
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> findEmailByMyFriend(Map<String, Object> map);
}