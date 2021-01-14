$(document).ready(function(){
	
	if(id==""){
		location.href="/member/login";
	}
	
	$("#btn_modi").on("click",function(){
		if(pwch()&&pwcch()){
		var str="<input type='hidden' name='id' value='"+id+"'>"
		$("#form").append(str).submit()
		}else{
			pwch();
			pwcch();
		}
	})
	
	$("#btn_userdel").on("click",function(){
		var dform=$('<form></form>');
		dform.attr("method","post");
		dform.attr("action","/member/delete");
		var did=$('<input type="hidden" value="'+id+'" name="id">');
		dform.append(did);
		$("body").append(dform);
		dform.submit();
	})
	
	
	function pwch(){
		var pw=$("#pw").val();
		var reg=/^(?=.*[0-9])(?=.*[a-z]).{8,30}$/;
		if(reg.test(pw)){
			$("#pwch").text("사용가능")
			$("#pwch").css("color","green")
			return true
		}else if(pw==""){
			$("#pwch").text("필수")
			$("#pwch").css("color","red")
			return false
		}else{
			$("#pwch").text("영문 소문자와 숫자를 반드시 조합하여 8~30자")
			$("#pwch").css("color","red")
			return false
		}
	}	
	
	function pwcch(){
		var pw=$("#pw").val();
		var pwc=$("#pwc").val();
		if(pwc==""){
			$("#pwcch").text("필수")
			$("#pwcch").css("color","red")
			return false
		}else if(pw==pwc){
			$("#pwcch").text("확인")
			$("#pwcch").css("color","green")
			return true
		}else{
			$("#pwcch").text("불일치")
			$("#pwcch").css("color","red")
			return false
		}
	}
	
	
})