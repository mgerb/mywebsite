$(document).ready(function(){
	
	var date = new Date();
	var offset = new Date().getTimezoneOffset();
	$("#timeZone").val(offset);

	console.log("offset - " + offset);

	$(function() {
	    $( "#dpicker" ).datepicker();
 	 });

	$(function() {
	    $( "#datepicker" ).datepicker();
 	 });
		
});