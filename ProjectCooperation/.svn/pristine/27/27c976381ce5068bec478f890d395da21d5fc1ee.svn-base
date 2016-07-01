
var commentView = {};

/**
 * 组装单个话题的评论显示
 */
commentView.showConversationCommentList = function(k,v){
	var userId = $("#checkedUser").attr("user-id");//当前用户ID
	
	var htmlStr  = "";
		htmlStr += "		<div class='comment-list'>";
		htmlStr += "			<div class='members'>";
		htmlStr += "				<span class='member-portrait'>" ;
		htmlStr += 						organizeView.showDefaultPhoto(v.createByPhoto,v.createByName) ;
		htmlStr += "				</span>" ;
		htmlStr += "			</div>";
		htmlStr += "			<div class='comment-info-in'>";
		htmlStr += "				<span>"+v.createByName+":</span>"
		htmlStr += "				<span>"+replace_metion(replace_em(v.description))+"</span>";
		htmlStr += "				<span class='date'>";
		htmlStr += "					<span style='color:#99A6AE;display: block;font-size: 12px'>"+v.createDate+"</span>";
		htmlStr += "				</span>";
		
		htmlStr += "			</div>";
		if(v.attachment){
			htmlStr += "			<div class='comment-comment-file'>" ;
			var imgStr = "";
			var notImgStr = "";
			$.each(v.attachment,function(x,y){
				var fileLength = parseFloat(y.size);
				var showLength = fileLength/1024;
				var toLength = "";
				if(showLength>500){
					toLength = toDecimal(showLength/1024)+"M";
				}else{
					toLength = toDecimal(showLength)+"KB";
				}
				var attType = y.name.substring((y.name.lastIndexOf(".")+1)).toLowerCase();
				if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
					if(userId==v.createById){
						imgStr +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath() + y.accessPath+"' status='"+y.id+"' contenteditable='false' data-role='none'>"+y.name+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath() + y.accessPath+"' class='hide'><span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
					}else{
						imgStr +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath() + y.accessPath+"' status='"+y.id+"' contenteditable='false' data-role='none'>"+y.name+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath() + y.accessPath+"' class='hide'></a>";
					}
				}else{
					notImgStr += "                   <a target='_self' class='file-style' href='"+startUp.getRootPath() + y.accessPath+"' status='"+y.id+"'>" ;
					notImgStr += 						y.name+" ("+toLength+")" ;
					if(userId==v.createById){
						notImgStr += "						<span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'>" ;
					}
					notImgStr += "						</span>" ;
					notImgStr += "				    </a>" ;
				}
			});
			htmlStr += "				<div class='file-images'>"+imgStr+"</div>" ;
			htmlStr += "				<div class='file-list sicon-file20'>"+notImgStr ;
			htmlStr += "				</div>" ;
			htmlStr += "			</div>" ;
		}
		
		if(userId==v.createById){
			htmlStr += "			<div class='sicon-dropdown down pull-right on' data-toggle='dropdown'></div>";
			htmlStr += "			<ul class='dropdown-menu'>";
			htmlStr += "				<li class='cancelComment down' status='"+v.id+"' conversation-id='"+v.resourceId+"'>删除</li>";
			htmlStr += "			</ul>";		
		}
		htmlStr += "		</div>";
	return htmlStr;
}


/**
 * 组装任务评论信息
 */
commentView.showTaskCommentList = function(k,v){
	var userId = $("#checkedUser").attr("user-id");//当前用户ID
	
	var htmlStr  = "";
		htmlStr  += "<div class='comment-list'>";
		htmlStr  += "	<div class='commentator'>";
		htmlStr  += "		<span class='members member-portrait'>";
		htmlStr  += 		organizeView.showDefaultPhoto(v.createByPhoto,v.createByName);
		htmlStr  += "		</span>";
		htmlStr  += "	</div>";
		htmlStr  += "	<div class='comment-info'>";
		htmlStr  += "	<div class='logtags'>";
		htmlStr  += "		<div class='comment-name'>"+v.createByName+":</div>";
		htmlStr  += "		<div class='comment-time'>"+v.createDate+"</div>";
		htmlStr  += "		<div class='comment-opreta'></div>";
		htmlStr  += "	</div>";
		htmlStr  += "	</div>";
		htmlStr  += "	<div class='comment-content'>"+replace_metion(replace_em(v.description))+"</div>";
		htmlStr  += "	<div class='comment-comment-file'>";
		if(v.attachment){
			var imgStr = "";
			var notImgStr = "";
			$.each(v.attachment,function(x,y){
				var fileLength = parseFloat(y.size);
				var showLength = fileLength/1024;
				var toLength = "";
				if(showLength>500){
					toLength = toDecimal(showLength/1024)+"M";
				}else{
					toLength = toDecimal(showLength)+"KB";
				}
				var attType = y.name.substring((y.name.lastIndexOf(".")+1)).toLowerCase();
				if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
					if(userId==v.createById){
						imgStr +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath() + y.accessPath+"' status='"+y.id+"' contenteditable='false' data-role='none'>"+y.name+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath() + y.accessPath+"' class='hide'><span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
					}else{
						imgStr +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath() + y.accessPath+"' status='"+y.id+"' contenteditable='false' data-role='none'>"+y.name+" ("+toLength+")<span class='preview'>预览</span><img src='"+startUp.getRootPath() + y.accessPath+"' class='hide'></a>";
					}
				}else{
					notImgStr += "                   <a target='_self' class='file-style' href='"+startUp.getRootPath() + y.accessPath+"' status='"+y.id+"'>" ;
					notImgStr += 						y.name+" ("+toLength+")" ;
					if(userId==v.createById){
						notImgStr += "						<span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'>" ;
					}
					notImgStr += "						</span>" ;
					notImgStr += "				    </a>" ;
				}
			});
			htmlStr += "				<div class='file-images'>"+imgStr+"</div>" ;
			htmlStr += "				<div class='file-list sicon-file20'>"+notImgStr ;
			htmlStr += "				</div>" ;
		}else{
			htmlStr += "				<div class='file-images'></div>" ;
			htmlStr += "				<div class='file-list sicon-file20'>" ;
			htmlStr += "				</div>" ;
		}
		htmlStr  += "</div>";
		htmlStr  += "</div>";
		return htmlStr;
}


/**
 * @成员列表的加载
 */
commentView.showMemberToSelectMetion = function(k,v){
	var htmlStr  = "";
		htmlStr += "<div class='lists'>";
		htmlStr += 		organizeView.showDefaultPhoto(v.photo,v.loginName);
		htmlStr += "	<div class='info'>";
		htmlStr += "		<div class='name'>"+v.loginName+"</div>";
		htmlStr += "		<div class='email'>"+v.email+"</div>";
		htmlStr += "	</div>";
		htmlStr += "</div>";
	return htmlStr;
}
