$(document).ready(function(){
	img();
	likes();
	$("#login_btn").on("click",function(){
		location.href="/member/login";
	})
	$("#logout_btn").on("click",function(){
		alert("로그아웃")
		location.href="/member/logout"
	})
	$("#write").on("click",function(){
		location.href="/board/write"
	})
	$("#mylike").on("click",function(){
		location.href="/board/likes"
	})
	$(".card").on("click",function(){
		var bno =$(this).data("bno")
		location.href="/board/detail?bno="+bno;
	})	
	function likes(){
		$("#contents .card").each(function(){
		var bno=$(this).data("bno")
		var ob=$(this)
		$.getJSON("/br/likenum/"+bno+".json",function(data){
			ob.find(".likes").html(data)
		})

		})
	}	
	
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