<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class='mainnav'>
		<div class='work-space dropdown'>
			<div class='space-name' id="checkedSpace" space-id="${checkedSpace.id }" createById="${checkedSpace.createBy.id }" ownerId="${checkedSpace.user.id }" data-toggle='dropdown' title="切换空间">${checkedSpace.title }</div>
			<span class='sicon-dropdown white' data-toggle='dropdown'></span>
			<div class="dropdown-menu">
				<ul class='space-list' id="spaceItemsUl">
				</ul>
				<ul class='space-setting'>
					<c:choose>
					   <c:when test="${checkedSpace.user.id eq fns:getUser().id }">  
						     <li data-toggle="modal" data-target="#Manage_Workspace" href="${ctxSurfond}/header/template/manage_workspace.jsp">空间设置<span class='sicon-setting'></span></li>    
					   </c:when>
					   <c:otherwise> 
							 <li data-toggle="modal" data-target="#Manage_Workspace" href="${ctxSurfond}/header/template/view_workspace.jsp">空间设置<span class='sicon-setting'></span></li>    
					   </c:otherwise>
					</c:choose>
					<li data-toggle="modal" data-target="#New_Workspace" href="${ctxSurfond}/header/template/new_workspace.jsp">新建空间<span class='sicon-addSpace'></span></li>
				</ul>
			</div>
		</div>
		<div class="left-sidebar">
		
		<input id="menuType" type="hidden" value="${menuType }" />
		
			<ul class='topmenu'>
				<li class='<c:if test="${menuType eq 'workspace' or  menuType eq 'organizational' }">current</c:if>' title='查看工作台'>
					<a href="${ctx}/index?menuType=workspace&spaceId=${checkedSpace.id}">工作台</a>
				</li>
				<li class='<c:if test="${menuType eq 'project' }">current</c:if>' title='查看项目'>
					<a href="${ctx}/index?menuType=project&spaceId=${checkedSpace.id}">项目</a>
				</li>
				<%-- <li class='<c:if test="${menuType eq 'chart' }">current</c:if>'  title='查看报表'>
					<a href="${ctx}/index?menuType=chart&spaceId=${checkedSpace.id}">进度表</a>
				</li> --%>
				<li class='<c:if test="${menuType eq 'theme' }">current</c:if>' title='查看话题'>
					<a href="${ctx}/index?menuType=theme&spaceId=${checkedSpace.id}">话题</a>
				</li>
				<li class='<c:if test="${menuType eq 'calendar' }">current</c:if>' title='查看日程'>
					<a href="${ctx}/index?menuType=calendar&spaceId=${checkedSpace.id}">日程</a>
				</li>
				<li class='<c:if test="${menuType eq 'tags' }">current</c:if>' title="查看标签">
					<a href="${ctx}/index?menuType=tags&spaceId=${checkedSpace.id}">标签</a>
				</li>
				<li class='<c:if test="${menuType eq 'bookmark' }">current</c:if>' title="查看收藏夹">
					<a href="${ctx}/index?menuType=bookmark&spaceId=${checkedSpace.id}">收藏夹</a>
				</li>
			</ul>
			
		
	</div>
	<div class='shortcut dropdown' >
			<span class='sicon-shortcut' data-toggle='dropdown' title='快捷操作'></span>
			<ul class='dropdown-menu'>
				<li data-toggle="modal" data-target="#omnibutton_task" href="${ctxSurfond}/header/template/omnibutton_task.jsp">
					添加任务
				</li>
				<li data-toggle="modal" data-target="#omnibutton_project" href="${ctxSurfond}/header/template/omnibutton_project.jsp">
					添加项目
				</li>
				<li data-toggle="modal" data-target="#omnibutton_converse" href="${ctxSurfond}/modal/omnibutton_converse.html">
					添加话题
				</li>
			</ul>
	</div>
	<div class="right-sidebar">
	
		<div class='website-search dropdown'>
			<input type="text" placeholder=''>
			<ul class='dropdown-menu'>
				
			</ul>
		</div>
		<div class="dropdown info">
			<span class='sicon-message' id="checkMessage" data-toggle='dropdown' title='查看通知'></span>
			<div class="dropdown-menu information-center" >
				<div class='sicon-top-triangle'></div>
				<div class='header-nav'>
					消息中心
					<span class='info-numbers'><b>0</b> 条未读，<span class='set-read'>全部标为已读</span></span>
				</div>
				<div class='info-lists' id="messageItemsDiv">

				</div>
			</div>
		</div>
		<div class='user-info dropdown' id="checkedUser" user-id="${fns:getUser().id }" >
			<span class='user-name' title='${fns:getUser().name }'>${fns:getUser().name }</span>
			<img src="${ctxPath}${fns:getUser().photo}" data-toggle='dropdown' onerror="this.src='${ctxSurfond }/common/images/photo_40.png'" title="个人设置">
			<ul class="dropdown-menu" aria-labelledby="task_cheron2">
				<!-- <li id="personage_setting_btn">个人设置</li> -->
				<li id="personage_setting_btn" data-toggle="modal" data-target="#personage_setting" href="${ctxSurfond}/header/template/personage_setting.jsp">个人设置</li> 
				<li id="logout">安全退出</li>
			</ul>
		</div>
	</div>
</div>
<!--个人设置模态框开始-->
<div class="modal mymodal fade personage-setting" id="personage_setting" tabindex="-1" role="dialog" aria-labelledby="personage_setting">
	<div class="modal-dialog" role="document">
		<div class="modal-content">	
		</div>
	</div>
</div>
<!--个人设置模态框结束-->

<a href="http://form.mikecrm.com/f.php?t=Qx1Wco" target="_Blank" style="position:fixed;z-index:999;right:-6px;bottom: 150px;display: inline-block;width: 30px;border-radius: 5px;color:white;font-size:14px;line-height:17px;background: #2476CE;box-shadow: 0 0 5px #666;word-wrap: break-word;padding: 10px 6px;border: 2px solid white;">意见反馈</a>
<!--/.mainnav-->