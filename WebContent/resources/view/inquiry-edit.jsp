<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Home page</title>
<jsp:include page="staticFiles.jsp" />

<script type="text/javascript">
   
    $(document).ready(function() {
    	
    	$('#popMessag').hide();
      
        $('#editInquiryForm').submit(function(event) {	  
      	  var topic = $('#topic').val();
      	  var description = $('textarea#description').val();
      	  var customerName = $('#customerName').val();
      	  var createDate = $('#createDate').val();
      	  var attributeOfInquiry = {"id":$('#attributeOfInquiryId').val(), "model" : $('#model').val(),
      	      	   "adress": $('#adress').val(), "city": $('#city').val() };
      	

      	  var json = {"id":$('#inquiryId').val(), "topic":{"id":topic ,"name":""}, "attributeOfInquiry": attributeOfInquiry, 
      	    	   "description" : description, "createDate": createDate,"customerName": customerName};
      	  
      	  
          $.ajax({	
          	url: "http://localhost:8080/operatorInquiry/customers/" + $('#customerName').val() +'/inquiries/'+ $('#inquiryId').val() + '.json' ,
          	data: JSON.stringify(json),
          	type: "PUT",
          	
          	beforeSend: function(xhr) {
          		xhr.setRequestHeader("Accept", "application/json");
          		xhr.setRequestHeader("Content-Type", "application/json");
          	},
          	success: function() {
          		
	        	$('#popMessag').text("Inquiry for User: " +customerName+" updated successfull");
	    		$('#popMessag').fadeIn().fadeIn("slow").fadeIn(5000).delay(10000).fadeOut(3000);
	    		
	    		renderDetails()
    		},
          });
         
        event.preventDefault();
      });
       
    });   
  </script>
</head>

<body>
		<div class="container">
		<h1>Edit Inquiry</h1>
		<div>
			<div id="sNewInquiryForm"></div>
		</div>
		
	<form:form id="editInquiryForm"	 action="${pageContext.request.contextPath}" commandName="inquiry" method="PUT">
			
 			<input type="hidden" class="form-control" id="inquiryId"   value="${inquiry.id}"/>
	
			<div class="form-group">
				<label for="customerName">Customer Name:</label>
			    <input type="text" class="form-control" id="customerName" placeholder="Customer Name"
			    value="${inquiry.customerName}"/>		    
			</div>

			<div class="form-group">
				<label for="description">Description:</label> 
				<textarea class="form-control" rows="5" type="text" 
				class="form-control" id="description" placeholder="Enter description" >${inquiry.description}</textarea>
			</div>
			
			<div class="form-group">
				<label for="createDate">Create Date:</label> 
				<input type="text" class="form-control" id="createDate" placeholder="Create Date:"
				value="${inquiry.createDate}" name="createDate1" readonly>		
			</div>
			
			<script type="text/javascript">
				$(function() {
					$('input[name="createDate1"]').daterangepicker({
						singleDatePicker : true,
						showDropdowns : true,
						locale: {
				            format: 'YYYY-MM-DD'
				        }
					});
				});
			</script>
			
			<input type="hidden" class="form-control" id="attributeOfInquiryId" placeholder="attributeOfInquiryId"
			    value="${inquiry.attributeOfInquiry.id}"/>
			
			<div class="form-group">
				<label for="model">Model:</label> 
				<input type="text" class="form-control" id="model" placeholder="Model:"
				value="${inquiry.attributeOfInquiry.model}">		
			</div>
			
			<div class="form-group">
				<label for="adress">Adress:</label> 
				<input type="text" class="form-control" id="adress" placeholder="Adress:"
				value="${inquiry.attributeOfInquiry.adress}">		
			</div>
			
			<div class="form-group">
				<label for="city">City:</label> 
				<input type="text" class="form-control" id="city" placeholder="City:"
				value="${inquiry.attributeOfInquiry.city}">		
			</div>
			
			<div class="form-group">
				<label for="topic">Select Topic (select one):</label>
				<form:select path="topic" class="form-control" id="topic" >	
								<c:forEach var="topic" items="${topics}">									
									<form:option value="${topic.id}">${topic.name}</form:option>
								</c:forEach>
				</form:select>
				
			</div>
			
			<button type="submit" class="btn btn-default">Save</button>
			
		<a href="${pageContext.request.contextPath}/" class="btn btn-default">Home page</a>	
		<a href="${pageContext.request.contextPath}/inquiry/list" class="btn btn-default">Back To List</a>	
		
		</form:form>
		
		<div class="alert alert-success" role="alert" id="popMessag">Success</div>
		
	</div>
</body>
</html>