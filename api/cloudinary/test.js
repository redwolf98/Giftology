//Giftology's URL to the cloudinary API
var queryURL = "https://api.cloudinary.com/v1_1/dpu6ghtcb/image/upload";

//On submit
$('#upload').submit(function(event){
  event.preventDefault();

  //Post file to the cloud
  $.ajax({
    url: queryURL,
    type: 'POST',
    data: new FormData(this),
    processData: false,
    contentType: false
    })
    //Success: Log response, url to the photo (store this URL in DB)
    .done(response => {
      console.log(response);
      console.log(response.secure_url);
    })
    //Failure: Log the error
    .fail(err => {
      console.error(err);
    });
});