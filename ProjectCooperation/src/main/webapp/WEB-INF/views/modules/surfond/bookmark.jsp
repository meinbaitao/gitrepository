<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<title>Surfond | 收藏</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta name="renderer" content="webkit">
		<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
		<meta http-equiv="Expires" content="0">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-store">
		<%@ include file="/WEB-INF/views/include/head.jsp"%>
		<script src="${ctxStatic}/jquery-readmore/readmore.min.js?tsf=${varsion}" type="text/javascript"></script>
		<!-- 话题 -->
		<script type="text/javascript" src="${ctxSurfond }/theme/js/theme.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/theme/view/theme_view.js?tsf=${varsion}"></script>
		<!-- 标签 -->
		<script type="text/javascript" src="${ctxSurfond }/tags/js/tags.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/tags_view.js?tsf=${varsion}"></script>
		<!-- 项目 -->
		<script type="text/javascript" src="${ctxSurfond}/project/js/project.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond}/project/js/project_view.js?tsf=${varsion}"></script>
		<!-- 任务详细页 -->
		<script type="text/javascript" src="${ctxSurfond}/taskDetails/js/taskDetails.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond}/taskDetails/js/taskDetails_view.js?tsf=${varsion}"></script>
		<!--公共js方法和DOM操作-->
		<script type="text/javascript" src="${ctxSurfond }/common/js-new/commonMethods.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/common_view.js?tsf=${varsion}"></script>
		<!--项目列表的Dom操作-->
		<script type="text/javascript" src="${ctxSurfond }/common/js-new/project.js?tsf=${varsion}"></script>		<!-- 收藏信息  -->
		<script type="text/javascript" src="${ctxSurfond }/bookmark/js/bookmark.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/bookmark/view/bookmark_view.js?tsf=${varsion}"></script>
		
		<!-- 日程相关 -->
		<link href='${ctxStatic}/jquery-fullcalendar/css/jquery-ui.min.css?tsf=${varsion}' rel='stylesheet' />
		<link href='${ctxStatic}/jquery-fullcalendar/css/fullcalendar.css?tsf=${varsion}' rel='stylesheet' />
		<link href='${ctxStatic}/jquery-fullcalendar/css/fullcalendar.print.css?tsf=${varsion}' rel='stylesheet' media='print' />
		<script type="text/javascript" src='${ctxStatic}/jquery-fullcalendar/js/moment.min.js?tsf=${varsion}'></script>
		<script type="text/javascript" src='${ctxStatic}/jquery-fullcalendar/js/fullcalendar.min.js?tsf=${varsion}'></script>
		
		<script type="text/javascript" src="${ctxSurfond }/calendar/js/calendar.js?tsf=${varsion}"></script>
		<!--自定义样式-->
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/common.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/project.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/calendar.css?tsf=${varsion}">
		
		<!--自定义样式-->
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/theme.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/common.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/project.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/calendar.css?tsf=${varsion}">
		
	</head>
	<body>
		<div class='roof-container'>
			<%@ include file="header.jsp"%>
			<div class='main-container-scroll'>
				<div class='main-container'>
					
					<div class="project-list">
						<div class="project-operat">
							<div class="add-project-nav">
								<span class="title">收藏夹</span>
								<%-- <span class="add-project-btn"  data-toggle="modal" data-target="#New_Project" href="${ctxSurfond}/modal/new_project.html">+</span> --%>
							</div>
							<div class="search">
								<input type="text" id="projectTitleInput" placeholder="快速查找项目">
								
							</div>
						</div>
						<ul class="member-list" id="show-bookmark-group-list">
							<!-- <li class="member-group">
								<span class="group-info show-this-bookmark-list" organize-id="2">	
									<span class="triangle-left"></span>		
									<span class="group-title" title="未分配">未分配</span>		
									<span class="member-number member-count"> (5)</span>	
								</span>	
								<ul class="group-members this-bookmark-member">
									<li class='projectEach' id='project-1111'>
										<span class='favoriteProjectEach sicon-star' id='favoriteProject-1111' title='取消收藏'></span>
											<span class='project-title'>111111</span>
											<div class='dropdown'>
											<span class='glyphicon glyphicon-option-horizontal' data-toggle='dropdown'></span>
											<ul class='dropdown-menu' id='pddm-e199e6efbb4c413583c3dd4364fd273b'>
												<li class='project-details' shref='http://localhost:8080/surfond/static/modules/surfond/modal/Manage_project.html'>详情</li>
												<li class='project-favorite'>添加收藏</li><li class='project-archive'>添加存档</li>
												<li class='project-copy' data-toggle='modal' data-target='#CopyProject' href='http://localhost:8080/surfond/static/modules/surfond/modal/CopyProject.html'>复制项目</li>
												<li class='project-delete'>删除项目</li>	
											</ul>
										</div>
									</li>
								</ul>
							</li> -->
						</ul>
						<div id="hideMenu-btn" class="hideMenu-btn sicon-hideMenu" title="点击隐藏/显示项目列表">
							&lt;
						</div>
					</div>
					<!-- project-list -->
					<div class="right" id="bookmark-show-right">
						<%-- <div class="right-container">
							<!-- 任务列表开始 -->
							<div class="right-container-scroll" id="">
								<div class="project-container">
									<div class="project-container-head">
										<!-- 任务列表头部操作栏 -->
										<div class="operate-nav">
											<div class="project-choice" id="checkedProject" project-id="">
												<span class="project-title" >项目名称</span>
												<div class="dropdown" style="display: none;">
													<span class="sicon-dropdown" data-toggle="dropdown"></span>
													<ul class="dropdown-menu" aria-labelledby="task_cheron2" >
														<li class="project-details" shref="${ctxSurfond}/modal/Manage_project.html">详情</li>
														<li class="favorite-project">添加收藏</li>
														<li class="doArchive-project">添加存档</li>
														<li class="unArchive-project">取消存档</li>
														<li class="delete-project">删除项目</li>
														<li class="delete-tags">删除标签</li>
														<li data-toggle="modal" data-target="#CopyProject" href="${ctxSurfond}/modal/CopyProject.html">复制项目</li>
													</ul>
												</div>
											</div>
											<!-- 任务列表头部操作区域 -->
											<div class="operate-btn-nav">
												<span class="sicon-task" panels-target=".list-container-nav" title="任务列表"></span>
												<span class="sicon-calendar " id="modelTaskCalendar" panels-target=".task-list-container .task-calendar"  title="日程"></span>
												<span class="sicon-file" title="查看项目附件" id="modelTaskAttachment" panels-target=".task-list-container .task-file"></span>
												<!-- <span class="sicon-refresh" title="刷新"></span>-->
												<span class="sicon-fullScreen" title="全屏显示任务栏"></span>
											</div>
										</div>
										
									</div>
									
									<!--/. project-container-head -->
									
									<div class='task-list-container' id="show-bookmark-which-task">
										<div class='panels  current list-container-nav'>
											<div class="add-task-nav">
												<input id="taskTitleInput" type="text" placeholder="提交新任务，直接@任务责任人，Enter快速提交" >
												<span class="add-task-nav-btn"></span>
											</div>
											<div class='list-container-fnav '>
												<div class="task-operate">
													<div class="task-filter">
														<span id="unDoneTaskList" title="只看未完成的任务">只看未完成</span>
														<span id="doneTaskList" title="只看已完成的任务">只看已完成</span>
														<span id="createTaskList" title="只看我创建的任务">只看我创建</span>
														<span id="ownerTaskList" title="只看我负责的任务">只看我负责</span>
														<span id="allTaskList" title="所有的任务" class="checked">所有</span>
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
						</div> --%>
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
					<ul id="add-task-tags-menu" class="add-task-tags-menu " >
						<li class="task-tags-input">
							<input type="text" id="tagsTitle" class=" form-control" data-role="none" placeholder="标签名">
							<button id="tagsTitleBtn" class="btn btn-primary" data-role="none">添加</button>
						</li>
						<li id="tagsItemsLi" class="task-tags-lists">
							<a  class="task-tags-lists  selected current" href="javascript:void(0);" >
								<span class="icon-circle"></span>sdaf
								<span class="icon-ok"></span>
							</a>
							<a class="task-tags-lists " href="javascript:void(0);" >
								<span class="icon-circle"></span>IOS
								<span class="icon-ok"></span>
							</a>
						</li>
					</ul>
					<!-- 添加任务标签 -->
					<div class="project-members-list" >
						<div id="mentionMember">
							 <div class="lists" >
								<img  title="舒佳锦" src="${ctxSurfond}/common/new-images/photo_30.png?tsf=V1R02" class="members">
								<div class="info">
									<div class="name">舒佳锦</div>
									<div class="email">sjj@clearcom.com.cn</div>
								</div>
							</div> 
						</div>
					</div>
		
		<!--快捷操作——复制项目模态框开始-->
		<div id="CopyProject" class="modal mymodal fade add-project">
			<div class="modal-dialog detail" role="document" >
				<div id="userSetting" class="modal-content beatadistancefrom">
					
				</div>
			</div>
		</div>
		<!--快捷操作——复制项目模态框结束-->
		
		
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
		<!--快捷操作——日程模态框开始-->
		<div class="modal fade mymodal " id="Add_Task" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<jsp:include page="taskDetails.jsp"></jsp:include>
					<!-- 添加任务标签 -->
					<ul id="add-task-tags-menu" class="add-task-tags-menu " >
						<li class="task-tags-input">
							<input type="text" id="tagsTitle" class=" form-control" data-role="none" placeholder="标签名">
							<button id="tagsTitleBtn" class="btn btn-primary" data-role="none">添加</button>
						</li>
						<li id="tagsItemsLi" class="task-tags-lists">
							<a  class="task-tags-lists  selected current" href="javascript:void(0);" >
								<span class="icon-circle"></span>sdaf
								<span class="icon-ok"></span>
							</a>
							<a class="task-tags-lists " href="javascript:void(0);" >
								<span class="icon-circle"></span>IOS
								<span class="icon-ok"></span>
							</a>
						</li>
					</ul>
					<!-- 添加任务标签 -->
					<div class="project-members-list" >
						<div id="mentionMember">
							<%-- <div class="lists" >
								<img  title="舒佳锦" src="${ctxSurfond}/common/new-images/photo_30.png?tsf=V1R02" class="members">
								<div class="info">
									<div class="name">舒佳锦</div>
									<div class="email">sjj@clearcom.com.cn</div>
								</div>
							</div> --%>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		<!--快捷操作——日程模态框结束-->
		<!--创建工作空间模态框结束-->
		<!--公共js方法和DOM操作-->
		<%-- <script type="text/javascript" src="${ctxSurfond }/common/js-new/commonMethods.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/common_view.js?tsf=${varsion}"></script>
		<!--项目列表的Dom操作-->
		<script type="text/javascript" src="${ctxSurfond }/common/js-new/project.js?tsf=${varsion}"></script> --%>
	</body>
</html>