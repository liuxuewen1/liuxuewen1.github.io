
$(function(){
	// 展开、关闭头部菜单
	var $nav_menu = $(".t-f");
	var $nav = $(".nav");
	var $nav_close = $(".nav-close");
	$nav_menu.on('click', function(){
		$nav.addClass('show').removeClass('hide');
	});
	$nav_close.on('click', function(){
		$nav.addClass('hide').removeClass('show');
	});

	// 选择框切换
	var $t_right = $('.t-right');
	$t_right.on('click', function(){
		var _par = $(this).parent();
		_par.parent().children().removeClass('selected');
		_par.addClass('selected');
	});

	// 签证人信息，增加删除
	var $qz_item = $(".a-item");
	var qz_html = '<div class="a-item">' + $qz_item.html() + '</div>';
	$qz_item.find('.a-tit-r').remove();
	var $qz_cont = $(".a-cont");
	var $qz_add = $(".add-people");
	$qz_cont.on('click', '.a-tit-r', function(){
		$(this).closest('.a-item').remove();
		qz_sort();
	});
	$qz_add.on('click', function(){
		$qz_cont.append(qz_html);
		qz_sort();
	});
	function qz_sort(){
		$qz_cont.find('.a-tit-l').each(function(i, item){
			$(this).html('签证人' + (i + 1));
		})
	}

})