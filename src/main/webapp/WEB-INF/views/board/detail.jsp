<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Detail</title>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
	crossorigin="anonymous">
<link rel="stylesheet" href="/resources/css/detail.css">
<script type="text/javascript" src="/resources/js/jquery-3.5.1.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
	crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/detail.js"></script>
</head>
<body>
	<script type="text/javascript">
		var id = '${user.id}'
		var bno = '${detail.bno}'
	</script>
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
			<div id="contents">
				<div class="mx-auto" style="width:600px">
					<div class="d-flex">
						<img id="img" class="rounded">
						<div>
							<h3>${detail.title}</h3>
							<p class="fw-bold">요리재료</p>
							<h5>${detail.material}</h5>
						</div>
					</div>
					<p class="fw-bold">요리방법</p>
					<p>${detail.content}</p>
					<c:if test="${detail.writer==user.id}">
					<button class="btn btn-secondary" id="modify">수정</button>
					<button class="btn btn-warning" id="delete">삭제</button>
					</c:if>
					<button type="button" id="likesbox" class="btn btn-light">추천</button>
					<p id="likes"></p>
					<div id="replybox">
						<div id="inputbox">
							<textarea id="replytext" maxlength="100"
								<c:choose>
					<c:when test="${user==null}">
					placeholder="로그인이 필요합니다" readonly="readonly"
					</c:when>
					<c:when test="${user!=null}">
					 placeholder="댓글을 입력하세요"
					</c:when>
					</c:choose>></textarea>
							<input type="hidden" value="${user.id}" id="writer"> <input
								type="button" id="rebutton" value="댓글쓰기">
						</div>
						<div id="replys">
							<ul id="replies">
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="footer">
			<div></div>
		</div>
	</div>
</body>
</html>