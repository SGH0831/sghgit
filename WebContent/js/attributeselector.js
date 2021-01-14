/**
 * 
 */

$(document).ready(function(){
	//type 이 text인 태그
	//$("[type='text']").css("background","red")
	
	//type이 text가 아닌 태그
	//$("[type!='text']").css("background"," RGB(163,204,163)").css({"border":"none","outline":"none"})
	
	//type이 word로 끝나는 태그
	//$("[type$='word']").css("background"," RGB(163,204,163)").css({"border":"none","outline":"none"})
	
	//type이 text 이거나 text-로 시작하는 태그
	//$("[type|='text']").css("background"," RGB(163,204,163)").css({"border":"none","outline":"none"})
	
	//type의 값이 pass로 시작하는 태그
	//$("[type^='pass']").css("background"," RGB(163,204,163)").css({"border":"none","outline":"none"})
	
	//type의 값이 pass란 특정단어를 포함하는 태그
	//$("[type~='pass']").css("background"," RGB(163,204,163)").css({"border":"none","outline":"none"})
	
	//type의 값이 pass를 포함하는 태그
	//$("[type*='pass']").css("background"," RGB(163,204,163)").css({"border":"none","outline":"none"})
	
	//type의 값이 text인것의 value속성에  zz 란 값을 셋팅
	$("[type='text']").val("zz")
	//type의 값이 password인것의 value 값을 가지고 온다
	var value=$("[type='password']").val();
})
