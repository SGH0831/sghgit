/**
 * 
 */
$(document).ready(function(){
	 
	// 전체 선택자
	$("*").css("margin",0);
	// 태그 선택자
	$("h1").css("border","2px solid red");
	// 아이디 선택자
	//document.getElementById("idselector")
	$("#idselector").css({"background-color":"grey","color":"blue","font-size":"20px"});
	// 클래스 선택자	
	$(".classselector").css("background-color","yellow").css("color","red")

})