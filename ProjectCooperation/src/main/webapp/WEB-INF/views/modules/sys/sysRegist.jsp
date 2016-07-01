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
<link rel="stylesheet"  href="${ctxStatic}/bootstrap-3.3.5-dist/css/font-awesome.css?tsf=${varsion}">
<link rel='icon' href="${ctxSurfond}/common/images/favicon.ico?tsf=${varsion}" type='image/x-ico' />
<script type="text/javascript" src="${ctxStatic }/jquery/jquery-1.11.3.min.js?tsf=${varsion}"></script>
<script type="text/javascript" src="${ctxSys }/js/register.js?tsf=${varsion}"></script>
<script src="${ctxStatic }/common/common_service.js?tsf=${varsion}"></script>
<script src="${ctxSurfond }/common/js/constants.js?tsf=${varsion}"></script>
<script type="text/javascript">
function getQueryString(name) {  
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
      var r = window.location.search.substr(1).match(reg);  
      if (r != null) return unescape(r[2]);  
      return null;  
  }
$(function(){
	var organizeId = getQueryString("organizeId");
	if(organizeId){
		$("#organizeId").val(organizeId);
	}
	var spaceId = getQueryString("spaceId");
	if(spaceId){
		$("#spaceId").val(spaceId);
	}
});
</script>
</head>
<body>
	<div id="register" class="content register ">
		<div class="Clearcomlog">
			<a class="Clearcom" href="javascript:void"> 
			   <img  src="${ctxSys }/images/logo-login.png?tsf=${varsion}" alt="sounfond">
               <span class="regist">用户注册</span>
			</a>
		</div>
       	<div class="log-form">
			<form  class="form-signin custom-check"  method="post" action="register">
				<input type="hidden" id="spaceId" name="spaceId" value="">		
				<input type="hidden" id="organizeId" name="organizeId" value="">			
				<div id="messageShow"></div>
				<p></p>
				<input type="text" name="loginName" id="userLoginName" class="usernames required onlyEnglish" min="6" maxlength="50" placeholder="用户名" meg="用户名"> 
				<input type="text" name="email" id="userEmail" class=" required email"  placeholder="邮箱，例如123456@163.com" meg="用户名">
				<input type="password" name="password" min="6" maxlength="20" class="password required " placeholder="密码,6-20位字符" meg="密码">			
				 <span class="service-clause-tips">点击注册表示你已阅读并同意<a href="javascript:void(0);" class="service-clause">《 Surfond 服务条款 》</a> </span>
				 <input id="really-regist-btn" type="submit" value="注册" />
			</form>
			<span class="goto-login">已有Surfond账号？<a href="${ctx}/login" class="goto-login-link">直接登录</a> </span>
	   </div>

	</div>
    <div class="content service-clause-content"  >
			<div class="Clearcomlog">
				<a class="Clearcom" href="http://www.clearcom.com.cn"> 
				   <img  src="${ctxSys }/images/logo-login.png?tsf=${varsion}" alt="sounfond">
	               <span class="regist">服务条款</span>
				</a>
			</div>
			<div class="clause-content">
			    <p>尊敬的用户，欢迎您注册本网站用户。</p>
			    <p>在注册前请您仔细阅读如下服务条款：  本服务条款双方为您与广州市柏涛信息技术有限责任公司（下称柏涛），本服务条款具有合同效力。</p> 
                <p>您确认本服务条款后，本服务条款即在您和本网站之间产生法律效力。请您务必在注册之前认真阅读全部服务条款内容，如有任何疑问，可向本网站咨询。 </p>
                <p> 无论您事实上是否在注册之前认真阅读了本条款协议，只要您点击条款正本下方的"注册"按钮并按照本网站注册程序成功注册为用户，您的行为仍然表示您同意并签署了本服务协议。 </p>
                <h2>1.账户</h2>
                <p>您同意并理解您有责任将您与用于获得服务的任何账户相关的密码保密。您负责对您账户下发生的所有的行为和内容负责。 </p>
                <h2>2.付款</h2>
                <p>您注册本网站或其中某服务，即表示您同意支付其中的所有费用。</p>
                <p>柏涛可能要求您提供经我们认可的发卡机构发行的信用卡卡号来激活您的服务，或支付服务的任何相关费用。柏涛将从您提供的账户或信用卡账户中收取使用费及其他费用。如果授权柏涛通过信用卡收取您的账户相关费用，即表示您授权柏涛自动从该卡持续扣除账户相关的所有费用。</p>
                <p>除非因为柏涛方面的问题导致本服务无法正常提供，您支付的有关本服务的所有费用均不能退款。</p>
                <h2>3.内容和版权</h2>
                <p>柏涛对你在本服务提交的内容没有所有权，这些内容的所有权仍然归你所有。但是，如果你将页面设置为公开，就意味着你允许其他人查看和共享你的内容。</p>
                <p>您明白柏涛对他人提供的任何内容不在任何方面负责或负有责任，柏涛没有义务预先审查此类内容。但是，柏涛有权随时决定内容是否合适和与本条款相符；如果发现此类内容违反本条款或在其他方面令人反感，柏涛可随时并有绝对酌情权预先审查、转移、拒绝、修改和/或删除内容，而不需事先通知。</p>
                <p>本服务的外观设计与专利归柏涛所有。未经彩程书面许可，您不能复制、拷贝，或者重用任何部分代码和外观设计。</p> 
                <h2>4.私隐和政策</h2>
                <p>使用本网站，即表示您同意柏涛合法收集和使用有关你及你所使用本网站的技术性或诊断性信息。收集到的些信息将用于改进网页的内容，提升我们的服务品质。</p>
                <p>柏涛不会将您的信息和内容分享或出售给其他的组织。但以下情况除外：</p>
                 <ol>
                   <li>您同意让第三方共享资料；</li>
                   <li>柏涛需要听从法庭传票、法律命令或遵循法律程序；</li>
                   <li>您违反了本条款。</li>
                 </ol>
                <h2>5.终止</h2>
                <p>您可随时终止您的账户和/或停用本网站。你在服务终止前支付的任何费用均不能退还（除本服务条款另有明文允许者除外）。 </p>
                <p>柏涛可随时在某些情况下，不需事先通知，立即终止或暂停您所有或部分账户和/或本网站之进入。此类服务终止的原因包括但不限于：</p>
                 <ol>
                    <li>违反本服务条款；</li>
                    <li>您要求取消或终止您的账户；</li>
                    <li>需要听从法庭传票、法律命令或遵循法律程序；</li>
                    <li>突发的自然灾害导致的问题；</li>
                    <li>战争、军事行动、暴动或武装叛乱；</li>
                    <li>您没有支付与本服务相关的费用；</li>
                 </ol>           
               <p>一旦您的账户被终止，您将无法正常使用本服务。此外，您可以选择删除您账户下的所有信息和内容。</p>
                <p class="right">&copy;广州市柏涛信息技术有限责任公司  保留一切权利。</p>
                <button class="affair-clause">同意并注册</button>
			</div>
	     
		</div>
	<div class="footer">&copy;2015 广州市柏涛信息技术有限责任公司 版权所有</div>
</body>
</html>