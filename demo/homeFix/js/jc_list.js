var jc_list = [
	{ 
		index: '0', 
		first_name: '厨房', 
		arr: [ 
				{ 
					sec_name: '整体橱柜', arr_pro: [
						{ pro_name: '玻璃杯', pic: './images/jc/1.jpg', href: '#' },
						{ pro_name: '玻璃杯', pic: './images/jc/1.jpg', href: '#' }
					] 
				}, 
				{ 
					sec_name: '面盆马桶', arr_pro: [
						{ pro_name: '玻璃杯', pic: './images/jc/1.jpg', href: '#' },
						{ pro_name: '玻璃杯', pic: './images/jc/1.jpg', href: '#' }
					] 
				}			
		]
	}
];

$(function(){
	var $left_nav = $('.left-nav a'),
		$right_nav = $('.jc-list-detail');
	var index = parseInt(Util.getUrlParam('jcid')) || 0;
	navClick();

	$left_nav.on('touchend', function(){
		index = $(this).index();
		navClick();

		return false;
	})

	function navClick(){
		$left_nav.removeClass('current');
		$left_nav.eq(index).addClass('current');
		$right_nav.hide().eq(index).show();
	}
})