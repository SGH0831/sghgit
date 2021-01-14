/**
 * 
 */

$(document).ready(function(){

	$('h1').filter(function(a,b){
		alert(a+b)
	})



	
	$('h1').on('click',function(){
		$(this).html(function(index,html){
			return html+"+";
		})
	})
	$('h1').on({
		'mouseenter':function(){$(this).addClass("bgcolor")},
		mouseleave:function(){$(this).removeClass('bgcolor')}
	
	})
	
	
})