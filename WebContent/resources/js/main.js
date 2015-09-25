// The root URL for the RESTful services
var rootURL = "http://localhost:8080/operatorInquiry/";

var currentInquiry;

// Retrieve Inquiry list when application starts 
findAll();
// Retrieve Topic list when application starts
findTopic()

// Prepare new Inquiry when application starts
newInquiry();

// Nothing to delete ans save when application start
hideButton();

// Register listeners
$('#btnSearch').click(function() {
	search($('#searchKey').val());
	return false;
});

$('#btnSearchAll').click(function() {
	findAll();
});

$('#btnAdd').click(function() {
	findTopic();
	newInquiry();
	return false;
});

$('#inquiryForm').submit(function(event){
	if($('#customerName').val().length<=3){
		return;
	}
	if ($('#inquiryId').val() == '')
		addInquiry();
	else
		updateInquiry();
	return false;
});

$('#btnDelete').click(function() {
	deleteInquiry();
	return false;
});

$('#inquiryList').on('click','a', function() {
	findTopic();
	findById($(this).attr('data-identity'));
});

$('#attributeInquiry').on('click','a', function() {
	$(this).parents('.form-horizontal').remove();
});

$('#btnAddAtrrInquiry').click(function(){
	if($("#attributeInquiry :input:last").val().length<3){
		return
	}
	value = [];
	value.id="";
	value.name="";
	value.value="";
	createHTMforInputAttr(value); 
		   	
	
});

function hideButton(){
		$('#btnDelete').hide();
		$('#btnSave').hide();
		$('#btnAddAtrrInquiry').hide();
}

function showButton(){
		$('#btnDelete').show();
		$('#btnSave').show();
		$('#btnAddAtrrInquiry').show();
}

$('#btnDelAtrrInquiry').click(function() {
	$(".form-horizontal .form-group:last").remove();
});

function createOrFillFieldForAttr(inquiry){
	for(var key in inquiry.attributes) {
	    	var value = inquiry.attributes[key];
	    	createHTMforInputAttr(value)	
	}
};

function createHTMforInputAttr(value){
	$('#attributeInquiry').append(''
		    +'	<div class="form-horizontal"> '
			    +'<div class="form-group"> '
			        +'<div class="col-sm-5">'
			         +'<Label>Name:</Label>'
			          +  '<input required data-minlength="3" required type="text" class="form-control" valueId="'+value.id+'" nameValue="'+value.name+'" placeholder="NameParametr" value="'+value.name+ '"/>'
			       +' </div>'
			        +'<div class="col-sm-5">'
			         +'<Label>Value:</Label>'
			           +' <input required data-minlength="3" required type="text" class="form-control" valueValue="'+value.value+'" placeholder="ValueParametr" value="'+value.value+'"/>'
			       +' </div>'
			        +'<div class="col-sm-1">'
			        		+'<a href=#><span class="glyphicon glyphicon-trash"></span></a>'
			       +' </div>'		        			        
			   +'</div>'
			+'</div>'
				);
}

$(function() {
$('input[name="CreateDate1"]').daterangepicker({
		timePicker: true,
		timePicker24Hour: true,
		singleDatePicker : true,
		showDropdowns : true,
		locale : {
		format : 'YYYY-MM-DD hh:mm'
	   }
	});
});

function upDate(){
			$('#btnDelete').show();
			findAll();
			clearDetails();
};


function search(searchKey) {
	if (searchKey == '') 
		findAll();
	else
		findByName(searchKey);
}

function newInquiry() {
	clearDetails();
	$('#btnDelete').hide();
	$('#btnSave').show();
	currentInquiry = {"topic":"", "attributeOfInquiry":"","createDate":new Date()};
	renderDetails(currentInquiry); // Display empty form
}

function findAll() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL +'inquiry/list',
		dataType: "json", // data type of response
		success: renderList		
	});
}

function findTopic(){
	console.log('findTopic');
	$.ajax({
		type: 'GET',
		url: rootURL +'/topics',
		dataType: "json", // data type of response
		success: renderListTopic
	});
}

function findByName(searchKey) {
	console.log('findByName: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: rootURL + 'customers/' + searchKey +'/inquiries',
		dataType: "json",
		success: renderList 
	});
}

function findById(id) {
	console.log('findById: ' + id);
	var custNam = $('#id'+id).attr('custName');
	console.log(custNam);
	$.ajax({
		type: 'GET',
		url: rootURL + 'customers/' + custNam +'/inquiries/'+id,
		dataType: "json",
		success: function(data){
			showButton();
			console.log('findById success: ' + data.name);
			currentInquiry = data;
			clearDetails();		
			renderDetails(currentInquiry);
		}
	});
}

