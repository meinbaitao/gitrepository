package com.bt.surfond.space.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.EmailModel;
import com.bt.surfond.common.utils.EmailUtils;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.dynamic.service.DynamicService;
import com.bt.surfond.front.core.entity.ActiveUser;
import com.bt.surfond.group.service.GroupService;
import com.bt.surfond.organize.entity.Organize;
import com.bt.surfond.organize.service.OrganizeService;
import com.bt.surfond.space.dao.SpaceDao;
import com.bt.surfond.space.entity.Space;
import com.bt.surfond.team.entity.Team;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.service.SystemService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 空间service层
 * @author dyl
 *
 */
@Service
@Transactional(readOnly = true)
public class SpaceService extends CrudService<SpaceDao, Space> {
	
	@Autowired
	private SpaceDao spaceDao;
	
	@Autowired
	private GroupService groupService;
	
	@Autowired
	private SystemService systemService;
	
	@Autowired
	private DynamicService dynamicService;
	
	@Autowired
	private OrganizeService organizeService;
	
	/**
	 * 为没有空间的用户创建默认的空间
	 */
	@Transactional(readOnly = false)
	public void checkSpaceExists(){
		int count = dao.findSpaceCount(new Space());
		if(count > 0){
			return ;
		}
		//当前登录用户没有空间,为其创建一个默认的空间
		Space space = new Space();
		space.setTitle("我的空间");
		space.setDescription("这是系统默认为你创建的空间!");
		space.setUser(UserUtils.getUser());
		this.saveSpace(space);
	}
	
	/**
	 * 查询与当前登录用户关联的空间列表
	 * @param space
	 * @return
	 */
	public List<Space> findSpaceList(Space space){
		return dao.findSpaceList(space);
	}
	
	/**
	 * 根据空间编号查询与当前登录用户关联的空间
	 * @param space
	 * @return
	 */
	public Space findSpace(Space space){
		return dao.findSpace(space);
	}
	
	/**
	 * 查询最早创建的空间
	 * @param space
	 * @return
	 */
	public Space findEarlySpace(Space space){
		return dao.findEarlySpace(space);
	}
	
	/**
	 * 更新空间标题和描述
	 * @param space
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateTitleAndDescriptionById(Space space){
		space.preUpdate();
		return dao.updateTitleAndDescriptionById(space);
	}
	
	/**
	 * 查询空间成员列表
	 * @param space
	 * @return
	 */
	public List<Map<String, Object>> findSpaceMemberList1(Space space){
		return dao.findSpaceMemberList1(space);
	}
	
