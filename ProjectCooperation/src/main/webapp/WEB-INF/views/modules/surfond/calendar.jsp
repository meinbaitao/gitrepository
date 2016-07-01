<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<title>Surfond | 日程</title>
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
		<!-- 初始化版本参数、路径参数 -->
		
		<link href='${ctxStatic}/jquery-fullcalendar/css/jquery-ui.min.css?tsf=${varsion}' rel='stylesheet' />
		<link href='${ctxStatic}/jquery-fullcalendar/css/fullcalendar.css?tsf=${varsion}' rel='stylesheet' />
		<link href='${ctxStatic}/jquery-fullcalendar/css/fullcalendar.print.css?tsf=${varsion}' rel='stylesheet' media='print' />
		<script type="text/javascript" src='${ctxStatic}/jquery-fullcalendar/js/moment.min.js?tsf=${varsion}'></script>
		<script type="text/javascript" src='${ctxStatic}/jquery-fullcalendar/js/fullcalendar.min.js?tsf=${varsion}'></script>
		
		<script type="text/javascript" src="${ctxSurfond}/common/js/matter.js?tsf=${varsion}"></script>
		
		<script type="text/javascript" src="${ctxSurfond }/calendar/js/calendar.js?tsf=${varsion}"></script>
		<!-- 任务详细页 -->
		<script type="text/javascript" src="${ctxSurfond}/taskDetails/js/taskDetails.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond}/taskDetails/js/taskDetails_view.js?tsf=${varsion}"></script>
		<!--自定义样式-->
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/common.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/project.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/calendar.css?tsf=${varsion}">
	</head>
	
	<body>
		<div class='roof-container calender'>
			<%@ include file="header.jsp"%>
				<div class='main-container-scroll roll'>
					<div id="calendar" ></div>
				</div>
		</div>
		
		
		
		<!--创建工作空间模态框开始-->
		<div class="modal fade mymodal" id="New_Workspace" tabindex="-1" role="dialog" >
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!--创建工作空间模态框结束-->
		<!-- 开始-工作空间管理 模态框 -->
		<div class="modal fade mymodal manage-workspace" id="Manage_Workspace" tabindex="-1" role="dialog"  >
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!-- 结束-工作空间管理 模态框 -->
		<!--快捷操作——复制项目模态框开始-->
		<div id="CopyProject" class="modal mymodal fade add-project">
			<div class="modal-dialog detail" role="document" >
				<div id="userSetting" class="modal-content beatadistancefrom">
					
				</div>
			</div>
		</div>
		<!--快捷操作——复制项目模态框结束-->
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
		<!--快捷操作——复制任务模态框开始-->
		<div  id="CopyTask" class="modal mymodal fade personage-setting ">
			<div class="modal-dialog detail beatadistance" role="document">
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!--快捷操作——复制任务模态框结束-->
		<!-- 弹框信息 -->
		<script type="text/javascript" src="${ctxSurfond }/common/js-new/commonMethods.js?tsf=${varsion}"></script>
        <!--公共js方法和DOM操作-->
	    <script type="text/javascript" src="${ctxSurfond }/view/common_view.js?tsf=${varsion}"></script>
	    <!--公共工作台的Dom操作-->
	    <script type="text/javascript" src="${ctxSurfond }/common/js-new/workspace.js?tsf=${varsion}"></script>
	</body>
	
</html>