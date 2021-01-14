/**
 * 
 */
$(document).ready(function(){
	setInterval(function(){
		$("div").animate({
			left:600
		},1000)
		.animate({
			left:0
		},1000)
	},2000)
	
	
	$("#a").click(function(){
		//오른쪽 이동만 멈추고 ,제자리에서 바로 왼쪽이동
		$('div').stop()
	})
	$("#b").click(function(){
		//오른쪽으로 이동하는것을 멈추고 ,다음 setInterval() 실행까지 대기함
		$('div').stop(true)
	})
	$("#c").click(function(){
		//버튼을 누르는 순간 사각형이 오른쪽 끝으로 이동하고,그후 바로 왼쪽으로 이동
		$('div').stop(false,true)
	})
	$("#d").click(function(){
		//버튼을 누르는 순간 사각형으 오른쪽 끝으로 이동하고 , 그후 setInterval() 실행까지 대기함
		$('div').stop(true,true)
	})

	
})