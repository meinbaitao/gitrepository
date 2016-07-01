package com.bt.surfond.group.service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.common.Constants;
import com.bt.surfond.group.dao.GroupDao;
import com.bt.surfond.group.entity.Group;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.sys.dao.UserDao;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.service.SystemService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 团队表Service
 * @author mjs
 * @version 2015-10-15
 */
@Service
@Transactional
public class GroupService extends CrudService<GroupDao, Group> {
	
	@Autowired
	private GroupDao groupDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private SystemService systemService;
	
	/**
	 * 添加分组
	 * @param group
	 * @return
	 */
	@Transactional(readOnly = false)
	public Group addGroup(Group group){
		if(StringUtils.isBlank(group.getType())){
			group.setType(Constants.GROUP_TYPE_GROUPED);
		}
		group.preInsert();
		if(groupDao.insert(group)>0){
			return group;
		}
		return null;
	}
	
	/**
	 * 删除分组
	 * @param group
	 * @return
	 */
	@Transactional(readOnly = false)
	public String deleteMyGroup(Group group){
		delete(group);
		groupDao.updateGroupMemberToMyGroup(group);
		return Constants.OPTION_SUCCESS;
	}
	
	
	
	
	/**
	 * 根据空间ID查询所有分组
	 */
	public List<Group> findGroupList(Group group){
		return groupDao.findGroupList(group);
	}
	
	
	/**
	 * 查询每个组的成员列表
	 */
	public List<Map<String, Object>> findMemberListByGroupId(Group group){
		return groupDao.findMemberListByGroupId(group);
	}
	
	/**
	 * 查询空间下成员
	 * @param spaceId
	 * @param userId
	 * @return
	 */
	public Map<String, Object> findMemberBySpaceId(String spaceId, String userId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("spaceId",spaceId);
		map.put("userId",userId);
		return groupDao.findMemberBySpaceId(map);
	}
	
	/**
	 * 查询空间下成员是否存在
	 * @param spaceId
	 * @param userId
	 * @return
	 */
	public int findMemberIsExistBySpaceId(String spaceId, String userId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("spaceId",spaceId);
		map.put("userId",userId);
		return groupDao.findMemberIsExistBySpaceId(map);
	}

	/**
	 * 查找空间下分组中的最大排序值
	 * @param group
	 * @return
	 */
	public int findMaxGroupSortBySpaceId(Group group){
		
		return groupDao.findMaxGroupSortBySpaceId(group);
	}
	
	/**
	 * 根据空间ID查询所有的空间成员
	 * @param group
	 * @return
	 */
	public List<Map<String, Object>> findMemberListBySpaceId(Group group){
		return groupDao.findMemberListBySpaceId(group); 
	}
	
	/**
	 * 查询空间中的未分组
	 * @param group
	 * @return
	 */
	public Group findNoGroupedBySpaceId(Group group){
		return groupDao.findNoGroupedBySpaceId(group);
	}
	
	/**
	 * 删除空间成员
	 * @param spaceId
	 * @param userId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteGroupMember(String spaceId, String userId){
		Map<String, Object> spaceMember = this.findMemberBySpaceId(spaceId, userId);
		if(null != spaceMember && StringUtils.isNotBlank(spaceMember.get("gmId").toString())){
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("gmId", spaceMember.get("gmId"));
			return groupDao.deleteGroupMember(paramMap);
		}
		return 0;
	}
	
	/**
	 * 更改空间成员状态
	 * @param spaceId
	 * @param userId
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateMemberType(String spaceId, String userId){
		Map<String, Object> spaceMember = this.findMemberBySpaceId(spaceId, userId);
		if(null != spaceMember && StringUtils.isNotBlank(spaceMember.get("gmId").toString())){
			Map<String, Object> paramMap = new HashMap<String, Object>();
			String memberType = Constants.MEMBER_TYPE_MEMBER;
			if(spaceMember.get("memberType").toString().equals(Constants.MEMBER_TYPE_MEMBER)){
				memberType = Constants.MEMBER_TYPE_VISITOR;
			}
			paramMap.put("gmId", spaceMember.get("gmId"));
			paramMap.put("memberType", memberType);
			return groupDao.updateMemberType(paramMap);
		}
		return 0;
	}
	
	
	//========================================================================================
	/**
	 * 根据用户查找用户的好友分组和分组里的好友
	 * @param group
	 * @return
	 */
	/*public List<Map<String, Object>> findMyGroupAndGroupMember(Group group){
		group.setCreateBy(UserUtils.getUser());
		return groupDao.findMyGroupAndGroupMember(group);
	}*/
	
	
	/**
	 * 添加分组成员(邀请添加好友)
	 */
	@Transactional(readOnly = false)
	public int addGroupMember(String userId,String groupId, String memberType){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id",IdGen.uuid());
		map.put("userId",userId);
		map.put("groupId",groupId);
		map.put("memberType", memberType);
		return groupDao.addGroupMember(map);
	}
	
