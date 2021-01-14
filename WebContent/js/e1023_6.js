/**
 * 
 */

$(document).ready(function(){
	
	$("#hide").on('click',function(){
		$('h1').hide('slow')
	})
	$("#show").click(function(){
		$('h1').show('slow')
	})
	$("#slideup").click(function(){
		$('h1').slideUp('slow')
	})
	$("#slidedown").click(function(){
		$('h1').slideDown('slow')
	})
	$("#fadeout").click(function(){
		$('h1').fadeOut('slow')
	})
	$("#fadein").click(function(){
		$('h1').fadeIn('slow')
	})
	$("#fadeTo").click(function(){
		$('h1').fadeToggle('slow')
	})
})