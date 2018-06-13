//Hide the card on /myPeople page load
$(".relation-card").hide();

//Retrieve people from database (AJAX GET method)
$.ajax({
    url: "/relation",
    method: "GET"
})
.done(res => {
    //Button list group (/people)
    $(".my-people").empty();

    //Iterate through the response array
    for(var a = 0; a < res.length; a++) {
        //Create a list item for each person in the database when response is received
        var personBtn = $("<button type='button' class='list-group-item list-group-item-action person-btn'>").html(res[a].firstName + " " + res[a].lastName);
        //Default photo URL
        var personPhoto = (res[a].photo_url == null || res[a].photo_url == "")? "https://spoilednyc.com/upload/undefined/people.png" : res[a].photo_url
        console.log(personPhoto);

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
        //Reference the relation ID (for the gift request AJAX call)
        var relation = { id: $(this).attr("relation-id")}

        //Hide, then fade in the card on click (refresh will hide card)
        $(".relation-card").hide();
        $(".relation-card").css("visibility", "visible");
        $(".relation-card").fadeIn("fast");
    
        //Populate the card with selected person's information
        $(".card-img-top").attr("src", $(this).attr("relation-url"));
        $(".card-name").html($(this).attr("relation-name"));
        $(".card-address").html("Address: " + $(this).attr("relation-address"));
        $(".card-rel").html($(this).attr("relation-rel").toUpperCase());

        //Get selected relation's gift info
        $.get('/gift/:' + relation.id, function(data) {
            //Empty div that holds selected persons gifts
            $(".carousel-inner").empty();
            
            //Recreate first gift image
            var initialContainer = $("<div class = 'carousel-item active'>");
            var initialImg       = $("<img class = 'd-block item-img rounded' src='https://d30y9cdsu7xlg0.cloudfront.net/png/13360-200.png' width = '180' height = '180'>");
            initialContainer.append(initialImg);
            $(".carousel-inner").append(initialContainer);

            //Create carousel elements for each gift
            for(var i = 0; i < data.length; i++) {
                var itemContainer = $("<div class = 'carousel-item'>");
                var carouselLink  = $("<a target = '_blank'>");
                var carouselImg   = $("<img class = 'd-block item-img rounded' width = '180' height = '180'>");

                //Update necessary attributes
                carouselLink.attr("href", data[i].web_url);
                carouselImg.attr("src", data[i].image_url);

                //Append necessary elements
                carouselLink.append(carouselImg);
                itemContainer.append(carouselLink);
                $(".carousel-inner").append(itemContainer);  
            }
        });
    });
});



