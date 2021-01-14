/**
 * 
 */
//내장객체명.함수명(매개변수)
//open() 팝업창 만들때 주로 사용
var childwindow=window.open("","","width=300px,height=300px,resizable=no");
//지정한 좌표로 이동
//moveBy()  / moveTo()

//window up함수
function up(){
	childwindow.moveBy(0,-10);
	//moveBy: 현재 좌표에서 주어진 값 만큼 이동
}
//window down함수
function down(){
	childwindow.moveBy(0,10);
}
//window left함수
function left(){
	childwindow.moveBy(-10,0);
}
//window right함수
function right(){
	childwindow.moveBy(10,0);
}
//resize
function fixedwin(){
	childwindow.resizeTo(500,500);
}

//setTimeout
setInterval(function(){
	childwindow.moveBy(1,1);
},1000);