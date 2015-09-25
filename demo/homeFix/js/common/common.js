
var Util = Util || {};

Util.cookie = {
	add: function(name, value, iDay, domain){
	    if(!iDay) return;

	    var oDate = new Date();
	    oDate.setDate(oDate.getDate() + iDay);
	    document.cookie = name + '=' + value + ';path=/;expires=' + oDate.toGMTString() + ';domain=' + (domain || '.souyidai.com');
	},
	get: function(name){
	    var cookies = document.cookie.split('; ');
	    for(var i = 0, len = cookies.length; i < len; i++){
	        var arr = cookies[i].split('=');
	        if(arr[0] == name) return arr[1];
	    }
	    return '';
	},
	del: function(name){
		document.cookie = name + "=;path=/;expires=" + (new Date(0)).toGMTString();
	}
};

Util.getUrlParam = function(param){
    var reg_param = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
    var arr = window.location.search.substr(1).match(reg_param);
    if (arr && arr.length >= 2) {
        return arr[2];
    }else{
        return '';
    }
};

Util.fmtMoney = function(money, length, isYuan) {
	if (length !== 0) {
		length = length | 2;
	}
	if (typeof parseInt(money) === 'number' && !isYuan) {
		money = (money / 100).toFixed(length);
	}else{
		money = money.toFixed(length);
	}
	money = ('' + money).replace(/(\d)(?=(?:\d{3})+(?:\.\d+)?$)/g, "$1,");
	return money;
};

Util.resetMoney = function(money) {
	return ('' + money).replace(/,/g, '');
};

Util.addZero = function(t) {
	return t < 10 ? '0' + t : t;
};

Util.getStyle = function(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
};

Util.startMove = function(obj, json, options) {
    options = options || {};
    options.type = options.type || 'linear';
    options.time = options.time || 800;

    var count = Math.round(options.time / 30);
    var oNow = {};
    var dis = {};
    for (var key in json) {
        if (key == 'opacity') {
            oNow[key] = Math.round(parseFloat(Util.getStyle(obj, key) * 100));
            if (isNaN(oNow[key])) {
                oNow[key] = 100;
            }
        } else {
            oNow[key] = parseInt(Util.getStyle(obj, key));
        }

        if (!oNow[key]) {
            switch (key) {
                case 'left':
                    oNow[key] = obj.offsetLeft;
                    break;
                case 'top':
                    oNow[key] = obj.offsetTop;
                    break;
                case 'width':
                    oNow[key] = obj.offsetWidth;
                    break;
                case 'height':
                    oNow[key] = obj.offsetHeight;
                    break;
            }
        }

        dis[key] = json[key] - oNow[key];
    }

    var n = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        n++;
        for (var key in json) {
            switch (options.type) {
                case 'linear':
                    var a = n / count;
                    var iValue = oNow[key] + dis[key] * a;
                    break;
                case 'ease-in':
                    var a = n / count;
                    var iValue = oNow[key] + dis[key] * a * a * a;
                    break;
                case 'ease-out':
                    var a = 1 - n / count;
                    var iValue = oNow[key] + dis[key] * (1 - a * a * a);
                    break;
            }
            if (key == 'opacity') {
                obj.style.opacity = iValue / 100;
                obj.style.filter = 'alpha(opacity:' + iValue + ')';
            } else {
                obj.style[key] = iValue + 'px';
            }
        }
        if (n == count) {
            clearInterval(obj.timer);
            options.succFn && options.succFn();
        }
    }, 30);
};

Util.loadTips = function(){
    var tips = codes && codes.local_tooltip;
    $("[data-text]").not('input').each(function(i, item){
        var $this = $(this);
        var text = $this.attr("data-text");
        var show = text;
        if(tips && tips[text]){
            show = tips[text];
        }
        if($this.hasClass('tooltipcol')){
        	$this.attr("data-text", show);
        }else{
        	$this.html(show);
        }
        
    });
    
};

Util.getMonthNum = function(m, y){
  var d = new Date();
  d.setDate(1);
  d.setFullYear(y, m + 1, 0);
  return d.getDate();
};

Util.Browser = function() {
    var a = navigator.userAgent.toLowerCase();
    var u = navigator.userAgent;
    var b = {};
    b.isStrict = document.compatMode == "CSS1Compat";
    b.isFirefox = a.indexOf("firefox") > -1;
    b.isOpera = a.indexOf("opera") > -1;
    b.isSafari = (/webkit|khtml/).test(a);
    b.isSafari3 = b.isSafari && a.indexOf("webkit/5") != -1;
    b.isIE = !b.isOpera && a.indexOf("msie") > -1;
    b.isIE6 = !b.isOpera && a.indexOf("msie 6") > -1;
    b.isIE7 = !b.isOpera && a.indexOf("msie 7") > -1;
    b.isIE8 = !b.isOpera && a.indexOf("msie 8") > -1;
    b.isGecko = !b.isSafari && a.indexOf("gecko") > -1;
    b.isMozilla = document.all != undefined && document.getElementById != undefined && !window.opera != undefined;
    b.isTrident = u.indexOf('Trident') > -1;
    b.isPresto = u.indexOf('Presto') > -1;
    b.isWebKit = u.indexOf('AppleWebKit') > -1;
    b.isGecko = u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1;
    b.isMobile = !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/);
    b.isios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    b.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    b.isiPhone = u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1;
    b.isiPad = u.indexOf('iPad') > -1;
    b.isWebApp = u.indexOf('Safari') == -1;
    return b;
} ();

Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    };
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f": "\u5468") : "") + week[this.getDay() + ""])
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    };
    return fmt;
};

