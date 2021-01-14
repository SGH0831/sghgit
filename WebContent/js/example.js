/**
 *
/*
alert("외부 스크립트를 활용 하여 알림창을 띄워보자..");
var result=confirm("정말 배경 이미지를 바꾸시겠습니까 ?")

if(result){
	alert("확인버튼을 클릭하였습니다.")
}else{
	alert("취소버튼을 클릭하였습니다.")
}
*/

/*
var gender= prompt("성별을 입력해주세요");

if(gender=="남"){
	alert("남자입니다");
}else if(gender=="여"){
	alert("여자입니다");
}else{
	alert("남 또는 여 로만 입력하세요")
}
	 */

/*
var firstNum=prompt("첫번째 숫자를 입력하세요");
alert(typeof(firstNum));
var secondNum=prompt("두번째 숫자를 입력하세요");
alert(typeof(secondNum));
var sum=parseInt(firstNum)+parseInt(secondNum);

alert(sum)
*/

/*
타입 까지 비교 === 를 사용
*/

/*
//1
var p1=prompt("문자를 입력하세요");

if(p1=="안녕"){
	alert("안녕하세요");
}else if(p1=="잘자"){
	alert("안녕히 주무세요");
}else{
	alert("안녕 또는 잘자 만 입력하세요")
}


//2
while(true){
	var n1=prompt("숫자를 입력하세요");
	if(isNaN(n1)){
//isNaN : isNaN('123'):false/isNaN(123):false /isNaN(hello):true
		break;
	}else if(n1%4==0){
		alert("4로 나눌 수 있는 수입니다");
	}else if(n1%4!=0){
		alert("4로 나눌 수 없는 수입니다");
	}
}


//3


var n2=parseInt(prompt("숫자를 입력하세요"));
// var result = n2>0? "양수입니다" :n2<0? "음수입니다" : "0입니다" ;

if(n2>0){
	alert("양수입니다");
}else if(n2<0){
	alert("음수입니다");
}else if(n2==0){
	alert("0입니다")
}else {
	alert("숫자를 입력하세요")
}


//4
var kogr=parseInt(prompt("국어점수"));
var magr=parseInt(prompt("수학점수"));
var result= (kogr+magr)/2;

alert("정자바의 평균점수 : "+result);
*/
/*
*/

