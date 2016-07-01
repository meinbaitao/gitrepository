
var conversationView = {};


/**
 * 话题模块组装团队列表
 */
conversationView.showTeamConversation = function(k,v){
	var htmlStr = "<div class='design-topics team-conversation-each' teamId='"+v.id+"' title='"+v.name+"'>"+startUp.subStr(v.name,23)+"</div>";
	return htmlStr;
}

/**
 * 组装热点话题列表
 */
conversationView.showHotConversationList = function(k,v){
	var htmlStr = "";
		htmlStr = "<li class='hot-topic hot-conversation-each' conversation-id='"+v.id+"' title='"+v.title+"'>#"+startUp.subStr(v.title,35)+"#</li>";
	return htmlStr;
}

/**
 * 组装单个话题
 */
conversationView.showOneConversationCss = function(k,v,thisUserPhoto){
	var  isPraise = v.isPraise;				//是否点过赞
	var favoriteFlag = v.favoriteFlag;		//是否收藏过
	var userId = $("#checkedUser").attr("user-id");//当前用户ID
	
	var htmlStr = "";
		htmlStr += "<div class='thematic-content'>";
		htmlStr += "	<div class='row'>";
		htmlStr += "		<div class='subject-head col-xs-2 member-portrait'>";
		htmlStr += 					conversationView.showDefaultPhoto(v.photo,v.userName) ;
		htmlStr += "		</div>";
		htmlStr += "		<div class='subject-headings col-xs-10'>";
		htmlStr += "			<div class='title-content' title='"+v.title+"'>"+v.title+"</div>";//startUp.subStr(v.title,40)
		htmlStr += "			<span class='date'>";
		htmlStr += "				<span class='name'>"+v.userName+"</span>&nbsp;&nbsp;";
		htmlStr += "				<span>"+v.createDate+"</span>";
		htmlStr += "			</span>";
		if(userId==v.userId){
				htmlStr += "			<div class='sicon-dropdown down pull-right' data-toggle='dropdown'></div>";
				htmlStr += "			<ul class='dropdown-menu'>";
				htmlStr += "				<li class='cancelConversation' status='"+v.id+"'>删除</li>";
				htmlStr += "			</ul>";
			}
		htmlStr += "		</div>";
		htmlStr += "	</div>";
		htmlStr += "	<div class='subject-content'>"+replace_metion(replace_em(v.description))+"</div>";
		htmlStr += "	<div class='comment-conversation-file'>";
		
		htmlStr += "		<div class='file-images'>";
		
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
					imgStr += "			<div class='imgs-div'>";
					imgStr += "				<img title='" + y.name + "' src='" + startUp.getRootPath() + y.accessPath + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"'>";
					imgStr += "			</div>";
				}else{
					var y=y.name;
					var length = y.substring(0,y.indexOf(".")).length;
					var str0 = y.substring(0,y.indexOf("."));
					var str1 = str0.substring(0,3)+"... ";
					var str2 = y.substring(y.indexOf("."),100);
					notImgStr += "			<div class='files-div'>";
					notImgStr += "				<div class='files-div-img'>";
					notImgStr += "					<a title='"+y+"' target='_self' class='file-style' href='" + startUp.getRootPath() + y.accessPath + "' status='"+y.id+"'>";
					notImgStr += "					</a>";
					notImgStr += "				</div>";
					if(length > 5){
						notImgStr += "			<div class='files-div-text name'>"+str1+str2+"</div>";
					}else{
						notImgStr += "			<div class='files-div-text name'>"+y+"</div>";
					}
					notImgStr += "				<div class='files-div-text'>( "+toLength+" )</div>";
					notImgStr += "			</div>";
				}
			});
			htmlStr += imgStr + notImgStr;
		}
		
		
		htmlStr += "		</div>";
		htmlStr += "	</div>";
		htmlStr += "	<div class='subject-footer'>";
		htmlStr += "		<ul>";
		htmlStr += "			<li class='conversation-to-favorite' conversation-id='"+v.id+"'>";
		if(favoriteFlag=='0'){
			htmlStr += "				<span class='sicon-star-empty' id='conversation-favorite-"+v.id+"'></span>";
		}else{
			htmlStr += "				<span class='sicon-star' id='conversation-favorite-"+v.id+"'></span>";
		}
		htmlStr += "				<span>收藏</span>";
		htmlStr += "			</li>";
		htmlStr += "			<li class='reveal-show click-to-show-conversation-comment bookmark-conversation' conversation-id='"+v.id+"'>";
		htmlStr += "				<span class='reveal-show-sicon-discuss' id='conversation-comment-count-"+v.id+"'>评论("+v.commentCount+")</span>";
		htmlStr += "			</li>";
		htmlStr += "			<li class='conversation-to-praise' conversation-id='"+v.id+"'>";
		if(isPraise=='0'){
			htmlStr += "				<span class='sicon-thumbs-empty' id='conversation-praise-css-"+v.id+"' status='0'></span>";
		}else{
			htmlStr += "				<span class='sicon-thumbs' id='conversation-praise-css-"+v.id+"' status='1'></span>";
		}
		htmlStr += "				<span id='conversation-praise-count-"+v.id+"'>赞("+v.praiseAmount+")</span>";
		htmlStr += "			</li>";
		htmlStr += "		</ul>";
		htmlStr += "	</div>";
		htmlStr += "	<div class='comment-box'>";
		htmlStr += "		<div class='sicon-show-comment'></div>";
		htmlStr += "		<div class='member-portrait member-portrait-comment'>";//comment-capit startUp.getRootPath()+space.getThisLoginUserBaseInfo().photo
		htmlStr += "			<img src='"+thisUserPhoto+"' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"'>";
		htmlStr += "		</div>";
		htmlStr += "		<div class='input-div-placeholder'>说点什么...</div>";
		htmlStr += "		<div contenteditable='true' name='saytext' id='comment-description-"+v.id+"' class='input-div saytext active'></div>";
		htmlStr += "		<div class='emotion-line'>";
		htmlStr += "			<span class='emotion sicon-face25' title='添加表情'></span>";
		htmlStr += "			<span class='sicon-related clickShowMembers' title='@成员'></span>";
		htmlStr += "			<span class='add-comment-file sicon-file25' title='添加附件'>";
		htmlStr += "				<form enctype='multipart/form-data' method='post' id='f'>";
		htmlStr += "					<input type='file' data-role='none' class='files' style='display:none;'>";
		htmlStr += "					<div class='commentHiddenUUID'><input type='hidden' class='commentuuid' id='commentuuid_"+v.id+"' value=''></div>";
		htmlStr += "				</form>";
		htmlStr += "			</span>";
		htmlStr += "			<ul class='dropdown-menu to-include-metion-member'></ul>";
		htmlStr += "			<input type='button' class='comment_input_submit add-conversation-comment' status='"+v.id+"' value='评论'>";
		htmlStr += "		</div>";
		htmlStr += "		<div class='commentFilelist'></div>";
		htmlStr += "		<div class='conversation-comment-box' id='conversation-comment-list-"+v.id+"'>";
		htmlStr += "		</div>";
		htmlStr += "		<div class='surplus'></div>";
		htmlStr += "	</div>";	
		htmlStr += "</div>";
	return htmlStr;
}

