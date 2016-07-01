//注册页面的验证和js狡猾

$(function(){
	$("body").css('min-height',$(document).height()-40+"px");
	$("form.custom-check").bind("submit",input_chack);
	
	//显示注册服务条款
	$(".log-form a.service-clause").bind("click",function(){
		$("body .footer").hide();
		$(this).parents(".content.register").slideUp("300",function(){
			$(this).next("div.service-clause-content").slideDown(function(){
				$("body .footer").show();
			});
		});
	});
	//确认注册服务条款
	$(".service-clause-content button.affair-clause").bind("click",function(){
		$("body .footer").hide();
		$(this).parents(".content.service-clause-content").slideUp("300",function(){
			$(this).prev("div.content.register").slideDown(function(){
				$("body .footer").show();
			});
		});
	});
	
})

/*
 * 遍历表单，进行验证。
 */
var input_chack=function(){
	var attr_arr=visible.visibles_attr.split(',');
	$(this).find("input[class]").each(function(){
		
		input_chack_each($(this));
		
	});

	for(var i=0,len=attr_arr.length;i<len;i++){
	
		$(this).find("input["+attr_arr[i]+"]").each(function(){
			input_chack_attr($(this),attr_arr[i]);
			
		})
	}
	if($(this).find("input.error").length<=0){
		var password=$(this).find("input[type='password']");
		if(password.length>1){
	
			if(!(password[0].value==password[1].value)){
				password.addClass("error");
				add_message(password.last(),"两次密码输入不一致");
			}
		}
	}
	return $(this).find("input.error").length<=0;
	
}
/*
 * 遍历需要做的验证
 */
var input_chack_each=function(_this){
	
	var check_arr=_this.attr("class").split(/\s+/);
	for(var i=0,len=check_arr.length;i<len;i++){
        if(check_arr[i]!=""&&visible.visibles.indexOf(check_arr[i])>=0){

        	if(!eval('visible.'+check_arr[i]+"('"+_this.val()+"')")){
        		add_error(_this,eval('visible.message.'+check_arr[i]));       		
        	    return false;
        	}
        }
	}
	
	return true;
}
/*
 * 动态验证
 */
var input_chack_each_only=function(_this){
	var attr_arr=visible.visibles_attr.split(',');
	var check_arr=_this.attr("class").split(/\s+/);
	for(var i=0,len=check_arr.length;i<len;i++){
        if(check_arr[i]!=""&&visible.visibles.indexOf(check_arr[i])>=0){
        
        	if(!eval('visible.'+check_arr[i]+"('"+_this.val()+"')")){     		
        	    return eval('visible.message.'+check_arr[i]);
        	}
        }
	}
	for(var i=0,len=attr_arr.length;i<len;i++){
		if(_this.attr(attr_arr[i])&&input_chack_attr_only(_this,attr_arr[i])){
			return input_chack_attr_only(_this,attr_arr[i]);
		}
			

	}
	
	return true;
}
/*
 *验证属性 
 */
var input_chack_attr=function(_this,attr){

	if(!eval('visible.'+attr+"('"+_this.val()+"',"+_this.attr(attr)+")")){
		add_error(_this,eval('visible.message.'+attr).replace(/b/,_this.attr(attr)));       		
	   return false;
	}
}
var input_chack_attr_only=function(_this,attr){
	if(!eval('visible.'+attr+"('"+_this.val()+"',"+_this.attr(attr)+")")){
		return eval('visible.message.'+attr).replace(/b/,_this.attr(attr));       		

	}
	
	return false;
}
/*
 * 验证对象
 */

var visible={
		message:{
			required:'不能为空',
			email:"请输入正确格式的电子邮件",
			min:'最小不能少于b个字符',
			max:'最小不能超过b个字符',
			onlyEnglish:'不能包含中文字符'
		},
		required:function(value){
			return value==''?false:true;
		},
		onlyEnglish:function(value){
			return !(/[\u4e00-\u9fa5]+/i.test(value));
		},
		email:function(value){
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},
		min:function(value,len){
			return value.length<len?false:true;
		},
		max:function(value,len){
			return value.length>len?false:true;
		},
		visibles:"required,email,onlyEnglish",
		visibles_attr:"min,max"
}
/*
 *添加错误样式提醒 
 */

