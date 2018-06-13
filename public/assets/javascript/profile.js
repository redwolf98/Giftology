$("#btn-updateProfile").on("click", function(){

    //Retrieve people from database (AJAX GET method)
    var variables = {
        firstName: $("#firstName").val().trim(),
        lastName: $("#lastName").val().trim()
    };
    $.ajax({
        url: "/updateProfile",
        method: "PUT",
        data: variables
    }).done(results => {
        console.log(results);
    });

})