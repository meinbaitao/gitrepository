<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="modal-header">
	<ul class="nav nav-tabs" role="tablist">
		<li class="active" role="presentation" >
			<a id="userInfo" href="#Personage_Info" aria-controls="Workspace_Name" role="tab" data-toggle="tab">个人信息</a>
		</li>
	    <li class="remind-tag" role="presentation">
			<a id="subscriptionMenu" href="#Task_remind" aria-controls="member" role="tab" data-toggle="tab">提醒</a>
		</li>
		<li role="presentation">
			<a href="#Password_change" aria-controls="advanced" role="tab" data-toggle="tab">修改密码</a>
		</li>
	</ul>
</div>
<div class="modal-body">
	<div class="tab-content switch-container">
		<!-- 开始-修改工作空间标题 -->
		<div role="tabpanel" class="tab-pane active" id="Personage_Info">
			<form id="updateUserInfoForm" class="form-horizontal form-presentation" action="#" target="_top" method="post" >
				<input id="userPhotoFile" type="file" style="display: none;"/>
				<div class="form-group portrait-line">
					<label  class="col-sm-2 control-label">
						<span class="member-portrait">
							<img id="userPhotoImg" src="${ctxPath}${fns:getUser().photo}" onerror="this.src='${ctxSurfond }/common/images/photo_50.png'"  class="portrait" alt="logo">
						</span>
					</label>
					<div class="col-sm-10">
						<input type="button" class="btn btn-primary" id="userPhotoBtn" value="上传新头像">
					</div>
				</div>
				<div class="form-group">
					<label  class="col-sm-2 control-label">昵称</label>
					<div class="col-sm-10">
						<input type="text" class=" form-control" id="name" name="name" value="${fns:getUser().name }">
					</div>
				</div>
				<div class="form-group">
					<label  class="col-sm-2 control-label">用户名</label>
					<div class="col-sm-10">
						<input type="text" class=" form-control" readonly="readonly" id="loginName" name="loginName" value="${fns:getUser().loginName }">
					</div>
				</div>
					<div class="form-group">
						<label  class="col-sm-2 control-label">邮箱</label>
						<div class="col-sm-10">
							<input type="text" class=" form-control" id="email" name="email" value="${fns:getUser().email }" readonly="readonly" >
						</div>
					</div>


				<div class="form-group project-decoration">
					<label for="message-text" class="col-sm-2 control-label">描述</label>
					<div class="col-sm-10">
						<textarea class="form-control" id="remarks" name="remarks">${fns:getUser().remarks }</textarea>
					</div>
				</div>
           </form>
			<div class="form-group">
				<label for="message-text" class="col-sm-4 control-label">&nbsp;</label>
				<div class="botton col-sm-8">
					<button  class="btn-orange" id="updateUserInfoBtn">保存</button>
					<button  class="btn-gray" data-dismiss="modal" aria-label="Close">取消</button>
				</div>
			</div>

		</div>
		<div role="tabpanel" class="tab-pane " id="Task_remind">
			<div id="subscriptionItemsDiv">
			</div>
			<div class="botton col-sm-8 pull-right">
				<button  class="btn-orange" data-dismiss="modal" aria-label="Close">完成</button>
				<button class="btn-gray" data-dismiss="modal" aria-label="Close">取消</button>
			</div> 
		</div>
		 <!-- 项目提醒开关样式结束 -->
		<div role="tabpanel" class="tab-pane " id="Password_change">
			<form id="updatePasswordForm" class="form-horizontal form-presentation" action="#" target="_top" method="post">
				<div class="form-group">
					<label  class="col-sm-2 control-label">旧密码</label>
					<div class="col-sm-10">
						<input type="password" style="display: none;"/>
						<input type="password" class=" form-control" id="oldPassword" name="oldPassword"  placeholder="旧密码" />
					</div>
					<label  class="col-sm-2 visible-error control-label"></label>
					<label id="oldPasswordError"  class="col-sm-10 visible-error control-label"></label>
				</div>
				<div class="form-group">
					<label  class="col-sm-2 control-label">新密码</label>
					<div class="col-sm-10">
						<input type="password" class=" form-control" id="newPassword" name="newPassword"  placeholder="6-20位字符" />
					</div>
					<label  class="col-sm-2 visible-error control-label"></label>
					<label id="newPasswordError"  class="col-sm-10 visible-error control-label"></label>
				</div>
				<div class="form-group">
					<label  class="col-sm-2 control-label">确认密码</label>
					<div class="col-sm-10">
						<input type="password" class=" form-control" id="rePassword" name="rePassword"  placeholder="重复新密码" />
					</div>
					<label  class="col-sm-2 visible-error control-label"></label>
					<label id="rePasswordError"  class="col-sm-10 visible-error control-label"></label>
				</div>
			</form>				
			<div class="form-group">
				<label for="message-text" class="col-sm-4 control-label">&nbsp;</label>
				<div class="botton col-sm-8">
					<button  class="btn-orange" id="updatePasswordBtn">保存</button>
					<button  class="btn-gray" data-dismiss="modal" aria-label="Close">取消</button>
				</div>
			</div>

		</div>

	</div>
</div>