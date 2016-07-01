package com.bt.surfond.front.project.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.front.core.common.Constants;
import com.bt.surfond.front.core.entity.ActiveUser;
import com.bt.surfond.front.project.dao.ProjectDao;
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.team.entity.Team;
import com.bt.surfond.team.service.TeamService;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 项目service层
 * @author dyl
 *
 */
@Service
@Transactional(readOnly = true)
public class ProjectService extends CrudService<ProjectDao, ProjectTask> {

	@Autowired
	private ProjectDao projectDao;
	
	@Autowired
	private TeamService teamService;
	
	/**
	 * 根据ID查询项目
	 */
	public ProjectTask get(ProjectTask project){
		return projectDao.get(project);
	}
	
	/**
	 * 新增项目（空间下的项目）
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveProject(ProjectTask project){
		project.setType(ProjectTask.TYPE_PROJECT);
		project.setStatus(ProjectTask.STATUS_PROJECT_NORMAL);
		project.setPraiseAmount(0);
		//若没有指定负责人，默认创建者为负责人
		if(null != project && StringUtils.isBlank(project.getOwnerId())){
			project.setOwnerId(UserUtils.getUser().getId());
		}
		project.preInsert();
		projectDao.insert(project);
		
		//保存负责人为项目成员
		this.saveOwnerToProjectMember(project);
		
		//保存项目-成员的关联关系
		project.setMemberId(UserUtils.getUser().getId());
		this.saveProjectMember(project);
		
		//项目是直接处于空间之下的，因此要添加空间-项目的关联关系
		return this.saveSpaceProject(project);
	}
	
	/**
	 * 新增项目（团队下的项目）
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveProjectInTeam(ProjectTask project){
		project.setType(ProjectTask.TYPE_PROJECT);
		project.setStatus(ProjectTask.STATUS_PROJECT_NORMAL);
		project.setPraiseAmount(0);
		//若没有指定负责人，默认创建者为负责人
		if(null != project && StringUtils.isBlank(project.getOwnerId())){
			project.setOwnerId(UserUtils.getUser().getId());
		}
		project.preInsert();
		int result = projectDao.insert(project);
		
		//保存负责人为项目成员
		this.saveOwnerToProjectMember(project);
		
		//保存项目-成员的关联关系
		project.setMemberId(UserUtils.getUser().getId());
		this.saveProjectMember(project);
		
		//新增团队下项目时需要将当前项目所属团队下的所有成员加进项目成员中去
		this.saveProjectMembersInTeamMembers(project);
		
		return result;
	}
	
	/**
	 * 将指定团队下的成员加入指定的项目中去
	 */
	@Transactional(readOnly = false)
	public void saveProjectMembersInTeamMembers(ProjectTask project){
		//查询指定团队下的成员列表
		Team team = teamService.find(new Team(project.getTeamId()));
		if(null != team && null != team.getMemberList() && team.getMemberList().size() > 0){
			StringBuilder sb = new StringBuilder();
			for(ActiveUser au : team.getMemberList()){
				sb.append(au.getId()).append(",");
			}
			String memberIds = sb.toString();
			
			//将memberIds中的成员添加到项目中去
			ProjectTask pp = new ProjectTask();
			pp.setId(project.getId());
			pp.setMemberIds(memberIds.substring(0, memberIds.length() - 1));
			this.saveProjectMembers(pp);
		}
	}
	
	/**
	 * 批量添加项目成员
	 * @param project
	 */
	@Transactional(readOnly = false)
	public int saveProjectMembers(ProjectTask project){
		int result = 0;
		if(null != project && StringUtils.isNotBlank(project.getMemberIds())){
			String[] memberIdsArray = project.getMemberIds().split(",");
			for(int i = 0; null != memberIdsArray && i < memberIdsArray.length; i++){
				ProjectTask p = new ProjectTask();
				p.setId(project.getId());
				p.setMemberId(memberIdsArray[i]);
				result += this.saveProjectMember(p);
			}
		}
		return result;
	}
	
