/**
 * 
 */
$(document).ready(function(){
	
	//$('h1').addClass('header');
//	$('h1').addClass(function(index){})
	$('h1').addClass(function(index){
		return "header-"+index
	})
	$('h1').removeClass("header-0")
})