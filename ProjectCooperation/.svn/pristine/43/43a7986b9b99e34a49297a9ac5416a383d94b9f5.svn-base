
/**
 * 初始调用方法
 */
var startUp = function(){};

/**
 * 生成UUID
 */
startUp.uuid =function() {
	var s = [];
	var hexDigits = "0123456789abcdefsurfondbt";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the
														// clock_seq_hi_and_reserved
														// to 01
	s[8] = s[13] = s[18] = s[23];

	var uuid = s.join("");
	return uuid;
}

/**
 * 后台获取UUID
 */
startUp.back_uuid = function(){
	var url = "/a/index/getuuid";
	var uuid = "";
	startUp.postAsyncData(url,null,function(result){uuid = result.data;});
	return uuid;
}

/**
 * 上传公共方法
 */
startUp.ajaxFileUpload =function (url, fileId, data, callback) {
	if (!fileId || !url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajaxFileUpload({
		url : url, // 用于文件上传的服务器端请求地址
		type : 'post',
		data : data, // 此参数非常严谨，写错一个引号都不行
		secureuri : false, // 一般设置为false
		fileElementId : fileId, // 文件上传空间的id属性 <input type="file" id="file"
								// name="file" />
		dataType : 'text', // 返回值类型 一般设置为json
		success : function(data) {
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}


/**
 * 批量上传
 */
startUp.fileUpload =function (url, formdata, callback) {
	if (!url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajax({
		type:"POST",
		url:url,
		data:formdata,
		contentType:false,
		processData:false,
		success:function(data){
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}


/**
 * 公共的异步请求方法(GET)
 */
startUp.getData =function(url, callback) {
	if (!url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajax({
		url : url,
		type : "GET",
		cache : false,
		timeout : 10000,
		dataType : "json",
		success : function(data) {
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}

/**
 * 公共的异步请求方法(POST)
 */
startUp.postData =function(url, data, callback) {
	if (!url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajax({
		type : "POST",
		url : url,
		timeout : 10000,
		data : data,
		dataType : "json",
		contentType:"application/json",
		success : function(data) {
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}

/**
 * 异步请求方法(POST)
 */
startUp.postFormData =function(url, data, callback) {
	if (!url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajax({
		type : "POST",
		url : url,
		timeout : 10000,
		data : data,
		dataType : "json",
		success : function(data) {
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}

/**
 * 异步请求方法(POST)
 */
startUp.postActData =function(url, data,contentType,callback) {
	if (!url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajax({
		type : "POST",
		url : url,
		timeout : 7000,
		data : data,
		dataType : "json",
		contentType:contentType,
		success : function(data) {
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}

/**
 * GET同步请求方法
 */
startUp.getAsyncData =function(url,callback) {
	if (!url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajax({
		url : url,
		type : "GET",
		cache : false,
		timeout : 7000,
		async:false,
		dataType : "json",
		success : function(data) {
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}

/**
 * POST同步请求方法
 */
startUp.postAsyncData =function(url, data, callback) {
	if (!url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajax({
		url : url,
		type : "POST",
		cache : false,
		timeout : 7000,
		async:false,
		dataType : "json",
		data: data,
		success : function(data) {
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}

/**
 * 公共调用异步请求
 */
startUp.get=function(url,callback) {
	url = startUp.getRootPath()+url;
	$.get(url,function(data){
		startUp.checkSession(data);
		callback(data);
	});
}

/**
 * 公共调用异步请求
 */
startUp.post=function(url,callback) {
	url = startUp.getRootPath()+url;
	$.post(url,function(data){
		startUp.checkSession(data);
		callback(data);
	});
}

/**
 * 公共调用异步请求
 */
startUp.post=function(url,data,callback) {
	url = startUp.getRootPath()+url;
	$.post(url,data,function(data){
		startUp.checkSession(data);
		callback(data);
	});
}

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
	    error:function(data){}
	});
}


/**
 * 截取字符串，区别汉字和英文
 */
startUp.subStr =function(name, maxLength) {
	if (!maxLength) {
		maxLength = 20;
	}
	if (name == null || name.length < 1) {
		return "";
	}
	var w = 0;//字符串长度，一个汉字长度为2   
	var s = 0;//汉字个数   
	var p = false;//判断字符串当前循环的前一个字符是否为汉字   
	var b = false;//判断字符串当前循环的字符是否为汉字   
	var nameSub;
	for (var i = 0; i < name.length; i++) {
		if (i > 1 && b == false) {
			p = false;
		}
		if (i > 1 && b == true) {
			p = true;
		}
		var c = name.charCodeAt(i);
		//单字节加1   
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			w++;
			b = false;
		} else {
			w += 2;
			s++;
			b = true;
		}
		if (w > maxLength && i <= name.length - 1) {
			if (b == true && p == true) {
				nameSub = name.substring(0, i - 2) + "...";
			}
			if (b == false && p == false) {
				nameSub = name.substring(0, i - 3) + "...";
			}
			if (b == true && p == false) {
				nameSub = name.substring(0, i - 2) + "...";
			}
			if (p == true) {
				nameSub = name.substring(0, i - 2) + "...";
			}
			break;
		}
	}
	if (w <= maxLength) {
		return name;
	}
	return nameSub;
}

startUp.subString = function (name, length) { 
	if(isNaN(length)){
		return "";
	}
	if(!name.trim()){
		return "";
	}
	
	var no = 0;//循环时字节总长度
	var en = 0;//单字节个数 
	var cn = 0;//双字节个数
	var sub = 0;//需要截取的字符长度
	
	for(var i = 0; i < name.length; i++){
		var code = name.charCodeAt(i);
		if((code >= 0x0001 && code <= 0x007e) || (0xff60 <= code && code <= 0xff9f)){//单字节加1
			en += 1;
			no += 1;
		}else{//双字节加2
			cn += 1;
			no += 2;
		}
		
		if(no == length){//循环时字节总长度等于需要的长度，此时循环的为单字节或双字节
			sub = en + cn;
			break;
		}else if(no > length){//循环时字节总长度大于需要的长度，此时循环的为双字节
			sub = en + cn - 1;
			break;
		}
	}
	
	return no < length ? name : name.substring(0, sub);
} 


/**
 * 特殊字符定义转换
 */
var entityMap = {"&": "&amp;","<": "&lt;",">": "&gt;",'"': '&quot;',"'": '&#39;',"/": '&#x2F;'};
startUp.escapeHtml =function(string) {
	return String(string).replace(/[&<>"'\/]/g, function(s) {
		return entityMap[s];
	});
}


/**
 * 获取当前地址http:xxxx:8080/xxx 
 */
startUp.getRootPath =function(){  
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp  
    var curWwwPath=window.document.location.href;  
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp  
    var pathName=window.document.location.pathname;  
    var pos=curWwwPath.indexOf(pathName);  
    //获取主机地址，如： http://localhost:8083  
    var localhostPaht=curWwwPath.substring(0,pos);  
    //获取带"/"的项目名，如：/uimcardprj  
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
    if(curWwwPath && curWwwPath.indexOf(constants.clearcom) !=-1){
    	return(localhostPaht);  
    }
    return(localhostPaht+projectName);
}

/**
 * 把时间数字转换为时间格式：如：1440898441000转换为：2015-08-30
 */
startUp.getFomatDate =function(param){  
	if(!param){
		return "";
	}
	var date = new Date();
	date.setTime(param);
	return (date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate())
}

/**
 * 把时间数字转换为时间格式：如：1440898441000转换为：2015-08-30 09:34
 */
startUp.getFomatDate2 =function(param){  
	if(!param){
		return "";
	}
	var date = new Date();
	date.setTime(param);
	return (date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes())
}


/**
 * 验证是否是图片
 */
startUp.verificationPic =function(param){  
	if(!param){
		return false;
	}
	var list = "GIF JPEG PNG JPG";
	if(list.indexOf(param.toUpperCase()) !=-1){
		return true;
	}
}


/**
 * 处理未声明属性
 * @param attribute
 * @returns
 */
function dealWithUndefined(attribute){
	if(typeof attribute == "undefined"){
		return "";
	}else{
		return attribute;
	}
}

/**
 * 检查session是否失效
 * @param attribute
 * @returns
 */
startUp.checkSession=function(obj){
	try{
		if(typeof obj.responseText ==="string"){
			if(obj.responseText.indexOf("DOCTYPE html") !=-1){
				window.location.href=ctx;
			}
		}
	}catch(e){
		return "";
	}
	return "";
}

/**
 * 获取所有邮箱地址前缀，例如(https://mail.)
 */
startUp.getEmailLocal = function(obj){
	if(obj){
		obj = obj.substring(obj.indexOf("@")+1);
		return "http://mail."+obj;
	}
	return "";
}


/**
 * 头像截取前一个字或者字母
 */
startUp.subStrHead = function(obj){
	if(obj){
		obj = obj.substring(obj.length-1);
		return obj;
	}
	return "";
}

/**
 * 获取浏览器URL地址参数
 */
startUp.GetQueryString = function(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

/**
 * JS自定义 类似map集合使用
 */
var LikeMap = function(){  
    this._entrys = new Array();  
      
    this.put = function(key, value){  
        if (key == null || key == undefined) {  
            return;  
        }
        var index = this._getIndex(key);  
        if (index == -1) {  
            var entry = new Object();  
            entry.key = key;  
            entry.value = value;  
            this._entrys[this._entrys.length] = entry;  
        }else{  
            this._entrys[index].value = value;  
        }          
    };  
    this.get = function(key){  
        var index = this._getIndex(key);  
        return (index != -1) ? this._entrys[index].value : null;  
    };  
    this.remove = function(key){  
        var index = this._getIndex(key);  
        if (index != -1) {  
            this._entrys.splice(index, 1);  
        }  
    };  
    this.clear = function(){  
        this._entrys.length = 0;;  
    };  
    this.contains = function(key){  
        var index = this._getIndex(key);  
        return (index != -1) ? true : false;  
    };  
    this.getCount = function(){  
        return this._entrys.length;  
    };  
    this.getEntrys =  function(){  
        return this._entrys;  
    };  
   this._getIndex = function(key){  
        if (key == null || key == undefined) {  
            return -1;  
        }  
        var _length = this._entrys.length;  
        for (var i = 0; i < _length; i++) {  
            var entry = this._entrys[i];  
            if (entry == null || entry == undefined) {  
                continue;  
            }  
            if (entry.key === key) {//equal  
                return i;  
            }  
        }  
        return -1;  
    };  
}  


/**
 * 进度条更新
 * @param loading
 * @param outer
 * @param time
 */
function loadShow(loading,outer,time){
	var idiv = loading;
	var veryhuobox = outer;
	var timer = null;
	timer=setInterval(function(){
		var iWidth = idiv.offsetWidth/veryhuobox.offsetWidth*100;
		idiv.style.width = idiv.offsetWidth+1+'px';
		idiv.innerHTML = Math.round(iWidth)+"%";
		if(iWidth>98){
			clearInterval(timer);
		}
	},time);
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
	var url = constants.iBehavior+"/LogCollection/logc/record/facade/pc?";
	
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
		
		var data ="userID="+userId+"&moduleNO="+moduleNO+"&os="+detectOS+"&browser="+browser+"&browserVersion="+browserVersion;
		startUp.jsonp(url,data);
	}
}

function toDecimal(x) { 
    var f = parseFloat(x); 
    if (isNaN(f)) { 
      return; 
    } 
    f = Math.round(x*100)/100; 
    return f; 
  } 


/**
 * post请求方法
 */
startUp.ajaxPost =function(url, data, async, callback) {
	if (!url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajax({
		url : url,
		type : "POST",
		cache : false,
		timeout : 7000,
		async : async,
		dataType : "json",
		data: data,
		contentType : "application/json",
		success : function(data) {
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}

/**
 * 请求方法
 */
startUp.ajaxForm =function(url, data, async, callback) {
	if (!url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajax({
		url : url,
		type : "POST",
		cache : false,
		timeout : 7000,
		async : async,
		dataType : "json",
		data: data,
		success : function(data) {
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}


/**
 * 请求方法
 */

startUp.ajaxFormGet =function(url, data, async, callback) {
	if (!url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajax({
		url : url,
		type : "get",
		cache : false,
		timeout : 7000,
		async : async,
		dataType : "json",
		data: data,
		success : function(data) {
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}

/**
 * 请求方法
 */
startUp.ajaxForm2 =function(url, data, async, callback) {
	if (!url) {
		return;
	}
	url = startUp.getRootPath()+url;
	$.ajax({
		url : url,
		type : "get",
		cache : false,
		timeout : 7000,
		async : async,
		dataType : "json",
		data: data,
		success : function(data) {
			startUp.checkSession(data);
			callback(data);
		},
		error : function(data) {
			startUp.checkSession(data);
			callback("");
		}
	});
}