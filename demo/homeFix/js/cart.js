$(function(){
	var $check = $('.icon-check'),
		$cartDelete = $('.cart-delete i');

	$check.on('touchend', function(){
		$(this).toggleClass('uncheck');
	})
	$cartDelete.on('touchend', function(){
		if(confirm('确定删除该项装修服务吗？')){
			$(this).closest('.cart-list-detail').remove();
		}
	})
})