$(document).ready(function(){
	var bno=$("#bno").val();	
	$("#category option").each(function(){
		if($(this).val()==$("#cate").val()){
			$(this).attr("selected","selected")
		}
	})
	img();	
	function img(){
		$.getJSON("/br/"+bno+".json",function(data){
			var callpath=encodeURIComponent(data.uploadpath+"/"+data.uuid+"_"+data.filename)
			$("#img").attr("src","/br/display?filename="+callpath )
		})
	}	
	
	$("input[type='submit']").on("click",function(e){
		var form =$("form")
		e.preventDefault();
		
		if($("#title").val()!="" && $("#content").val()!=""&&$("#material").val()!=null){
			if($("#file").val()!=""){
				$.ajax({
					url:"/br/delete"
					,type:"delete",
					datatype:"json",
					contentType:"application/json; charset=utf-8",
					async:false,
					data:JSON.stringify({bno:bno}),
					success:function(){
						var formdata=new FormData();
						var file=$("#file")
						var files=file[0].files;
						formdata.append("uploadfile",files[0])
						console.log(formdata);
						$.ajax({
							url:"/br/action"
							,type:"post",
							datatype:"json",
							async:false,
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
					},error:function(){
					}
				})
	
				
				
			}
			form.submit();
		}
		e.preventDefault();
	})
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
	
	
})