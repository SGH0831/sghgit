/**
 * 
 */
$(document).ready(function(){
	//filter() 메서드
	//홀수번째 위치한 h3태그에 css적용
	//$("h3:even").css({"background":"rgb(214,230,245)","color":"skyblue"})
	//$("h3").filter(":even").css({"background":"rgb(214,230,245)","color":"skyblue"})
	//3의 배수에 위치한h3태그에 css
	//$("h3").filter(function(index){return (index+1) %3 ==0;}).css({"background":"rgb(214,230,245)"})
	$("h3").css('background',"orange").filter(":even").css("color","yellow").end().filter(":odd").css("color","grey")
	
	$("a").css("text-align","center").css("color","white").css("font-weight","bolder").css("font-size","24px").css("text-decoration","none").css('border-radius',"30%").css("background","skyblue").css("display","inline-block").css('padding',"10px 20px 15px 20px" ).css("border","1")
	})