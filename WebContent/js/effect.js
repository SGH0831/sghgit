/**
 * 
 */
$(document).ready(function(){
	$("#btn1").on('click',function(){
		$("div").hide('slow','linear',function(){
			alert('a')
		})
	})
	$("#btn2").on('click',function(){
		$("div").show('slow')
	})
	$("#btn3").on('click',function(){
		$("div").toggle('slow')
	})
	$("#btn4").on('click',function(){
		$("div").slideDown('slow')
	})
	$("#btn5").on('click',function(){
		$("div").slideUp('slow')
	})
	$("#btn6").on('click',function(){
		$("div").slideToggle('slow')
	})
	$("#btn7").on('click',function(){
		$("div").fadeIn('slow')
	})
	$("#btn8").on('click',function(){
		$("div").fadeOut('slow')
	})
	$("#btn9").on('click',function(){
		$("div").fadeToggle('slow')
	})
	$("#btn0").on('click',function(){
		$('h1').html(function(a,b){
			return b+"★"
			
		})
	})
	
	
	
	
})