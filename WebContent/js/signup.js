/**
 * 
 */
$(document).ready(function(){
	$('#check').click(function(){
		var len=$("#idbox").val().length
		if(len>=4 &&len<=12){
			alert("생성 가능")
		}else{
			alert("4자~12자 사이로 정해주세요")
		}
	})	
	$('#rrg1').keyup(function(){
		var len =$('#rrg1').val().length
		if(len>=6){
			$('#rrg2').focus()
		}
	})
	
	$("#yy").keyup(function(){
		var len=$('#yy').val().length
		if(len>=4){
			$("#mm").focus()
		}
	})
	
	
	$('#output').blur(function(){
		
		
		
	})
})