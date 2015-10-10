//加载页面头部、尾部
$.get('header.html', function(data) {
	$('body').prepend(data);
});
$.get('footer.html', function(data) {
	$('body').append(data);
});
//向前跳转页面
$('.fa-angle-left').on('touchend', function(){
	window.location.href = document.referrer;
})