	/**
	 * 根据用户查找用户的好友分组和分组里的好友
	 * @param group
	 * @return
	 */
	public List<Group> findMyGroup(Group group){
		group.setCreateBy(UserUtils.getUser());
		List<Group> list = groupDao.findMyGroup(group);
		for (Group g : list) {
			List<User> users = findGroupMemberByGroupId(g.getId());
			if(null==users){
				users = new ArrayList<User>();
			}
			g.setUsers(users);
		}
		return list;
	}
	
	/**
	 * 根据用户查找用户的好友分组和分组里的好友
	 * @param group
	 * @return
	 */
	public Group findGroupAndMembers(Group group){
		Group gr = get(group);
		if(null!=gr){
			List<User> users = findGroupMemberByGroupId(gr.getId());
			gr.setUsers(users);
			return gr;
		}
		return null;
	}
	
	
	/**
	 * 查找分组下的成员信息
	 * @param id
	 * @return
	 */
	public List<User> findGroupMemberByGroupId(String id){
		Map<String,String> map = new HashMap<String,String>();
		map.put("groupId", id);
		map.put("delFlag", User.DEL_FLAG_NORMAL);
		/*map.put("loginFlag", "1");*/
		return userDao.findGroupMembers(map);
	}
	
	/**
	 * 根据用户名模糊查找好友
	 * @param group
	 * @return
	 */
	public List<Map<String, Object>> findGroupMemberByLikeName(String name){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", UserUtils.getUser().getId());
		map.put("name", name);
		map.put("type", Constants.GROUP_TYPE_ATTENTION);
		map.put("delFlag", Group.DEL_FLAG_NORMAL);
		return groupDao.findGroupMemberByLikeName(map);
	};
	
	/**
	 * 修改分组名称
	 * @param group
	 * @return
	 */
	@Transactional(readOnly = false)
	public String updateGroupName(Group group){
		if(groupDao.updateGroupName(group)>0){
			return "success";
		}
		return null; 
	};
	
