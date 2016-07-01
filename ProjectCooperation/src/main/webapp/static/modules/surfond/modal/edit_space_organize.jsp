<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<div class="modal-header">
	<ul class="nav nav-tabs link" role="tablist">
		<li class="active"  role="presentation" id="space-organize-base-info"><a id="projectInfoMenu" class="default-selected" href="#Project_details" aria-controls="Project_details" role="tab" data-toggle="tab" >部门详情</a></li>
	</ul>
</div>
<div class="modal-body">
	<!-- Tab panes -->
	<div class="tab-content">
	
		<div role="tabpanel" class="tab-pane active" id="Project_details">
			<form id="editProjectForm" class="form-horizontal" target="_top" method="post">
				<div class="form-group ">
					<label  class="col-sm-2 control-label">部门名称</label>
					<div class="col-sm-10">
						<input type="text" maxlength="15" id="edit-organize-name" class=" form-control project-name" name=""  >
					</div>
				</div>
				<div class="form-group">
					<label  class="col-sm-2 control-label">创建者</label>
					<div class="col-sm-10">
						<input type="text" class=" form-control" id="edit-organize-creater" readonly="readonly" name="" >
					</div>
				</div>
				<div class="form-group">
					<label  class="col-sm-2 control-label">负责人</label>
					<div class="col-sm-10">
				      	<div id="space_Responsible" type="text" class="form-control"></div>
				        <span class='space_members_sign'  data-toggle="modal" data-target="#Add-Director" href="${ctxSurfond}/modal/Add-Director.html"  data-dismiss="modal" aria-label="Close">+</span>
				    </div>
				</div>
			</form>
			<div class="form-group">
				<label for="message-text" class="col-sm-2 control-label">&nbsp;</label>
				<div class="botton">
					<button  class="btn-orange" id="submit-to-edit-oragnize">保存</button>
					<button  class="btn-gray" data-dismiss="modal" aria-label="Close">取消</button>
				</div>
			</div>
		</div>
	</div>
</div>