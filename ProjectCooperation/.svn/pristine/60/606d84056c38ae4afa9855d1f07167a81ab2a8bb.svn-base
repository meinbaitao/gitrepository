package com.bt.surfond.organize.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.front.core.entity.ActiveUser;
import com.bt.surfond.organize.dao.OrganizeDao;
import com.bt.surfond.organize.entity.Organize;
import com.bt.surfond.space.service.SpaceService;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.service.SystemService;

/**
 * 组织机构service层
 * @author dyl
 *
 */
@Service
@Transactional(readOnly = true)
public class OrganizeService extends CrudService<OrganizeDao, Organize> {
	
	@Autowired
	private OrganizeDao organizeDao;
	
	@Autowired
	private SystemService systemService;
	
	/**
	 * 添加组织分组
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> addOrganizeInfo(Organize organize){
		if(StringUtils.isBlank(organize.getType())){
			organize.setType(Constants.ORGANIZE_TYPE_GROUPED);
		}
		List<Organize> list = findOneSapceOrganizes(organize);
		boolean bl = true;
		for (Organize o : list) {
			if(o.getName().equals(organize.getName())){
				bl = false;
				return JsonUtils.jsonString(organize, "repeat", "0");
			}
		}
		if(bl){
			save(organize);
		}
		return JsonUtils.jsonString(organize, "success", "1");
	}
	
	/**
	 * 删除组织分组
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> deleteOrganizeInfo(Organize organize){
		List<User> users = findMembersByOrganize(organize);
		Organize or = findSpaceDefaultOrganize(organize.getSpaceId());
		if(null!=users){
			for (User user : users) {
				addOrganizeMemberOption(or.getId(), user.getId(), null);
			}
		}
		delete(organize);
		return JsonUtils.jsonString("success", "success", "1");
	}
	
	/**
	 * 编辑组织分组
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> updateOrganizeInfo(Organize organize){
		Organize or = get(organize);
		or.setName(organize.getName());
		if(StringUtils.isNotBlank(organize.getUserId())){
			User user = new User();
			user.setId(organize.getUserId());
			or.setUser(user);
		}
		or.setIsNewRecord(false);
		if(Constants.ORGANIZE_TYPE_NOGROUPED.equals(or.getType())){
			or.setName("未分配");
		}
		List<Organize> list = findOneSapceOrganizes(organize);
		boolean bl = true;
		for (Organize o : list) {
			if(o.getName().equals(organize.getName()) && !(o.getId().equals(organize.getId()))){
				bl = false;
				return JsonUtils.jsonString(or, "repeat", "0");
			}
		}
		if(bl){
			save(or);
		}
		return JsonUtils.jsonString(or, "success", "1");
	}
	
	
	/**
	 * 添加组织分组成员
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public int addOrganizeMemberOption(String organizeId,String userId,String type){
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("id", IdGen.uuid());
		mapData.put("organizeId", organizeId);
		mapData.put("userId", userId);
		mapData.put("type", type);
		return organizeDao.addOrganizeMember(mapData);
	}
	
	/**
	 * 移除组织分组成员
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> deleteOrganizeMember1(Organize organize){
		if(deleteOrganizeMemberOption(organize.getId(),organize.getUserId())>0){
			//移除其他记录
			return JsonUtils.jsonString("success", "success", "1");
		}
		return JsonUtils.jsonString("fail", "fail", "0");
	}
	
	/**
	 * 移除组织分组成员
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteOrganizeMemberOption(String organizeId,String userId){
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("organizeId", organizeId);
		mapData.put("userId", userId);
		return organizeDao.deleteOrganizeMember1(mapData);
	}
	
	
	/**
	 * 成员更换组织分组
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> updateOrganizeMember1(Organize organize){
		
		Map<String, Object> map = new HashMap<String, Object>();
		if(StringUtils.isNotBlank(organize.getNewOrganizeId())){
			Map<String, Object> existmMap = findOrganizeMemberMapping(organize.getNewOrganizeId(), organize.getUserId());
			int num = 0;
			if(null==existmMap){
				num = updateOrganizeMemberOption(organize.getId(), organize.getNewOrganizeId(), organize.getUserId());
			}
			if(num>0){
				map = JsonUtils.jsonString("success", "success", "1");
			}else{
				map = JsonUtils.jsonString("repeat", "repeat", "0");
			}
		}else{
			if(StringUtils.isNotBlank(organize.getSpaceId())){
				Organize or = findSpaceDefaultOrganize(organize.getSpaceId());
				Map<String, Object> existmMap = findOrganizeMemberMapping(or.getNewOrganizeId(), organize.getUserId());
				int num = 0;
				if(null==existmMap){
					num = updateOrganizeMemberOption(organize.getId(), or.getId(), organize.getUserId());
				}
				if(num>0){
					map = JsonUtils.jsonString("success", "success", "1");
				}else{
					map = JsonUtils.jsonString("repeat", "repeat", "0");
				}
			}
		}
		return map;
	}
	
	/**
	 * 成员更换组织分组
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateOrganizeMemberOption(String id,String newOrganizeId,String userId){
		Map<String, Object> map = findOrganizeMemberMapping(id, userId);
		if(null!=map){
			Map<String, Object> mapData = new HashMap<String, Object>();
			String mapId = map.get("id").toString();
			if(StringUtils.isNotBlank(mapId)){
				mapData.put("id", mapId);
				mapData.put("organizeId", newOrganizeId);
				return organizeDao.updateOrganizeMember1(mapData);
			}
		}
		return 0;
	}
	
	/**
	 * 查找组织分组成员是否存在
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findOrganizeMemberMapping(String organizeId,String userId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("organizeId", organizeId);
		map.put("userId", userId);
		return organizeDao.findOrganizeMemberMapping(map);
	}
	
	/**
	 * 查找空间成员是否存在
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findSpaceMemberMapping(String spaceId,String userId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("organizeId", spaceId);
		map.put("userId", userId);
		return organizeDao.findSpaceMemberMapping(map);
	}
	
	
	/**
	 * 查找空间下的未分配组织
	 * @param organize
	 * @return
	 */
	public Organize findSpaceDefaultOrganize(String spaceId){
		Organize organize = new Organize();
		organize.setSpaceId(spaceId);
		organize.setType(Constants.ORGANIZE_TYPE_NOGROUPED);
		return organizeDao.findSpaceDefaultOrganize(organize);
	}
	
