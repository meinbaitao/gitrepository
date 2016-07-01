<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.apache.shiro.web.filter.authc.FormAuthenticationFilter"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html style="overflow: hidden;">
<head>
<title>${fns:getConfig('productName')}登录</title>
<link rel="stylesheet" href="${ctxSys }/css/login.css?tsf=${varsion}">
<link rel="stylesheet" href="${ctxStatic }/bootstrap-3.3.5-dist/css/font-awesome.css?tsf=${varsion}">
<link rel='icon' href="${ctxSurfond}/common/images/favicon.ico?tsf=${varsion}" type='image/x-ico' />
<script src="${ctxStatic}/jquery/jquery-1.9.1.min.js?tsf=${varsion}" type="text/javascript"></script>
<script src="${ctxStatic}/jquery-validation/1.11.1/jquery.validate.js?tsf=${varsion}" type="text/javascript"></script>

<script src="${ctxSurfond }/common/js/constants.js?tsf=${varsion}"></script>
<script src="${ctxStatic }/common/common_service.js?tsf=${varsion}"></script>

</head>
<body>

	<div class="content">
		<div class="Clearcomlog">
			<a class="Clearcom" href="http://www.clearcom.com.cn">
			 <img  src="${ctxSys }/images/logo-login.png?tsf=${varsion}" alt="Surfond">
			</a>
		</div>
		<div class="login-left-img"></div>
		<div class="login-section">
			<ul class="log_method">
				<!-- <li>微信登录</li> -->
				<li class="active" style="width: 100%;">Surfond登录</li>
			</ul>
			<ul class="log_method_nav">
				
				<%-- <li class="weixin_user ">
                    <p class="safety_tips">安全登录  防止被盗</p>
                    <img src="${ctxStaticPoj }/images/del/weixin_login.gif">
                    <p>使用微信扫描上方二维码</p>
                    <a href="#" class="help">使用帮助</a>
				    <a href="${ctxPath}/m/system/user/innerRegist" class="regsiter">还没有账号？免费注册</a>
				</li> --%>
				<li class="clearcom_user active ">
					<div  class="messageBox1"> 
					   <div  id="messageBox">
							<label class="error" id="loginError"></label>
						</div>
					</div>
					<div class="log-form">
						<form id="loginForm1" class="form-signin" action="${ctx}/login"method="post">
							<input type="text" id="username" name="username" class="usernames  required" value="${param.userName}" placeholder="邮箱/手机号"> 
							<input type="password" id="password" name="password" class="password required" placeholder="密码">
								<div class="dvivalidateCode">
									<c:if test="${isValidateCodeLogin}">						
											<sys:validateCode name="validateCode" inputCssStyle="margin-bottom:0;"  />										
									</c:if>
							   </div>
							<label class="auto_login" for="rememberMe"> 
							   <input type="checkbox" class="auto_login_checkbox" id="rememberMe" name="rememberMe" ${rememberMe ? 'checked' : ''} /> 
							    <span class="icon-check-empty"></span> 记住我
							</label>
							 <a href="${ctxPath}/m/system/user/innerForgetPassword" class="forget-pass">忘记密码</a> 
							 <input type="submit" value="登 录" onclick="javascript:startUp.iBehavior('moduleNO_1');"/>
							 <a href="${ctxPath}/m/system/user/innerRegist" id="want-regist-btn" class="regsiter">还没有账号？免费注册</a>
						</form>
					</div>
				</li>
			</ul>
		</div>
	</div>

	<div class="footer">&copy;2015 广州市柏涛信息技术有限责任公司 版权所有</div>
    <script type="text/javascript">
	$(document).ready(function() {
				if("${message}"!=""){
					$("#loginError").text("${message}");
					$("#messageBox").show();
				}
				$("#loginForm1").validate({
					rules: {
						validateCode: {remote: "${pageContext.request.contextPath}/servlet/validateCodeServlet"}
					},
					messages: {
						username: {required: "请填写用户名."},password: {required: "请填写密码."},
						validateCode: {remote: "验证码不正确.", required: "请填写验证码."}
					},
					errorLabelContainer: "#messageBox",
					errorPlacement: function(error, element) {
						error.appendTo($("#loginError").parent()).hide();
					} 
				});
				$(".auto_login_checkbox").on("click", input_check);
				if ($(".auto_login_checkbox")[0].checked) {
					$("#auto_login_checkbox").next("span").attr("class", "icon-check");
				}
				/* //登录方式切换 
				$(".log_method>li").bind("click",function(){
					if($(this).hasClass("active")) return false;
					$(this).siblings(".active").removeClass("active");
					$(this).addClass("active");
					$(".log_method_nav>li.active").removeClass("active");
					$(".log_method_nav>li").eq($(this).index()).addClass("active");
				})
                      //qq登录方式切换
				$(".qq_user_method>li").bind("click",function(){
					if($(this).hasClass("active")) return false;
					$(this).siblings(".active").removeClass("active");
					$(this).addClass("active");
					$(".qq_user_content>li.active").removeClass("active");
					$(".qq_user_content>li").eq($(this).index()).addClass("active");
				})
				
				$.get(constants.clearcom+"/api/wx/interact/qrcode/img",function(data){
					if(data){
						var url={"url":data}
						$.post("${ctxPath}/m/wx/appid",url,function(wx){
							$(".weixin_user img").attr("src",constants.weixinUrl+wx);
						});
					}
				}); */
	});
	
	var input_check = function() {
		if (this.checked) {
			$(this).next("span").attr("class", "icon-check");
		} else {
			$(this).next("span").attr("class", "icon-check-empty");
		}

	}
	</script>	
</body>


</html>