<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Write</title>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
	crossorigin="anonymous">
<link rel="stylesheet" href="/resources/css/write.css">
<script type="text/javascript" src="/resources/js/jquery-3.5.1.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
	crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/write.js"></script>
</head>
<body>
	<div id="f">
		<div id="formbox">
			<h2>글쓰기</h2>
			<form action="/board/write" method="post"
				enctype="multipart/form-data">
				<div id="titlebox">
					<input type="text" name="title" id="title" placeholder="제목을 입력하세요">
					<select name="category">
						<option value="돼지">돼지</option>
						<option value="소">소</option>
						<option value="닭">닭</option>
						<option value="생선">생선</option>
						<option value="국">국</option>
						<option value="면">면</option>
						<option value="베이커리">베이커리</option>
						<option value="디저트">디저트</option>
						<option value="그외">그외</option>
					</select>
				</div>
				<div id="filebox">
					<input type="file" name="file" id="file">
				</div>
				<div id="materialbox">
					<textarea name="material" id="material" placeholder="재료를 입력하세요"></textarea>
				</div>
				<div id="contentbox">
					<input type="hidden" value="${user.id}" name="writer">
					<textarea name="content" id="content" placeholder="내용을 입력하세요"></textarea>
					<div id="imgbox">
						<img id="img">
					</div>
				</div>
				<div>
					<input type="submit" class="btn btn-success" value="글쓰기">
				</div>
			</form>
		</div>
	</div>
</body>
</html>