	/**
	 * 根据空间查找空间下的所有组织
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findOneSapceOrganizesAndMembers(Organize organize){
		List<Organize> list = findOneSapceOrganizes(organize);
		for (Organize o : list) {
			List<User> users = findMembersByOrganize(o);
			o.setUsers(users);
		}
		return JsonUtils.jsonString(list, "success", "1");
	}
	
	/**
	 * 根据空间查找空间下的所有组织
	 * @param organize
	 * @return
	 */
	public List<Organize> findOneSapceOrganizes(Organize organize){
		return organizeDao.findOneSapceOrganizes(organize);
	}
	
	
	/**
	 * 查找组织分组里的成员
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findOneOrganizeMembers(Organize organize){
		return JsonUtils.jsonString(findMembersByOrganize(organize), "success", "1");
	}
	
	/**
	 * 查找组织分组里的成员
	 * @param organize
	 * @return
	 */
	public List<User> findMembersByOrganize(Organize organize){
		return organizeDao.findMembersByOrganize(organize);
	}
	
	/**
	 * 查找组织分组里的成员
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findMembersMapByOrganize(Organize organize){
		return JsonUtils.jsonString(organizeDao.findMembersMapByOrganize(organize), "success", "1");
	}
	
	/**
	 * 查找空间下所有组织的成员 
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findMembersBySpace(Organize organize){
		return JsonUtils.jsonString(organizeDao.findMembersBySpace(organize), "success", "1");
	}
	
	/**
	 * 查找该空间下的部门名字是否存在
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findOrganizeNameBySpace(Organize organize) {
		return JsonUtils.jsonString(organizeDao.findOrganizeNameBySpace(organize), "success", "1");
	}
	
	/**
	 * 根据ID查找组织的基本信息
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findOneOrganizeBaseInfo(Organize organize) {
		return JsonUtils.jsonString(organizeDao.findOneOrganizeBaseInfo(organize), "success", "1");
	}

	/**
	 * 查询组织下的成员数量
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findOneOrganizeMemberCount(Organize organize) {
		return  JsonUtils.jsonString(organizeDao.findOneOrganizeMemberCount(organize), "success", "1");
	}
	
	
	/* write at the last ： what i do is what i want. */
	
	/**
	 * 根据ID查询组织机构
	 */
	public Organize get(Organize organize){
		return organizeDao.get(organize);
	}
	
