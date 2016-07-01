package com.bt.surfond.organize.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.front.core.entity.ActiveUser;
import com.bt.surfond.organize.entity.Organize;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.sys.entity.User;

/**
 * 组织机构dao接口
 * @author dyl
 *
 */
@MyBatisDao
public interface OrganizeDao extends CrudDao<Organize> {
	
	/**
	 * 添加组织成员
	 * @param map
	 * @return
	 */
	public int addOrganizeMember(Map<String, Object> map);
	
	/**
	 * 移除组织成员
	 * @param map
	 * @return
	 */
	public int deleteOrganizeMember1(Map<String, Object> map);
	
	/**
	 * 查找空间下的未分配分组
	 * @param organize
	 * @return
	 */
	public Organize findSpaceDefaultOrganize(Organize organize);
	
	/**
	 * 根据空间查找空间下的所有组织
	 * @param organize
	 * @return
	 */
	public List<Organize> findOneSapceOrganizes(Organize organize);
	
	/**
	 * 查找组织分组里的成员
	 * @param organize
	 * @return
	 */
	public List<User> findMembersByOrganize(Organize organize);
	
	
	/**
	 * 查找组织分组里的成员
	 * @param organize
	 * @return
	 */
	public List<Map<String, Object>> findMembersMapByOrganize(Organize organize);
	
	/**
	 * 成员更换组织分组
	 * @param organize
	 * @return
	 */
	public int updateOrganizeMember1(Map<String, Object> map);
	
	
	/**
	 *	查找组织成员是否存在
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findOrganizeMemberMapping(Map<String, Object> map);
	
	
	/**
	 *	查找空间成员是否存在
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findSpaceMemberMapping(Map<String, Object> map);
	
	
	/**
	 * 查找空间下所有组织的成员 
	 * @param organize
	 * @return
	 */
	public List<Map<String, Object>> findMembersBySpace(Organize organize);
	
	
	/**
	 * 查找空间下是否存在同名的部门组织
	 * @param organize
	 * @return
	 */
	public Organize findOrganizeNameBySpace(Organize organize);
	
	/**
	 * 根据ID查找组织基本信息
	 * @param organize
	 * @return
	 */
	public Organize findOneOrganizeBaseInfo(Organize organize);

	/**
	 * 查询组织下的成员数量
	 * @param organize
	 * @return
	 */
	public Integer findOneOrganizeMemberCount(Organize organize);
	
	
	
	/* write at the last ： what i do is what i want. */
	
	/**
	 * 根据ID查询组织机构
	 */
	Organize get(Organize organize);
	
	/**
	 * 插入组织机构
	 */
	int insert(Organize organize);
	
	/**
	 * 根据ID更新组织机构
	 */
	int update(Organize organize);
	
	/**
	 * 根据ID删除组织机构
	 */
	int delete(Organize organize);
	
	/**
	 * 保存组织机构-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	int insertOrganizeMember(Map<String, Object> paramMap);
	
	/**
	 * 查询组织机构-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	Map<String, Object> findOrganizeMember(Map<String, Object> paramMap);
	
	/**
	 * 删除组织机构-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	int deleteOrganizeMember(Map<String, Object> paramMap);
	
	/**
	 * 修改组织机构-成员的关联关系
	 * @param paramMap
	 * @return
	 */
	int updateOrganizeMember(Map<String, Object> paramMap);
	
	/**
	 * 查询指定用户是否在指定组织机构所在的空间中
	 * @param organize
	 * @return
	 */
	int isExistsInSpace(Organize organize);
	
	/**
	 * 查询指定机构所属空间下的默认机构“未分配”
	 * @param organize
	 * @return
	 */
	Organize findNoAllocationOrganize(Organize organize);
	
	/**
	 * 查询指定机构的成员列表
	 * @param organize
	 * @return
	 */
	List<Map<String, Object>> findOrganizeMemberList(Organize organize);
	
	/**
	 * 查询指定组织机构中的成员列表
	 * @param organize
	 * @return
	 */
	List<ActiveUser> findOrganizeMemberListInUser(Organize organize);
	
}