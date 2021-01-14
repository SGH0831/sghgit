/**
 * 
 */
$(document).ready(function(){

	
	$('textarea').on('keyup',function(){
		var length=$("textarea").val().length;
		var num=150-length;
	if(num>=0){
		$('h1').html(num).removeAttr("style")
		$('#over').html("")
	}else{
		$('h1').css("color",'red').html(num)
		$('#over').html("※글자수를 초과하셨습니다").css("color","red")
	}
	
	})
})