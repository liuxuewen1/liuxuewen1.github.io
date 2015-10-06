$(function(){
	$('.input-submit').on('touchend', function(){
		if(vali() != ''){
			return;
		}

		//验证成功，ajax登录
	});


	function vali(index){

		var $arrInput = $('.login-user .input'),
		arr_vali = [
			{ 
				reg: /^1[34578][0-9]{9}$/g, 
				datatype: 'rgn-txtPhone', 
				msg: ['手机号不能为空', '手机号格式错误'] 
			},
			{ 
				reg: /^\d{6,}$/g, 
				datatype: 'rgn-txtPwd', 
				msg: ['密码不能为空', '密码格式错误'] 
			}
		];
		$arrInput.find('.input-error').hide();

		if(index != undefined){
			if(valiItem(0) != ''){
				return { error: 1 };
			}
		}else{	
			for(var i = 0; i < arr_vali.length; i++){
				if(valiItem(i) != ''){
					return { error: 1 };
				}
			}
		}

		function valiItem(i){
			var reg = arr_vali[i].reg;
			var $input = $arrInput.find('input[data-type=' + arr_vali[i].datatype + ']');
			var $error = $input.closest('.input').find('.input-error');
			var errMsg = '';

			if($input.val() == "" || $input.val() == $input.attr("data-text")){
				errMsg = arr_vali[i].msg[0];
			}else{
				var regResult = !reg.test($input.val());
				if(regResult == true){
					errMsg = arr_vali[i].msg[1];
				}
			}
			if(errMsg != ''){
				$error.show().html(errMsg);
			}else{
				$error.hide();
			}
			
			return errMsg;
		}

	}
})