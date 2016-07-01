
var commonView = {};
/**
 *组装任务责任人
 */
commonView.taskResponsible=function(logo,name){
	
	var htmlStr = "";
	var currentDate=new Date();
    currentDate=((currentDate.getMonth()+1)<10?'0'+(currentDate.getMonth()+1):currentDate.getMonth()+1)+'-'+currentDate.getDate()+' '+currentDate.getHours()+":"+currentDate.getMinutes();
	htmlStr ="<li class='last-child'>"+
	         "   <div class='members'>"+
                    logo+
             " </div>"+
		    "   <div class='log-info'>"+
		    "      <span class='name'>"+name+"</span>"+
		    "      <span class='responsible-time'>"+currentDate+"</span>"
		    "   </div>"
		    "</li>"
	return htmlStr;
}



/**
 * 组装意见反馈信息的回复列表
 */
commonView.operatResultAlert=function(content,result){
	var str='';
	str =  "<div class='operat-result-alert " +(result==0?'failure':'')+ "'>"+
			"	<span class='icon-result-alert'></span>  "+
			"	<span class='operat-result-content'>"+content+"</span>"+
			"	<span class='close-operat-alert'></span>"+
			"</div>"
			
	return str;
}


/**
 *
 *组装确认对话框
 **/
commonView.showConfirmDiv=function(title){
	var str="";
	str="		<div class='delete-bg-shade'></div>"
		+"		<div class='delete-bg'>"
		+"		   <div class='confirm-info'>"+title+"</div>"
		+"		   <div class='confirm-btn'>"
		+"		      <span class='confirm-no'>取消</span>"
		+"		      <span class='confirm-yes'>确定</span>"
		+"		   </div>"
		+"		</div>"
	return str;
}

/**
*
*组装提示对话框
**/
commonView.showAlertDiv=function(title){
	var str="";
	str="		<div class='alert-bg-shade'></div>"
		+"		<div class='alert-bg'>"
		+"		   <div class='alert-info'>"+title+"</div>"
		+"		   <div class='alert-btn'>"
		+"		      <span class='alert-yes'>确定</span>"
		+"		   </div>"
		+"		</div>"
	return str;
}

/**
*
*组装图片显示对话框
**/
commonView.showImageLargeDiv=function(){
	var str="";
	str="<div class='imgEnlargeNav'>"
	    +   "<div class='imgshowDiv'>"
	    +      "<span class='icon-remove'></span>"
	    +   "</div>"
	    +"</div>"
	return str;
}

/**
 * 组装邀请成员列表
 */
commonView.inviteMeber=function(name,emial,id){
  var str='';
    str = "<div class='invite-member' member-id='"+id+"' >"
         +"   <div class='member-info'>"
         +"    <span class='name'>"+name+"</span>"
         +"    <span class='email'>"+emial+"</span>"
         +"    <span class='delete'>X</span>"
         +"  </div>"
         +"</div>";
   return str;
}