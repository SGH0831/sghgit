/**
 * 
 */
$(document).ready(function(){
	$("div").on("mousewheel",function(m){
		var w = m.originalEvent.wheelDelta;
		m.preventDefault();
		console.log(w);
		if (w>0){
			$('div').scrollLeft($(this).scrollLeft()-w/2);
		}else{
			$('div').scrollLeft($(this).scrollLeft()-w/2);
		}
	})
	
})