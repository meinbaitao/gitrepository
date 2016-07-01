<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="task-details has-remind" id="task_details">
	<div class='hideMenu-btn sicon-hideMenu'>></div>
	<div class='task-responsible-section'>
		<div class='task-responsible'>
			<ul id="responsible-log" class="task-responsible-log" >
				<li class="appoint-next"><div class="members"></div><div class="log-info"><span class="name">下一个</span></div></li>
			</ul>
		</div>
		<div class="remind-nav">这里可以查看任务责任人记录，点击下一个可以将任务指派给下一个成员</div>
	</div>
	<!-- \.task-responsible-section -->
	<div class="toolbar">
		<div class="operate-tags">
			<span class="operate-tag project-belong" data-toggle="dropdown">
				<span class="sicon-project18 gray"></span>
				<div class="dropdown">
					<span class="project-replace"></span>
					<span data-toggle="dropdown" class="project-eidt-click hide "></span>
					<ul class="project-choice dropdown-menu" id="taskProjectItemsUl">
					</ul>
				</div>
			</span>
			<!-- <span class="dropdown operate-tag">
				<span data-toggle="dropdown" class="project-belong">
					<span class="sicon-project18 gray"></span>
					<span>abc</span>
				</span>
				<ul class="dropdown-menu" id="taskProjectItemsUl">
					<li>aaaaaaaaa</li>
					<li>aaaaaaaaa</li>
					<li>aaaaaaaaa</li>
					<li>aaaaaaaaa</li>
				</ul>
			</span> -->
			<span class="appoint operate-tag"><span class="sicon-user"></span></span>
			<span class="deadline operate-tag">
				<span class="sicon-calendar16"></span>
				<span thtml="截止日期" class="Wdate set" id="task-complete-date"></span>
			</span>
			<span title="添加任务标记" class="operate-tag" id="add-task-tags"><span class="sicon-tags"></span>添加标签</span>
			<span title="点个赞" class="operate-tag praiseTask"><span class="sicon-thumbs-empty"></span></span>
			<span title="删除" class="operate-tag deleteTask" > <span class="sicon-delete"></span>删除</span>
			<span href="${ctxSurfond}/modal/CopyTask.html" data-target="#CopyTask" data-toggle="modal">
				<span style="color: #6D7981;margin-right: 7px;" class="glyphicon glyphicon-copy"></span>
				任务复制
			</span>
		</div>
	</div>
	<!-- \.toolbar -->
	
	<div class='task-details-container'>
		<div class="selected-tags-parents">
			<div class="selected-tags" id="selected-tags"  style="display: block;">
			</div>
		</div>
		<div class="task-details-info">
			<div class="task-detail-title">
				<div class="task-complete-mark ">
					<div class="task-uncomplete big completed detailTaskStatus" title="取消标记"></div>
					<div class="task-complete"></div>
				</div>
				<div contenteditable="true" class="taskTitle" ></div>
			</div>
			<div class="task-description">
				<div contenteditable="true" class="task-des-content" original="">输入任务描述！</div>
			</div>
		</div>
		<ul class="nav nav-tabs comment-log-switch" role="tablist">
			<li role="presentation" class="active"><a id="task-comment-list" href="#task-comment" aria-controls="task-comment" role="tab" data-toggle="tab">评论</a></li>
			<li role="presentation" id="subTaskList"><a href="#subtask-list-container" aria-controls="subtask-list-container" role="tab" data-toggle="tab">子任务<span class="number">(0)</span></a></li>
			<li role="presentation" id="task-attachment-list" ><a href="#task-file-list-nav" aria-controls="task-file-list-nav" role="tab" data-toggle="tab">附件<span id="thisAttachmentCount" class="number">(1)</span></a></li>
			<li role="presentation" id="taskRecord"><a href="#task_operatLog" aria-controls="task_operatLog" role="tab" data-toggle="tab">记录</a></li>
		</ul>
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane comment-lists active modal-show-this-task-comment-list" id="task-comment">
			</div>
			<div role="tabpanel" class="tab-pane task-list-container " id="subtask-list-container">
				<table class="subTasklist" >
					<thead>
						<tr>
							<td class="subTasklist-thead">
								<input type="text" id="SubtaskTitleInput" placeholder="创建子任务，Enter快速提交" maxlength="50">
								<span class="add-subtask-btn"></span>
							</td>
						</tr>
					</thead>
					<tbody id="subTaskItemsTbody">
					</tbody>
				</table>
			</div>
			
			<div id="task-file-list-nav" role="tabpanel" class="tab-pane task-file-list-nav ">
				<span class="add-task-file" id="add-task-file-upload"><span>+</span>添加附件</span>
				<div  class="task-file-list ">
					<div id="uploadTaskFileForm"></div>
					<div class="file-list ">
						<div class="file-images" id="show-task-attachment-list">
						</div>
					</div>
				</div>
			</div>
			<ul id="task_operatLog" role="tabpanel" class="task_operatLog tab-pane log-task-container  ">
			</ul>
		</div>
	</div>
	<!-- \.task-details-container -->
	
	<div class="comment-input-content">
		<span  class="comment-input-spread"><span class="topward"></span> </span>
		<div class="task-comment-input saytext" id="task-comment-description" name="saytext" contenteditable="true"></div>
		<div class="task-comment-input-submit">
			<span class="emotion sicon-face" ></span>
			<span class="sicon-related clickShowMembers" status='1'></span>
			<span class='sicon-file' id='add-task-attachment-input' title='添加附件'>
				<form enctype='multipart/form-data' method='post' >
					<input type='file' data-role='none' class='files' style='display:none;'>
					<div ><input type='hidden' class='taskuuid' id="task-attachment-uuid" value=''></div>
				</form>
			</span>
			<button id="submit-task-comment">发送</button>
		</div>
		<div id="submit-task-comment-attachment"></div>
	</div>
	<!-- \.comment-input-content -->
</div>




