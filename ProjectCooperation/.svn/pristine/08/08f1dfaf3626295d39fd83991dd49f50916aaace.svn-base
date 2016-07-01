<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<div class="modal-header">
  新建团队
</div>
<div class="modal-body">
  <form class="form-horizontal" target="_top" method="post">
    <div class="form-group">
      <label  class="col-sm-2 control-label name">团队名字</label>
      <div class="col-sm-10">
        <input type="text" class=" form-control name" id="addNewTeamName" maxlength="50" name="title"  data-role="none">
      </div>
    </div>
    <div class="form-group">
      <label  class="col-sm-2 control-label name">负责人</label>
      <div class="col-sm-10">
      	<div id="newTeamResponsible" type="text" class="form-control"></div>
        
        <span class='add-members-sign' title="选择负责人" data-toggle="modal"  data-dismiss="modal" aria-label="Close">+</span>
      </div>
    </div>
    <div class="form-group">
      <label  class="col-sm-2 control-label name">成员</label>
      <div class="col-sm-10">
        <div class="velocity">
               <div id='members-list' type="text" class="form-control"></div>
               <span  class='add-members' title="选择成员" data-dismiss="modal" aria-label="Close">+</span>
            </div>
      </div>
    </div>
  </form>
   <div class="form-group">
	 <div class="botton col-sm-12">
		 <button  class="btn-orange" id="submitNewTeamInfo">保存</button>
	 	 <button  class="btn-gray " data-dismiss="modal" aria-label="Close">取消</button>										  
	 </div>
  </div>
</div>