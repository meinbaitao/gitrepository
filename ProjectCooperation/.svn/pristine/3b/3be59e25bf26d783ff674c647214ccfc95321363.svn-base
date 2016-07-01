<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="modal-header">
	<ul class="nav nav-tabs link" role="tablist">
		<li class="active"  role="presentation" ><a id="projectInfoMenu" class="default-selected" href="#Project_details" aria-controls="Project_details" role="tab" data-toggle="tab" >基本信息</a></li>
		<li  role="presentation"><a id="projectMemberMenu" href="#Project-member" aria-controls="Project-member" role="tab" data-toggle="tab" >成员管理</a></li>
	</ul>
</div>
<div class="modal-body">
	
	<!-- Tab panes -->
	<div class="tab-content">
		<!-- 开始-修改项目详细信息 -->
		<div role="tabpanel" class="tab-pane active" id="Project_details">
			<form id="editProjectForm" class="form-horizontal" target="_top" method="post">
				<input type="hidden" name="id" />
				<div class="form-group ">
					<label  class="col-sm-2 control-label">项目名字</label>
					<div class="col-sm-10">
						<input type="text" maxlength="50" class=" form-control project-name" name="title"  >
					</div>
				</div>
				<div class="form-group">
					<label  class="col-sm-2 control-label">项目创建者</label>
					<div class="col-sm-10">
						<input type="text" class=" form-control" readonly="readonly" name="creator" >
					</div>
				</div>
				<div class="form-group">
					<label  class="col-sm-2 control-label">项目负责人</label>
					<div class="col-sm-10">
						<input type="text" class=" form-control project-who" name="responsible" >
					</div>
				</div>
				<div class="form-group project-decoration">
					<label for="message-text" class="col-sm-2 control-label">描述</label>
					<div class="col-sm-10">
						<textarea class="form-control" maxlength="255" id="message-text" name="description"></textarea>
					</div>
				</div>
			</form>
			<div class="form-group">
				<label for="message-text" class="col-sm-2 control-label">&nbsp;</label>
				<div class="botton">
					<button  class="btn-orange" id="editProjectBtn">保存</button>
					<button  class="btn-gray" data-dismiss="modal" aria-label="Close">取消</button>
				</div>
			</div>
		</div>
		<!-- 结束-修改项目详细信息 -->
		<div role="tabpanel" class="tab-pane project-member " id="Project-member">
			<div class="row invite invite-member-inpput-team-or-space-project">
				<!-- <label  class="col-sm-2 control-label ">邀请成员</label> -->
				<div class='col-sm-12'>
					<div class='invite-members-list'>
						<input id="inviteProjectMember" type="text" name="userEmails" class="invivte-member" placeholder="输入好友名称快速查找">
						<div class='cursor-text'></div>
					</div>
				</div>
				
			</div>
			<input type="hidden" id="projectCreateById" />
			<input type="hidden" id="projectOwnerId" />
			<div class="row title">
				<div class="col-md-3">成员列表</div>
				<div class="col-md-4">邮箱</div>
				<div class="col-md-2">角色</div>
				<div class="col-md-1" id="project-option-list">操作</div>
			</div>
			<div id="projectMemberItemsDiv" class="member_list" >
			</div>
		</div>
	</div>
</div>