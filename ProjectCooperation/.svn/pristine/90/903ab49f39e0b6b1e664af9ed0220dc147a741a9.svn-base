<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<div class="modal-header">
	<ul class="nav nav-tabs link" role="tablist">
		<li class="active"  role="presentation" ><a id="spaceInfoMenu" href="#Space_details" aria-controls="Space_details" role="tab" data-toggle="tab" >空间设置</a></li>
		<!-- <li  role="presentation"><a id="spaceMemberMenu" href="#Space-member" aria-controls="Space-member" role="tab" data-toggle="tab" >成员管理</a></li> -->
	</ul>
</div>
<div class="modal-body">
	
	<!-- Tab panes -->
	<div class="tab-content">
		<!-- 开始-修改项目详细信息 -->
		<div role="tabpanel" class="tab-pane active" id="Space_details">
			<form class="form-horizontal" id="editSpaceForm" target="_top">
                <div class="form-group ">
                    <label  class="col-sm-2 control-label name">标题</label>
                    <div class="col-sm-10">
                        <input type="text" maxlength="50" readonly="readonly" class=" form-control project-name" name="title"  data-role="none">
                    </div>
                </div>
                <!--<div class="form-group">
					<label  class="col-sm-2 control-label name">负责人</label>
					<div class="col-sm-10">
						<input type="text" maxlength="50" class=" form-control project-name" readonly="readonly" name="user.name" value="${checkedSpace.user.id }" data-role="none">                                                                                     
					</div>
				</div> -->
                <div class="form-group project-decoration">
                    <label for="message-text" class="col-sm-2 control-label name">描述</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" readonly="readonly" maxlength="255" id="message-text" name="description" data-role="none"></textarea>
                    </div>
                </div>
            </form>
            <div class="form-group">
                <label for="message-text" class="col-sm-4 control-label">&nbsp;</label>
                <div class="botton col-sm-8">
                    <button  class="btn-orange" data-dismiss="modal" aria-label="Close">确定</button>
                </div>
            </div>
		</div>
	</div>
</div>