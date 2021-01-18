$(document).ready(function(){
	
	/*비밀번호 이메일전송*/
	$("#submit").on("click",function(){
		var email=$("#email").val()
		
		$.ajax({
			url:"/mr/find_pw",
			type:"post",
			contentType:"application/json; charset=utf-8",
			data:JSON.stringify({email:email}),
			success:function(data){
				$("resultbox").children("p").remove();
				$("#result").html("이메일이 전송 되었습니다")
				$("#resultbox").append("<a href='/member/login'>로그인</a>")
			},error:function(){
				alert("이메일을 다시 입력해주세요")
			}
			
		})
	})
})