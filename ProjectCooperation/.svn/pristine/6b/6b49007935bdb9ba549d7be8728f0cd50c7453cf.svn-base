/**
 * 意见反馈
 */

$(function(){
	findAllFeedbackInfo();
});


/**
 * 取消文件
 */
$(document).on("click",".cancelFile",function(){
	var id = this.getAttribute("status");
	var taskId = $("#task_details").attr("task-id");
	var data = "";
	if(taskId){
		data = {"id":id,"taskId":taskId};
	}else{
		data = {"id":id};
	}
	var url = "/a/attachment/deleteAttachment";
	if(id){
		//matter.showConfirmNav("是否确定要移除该文件?",function(){
			startUp.postAsyncData(url,data,function(data){
			});
		//},"no");
	}
});