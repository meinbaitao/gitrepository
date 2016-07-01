var doGuide = (function(guideStep) { //成员拖动
    var guideStepArr=guideStep;
    if($("body>.guide-operat").length==0){
    	$("body").prepend(html.GuideDiv());
    }else{
    	$("body>.guide-operat").fadeIn();
    	$("body>.guide-operat").find('.begin-now').attr('class','next-step');

    }
    
    doGuideStep(guideStepArr)//执行指引操作。

	
	
				
});

var doGuideStep=function(guideStep){
	var guideArrows=$('.guide-operat .guide-arrows').attr("class","guide-arrows"),
    guideArrowsObject=$(guideStep[0].guideArrowsObject),
    ArrowsObjectCoverLayer=$(guideStep[0].ArrowsObjectCoverLayer),
    guideContent=$('.guide-operat .guide-content');
	if(guideArrowsObject.length==0){
		$("body .guide-operat").hide();
		return false;
	}
	var ArrowsObjectTop=guideArrowsObject.offset().top,
    ArrowsObjectLeft=guideArrowsObject.offset().left;	
    ArrowsObjectCoverLayer.css({top:ArrowsObjectTop-parseInt(guideArrowsObject.css('margin-top'))+"px",left:ArrowsObjectLeft+'px'}).addClass('current').siblings().removeClass('current');//设置遮罩层位置
	
	if(guideStep[0].copySize==true){
		ArrowsObjectCoverLayer.css({width:guideArrowsObject[0].offsetWidth+"px",height:guideArrowsObject[0].offsetHeight+"px"}); //设置箭头位置
	}
	
	if(guideStep[0].arrowsDirection=='left'){
		
		var guideArrowsLeft=ArrowsObjectLeft+ArrowsObjectCoverLayer[0].offsetWidth+5,
		    guideArrowsTop=ArrowsObjectTop+ArrowsObjectCoverLayer[0].offsetHeight;		
		(guideStep[0].offsetLeft)&&(guideArrowsLeft-=guideStep[0].offsetLeft);
		(guideStep[0].offsetTop)&&(guideArrowsTop+=guideStep[0].offsetTop);
		guideArrows.css({top:guideArrowsTop+"px",left:guideArrowsLeft+"px"}); //设置箭头位置

		
		var guideContentLeft=guideArrowsLeft-50,
		    guideContentTop=guideArrowsTop+guideArrows[0].offsetHeight;
		guideContent.css({top:guideContentTop+"px",left:guideContentLeft+"px"});//设置提示框位置
						
	}
	if(guideStep[0].arrowsDirection=='right'){
		guideArrows.addClass("right");
		var guideArrowsLeft=ArrowsObjectLeft-guideArrows[0].offsetWidth,
	        guideArrowsTop=ArrowsObjectTop+ArrowsObjectCoverLayer[0].offsetHeight;

		(guideStep[0].offsetLeft)&&(guideArrowsLeft-=guideStep[0].offsetLeft);
		(guideStep[0].offsetTop)&&(guideArrowsTop+=guideStep[0].offsetTop);
		
		guideArrows.css({top:guideArrowsTop+"px",left:guideArrowsLeft+"px"}); //设置箭头位置
	
		
		var guideContentLeft=guideArrowsLeft-guideContent[0].offsetWidth,
		    guideContentTop=guideArrowsTop+guideArrows[0].offsetHeight-50;
		guideContent.css({top:guideContentTop+"px",left:guideContentLeft+"px"});//设置提示框位置
		
	}
	if(guideStep[0].arrowsDirection=='middle'){
		guideArrows.addClass("middle");
		var guideArrowsLeft=ArrowsObjectLeft+ArrowsObjectCoverLayer[0].offsetWidth/2,
		    guideArrowsTop=ArrowsObjectTop+ArrowsObjectCoverLayer[0].offsetHeight;	

		(guideStep[0].offsetLeft)&&(guideArrowsLeft-=guideStep[0].offsetLeft);
		(guideStep[0].offsetTop)&&(guideArrowsTop+=guideStep[0].offsetTop);
			
		guideArrows.css({top:guideArrowsTop+"px",left:guideArrowsLeft+"px"}); //设置箭头位置
	
		
		var guideContentLeft=guideArrowsLeft-150,
		    guideContentTop=guideArrowsTop+guideArrows[0].offsetHeight;
		guideContent.css({top:guideContentTop+"px",left:guideContentLeft+"px"});//设置提示框位置
	}
	
	switch(Math.ceil(guideStep[0].title.length/10)){
        case 1 : guideContent.find('.guide-title').css({'padding-top':'30px','top':'32px'}); break;
        case 2 : guideContent.find('.guide-title').css({'padding-top':'15px','top':'32px'}); break;
        default :guideContent.find('.guide-title').css({'padding-top':'0px','top':'45px'}); break;;
    }
	guideContent.find('.guide-title').html(guideStep[0].title);  
	
	if(guideStep.length>1){
		guideContent.find('.next-step').unbind('click');
		guideContent.find('.next-step').one('click',function(){
			guideStep.shift();
			doGuideStep(guideStep);
		});
	}else{
		guideContent.find('.next-step').attr('class',"begin-now").one('click',function(){
			$("body .guide-operat").hide();
		});
	}
	$(document).unbind('keyup',directionNext);
	$(document).one('keyup',directionNext);

}
//显示指引按钮
var showGuideSpinner=function(positionObj){
	var spinner=$("#guide-spinner");
	if(positionObj&&($(positionObj).length>0)){
		if(spinner.length>0){
			spinner.css({top:$(positionObj).offset().top+$(positionObj).height()/2-12+'px',left:$(positionObj).offset().left+$(positionObj).width()/2-12+'px'}).show();
		}else{
			spinner=$(html.spinnerNav());
			spinner.css({top:$(positionObj).offset().top+$(positionObj).height()/2-12+'px',left:$(positionObj).offset().left+$(positionObj).width()/2-12+'px'});
			$("body").append(spinner);
		}
		spinner.unbind('click');
		spinner.one('click',function(){
			$(positionObj).click();
			$(positionObj).focus();
			spinner.fadeOut();
		});
		$(document).unbind('click',hideGuideSpinner);
		$(document).one('click',hideGuideSpinner);
	}else{
		return;
	} 
}

//隐藏指引按钮
var hideGuideSpinner=function(){
	$("#guide-spinner").fadeOut();
}

//方向键控制下一步。
var directionNext=function(e){
	if(e.keyCode===40||e.keyCode===39){
		$('.guide-operat .guide-content').find(".next-step,.begin-now").click();
	}
}


