var commonTagsMethods = {
	getTagsId : function(){
		var tagsId = $("#checkedTags").attr("tags-id");
		return tagsId ? tagsId : "";
	}
}

var commonSpaceMethods = {
	getSpaceId : function(){
		var spaceId = $("#checkedSpace").attr("space-id");
		return spaceId ? spaceId : "";
	}
}

$(function(){
	
	var tagsMethods = (function(){
		$doc = $(document);
		
		//事件交互
		var eventInteraction = function(){
			
			//根据输入查询标签列表
			$doc.on("keydown", "#tagsTitleInput", function(event){
				if(event.keyCode == 13){
					var keyword = $(this).val().trim();
					loadTagsList(keyword);
				}
			});
			
			//点击标签列表项时进行相关设置
			$doc.on("click", ".tagsInMenuEach", function(){
				//区域取消选中并设置点击项选中
				$("#tagsItemsUl").find("li.current").removeClass("current");
				$(this).addClass("current");
				//设置标签菜单相关信息
				var tagsId = $(this).attr("id").replace("tagsInMenu-", "");
				$("#checkedTags").attr("tags-id", tagsId)
					.find(".project-title").text($(this).find(".project-title").text());
				$("#checkedTags").find(".dropdown").show();
				$("#tagsAllTaskList").click();
			});
			
			//根据筛选条件查询标签下的任务列表
			$doc.on("click", "#tagsUnDoneTaskList, #tagsDoneTaskList, #tagsAllTaskList", function(){
				//首先关闭任务详细页
				if(!$("#task_details").hasClass("task-details-hide")){
					$("#task_details .hideMenu-btn").click();
				}
				//取消其它条件的选中样式,当前选中添加选中样式
				$(this).parent("div.task-filter").find("span.checked").removeClass("checked");
				$(this).addClass("checked");
				//查询条件
				var filterType = $(this).attr("id");
				var tagsId = commonTagsMethods.getTagsId();
				if(tagsId){
					var status = "";
					if(filterType == "tagsUnDoneTaskList"){
						status = "6";
					}else if(filterType == "tagsDoneTaskList"){
						status = "7";
					}else if(filterType == "tagsAllTaskList"){
					}
					var url = "/a/task/findtagstasklist";
					var data = {"tagsId":tagsId, "status":status};
					jointMethods.loadTaskList(url,data);
				}
			});
			
			//收藏标签
			$doc.on("click", ".favoriteTagsInMenuEach", function(){
				$favoriteTags = $(this);
				var tagsId = $(this).attr("id").replace("favoriteTagsInMenu-", "");
				if(tagsId){
					var url =  "/a/bookmark/saveordeletebookmark";
					var title = constants.bookmarkTagsType;
					var spaceId = $("#checkedSpace").attr("space-id");
					var data = {"type":"5", "resourceId":tagsId, "title":title,"spaceId":spaceId};
					startUp.postFormData(url, data, function(resultMap){
						if($favoriteTags.hasClass("sicon-star-empty")){//添加收藏
							$favoriteTags.removeClass("sicon-star-empty").addClass("sicon-star").attr("title", "取消收藏");
						}else{//取消收藏
							$favoriteTags.removeClass("sicon-star").addClass("sicon-star-empty").attr("title", "添加收藏");
						}
					});
				}
				return false;
			});
			
			//删除标签
			$doc.on("click", ".delete-tags", function(){
				var tagsId = getTagsIdFromDifferentMenu(this);
				if(tagsId){
					commonMethods.showConfirmNav("是否确定要删除标签?",function(){
						var url = "/a/tags/deletetags";
						var data = {"id":tagsId};
						startUp.postFormData(url, data, function(resultMap){
							if(resultMap && resultMap.data){
								$("#tagsInMenu-" + resultMap.data.id).remove();
								var size = $("#tagsItemsUl > li").size();
								if(size > 0){
									$("#tagsItemsUl > li:first-child").click();
								}else{//此时标签列表已没有标签
									$("#checkedTags").attr("tags-id", "").find(".project-title").text("标签名称");
									$("#checkedTags").find(".dropdown").hide();
									$("div.task-filter").find("span.checked").removeClass("checked");
									$("#tagsAllTaskList").addClass("checked");
									$("#taskItemsTbody").empty();
								}
							}
						});
					},"no");
				}
			});
			
			//从不同的菜单中获取标签编号
			var getTagsIdFromDifferentMenu = function(ele){
				var elementId = $(ele).parents("ul.dropdown-menu").attr("id");
				var tagsId = "";
				if(elementId){
					tagsId = elementId.replace("tddm-", "");
				}else{
					tagsId = commonTagsMethods.getTagsId();
				}
				return tagsId;
			}
			
		} 
		
		//加载标签列表
		var loadTagsList = function(keyword){
			$("#tagsItemsUl").empty();
			var spaceId = commonSpaceMethods.getSpaceId();
			if(spaceId){
				var url = "/a/tags/findtagslistbyspaceid";
				var data = {"title":keyword, "spaceId":spaceId};
				startUp.postFormData(url, data, function(resultMap){
					if(resultMap && resultMap.data){
						var htmlStr = "";
						$.each(resultMap.data, function(idx, item){
							htmlStr += tagsView.tagsEachInMenu(idx, item);
						});
						$("#tagsItemsUl").append(htmlStr);
						$("#tagsItemsUl > li:first-child").click();
					}
				});
			}
		}
		
		return {
			eventInteraction : eventInteraction,
			loadTagsList : loadTagsList
		}
		
	})();
	
	tagsMethods.eventInteraction();
	tagsMethods.loadTagsList("");
	
});




