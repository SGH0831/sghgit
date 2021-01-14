/**
 * 
 */
$(document).ready(function(){
	
	$('div').click(function(){
	/*		
		$(this).animate({
			left:"+="+$(this).offset().left,
			top:"+="+$(this).offset().top,
			height:"+="+$(this).height(),
			width:"+="+$(this).width()
		},2000)
	*/
	
	
	$(this).animate({left:"+="+$(this).offset().left},2000)
	$(this).animate({height:"+="+$(this).height()},2000)
	$(this).animate({width:"+="+$(this).width()},2000)
	
	setTimeout(function(){
		$('div').clearQueue();
	},3000)
	
	
	
	})
	
})