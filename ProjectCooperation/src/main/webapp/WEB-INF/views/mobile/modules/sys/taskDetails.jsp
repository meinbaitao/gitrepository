<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<section id="task_detalis_section" >

	<ul class="task-list layer task-detalis">
	    <li>
	       <span class="show-task">收起</span>
	       <h2 class="task-title"><a class="task-details" href="javascript:void(0)">${task.title}</a></h2>
          <p class="task-content">
				<c:choose>
					<c:when test="${empty task.description}">
						暂无任务描述
					</c:when>
					<c:otherwise>
						${task.description}
					</c:otherwise>
				</c:choose>
				
	       </p>
	       <h3 class="father-project ">
	       		<img src="${ctxStatic }/jingle/image/father-project.png" class="icon-folder-close">
	       		<a href="javascript:void(0);" id="${task.projectId}">
	       			<c:choose>
						<c:when test="${empty task.projectName}">
							暂无项目
						</c:when>
						<c:otherwise>
							${task.projectName}
						</c:otherwise>
					</c:choose>
	       		</a>  
	       </h3>
	       <div class="file-list">
	           
	       </div>

	       <div class="taks-who-data">
	          <span class="name">
	   				<c:choose>
						<c:when test="${empty task.owner}">
							 未选择责任人
						</c:when>
						<c:otherwise>
							${task.owner}
						</c:otherwise>
					</c:choose>  
	          </span>
	          <span class="data">
	          		<c:choose>
						<c:when test="${empty task.dueDate}">
							未设定截至日期
						</c:when>
						<c:otherwise>
							${dueDate}
						</c:otherwise>
					</c:choose>
	          </span>
	       </div>
	       <input type="hidden" id="taskId" value="${task.id}">
	       <div class="affirm-complete">
	            <a href="javascrip:void(0);">确认完成</a>
	       </div>
	    </li>
	</ul>
	<div class="conversations" id="commentList">
	    <div class="conversation">
	       <img class="portrait" src="${ctxStatic }/jingle/image/del/portrait-other.png" />
	       <div class="content">
	          <span class="name">张三</span>
	          <span class="triangle triangle-left"></span>
	                                   任务做得不错
	       </div>
	    </div>
	    <div class="conversation my-conversation">
	       <img class="portrait" src="${ctxStatic }/jingle/image/del/portrait-me.png" />
	       <div class="content">
	          <span class="triangle triangle-right"></span>	                                     
	                                     时间在十月二十三号。时间在十月二十三号。时间在十月二十三号。时间在十月二十三号。时间在十月二十三号。时间在十月二十三号。时间在十月二十三号。	       
	       </div>
	    </div>
	</div>
	
	<div class="convarsation-input">
	   <span class="icon-rss"></span>
	   <textarea   name="convarsation" ></textarea>
	   <span class="c-icon-plus">+</span>	   
	   <span class="icon-smile" ></span>
	   <button class="set-message">发送</button>
	</div>
	<input type="hidden" id="type" value="2">
</section>
<script type="text/javascript">
	$(document).ready(function(){
		commentlist();
	});
</script>