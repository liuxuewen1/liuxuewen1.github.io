function jsonp(obj){
	obj=obj || {};
	if(!obj.url){
		alert('错误：参数不完整');
		return;
	}
	//默认超时时间：3s
	obj.timeout=obj.timeout || 3;
	//回调函数名称，如果没有生成一个随机函数名
	obj.jsonpCallback=obj.jsonpCallback || ('jsonp_'+Math.random()).replace('.','');
	
	var oHead=document.head || document.getElementsByTagName('head')[0];
	var oS=document.createElement('script');
	
	//为接口中的函数名参数赋值
	obj.cbName && (obj.data[obj.cbName]=obj.jsonpCallback);
	//将函数封装到全局中
	if(obj.jsonpCallback.indexOf('.')!=-1){
		//在Google、Sogou中 是类似于这种定死的函数名 window.sogou.sug 需要特殊处理
		  var fnName = obj.jsonpCallback.split('.');
		  var globalFn = 'window';
		  for (var k = 0; k < fnName.length; k++) {
			if (fnName[k] == 'window') continue;
			if (k == fnName.length - 1) {
			  globalFn += '["' + fnName[k] + '"]=function(json){ __callback(json); };';
			} else {
			  globalFn += '["' + fnName[k] + '"]';
		      new Function(globalFn + '={};') ();			  
			}
		  }
		  new Function(globalFn)();
	}else{
		window[obj.jsonpCallback]=function(){
			__callback(arguments);
		};
	}
	window.__callback=function(args){
		clearTimeout(timer);
		//成功，则回调函数
		obj.succFn && obj.succFn(args);
		//删除script
		if(oS.parentNode) oHead.removeChild(oS);
	};
	
	//将传过来的json格式参数解析成 a=1&b=2形式
	var arr=[];
	for(var key in obj.data){
		arr.push(key+'='+obj.data[key]);
	}
	oS.src=obj.url+'?'+arr.join('&');
	
	oHead.appendChild(oS);
	//超时执行timeoutFn()函数
	var timer=setTimeout(function(){
		obj.timeoutFn && obj.timeoutFn();
		window[obj.jsonpCallback]=null;
	},obj.timeout*1000);
}
