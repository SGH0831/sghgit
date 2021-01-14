/**
 * 함수를 선언

function changeBackground1(){
	//웹 문서에 배경색을 녹색으로 줘라
	document.bgColor='green'
}
function changeBackground2(){
	//웹 문서의 배경색을 빨간색으로 줘라
	document.bgColor='red'
}
*/
function changeBackground(colorName){
	document.bgColor=colorName
}

yourName=prompt("이름을 입력해주세요","홍길동");
favField=prompt("관심분야는 무엇인가요","웹개발")

printName(yourName,favField);

 function printName(name,field){
	document.write("<h1> 이름:"+name+"</h1>");
	document.write("<h1> 관심분야:"+field+"</h1>");
}









