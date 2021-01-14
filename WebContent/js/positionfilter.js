/**
 * 
 */
$(document).ready(function(){
	$("tr:first").css("color","red")
	//$("td:last").css("background","rgb(181,214,146)")
	
	//td:nth-child(x)   x번째 td
	$("td:nth-child(2)").css("background","rgb(214,230,245)")
	//0부터시작
	$("td:odd").css("font-weight","bolder")
	$("td:even").css("font-style","italic")
});