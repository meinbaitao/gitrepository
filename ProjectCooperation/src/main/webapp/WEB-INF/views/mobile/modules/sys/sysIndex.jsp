<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<section id="index_section">

<!--空间选择列表开始 -->
    <div class="space-nav">
        <div class="space-nav-header">
           <span class="active-space dropmenu search" show_target=".space-lists" site_target=".space-nav-header">
             	
           </span>
           <span class="task-show-method">
                <span class="icon stack"></span>
           </span>
        </div>
        <ul class="space-lists menu-lists" id="space-lists">
           
        </ul>
    </div>
<!--空间选择列表结束-->
    
    <div class="affirm-chooice"></div>
<!-- 项目筛选区域开始   -->
	<div class="filtrate-menu">
	     <div class="filtrate-submenu project-choose">
	        <span class="dropmenu" show_target=".project-lists" site_target=".filtrate-menu" id="active-project">
				全部项目
	             <span class="icon-sort-down"></span>
            </span>
	     </div>
	   
	     <div class="filtrate-submenu task-status">
	   	     <span class="dropmenu" show_target=".task-status-list" site_target=".filtrate-menu" id="task-status">
	                                             全部
	             <span class="icon-sort-down"></span>
            </span>
	     </div>
	     
	     <div class="filtrate-submenu task-who">
	         <span class="dropmenu" show_target=".task-who-lists" site_target=".filtrate-menu">
	              	全部
	             <span class="icon-sort-down"></span>
              </span>
         
	     </div>
	    
	</div>
	  	<ul class="project-lists menu-lists" id="project-lists">
		
        </ul>

    	<ul class="task-status-list menu-lists" id="time-status-list">
           <li class="active">全部</li>
           <li id="overdue">超期</li>
           <li id="today">今天</li>
           <li id="withinWeek">一周内</li>
           <li id="oneWeek">一周外</li>
         </ul>
         <ul class="task-who-lists menu-lists" id="task-who-lists">
				
         </ul>

	<!-- 项目筛选区域结束   -->

	<!-- 任务列表开始   -->
	<ul class="task-list list-model" id="task-list">
	   	<li class="none-task none-my-task">
		    <div class="smile"></div>
		    <p class="master">暂无任务</p>
		    <p class="my-master">亲，你还没有任务哦</p>
		    <p class="sec">试试其它筛选条件</p>
		</li>
	</ul>
	<input type="hidden" id="spaceId" value="">
	<input type="hidden" id="projectId" value="">
	<input type="hidden" id="dueDate" value="">
</section>
<script type="text/javascript">
	$(document).ready(function(){
		spaceList();
	});
</script>