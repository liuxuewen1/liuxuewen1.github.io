
$(function(){
	var $sms = $('#sendSms'),
		$submit = $('.input-submit'),
		smsTimer = null;
	var time = 0;
	$sms.on('touchend', function(){
		if(time > 0) return;

		var valiResult = vali(0);
		if(valiResult && valiResult.error == 1){
			return;
		}

		time = 30;	//设置验证码重新获取间隔时间
		clearInterval(smsTimer);
		//ajax请求验证码
		var isRight = true;		//是否发送成功
		if(isRight){
			$sms.html('重新获取('+ time +')');
			smsTimer = setInterval(function(){
				time--;
				if(time > 0){
					$sms.html('重新获取('+ time +')');
				}else{
					$sms.html('获取验证码');
					clearInterval(smsTimer);
				}
			}, 1000);
		}
	});
	$submit.on('touchend', function(){
		var valiResult = vali();
		if(valiResult && valiResult.error == 1){
			return;
		}

		//验证通过走ajax
		//......
	})

	function vali(index){

		var $arrInput = $('.reg-user .input'),
		arr_vali = [
			{ 
				reg: /^1[34578][0-9]{9}$/g, 
				datatype: 'rgn-txtPhone', 
				msg: ['手机号不能为空', '手机号格式错误'] 
			},
			{ 
				reg: /^\d{4}$/g, 
				datatype: 'rgn-txtCode', 
				msg: ['验证码不能为空', '验证码格式错误'] 
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