/**
 * 
 */
$(document).ready(function(){
	$("tr").css('border-top','2px solid black').css('border-bottom','2px solid black').css('margin','0').filter(":odd").css("background","skyblue").end().filter(":even").css("background","rgb(214,230,245)").filter(":first").css("background","blue").css("color","white")
	$('table').css('width','100%').css('border-collapse','collapse')
	$("td").css('padding','8px').css('text-align',"center").css('font-size','24px')
	$("th").css('padding','10px').css('font-size','24px')
})