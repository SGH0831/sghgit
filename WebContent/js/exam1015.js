/**
 * 
 */
function up(){
	document.getElementById("label").innerHTML++
}
function down(){  
	if(document.getElementById("label").innerHTML >0 ){
		document.getElementById("label").innerHTML--
	}
}