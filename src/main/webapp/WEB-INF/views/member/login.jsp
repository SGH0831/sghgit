<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/login.css">
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
<script type="text/javascript" src="/resources/js/login.js"></script>

</head>
<body>
	<div id="ff">
		<div id="f">
			<div id="logoarea">
				<div id="logo">
					<a href="/"><img src="/resources/img/logo2.png"></a>
				</div>
			</div>
			<div id="bottomarea">
				<div id="loginbox">
					<form action="/member/login" method="post">
						<div id="logintool">
							<div id="textarea">
								<div class="form-floating mb-3">
									<input type="text" class="form-control" id="floatingInput"
										placeholder="아이디" name="id"> <label
										for="floatingInput">아이디</label>
								</div>
								<span id="idmsg"></span>
								<div class="form-floating">
									<input type="password" class="form-control mb-3"
										id="floatingPassword" placeholder="Password" name="pw"> <label
										for="floatingPassword">비밀번호</label>
								</div>
								<div>
									<span id="pwmsg"></span>
								</div>
								<div>
									<span id="logmsg">${msg} </span>
								</div>
							</div>
							<div id="loginarea">
								<input class="btn btn-primary" type="submit" value="로그인">
							</div>
						</div>
						<div id="memberarea">
							<a id="signup" href="#">회원가입</a>&nbsp;&nbsp;<a id="idfind"
								href="/member/find_id">아이디</a>&nbsp;/&nbsp;<a id="pwfind"
								href="/member/find_pw">비밀번호 찾기</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>