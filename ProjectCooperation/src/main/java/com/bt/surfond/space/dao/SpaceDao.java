package com.bt.surfond.space.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.front.core.entity.ActiveUser;
import com.bt.surfond.space.entity.Space;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 空间dao接口
 * @author dyl
 *
 */
@MyBatisDao
public interface SpaceDao extends CrudDao<Space> {
	
	/**
	 * 查询与当前登录用户关联的空间列表
	 * @param space
	 * @return
	 */
	public List<Space> findSpaceList(Space space);
	
	/**
	 * 查询与当前登录用户关联的空间总数
	 * @param space
	 * @return
	 */
	public int findSpaceCount(Space space);
	
	/**
	 * 根据空间编号查询与当前登录用户关联的空间
	 * @param space
	 * @return
	 */
	public Space findSpace(Space space);
	
	/**
	 * 查询最早创建的空间
	 * @param space
	 * @return
	 */
	public Space findEarlySpace(Space space);
	
	/**
	 * 更新空间标题和描述
	 * @param space
	 * @return
	 */
	public int updateTitleAndDescriptionById(Space space);
	
	/**
	 * 查询空间成员列表
	 * @param space
	 * @return
	 */
	public List<Map<String, Object>> findSpaceMemberList1(Space space);
	
	/**
	 * 根据条件统计相关数据
	 * @param map
	 * @return
	 */
	public int countTaskByCondition(Map<String, Object> map);
	/**
	 * 统计成员被点赞数
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> sumPraiseAmountByCondition(Map<String, Object> map);
	/**
	 * 根据条件统计相关列表数据
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> getCountTaskByCondition(Map<String, Object> map);
	
	/*-----------统计生成报表数据----------------*/
	/**
	 * 统计空间成员数
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> countSpanceMember(Map<String, Object> map);
	/**
	 * 统计空间任务数
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> countSpaceTaskByCondition(Map<String, Object> map);
	
	
	/* write at the last ： what i do is what i want. */
	
	/**
	 * 插入记录
	 */
	int insert(Space space);
	
	/**
	 * 根据ID查询空间
	 */
	Space get(Space space);
	
	/**
	 * 根据ID更新空间
	 */
	int update(Space space);
	
	/**
	 * 跨空间：个人所在空间所有成员列表
	 * @param space
	 * @return
	 */
	List<ActiveUser> findMemberListIgnoreSpace(Space space);
	
	/**
	 * 查询空间成员列表
	 * @param space
	 * @return
	 */
	List<ActiveUser> findSpaceMemberList(Space space);
	
}