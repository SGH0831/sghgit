/**
 * 
 */

/*선택 관련 메소드
 1.document.getElementById("id값") 
 document.getElementById("header");
 2.document.getElementsByName("name값") 
 document.getElementsByName("hobby");
 3.document.getElementsByClassName("class값")
 document.getElementsByClassName("page");
 4.document.querySelector("선택자");
 document.querySelector("#header");
 document.querySelector(".page");
 5.document.querySelectorAll("선택자");
 5.document.querySelectorAll("#header");
 5.document.querySelectorAll(".page");
 5.document.querySelectorAll("input");
*/
function innerHTML1(){
	//var apple=document.getElementById("apple")
	var apple=document.querySelector("#apple")
	apple.innerHTML="사과 한개가 주문되었습니다";//innerHTML:내부 글자를 조작하는 속성
}

function hobby(){
var hobby=document.querySelectorAll("input");
for(var i=0;i<hobby.length;i++){
	alert(hobby[i].value);
}
}