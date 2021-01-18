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
	
	/*글보기*/
	$(".card").on("click",function(){
		var bno =$(this).data("bno")
		location.href="/board/detail?bno="+bno;
	})
	
	/*검색*/
	$("#search").on("keydown",function(k){
		if(k.keyCode==13){
		var search=$("#search").val()		
		location.href="/?type=title&keyword="+search
		}
	})
	
	/*검색*/
	$("#searchbtn").on("click",function(){
		var search=$("#search").val()		
		location.href="/?type=title&keyword="+search
		
	})
	/*추천글*/
	$("#mylike").on("click",function(){
		location.href="/board/likes"
	})
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
		
		
})