$(document).ready(function(){
	
	$("input[type='submit']").on("click",function(e){
		var id=$("#floatingInput").val()
		var pw=$("#floatingPassword").val()
		if(id==""){
			$("#idmsg").text("아아디를 입력하세요")
			$("#idmsg").css("color","red")
			e.preventDefault();
		}else if(pw==""){
			$("#pwmsg").text("비밀번호를 입력하세요")
			$("#pwmsg").css("color","red")
			e.preventDefault();
		}
	})
	
	$("#signup").on("click",function(){
		location.href="/member/sign_up";

	})
})