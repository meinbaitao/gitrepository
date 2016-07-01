<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<div class="modal-header">
	<ul class="nav nav-tabs link" role="tablist">
		<li class="active"  role="presentation" ><a id="projectInfoMenu" class="default-selected" href="#Project_details" aria-controls="Project_details" role="tab" data-toggle="tab" >基本信息</a></li>
		<!-- <li  role="presentation"><a id="space-team-member" href="#Project-member" aria-controls="Project-member" role="tab" data-toggle="tab" >成员管理</a></li> -->
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
					<label  class="col-sm-2 control-label">团队名称:</label>
					<div class="col-sm-10">
						<input type="text" maxlength="50" id="modal-team-name" class=" form-control project-name" name=""  >
					</div>
				</div>
				<div class="form-group">
					<label  class="col-sm-2 control-label">创 建 者:</label>
					<div class="col-sm-10">
						<input type="text" class=" form-control" id="modal-team-creater" readonly="readonly" name="" >
					</div>
				</div>
				<div class="form-group">
					<label  class="col-sm-2 control-label">负 责 人:</label>
					<div class="col-sm-10">
				      	<div id="team_Responsible" type="text" class="form-control"></div>
				        <span class='team_members_sign'  data-toggle="modal" data-target="#Add-Director" href="${ctxSurfond}/modal/Add-Director.html"  data-dismiss="modal" aria-label="Close">+</span>
				    </div>
				</div>
			</form>
			<div class="form-group">
				<label for="message-text" class="col-sm-2 control-label">&nbsp;</label>
				<div class="botton">
					<button  class="btn-orange" id="submit-modal-team-info">保存</button>
					<button  class="btn-gray" data-dismiss="modal" aria-label="Close">取消</button>
				</div>
			</div>
		</div>
		<!-- 结束-修改项目详细信息 -->
		<!-- <div role="tabpanel" class="tab-pane project-member " id="Project-member">
			<div class="row invite">
				<label  class="col-sm-2 control-label ">邀请成员</label>
				<div class='col-sm-12'>
					<div class='invite-members-list' id="modal-invite-members-list">
						<input id="modal-invite-team-member" type="text" name="userEmails" class="invivte-member" placeholder="输入好友邮箱快速查找，回车确定">
						<div class='cursor-text'></div>
					</div>
				</div>
			</div>
			<div class="row title">
				<div class="col-md-4">成员列表</div>
				<div class="col-md-7">邮箱</div>
				<div class="col-md-1"></div>
			</div>
			<div id="show-space-team-member-list" class="member_list" >
			</div>
		</div> -->
	</div>
</div>