//console.log("Hi");
var queryURL = "https://api.cloudinary.com/v1_1/dpu6ghtcb/image/upload";

window.ajaxSuccess = function (response) {
    console.log(response);
    $("<img>").attr("src", response["secure_url"]).appendTo('#results');
    $("<div>").addClass('response').text( JSON.stringify(response)).appendTo('#results');
  }
  
  
  $('#upload').submit(function(event){
    event.preventDefault();

    $.ajax({
      url: queryURL,
      type: 'POST',
      data: new FormData(this),
      processData: false,
      contentType: false
      }).done(ajaxSuccess)
    .fail(function(msg){
      console.error(msg);
      $('#results').text(msg);
    });
    console.log(this);
  });