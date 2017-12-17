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
        var personBtn = $("<button type='button' class='list-group-item list-group-item-action'>").html(res[a].firstName + " " + res[a].lastName);
        //Add necessary attributes
        personBtn.attr("relation-id", res[a].id);
        //Select div, append new personBtn
        $(".my-people").append(personBtn);
    }
});

/*Retrieve gifts from database (AJAX GET method)
$.ajax({
    url: "/gift",
    method: "GET"
})
.done(res => {
    //Log the result
    console.log(res);
});*/