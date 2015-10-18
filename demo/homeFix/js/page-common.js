//加载页面头部、尾部
$body = $('body');
$.get('header.html', function(data) {
	if($body.attr('header') == '0'){
		return;
	}

	$body.prepend(data);
});
$.get('footer.html', function(data) {
	if($body.attr('footer') == '0'){
		return;
	}
	
	$body.append(data);
});
//向前跳转页面
$('.fa-angle-left').on('touchend', function(){
	window.location.href = document.referrer;
})