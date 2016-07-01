<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- DOCTYPE html -->
<html >
<head>
<title>${fns:getConfig('productName')}注册</title>
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
		var msg = "${message}";
		$("#email-address").text(msg);
		var href = startUp.getEmailLocal(msg);
		$(".active-account").attr("href",href);
	}
});
</script>
</head>
<body>
        <div class="content register register-success" >
			<div class="Clearcomlog">
				<a class="Clearcom" href="javascript:void"> 
				   <img  src="${ctxSys }/images/logo-login.png?tsf=${varsion}" alt="sounfond">
	               <span class="regist">注册成功</span>
				</a>
			</div>
	       	<div class="register-success-content">
				<h2>注册成功，您已成为Surfond用户!</h2>
				<p>验证邮件已发送到  <span id="email-address"></span></p>
				<a class="active-account" href="#" data-role="none">登录邮箱激活账号</a> 
		   </div>
		</div>
		
	<div class="footer">&copy;2015 广州市柏涛信息技术有限责任公司 版权所有</div>
</body>
</html>