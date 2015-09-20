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
    	
   	 function renderDetails() {  /* сбрасывает поля формы */
			$('#customerName').val("");
			$('textarea#description').val("");
			$('#model').val("");
			$('#adress').val("");
			$('#city').val("");
		}
    	
    	$('#popMessag').hide();
      
      $('#newInquiryForm').submit(function(event) {	  
    	  var topic = $('#topic').val();
    	  var description = $('textarea#description').val();
    	  var customerName = $('#customerName').val();
    	  var createDate = $('#createDate').val();
    	  var attributeOfInquiry = {"id":null, "model" : $('#model').val(), "adress": $('#adress').val(), "city": $('#city').val() }

    	  var json = {"id":null, "topic":{"id":topic,"name":""}, "attributeOfInquiry": attributeOfInquiry, 
    	    	   "description" : description, "createDate": createDate,"customerName": customerName};
    	  
        $.ajax({	
        	url: "http://localhost:8080/operatorInquiry/customers/" + $('#customerName').val() + '/inquiries.json',
        	data: JSON.stringify(json),
        	type: "POST",
        	
        	beforeSend: function(xhr) {
        		xhr.setRequestHeader("Accept", "application/json");
        		xhr.setRequestHeader("Content-Type", "application/json");
        	},
        	success: function() {
        		   		 
        		$('#popMessag').text("Inquiry for User: " +customerName+" create successfull");
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
		<h1>Create new Inquiry</h1>
		<div>
			<div id="sNewInquiryForm"></div>
		</div>
		
		<form:form id="newInquiryForm" role="form" 	action="" commandName="newInquiry">
			
			<h2>Here you can create new Inquiry:</h2>
			
			<div class="form-group">
				<label for="customerName">Customer Name:</label>
			    <input type="text" class="form-control" id="customerName" placeholder="Customer Name" required="true">
			</div>

			<div class="form-group">
				<label for="description">Description:</label> 
				<textarea class="form-control" rows="5" type="text" 
				class="form-control" id="description" placeholder="Enter description" required="true"></textarea>
			</div>
			
			<div class="form-group">
				<label for="createDate">Create Date:</label> 
				<input type="text" class="form-control" id="createDate" placeholder="Create Date:" name="createDate1"
				readonly>		
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

			<div class="form-group">
				<label for="model">Model:</label> 
				<input type="text" class="form-control" id="model" placeholder="Model:">		
			</div>
			
			<div class="form-group">
				<label for="adress">Adress:</label> 
				<input type="text" class="form-control" id="adress" placeholder="Adress:">		
			</div>
			
			<div class="form-group">
				<label for="city">City:</label> 
				<input type="text" class="form-control" id="city" placeholder="City:">		
			</div>
			
			<div class="form-group">
				<label for="topic">Select Topic (select one):</label>
				<form:select path="topic" class="form-control" id="topic" required="true">	
								<c:forEach var="topic" items="${topics}">
									<form:option value="${topic.id}">${topic.name}</form:option>
								</c:forEach>
				</form:select>
				
			</div>
			
			<button type="submit" class="btn btn-default">Create</button>
			
			<a href="${pageContext.request.contextPath}/" class="btn btn-default">Home page</a>	
			<a href="${pageContext.request.contextPath}/inquiry/list" class="btn btn-default">Back To List</a>	
			
	</form:form>

		<div class="alert alert-success" role="alert" id="popMessag">Success</div>



	</div>
	
	<div class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">Modal title</h4>
      </div>
      <div class="modal-body">
        <p>One fine body…</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
		
		
</body>
</html>