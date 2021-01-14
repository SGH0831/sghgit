$(document).ready(function(){
	
	$("#file").change(function(){
		if($("#file").val()==""){
			$("#img").removeAttr("src");			
		}else{
		var file=$("#file")
		var files=file[0].files;
		var reg=/.(jpg|bmp|png|jpeg|gif)$/;
		console.log(files)
		
		if(reg.test(file.val())){
			$("input[type='submit']").attr("disabled",false)
			var reader =new FileReader();
			reader.onload=function(e){
				$("#img").attr("src",e.target.result)
			}
			reader.readAsDataURL(files[0]);
		}else{
			alert("이미지 파일만 가능합니다")
			$("input[type='submit']").attr("disabled",true);
		}
		}
	})
	
	$("input[type='submit']").on("click",function(e){
		var form =$("form")
		e.preventDefault();
		if($("#title").val()!="" && $("#content").val()!=""&&$("#file").val()!=null&&$("#material").val()!=null){
			var formdata=new FormData();
			var file=$("#file")
			var files=file[0].files;
			formdata.append("uploadfile",files[0])
			console.log(formdata);
			$.ajax({
				url:"/br/action"
				,type:"post",
				datatype:"json",
				processData:false,
				contentType:false,
				data:formdata,
				success:function(e){
					var str="";
					str+="<input type='hidden' name=attach.filename value='"+e.filename+"'>"
					str+="<input type='hidden' name=attach.uuid value='"+e.uuid+"'>"
					str+="<input type='hidden' name=attach.uploadpath value='"+e.uploadpath+"'>"
					
					form.append(str).submit();
				},error:function(){
				}
			})
			
			
		}
		e.preventDefault();
		
	})
	
	
	
})