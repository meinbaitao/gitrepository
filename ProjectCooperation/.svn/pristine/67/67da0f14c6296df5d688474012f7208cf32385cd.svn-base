/**
 * 标签组装包
 */
var tagsView = {};

/**
 * 组装标签列表
 */
tagsView.tagsEachInMenu = function(idx, item){
	var favoriteTagsClass = item.favoriteFlag == "1" ? "sicon-star" : "sicon-star-empty";
	var favoriteTagsTitle = item.favoriteFlag == "1" ? "取消收藏" : "添加收藏";
	var htmlStr = "";
	htmlStr += "<li class='tagsInMenuEach' id='tagsInMenu-" + item.id + "'>";
	htmlStr += "	<span class='favoriteTagsInMenuEach " + favoriteTagsClass + "' id='favoriteTagsInMenu-" + item.id + "' title='" + favoriteTagsTitle + "'></span>";
	htmlStr += "	<span class='project-title'>" + item.title + "</span>";
	htmlStr += "	<div class='dropdown'>";
	htmlStr += "		<span class='glyphicon glyphicon-option-horizontal' data-toggle='dropdown'></span>";
	htmlStr += "		<ul class='dropdown-menu' id='tddm-" + item.id + "'>";
	htmlStr += "			<li class='delete-tags'>删除标签</li>";
	htmlStr += "		</ul>";
	htmlStr += "	</div>";
	htmlStr += "</li>";
	return htmlStr;
}