/**
 * 
 */

$(document).ready(function(){
	$('tr:odd').css('background','orange')
	$('tr:first').css('background','black').css('color','white')
	
	var array=['고구마','감자','배추','고추'];
	
	$.each(array,function(index,item){
		var out="";
		out= "<h1>"+item+"</h1>"
		document.body.innerHTML+=out
		
	})
})