/**
 * 
 */
$(document).ready(function(){
//	var attr=$('img').attr('src');
	//alert(attr);
	$('img').attr({"width":'200px',"height":"150px"})
	$('img').removeAttr("height")
	$('img').attr({"width":function(index){
		return (index+1)*100},
		"height":"100"
		
	})
	$("*").css('margin','0')
})