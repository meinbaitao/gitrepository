/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.sys.dao;

import java.util.List;
import java.util.Map;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.sys.entity.User;

/**
 * 用户DAO接口
 * @author ThinkGem
 * @version 2014-05-16
 */
@MyBatisDao
public interface UserDao extends CrudDao<User> {
	
	/**
	 * 根据登录名称查询用户
	 * @param loginName
	 * @return
	 */
	public User getByLoginName(User user);
	
	/**
	 * 根据登录名称、邮箱查询用户
	 * @param loginName
	 * @return
	 */
	public User getByLoginNameOrEmail(User user);
	
	
	/**
	 * 根据用户邮箱激活用户账号
	 * @return
	 */
	public int activationUser(User user);
	
	/**
	 * 通过OfficeId获取用户列表，仅返回用户id和name（树查询用户时用）
	 * @param user
	 * @return
	 */
	public List<User> findUserByOfficeId(User user);
	
	/**
	 * 查询全部用户数目
	 * @return
	 */
	public long findAllCount(User user);
	
	/**
	 * 更新用户密码
	 * @param user
	 * @return
	 */
	public int updatePasswordById(User user);
	
	/**
	 * 更新登录信息，如：登录IP、登录时间
	 * @param user
	 * @return
	 */
	public int updateLoginInfo(User user);

	/**
	 * 删除用户角色关联数据
	 * @param user
	 * @return
	 */
	public int deleteUserRole(User user);
	
	/**
	 * 插入用户角色关联数据
	 * @param user
	 * @return
	 */
	public int insertUserRole(User user);
	
	/**
	 * 更新用户信息
	 * @param user
	 * @return
	 */
	public int updateUserInfo(User user);
	
	/**
	 * 根据邮箱名称查询用户
	 * @param loginName
	 * @return
	 */
	public User getByEmail(User user);
	
	/**
	 * 更新用户部分信息
	 * @param user
	 * @return
	 */
	public int updateUserInfoByUserId(User user);
	
	/**
	 * 根据用户编号更新头像下载地址
	 * @param user
	 */
	public int updataPhotoByUserId(User user);
	
	/**
	 * 通过邮箱申请修改密码 
	 * @param user
	 * @return
	 */
	public int emailUpdatePassWord(User user);
	
	/**
	 * 更新用户名称、描述
	 * @param user
	 * @return
	 */
	public int updateUserName(User user);
	
	/**
	 * 根据好友分组ID查找分组下的所有好友
	 * @return
	 */
	public List<User> findGroupMembers(Map<String,String> map);
	
	/**
	 *  根据用户名查找 用户信息   验证用名是否存在 
	 * @param user
	 * @return
	 */
	public User findUserInfoByUserLoginName(User user);
	
	/**
	 *  根据邮箱查找 用户信息   验证邮箱是否存在  
	 * @param user
	 * @return
	 */
	public User findUserInfoByUserEmail(User user);
	
	/* write at the last ： what i do is what i want. */
	
	/**
	 * 根据ID修改用户信息
	 * @param user
	 * @return
	 */
	int updateUserInfomation(User user);
	
	/**
	 * 根据id集合查询用户信息集合
	 * @param userIds
	 * @return
	 */
	List<Map<String, Object>> findUserInfomationList(String[] userIds);
	
	/**
	 * 根据邮箱查询用户信息
	 * @param email
	 * @return
	 */
	Map<String, Object> findUserInfomationByEmail(String email);
	
}
