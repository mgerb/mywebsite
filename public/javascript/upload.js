
$('#newpost-form').click(function(evt){
    evt.preventDefault();

    var formData = new FormData($('form')[0]);
    $.ajax({
        url: '/newpost',  //Server script to process data
        type: 'POST',
        
        //Ajax events
        beforeSend: function(){
            $('body').addClass("loading");
        	$('#response').text("Uploading...");
        },
        success: function(data){
            $('body').removeClass("loading");
        	$('#response').text(data);
        },
        error: function(err){
            $('body').removeClass("loading");
        	$('#response').text("Error Uploading");
        },
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
    });
});


$('#upload-form').click(function(evt){
    evt.preventDefault();

    var formData = new FormData($('form')[0]);
    $.ajax({
        url: '/upload',  //Server script to process data
        type: 'POST',
        
        //Ajax events
        beforeSend: function(){
            $('body').addClass("loading");
            $('#response').text("Uploading...");
        },
        success: function(data){
            $('body').removeClass("loading");
            $('#response').text(data);
        },
        error: function(err){
            $('body').removeClass("loading");
            $('#response').text("Error Uploading");
        },
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
    });
});