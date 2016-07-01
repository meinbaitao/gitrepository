(function($){
	var Doc=$(document);
	//QQ表情插件
	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path : 'face/',
			assign : 'content',
			tip : 'em_'
		};
		var option = $.extend(defaults, options);
		var assign = $('#'+option.assign);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;
		$(".face,.f_face,.f_face span").click(function(e){
			var strFace, labFace;
			if($('#'+id).length<=0){
				strFace = '<div id="'+id+'" style="position:absolute;display:none;z-index:1000;" class="qqFace">' +
							  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i=1; i<=75; i++){
					labFace = '['+tip+i+']';
					strFace += '<td id="'+i+'"><img class="ff_img" src="'+path+i+'.gif" /></td>';
					if( i % 20 == 0 ) strFace += '</tr><tr id="tr'+i+'">';
				}
				strFace += '</tr></table></div>';
			}
			$(this).parent().append(strFace);
			var offset = $(this).position();
			var top = offset.top + $(this).outerHeight();
			$('#'+id).show();
			e.stopPropagation();
			$("#facebox").find("tr").children(":last-child").after("<td class='delete_img'>X</td>")
		});
	};
	//
		Doc.on("touchstart",".contents li",function(){
			$(".contents li i").removeClass("border_b");
			$(this).find("i").addClass("border_b");
			var id=$(this).attr("id"),dd=id.substring(3,4);
				$(".c_test>div").each(function(){
				if($(this).attr("id")==dd){
					$(".c_test>div").removeClass("c_test_div")
					$(this).addClass("c_test_div") 
				}
 			});
		})
	//切换qq图片
	//表情 
		$('.emotion').qqFace({
			id : 'facebox', 
			assign:'saytext', 
			path:'arclist/'	//表情存放的路径
		});
		//$(".input_s").focus();
})(jQuery);
jQuery.extend({ 
unselectContents: function(){ 
	if(window.getSelection) 
		window.getSelection().removeAllRanges(); 
	else if(document.selection) 
		document.selection.empty(); 
	} 
}); 
jQuery.fn.extend({ 
	selectContents: function(){}, 
	setCaret: function(){}, 
	insertAtCaret: function(textFeildValue){ } 
});
