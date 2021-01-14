<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<script type="text/javascript" src="/resources/js/jquery-3.5.1.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
	crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/m_detail.js"></script>
</head>
<body>
	<script type="text/javascript">
		var id = '${user.id}'
	</script>
	<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
		data-bs-keyboard="false" tabindex="-1"
		aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">비밀번호 변경</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="/member/modify" method="post" id="form">
						<label for="pw" class="form-label">비밀번호</label> <input
							type="password" id="pw" name="pw" class="form-control">
						<p id="pwch"></p>
						<label for="pwc" class="form-label">비밀번호 확인</label> <input
							type="password" id="pwc" name="pwc" class="form-control">
						<p id="pwcch"></p>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-success" id="btn_modi">변경</button>
					<button type="button" class="btn btn-secondary"
						data-bs-dismiss="modal">취소</button>
				</div>
			</div>
		</div>
	</div>
	<div>
		<nav class="navbar bg-light">
			<div class="container">
				<span class="navbar-brand mb-0 h2 fw-bold">개인정보</span>
			</div>
		</nav>
		<div class="container">
			<table class="table">
				<tr>
					<td>아이디</td>
					<td id="id">${user.id}</td>
				</tr>
				<tr>
					<td>비밀번호</td>
					<td><button type="button" class="btn btn-success"
							data-bs-toggle="modal" data-bs-target="#staticBackdrop">변경</button>

					</td>
				</tr>
				<tr>
					<td>이름</td>
					<td>${user.name}</td>
				</tr>
				<tr>
					<td>이메일</td>
					<td>${user.email}</td>
				</tr>
			</table>
			<a href="/" class="btn btn-success">홈</a>
			<button class="btn btn-success bg-danger" data-bs-toggle="modal"
				data-bs-target="#delModal">탈퇴</button>
			<div class="modal fade" id="delModal" tabindex="-1"
				aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">회원 탈퇴</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div class="modal-body">탈퇴 하시겠습니까?</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" id="btn_userdel">탈퇴</button>
							<button type="button" class="btn btn-secondary"
								data-bs-dismiss="modal">취소</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</body>
</html>