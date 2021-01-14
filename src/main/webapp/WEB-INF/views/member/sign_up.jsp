<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/signup.css">
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
<script type="text/javascript" src="/resources/js/signup.js"></script>
</head>
<body>
	<div id="ff">
		<div id="f">
			<div id="logoarea">
				<div id="logo">
					<a href="/"><img src="/resources/img/logo2.png"></a>
				</div>
			</div>
			<div id="signform">
				<form id="form1" action="/member/sign_up" method="post">
					<div class="mb-3">
						<label for="formGroupExampleInput" class="form-label">아이디</label>
						<input type="text" class="form-control" id="id" name="id">
					</div>
					<span id="idch"></span>
					<div class="mb-3">
						<label for="formGroupExampleInput" class="form-label">비밀번호</label>
						<input type="password" class="form-control" id="pw" name="pw">
					</div>
					<span id="pwch"></span>
					<div class="mb-3">
						<label for="formGroupExampleInput" class="form-label">비밀번호</label>
						<input type="password" class="form-control" id="pwc" name="pwc">
					</div>
					<span id="pwcch"></span>
					<div class="mb-3">
						<label for="formGroupExampleInput" class="form-label">이름</label> <input
							type="text" class="form-control" id="name" name="name">
					</div>
					<span id="namech"></span>
					<div id="birthbox">
						<p>생년월일</p>
						<select id="YYYY" class="form-select"
							aria-label="Default select example">
							<option>년도</option>
						</select> <select id="MM" class="form-select"
							aria-label="Default select example">
							<option>월</option>
						</select> <select id="DD" class="form-select"
							aria-label="Default select example">
						</select> <input type="hidden" id="birth" name="birth">
					</div>
					<div id="genderbox">
						<p>성별</p>
						<div id="genderbox_1">
							<div class="form-check">
								<input class="form-check-input" type="radio"
									name="gender" id="flexRadioDefault1" value="남"> <label
									class="form-check-label" for="flexRadioDefault1"> 남자 </label>
							</div>
							<div class="form-check">
								<input class="form-check-input" type="radio"
									name="gender" id="flexRadioDefault2" value="여"> <label
									class="form-check-label" for="flexRadioDefault2"> 여자 </label>
							</div>
						</div>
					</div>
					<div class="mb-3">
						<label for="formGroupExampleInput" class="form-label">이메일</label> <input
							type="text" class="form-control" id="email" name="email">
					</div>
					<span id="emailch"></span>
					<div>
						<input class="btn btn-primary mb-5" type="submit" id="submit" value="가입">
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>