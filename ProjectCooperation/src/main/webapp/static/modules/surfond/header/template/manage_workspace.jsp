<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- <div class="modal-header bb">
    空间设置
</div>
<div class="modal-body">

            <form class="form-horizontal" id="editSpaceForm" target="_top">
                <div class="form-group ">
                    <label  class="col-sm-2 control-label name">标题</label>
                    <div class="col-sm-10">
                        <input type="text" maxlength="50" class=" form-control project-name" name="title"  data-role="none">
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
                    <button  class="btn-orange" id="editSpaceBtn">保存</button>
                    <button  class="btn-gray" id="editSpaceBtnClose" data-dismiss="modal" aria-label="Close">取消</button>
                </div>
            </div>

</div> -->
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
                        <input type="text" maxlength="50" class=" form-control project-name" name="title"  data-role="none">
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
                    <button  class="btn-orange" id="editSpaceBtn">保存</button>
                    <button  class="btn-gray" data-dismiss="modal" aria-label="Close">取消</button>
                </div>
            </div>
		</div>
		<!-- 结束-修改项目详细信息 -->
<!-- 		<div role="tabpanel" class="tab-pane project-member " id="Space-member" style="overflow: auto;">
			<div class="row invite">
				<label  class="col-sm-2 control-label ">邀请成员</label>
				<div class='col-sm-10'>
					<div class='invite-members-list'>
						<input id="inviteSpaceMember" type="text" name="userEmails" class="invivte-member" placeholder="输入好友邮箱快速查找，回车确定">
						<div class='cursor-text'></div>
					</div>
				</div>
				
			</div>
			<div class="row title">
				<div class="col-md-4">成员列表</div>
				<div class="col-md-7">邮箱</div>
				<div class="col-md-1"></div>
			</div>
			<div id="spaceMemberItemsDiv" class="member_list">
			</div>
		</div> -->
	</div>
</div>