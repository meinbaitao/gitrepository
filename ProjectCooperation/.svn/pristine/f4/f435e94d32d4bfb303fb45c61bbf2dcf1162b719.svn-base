$(function(){
	//初始化看板
	//taskboard.initTaskboard();
	//加载拖动逻辑
	//taskboard.task_drag();
});

/**
 * 任务看板
 */
var taskboard = {};


/**
 * 初始化个人看板
 */
taskboard.initTaskboard = function(){
	var url = "/a/board/init";
	var spaceId = $("#checkedSpace").attr("space-id");
	var data={"spaceId":spaceId};
	startUp.postFormData(url,data,function(resultMap){
		taskboard.findTaskboard();
	});
}


/**
 * 查询个人看板
 */
taskboard.findTaskboard = function(){
	var url = "/a/board/findlistbytype";
	var spaceId = $("#checkedSpace").attr("space-id");
	var data={"spaceId":spaceId};
	startUp.postFormData(url,data,function(resultMap){
		if(resultMap && resultMap.result){
			var htmlStr = "";
			$.each(resultMap.result, function(idx, item){
				htmlStr += taskView.taskBoardEach(idx, item);
			});
			$("#taskBoardList").append(htmlStr);
		}
		/**
		 * 进入"工作台"时选择"新任务"
		 */
		$("#newTaskList").click();
	});
}

/**
 * 任务拖动
 */
taskboard.task_drag = (function() { //任务拖动
	var Doc = $(document);
	
	Doc.on("mousedown", ".grid-cell-string .sicon-taskdrop", function() {
		var _this = $(this),
			id =$(_this).attr("id"),
			text = $(_this).parent().next(".text-line-title").find("textarea").text(),
			drag_div = $("<div class='drag_div'></div>").text(text);

		$("body").append(drag_div);
		$("body").addClass("display-select");
		Doc.bind("mousemove", function(e) {
			_this.parent("tr").addClass("this_move");
			drag_div_move(e);
			bind_mouseenter($(".display-select .moveArea"), true);
		});
		Doc.one("mouseup", function() {
			var boardId = $(".move_there").attr("boardId");
			if(boardId){
				mousemoveStop($(".display-select .moveArea"));
				$(".move_there").removeClass("move_there");
				$(".this_move").removeClass("this_move");
				$(".bottom").removeClass("bottom");
				console.debug("看板ID========"+boardId);
				console.debug("任务ID========"+id);
				/*
				var url = "/a/board/saveTaskBoardAndTask";
				var spaceId = $("#checkedSpace").attr("space-id");
				var data={"spaceId":spaceId};
				startUp.postFormData(url,data,function(resultMap){
					if(resultMap && resultMap.result){
						var htmlStr = "";
						$.each(resultMap.result, function(idx, item){
							htmlStr += taskView.taskBoardEach(idx, item);
						});
						$("#taskBoardList").append(htmlStr);
					}
					/**
					 * 进入"工作台"时选择"新任务"
					
					$("#newTaskList").click();
				});
				 */
			}
		});
	});
});