	/**
	 * 根据条件统计任务数
	 * @param map
	 * @return
	 */
	public int countTaskByCondition(Map<String, Object> map){
		map = this.initConditionMap(map);
		if(map.containsKey("taskStatus")){
			if(Constants.TASK_STATUS_DONE.equals(map.get("taskStatus").toString())){
				map.put("isFinish", "done");
			}else{
				map.put("isFinish", "unDone");
			}
		}else{
			map.put("isFinish", "all");
		}
		return spaceDao.countTaskByCondition(map);
	}
	/**
	 * 统计被点赞数
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> sumPraiseAmountByCondition(Map<String, Object> map){
		map = this.initConditionMap(map);
		List<Map<String, Object>> list = spaceDao.sumPraiseAmountByCondition(map);
		if(list==null){
			list = new ArrayList<Map<String, Object>>();
		}
		return list;
	}
	/**
	 * 根据条件统计相关列表数据
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> getCountTaskByCondition(Map<String, Object> map){
		map = this.initConditionMap(map);
		List<Map<String, Object>> list = spaceDao.getCountTaskByCondition(map);
		if(list==null){
			list = new ArrayList<Map<String, Object>>();
		}
		return list;
	}
	
	/**
	 * 统计空间成员数
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> countSpanceMember(Map<String, Object> map){
		List<Map<String, Object>> list = spaceDao.countSpanceMember(map);
		if(list==null){
			list = new ArrayList<Map<String, Object>>();
		}
		return list;
	}
	/**
	 * 统计空间任务数
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> countSpaceTaskByCondition(Map<String, Object> map){
		map = this.initConditionMap(map);
		List<Map<String, Object>> list = spaceDao.countSpaceTaskByCondition(map);
		if(list==null){
			list = new ArrayList<Map<String, Object>>();
		}
		return list;
	}
	private Map<String, Object> initConditionMap(Map<String, Object> map){
		map.put("DEL_FLAG_NORMAL", Team.DEL_FLAG_NORMAL);
		map.put("taskType", Constants.PROJECTTASK_TYPE_TASK);
		return map;
	}
	/**
	 * 添加组织分组成员
	 * @param organize
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> addOrganizeMember(final Organize organize){
		Map<String, Object> map = new HashMap<String, Object>();
		if(StringUtils.isNotBlank(organize.getEmail())){
			final Space sp = get(organize.getSpaceId());
			final User user = systemService.getUserByEmail(organize.getEmail());
			if(null!=user){
				if(null==organizeService.findSpaceMemberMapping(organize.getSpaceId(), user.getId())){
					if(StringUtils.isNotBlank(organize.getId())){
						if(organizeService.addOrganizeMemberOption(organize.getId(),user.getId(),organize.getType())>0){
							new Runnable() {
								public void run() {
									EmailUtils.inviteSendMailHasAccount(user.getEmail(), "Surfond邀请函", EmailModel.inviteModelHasAccount(user.getEmail(), UserUtils.getUser().getName(), sp, null));
								}
							}.run();
							map = JsonUtils.jsonString("success", "success", "1");
						}
					}else{
						Organize or = organizeService.findSpaceDefaultOrganize(organize.getSpaceId());
						if(null!=or){
							organizeService.addOrganizeMemberOption(or.getId(),user.getId(),organize.getType());
							new Runnable() {
								public void run() {
									EmailUtils.inviteSendMailHasAccount(user.getEmail(), "Surfond邀请函", EmailModel.inviteModelHasAccount(user.getEmail(), UserUtils.getUser().getName(), sp, null));
								}
							}.run();
							map = JsonUtils.jsonString("success", "success", "1");
						}else{
							map = JsonUtils.jsonString("fail", "fail", "0");
						}
					}
				}else{
					map = JsonUtils.jsonString("repeat", "repeat", "1");
				}
			}else{
				Organize or = null;
				if(StringUtils.isBlank(organize.getId())){
					or = organizeService.findSpaceDefaultOrganize(organize.getSpaceId());
					if(null != or){
						final String organizeId = or.getId();
						new Runnable() {
							public void run() {
								EmailUtils.inviteSendMailNoAccount(organize.getEmail(), "Surfond邀请函", EmailModel.inviteModelNoAccount(organize.getEmail(), UserUtils.getUser().getName(), sp, organizeId));
							}
						}.run();
					}
				}else{
					new Runnable() {
						public void run() {
							EmailUtils.inviteSendMailNoAccount(organize.getEmail(), "Surfond邀请函", EmailModel.inviteModelNoAccount(organize.getEmail(), UserUtils.getUser().getName(), sp, organize.getId()));
						}
					}.run();
				}
				//邀请注册
				map = JsonUtils.jsonString("noAccount", "noAccount", "1");
			}
		}else{
			map = JsonUtils.jsonString("fail", "fail", "0");
		}
		return map;
	}
	
	/* write at the last ： what i do is what i want. */
	
	/**
	 * 新增空间
	 * @param space
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveSpace(Space space){
		space.setStatus(Space.STATUS_SPACE);
		space.setType(Space.TYPE_SPACE_PUBLIC);
		space.setOwnerId(UserUtils.getUser().getId());//空间负责人默认为创建者
		space.preInsert();
		int result = spaceDao.insert(space);
		
		//每个新增的空间都应该有一个默认的机构“未分配”，并且其成员为空间创建者
		Organize organize = new Organize();
		organize.setSpaceId(space.getId());
		organizeService.saveNoAllocationOrganize(organize);
		
		//保存空间创建者为未分配组织机构的成员
		organize.setMemberId(UserUtils.getUser().getId());
		organizeService.saveOrganizeMember(organize);
		
		return result;
	}
	
	/**
	 * 根据ID查询空间
	 */
	public Space get(Space space){
		return spaceDao.get(space);
	}
	
	/**
	 * 根据ID更新空间
	 * @param space
	 * @return
	 */
	@Transactional(readOnly = false)
	public int update(Space space){
		space.preUpdate();
		return spaceDao.update(space);
	}
	
	/**
	 * 跨空间：个人所在空间所有成员列表
	 * @param space
	 * @return
	 */
	public List<ActiveUser> findMemberListIgnoreSpace(Space space){
		return spaceDao.findMemberListIgnoreSpace(space);
	}
	
	/**
	 * 查询空间成员列表
	 * @param space
	 * @return
	 */
	public List<ActiveUser> findSpaceMemberList(Space space){
		return spaceDao.findSpaceMemberList(space);
	}
	
}