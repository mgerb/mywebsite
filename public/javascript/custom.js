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

	$('.btn-file :file').on('fileselect', function(event, label) {
        console.log(label);
        $('#input_file').val(label);
    });
});


$(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', label);
});
