<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta name="renderer" content="webkit">
		<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
		<meta http-equiv="Expires" content="0">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-store">
		<script type="text/javascript">
			var ctxSurfond="${ctxSurfond }";
		</script>
		<script src="${ctxStatic}/jquery/jquery-1.9.1.min.js?tsf=${varsion}" type="text/javascript"></script>
		
		<script type="text/javascript" src="${ctxSurfond }/common/js/matter.js?tsf=${varsion}"></script>
		
		<script type="text/javascript" src="${ctxSurfond }/user/js/user.js?tsf=${varsion}"></script>
		
		
		<!-- js常量配置 -->
		<script type="text/javascript" src="${ctxSurfond }/common/js/constants.js?tsf=${varsion}"></script>
		
		<!-- js公共服务 -->
		<script type="text/javascript" src="${ctxStatic }/common/common_service.js?tsf=${varsion}"></script>
		
		<!-- 空间 -->
		<script type="text/javascript" src="${ctxSurfond }/space/js/space.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/space_view.js?tsf=${varsion}"></script>
		
		<!-- 空间组织架构  -->
		<script type="text/javascript" src="${ctxSurfond }/organize/js/organize.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/organize_view.js?tsf=${varsion}"></script>
		
		<!-- 空间团队信息  -->
		<script type="text/javascript" src="${ctxSurfond }/team/js/team.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/team_view.js?tsf=${varsion}"></script>
		
		<!-- 项目 -->
		<script type="text/javascript" src="${ctxSurfond }/project/js/project.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/project_view.js?tsf=${varsion}"></script>
		
		<!-- 任务 -->
		<script type="text/javascript" src="${ctxSurfond }/task/js/task.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/task_view.js?tsf=${varsion}"></script>
		
		<!-- 消息中心 -->
		<script type="text/javascript" src="${ctxSurfond }/message/js/message.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/message_view.js?tsf=${varsion}"></script>
		
		<!-- 项目图表-->
		<script type="text/javascript" src="${ctxSurfond }/chart/js/chart.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/chart/js/chartUtils.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/chart/js/chartHtmlUtils.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/chart/js/chartDateUtils.js?tsf=${varsion}"></script>
		
		<!-- icon图标 -->
		<link rel='icon' href="${ctxSurfond}/common/images/favicon.ico" type='image/x-ico' />
		
		<!-- bootstrap前端框架 -->
		<link rel="stylesheet" href="${ctxStatic }/bootstrap-3.3.5-dist/css/bootstrap.min.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxStatic }/bootstrap-3.3.5-dist/css/font-awesome.css?tsf=${varsion}">
		<script type="text/javascript" src="${ctxStatic }/bootstrap-3.3.5-dist/js/bootstrap.min.js?tsf=${varsion}"></script>
		<!-- 初始化版本参数、路径参数 -->
		<script type="text/javascript"> var varsion ="${varsion}", ctx = "${ctx}",ctxSurfond='${ctxSurfond}';</script>
		<title>Surfond | 进度表</title>
		<%@ include file="/WEB-INF/views/include/plugin.jsp"%>
		
		<!--自定义样式-->
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/common.css?tsf=${varsion}">
		<link rel="stylesheet" href="${ctxSurfond}/common/css-new/chart.css?tsf=${varsion}">
	</head>
	<body>
		<div id="gouImg" attrImg="<img style='padding-left:55px;padding-top:70px;' src='${ctxSurfond }/chart/images/gou.png'>"></div>
		
		<div class='roof-container fixed'>
			<%@ include file="header.jsp"%>
			<div class='main-container-scroll'>
				<div class='main-container'>
					<%-- <div class="project-list">
						<div class="project-operat">
							<div class="add-project-nav">
								<span class="title">项目</span>
								<span class="add-project-btn"  data-toggle="modal" data-target="#New_Project" href="${ctxSurfond}/modal/new_project.html">+</span>
							</div>
							<div class="search">
								<input type="text" id="projectTitleInput" placeholder="快速查找项目">
								<span class="show-archives-btn" id="showDifferentProject" project-status="0">查看存档</span>
							</div>
						</div>
						<ul class="project-lists projects-list" id="projectItemsUl">

						</ul>
						<ul class="project-archives-list projects-list" id="archiveProjectItemsUl">
							
						</ul>
						<div id="hideMenu-btn" class="hideMenu-btn sicon-hideMenu" title="点击隐藏/显示项目列表">
							&lt;
						</div>
					</div> --%>
					<!-- project-list -->
					<div id="myTabContent" class="tab-content project-chart">	
			   			<div class="floated">
			<ul id="myTab" class="nav nav-tabs special" style="height: 40px;">
   				<li class="active cable" id="spaceChartShow"><a class="cable-stayed" href="#home" data-toggle="tab">空间分析</a></li>
     			<li class="cable" id="teamChartShow"><a class="cable-stayed" href="#teamwork" data-toggle="tab">团队分析</a></li>
   				<li class="cable" id="projectChartShow"><a class="cable-stayed" href="#projectwork" data-toggle="tab">项目统计</a></li>
			</ul>
			<ul id="spaceDateConditionUl" class="lengthy ">
				<li>
					<select id="spaceDateSecondCondition" class='dateSecondCondition' >
						<!-- <option value='0'>周日</option>
						<option value='1'>周一</option>
						<option value='2'>周二</option>
						<option value='3'>周三</option>
						<option value='4'>周四</option>
						<option value='5'>周五</option>
						<option value='6'>周六</option> -->
					</select>
				</li>
				<li>
					<select id="spaceDateCondition" class="dateCondition">
						<option value="day">日</option>
						<option value="week">周</option>
						<option value="month">月</option>
					</select>
				</li>
			</ul>
			</div>	
				<div class="tab-pane fade in active return-home" id="home">	
					<div class="receptacle11">
						<section id="spaceChartTaskDone" class="htmleaf-container consummator float self-motion1">
							<div class="Complete-tasks">任务完成量</div>
							<div class="support"></div>
							<div id="piespaceChartTaskDone"></div>
							<div class="percent-sign">
								<span>已经完成&nbsp;
									<img src='${ctxSurfond }/chart/images/dot_1.png'>
									<span id="donespaceChartTaskDone"></span>%&nbsp;&nbsp;</span>
								<span>未完成&nbsp;
									<img src='${ctxSurfond }/chart/images/dot_2.png'>
									<span id="unDonespaceChartTaskDone"></span>%</span>
							</div>
						</section>
						<section id="spaceDataAnalysis" class="htmleaf-container consummator float self-motion2">
							<div class="Complete-tasks">数据分析</div>
							<ul class="tertiary">
								<li>
									<span class="percentum dataAnalysis1">0</span>
									<span class="up_png hide"><img src='${ctxSurfond }/chart/images/upward.png'></span>
									<span class="down_png hide"><img src='${ctxSurfond }/chart/images/downward.png'></span>
									<span class="text percent"></span>						
									<div>总任务数(人)</span>
								</li>
								<li>
									<span class="percentum dataAnalysis2">0</span>
									<span class="up_png hide"><img src='${ctxSurfond }/chart/images/upward.png'></span>
									<span class="down_png hide"><img src='${ctxSurfond }/chart/images/downward.png'></span>
									<span class="text percent"></span>						
									<div>完成任务总数(人)</span>
								</li>
								<li>
									<span class="percentum dataAnalysis3">0</span>
									<span class="up_png hide"><img src='${ctxSurfond }/chart/images/upward.png'></span>
									<span class="down_png hide"><img src='${ctxSurfond }/chart/images/downward.png'></span>
									<span class="text percent"></span>						
									<div>新增任务数(人)</span>
								</li>
							</ul>
						</section>
					</div>
					<div class="receptacle11">
						<section id="spaceDoneAmount" class="htmleaf-container consummator float self-motion1">
							<div class="Complete-tasks">任务按时完成率</div>
							<div id="spaceCircliful" class="delivery" data-info="<span style='font-size:18px;'>按时率</span>" data-text="" ></div>
							<div class="percent-sign total">
								<span>共<span class="totalTask" style="color: #FF7F00;">0</span>个任务</span>
								<div>按时完成的任务<span class="timelyDone" style="color: #FF7F00;">0</span>个</div>
							</div>
						</section>
						<!-- <div class="circle" id="circles-1"></div>  -->
						<section class="htmleaf-container consummator float journal self-motion2">
						    <div class="Complete-tasks">成员累计点赞排名(&nbsp;前5&nbsp;)</div>
							<ul class="pmgressbar">
								<li class="hide">
									<div id="countenanceTxt0"></div><span id="countenance0" class="countenance0">0</span>
									<svg id="container0" ></svg>
								</li>
								<li class="hide">
									<div id="countenanceTxt1"></div><span id="countenance1" class="countenance1">0</span>
									<svg id="container1"></svg>
								</li>
								<li class="hide">
									<div id="countenanceTxt2"></div><span id="countenance2" class="countenance2">0</span>
									<svg id="container2"></svg>
								</li>
								<li class="hide">
									<div id="countenanceTxt3"></div><span id="countenance3" class="countenance3">0</span>
									<svg id="container3"></svg>
								</li>
								<li class="hide">
									<div id="countenanceTxt4"></div><span id="countenance4" class="countenance4">0</span>
									<svg id="container4"></svg>
								</li>
							</ul>
						</section>
					</div>	
					<div class="">
					<div class="receptacle11 measure htmleaf-container consummator" >
						<div class="Complete-tasks">任务数据统计分析</div>
						<div class="flutter">
							<div class="flutter_div left1">
								<div id="unDoneCountspaceAnalysiData">0</div>
								<span>未完成任务数(个)</span>
							</div>	
							<div id="taskDataChartspaceAnalysiData" class="delivery" data-info="" data-text="<img style='padding-left:55px;padding-top:70px;' src='${ctxSurfond }/chart/images/gou.png'>" ></div>
							<div class="flutter_div right2">
								<div id="doneCountspaceAnalysiData">0</div>
								<span>已完成任务数(个)</span>
							</div>
						</div>
						<div class="punctuality">
							<ul>
								<li>
									<span id="onTimeUnDonespaceAnalysiData">0</span>
									<span class='up_png hide'><img src='${ctxSurfond }/chart/images/upward.png'></span>
									<span class='down_png hide'><img src='${ctxSurfond }/chart/images/downward.png'></span>
									<div>按时未完成(个)</div>
								</li>
								<li >
									<span id="overTimeUnDonespaceAnalysiData">0</span>
									<span class='up_png hide'><img src='${ctxSurfond }/chart/images/upward.png'></span>
									<span class='down_png hide'><img src='${ctxSurfond }/chart/images/downward.png'></span>
									<div>超时未完成(个)</div>
								</li>
							</ul>
							
							<ul>
								<li>
									<span id="onTimeDonespaceAnalysiData">0</span>
									<span class='up_png hide'><img src='${ctxSurfond }/chart/images/upward.png'></span>
									<span class='down_png hide'><img src='${ctxSurfond }/chart/images/downward.png'></span>
									<div>按时完成(个)</div>
								</li>
								<li >
									<span id="overTimeDonespaceAnalysiData">0</span>
									<span class='up_png hide'><img src='${ctxSurfond }/chart/images/upward.png'></span>
									<span class='down_png hide'><img src='${ctxSurfond }/chart/images/downward.png'></span>
									<div>超时完成(个)</div>
								</li>
							</ul>
						</div>
					</div>	
					
					<div class="receptacle11 reunion htmleaf-container consummator in" >
						<div class="Complete-tasks">各成员按完成情况</div>
						<%-- <div class="stewing">
							<img src='${ctxSurfond }/chart/images/dot_4.png'>
							<span>完成任务总数</span>
						<br>
							<img src='${ctxSurfond }/chart/images/dot_3.png'>
							<span>按时完成任务总数</span>
						</div> --%>	
						<div id="columnAndSpline" style="width:100%;height:230px;margin:0 auto;margin-top: 29px;"></div>
					</div>
				</div>
				
				</div>
				
				</div>
				
				<div class="tab-pane fade return-home" id="teamwork">
     				<div id="teamChart" class="receptacle11">
     					<a href="javascript:void(0);">
							<section class="htmleaf-container consummator float self-motion1  plus">				
								<span class="add-project-btn" data-toggle="modal" data-target="#add-team-message" href="${ctxSurfond}/modal/add-team-message.html">
									<img src='${ctxSurfond }/chart/images/plus-sign.png'>
								</span>
								<div class="attention">在这里添加你需要关心的团队信息</div>
							</section>
						</a>
					</div>
   				</div>
				
				<div class="tab-pane fade return-home" id="projectwork">
     				<div id="projectChart" class="receptacle11">
						<a href="javascript:void(0);">
							<section class="htmleaf-container consummator float self-motion1  plus">
								<span class="add-project-btn" data-toggle="modal" data-target="#add-project-message" href="${ctxSurfond}/modal/add-project-message.html">
									<img src='${ctxSurfond }/chart/images/plus-sign.png'>
								</span>
								<div class="attention">在这里添加你需要关心的项目信息</div>
							</section>
						</a>
					</div>
   				</div>
					<!-- /.right -->
					<div class="task-details has-remind" id="task_details">
						<div class='hideMenu-btn sicon-hideMenu'>></div>
						<div class='task-responsible-section'>
							<div class='task-responsible'>
								<ul id="responsible-log" class="task-responsible-log" >
									<li class="appoint-next"><div class="members"></div><div class="log-info"><span class="name">下一个</span></div></li>
									<li>
										<div class="members">
											<img src="${ctxSurfond}/common/new-images/test-img/default-portrait.png"" title="邓艺燎" class="portrait">
										</div>
										<div class="log-info">
											<span class="name">邓艺燎</span>
											<span class="responsible-time">02-20 17:46</span>
										</div>
									</li>
									<li>
										<div class="members">
											<img src="${ctxSurfond}/common/new-images/test-img/default-portrait.png"" title="邓艺燎" class="portrait">
										</div>
										<div class="log-info">
											<span class="name">邓艺燎</span>
											<span class="responsible-time">02-20 17:46</span>
										</div>
									</li>
									<li>
										<div class="members">
											<img src="${ctxSurfond}/common/new-images/test-img/default-portrait.png"" title="邓艺燎" class="portrait">
										</div>
										<div class="log-info">
											<span class="name">邓艺燎</span>
											<span class="responsible-time">02-20 17:46</span>
										</div>
									</li>
									<li>
										<div class="members">
											<img src="${ctxSurfond}/common/new-images/test-img/default-portrait.png"" title="邓艺燎" class="portrait">
										</div>
										<div class="log-info">
											<span class="name">邓艺燎</span>
											<span class="responsible-time">02-20 17:46</span>
										</div>
									</li>
									<li>
										<div class="members">
											<img src="${ctxSurfond}/common/new-images/test-img/default-portrait.png"" title="邓艺燎" class="portrait">
										</div>
										<div class="log-info">
											<span class="name">邓艺燎</span>
											<span class="responsible-time">02-20 17:46</span>
										</div>
									</li>
									<li>
										<div class="members">
											<img src="${ctxSurfond}/common/new-images/test-img/default-portrait.png"" title="邓艺燎" class="portrait">
										</div>
										<div class="log-info">
											<span class="name">邓艺燎</span>
											<span class="responsible-time">02-20 17:46</span>
										</div>
									</li>
									<li>
										<div class="members">
											<img src="${ctxSurfond}/common/new-images/test-img/default-portrait.png"" title="邓艺燎" class="portrait">
										</div>
										<div class="log-info">
											<span class="name">邓艺燎</span>
											<span class="responsible-time">02-20 17:46</span>
										</div>
									</li>
									<li>
										<div class="members">
											<img src="${ctxSurfond}/common/new-images/test-img/default-portrait.png"" title="邓艺燎" class="portrait">
										</div>
										<div class="log-info">
											<span class="name">邓艺燎</span>
											<span class="responsible-time">02-20 17:46</span>
										</div>
									</li>
								</ul>
							</div>
							<div class="remind-nav">这里可以查看任务责任人记录，点击下一个可以将任务指派给下一个成员</div>
						</div>
						<!-- \.task-responsible-section -->
						<div class="toolbar">
							<div class="operate-tags">
								<span class="operate-tag project-belong">
									<span class="sicon-project18 gray"></span>
									<div class="dropdown">
										<span class="project-eidt" data-toggle="dropdown">Android端Bug</span>
										<span data-toggle="dropdown" class="project-eidt-click hide "></span>
										<ul class="project-choice dropdown-menu">
											<li >iOS端bug吐槽</li>
											<li >Surfond手机端需求及规划</li>
											<li>Surfond免费版开发计划</li>
											<li>小胖专区</li>
											<li>asdfasdf</li>
											<li>一号吐槽(已封版)</li>
										</ul>
									</div>
								</span>
								<span class="appoint operate-tag"><span class="sicon-user"></span>邓艺燎</span>
								<span class="deadline operate-tag">
									<span class="sicon-calendar16"></span>
									<span thtml="截止日期" class="Wdate set" id="task-complete-date">2016-02-24</span>
								</span>
								<span title="添加任务标记" class="operate-tag" id="add-task-tags"><span class="sicon-tags"></span>添加标签</span>
								<span title="点赞" class="operate-tag" ><span class="sicon-thumbs-empty"></span></span>
								<span title="删除" class="operate-tag" > <span class="sicon-delete"></span>删除</span>
								<span href="${ctxSurfond}/modal/CopyTask.html" data-target="#CopyTask" data-toggle="modal">
									<span style="color: #6D7981;margin-right: 7px;" class="glyphicon glyphicon-copy"></span>
									任务复制
								</span>
							</div>
						</div>
						<!-- \.toolbar -->
						
						<div class='task-details-container'>
							<div class="selected-tags-parents">
								<div class="selected-tags"  style="display: block;">
									<span title="sssss"  class="tags">sssss
										<span class="deleteTaskTags icon-remove"></span>
									</span>
									<span title="s"  class="tags">s
										<span class="deleteTaskTags icon-remove"></span>
									</span>
								</div>
							</div>
							<div class="task-details-info">
								<div class="task-detail-title">
									<div class="task-complete-mark ">
										<div class="task-uncomplete big completed detailTaskStatus" title="取消标记"></div>
										<div class="task-complete"></div>
									</div>
									<div contenteditable="true" class="taskTitle" >在14寸笔记本下面，360浏览器弹出框有问题</div>
								</div>
								<div class="task-description">
									<div contenteditable="true" class="task-des-content" original="">输入任务描述！</div>
								</div>
							</div>
							<ul class="nav nav-tabs comment-log-switch" role="tablist">
								<li role="presentation" class="active"><a href="#task-comment" aria-controls="task-comment" role="tab" data-toggle="tab">评论</a></li>
								<li role="presentation" ><a href="#subtask-list-container" aria-controls="subtask-list-container" role="tab" data-toggle="tab">子任务<span class="number">(0)</span></a></li>
								<li role="presentation" ><a href="#task-file-list-nav" aria-controls="task-file-list-nav" role="tab" data-toggle="tab">附件<span id="thisAttachmentCount" class="number">(1)</span></a></li>
								<li role="presentation" ><a href="#task_operatLog" aria-controls="task_operatLog" role="tab" data-toggle="tab">记录</a></li>
							</ul>
							<div class="tab-content">
								<div role="tabpanel" class="tab-pane comment-lists active " id="task-comment">
									<div class="comment-list">
										<div class="commentator">
											<span class="members"><img  src="${ctxSurfond}/common/new-images/photo_40.png?tsf=V1R02" title="Martin" class="portrait"></span>
										</div>
										<div class="comment-info">
											<div class="logtags">
												<div class="comment-name">Martin</div>
												<div class="comment-time">2016-01-25 09:34:42</div>
												<div class="comment-opreta"></div>
											</div>
										</div>
										<div class="comment-content">请完善任务明细／时间安排等</div>
										<div class="comment-comment-file "></div>
									</div>
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
											<tr  class="subTaskEach" index="1">
												<td class="grid-cell-string">
													<div class="text-line">
														<div class="mark-complete">
															<span  class=" subTask-mark-complte subTaskStatusEach"></span>
														</div>
														<div class="text-line-title">
															<textarea title="dsfgsdfgds f" rows="1"  class="subTaskTitleEach">dsfgsdfgds f</textarea>
														</div>
														<div class="text-line-tags">
															<span title="标记完成时间" class="glyphicon glyphicon-calendar"></span>
															<span title="删除"  class="deleteSubTaskEach sicon-delete"></span>
														</div>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								
								<div id="task-file-list-nav" role="tabpanel" class="tab-pane task-file-list-nav ">
									<span class="add-task-file" ><span>+</span>添加附件</span>
									<div  class="task-file-list ">
										<div class="file-list ">
											<div class="file-images">
												<a  href="http://www.surfond.com/a/attachment/download?id=f978bd29784241919576a1bf32de85af" class="file-style haspreview"  target="_self">QQ截图20160129121018.png (181.62K)
													<span class="preview">预览</span>
													<span class='sicon-remove cancelFile' title="QQ截图20160129121018.png"></span>
												</a>
											</div>
										</div>
									</div>
								</div>
								<ul id="task_operatLog" role="tabpanel" class="tab-pane log-task-container  ">
									<li><div class="time-line begin"><span class="circle"></span></div></li>
									<li>
										<div class="time-line">
											<span class="time">02-19 16:55</span>
											<span class="circle1">
												<span class="sub-circle"></span>
											</span>
											<span class="log-content">舒佳锦  将任务状态改为:已完成</span>
										</div>
									</li>
									<li>
										<div class="time-line">
											<span class="time">02-19 11:36</span>
											<span class="circle1">
												<span class="sub-circle"></span>
											</span>
											<span class="log-content">吴健文  将任务描述改为:</span>
										</div>
									</li>
									<li>
										<div class="time-line">
											<span class="time">02-19 11:27</span>
											<span class="circle1">
												<span class="sub-circle"></span>
											</span>
											<span class="log-content">舒佳锦  将任务描述改为:输入任务描述！</span>
										</div>
									</li>
									<li>
										<div class="time-line">
											<span class="time">02-18 14:48</span>
											<span class="circle1"><span class="sub-circle"></span></span>
											<span class="log-content">舒佳锦  创建了任务</span>
										</div>
									</li>
									<li><div class="time-line end"><span class="circle"></span></div></li>
								</ul>
							</div>
						</div>
						<!-- \.task-details-container -->
						
						<div class="comment-input-content">
							<span  class="comment-input-spread"><span class="topward"></span> </span>
							<div class="task-comment-input saytext" name="saytext" contenteditable="true"></div>
							<div class="task-comment-input-submit">
								<span class="emotion sicon-face" ></span>
								<span class="sicon-related clickShowMembers" ></span>
								<span class='sicon-file ' title='添加附件'>
									<form enctype='multipart/form-data' method='post' >
										<input type='file' data-role='none' class='files' style='display:none;'>
										<div ><input type='hidden' class='taskuuid' value=''></div>
									</form>
								</span>
								<button>发送</button>
							</div>
						</div>
						<!-- \.comment-input-content -->
					</div>
					<!-- /.task-details -->
				</div>
				<!-- /.main-container -->
			</div>
			<!-- /.main-container-scroll -->
		</div>
		<div class="project-members-list" >
			<div id="mentionMember">
				<%-- <div class="lists" >
					<img  title="舒佳锦" src="${ctxSurfond}/common/new-images/photo_30.png?tsf=V1R02" class="members">
					<div class="info">
						<div class="name">舒佳锦</div>
						<div class="email">sjj@clearcom.com.cn</div>
					</div>
				</div> --%>
			</div>
		</div>
		<!-- 添加任务标签 -->
		<ul id="add-task-tags-menu" class="add-task-tags-menu " >
			<li class="task-tags-input">
				<input type="text" id="tagsTitle" class=" form-control" data-role="none" placeholder="标签名">
				<button id="tagsTitleBtn" class="btn btn-primary" data-role="none">添加</button>
			</li>
			<li id="tagsItemsLi" class="task-tags-lists">
				<a  class="task-tags-lists  selected current" href="javascript:void(0);" >
					<span class="icon-circle"></span>sdaf
					<span class="icon-ok"></span>
				</a>
				<a class="task-tags-lists " href="javascript:void(0);" >
					<span class="icon-circle"></span>IOS
					<span class="icon-ok"></span>
				</a>
			</li>
		</ul>
		<!--个人设置模态框开始-->
		
		<div id="add-team-message" class="modal mymodal fade add-project">
			<div class="modal-dialog detail asad" role="document" >
				<div id="add-team-message" class="modal-content beatadistancefrom maintain">
					
				</div>
			</div>
		</div>
		<div id="add-project-message" class="modal mymodal fade add-project">
			<div class="modal-dialog detail asad" role="document" >
				<div id="add-project-message" class="modal-content beatadistancefrom maintain">
					
				</div>
			</div>
		</div>
		<!--个人设置模态框结束-->
		<!--快捷操作——添加话题模态框开始-->
		<div id="omnibutton_converse" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--快捷操作——添加话题模态框结束-->
		<!--快捷操作——添加项目模态框开始-->
		<div id="omnibutton_project" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
					
				</div>
			</div>
		</div>
		<!--快捷操作——添加项目模态框开始-->
		<!--快捷操作——添加任务模态框开始-->
		<div id="omnibutton_task" class="modal mymodal fade">
			<div class="modal-dialog" role="document" >
				<div class="modal-content ">
					
				</div>
			</div>
			<!--快捷操作——添加任务模态框开始-->
			<!--快捷操作——添加新建团队模态框开始-->
		</div>
		<div id="new_team" class="modal mymodal fade">
			<div class="modal-dialog breadth" role="document" >
				<div class="modal-content newteam">
					
				</div>
			</div>
		</div>
		<!--快捷操作——新建团队模态框结束-->
		<!-- 开始-创建项目 -->
		<div class="modal fade mymodal " id="New_Project" tabindex="-1" role="dialog" >
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!-- 结束-创建项目 -->
		
		<!--添加团队成员模态框开始-->
		<div id="AddTeamMembers" class="modal mymodal fade add-teamMembers">
			<div class="modal-dialog " role="document" >
				<div class="modal-content ">
				</div>
			</div>
		</div>
		<!--添加团队成员模态框结束-->
		<!-- 开始-工作空间管理 模态框 -->
		<div class="modal fade mymodal manage-workspace" id="Manage_Workspace" tabindex="-1" role="dialog"  >
			<div class="modal-dialog" role="document" >
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!-- 结束-工作空间管理 模态框 -->
				<!--创建工作空间模态框开始-->
		<div class="modal fade mymodal" id="New_Workspace" tabindex="-1" role="dialog" >
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!--创建工作空间模态框结束-->
		<!--公共js方法和DOM操作-->
		<script type="text/javascript" src="${ctxSurfond }/common/js-new/commonMethods.js?tsf=${varsion}"></script>
		<script type="text/javascript" src="${ctxSurfond }/view/common_view.js?tsf=${varsion}"></script>
		<!--项目列表的Dom操作-->
		<script type="text/javascript" src="${ctxSurfond }/common/js-new/project.js?tsf=${varsion}"></script>
	</body>
</html>