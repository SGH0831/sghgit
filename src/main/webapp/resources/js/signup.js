$(document).ready(function(){
	var date= new Date();
	var y=date.getFullYear();
	
	for(var i=y-100;i<=y;i++){
		$("#YYYY").append("<option value='"+i+"'>"+i+"년</option>")
	}
	
	for(var i=1;i<=12;i++){
		if(i<10){
			$("#MM").append("<option value='0"+i+"'>0"+i+"월</option>")			
		}else{
			$("#MM").append("<option value='"+i+"'>"+i+"월</option>")			
		}
	}
	days();
	$("#MM,#YYYY").on("change",function(){
	days();
	})
	
	function days(){
		$("#DD").html("<option>일</option>")
		var yy=$("#YYYY").val();
		var mm=$("#MM").val();
		var day=daysInMonth($("#YYYY").val(),$("#MM").val())
		
		for(var i=1;i<=day;i++){
			if(i<10){
			$("#DD").append("<option value='0"+i+"'>0"+i+"일</option>")
			}else{
			$("#DD").append("<option value='"+i+"'>"+i+"일</option>")
			}
		}
		
	}
	
	
	function daysInMonth(year,month) {
    return new Date(year, month,0).getDate();
	}
	
	
	$("#id").blur(function(){
		idch();
	})
		
		
	function idch(){
		var id=$("#id").val();
		var tf="";
		var reg=/^[a-z0-9]{4,20}$/;
		if(id==""){
			$("#idch").text("필수")
			$("#idch").css("color","red")
			tf=false
		}else{
			try{
				$.ajax({
					url:"/mr/"+encodeURI(id),
					contentType:"application/json; charset=utf-8",
					type:"GET",
					async:false,
					success:function(result){
					if(result=="1"){
						$("#idch").text("사용중인 아이디 입니다")				
						$("#idch").css("color","red")
						tf=false
					}else{
						if(reg.test(id)){
							$("#idch").text("사용가능한 아이디 입니다")
							$("#idch").css("color","green")
							tf=true
						}else{
							$("#idch").text("4~20자의 영문 소문자,숫자")				
							$("#idch").css("color","red")
							tf=false
						}
					}
					},error:function(){
					}	
				})
			}catch(e){
			}
		}
		return tf		
	}
	$("#pw").blur(function(){
		pwch();
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
			
	$("#pwc").blur(function(){
		pwcch();
	})
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
	$("#name").blur(function(){
		namech();
	})
	function namech(){
		var name=$("#name").val()
		var reg=/^[가-힣]{2,8}$/
		
		if(name==""){
			$("#namech").text("필수")
			$("#namech").css("color","red")
			return false
		}else if(reg.test(name)){
			$("#namech").text("확인")
			$("#namech").css("color","green")
			return true
		}else{
			$("#namech").text("2~8자 한글")
			$("#namech").css("color","red")
			return false
		}
		
	}
		
	$("#email").blur(function(){
		emch();
	})
	
	function emch(){
		var em=$("#email").val();
		var reg=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
		if(em==""){
			$("#emailch").text("필수")
			$("#emailch").css("color","red")
			return false;
		}else if(reg.test(em)){
			$("#emailch").text("확인")
			$("#emailch").css("color","green")
			return true;
		}else {
			$("#emailch").text("올바른 이메일 주소")
			$("#emailch").css("color","red")
			return false;
		}
		
	}
	
	
	$("#submit").on("click",function(e){
		var birth=$("#YYYY").val()+$("#MM").val()+$("#DD").val();
		var reg=/^[0-9]+$/
		if(reg.test(birth)&&idch()&&pwch()&&pwcch()&&namech()&&emch()){
				$("#birth").val(birth);
 				var form=$("#form1");
			}else{
				e.preventDefault();
				idch();
				pwch();
				pwcch();
				namech();
				emch();
			}
			
	})

		
})
	