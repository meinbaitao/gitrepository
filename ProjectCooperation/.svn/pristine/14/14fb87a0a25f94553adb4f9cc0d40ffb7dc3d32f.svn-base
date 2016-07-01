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
		
		<title>Surfond | 空间组织</title>
		
		<%@ include file="/WEB-INF/views/include/head.jsp"%>
		
		<!--自定义样式-->
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/common.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/workspace_structruing.css?tsf=${varsion}">
		
		<script type="text/javascript" src="${ctxSurfond }/common/js-new/commonMethods.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/common_view.js?tsf=${varsion}"></script>
		
		<!-- 空间组织架构  -->
		<script type="text/javascript" src="${ctxSurfond }/organizational/js/organize.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/organizational/view/organize_view.js?tsf=${varsion}"></script>
	</head>
	<body>
		<div class='roof-container'>
            <%@ include file="header.jsp"%>
			<div class="main-container-scroll">
				<div class="main-container">
					<div class="framework-left">
						<div class="organize" change-user="0" id="to-show-on-modal" organizeId="" organizeName="" userId="" userName="" createUserId="" createUserName="" type="">组织架构
							<span class="add-section" data-toggle="modal" data-target="#add-section" href="${ctxSurfond}/organizational/template/add-section.html">添加部门</span>
						</div>
						<ul  id="space-organize-member-list" class="nav nav-tabs" role="tablist">
							
						</ul>
						<div id="" class="hidden-structure" title="点击隐藏/显示项目列表">
								&lt;
						</div>	
					</div>
					<div class="framework-right">
						<div class="unabsorbed">
							<span id="show-department-name" title="" organizeId="" status="0" type="0">所有成员</span>&nbsp;&nbsp;&nbsp;&nbsp;
							<span id="show-department-member-count"></span>
							<span class="add-section" data-toggle="modal" data-target="#add-staff" href="${ctxSurfond}/organizational/template/add-staff.jsp">添加成员</span>
						</div>
						<div class="member-state">
							<ul class="dispenser-head">
								<li class="head-portrait">头像</li>
								<li class="compellation">姓名</li>
								<li class="mailbox">邮箱</li>
								<li class="department">部门</li>
								<!-- <li class="creation-time">创建时间</li> -->
								<li class="condition">状态</li>
								<li class="operate">操作</li>
							</ul>
						</div>
						
						<div class="tab-content">
							<div role="tabpanel" class="tab-pane active fade in" id="show-all-space-member"></div>
						    <div role="tabpanel" class="tab-pane fade " id="design-part">..2.</div>
						    <div role="tabpanel" class="tab-pane fade" id="develop-part">.3..</div>
						    <div role="tabpanel" class="tab-pane fade " id="market-part">..4.</div>
						</div>
						
					</div>
				</div>
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
		<!--个人设置模态框开始-->
		<div id="Add-Department" class="modal mymodal fade add-teamMembers">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--个人设置模态框结束-->
		
		<!--个人设置模态框开始-->
		<div id="Add-Director" class="modal mymodal fade add-teamMembers">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--个人设置模态框结束-->
		<!--个人设置模态框开始-->
		<div id="add-staff" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--个人设置模态框结束-->
		<!--个人设置模态框开始-->
		<div id="add-section" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--个人设置模态框结束-->
		<!--个人设置模态框开始-->
		<div id="omnibutton_converse" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--个人设置模态框结束-->
		<!--个人设置模态框开始-->
		<div id="omnibutton_project" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--个人设置模态框结束-->
		<!--个人设置模态框开始-->
		<div id="omnibutton_task" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content ">
					
				</div>
			</div>
		</div>
		<!--个人设置模态框结束-->
		<!--空间组织编辑模态框开始-->
		<div id="space-organize-modal" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content ">
					
				</div>
			</div>
		</div>
		<!--空间组织编辑模态框结束-->
	</body>
</html>