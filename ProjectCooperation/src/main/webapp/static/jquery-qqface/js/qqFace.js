// QQ表情插件
(function($){  
	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path : 'face/',
			assign : 'content',
			tip : 'em_'
		};
		var option = $.extend(defaults, options);
		var assign = $(this);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;
		if(assign.length<=0){
			//alert('缺少表情赋值对象。');
			return false;
		}
		
		$(this).click(function(e){
			var testId = $(this).parent().prev().attr("id");
			var strFace, labFace;
			if($('#'+id).length<=0){
				strFace = '<div id="'+id+'"  class="qqFace">' +
							  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i=1; i<=75; i++){
					labFace = '['+tip+i+']';
					strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+testId+'\').setCaret();$(\'#'+testId+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
					if( i % 15 == 0 ) strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
			}
			
			$(this).parent().append(strFace);
			var offset = $(this).position();
			var top = offset.top + $(this).outerHeight();
			$('#'+id).css('top',top);
			$('#'+id).css('left',offset.left);
			$('#'+id).show();
			e.stopPropagation();
		});

		$(document).click(function(){
			$('#'+id).hide();
			$('#'+id).remove();
		});
	};

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
	selectContents: function(){ 
		$(this).each(function(i){ 
			var node = this; 
			var selection, range, doc, win; 
			if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){ 
				range = doc.createRange(); 
				range.selectNode(node); 
				if(i == 0){ 
					selection.removeAllRanges(); 
				} 
				selection.addRange(range); 
			} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){ 
				range.moveToElementText(node); 
				range.select(); 
			} 
		}); 
	}, 

	setCaret: function(){ 
		var initSetCaret = function(){ 
			var textObj = $(this).get(0); 
			textObj.caretPos = document.selection.createRange().duplicate(); 
		}; 
	}, 

	insertAtCaret: function(textFeildValue){ 
		var str = textFeildValue.replace("]","");
		var one = str.substr(4);
		var qqfacedir = startUp.getRootPath()+"/static/jquery-qqface/arclist/";
		$(this).append("<img class='qq_face' name='[em_"+one+"]' src='"+qqfacedir+one+".gif' />");
		
	} 
});

$(function(){
	add_qqFace();
});

/**
 * 表情替换
 * @param str
 * @returns
 */
function replace_em(str){
	str = str.replace(/\</g,'&lt;');
	str = str.replace(/\>/g,'&gt;');
	str = str.replace(/\n/g,'<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g,'<img src="'+startUp.getRootPath()+'/static/jquery-qqface/arclist/$1.gif"/>');
	return str;
}
/**
 * @对话成员
 * @param str
 * @returns
 */
function replace_metion(str){
	str = str.replace(/\n/g,'<br/>');
	str = str.replace(/\[metion_(@.*?)_surfond_(.*?)\]/g,'<a href="#" class="remembersomeone" email="$2">$1</a>');
	return str;
}

var add_qqFace=function(){
	var qqfacedir = startUp.getRootPath()+"/static/jquery-qqface/arclist/";
	$('.emotion').qqFace({
		id : 'facebox', 
		assign:'saytext', 
		path: qqfacedir	//表情存放的路径
	});
}


