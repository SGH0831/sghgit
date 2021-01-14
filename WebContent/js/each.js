/**
 * 
 */

$(document).ready(function(){
	//배열 선언과 동시에 초기화
	var array=[
		{name:"네이버",link:"https://www.naver.com"},
		{name:"다음",link:"https://www.daum.net"},
		{name:"구글",link:"https://www.google.com"}
	];
	
	$.each(array,function(index,item){
		//html에 출력할 출력문을 저장하기 위한 변수 지정
		var output="";
		
		//html에 출력하고자 하는 문자열을 만듭니다.
		output+="<a href='"+item.link+"'>"
		output+="<h1>"+item.name+"</h1>"
		output+="</a>"
		document.body.innerHTML +=output;
	})
	
});