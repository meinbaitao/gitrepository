package com.bt.surfond.organize.entity;

import java.util.List;

import com.bt.surfond.front.core.entity.ActiveUser;
import com.thinkgem.jeesite.common.persistence.AttrEntity;
import com.thinkgem.jeesite.modules.sys.entity.User;

/**
 * 组织机构实体
 * @author dyl
 *
 */
public class Organize extends AttrEntity<Organize>{
	
	private static final long serialVersionUID = 1L;
	private String name;		//名称
	private String parentId;	//上级ID
	private String grade;		//机构等级
	private String type;		//类型，0-默认机构，未分配；1-其它机构
	private String spaceId; 	//空间ID
	private String status;		//状态
	private String ownerId;		//负责人（用户ID）
	
	//=========
	private ActiveUser owner;		//负责人信息
	private ActiveUser activeCreateBy;		//创建者信息
	private String memberId;		//当前组织机构成员
	private String newOrganizeId;		//组织机构ID，可用于移动成员到此组织机构
	
	private String userId;		//操作组织成员存放成员ID/负责人ID
	private String userName;	//负责人名称
	private String userPhoto;	//负责人头像
	private String userEmail; 	//负责人邮箱
	private String createById;	//创建人ID
	private String createByName;//创建人名称
	private String email;		//添加成员是临时存放用户名或者邮箱
	private String memberCount;		//存放组织成员的数量
	private List<User> users;
	
	//=========
	/**类型：默认机构*/
	public static final String TYPE_NO_ALLOCATION = "0";
	/**类型：其它机构*/
	public static final String TYPE_IS_ALLOCATION = "1";
	
	public Organize() {
		super();
	}
	public Organize(String id) {
		super(id);
	}
	public String getName() {
		return name == null ? "" : name.trim();
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getParentId() {
		return parentId == null ? "" : parentId.trim();
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getGrade() {
		return grade == null ? "" : grade.trim();
	}
	public void setGrade(String grade) {
		this.grade = grade;
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
		return status == null ? "" : status.trim();
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
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNewOrganizeId() {
		return newOrganizeId;
	}
	public void setNewOrganizeId(String newOrganizeId) {
		this.newOrganizeId = newOrganizeId;
	}
	public String getMemberCount() {
		return memberCount;
	}
	public void setMemberCount(String memberCount) {
		this.memberCount = memberCount;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public String getMemberId() {
		return memberId;
	}
	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}
	
}
