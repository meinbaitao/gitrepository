package com.bt.surfond.team.entity;

import java.util.ArrayList;
import java.util.List;

import com.bt.surfond.front.core.entity.ActiveUser;
import com.bt.surfond.task.entity.ProjectTask;
import com.thinkgem.jeesite.common.persistence.AttrEntity;
import com.thinkgem.jeesite.modules.sys.entity.User;

/**
 * 团队实体
 * @author dyl
 *
 */
public class Team extends AttrEntity<Team> {
	
	private static final long serialVersionUID = 1L;
	private String name; 				//团队名称
	private String description; 		//团队描述
	private String parentId;			//上级ID
	private String type; 				//团队类型
	private String spaceId; 			//空间编号
	private String status; 				//团队状态
	private String ownerId;				//负责人
	
	//============
	private ActiveUser owner;			//负责人信息
	private ActiveUser activeCreateBy;	//创建者信息
	private List<ActiveUser> memberList;//团队成员列表
	private String memberId;			//当前团队成员
	private String memberAmount;		//成员数量
	private String memberIds;			//批量操作成员，该字符串为一到多个用户ID，用英文逗号隔开
	
	private String userPhoto;			//负责人头像
	private String userEmail;			//负责人邮箱
	private String createById;			//创建人ID
	private String createByName;		//创建人姓名
	private String userName;			//负责人姓名
	private String userId;				//临时存放团队成员/责任人ID
	private String newTeamId;			//临时存放新的团队ID
	private String membersId;			//团队成员的ID;
	private Integer projectCount;		//项目数
	private Integer userCount;			//成员数
	private Integer conversationCount;	//对话数
	private List<User> users = new ArrayList<User>();						//团队下的成员
	private List<ProjectTask> projectTasks = new ArrayList<ProjectTask>();	//团队下的项目
	
	public Team() {
		super();
	}
	public Team(String id) {
		super(id);
	}
	public String getName() {
		return name == null ? "" : name.trim();
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description == null ? "" : description.trim();
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getParentId() {
		return parentId == null ? "" : parentId.trim();
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getType() {
		return type == null ? "" : type.trim();
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getSpaceId() {
		return spaceId == null ? "" : spaceId.trim();
	}
	public void setSpaceId(String spaceId) {
		this.spaceId = spaceId;
	}
	public String getStatus() {
		return status == null ? "" :status.trim();
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getOwnerId() {
		return ownerId == null ? "" : ownerId.trim();
	}
	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}
	public ActiveUser getOwner() {
		return owner;
	}
	public void setOwner(ActiveUser owner) {
		this.owner = owner;
	}
	public ActiveUser getActiveCreateBy() {
		return activeCreateBy;
	}
	public void setActiveCreateBy(ActiveUser activeCreateBy) {
		this.activeCreateBy = activeCreateBy;
	}
	public String getMemberId() {
		return memberId;
	}
	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}
	public String getUserPhoto() {
		return userPhoto;
	}
	public void setUserPhoto(String userPhoto) {
		this.userPhoto = userPhoto;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getCreateById() {
		return createById;
	}
	public void setCreateById(String createById) {
		this.createById = createById;
	}
	public String getCreateByName() {
		return createByName;
	}
	public void setCreateByName(String createByName) {
		this.createByName = createByName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getNewTeamId() {
		return newTeamId;
	}
	public void setNewTeamId(String newTeamId) {
		this.newTeamId = newTeamId;
	}
	public String getMembersId() {
		return membersId;
	}
	public void setMembersId(String membersId) {
		this.membersId = membersId;
	}
	public Integer getProjectCount() {
		return projectCount;
	}
	public void setProjectCount(Integer projectCount) {
		this.projectCount = projectCount;
	}
	public Integer getUserCount() {
		return userCount;
	}
	public void setUserCount(Integer userCount) {
		this.userCount = userCount;
	}
	public Integer getConversationCount() {
		return conversationCount;
	}
	public void setConversationCount(Integer conversationCount) {
		this.conversationCount = conversationCount;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public List<ProjectTask> getProjectTasks() {
		return projectTasks;
	}
	public void setProjectTasks(List<ProjectTask> projectTasks) {
		this.projectTasks = projectTasks;
	}
	public List<ActiveUser> getMemberList() {
		return memberList;
	}
	public void setMemberList(List<ActiveUser> memberList) {
		this.memberList = memberList;
	}
	public String getMemberAmount() {
		return memberAmount;
	}
	public void setMemberAmount(String memberAmount) {
		this.memberAmount = memberAmount;
	}
	public String getMemberIds() {
		return memberIds;
	}
	public void setMemberIds(String memberIds) {
		this.memberIds = memberIds;
	}
	
}