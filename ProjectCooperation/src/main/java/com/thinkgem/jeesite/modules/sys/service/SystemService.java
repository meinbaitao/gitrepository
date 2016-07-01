package com.thinkgem.jeesite.modules.sys.service;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.shiro.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.security.Digests;
import com.thinkgem.jeesite.common.security.shiro.session.SessionDAO;
import com.thinkgem.jeesite.common.service.BaseService;
import com.thinkgem.jeesite.common.utils.Encodes;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.Servlets;
import com.thinkgem.jeesite.modules.poj.common.Constants;
import com.thinkgem.jeesite.modules.sys.dao.UserDao;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.security.SystemAuthorizingRealm;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 系统管理，安全相关实体的管理类,包括用户、角色、菜单.
 * @author ThinkGem
 * @version 2013-12-05
 */
@Service
@Transactional
public class SystemService extends BaseService{
	
	public static final String HASH_ALGORITHM = "SHA-1";
	public static final int HASH_INTERATIONS = 1024;
	public static final int SALT_SIZE = 8;
	
	@Autowired
	private UserDao userDao;
	@Autowired
	private SessionDAO sessionDao;
	@Autowired
	private SystemAuthorizingRealm systemRealm;
	
	public SessionDAO getSessionDao() {
		return sessionDao;
	}

	//-- User Service --//
	
	/**
	 * 获取用户
	 * @param id
	 * @return
	 */
	public User getUser(String id) {
		return UserUtils.get(id);
	}
	
