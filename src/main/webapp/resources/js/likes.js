$(document).ready(function(){
	img();
	likes();
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
	/*추천글*/
	$("#mylike").on("click",function(){
		location.href="/board/likes"
	})
	/*글 보기*/
	$(".card").on("click",function(){
		var bno =$(this).data("bno")
		location.href="/board/detail?bno="+bno;
	})	
	/*추천수*/
	function likes(){
		$("#contents .card").each(function(){
		var bno=$(this).data("bno")
		var ob=$(this)
		$.getJSON("/br/likenum/"+bno+".json",function(data){
			ob.find(".likes").html(data)
		})

		})
	}	
	/*썸네일*/
	function img(){
	$("#contents .card").each(function(){
		var bno=$(this).data("bno")
		var ob=$(this)
		$.getJSON("/br/"+bno+".json",function(data){
			var callpath=encodeURIComponent(data.uploadpath+"/S_"+data.uuid+"_"+data.filename)
			ob.find("img").attr("src","/br/display?filename="+callpath )
			})
		})	
	}	
	
	
})