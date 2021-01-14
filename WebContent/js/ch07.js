/**
 * 
 */

$(document).ready(function(){
	
	
	
	$("a").click(function(e){
		$(this).css("background-color","pink");
		e.preventDefault();
		e.stopPropagation();
	})
	
	$("h1").click(function(e){
		$(this).css("background-color","red")
	})
	
})