	/**
	 * 修改用户信息
	 * @param user
	 * @return
	 */
	public String updateUserPassword(User user){
		try{
			user.setPassword(entryptPassword(user.getPassword()));
			user.setUpdateBy(user);
			user.setUpdateDate(new Date());
			userDao.update(user);
			return user.getLoginName();
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 通过邮箱申请修改密码
	 * @param user
	 * @return
	 */
	public String emailUpdatePassWord(User user){
		int num = userDao.emailUpdatePassWord(user);
		if(num>0){
			UserUtils.clearCache(user);
			return user.getLoginName();
		}
		return "";
	}

	/**
	 * 根据登录名获取用户
	 * @param loginName
	 * @return
	 */
	public User getUserByLoginName(String loginName) {
		return UserUtils.getByLoginName(loginName);
	}
	
	/**
	 * 根据登录名、邮箱获取用户
	 * @param loginName
	 * @return
	 */
	public User getUserByLoginNameOrEmail(String loginName) {
		return UserUtils.getByLoginNameOrEmail(loginName);
	}
	
	/**
	 * 根据邮箱获取用户
	 * @param loginName
	 * @return
	 */
	public User getUserByEmail(String email) {
		User user = new User();
		user.setEmail(email);
		user.setDelFlag(User.DEL_FLAG_NORMAL);
		return userDao.getByEmail(user);
	}
	
	public String activationUser(String email){
		User user = getUserByEmail(email);
		user.setLoginFlag(Constants.USER_CAN_LOGIN);
		user.setUpdateBy(user);
		userDao.activationUser(user);
		UserUtils.clearCache(user);
		return "1";
	}
	
	public Page<User> findUser(Page<User> page, User user) {
		// 生成数据权限过滤条件（dsf为dataScopeFilter的简写，在xml中使用 ${sqlMap.dsf}调用权限SQL）
		user.getSqlMap().put("dsf", dataScopeFilter(user.getCurrentUser(), "o", "a"));
		// 设置分页参数
		user.setPage(page);
		// 执行分页查询
		page.setList(userDao.findList(user));
		return page;
	}
	
	/**
	 * 无分页查询人员列表
	 * @param user
	 * @return
	 */
	public List<User> findUser(User user){
		// 生成数据权限过滤条件（dsf为dataScopeFilter的简写，在xml中使用 ${sqlMap.dsf}调用权限SQL）
		user.getSqlMap().put("dsf", dataScopeFilter(user.getCurrentUser(), "o", "a"));
		List<User> list = userDao.findList(user);
		return list;
	}


	@Transactional(readOnly = false)
	public void saveUser(User user) {
		if (StringUtils.isBlank(user.getId())){
			user.preInsert();
			userDao.insert(user);
		}else{
			// 更新用户数据
			user.preUpdate();
			userDao.update(user);
		}
		UserUtils.clearCache(user);
	}
	
	@Transactional(readOnly = false)
	public void updateUserInfo(User user) {
		user.preUpdate();
		userDao.updateUserInfo(user);
		// 清除用户缓存
		UserUtils.clearCache(user);
//		// 清除权限缓存
//		systemRealm.clearAllCachedAuthorizationInfo();
	}
	
	@Transactional(readOnly = false)
	public void deleteUser(User user) {
		userDao.delete(user);
		// 清除用户缓存
		UserUtils.clearCache(user);
//		// 清除权限缓存
//		systemRealm.clearAllCachedAuthorizationInfo();
	}
	
	@Transactional(readOnly = false)
	public int updatePasswordById(String id, String loginName, String newPassword) {
		User user = new User(id);
		user.setPassword(entryptPassword(newPassword));
		
		// 清除用户缓存
		user.setLoginName(loginName);
		UserUtils.clearCache(user);
//		// 清除权限缓存
//		systemRealm.clearAllCachedAuthorizationInfo();
		return userDao.updatePasswordById(user);
	}
	
	@Transactional(readOnly = false)
	public void updateUserLoginInfo(User user) {
		// 保存上次登录信息
		user.setOldLoginIp(user.getLoginIp());
		user.setOldLoginDate(user.getLoginDate());
		// 更新本次登录信息
		user.setLoginIp(StringUtils.getRemoteAddr(Servlets.getRequest()));
		user.setLoginDate(new Date());
		userDao.updateLoginInfo(user);
	}
	
	/**
	 * 生成安全的密码，生成随机的16位salt并经过1024次 sha-1 hash
	 */
	public static String entryptPassword(String plainPassword) {
		byte[] salt = Digests.generateSalt(SALT_SIZE);
		byte[] hashPassword = Digests.sha1(plainPassword.getBytes(), salt, HASH_INTERATIONS);
		return Encodes.encodeHex(salt)+Encodes.encodeHex(hashPassword);
	}
	
	/**
	 * 验证密码
	 * @param plainPassword 明文密码
	 * @param password 密文密码
	 * @return 验证成功返回true
	 */
	public static boolean validatePassword(String plainPassword, String password) {
		byte[] salt = Encodes.decodeHex(password.substring(0,16));
		byte[] hashPassword = Digests.sha1(plainPassword.getBytes(), salt, HASH_INTERATIONS);
		return password.equals(Encodes.encodeHex(salt)+Encodes.encodeHex(hashPassword));
	}
	
	/**
	 * 获得活动会话
	 * @return
	 */
	public Collection<Session> getActiveSessions(){
		return sessionDao.getActiveSessions(false);
	}

	/**
	 * 获取Key加载信息
	 */
	public static boolean printKeyLoadMessage(){
		StringBuilder sb = new StringBuilder();
		sb.append("\r\n======================================================================\r\n");
		sb.append("\r\n    欢迎使用 "+Global.getConfig("productName")+"  - Powered By http://clearcom.com.cn\r\n");
		sb.append("\r\n======================================================================\r\n");
		System.out.println(sb.toString());
		return true;
	}
	

	/**
	 * 用户注册
	 * @param user
	 * @return
	 */
	@Transactional(readOnly = false)
	public int register(User user){
		return userDao.insert(user);
	}
	
	/**
	 * 更新用户部分信息
	 * @param user
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateUserInfoByUserId(User user){
		return userDao.updateUserInfoByUserId(user);
	}

	
	/**
	 * 更新用户名称、描述
	 * @param user
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateUserName(User user){
		UserUtils.clearCache(user);
		return userDao.updateUserName(user);
	}
	
	/**
	 *  根据用户名查找 用户信息   验证用名是否存在 
	 * @param user
	 * @return
	 */
	public User findUserInfoByUserLoginName(User user){
		return userDao.findUserInfoByUserLoginName(user);
	};
	
	/**
	 *  根据邮箱查找 用户信息   验证邮箱是否存在  
	 * @param user
	 * @return
	 */
	public User findUserInfoByUserEmail(User user){
		return userDao.findUserInfoByUserEmail(user);
	};
	
	/**
	 * 修改用户信息
	 * @param user
	 */
	public void update(User user){
		update(user);
	}
	
	
	/* write at the last ： what i do is what i want. */
	
	/**
	 * 根据ID修改用户信息
	 * @param user
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateUserInfomation(User user){
		//更新用户信息
		int result = userDao.updateUserInfomation(user);
		//清空更新前用户信息缓存
		UserUtils.clearCache(user);
		return result;
	}
	
	/**
	 * 根据id集合查询用户信息集合
	 * @param userIds
	 * @return
	 */
	public List<Map<String, Object>> findUserInfomationList(String userIds){
		if(StringUtils.isNotBlank(userIds)){
			String[] ids = userIds.split(",");
			return userDao.findUserInfomationList(ids);
		}
		return null;
	}
	
	/**
	 * 根据邮箱查询用户信息
	 * @param email
	 * @return
	 */
	public Map<String, Object> findUserInfomationByEmail(String email){
		return userDao.findUserInfomationByEmail(email);
	}
	
}
