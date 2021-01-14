<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/find_id.css">
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
<script type="text/javascript" src="/resources/js/find_id.js"></script>
</head>
<body>
	<div id="ff">
		<div id="f">
			<div id="logoarea">
				<div id="logo">
					<a href="/"><img src="/resources/img/logo2.png"></a>
				</div>
			</div>
			<div id="search">
				<div class="mb-3">
					<label for="formGroupExampleInput" class="form-label">이메일</label> <input
						type="text" class="form-control" id="email" name="email">
				</div>
				<span id="emailch"></span>
				<div>
					<input class="btn btn-primary" type="submit" id="submit" value="찾기">
				</div>
			</div>
			<div id="resultbox">
				<p id="result"></p>
				<div id="login"></div>
			</div>
		</div>
	</div>
</body>
</html>