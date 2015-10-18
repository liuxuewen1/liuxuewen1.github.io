$(function(){
	//add
	$('.fw-cal-par').on('touchend', '.fa-plus-square-o', function(){
		var $this = $(this),
			$parLi = $this.closest('li');

		var liHtml = '<li class="cf">' + $parLi.html().replace('fa-plus', 'fa-minus') + '</li>';
		$parLi.after(liHtml);

	}).on('touchend', '.fa-minus-square-o', function(){
		var $this = $(this),
			$parLi = $this.closest('li');

		$parLi.remove();

	}).on('touchend', '.icon-check', function(){
		//选择框
		var $this = $(this);
		$checkPar = $this.closest('.fw-checked');
		$checkPar.find('.icon-check').addClass('uncheck');

		$this.removeClass('uncheck');
	}).on('touchend', '.fw-checked span', function(){

		$(this).prev().trigger('touchend');

	})

})