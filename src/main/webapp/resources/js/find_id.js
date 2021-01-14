$(document).ready(function(){
	
	$("#submit").on("click",function(){
		var email=$("#email").val()
		
		$.ajax({
			url:"/mr/find_id",
			type:"post",
			contentType:"application/json; charset=utf-8",
			data:JSON.stringify({email:email}),
			success:function(data){
				$("#login").empty();
				$("#result").html("찾으시는 아이디:"+data)
				$("#login").append("<a href='/member/login'>로그인</a>&nbsp;&nbsp;<a href='/member/find_pw'>비밀번호 찾기</a>")
			},error:function(){
				$("#result").html("");
				alert("이메일을 다시 입력해주세요")
			}
			
		})
	})
})