/**
 * 
 */
$(document).ready(function(){
	$('#wrap').on('click',"h1",function(){
		var length= $("h1").length;
		var targetHTML=$(this).html();
		$("#wrap").append("<h1>"+length+"-"+targetHTML+"</h1>")
	})
		
})