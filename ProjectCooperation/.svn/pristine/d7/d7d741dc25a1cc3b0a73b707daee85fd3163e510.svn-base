var headerView = {};

/**
 * 组装空间列表
 */
headerView.spaceEach = function(idx, item){
	var spaceId = $("#checkedSpace").attr("space-id");
	var spaceEachClass = spaceId == item.id ? "current" : "";
	var spaceEachSpan = spaceId == item.id ? "<span class='iconok pull-right'></span>" : "";
	var htmlStr = "";
	htmlStr += "<li class='spaceEach " + spaceEachClass + "' id='space-" + item.id + "'>" + item.title;
	htmlStr += 		spaceEachSpan;
	htmlStr += "</li>";
	return htmlStr;
}

/**
 * 组装消息列表
 */
headerView.messageEach = function(idx, item){
	var readClass = item.readStatus == "0" ? "un-read" : "";
	var htmlStr = "";
	htmlStr += "<div class='info-list " + readClass + "' id='message-" + item.id + "'>";
	htmlStr += "	<span class='read-mark'>●</span>";
	htmlStr += "	<div class='info-title'>";
	htmlStr += "		<span class='info-title-content'>" + item.content.replace(/\[metion_(@.*?)_surfond_(.*?)\]/g,'<span class="remembersomeone" email="$2">$1</span>').replace(/\[em_([0-9]*)\]/g,'<img src="'+startUp.getRootPath()+'/static/jquery-qqface/arclist/$1.gif"/>') + "</span>"; 
	htmlStr += "	</div>";
	htmlStr += "</div>";
	return htmlStr;
}