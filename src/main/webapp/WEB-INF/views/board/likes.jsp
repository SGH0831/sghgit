<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="/resources/js/jquery-3.5.1.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
	crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/likes.js"></script>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
	crossorigin="anonymous">
<link href="/resources/css/likes.css" rel="stylesheet">
</head>
<body>
	<div>
		<nav class="navbar" id="nav">
			<div class="container">
				<a class="navbar-brand" href="/"> <img
					src="/resources/img/logo.png" alt="" width="150" height="65"
					class="d-inline-block align-top">
				</a>
				<div id="searchB">
					<input class="form-control me-2" type="search" placeholder="Search"
						id="search" aria-label="Search"> <input id="searchbtn"
						class="btn btn-secondary" type="button" value="Search">
				</div>
				<div class="dropdown">
					<a class="navbar-brand ms-3" href="#" role="button"
						id="dropdownMenuLink" data-bs-toggle="dropdown"
						aria-expanded="false"> <img src="/resources/img/user.png"
						alt="" width="38" height="38">
					</a>
					<ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
						<c:choose>
							<c:when test="${user !=null }">
								<a href="/member/detail">${user.name}</a>님
								<li><a id="write" href="#"><img
										src="/resources/img/write.png"><span>글쓰기</span></a></li>
								<li><a id="mylike" href="#"><img
										src="/resources/img/like.png"><span>좋아요</span></a></li>
								<li class="text-center"><button class="btn btn-success"
										id="logout_btn">로그아웃</button></li>
							</c:when>
							<c:when test="${user == null }">
								<li class="text-center">
									<button class="btn btn-success" id="login_btn">로그인</button>
								</li>
							</c:when>
						</c:choose>
					</ul>
				</div>
			</div>
		</nav>
		<div class="container">
			<div id="contents" class="d-flex justify-content-center">
				<c:forEach items="${list}" var="bo">
					<div data-bno="${bo.bno}" class="card bg-light mb-2"
						style="width: 15rem;">
						<img src="" class="card-img-top" alt="">
						<div class="card-body">
							<h5 class="card-title">[${bo.category}]${bo.title}</h5>
							<p class="card-text">
								like:<span class="likes"></span> / hits:${bo.hits}
							</p>
						</div>
					</div>
				</c:forEach>
			</div>
			<nav>
				<ul class="pagination  justify-content-center">
					<c:if test="${page.prev}">
						<li class="page-item disabled"><a class="page-link" href="#"
							tabindex="-1" aria-disabled="true">Previous</a></li>
					</c:if>
					<c:forEach var="num" begin="${page.startPage}"
						end="${page.endPage}">
						<li
							class="page-item 
						<c:if test="${num==page.cri.pageNum}">
							active
						</c:if>						
						 "
							aria-current="page"><a class="page-link"
							href="/?pageNum=${num}&keyword=${page.cri.keyword}&type=${page.cri.type}">${num}</a></li>
					</c:forEach>
					<c:if test="${page.next}">
						<li class="page-item"><a class="page-link" href="#">Next</a></li>
					</c:if>
				</ul>
			</nav>
		</div>
		<div id="footer">
			<div></div>
		</div>
	</div>
</body>
</html>