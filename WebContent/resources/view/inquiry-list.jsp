<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Home page</title>
<jsp:include page="staticFiles.jsp" />
<script type="text/javascript">
   
    $(document).ready(function() {
    	
    	findAll()
    	
    	function findAll() {
    		console.log('findAll');
    		$.ajax({
    			type: 'GET',
    			url: "http://localhost:8080/operatorInquiry/inquiry/list",
    			dataType: "json", // data type of response
    			success: renderList
    		});
    	}
    	
    	function renderList(data) {
    		// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
    		var list = data == null ? [] : (data instanceof Array ? data : [data]);
    		renderDetails(list)		
    	}
    	
    	function renderDetails(list) {  /* заполняет поля формы  */
    		
    		$.each(list, function(index, inquiry) {
    			$('trId').append("asds");
    			$('#inquiryId').html(inquiry.id);
    			$('#inquiryTopicName').html(inquiry.topic.name);
    			$('#inquiryCustomerName').html(inquiry.customerName);
    			$('#inquiryDescription').html(inquiry.description);
    			$('#inquiryAttributeOfInquiryModel').html(inquiry.attributeOfInquiry.model);
    			$('#inquiryAttributeOfInquiryAdress').html(inquiry.attributeOfInquiry.adress);
    			$('#inquiryAttributeOfInquiryCity').html(inquiry.attributeOfInquiry.city);
    		});
		}
    	
		var deleteLink = $("a:contains('Delete')");
      
		$(deleteLink).click(function(event) {
    	  
			$.ajax({
				url: $(event.target).attr("href"),
			  	type:"DELETE",
			  	
			  	beforeSend: function(xhr) {
			  		xhr.setRequestHeader("Accept", "application/json");
			  		xhr.setRequestHeader("Content-Type", "application/json");
			  	},
			  	
			  	success: function(smartphone) {
			  		var respContent = "";
			  		var rowToDelete = $(event.target).closest("tr");
			  		
			  		rowToDelete.remove();
			  		
			  		respContent += "<span class='success'>Inquiry was deleted: [";
			  		respContent += inquiry.description + " : ";
			  		respContent += inquiry.customerName + " : " ;
			  		respContent += inquiry.createDate + "]</span>";
			  		
			  		$("#sInquiryFromResponse").html(respContent);   		
			  	}
			});
  
			event.preventDefault();
		});
       
});   
</script>

</head>
<body>
	<div id="container"  class="container">
		<h2>All Inquirys</h2>
		<div>
			<p>Here you can see a list of Inquiry:</p>
			<div id="sInquiryFromResponse"></div>
		</div>
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Id</th>
					<th>Topic</th>
					<th>Description</th>
					<th>Customer Name</th>
					<th>Date</th>
					<th>Model</th>
					<th>Adress</th>
					<th>City</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
					<tr id = "trId">
						<td id="inquiryId"></td>
						<td id="inquiryTopicName"></td>
						<td id="inquiryDescription"></td>
						<td id="inquiryCustomerName"></td>
						<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
						<td id="inquiryCreateDate"><fmt:formatDate value="${inquiry.createDate}" pattern="yyyy-MM-dd" /></td>
						<td id="inquiryAttributeOfInquiryModel"></td>
						<td id="inquiryAttributeOfInquiryAdress"></td>
						<td id="inquiryAttributeOfInquiryCity"></td>
						<td>
							<a href="${pageContext.request.contextPath}/customers/${inquiry.customerName}/inquiries/${inquiry.id}.json"
							class="btn btn-default btn-sm">Edit <span class="glyphicon glyphicon-pencil"></span></a><br/>
							<a href="${pageContext.request.contextPath}/customers/${inquiry.customerName}/inquiries/${inquiry.id}.json"
							class="btn btn-default btn-sm">Delete <span class="glyphicon glyphicon-remove"></span></a><br/>
						</td>
					</tr>
			</tbody>
		</table>

		<a href="${pageContext.request.contextPath}/">Home page</a>
		<a href="${pageContext.request.contextPath}/create">Create new inquiry</a>
	</div>
</body>
</html>