	/**
	 * 删除分组成员
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteGroupMemberById(String groupId,String userId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("groupId", groupId);
		map.put("userId", userId);
		return groupDao.deleteGroupMemberById(map);
	};
	
	/**
	 * 移动好友
	 * @param group
	 * @return
	 */
	@Transactional(readOnly = false)
	public String moveGroupMember(Group group) {
		/*if(UserUtils.getUser().getId().equals(group.getUserId())){
			return null;
		}else{*/
			if(StringUtils.isNotBlank(group.getId()) && StringUtils.isNotBlank(group.getNewGroupId())){
				if(group.getId().equals(group.getNewGroupId())){return null;}
				User user = UserUtils.get(group.getUserId());
				Group gr = get(group.getId());
				Group gr2 = get(group.getNewGroupId());
				if(null!=gr && !(Constants.GROUP_TYPE_ATTENTION.equals(gr.getType())) && !(Constants.GROUP_TYPE_ATTENTION.equals(gr2.getType()))){
					if(StringUtils.isNotBlank(group.getUserId())){
						//删除原来分组的记录
						deleteGroupMemberById(group.getId(), group.getUserId());
						//新增记录到新的分组
						addMemberToGroup(group.getNewGroupId(), group.getUserId());
					}
				}else if(null!=gr && Constants.GROUP_TYPE_ATTENTION.equals(gr.getType())){
					//从关注中添加好友
					//好友是否在我得到好友中
					Map<String, Object> Myfriend = findGroupMemberIfExsit(user.getId(),UserUtils.getUser().getId());
					if(null==Myfriend){
							//新增记录到新的分组
							addMemberToGroup(group.getNewGroupId(), group.getUserId());
					}else{
						String type = Myfriend.get("type").toString();
						if(Constants.GROUP_TYPE_ATTENTION.equals(type)){
							//新增记录到新的分组
							addMemberToGroup(group.getNewGroupId(), group.getUserId());
						}
					}
					//删除关注分组的记录
					deleteGroupMemberById(group.getId(), group.getUserId());
					
					//查找我是否在好友的好友里
					Map<String, Object> Itfriend = findGroupMemberIfExsit(UserUtils.getUser().getId(),group.getUserId());
					if(null==Itfriend){
						Group g = new Group();
						g.setCreateBy(user);
						g.setType(Constants.GROUP_TYPE_ATTENTION);
						Group attentionGroup = groupDao.findGroupByUserAndType(g);
						//关注
						Map<String, Object> attMap = new HashMap<String, Object>();
						attMap.put("id",IdGen.uuid());
						attMap.put("groupId", attentionGroup.getId());
						attMap.put("userId", UserUtils.getUser().getId());
						attMap.put("type", Constants.MEMBER_TYPE_MEMBER);
						groupDao.addMemberToGroup(attMap);
					}
				}else{
					return null;
				}
			}else{
				return null;
			}
		//}
		return Constants.OPTION_SUCCESS;
	}
	
	
	/**
	 * 添加分组成员(邀请)
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> InviteMemberToGroup(String groupId,String email){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String result = "";
		String message = "";
		String status = "";
		User user = systemService.getUserByEmail(email);
		if(null!=user && "1".equals(user.getLoginFlag())){
			String thisUserId = UserUtils.getUser().getId();
			//账号存在
			if(thisUserId.equals(user.getId())){
				//检测到是自己的邮箱
				result = Constants.OPTION_SUCCESS_YOURSELF;
				message = "不能添加自己为好友！";
				status = Constants.APP_STATUS_FAIL;
			}else{
				//好友是否在我得到好友中
				Map<String, Object> Myfriend = findGroupMemberIfExsit(user.getId(),thisUserId);
				if(null==Myfriend){
					//不是我的好友则添加未好友
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("id",IdGen.uuid());
					map.put("groupId", groupId);
					map.put("userId", user.getId());
					map.put("type", Constants.MEMBER_TYPE_MEMBER);
					groupDao.addMemberToGroup(map);
					//我是否在好友的好友中
					Map<String, Object> Itfriend = findGroupMemberIfExsit(thisUserId,user.getId());
					if(null==Itfriend){
						Group g = new Group();
						g.setCreateBy(user);
						g.setType(Constants.GROUP_TYPE_ATTENTION);
						Group attentionGroup = groupDao.findGroupByUserAndType(g);
						//被反向关注
						Map<String, Object> attMap = new HashMap<String, Object>();
						attMap.put("id",IdGen.uuid());
						attMap.put("groupId", attentionGroup.getId());
						attMap.put("userId", thisUserId);
						attMap.put("type", Constants.MEMBER_TYPE_MEMBER);
						groupDao.addMemberToGroup(attMap);
					}
					message = "添加成功！";
					result = Constants.OPTION_SUCCESS;
					status = Constants.APP_STATUS_SUCCESS;
				}else{
					String type = Myfriend.get("type").toString();
					String mapId = Myfriend.get("mapId").toString();
					if(Constants.GROUP_TYPE_ATTENTION.equals(type)){
						//在关注中改为好友
						if(StringUtils.isNotBlank(mapId)){
							updateGroupMemberToNewGroup(mapId, groupId);
							//我是否在好友的好友中
							Map<String, Object> Itfriend = findGroupMemberIfExsit(thisUserId,user.getId());
							if(null==Itfriend){
								Group g = new Group();
								g.setCreateBy(user);
								g.setType(Constants.GROUP_TYPE_ATTENTION);
								Group attentionGroup = groupDao.findGroupByUserAndType(g);
								//关注
								Map<String, Object> attMap = new HashMap<String, Object>();
								attMap.put("id",IdGen.uuid());
								attMap.put("groupId", attentionGroup.getId());
								attMap.put("userId", thisUserId);
								attMap.put("type", Constants.MEMBER_TYPE_MEMBER);
								groupDao.addMemberToGroup(attMap);
							}
							message = "添加成功！";
							result = Constants.OPTION_SUCCESS;
							status = Constants.APP_STATUS_SUCCESS;
						}
						
					}else{
						//直接在好友中
						message = "好友已存在！";
						result = Constants.OPTION_SUCCESS_TOW;
						status = Constants.APP_STATUS_SUCCESS;
					}
				}
			}
		}else{
			//邀请注册
			message = "账号不存在或未被激活！";
			result = Constants.OPTION_SUCCESS_NOTEXIST;
			status = Constants.APP_STATUS_FAIL;
		}
		resultMap.put("message", message);
		resultMap.put("result", result);
		resultMap.put("status", status);
		return resultMap;
	};
	
	
	/**
	 * 讲好友重新分组
	 * @param id
	 * @param groupId
	 * @return
	 */
	public int updateGroupMemberToNewGroup(String id,String groupId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id",id);
		map.put("groupId", groupId);
		return groupDao.updateGroupMemberToNewGroup(map);
	}
	
