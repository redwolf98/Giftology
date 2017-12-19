//Hide the card on /myPeople page load
$(".relation-card").hide();

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
        //Default photo URL
        var personPhoto = (res[a].photo_url == null)? "https://spoilednyc.com/upload/undefined/people.png" : res[a].photo_url

        //Add necessary attributes
        personBtn.attr("relation-id", res[a].id);
        personBtn.attr("relation-name", res[a].firstName + " " + res[a].lastName);
        personBtn.attr("relation-address", res[a].address);
        personBtn.attr("relation-rel", res[a].relationship);
        personBtn.attr("relation-url", personPhoto);

        //Select div, append new personBtn
        $(".my-people").append(personBtn);
    }

    //Person btn click event
    $(".person-btn").on("click", function() {
        //Hide, then fade in the card on click (refresh will hide card)
        $(".relation-card").hide();
        $(".relation-card").css("visibility", "visible");
        $(".relation-card").fadeIn("fast");
    
        //Populate the card with selected person's information
        $(".card-img-top").attr("src", $(this).attr("relation-url"));
        $(".card-name").html($(this).attr("relation-name"));
        $(".card-address").html("Address: " + $(this).attr("relation-address"));
        $(".card-rel").html($(this).attr("relation-rel").toUpperCase());

        /*Retrieve gifts from database (AJAX GET method)
        $.get("/gift/:" + relation.relationID, relation, function(res){
            console.log(res);
        });*/
        /*
        $.ajax({
            url: "/gift/:" + relation.id,
            method: "GET",
            data: parseInt(relation.id)
        }).done(res => {
            console.log(res);
            console.log(relation.id);
        });*/

        /*Reference the relation ID (for the gift request AJAX call)
        var relation = { id: $(this).attr("relation-id")}

        $.get('/gift/:', { id: relation.id }, function(data) {
            console.log(data);
        });*/

        //.DONE(), create carousel elements for each gift (example is 4)
        for(var i = 0; i < 4; i++) {
            var itemContainer = $("<div class = 'carousel-item'>");
            var carouselLink  = $("<a href = '#'>");
            var carouselImg = $("<img class = 'd-block item-img rounded' width = '180' height = '180'>");

            //Update necessary attributes
                //a tag href links to product url
                //img tag src to product img src
            carouselImg.attr("src", "https://d30y9cdsu7xlg0.cloudfront.net/png/13360-200.png");

            //Append necessary elements
            carouselLink.append(carouselImg);
            itemContainer.append(carouselLink);
            $(".carousel-inner").append(itemContainer);
        }
    });
});



