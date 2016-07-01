<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="modal-header">
	创建新空间
</div>
<div class="modal-body">
	<form id="newSpaceForm" class="form-horizontal" target="_top">
		<div class="form-group">
			<label  class="col-sm-2 control-label name">标题</label>
			<div class="col-sm-10">
				<input type="text" maxlength="50" class=" form-control project-name" name="title" data-role="none">                                            
			</div>
		</div>
		<div class="form-group">
			<label  class="col-sm-2 control-label name">负责人</label>
			<div class="col-sm-10">
				<input type="text" maxlength="50" class=" form-control project-name" readonly="readonly" name="user.name" value="${fns:getUser().name }" data-role="none">                                            
				<input type="hidden"  class=" form-control project-name" name="user.id" value="${fns:getUser().id }" data-role="none">                                            
			</div>
		</div>
		<div class="form-group project-decoration">
			 <label for="message-text" class="col-sm-2 control-label name">描述</label>
				<div class="col-sm-10">
					<textarea class="form-control" maxlength="255" id="message-text" name="description" data-role="none"></textarea>
				</div>
		</div>

	</form>
	<div class="form-group">
		<label for="message-text" class="col-sm-4 control-label">&nbsp;</label>
			<div class="botton col-sm-8">
				<button  class="btn-orange" id="newSpaceBtn">保存</button>
				<button  class="btn-gray" data-dismiss="modal" aria-label="Close">取消</button>
			</div>
	</div>
	
</div>
