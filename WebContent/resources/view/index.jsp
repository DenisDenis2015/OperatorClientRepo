<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Home page</title>
<link href="resources/css/bootstrap.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<div id="container" class="jumbotron">
		<h1>Home page</h1>
			<a href="${pageContext.request.contextPath}/create.html" class="btn btn-default" >Create new Inquiry </a><br /> 
			<a href="${pageContext.request.contextPath}/resources/view/inquiry-list.jsp" class="btn btn-default">All Inquirys</a><br />
	</div>
	
</body>
</html>