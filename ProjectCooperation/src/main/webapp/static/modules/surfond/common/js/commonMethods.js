//一些共用方法的取
var commonMethods = (function() {
  
  var defaultSetting = function(){//取消回车提交表单
	  $(document).on('keydown','input,textarea',function(event){	

		 var target, code, tag;  
         if (!event) {  
             event = window.event; //针对ie浏览器  
             target = event.srcElement;  
             code = event.keyCode;  
             if (code == 13) {  
                 tag = target.tagName;  
                 if (tag == "TEXTAREA") { return true; }  
                 else { return false; }  
             }  
         }else {  
             target = event.target; //针对遵循w3c标准的浏览器，如Firefox  
             code = event.keyCode;  
             if (code == 13) {  
                 tag = target.tagName;  
                 if (tag == "INPUT") { return false; }  
                 else { return true; }   
             }  
         }  
	});
	
  };
 
  
//显示确认框
	function showConfirmNav(title, yes, no) {
		var str = "";
		if ($("body").find('.delete-bg-shade').length > 0) {
			$(".delete-bg .confirm-info").html(title);
		} else {
			str = html.showConfirmDiv(title);
			$("body").append(str)
		}

		$("body").find('.delete-bg-shade').fadeIn(function() {
			$(this).unbind('click');
			$(this).bind('click', function() {
				hideConfirmNav();
				if (no && typeof(no) == 'function') no();
			});
		});
		$("body").find('.delete-bg').fadeIn(function() {
			$(this).find('.confirm-yes').unbind("click");
			$(this).find('.confirm-yes').bind("click", function() {
				hideConfirmNav();
				if (yes) yes()
			});
			$(this).find('.confirm-no').unbind("click");
			$(this).find('.confirm-no').bind("click", function() {
				hideConfirmNav();
				if (no && typeof(no) == 'function') no();
			});
		});
	}

//隐藏确认框
	function hideConfirmNav() {
		$("body").find('.delete-bg-shade').fadeOut();
		$("body").find('.delete-bg').fadeOut()
	}

//显示提示框
	function showAlertNav(title, yes, no) {

		var str = "";
		if ($("body").find('.alert-bg-shade').length > 0) {
			$(".alert-bg .alert-info").html(title);
		} else {
			str = html.showAlertDiv(title);
			$("body").append(str)
		}

		$("body").find('.alert-bg-shade').fadeIn(function() {
			$(this).unbind('click');
			$(this).bind('click', function() {
				hideAlertNav();
			});
		});
		$("body").find('.alert-bg').fadeIn(function() {
			$(this).find('.alert-yes').unbind("click");
			$(this).find('.alert-yes').bind("click", function() {
				hideAlertNav();
			});

		});
		return false;
	}


//隐藏提示框
	function hideAlertNav() {
		$("body").find('.alert-bg-shade').fadeOut();
		$("body").find('.alert-bg').fadeOut();
	}
	//显示操作结构提示框
	function operatResultAlert(content,result){
		var timeOut='';
		if($('body>.operat-result-alert').length>0){
			$('body>.operat-result-alert').fadeOut(function(){
				$(this).remove();
			})
		}
		
		operatResultAlertHtml=$(html.operatResultAlert(content,result));
		$("body").append(operatResultAlertHtml);
		operatResultAlertHtml.find('.close-operat-alert').click(function(){
			operatResultAlertHtml.fadeOut(2000,function(){$(this).remove()})
		});
		operatResultAlertHtml.animate({'top':'50px'},function(){
			timeout=setTimeout(function(){operatResultAlertHtml.fadeOut(2000,function(){$(this).remove()})},3000);
		});
		
		
	}
//操作成功提示
  function operatSuccess(){
	  
  }
  
  return {
	defaultSetting:defaultSetting,
    showConfirmNav:showConfirmNav,
    showAlertNav:showAlertNav,
    operatResultAlert:operatResultAlert
  }
  
})();


