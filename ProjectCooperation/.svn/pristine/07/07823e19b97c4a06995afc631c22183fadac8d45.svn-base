package com.bt.surfond.space.entity;

import com.bt.surfond.front.core.entity.ActiveUser;
import com.thinkgem.jeesite.common.persistence.AttrEntity;

/**
 * 空间实体
 * @author dyl
 *
 */
public class Space extends AttrEntity<Space> {
	
	private static final long serialVersionUID = 1L;
	private String title;		// 标题
	private String description;		// 描述
	private String type;		// 类型:0-公共空间,1-个人空间
	private Integer sort;		// 排序
	private String status;		// 状态:0-空间,1-组织
	private String address;		//定位
	private String source;		//来源APP/PC
	private String ownerId;		//负责人（用户ID）
	
	//==========
	private ActiveUser owner;		//负责人信息
	private ActiveUser activeCreateBy;		//创建者信息
	private String memberId;		//当前空间成员（用户ID）
	
	private String memberType;//成员类型
	private String keyword;//查询关键词(姓名或邮箱)
	private String favoriteFlag;//收藏标记
	private String projectAmount;//空间中项目数量
	private String memberAmount;//空间中成员数量
	private String email;//邀请空间时临时存放用户邮箱
	private String userId; //踢除空间成员时临时存放要踢除的成员ID/临时存放负责人ID
	private String memberChoiceOrganizeId;	//用户被邀请注册时携带的组织ID
	
	//==========
	/**空间类型:公共空间*/
	public static final String TYPE_SPACE_PUBLIC = "0";
	/**空间类型:个人空间*/
	public static final String TYPE_SPACE_PERSONAL = "1";
	
	/**状态:空间*/
	public static final String STATUS_SPACE = "0";
	/**状态:组织*/
	public static final String STATUS_ORGANIZE = "1";
	
	public Space() {
		super();
		this.sort = 30;
	}
	public Space(String id) {
		super(id);
		this.sort = 30;
	}
	public String getTitle() {
		return title == null ? "" : title.trim();
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description == null ? "" : description.trim();
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getType() {
		return type == null ? "" : type.trim();
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getSort() {
		return sort == null ? 30 : sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
	public String getStatus() {
		return status == null ? "" : status.trim();
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAddress() {
		return address == null ? "" : address.trim();
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getSource() {
		return source == null ? "" : source.trim();
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getMemberType() {
		return memberType;
	}
	public void setMemberType(String memberType) {
		this.memberType = memberType;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public String getFavoriteFlag() {
		return favoriteFlag;
	}
	public void setFavoriteFlag(String favoriteFlag) {
		this.favoriteFlag = favoriteFlag;
	}
	public String getProjectAmount() {
		return projectAmount;
	}
	public void setProjectAmount(String projectAmount) {
		this.projectAmount = projectAmount;
	}
	public String getMemberAmount() {
		return memberAmount;
	}
	public void setMemberAmount(String memberAmount) {
		this.memberAmount = memberAmount;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getMemberChoiceOrganizeId() {
		return memberChoiceOrganizeId;
	}
	public void setMemberChoiceOrganizeId(String memberChoiceOrganizeId) {
		this.memberChoiceOrganizeId = memberChoiceOrganizeId;
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
	public String getOwnerId() {
		return ownerId == null ? "" : ownerId.trim();
	}
	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}
	public String getMemberId() {
		return memberId;
	}
	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

}