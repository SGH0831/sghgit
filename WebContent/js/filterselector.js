/**
 * 
 */
$(document).ready(function(){
	//$("[type='text']").val("abcd");
	//기호 필터 선택자
	//(":result")  =   input type=result 인 태그 선택
/*
	$(":text").val("abcd")
	$(":password").val("abcd")
	$(":radio").val("abcd")
	$(":checkbox").val("abcd")
	$(":image").val("abcd")
	$(":file").val("abcd")
	$(":submit").val("abcd")
	$(":reset").val("abcd")
	$(":button").val("abcd")
	$(":enabled").css("background","grey")
	$(":disabled").css("background","blue")
	*/
	setInterval(function(){
	//var value=$("select>option:selected").val()
//	alert(value)
	$("[type=text]:focus").css("background","grey");
		
	},2000)
})