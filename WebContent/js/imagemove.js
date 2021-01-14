/**
 * 
 */
$(document).ready(function(){
	$('img').css({"width":"150px","height":"150px"})
	
	
	//2초마다
	setInterval(function(){
		$('img').first().appendTo("body")
	},2000)
	//첫번째 이미지를 마지막으로 보낸다.
	
	
})