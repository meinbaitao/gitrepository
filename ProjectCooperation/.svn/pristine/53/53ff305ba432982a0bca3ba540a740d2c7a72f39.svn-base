
var attachmentView = {};


/**
 * 显示项目附件
 */
attachmentView.showProjectAttachmentList = function(k,v){
	var str = "";
	var noPhoto  = "<a href='javascript:void(0);' >";
		noPhoto += "	<div class='imgs-icon'></div>";
		noPhoto += "</a>";
		noPhoto += "<div class='file-info'>";
		noPhoto += "	<div class='upload-for'>";
		noPhoto += "		<div class='members owner color-1'>"+v.userName+"</div>";
		noPhoto += "	</div>";
		noPhoto += "	<div class='name-task'>";
		noPhoto += "		<a  target='_self' href='"+startUp.getRootPath()+v.accessPath+"' class='file-name'>"+v.name+"</a>";
		noPhoto += "		<a  href='javascript:void(0)' class='task-for'>"+v.createDate+"</a>";
		noPhoto += "	</div>";
		noPhoto += "</div>";
		noPhoto += "</div>";

	var photo ="";
	if(v.accessPath){
		photo += "<a href='javascript:void(0);' >";
		photo += "	<img src='"+startUp.getRootPath()+v.accessPath+"'>";
		photo += "</a>";
		photo += "<div class='file-info'>";
		photo += "	<div class='upload-for'>";
		photo += "		<div class='members owner color-1'>"+v.userName+"</div>";
		photo += "	</div>";
		photo += "	<div class='name-task'>";
		photo += "		<a  target='_self' href='"+startUp.getRootPath()+v.accessPath+"' class='file-name'>"+v.name+"</a>";
		photo += "		<a  href='javascript:void(0)' class='task-for'>"+v.createDate+"</a>";
		photo += "	</div>";
		photo += "</div>";
		photo += "</div>";
	}else{
		photo = noPhoto;
	}

	var attType = v.name.substring(v.name.lastIndexOf(".")+1);
	//判断类型GIF、JPEG、BMP、TIFF、PNG
	switch(attType){
		case 'zip': str += "<div class='files file-zip'>"+noPhoto;break;
		case 'html': str += "<div class='files file-html'>"+noPhoto;break;
		case 'doc': str += "<div class='files file-doc'>"+noPhoto;break;
		case 'xls': str += "<div class='files file-xls'>"+noPhoto;break;
		case 'ppt': str += "<div class='files file-ppt'>"+noPhoto;break;
		case 'pdf': str += "<div class='files file-pdf'>"+noPhoto;break;
		case 'mp3': str += "<div class='files file-mp3'>"+noPhoto;break;
		case 'txt': str += "<div class='files file-txt'>"+noPhoto;break;
		case 'gif': str += "<div class='files'>"+photo;break;
		case 'jpeg': str += "<div class='files'>"+photo;break;
		case 'bmp': str += "<div class='files'>"+photo;break;
		case 'tiff': str += "<div class='files'>"+photo;break;
		case 'png': str += "<div class='files'>"+photo;break;
		case 'jpg': str += "<div class='files'>"+photo;break;
		default:str += "<div class='files file'>"+noPhoto;
	}
	
	return str;
}

/**
 * 任务附件显示样式
 */
attachmentView.showOneTaskAttachmentList=function(index,data){
	var userId = $("#checkedUser").attr("user-id"); 
	var imgHtml = "<div class='file-images'>";
	var fileHtml = "";
	$.each(data,function(x,y){
		var fileLength = parseFloat(y.size);
		var showLength = fileLength/1024;
		var toLength = "";
		if(showLength>500){
			toLength = toDecimal(showLength/1024)+"M";
		}else{
			toLength = toDecimal(showLength)+"K";
		}
		var attType = y.name.substring((y.name.lastIndexOf(".")+1)).toLowerCase();
		if(userId==y.userId){
			if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
				imgHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span class='preview'>预览</span><span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
			}else{
				fileHtml +="<a target='_self' class='file-style ' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span title='删除文件' status='"+y.id+"' class='sicon-remove cancelFile'></span></a>";
			}
		}else{
			if(attType=="gif" || attType=="jpeg" || attType=="bmp" || attType=="tiff" || attType=="png" || attType=="jpg"){
				imgHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span class='preview'>预览</span><span title='"+y.name+"'></span></a>";
			}else{
				fileHtml +="<a target='_self' class='file-style haspreview' href='"+startUp.getRootPath()+y.accessPath+"' status='"+y.id+"' >"+y.name+" ("+toLength+")<span title='"+y.name+"'></span></a>";
			}
		}
	});
	imgHtml+='</div>';
	return "<div class='file-list '>"+imgHtml+fileHtml+"</div>";
}




