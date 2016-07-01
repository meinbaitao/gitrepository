package com.bt.surfond.task.entity;

import java.util.List;
import java.util.Map;

import com.bt.surfond.front.core.entity.ActiveUser;
import com.bt.surfond.tags.entity.Tags;
import com.bt.surfond.team.entity.Team;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thinkgem.jeesite.common.persistence.AttrEntity;

/**
 * 项目与任务实体
 * @author dyl
 *
 */
public class ProjectTask extends AttrEntity<ProjectTask> {
	
	private static final long serialVersionUID = 1L;
	private String parentId;		// 父级编号
	private String title;		// 标题
	private String description;		// 描述
	private Integer sort;		// 排序
	private String type;		// 类型:0-项目,1-任务
	private String status;		// 状态:项目*0-正常,1-收藏,2-存档;任务*6-未完成,7-已完成
	private String dueDate;		// 交付日期
	private String taskGroup;		// 任务组
	private Integer praiseAmount;		// 被赞数
	private String address;		//地址
	private String source;		// 来源
	private String hasChart;	  //是否显示图表标记:0-不显示图表,1-显示图表
	private String finishDate;		//完成日期
	private String teamId;			//团队ID
	private String ownerId;			//负责人（用户ID）

	//==========
	private ActiveUser owner;		//负责人信息
	private ActiveUser activeCreateBy;	//创建者信息
	private String spaceId;			//空间ID
	private String memberId;		//项目成员（用户ID）
	private String memberIds;		//批量操作成员，该字符串为一到多个用户ID，用英文逗号隔开
	
	private String beginDueDate;		// 开始 交付日期
	private String endDueDate;		// 结束 交付日期
	private Integer showAmount;//显示时间段天数(现显示前8天)
	private String projectId;//项目编号
	private String newProjectId;//新的项目编号
	private String projectTeamId;//项目所在的团队
	private String projectTitle;//项目标题
	private String projectCreateById;//项目创建人
	private String projectOwnerId;//项目负责人
	private String memberType;//成员类型
	private String taskAmount;//任务数量
	private String subTaskAmount;//子任务数量
	private String memberAmount;//成员数量
	private String praiseType;//点赞类型
	private String praiseFlag;//点赞标记
	private String favoriteFlag;//收藏标记
	private List<Tags> tagsList;//任务标签
	private String tagsId;//任务中标签编号,当任务有多个标签时使用";"隔开
	private String tagsTitle;//任务中标签标题,当任务有多个标签时使用";"隔开
	private boolean updateFlag;//是否更新标记
	private String nextId;//任务编号
	private String createById;//创建人编号
	private String createByName;//创建人名称
	private String attentionUserId;//关注人编号
	private String userEmails;//成员邮箱
	private String otherType;//另一个类型
	private String dynamicDescription;//任务动态描述
	private String ip;//客户端ip地址
	private boolean aite;//是否艾特人
	private List<Map<String, Object>> ownerList;
	private String userIds;//成员编号
	
	//================任务复制=================================
	private String userId;				//是否复制负责人
	private String subTask;				//是否复制子任务
	private String attachment;			//是否复制附件
	private String tags;				//是否复制标签
	//================项目复制=================================
	private String task;				//是否复制任务
	private String members;				//是否复制成员
	private String groupType;
	private List<Team> teamList;
	
	//==========
	/**类型:项目*/
	public static final String TYPE_PROJECT = "0";
	/**类型:任务*/
	public static final String TYPE_TASK = "1";
	
	/**项目状态:正常*/
	public static final String STATUS_PROJECT_NORMAL = "0";
	/**项目状态:收藏*/
	public static final String STATUS_PROJECT_FAVORITE = "1";
	/**项目状态:存档*/
	public static final String STATUS_PROJECT_ARCHIVE = "2";
	
	/**任务状态:未完成*/
	public static final String STATUS_TASK_UNDONE = "6";
	/**任务状态:已完成*/
	public static final String STATUS_TASK_DONE = "7";
	