/**
 * 单个成员样式组装
 */
conversationView.splitOrganizeMemberCss = function(k,v){
	var	htmlStr  = 	"<li title='"+v.userName+"'>";
		htmlStr += 	"		<span class='member-portrait'>";
		htmlStr +=  			conversationView.showDefaultPhoto(v.photo,v.userName);
		htmlStr += 	"		</span>";
		htmlStr += 	"		<span class='member-name'>"+v.userName+"</span>";
		htmlStr += 	"</li>";
		
	return htmlStr;
}

/**
 * 处理头像显示
 */
conversationView.showDefaultPhoto = function(photo,name){
	var htmlStr = "";
	if(photo){
		htmlStr += "<img class='portrait' title='" + name + "' src='" + startUp.getRootPath() + photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"\"'>";
	}else{
		htmlStr += "<img class='portrait' title='" + name + "' src='"+startUp.getRootPath()+"/static/modules/surfond/common/images/photo_40.png?tsf="+varsion+"'>";
	}
	return htmlStr;
}



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
		htmlStr += 						conversationView.showDefaultPhoto(v.createByPhoto,v.createByName) ;
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
		htmlStr  += 		conversationView.showDefaultPhoto(v.createByPhoto,v.createByName);
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
		htmlStr += 		conversationView.showDefaultPhoto(v.photo,v.loginName);
		htmlStr += "	<div class='info'>";
		htmlStr += "		<div class='name'>"+v.loginName+"</div>";
		htmlStr += "		<div class='email'>"+v.email+"</div>";
		htmlStr += "	</div>";
		htmlStr += "</div>";
	return htmlStr;
}


/**
 * 组装空间成员搜索列表
 */
conversationView.spaceMemberEach = function(idx, item){
	var htmlStr = "";
	htmlStr += "<div member-id='" + item.id + "' class='lists'>";
	if(item.photo){
		htmlStr += "	<img class='members' member-id='" + item.id + "' title='" + item.name + "' src='" + startUp.getRootPath() + item.photo + "' onerror='this.src=\"" + startUp.getRootPath() + "/static/modules/surfond/common/images/photo_30.png?tsf=" +varsion+"\"'>";
	}else{
		htmlStr += "	<span class='members' member-id='" + item.id + "' title='" + item.name + "'>" + item.name.split("").reverse().join("").substring(0, 1) + "</span>";
	}
	htmlStr += "	<div class='info'>";
	htmlStr += "		<div class='name'>" + item.name + "</div>";
	htmlStr += "		<div class='email'>" + item.email + "</div>";
	htmlStr += "	</div>";
	htmlStr += "</div>";
	return htmlStr;
}
