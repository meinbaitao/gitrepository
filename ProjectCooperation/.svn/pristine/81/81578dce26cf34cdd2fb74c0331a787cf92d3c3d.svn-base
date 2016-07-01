
var bookmarkView = {};




/**
 * 组装收藏列表
 */
bookmarkView.bookmarkList = function(k, v){
	var htmlStr  = "";
		htmlStr += "<li class='member-group'>";
		htmlStr += "	<span class='group-info show-this-bookmark-list' bookmark-type='"+v.type+"'>";	
		htmlStr += "		<span class='triangle-left'></span>";		
		htmlStr += "		<span class='group-title' title='"+v.title+"'>"+v.title+"</span>";		
		htmlStr += "		<span class='member-number member-count'>(<span id='bookmark-group-type-"+v.type+"'>"+v.count+"</span>)</span>";	
		htmlStr += "	</span>";	
		htmlStr += "	<ul class='group-members this-bookmark-member'></ul>";
		htmlStr += "</li>";
	return htmlStr;
}


/**
 * 显示收藏类型列表里的数据
 */
bookmarkView.showTypeMemberList = function(k,v){
	var spaceId = $("#checkedSpace").attr("space-id");
	var teamId = "";
	if(v.teamId){
		if(spaceId!=v.teamId){
			teamId = v.teamId;
		}
	}
	var htmlStr = "";
		htmlStr += "<li class='bookmark-object-each' type='"+v.type+"' title='"+v.title+"' resource-id='"+v.id+"' teamid='"+teamId+"'>";
		htmlStr += "	<span class='cancel-bookmark-each sicon-star' type='"+v.type+"' resource-id='"+v.id+"' title='取消收藏'></span>";	
		htmlStr += "	<span class='project-title' title='"+v.title+"'>"+startUp.subStr(v.title,30)+"</span>";	
		htmlStr += "</li>";
	return htmlStr;
}


bookmarkView.showBookmarkTagsWeb = function(){
	var htmlStr  = "";
		htmlStr += "<div class='right-container'>";
		htmlStr += "	<div class='right-container-scroll'>";
		htmlStr += "		<div class='project-container'>";
		htmlStr += "			<div class='project-container-head'>";
		htmlStr += "				<div class='operate-nav'>";
		htmlStr += "					<div class='project-choice' id='checkedTags'>";
		htmlStr += "						<span class='project-title' >标签名称</span>";
		htmlStr += "						<div class='dropdown' style='display: none;'>";
		htmlStr += "							<span class='sicon-dropdown' data-toggle='dropdown'></span>";
		htmlStr += "							<ul class='dropdown-menu' aria-labelledby='task_cheron2' >";
		htmlStr += "								<li class='delete-tags'>删除标签</li>";
		htmlStr += "							</ul>";
		htmlStr += "						</div>";
		htmlStr += "					</div>";
		htmlStr += "					<div class='operate-btn-nav'>";
		htmlStr += "						<span class='sicon-task' panels-target='.list-container-nav' title='任务列表'></span>";
		htmlStr += "						<span class='sicon_fullScreen' title='全屏显示任务栏'></span>";
		htmlStr += "					</div>";
		htmlStr += "				</div>";
		htmlStr += "			</div>";
		htmlStr += "			<div class='task-list-container'>";
		htmlStr += "				<div class='panels  current list-container-nav spacing'>";
		htmlStr += "					<div class='list-container-fnav '>";
		htmlStr += "						<div class='task-operate'>";
		htmlStr += "							<div class='task-filter'>";
		htmlStr += "								<span id='tagsUnDoneTaskList' title='只看未完成的任务'>只看未完成</span>";
		htmlStr += "								<span id='tagsDoneTaskList' title='只看已完成的任务'>只看已完成</span>";
		htmlStr += "								<span id='tagsAllTaskList' title='所有的任务' class='checked'>所有</span>";
		htmlStr += "							</div>";
		htmlStr += "						</div>";
		htmlStr += "					<div class='list-container '>";
		htmlStr += "					<table>";
		htmlStr += "						<tbody id='taskItemsTbody'>";
		htmlStr += "						</tbody>";
		htmlStr += "					</table>";
		htmlStr += "					</div>";
		htmlStr += "				</div>";
		htmlStr += "			</div>";
		htmlStr += "			<div class='panels task-calendar  ' >";
		htmlStr += "				<div class='task_calendar_content'>";
		htmlStr += "					<div id='calendar'></div>";
		htmlStr += "				</div>";
		htmlStr += "			</div>";
		htmlStr += "			<div class='panels task-file'>";
		htmlStr += "				<div class='toolbar'></div>";
		htmlStr += "				<div class='task-file-content' id='attachmentOfProject'>";
		htmlStr += "					<div class='files file-doc'></div>";
		htmlStr += "				</div>";
		htmlStr += "			</div>";
		htmlStr += "		</div>";
		htmlStr += "	</div>";
		htmlStr += "</div>";
		htmlStr += "</div>";
	return htmlStr;
}


