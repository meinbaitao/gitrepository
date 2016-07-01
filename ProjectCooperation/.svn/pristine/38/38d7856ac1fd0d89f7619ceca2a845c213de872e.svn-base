<%@ page import="org.slf4j.Logger,org.slf4j.LoggerFactory"%>
<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="java.util.*"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
<title>Cluster App Session Test</title>
<script src="${ctxStatic}/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
<script src="${ctxStatic }/common/common_service.js"></script>
</head>
	<script type="text/javascript">
	
		function test(){
		   	//序列化表单数据
		   	var file = $("#file")[0];
			var formdata = new FormData();
			$.each(file.files,function(index,value){
				formdata.append("pc_"+index,value);
			});
			//批量上传
			var url="http://192.168.1.188:8080/surfond/a/files/upload";
			$.ajax({
				type:"POST",
				url:url,
				data:formdata,
				contentType:false,
				processData:false,
				success:function(data){
					var result =$.parseJSON(data);
					$("#showImg").text("");
					$("#showImg").append("<img alt='下载图片' width=200px height=200px src='http://192.168.1.188:8080/surfond/a/files/download?id=a6e9f68c898942189274ebdff954b205'/>");
				},
				error : function(data) {
					
				}
			});
		}
	</script>
<body>	
	<form id="uploadForm" method="post" enctype="multipart/form-data">
		<input id="file"  type="file"  class="files"> 
		<input type="button" value="上传" id="btn" onclick="test()"> 
	</form>
	<div style="width: 200px;height: 200px;" id="showImg">
		
	
	</div>
</body>
</html>