/**
 * 
 */
 
$(document).ready(function(){
	$("*").css('margin','0')
	$("table").css("text-align","center")
	$('td').filter(function(index){return index<=18}).css("background","rgb(214,230,245)").filter(function(index){return index>=4}).css("background","skyblue").filter(function(index){return index==1 || index>=6&&index<=9}).css('background','aquamarine')
	$('div').css('width','100%').filter('#title').css('display','flex').css('align-items','center').end().filter('#full').css('width','850px').css('margin','auto')
	$('img').css('width','20px').css('height','20px')
	$('h1:first').css('color','blue')
	$('table').css('width','850px').css('border-width','2px').css('border-color','black').css("border-collapse","collapse")

})	