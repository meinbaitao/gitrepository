
/**
 * 初始调用方法
 */
var startUp = function(){};

var iBehaviorPath="http://112.74.127.5:8080";


/**
 * jsonp跨域服务调用(只支持get)
 */
startUp.jsonp=function(url,data) {

	$.ajax({  
	    type : "get",  
	    async:false,  
	    url :url+data,  
	    dataType : "jsonp",//数据类型为jsonp  
	    timeout : 10000,
	    jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数  
	    success : function(data){

	    },
	    error:function(data){
	    }
	});
}

/**
 * 获取浏览器类型、浏览器版本
 */
startUp.browser =function(){

	var agent = navigator.userAgent.toLowerCase() ;
    //IE
	var regStr_ie = /msie [\d.]+;/gi ;
	//firefox
	var regStr_ff = /firefox\/[\d.]+/gi;
	//Chrome
	var regStr_chrome = /chrome\/[\d.]+/gi ;
	//Safari
	var regStr_saf = /safari\/[\d.]+/gi ;
	//opera
	var regStr_opera =/opera\/[\d.]+/gi;
	
	//IE
	if(agent.indexOf("msie") > 0){
		return agent.match(regStr_ie) ;
	}
	
	//firefox
	if(agent.indexOf("firefox") > 0){
		return agent.match(regStr_ff) ;
	}

	//Chrome
	if(agent.indexOf("chrome") > 0){
		return agent.match(regStr_chrome) ;
	}

	//Safari
	if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0){
		return agent.match(regStr_saf) ;
	}
	
	//opera
	if(agent.indexOf("opera") > 0){
		return agent.match(regStr_opera) ;
	}
	
}

/**
 * 获取操作系统
 */
startUp.detectOS =function() {
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "Linux";
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
    }
    return "other";
}



/**
 * 用户行为分析
 */
startUp.iBehavior = function(moduleNO){	
	//获取当前用户ID
	var userId =$("#checkedUser").attr("user-id");
	userId = userId?userId:"";
	//服务地址
	var url = iBehaviorPath+"/LogCollection/logc/portal/facade/product?";
	//var url =  "http://192.168.1.193:8080/LogCollection/logc/portal/facade/product?";
	//获取浏览器类型、版本
	var browser =startUp.browser();
	if(browser[0]){
		var arr = browser[0].split("/");
		//获取浏览器
		var browser =arr[0]?arr[0]:"";
		//获取浏览器版本
		var browserVersion =arr[1]?arr[1]:"";
		//操作系统
		var detectOS = startUp.detectOS();
		
		var data ="moduleNO="+moduleNO+"&os="+detectOS+"&browser="+browser+"&browserVersion="+browserVersion;
		startUp.jsonp(url,data);
	}
}


/**
 * 点击获取用户行为分析
 */
$(".navbar-product>li>a,.navbar-product>div>a").on("click",function(){
	//1.获取当前元素ID
	var moduleNO = this.id;
	//start 用户行为分析
	startUp.iBehavior(moduleNO);
	//end 用户行为分析
});




