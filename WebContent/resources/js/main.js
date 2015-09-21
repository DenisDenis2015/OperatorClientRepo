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
$('#btnDelete').hide();
$('#btnSave').hide();


// Register listeners
$('#btnSearch').click(function() {
	search($('#searchKey').val());
	return false;
});

$('#btnSearchAll').click(function() {
	findAll();
});


$('#searchKey').keyup(function(e){
		search($('#searchKey').val());
	return false;
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
		url: rootURL + 'search/' + searchKey,
		dataType: "json",
		success: renderList 
	});
}

function findById(id) {
	console.log('findById: ' + id);
	var custNam = $('#id'+id).text();	
	$.ajax({
		type: 'GET',
		url: rootURL + 'customers/' + custNam +'/inquiries/'+id,
		dataType: "json",
		success: function(data){
			$('#btnDelete').show();
			$('#btnSave').show();
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
			alert('deleteInquiry error');
		}
	});
}

function renderList(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	
	$('#inquiryList li').remove();
	$.each(list, function(index, inquiry) {
		$('#inquiryList').append('<li><a class="list-group-item" id=id'+ inquiry.id +' href="#" data-identity="' + inquiry.id + '">'+inquiry.customerName +'</a></li>');
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
			var monthNames = [
			"January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		];
		
		var date = new Date(date);
		var day = date.getDate();
		day = day>10 ? day : "0" +day; 
		var monthIndex = date.getMonth();
		monthIndex = monthIndex>10 ? monthIndex: "0" + monthIndex;
		var year = date.getFullYear();
	return year+'-'+monthIndex+'-'+ day;	
}

function renderDetails(inquiry) {
	$('#inquiryId').val(inquiry.id);	
	$('#topic'+inquiry.topic.id).attr("selected","selected");
	$('#customerName').val(inquiry.customerName);
	$('#createDate').val(getDateFormat(inquiry.createDate));
	$('textarea#description').val(inquiry.description);
	$('#attributeOfInquiryId').val(inquiry.attributeOfInquiry.id);
	$('#model').val(inquiry.attributeOfInquiry.model);
	$('#adress').val(inquiry.attributeOfInquiry.adress);
	$('#city').val(inquiry.attributeOfInquiry.city);	
}

function clearDetails() {
	$('#inquiryId').val("");
	$('#topic').val("");
	$('#customerName').val("");
	$('#attributeOfInquiryId').val("");
	$('#model').val("");
	$('#adress').val("");
	$('#city').val("");	
	$('textarea#description').val("");
}



// Helper function to serialize all the form fields into a JSON string
function formToJSON() {
	var inquiryId = $('#inquiryId').val();
	var topicSelect = $('#topicSelect option:selected').attr('value');
	var attrId = $('attributeOfInquiryId').val();
	var date = ($('#createDate').val()); 
	//alert(date);
	return JSON.stringify({
		"id": inquiryId == "" ? null : inquiryId, 
		"topic" :{"id": topicSelect ,"name": topicSelect },  // поменять
		 "attributeOfInquiry" :   {
			 						"id": attrId =="" ? null : attrId, 
						  			"model" : $('#model').val(),
						  		    "adress": $('#adress').val(),
						  			 "city" :  $('#city').val()
		 							},
		"description": $('#description').val(),
		"createDate": date,
		"customerName": $('#customerName').val()  
		});
		
}

	function popUpMessag(message) {
			bootbox.alert(message, function() {
		});
	}