	/**
	 * 添加分组成员
	 * @return
	 */
	@Transactional(readOnly = false)
	public int addMemberToGroup(String groupId,String userId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id",IdGen.uuid());
		map.put("groupId", groupId);
		map.put("userId", userId);
		map.put("type", Constants.MEMBER_TYPE_MEMBER);
		return groupDao.addMemberToGroup(map);
	};
	
	/**
	 * 查找我的好友总数
	 * @param userId
	 * @return
	 */
	public Map<String, Object> findMyfriendsCount(){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", UserUtils.getUser().getId());
		map.put("type", Constants.GROUP_TYPE_ATTENTION);
		map.put("delFlag", Group.DEL_FLAG_NORMAL);
		int mun = groupDao.findMyfriendsCount(map);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("count", mun);
		return m;
	}
	
	/**
	 * 查找好友是否存在(非关注)
	 * @param groupId
	 * @param userId
	 * @return
	 */
	public Map<String, Object> findGroupMemberIfExsit(String friendId,String userId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("friendId", friendId);
		map.put("userId", userId);
		map.put("delFlag", Group.DEL_FLAG_NORMAL);
		return dao.findGroupMemberIfExsit(map);
	}
	
	
	/**
	 * 查找我和好友的项目信息
	 * @param group
	 * @return
	 */
	public  Map<String, Object> findProjectInfoBetween(Group group){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("myId", UserUtils.getUser().getId());
		map.put("friendId", group.getUserId());
		map.put("projectType", Constants.PROJECT);
		map.put("taskType", Constants.TASK);
		map.put("commonCount", Constants.COMMON_COUNT);
		map.put("status", Constants.TASK_STATUS_UNDONE);
		map.put("delFlag", Group.DEL_FLAG_NORMAL);
		return dao.findProjectInfoBetween(map);
	}
	
	/**
	 * 查找我和好友的项目信息
	 * @param group
	 * @return
	 */
	public  Map<String, Object> findMyProjectInfo(Group group){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("myId", UserUtils.getUser().getId());
		map.put("projectType", Constants.PROJECT);
		map.put("taskType", Constants.TASK);
		map.put("status", Constants.TASK_STATUS_UNDONE);
		map.put("delFlag", Group.DEL_FLAG_NORMAL);
		return dao.findMyProjectInfo(map);
	}
	
	/**
	 * 组ID查询下面所有的用户ID，并用分号组装
	 * @param group
	 * @return
	 */
	public String findMemberByGroupId(String id){
		
		return groupDao.findMemberByGroupId(id);
	};
	
	/**
	 * 查找我的好友中的邮箱类型
	 * @param user
	 * @return
	 */
	public List<Map<String, Object>> findEmailByMyFriend(User user){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", user.getId());
		map.put("delFlag", User.DEL_FLAG_NORMAL);
		return groupDao.findEmailByMyFriend(map);
	}
	
}