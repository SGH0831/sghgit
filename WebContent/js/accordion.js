/**
 * 
 */
$(document).ready(function(){
	$('#accordion').accordion();
	$('h3').click(function(){
		var a=$(this).text()
		$('#a').html(function(){
			return "현재 패널 : "+a
		})		
	})
	$('h3').keydown(function(z){
		if(z.keyCode==13){
			var a=$(this).text()
			$('#a').html(function(){
			return "현재 패널 : "+a
		})		
		}
	})
})