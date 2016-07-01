<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta name="renderer" content="webkit">
		<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
		<meta http-equiv="Expires" content="0">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-store">
		
		<title>Surfond | 工作台</title>
		
		<%@ include file="/WEB-INF/views/include/head.jsp"%>
		
		<!--工作台页面js引用-->
		<script type="text/javascript" src="${ctxSurfond }/workspace/js/workspace.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/workspace/view/workspace_view.js?tsf=${varsion}"></script>
		
		<!-- 任务详细页 -->
		<script type="text/javascript" src="${ctxSurfond}/taskDetails/js/taskDetails.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond}/taskDetails/js/taskDetails_view.js?tsf=${varsion}"></script>
		
		<!--自定义样式-->
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/common.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css/matter-1.0.0.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/workspace.css?tsf=${varsion}">
		
		<!--公共js方法和DOM操作-->
		<script type="text/javascript" src="${ctxSurfond }/common/js-new/commonMethods.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/common_view.js?tsf=${varsion}"></script>
		
	</head>
	<body>
		<div class='roof-container'>
			<%@ include file="header.jsp"%>
			<div class='main-container-scroll'>
				<div class="main-container">
					<div class='space-members put-away'>
						<div class="space-members-header">
							空间成员
							<span id="whether-the-space-creater"></span>
						</div>
						<ul class='member-list' id="show-space-member-list">
						</ul>
						<div id="" class="hideMenu-btn sicon-hideMenu project-eject" title="点击隐藏/显示项目列表">
								&lt;
						</div>
					</div>
					<!-- /.space-members -->
					<div class="task-container-scroll" >
						<div class="task-container">
							<div class='my-task-header' id="hidden-my-task-member-type">
								我的任务
								<div class='task-fliter dropdown'>
									<span class='fliter-condition'></span>
									<span class='sicon-dropdown' data-toggle="dropdown"></span>
									<ul class='dropdown-menu'>
										<li class="current" tag='0'>按修改时间排序</li>
										<li tag='1'>按截止时间排序</li>
										<li tag='2'>按项目名称排序</li>
									</ul>
								</div>
								<ul class='shortcut-fliter menu-tabs'>
									
								</ul>
							</div>
							<div class="list-container rolling">
								<table>
									<tbody id="taskItemsTbody">
										
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<!-- /.task-container-scroll -->
					<div class="teams-list">
						<div class='teams-list-head' id="my-teams-in-space" optionteamid="" teamId="" teamName="" userId="" userName="" createUserId="" createUserName="">
							我的团队
							<span class='sicon-addTeam' data-toggle="modal" title="创建团队" data-target="#new_team" id="click-to-new-team" href="${ctxSurfond}/workspace/template/new_team.jsp"></span>
						</div>
						<ul class='list' id="my-team-info-list">
						</ul>
					</div>
					<!-- /.teams-list -->
					<jsp:include page="taskDetails.jsp"></jsp:include>
					<!-- /.task-details -->
				</div>
			</div>
			<!-- /.main-container -->
		</div>
		<div class="project-members-list" >
			<div id="mentionMember">
				
			</div>
		</div>
		
		<!-- 添加删选条件-->
		<ul id="add-fliter-condition" class="add-task-tags-menu " >
			<li class="task-tags-input">
				<input type="text" id="fliterTitle" class=" form-control" placeholder="条件名称">
				<button id="fliterTitleBtn" class="btn btn-primary" >添加</button>
			</li>
		</ul>
				
		<!-- 添加任务标签 -->
		<ul id="add-task-tags-menu" class="add-task-tags-menu " >
			<li class="task-tags-input">
				<input type="text" id="tagsTitle" class=" form-control" data-role="none" placeholder="标签名">
				<button id="tagsTitleBtn" class="btn btn-primary" data-role="none">添加</button>
			</li>
		</ul>
		
		<!--快捷操作——复制项目模态框开始-->
		<div id="CopyProject" class="modal mymodal fade add-project">
			<div class="modal-dialog detail" role="document" >
				<div id="userSetting" class="modal-content beatadistancefrom">
					
				</div>
			</div>
		</div>
		<!--快捷操作——复制项目模态框结束-->
		
		<!--快捷操作——复制任务模态框开始-->
		<div  id="CopyTask" class="modal mymodal fade personage-setting ">
			<div class="modal-dialog detail beatadistance" role="document">
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!--快捷操作——复制任务模态框结束-->
		
		

		
		<!--添加话题模态框开始-->
		<div id="omnibutton_converse" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--添加话题模态框结束-->
		
		<!--添加项目模态框开始-->
		<div id="omnibutton_project" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--添加项目模态框开始-->
		
		<!--添加任务模态框开始-->
		<div id="omnibutton_task" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content ">
					
				</div>
			</div>
		</div>
		
		<!--添加新建团队模态框开始-->
		<div id="new_team" class="modal mymodal fade">
			<div class="modal-dialog breadth" role="document" >
				<div class="modal-content newteam">
					
				</div>
			</div>
		</div>
		<!--新建团队模态框结束-->
		
		<!--添加团队成员模态框开始-->
		<div id="AddTeamMembers" class="modal mymodal fade add-teamMembers">
			<div class="modal-dialog " role="document" >
				<div class="modal-content ">
				</div>
			</div>
		</div>
		<!--添加团队成员模态框结束-->
		<!--个人设置模态框开始-->
		<div id="Add-Director" class="modal mymodal fade add-teamMembers">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					 
				</div>
			</div>
		</div>
		<!--个人设置模态框结束-->
		<!-- 开始-工作空间管理 模态框 -->
		<div class="modal fade mymodal manage-workspace" id="Manage_Workspace" tabindex="-1" role="dialog"  >
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!-- 结束-工作空间管理 模态框 -->
				<!--创建工作空间模态框开始-->
		<div class="modal fade mymodal" id="New_Workspace" tabindex="-1" role="dialog" >
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!--创建工作空间模态框结束-->
		
		<!--空间团队模态框开始-->
		<div class="modal fade mymodal" id="space-team-edit-modal" tabindex="-1" role="dialog" >
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!--空间团队模态框结束-->
		
		<!--空间团队模态框开始-->
		<div class="modal fade mymodal" id="create-team-project-modal" tabindex="-1" role="dialog" >
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!--空间团队模态框结束-->
		
	</body>
</html>