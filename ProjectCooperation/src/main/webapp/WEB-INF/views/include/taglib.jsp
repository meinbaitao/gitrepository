<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/fns.tld" %>
<%@ taglib prefix="sys" tagdir="/WEB-INF/tags/sys" %>
<!-- 根路径引用 -->
<c:set var="ctxPath" value="${pageContext.request.contextPath}"/>
<!-- 获取配置文件版本 -->
<c:set var="varsion" value="${fns:getConfig('versionfile')}"/>
<!-- 获取上下文路径加服务路径前缀 -->
<c:set var="ctx" value="${ctxPath}${fns:getAdminPath()}"/> 
<!-- 获取静态文件路径 -->
<c:set var="ctxStatic" value="${ctxPath}/static"/>
<c:set var="ctxSurfond" value="${ctxPath}/static/modules/surfond"/>
<c:set var="ctxSys" value="${ctxPath}/static/modules/sys"/>

