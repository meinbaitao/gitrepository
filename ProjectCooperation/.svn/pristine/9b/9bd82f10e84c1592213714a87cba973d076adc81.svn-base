<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<section id="mytask_section">
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
	<!-- 任务列表开始   -->
	<ul class="task-list list-model" id="task-list">
	   
	</ul>
	<input type="hidden" id="spaceId" value="">
</section>
<script type="text/javascript">
	$(document).ready(function(){
		var url="/a/task/info/spacelist";
		startUp.getData(url,function(data){
			var spaceList =$("#space-lists");
			spaceList.html("");
			$.each(data.data, function(idx, item){
				if(!item){ return;}
				if(item.title=="我的空间"){
					$(".active-space").html("");
					$(".active-space").append(item.title+"<span class='icon-sort-down'></span>");
					spaceList.prepend("<li class='active' id='"+item.id+"'>"+item.title+"</li>");
					$("#spaceId").val(item.id);
					var param ='{"spaceId":"'+item.id+'"}';
					myTaskList(param,true);
				}else{
					spaceList.append("<li id='"+item.id+"'>"+item.title+"</li>");
				}
			});
			
		});
	});
</script>