	/**
	 * 批量删除项目成员
	 * @param project
	 */
	@Transactional(readOnly = false)
	public int deleteProjectMembers(ProjectTask project){
		int result = 0;
		if(null != project && StringUtils.isNotBlank(project.getMemberIds())){
			String[] memberIdsArray = project.getMemberIds().split(",");
			for(int i = 0; null != memberIdsArray && i < memberIdsArray.length; i++){
				ProjectTask p = new ProjectTask();
				p.setId(project.getId());
				p.setMemberId(memberIdsArray[i]);
				result += this.deleteProjectMember(p);
			}
		}
		return result;
	}
	
	/**
	 * 根据ID修改项目信息
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int update(ProjectTask project){
		project.preUpdate();
		int result = projectDao.update(project);
		 
		//保存负责人为项目成员
		this.saveOwnerToProjectMember(project);
		
		return result;
	}
	
	/**
	 * 根据ID删除项目
	 * @param project
	 * @return
	 */
	@Transactional(readOnly =false)
	public int deleteProject(ProjectTask project){
		return projectDao.delete(project);
	}
	
	/**
	 * 保存空间-项目的关联关系
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveSpaceProject(ProjectTask project){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", IdGen.uuid());
		paramMap.put("spaceId", project.getSpaceId());
		paramMap.put("recordId", project.getId());
		return projectDao.insertSpaceProject(paramMap);
	}
	
	/**
	 * 保存项目-成员的关联关系
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveProjectMember(ProjectTask project){
		Map<String, Object> projectMember = this.findProjectMember(project);
		if(null == projectMember){
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("id", IdGen.uuid());
			paramMap.put("recordId", project.getId());
			paramMap.put("memberId", project.getMemberId());
			int result = projectDao.insertProjectMember(paramMap);
			
			//因为项目分空间下的项目和团队下的项目，若是团队下的项目还需要检查添加的项目成员是否是团队成员，若不是，需要将其也加进团队成员中去
			//又因为此方法会在创建项目和修改项目信息中被调用（均可能会涉及成员操作），因此需要重新查询项目信息以判断其是否是团队下的项目
			ProjectTask pp = this.get(project);
			if(null != pp && StringUtils.isNotBlank(pp.getTeamId())){//团队下的项目
				Team t = new Team();
				t.setId(pp.getTeamId());
				t.setMemberId(project.getMemberId());
				teamService.saveTeamMember(t);
			}
			
			return result;
		}
		return Constants.SERVICE_HANDLE_FAILURE;
	}
	
	/**
	 * 查询项目-成员的关联关系
	 * @param project
	 * @return
	 */
	public Map<String, Object> findProjectMember(ProjectTask project){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("recordId", project.getId());
		paramMap.put("memberId", project.getMemberId());
		return projectDao.findProjectMember(paramMap);
	}
	
	/**
	 * 保存负责人为项目成员
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveOwnerToProjectMember(ProjectTask project){
		if(null != project && StringUtils.isNotBlank(project.getOwnerId())){
			ProjectTask p = new ProjectTask();
			p.setId(project.getId());
			p.setMemberId(project.getOwnerId());
			return this.saveProjectMember(p); 
		}
		return Constants.SERVICE_HANDLE_FAILURE;
	}
	
	/**
	 * 删除项目-成员的关联关系
	 * @param project
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteProjectMember(ProjectTask project){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("recordId", project.getId());
		paramMap.put("memberId", project.getMemberId());
		return projectDao.deleteProjectMember(paramMap);
	}
	
	/**
	 * 查询项目成员列表
	 * @param project
	 * @return
	 */
	public List<ActiveUser> findProjectMemberList(ProjectTask project){
		return projectDao.findProjectMemberList(project);
	}
	
	/**
	 * 查询指定团队下的项目列表
	 * @param project
	 * @return
	 */
	public List<ProjectTask> findListInTeam(ProjectTask project){
		project.setType(ProjectTask.TYPE_PROJECT);
		return projectDao.findListInTeam(project);
	}
	
}