	/**
	 * 新增组织机构
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveOrganize(Organize organize){
		organize.setType(Organize.TYPE_IS_ALLOCATION);
		organize.preInsert();
		return organizeDao.insert(organize);
	}
	
	/**
	 * 新增组织机构（默认的：未分配）
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveNoAllocationOrganize(Organize organize){
		organize.setType(Organize.TYPE_NO_ALLOCATION);
		organize.setName("未分配");
		organize.preInsert();
		return organizeDao.insert(organize);
	}
	
	/**
	 * 根据ID更新组织机构
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public int update(Organize organize){
		organize.preUpdate();
		return organizeDao.update(organize);
	}
	
	/**
	 * 根据ID删除组织机构
	 */
	@Transactional(readOnly = false)
	public int deleteOrganize(Organize organize){
		//删除之前先将要删除的组织机构中的成员转移到未分组中。。蛋疼啊
		
		//查询要删除的机构所属空间下的默认机构“未分配”
		organize.setType(Organize.TYPE_NO_ALLOCATION);
		Organize noAllocationOrganize = this.findNoAllocationOrganize(organize);
		//查询要删除的机构中的成员列表
		List<Map<String, Object>> organizeMemberList = this.findOrganizeMemberList(organize);
		if(null != organizeMemberList){
			organize.setNewOrganizeId(noAllocationOrganize.getId());
			for(Map<String, Object> organizeMember : organizeMemberList){
				organize.setMemberId(organizeMember.get("memberId").toString());
				this.updateOrganizeMember(organize);
			}
		}
		return organizeDao.delete(organize);
	}
	
	/**
	 * 保存组织机构-成员的关联关系
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveOrganizeMember(Organize organize){
		Map<String, Object> organizeMember = this.findOrganizeMember(organize);
		if(null != organizeMember){//若成员已在机构中，不需要添加，返回
			return com.bt.surfond.front.core.common.Constants.SERVICE_HANDLE_FAILURE;
		}
		if(this.isExistsInSpace(organize)){//若成员已在机构所属空间下的其它机构中，不需要添加，返回
			return com.bt.surfond.front.core.common.Constants.SERVICE_HANDLE_FAILURE;
		}
		//若成员没有在机构中，添加
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", IdGen.uuid());
		paramMap.put("organizeId", organize.getId());
		paramMap.put("memberId", organize.getMemberId());
		return organizeDao.insertOrganizeMember(paramMap);
	}
	
	/**
	 * 查询组织机构-成员的关联关系
	 * @param organize
	 * @return
	 */
	public Map<String, Object> findOrganizeMember(Organize organize){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("organizeId", organize.getId());
		paramMap.put("memberId", organize.getMemberId());
		return organizeDao.findOrganizeMember(paramMap);
	}
	
	/**
	 * 删除组织机构-成员的关联关系
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteOrganizeMember(Organize organize){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("organizeId", organize.getId());
		paramMap.put("memberId", organize.getMemberId());
		return organizeDao.deleteOrganizeMember(paramMap);
	}
	
	/**
	 * 修改组织机构-成员的关联关系
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateOrganizeMember(Organize organize){
		Map<String, Object> organizeMember = this.findOrganizeMember(organize);
		if(null == organizeMember){//要更换新机构的成员没在传入的旧机构中，无法更换机构，返回
			return com.bt.surfond.front.core.common.Constants.SERVICE_HANDLE_FAILURE;
		}
		//为成员更换新机构
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", organizeMember.get("id"));
		paramMap.put("organizeId", organize.getNewOrganizeId());
		return organizeDao.updateOrganizeMember(paramMap);
	}
	
	/**
	 * 查询指定用户是否在指定组织机构所在的空间中
	 * @param organize
	 * @return
	 */
	public boolean isExistsInSpace(Organize organize){
		return organizeDao.isExistsInSpace(organize) > 0 ? true : false;
	}
	
	/**
	 * 查询指定机构所属空间下的默认机构“未分配”
	 * @param organize
	 * @return
	 */
	public Organize findNoAllocationOrganize(Organize organize){
		return organizeDao.findNoAllocationOrganize(organize);
	}
	
	/**
	 * 查询指定机构的成员列表
	 * @param organize
	 * @return
	 */
	public List<Map<String, Object>> findOrganizeMemberList(Organize organize){
		return organizeDao.findOrganizeMemberList(organize);
	}
	
	/**
	 * 邀请成员
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> inviteMember(Organize organize){
		WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
		SpaceService spaceService = webApplicationContext.getBean(SpaceService.class);
		
		Organize o = this.get(organize);
		organize.setSpaceId(o.getSpaceId());
		return spaceService.addOrganizeMember(organize);
	}
	
	/**
	 * 查询指定组织机构中的成员列表
	 * @param organize
	 * @return
	 */
	public List<ActiveUser> findOrganizeMemberListInUser(Organize organize){
		return organizeDao.findOrganizeMemberListInUser(organize);
	}
	
}