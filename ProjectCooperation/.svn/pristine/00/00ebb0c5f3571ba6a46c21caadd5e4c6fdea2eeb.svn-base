<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>找回密码</title>
<meta name="decorator" content="blank" />
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Cache-Control" content="no-store">
<link rel="stylesheet" href="${ctxSys }/css/login.css?tsf=${varsion}">
<link rel="stylesheet"  href="${ctxStatic }/bootstrap-3.3.5-dist/css/font-awesome.css?tsf=${varsion}">
<link rel='icon' href="${ctxSurfond}/common/images/favicon.ico?tsf=${varsion}" type='image/x-ico' />
<script type="text/javascript" src="${ctxStatic }/jquery/jquery-1.11.3.min.js?tsf=${varsion}"></script>
<script type="text/javascript" src="${ctxSys }/js/register.js?tsf=${varsion}"></script>
<script type="text/javascript" src="${ctxStatic }/common/common_service.js?tsf=${varsion}"></script>
<script type="text/javascript">
$(function(){
	if("${message}"){
		$("#messageShow").empty();
		$("#messageShow").append("<h3 style='color: red'>"+"${message}"+"</h3><p>");
	}
	$(document).on("click","body",function(){
		$("#messageShow").empty();
	});
});
</script>
</head>
<body>
    		<div class="content register find-password "  >
			<div class="Clearcomlog">
				<a class="Clearcom" href="javascript:void"> 
				   <img  src="${ctxSys }/images/logo-login.png?tsf=${varsion}" alt="sounfond">
	               <span class="regist">忘记密码</span>
				</a>
			</div>
			
	       	<div class="log-form">
				<form  class="form-signin custom-check forget-password"  method="post" action="sendUpdateEmail">	
					 <div id="messageShow"></div>
					 <p></p>			
					 <input type="text" name="loginName" class="emailaddress required email" value="${userName}" placeholder="请输入账号绑定的邮箱" > 
					 <input type="submit" value="确认" />
				</form>
				<span class="goto-login"> <a class="regsiter" href="${ctx}/login">返回登录</a></span><span class="goto-login"> <a class="regsiter" href="${ctxPath}/m/system/user/innerRegist">还没有账号？免费注册</a></span>
				
		   </div>
		 	<div class="email-send-success">
		        <h2>邮件已发送</h2>
				<p>重置密码的邮件已经发送到 132456@163.com</p>
				<p>请跟随邮件里的引导来重置您的登录密码</p>
				<a class="active-account" href="#" data-role="none">登录邮箱</a> 
				<p><a href="${ctx}/login" class="goto-login-link" > 返回登录 </a></p>
				<p><a href="${ctxPath}/m/system/user/innerRegist" class="goto-login-link">还没有账号？免费注册</a></p>
		   </div>
		</div>
		
</body>
</html>