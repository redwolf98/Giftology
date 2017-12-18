//Hide the card on /myPeople page load
$(".card").hide();

//Retrieve people from database (AJAX GET method)
$.ajax({
    url: "/relation",
    method: "GET"
})
.done(res => {
    //Log the result
    console.log(res);
    
    //Button list group (/people)
    $(".my-people").empty();

    //Iterate through the response array
    for(var a = 0; a < res.length; a++) {
        //Create a list item for each person in the database when response is received
        var personBtn = $("<button type='button' class='list-group-item list-group-item-action person-btn'>").html(res[a].firstName + " " + res[a].lastName);
        //Add necessary attributes
        personBtn.attr("relation-id", res[a].id);
        personBtn.attr("relation-name", res[a].firstName + " " + res[a].lastName);
        personBtn.attr("relation-bd", res[a].birthDate);
        personBtn.attr("relation-rel", res[a].relationship);
        personBtn.attr("relation-url", res[a].photo_url);

        //Select div, append new personBtn
        $(".my-people").append(personBtn);
    }

    //Person btn click event
    $(".person-btn").on("click", function() {
        //Show card on click (refresh will hide card)
        $(".card").show();
        //Reference the relation ID (for the gift request AJAX call)
        var relation = { id: $(this).attr("relation-id")}
    
        //Populate the card with selected person's information
        $(".card-img-top").attr("src", $(this).attr("relation-url"));
        $(".card-name").html($(this).attr("relation-name"));
        $(".card-bd").html("Birthdate: " + $(this).attr("relation-bd"));
        $(".card-rel").html($(this).attr("relation-rel").toUpperCase());

        //Retrieve gifts from database (AJAX GET method)
        $.get("/gift", relation, function(res){
            console.log(res);
        });
    });
});



