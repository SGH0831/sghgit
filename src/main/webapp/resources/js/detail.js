$(document).ready(function(){
	img();
	likes();	
	replylist();
	
	/*이미지 가져오기*/
	function img(){
		$.getJSON("/br/"+bno+".json",function(data){
			var callpath=encodeURIComponent(data.uploadpath+"/"+data.uuid+"_"+data.filename)
			$("#img").attr("src","/br/display?filename="+callpath )
		})
	}	
	/*로그인*/
	$("#login_btn").on("click",function(){
		location.href="/member/login";
	})
	/*로그아웃*/
	$("#logout_btn").on("click",function(){
		alert("로그아웃")
		location.href="/member/logout"
	})
	/*글쓰기*/
	$("#write").on("click",function(){
		location.href="/board/write"
	})
	/*추천*/
	$("#mylike").on("click",function(){
		location.href="/board/likes"
	})
	/*홈*/
	$("#menu").on("click",function(){
		location.href="/main/"
	})
	/*댓글 쓰기*/
	$("#rebutton").on("click",function(){
		if(id!=""){
		var reply_writer =id;
		var reply_content =$("#replytext").val();
		$.ajax({
			url:"/reply/write",
			type:"post",
			contentType:"application/json; charset=utf-8",
			data:JSON.stringify({bno:bno,reply_writer:reply_writer,reply_content:reply_content}),
			success:function(data){
				$("#replytext").html("")
				replylist();
			},error:function(){
				alert("에러")
			}
		})		
		}else{
			alert("로그인필요")
		}	
	})
	/*댓글 리스트*/
	function replylist(){
		var str="";
		$.getJSON("/reply/"+bno+".json",function(data){
			$(data).each(function(){
				str+="<li class='border' data-rno='"+this.rno+"'><p class='re_writer fw-bold'>"+this.reply_writer+"</p><p class='re_content'>"+this.reply_content+"</p>"
				if(id==this.reply_writer){
				str+="<p><button class='remodi btn btn-success'>수정</button>  <button class='redel btn btn-success'>삭제</button></p></li>"
				}
			})
			$("#replies").html(str)
		})
	}
		
	
	/*글 수정*/
	$("#modify").on("click",function(){
		location.href="/board/modify?bno="+bno		
	})	
	
	/*글 삭제*/
	$("#delete").on("click",function(){
		var form = $("#form")
		form.attr("action","/board/delete")
		form.attr("method","post")
		form.submit();
	})	
	
	
	/*댓글수정*/
	$("#replies").on("click",".remodi",function(){
		var rno=$(this).parents("li").data("rno")
		var text=$(this).parent().prev(".re_content").html();
		$(this).parents("li").replaceWith("<textarea data-rno='"+rno+"' class='modiarea' maxlength='100'>"+text+"</textarea><div><button class='modisub btn btn-success'>확인</button><button class='modican  btn btn-success'>취소</button></div>");
	})
		
	/*댓글수정 확인*/
	$("#replies").on("click",".modisub",function(){
		var rno=$(this).parent().prev("textarea").data("rno")
		var reply_content=$(this).parent().prev("textarea").val();
		$.ajax({
				url:"/reply/modify",
				type:"put",
				contentType:"application/json; charset=utf-8",
				data:JSON.stringify({rno:rno,reply_content:reply_content}),
				success:function(){
					replylist();
				},error:function(){
				}
		})
	})	
	/*댓글수정 취소*/
	$("#replies").on("click",".modican",function(){
		replylist();
	})	
	/*댓글 수정*/
	$("#replies").on("click",".redel",function(){
		var rno=$(this).parents("li").data("rno")
		$.ajax({
				url:"/reply/delete",
				type:"delete",
				contentType:"application/json; charset=utf-8",
				data:JSON.stringify({rno:rno}),
				success:function(){
					replylist();
				},error:function(){
				}
		})
	})
	/*추천*/
	$("#likesbox").on("click",function(){
		if(id!=null&&id!=''){
			$.ajax({
				url:"/br/likes",
				type:"post",
				contentType:"application/json; charset=utf-8",
				data:JSON.stringify({bno:bno,id:id}),
				async:false,
				success:function(result){
					if(result==1){
						$.ajax({
							url:"/br/likesdel",
							type:"delete",
							async:false,
							contentType:"application/json; charset=utf-8",
							data:JSON.stringify({bno:bno,id:id}),
							success:function(){
								likes()
							},error:function(){
							}
						})
					}else{
						$.ajax({
							url:"/br/likesadd",
							type:"put",
							async:false,
							contentType:"application/json; charset=utf-8",
							data:JSON.stringify({bno:bno,id:id}),
							success:function(){
								likes()
							},error:function(){
							}
						})
					}
				},error:function(){
				}
			})
		}else{
			alert("로그인 필요")
		}
	})
	
	/*추천 확인*/
	function likes(){
		if(id!=null&&id!=''){
			$.ajax({
				url:"/br/likes",
				type:"post",
				contentType:"application/json; charset=utf-8",
				data:JSON.stringify({bno:bno,id:id}),
				success:function(result){
					if(result==1){
						$("#likesbox").html("추천취소")
					}else{
						$("#likesbox").html("추천")
					}
				}
			})
		}else{
		
		}
	}
	
})