	public ProjectTask() {
		super();
		this.sort = 30;
	}
	public ProjectTask(String id) {
		super(id);
		this.sort = 30;
	}
	public String getParentId() {
		return parentId == null ? "" : parentId.trim();
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
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
	public Integer getSort() {
		return sort  == null ? 30 : sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
	public String getType() {
		return type == null ? "" : type.trim();
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getStatus() {
		return status == null ? "" : status.trim();
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	public String getTaskGroup() {
		return taskGroup == null ? "" : taskGroup.trim();
	}
	public void setTaskGroup(String taskGroup) {
		this.taskGroup = taskGroup;
	}
	public Integer getPraiseAmount() {
		return praiseAmount == null ? 0 : praiseAmount;
	}
	public void setPraiseAmount(Integer praiseAmount) {
		this.praiseAmount = praiseAmount;
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
	public String getHasChart() {
		return hasChart == null ? "" : hasChart.trim();
	}
	public void setHasChart(String hasChart) {
		this.hasChart = hasChart;
	}
	public String getFinishDate() {
		return finishDate;
	}
	public void setFinishDate(String finishDate) {
		this.finishDate = finishDate;
	}
	public String getTeamId() {
		return teamId == null ? "" : teamId.trim();
	}
	public void setTeamId(String teamId) {
		this.teamId = teamId;
	}
	public String getOwnerId() {
		return ownerId == null ? "" : ownerId.trim();
	}
	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}
	public String getBeginDueDate() {
		return beginDueDate;
	}
	public void setBeginDueDate(String beginDueDate) {
		this.beginDueDate = beginDueDate;
	}
	public String getEndDueDate() {
		return endDueDate;
	}
	public void setEndDueDate(String endDueDate) {
		this.endDueDate = endDueDate;
	}
	public Integer getShowAmount() {
		return showAmount;
	}
	public void setShowAmount(Integer showAmount) {
		this.showAmount = showAmount;
	}
	public String getSpaceId() {
		return spaceId;
	}
	public void setSpaceId(String spaceId) {
		this.spaceId = spaceId;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public String getNewProjectId() {
		return newProjectId;
	}
	public void setNewProjectId(String newProjectId) {
		this.newProjectId = newProjectId;
	}
	public String getProjectTeamId() {
		return projectTeamId;
	}
	public void setProjectTeamId(String projectTeamId) {
		this.projectTeamId = projectTeamId;
	}
	public String getProjectTitle() {
		return projectTitle;
	}
	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}
	public String getProjectCreateById() {
		return projectCreateById;
	}
	public void setProjectCreateById(String projectCreateById) {
		this.projectCreateById = projectCreateById;
	}
	public String getProjectOwnerId() {
		return projectOwnerId;
	}
	public void setProjectOwnerId(String projectOwnerId) {
		this.projectOwnerId = projectOwnerId;
	}
	public String getMemberType() {
		return memberType;
	}
	public void setMemberType(String memberType) {
		this.memberType = memberType;
	}
	public String getTaskAmount() {
		return taskAmount;
	}
	public void setTaskAmount(String taskAmount) {
		this.taskAmount = taskAmount;
	}
	public String getSubTaskAmount() {
		return subTaskAmount;
	}
	public void setSubTaskAmount(String subTaskAmount) {
		this.subTaskAmount = subTaskAmount;
	}
	public String getMemberAmount() {
		return memberAmount;
	}
	public void setMemberAmount(String memberAmount) {
		this.memberAmount = memberAmount;
	}
	public String getPraiseType() {
		return praiseType;
	}
	public void setPraiseType(String praiseType) {
		this.praiseType = praiseType;
	}
	public String getPraiseFlag() {
		return praiseFlag;
	}
	public void setPraiseFlag(String praiseFlag) {
		this.praiseFlag = praiseFlag;
	}
	public String getFavoriteFlag() {
		return favoriteFlag;
	}
	public void setFavoriteFlag(String favoriteFlag) {
		this.favoriteFlag = favoriteFlag;
	}
	public List<Tags> getTagsList() {
		return tagsList;
	}
	public void setTagsList(List<Tags> tagsList) {
		this.tagsList = tagsList;
	}
	public String getTagsId() {
		return tagsId;
	}
	public void setTagsId(String tagsId) {
		this.tagsId = tagsId;
	}
	public String getTagsTitle() {
		return tagsTitle;
	}
	public void setTagsTitle(String tagsTitle) {
		this.tagsTitle = tagsTitle;
	}
	@JsonIgnore
	public boolean isUpdateFlag() {
		return updateFlag;
	}
	public void setUpdateFlag(boolean updateFlag) {
		this.updateFlag = updateFlag;
	}
	public String getNextId() {
		return nextId;
	}
	public void setNextId(String nextId) {
		this.nextId = nextId;
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
	public String getAttentionUserId() {
		return attentionUserId;
	}
	public void setAttentionUserId(String attentionUserId) {
		this.attentionUserId = attentionUserId;
	}
	public String getUserEmails() {
		return userEmails;
	}
	public void setUserEmails(String userEmails) {
		this.userEmails = userEmails;
	}
	public String getOtherType() {
		return otherType;
	}
	public void setOtherType(String otherType) {
		this.otherType = otherType;
	}
	public String getDynamicDescription() {
		return dynamicDescription;
	}
	public void setDynamicDescription(String dynamicDescription) {
		this.dynamicDescription = dynamicDescription;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	@JsonIgnore
	public boolean isAite() {
		return aite;
	}
	public void setAite(boolean aite) {
		this.aite = aite;
	}
	public List<Map<String, Object>> getOwnerList() {
		return ownerList;
	}
	public void setOwnerList(List<Map<String, Object>> ownerList) {
		this.ownerList = ownerList;
	}
	public String getUserIds() {
		return userIds;
	}
	public void setUserIds(String userIds) {
		this.userIds = userIds;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getSubTask() {
		return subTask;
	}
	public void setSubTask(String subTask) {
		this.subTask = subTask;
	}
	public String getAttachment() {
		return attachment;
	}
	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}
	public String getTags() {
		return tags;
	}
	public void setTags(String tags) {
		this.tags = tags;
	}
	public String getTask() {
		return task;
	}
	public void setTask(String task) {
		this.task = task;
	}
	public String getMembers() {
		return members;
	}
	public void setMembers(String members) {
		this.members = members;
	}
	public String getGroupType() {
		return groupType;
	}
	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}
	public List<Team> getTeamList() {
		return teamList;
	}
	public void setTeamList(List<Team> teamList) {
		this.teamList = teamList;
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
	public String getMemberIds() {
		return memberIds;
	}
	public void setMemberIds(String memberIds) {
		this.memberIds = memberIds;
	}
	
}