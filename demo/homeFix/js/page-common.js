//加载页面头部、尾部
$.get('header.html', function(data) {
	$('body').prepend(data);
});
$.get('footer.html', function(data) {
	$('body').append(data);
});