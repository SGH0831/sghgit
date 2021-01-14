/**
 * 자바 스크립트 만으로 이벤트를 적용 시켜 보자(고전 이벤트 모델)
 */
window.onload=function(){
// 버튼을 선택함
var button=document.getElementById("btn1")
//버튼을 클릭하면 알림창을 띄워라
button.onclick=function(){
	//alert("클릭")  //알림창을 띄워라
	//css를 적용시켜보자
	var page=document.getElementById('page');
	page.style.color='red';
}

}