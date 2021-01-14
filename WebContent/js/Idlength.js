/**
 * 
 */
function length(){
	var id=document.getElementById("id").value;
	var b=document.getElementById("b")
	if(id.length>=5 && id.length<=20){
		b.innerHTML="멋진 아이디네요!";
		b.style.color="green"
	}else {
		b.innerHTML="5~20자만 사용 가능합니다";
		b.style.color="red"
	}
	
}