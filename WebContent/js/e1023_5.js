/**
 * 
 */

$(document).ready(function(){
	$('span').click(function(e){
		$('span').css('background','red');
		e.stopPropagation();
	})
	$('h1').click(function(){
		$('h1').css('background','green')
	})
})