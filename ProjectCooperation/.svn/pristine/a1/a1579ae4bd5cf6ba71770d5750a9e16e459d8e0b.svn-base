
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
		htmlStr += 					organizeView.showDefaultPhoto(v.photo,v.userName) ;
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
					notImgStr += "			<div class='files-div'>";
					notImgStr += "				<div class='files-div-img'>";
					notImgStr += "					<a target='_self' class='file-style' href='" + startUp.getRootPath() + y.accessPath + "' status='"+y.id+"'>";
					notImgStr += "					</a>";
					notImgStr += "				</div>";
					notImgStr += "				<div class='files-div-text name'>"+y.name+"</div>";
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
		//htmlStr += "			<img src='"+startUp.getRootPath()+"/static/modules/surfond/common/new-images/test-img/default-portrait.png' data-toggle='dropdown' title=''>";
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




