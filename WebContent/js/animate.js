/**
 * 
 */

$(document).ready(function(){
	/*
	//올렸을때
	$("div").on("mouseenter",function(){
		$(this).animate({left:500},"slow")
	})
	//벗어났을때	
	$("div").on("mouseleave",function(){
		$(this).animate({left:0},"slow")
	})
	*/
	//올렸을때+벗어 났을때
	$('div').hover(function(){
		$(this).animate({left:500,top:20,width:100,height:100,'line-height':100},'slow')
		
	},function(){
		$(this).animate({left:0,top:0,width:50,height:50,'line-height':50},'slow')

	})
	
})