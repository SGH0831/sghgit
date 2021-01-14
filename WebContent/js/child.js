/**
 * 
 */

$(document).ready(function(){
//자식 선택자 (부모>자식)
	$(".container>h1").css("color","red")
//후손 선택자(선택자 선택자)
	$(".container li").css("color","blue")
	
})