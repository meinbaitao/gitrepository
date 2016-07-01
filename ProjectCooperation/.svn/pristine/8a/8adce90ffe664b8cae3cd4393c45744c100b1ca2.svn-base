<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>重置密码</title>
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
		$("#messageShow").append("<h3 style='color: red'>"+"${message}"+"</h3>");
	}
	$(document).on("click","body",function(){
		$("#messageShow").empty();
	});
});
</script>
</head>
<body>
<div class="content register reset-password "  >
			<div class="Clearcomlog">
				<a class="Clearcom" href="javascript:void"> 
				   <img  src="${ctxSys }/images/logo-login.png?tsf=${varsion}" alt="sounfond">
	               <span class="regist">重置密码</span>
				</a>
			</div>
			
	       	<div class="log-form">
				<form  class="form-signin custom-check reset-password"  method="post" action="updatePassword">	
					 <input type="hidden" name="id" value="${updateId}">	
					 <input type="hidden" name="code" value="${code}">
					 <div id="messageShow"></div>
					 <p></p>		
					 <input type="password" name="password" class="repassword required "  min='6'  placeholder="请您输入新的密码，6-20位字符" > 
					  <input type="password" name="newPassword"  class="repassword required "  min='6'  placeholder="请您确认新的密码" > 
					 <input type="submit" value="确定" />
					 
				</form>
				
				
		   </div>
		</div>
</body>
</html>