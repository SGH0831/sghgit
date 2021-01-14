/**
 * 
 */

$(document).ready(function(){
	$('p').on('myevent',function(a,d1,d2){
		$('p').text('input data:'+d1+","+d2);
		console.log(a);
	})
	
	
	
	$(':button').click(function(){
		$('p').trigger('myevent',['One','Two'])
	})
})