var add_error=function(_this,mes,attr){
	 _this.unbind("blur",checkinput);
	 _this.bind("blur",checkinput);
    _this.keyup(checkinput);
	if(!_this.hasClass('error')){
		_this.addClass('error');
		add_message(_this,mes);
	}else{
		add_message(_this,mes);
	}
}
/*
 * 动态检查input是否合法
 */

var checkinput=function(_This){
	var ThisInput=_This?_This:$(this);
	
	var back_val=input_chack_each_only(ThisInput);
	if(typeof back_val =="string"){
		ThisInput.hasClass("error")?'':ThisInput.addClass("error");
		add_message(ThisInput,back_val);
	}else{
		ThisInput.removeClass("error");
		ThisInput.next('span.i-error').remove();

	}
	ThisInput.unbind("blur",checkinput);
}
/*
 * 显示提示信息
 */
var add_message=function(Othis,message){
	var span=$("<span class='i-error '>  * "+message+"</span>");
	Othis.next("span.i-error").remove();
	span.css({'top':Othis.position().top+(Othis.height()/2)-span.height()+'px','left':Othis.position().left+Othis.width()+30+"px"});
	Othis.after(span);
}

/**
 * 用户名验证是否可用
 */
$(document).on("input","#userLoginName",function(){
	checkinput($(this));
	var thisInput=$(this);
	var loginName = $(this).val();
	var url = "/m/system/user/findUserInfoByUserLoginName";
	var data = {"loginName":loginName}
	
	startUp.postAsyncData(url, data, function(data){
		if(data){
			thisInput.addClass('error');
			if(thisInput.next('.i-error').length>0){
				thisInput.next('.i-error').text("用户名已存在");
			}else{
				thisInput.after("<span class='i-error' >用户名已存在</span>");
			}
			
			thisInput.next("span.i-error").css({'top':thisInput.position().top+(thisInput.height()/2)-thisInput.next("span.i-error").height()+'px','left':thisInput.position().left+thisInput.width()+30+"px"});
		}
	});
	/*$.ajax({
		url : url,
		type : "POST",
		cache : false,
		timeout : 7000,
		async:false,
		dataType : "json",
		data: data,
		success : function(data) {
			if(data){
				thisInput.addClass('error');
				if(thisInput.next('.i-error').length>0){
					thisInput.next('.i-error').text("用户名已存在");
				}else{
					thisInput.after("<span class='i-error' >用户名已存在</span>");
				}
				
				thisInput.next("span.i-error").css({'top':thisInput.position().top+(thisInput.height()/2)-thisInput.next("span.i-error").height()+'px','left':thisInput.position().left+thisInput.width()+30+"px"});
			}
		}
	});*/
	
});

/**
 * 邮箱验证是否已存在
 */
$(document).on("input","#userEmail",function(){
	var thisInput=$(this);
	var email = $(this).val();
	var url = "/m/system/user/findUserInfoByUserEmail";
	var data = {"email":email};
	checkinput(thisInput);
	
	startUp.postAsyncData(url, data, function(data){
		if(data){

			thisInput.addClass('error');
			if(thisInput.next('.i-error').length>0){
				thisInput.next('.i-error').text("邮箱已经注册");
			}else{
				thisInput.after("<span class='i-error' >邮箱已经注册</span>");
			}
			thisInput.next("span.i-error").css({'top':thisInput.position().top+(thisInput.height()/2)-thisInput.next("span.i-error").height()+'px','left':thisInput.position().left+thisInput.width()+30+"px"});
		}
	});
	/*$.ajax({
		url : url,
		type : "POST",
		cache : false,
		timeout : 7000,
		async:false,
		dataType : "json",
		data: data,
		success : function(data) {
			if(data){

				thisInput.addClass('error');
				if(thisInput.next('.i-error').length>0){
					thisInput.next('.i-error').text("邮箱已经注册");
				}else{
					thisInput.after("<span class='i-error' >邮箱已经注册</span>");
				}
				thisInput.next("span.i-error").css({'top':thisInput.position().top+(thisInput.height()/2)-thisInput.next("span.i-error").height()+'px','left':thisInput.position().left+thisInput.width()+30+"px"});
			}
		}
	});*/
	
});

