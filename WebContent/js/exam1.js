/**
 * 조건문 반복문 연습문제
 */
 
/*
//1
while(true){
	var result=prompt("안녕or잘자or잘있어를입력하세요");
	if(result=="잘있어"){
		break;
	}else if(result=="안녕"){
		alert("안녕하세요")
	}else if(result=="잘자"){
		alert("안녕히 주무세요")
	}else {
		alert("다시 입력해주세요")
	}
}
//2
var sum=0;
for(i=0 ; i<=100 ;i++){
	sum+= i;
}
document.write("100까지의 합:"+sum)
//3
var sum=0;
var num1=parseInt(prompt("시작수"));
var num2=parseInt(prompt("끝수"));
for(i=num1;i<=num2;i++){
	sum+=i;
}

document.write(num1+"부터 "+num2+"까지의 합:"+sum);
//4
var sum=1
for(i=1;i<=100;i++){
	sum*=i;
}
document.write("1~100의곱 :"+sum)
//5

var sum=1;
var num1=parseInt(prompt("첫수"));
var num2=parseInt(prompt("끝수"));
for(i=num1;i<=num2;i++){
	sum*=i;
}
document.write(num1+"~"+num2+"의 곱:"+sum);

//6
//i++ 값에 i=i+2 도 가능

var sum=0;
for(i=1;i<=100;i++){
	if(i%2==0){
		sum+=i;
	}
}
document.write("100까지 짝수합:"+sum)

//7
var sum=0;
var num=[65,80,25,30,75]
for(i=0;i<num.length;i++){
	sum+=num[i];
}
document.write("배열의 합:"+sum)
*/

//8
//var x=parseInt(prompt("첫번째 숫자"))
//var y=parseInt(prompt("두번째 숫자"))
//id에 저장되어있는 값을 getElementById 속성을 사용
//var x=null;
//var y=null;

function calc(op){//op +,-,*,/ 기호를 저장
	var x=parseInt(document.getElementById("firstnum").value);
	var y=parseInt(document.getElementById("secondnum").value);
	if(op=="+"){
		//alert(x+y)
		document.getElementById("result").value=x+y
	}else if(op=="-"){
		document.getElementById("result").value=x-y
	}else if(op=="*"){
		document.getElementById("result").value=x*y
	}else if(op=="/"){
		document.getElementById("result").value=x/y
	}
	
}







