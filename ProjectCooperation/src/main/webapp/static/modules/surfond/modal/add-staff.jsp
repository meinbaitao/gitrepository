<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="modal-header">
  添加员工
</div>
<div class="modal-body">
  <form class="form-horizontal" target="_top" method="post">
    <div class="form-group">
     <!--  <label  class="col-sm-2 control-label name">名字</label>
      <div class="col-sm-10">
        <input type="text" class=" form-control name" id="addNewTeamName" maxlength="50" name="title"  data-role="none">
      </div>
    </div> -->
    <div class="form-group">
      <label  class="col-sm-2 control-label name">邮箱</label>
      <div class="col-sm-9">
        <input type="text" class=" form-control name" id="invite-email" placeholder="请输入用户邮箱" maxlength="50" name="title"  data-role="none">
      </div>
      <div class="col-sm-9">
      	<span style="margin-left: 100px;color:red;	position: absolute;font-size: 14px; top: -3px;left: 22px;" id="organize-show-add-member-error"></span>
      </div>
    </div>
    <div class="form-group">
      <label  class="col-sm-2 control-label name">部门</label>
		<div class="col-sm-9 dropdown-div">
        	<div class=" form-control name invite-organize-id" id="invite-organize-id"></div>
        	<span class="add-members" data-toggle="modal" title="选择部门" data-target="#Add-Department" href="${ctxSurfond}/modal/Add-Department.html"  data-dismiss="modal" aria-label="Close">+</span>
      	</div>
      </div>
    </div>
  </form>
   <div class="form-group">
	 <label for="message-text" class="col-sm-4 control-label">&nbsp;</label>
	 <div class="botton col-sm-7">
		 <button  class="btn-orange" id="invite-user-to-space-organize">保存</button>
	 	 <button  class="btn-gray " id="cancel-invite-user-to-space-organize" data-dismiss="modal" aria-label="Close">取消</button>
									  
	 </div>
  </div>
</div>