function addInquiry() {
	console.log('addInquiry');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL + 'customers/' + $('#customerName').val()+ '/inquiries',
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			popUpMessag('Inquiry created successfully');
			findAll();
			clearDetails();
			$('#btnDelete').hide();
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(errorThrown);
			alert('addInquiry error: ' + textStatus);
			upDate();
		}
	});
}


function updateInquiry() {
	console.log('updateInquiry');
	var id = $('#inquiryId').val();
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + 'customers/' + $('#customerName').val() +'/inquiries/'+id,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			popUpMessag('Inquiry updated successfully');
			clearDetails();
			findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateInquiry error: ' + textStatus);
			console.log(errorThrown);
			upDate();
		}
	});
}

function deleteInquiry() {
	console.log('deleteInquiry');
	$.ajax({
		type: 'DELETE',
		url: rootURL + '/customers/'+  $('#customerName').val()+ '/inquiries/' + $('#inquiryId').val(),
		success: function(data, textStatus, jqXHR){
			popUpMessag('Inquiry deleted successfully');
			$('#btnDelete').hide();
			findAll();
			clearDetails();
			newInquiry();

		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(errorThrown);
			alert('deleteInquiry error');
		}
	});
}

function renderList(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	
	$('#inquiryList li').remove();
	$.each(list, function(index, inquiry) {
		$('#inquiryList').append('<li><a class="list-group-item" custName="'+ inquiry.customerName+'" id=id'+ inquiry.id +' href="#" data-identity="'
			+ inquiry.id + '">User : <span class="text-success">'+inquiry.customerName +'</span></br>'+ 'Inquiry Date:<span class="text-primary">' + getDateFormat(inquiry.createDate)+'</span></a>');
			/*getDateFormat(inquiry.createDate)*/
	});
}

function renderListTopic(data){
	$('#topicSelect').empty();
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	$.each(list, function(index, topic) {
		$('#topicSelect').append(' <option id=topic'+topic.id+' value="'+ topic.id +'">'+topic.name+'</opion>');
	});	
}

function getDateFormat(date){ // getDate from int value
	    //conver date to our format
		var date = new Date(date);
		var day = date.getDate();
		day = day>=10 ? day : "0" +day; 
		var month = date.getMonth();
		var m = Number(month) + 1;
		m = m>=10 ? m: "0"+"" + m;
		var year = date.getFullYear();
		var hours = date.getHours();
		hours = hours>=10 ? hours:"0" + hours;
		var minut = date.getMinutes();
		minut = minut>=10 ? minut:"0" + minut;
	return year+'-'+m+'-'+ day +' ' +hours +':'+minut;	
}

function renderDetails(inquiry) {
	$('#inquiryId').val(inquiry.id);	
	$('#topic'+inquiry.topic.id).attr("selected","selected");
	$('#customerName').val(inquiry.customerName);
	$('#createDate').val(getDateFormat(inquiry.createDate));
	$('textarea#description').val(inquiry.description);
	
	createOrFillFieldForAttr(inquiry);
	
	}

function clearDetails() {
	$('#inquiryId').val("");
	$('#topic').val("");
	$('#customerName').val("");
	$('#attributeOfInquiryId').val("");
	$('textarea#description').val("");
	$('#attributeInquiry').empty();
	$('#createDate').val(getDateFormat(Date.now()));
}

function getAttrInq(){
	var IDs = [];
	var data = {};
		$("#attributeInquiry").find("input").each(function(){
			
				if($(this).attr('nameValue')!=undefined){
					 data.id= $(this).attr('valueId');
					 data.name = $(this).attr('value');
				}else{
					data.value = $(this).attr('value');
					IDs.push(data);
					data = {};
				}
		});
		console.log(IDs);
	return IDs;
}


// Helper function to serialize all the form fields into a JSON string
function formToJSON() {
	var inquiryId = $('#inquiryId').val();
	var topicSelect = $('#topicSelect option:selected').attr('value');
	var attrId = $('attributeOfInquiryId').val();
	var date = $('#createDate').val();

	var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/;
	var dateArray = reggie.exec(date); 
	var dateObject = new Date(
	    (+dateArray[1]),
	    (+dateArray[2])-1, // Careful, month starts at 0!
	    (+dateArray[3]),
	    (+dateArray[4]),
	    (+dateArray[5])
	);

	var attributes =  getAttrInq();
	
	var inquiry = {
		"id": inquiryId == "" ? null : inquiryId, 
		"topic" :{"id": topicSelect ,"name": topicSelect },  
		"description": $('#description').val(),
		"createDate": dateObject.getTime(),
		"customerName": $('#customerName').val() ,
		"attributes" : attributes
		};
		
		return JSON.stringify(inquiry);
		
}

	function popUpMessag(message) {
			bootbox.alert(message, function() {
		});
	}
