<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<title>Surfond | 话题</title>
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
		<!--自定义样式-->
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/common.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/theme.css?tsf=${varsion}">
		<!-- 话题 -->
		<script type="text/javascript" src="${ctxSurfond }/theme/js/theme.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/theme/view/theme_view.js?tsf=${varsion}"></script>
	</head>
	<body>
		<div class='roof-container'>
 			<%@ include file="header.jsp"%>
			<div class="main-container-scroll">
				<div class="main-container capacity">
					<div class="space-members distance-left">
					  <div class="distance-header" id="team-conversation-list">
					  </div>
					</div>
					<div class="task-container-scroll distance-center" >
						<div class="divstyle-start-comment" teamid="" id="judgeSpaceOrTeamConversation">
							<div class="subject-field">在这里发起一个话题</div>
							<div class="subject-field-pulldown">
								<input type="text" data-role="none" placeholder="标题" id="conversationTitle" class="required" maxlength="50">
								<div class="conversation-Emails">这里发起一个话题</div>
								<div contenteditable="true" name="saytext" id="conversationEmails" class="input-div saytext active "></div>

								<div class="emotion-line">
										<span class="emotion sicon-face25" title="添加表情"></span>
										<span  class="sicon-related clickShowMembers" title="@成员" status='conversation' data-toggle="dropdown" aria-expanded="false"></span>
										<span class="add-conversation-files sicon-file25" title="添加附件">
											<form enctype="multipart/form-data" method="post" id="f">
												<input type="file" data-role="none" class="files">
												<div id="conversationHiddenUUID"><input type="hidden" class="conversationuuid" value=""></div>
											</form>
										</span>
										<input type="button" class="comment_input_submit " value="提交" id="AddConversation">
										
										<ul class='dropdown-menu to-include-metion-member'>
									 		
								 		</ul>
										
										
								</div>
										<div id="uploadConversationfileList"></div>
								</div>
							
							
							
						</div>
							
						<div id="show-conversation-content-list">
						</div>
						
					</div>
					<div class="teams-list distance-right">
						<div class="space-members-header">大家都在看</div>
						<ul class="space-hot-topic" id="hot-conversation-list">
						</ul>
					</div>
				</div>
			</div>
			<!-- /.main-container -->
		</div>

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
		<!--添加任务模态框开始-->
		<!--添加新建团队模态框开始-->
		</div>
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
		
        <!-- 弹框信息 -->
		<script type="text/javascript" src="${ctxSurfond }/common/js-new/commonMethods.js?tsf=${varsion}"></script>
        <!--公共js方法和DOM操作-->
	    <script type="text/javascript" src="${ctxSurfond }/view/common_view.js?tsf=${varsion}"></script>
	    <!--公共工作台的Dom操作-->
	    <script type="text/javascript" src="${ctxSurfond }/common/js-new/workspace.js?tsf=${varsion}"></script>
	</body>
</html>