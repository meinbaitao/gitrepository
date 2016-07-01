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
		
		<title>Surfond | 标签</title>

		<%@ include file="/WEB-INF/views/include/head.jsp"%>
		
		<!--自定义样式-->
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/common.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/project.css?tsf=${varsion}">
		
		<!-- 标签 -->
		<script type="text/javascript" src="${ctxSurfond }/tags/js/tags.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/tags_view.js?tsf=${varsion}"></script>
		
		<!-- 任务详细页 -->
		<script type="text/javascript" src="${ctxSurfond}/taskDetails/js/taskDetails.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond}/taskDetails/js/taskDetails_view.js?tsf=${varsion}"></script>
		
		<!--公共js方法和DOM操作-->
		<script type="text/javascript" src="${ctxSurfond }/common/js-new/commonMethods.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/common_view.js?tsf=${varsion}"></script>
		
		<!--项目列表的Dom操作-->
		<script type="text/javascript" src="${ctxSurfond }/common/js-new/project.js?tsf=${varsion}"></script>
		
	</head>
	<body>
		<div class='roof-container'>
			<%@ include file="header.jsp"%>
			<div class='main-container-scroll'>
				<div class='main-container'>
					
					<div class="project-list">
						<div class="project-operat">
							<div class="add-project-nav">
								<span class="title">标签</span>
								<!-- <span class="add-project-btn"  data-toggle="modal" data-target="#New_Project" href="#">+</span> -->
							</div>
							<div class="search">
								<input type="text" id="tagsTitleInput" placeholder="输入标签名称，Enter快速查询">
							</div>
						</div>
						<ul class="project-lists projects-list" id="tagsItemsUl">

						</ul>
						<div id="hideMenu-btn" class="hideMenu-btn sicon-hideMenu" title="点击隐藏/显示项目列表">
							&lt;
						</div>
					</div>
					<!-- project-list -->
					<div class="right">
						<div class="right-container">
							<!-- 任务列表开始 -->
							<div class="right-container-scroll">
								<div class="project-container">
									<div class="project-container-head">
										<!-- 任务列表头部操作栏 -->
										<div class="operate-nav">
											<div class="project-choice" id="checkedTags">
												<span class="project-title" >标签名称</span>
												<div class="dropdown" style="display: none;">
													<span class="sicon-dropdown" data-toggle="dropdown"></span>
													<ul class="dropdown-menu" aria-labelledby="task_cheron2" >
														<li class="delete-tags">删除标签</li>
													</ul>
												</div>
											</div>
											<!-- 任务列表头部操作区域 -->
											<div class="operate-btn-nav">
												<span class="sicon-task" panels-target=".list-container-nav" title="任务列表"></span>
												
												
												<span class="sicon-fullScreen" title="全屏显示任务栏"></span>
											</div>
										</div>
										
									</div>
									
									<!--/. project-container-head -->
									
									<div class='task-list-container'>
										<div class='panels  current list-container-nav spacing'>
											<div class='list-container-fnav '>
												<div class="task-operate">
													<div class="task-filter">
														<span id="tagsUnDoneTaskList" title="只看未完成的任务">只看未完成</span>
														<span id="tagsDoneTaskList" title="只看已完成的任务">只看已完成</span>
													
														<span id="tagsAllTaskList" title="所有的任务" class="checked">所有</span>
													</div>
												</div>
												<div class="list-container ">
													<table>
														<tbody id="taskItemsTbody">
														</tbody>
													</table>
												</div>
											</div>
											<!--/. list-container-fnav -->
										</div>
										<!--/. list-container-nav -->
										<div class="panels task-calendar  " >
											<!-- <div class="toolbar">日历区域</div> -->
											<div class="task_calendar_content">
												<div id="calendar"></div>
											</div>
										</div>
										
										
										<!-- 附件区域开始 -->
										<div class="panels task-file">
											<div class="toolbar"></div>
											<div class="task-file-content" id="attachmentOfProject">
												<div class="files file">
													<a href="javascript:void(0);">
														<div class="imgs-icon"></div>
													</a>
													<div class="file-info">
														<div class="upload-for">
															<div class="members owner color-1">吴健文</div>
														</div>
														<div class="name-task">
															<a class="file-name" href="http://www.surfond.com/a/attachment/download?id=283cf4b6fddf414f8c977ce3b06ae8f8" target="_self">surfond.rp</a>
															<a class="task-for" href="javascript:void(0)">2016-02-27 14:56:56</a>
														</div>
													</div>
												</div>
												<div class="files file-doc">
													<a href="javascript:void(0);">
														<div class="imgs-icon"></div>
													</a>
													<div class="file-info">
														<div class="upload-for">
															<div class="members owner color-1">吴健文</div>
														</div>
														<div class="name-task">
															<a class="file-name" href="http://www.surfond.com/a/attachment/download?id=283cf4b6fddf414f8c977ce3b06ae8f8" target="_self">surfond.rp</a>
															<a class="task-for" href="javascript:void(0)">2016-02-27 14:56:56</a>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<!-- 附件区域结束 -->
									</div>
									<!-- /. task-list-container -->
								</div>
								<!-- /. project-container -->
							</div>
							<!-- /. right-container-scroll -->
						</div>
						<!-- /. right-container -->
					</div>
					<!-- /.right -->
					<jsp:include page="taskDetails.jsp"></jsp:include>
					<!-- /.task-details -->
				</div>
				<!-- /.main-container -->
			</div>
			<!-- /.main-container-scroll -->
		</div>
		<div class="project-members-list" >
			<div id="mentionMember">
				
			</div>
		</div>
		<!-- 添加任务标签 -->
		<ul id="add-task-tags-menu" class="add-task-tags-menu " >
			<li class="task-tags-input">
				<input type="text" id="tagsTitle" class=" form-control" data-role="none" placeholder="标签名">
				<button id="tagsTitleBtn" class="btn btn-primary" data-role="none">添加</button>
			</li>
			<li id="tagsItemsLi" class="task-tags-lists">
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
		<!--快捷操作——添加话题模态框开始-->
		<div id="omnibutton_converse" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--快捷操作——添加话题模态框结束-->
		<!--快捷操作——添加项目模态框开始-->
		<div id="omnibutton_project" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--快捷操作——添加项目模态框开始-->
		<!--快捷操作——添加任务模态框开始-->
		<div id="omnibutton_task" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content ">
					
				</div>
			</div>
			<!--快捷操作——添加任务模态框开始-->
			<!--快捷操作——添加新建团队模态框开始-->
		</div>
		<div id="new_team" class="modal mymodal fade">
			<div class="modal-dialog breadth" role="document" >
				<div class="modal-content newteam">
					
				</div>
			</div>
		</div>
		<!--快捷操作——新建团队模态框结束-->
		<!-- 开始-创建项目 -->
		<div class="modal fade mymodal " id="New_Project" tabindex="-1" role="dialog" >
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!-- 结束-创建项目 -->
		<!-- 开始-编辑项目 -->
		<div class="modal mymodal manage-Project" id="Manage_Project" tabindex="-1" role="dialog"  >
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!-- 结束-编辑项目 -->
		<!--添加团队成员模态框开始-->
		<div id="AddTeamMembers" class="modal mymodal fade add-teamMembers">
			<div class="modal-dialog " role="document" >
				<div class="modal-content ">
				</div>
			</div>
		</div>
		<!--添加团队成员模态框结束-->
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
	</body>
</html>