<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="modal-header">
   创建项目
</div>
<div class="modal-body">
  <form class="form-horizontal" id="newProjectQuickForm" target="_top" method="post">
    <input type="hidden" name="spaceId" value="${checkedSpace.id }">
    <div class="form-group">
      <label  class="col-sm-2 control-label name">项目名字</label>
      <div class="col-sm-10">
        <input type="text" class=" form-control name" maxlength="50" name="title"  data-role="none">
      </div>
    </div>
    <div class="form-group">
      <label for="message-text" class="col-sm-2 control-label name">描述</label>
      <div class="col-sm-10">
        <textarea class="form-control text" id="message-text" maxlength="255" name="description" data-role="none"></textarea>
      </div>
    </div>
  </form>
   <div class="form-group">
	 <label for="message-text" class="col-sm-4 control-label">&nbsp;</label>
	 <div class="botton col-sm-8">

		 <button  class="btn-orange" id="newProjectQuickBtn">保存</button>
	 	 <button  class="btn-gray "  data-dismiss="modal" aria-label="Close">取消</button>
										  
	 </div>
  </div>
</div>