bookmarkView.showBookmarkProjectWeb = function(){
	var htmlStr  = "";
		htmlStr += "<div class='right-container'>";
		htmlStr += "	<div class='right-container-scroll' id=''>";
		htmlStr += "		<div class='project-container'>";
		htmlStr += "			<div class='project-container-head'>";
		htmlStr += "				<div class='operate-nav'>";
		htmlStr += "					<div class='project-choice' id='checkedProject' project-id=''>";
		htmlStr += "						<span class='project-title' >项目名称</span>";
		htmlStr += "						<div class='dropdown' style='display: none;'>";
		htmlStr += "							<span class='sicon-dropdown' data-toggle='dropdown'></span>";
		htmlStr += "							<ul class='dropdown-menu' aria-labelledby='task_cheron2' >";
		htmlStr += "								<li class='project-details' shref='${ctxSurfond}/modal/Manage_project.html'>详情</li>";
		htmlStr += "								<li class='favorite-project'>添加收藏</li>";
		htmlStr += "								<li class='doArchive-project'>添加存档</li>";
		htmlStr += "								<li class='unArchive-project'>取消存档</li>";
		htmlStr += "								<li class='delete-project'>删除项目</li>";
		htmlStr += "								<li class='delete-tags'>删除标签</li>";
		htmlStr += "								<li data-toggle='modal' data-target='#CopyProject' href='${ctxSurfond}/modal/CopyProject.html'>复制项目</li>";
		htmlStr += "							</ul>";
		htmlStr += "						</div>";
		htmlStr += "					</div>";
		htmlStr += "					<div class='operate-btn-nav'>";
		htmlStr += "						<span class='sicon-task' panels-target='.list-container-nav' title='任务列表'></span>";
		htmlStr += "						<span class='sicon-calendar ' id='modelTaskCalendar' panels-target='.task-list-container .task-calendar'  title='日程'></span>";
		htmlStr += "						<span class='sicon-file' title='查看项目附件' id='modelTaskAttachment' panels-target='.task-list-container .task-file'></span>";
		htmlStr += "						<span class=' sicon_fullScreen' title='全屏显示任务栏'></span>";
		htmlStr += "					</div>";
		htmlStr += "				</div>";
		htmlStr += "			</div>";
		htmlStr += "			<div class='task-list-container' id='show-bookmark-which-task'>";
		htmlStr += "				<div class='panels  current list-container-nav'>";
		htmlStr += "					<div class='add-task-nav'>";
		htmlStr += "						<textarea id='taskTitleInput' type='text' placeholder='提交新任务，直接@任务责任人，Enter快速提交' ></textarea>";
		htmlStr += "						<span class='add-task-nav-btn'></span>";
		htmlStr += "					</div>";
		htmlStr += "					<div class='list-container-fnav '>";
		htmlStr += "						<div class='task-operate'>";
		htmlStr += "							<div class='task-filter'>";
		htmlStr += "								<span id='unDoneTaskList' title='只看未完成的任务'>只看未完成</span>";
		htmlStr += "								<span id='doneTaskList' title='只看已完成的任务'>只看已完成</span>";
		htmlStr += "								<span id='createTaskList' title='只看我创建的任务'>只看我创建</span>";
		htmlStr += "								<span id='ownerTaskList' title='只看我负责的任务'>只看我负责</span>";
		htmlStr += "								<span id='allTaskList' title='所有的任务' class='checked'>所有</span>";
		htmlStr += "							</div>";
		htmlStr += "						</div>";
		htmlStr += "					<div class='list-container '>";
		htmlStr += "						<table>";
		htmlStr += "							<tbody id='taskItemsTbody'></tbody>";
		htmlStr += "						</table>";
		htmlStr += "					</div>";
		htmlStr += "				</div>";
		htmlStr += "			</div>";
		htmlStr += "			<div class='panels task-calendar  ' >";
		htmlStr += "			<div class='task_calendar_content'>";
		htmlStr += "			<div id='calendar'></div>";
		htmlStr += "		</div>";
		htmlStr += "	</div>";
		htmlStr += "	<div class='panels task-file'>";
		htmlStr += "		<div class='toolbar'></div>";
		htmlStr += "		<div class='task-file-content' id='attachmentOfProject'>";
		htmlStr += "	</div>";
		htmlStr += "</div>";
		htmlStr += "</div>";
		htmlStr += "</div>";
		htmlStr += "</div>";
		htmlStr += "</div>";
	return htmlStr;
}



