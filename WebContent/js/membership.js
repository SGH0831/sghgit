/**
 * 
 */

function f1(){
	var idlength=document.getElementById("id").value;
	if(idlength.length>=6 &&idlength.length<12){
		alert("아이디 생성가능")
	}else{
		alert("6자이상 12자 이내로 작성해주세요")
	}
}
function f2(x,y){
	var len =x.value.length;
	var maxlen=x.maxLength;
	if(len==maxlen){
		document.getElementById(y).focus();
	}
	
	
}