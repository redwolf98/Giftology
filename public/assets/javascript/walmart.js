$("#loading-img").hide();

//Declare walmartURL, initialize gift
var walmartURL   = "https://api.walmartlabs.com/v1/search?apiKey=5tqpb7skr82fputft42hqt7e&query=";
var gift;

//Click event listener on .walmart-btn class
$(".walmart-btn").on("click", (res) => {
    res.preventDefault();
    
    //Reference #product-input
    var productInput = $("#product-input").val().trim().toLowerCase();

    //Assign default value to if productInput is empty
    var product = (productInput !== "")? productInput : "iphone";

    //Show loading animation
    $("#loading-img").fadeIn("fast");
    $("#loading-img").css("visibility", "visible");
    
    //Invoke Walmart() with the following arguments
    Walmart(walmartURL, product);

});


//Walmart: Used to make AJAX calls to the Walmart Search API. Parameters: correct queryURL and a product name
function Walmart(queryURL, product) {
    //AJAX call
        //Problem: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.
        //Solution: Set dataType: 'jsonp', crossDomain: true
    $.ajax({
        //Set AJAX properties
        url: queryURL + product + "&numItems=4",
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true
    }).done( products => {
        //Hide loading animation
        $("#loading-img").hide();
        $("#loading-img").css("visibility", "hidden");

        //Creates a card for each product received from the Walmart API
        //Creates .add-btn for the click event listener below
        CreateCardsForProducts(products);

        //Click event listener on .add-btn class (when the user adds a product)
        $(".add-btn").on("click", function() {

            //Create the product object with corresponding properties extracted from .add-btn attributes
            gift = {
                name:        $(this).attr("product-name"),
                image_url:   $(this).attr("product-img"),
                price:       $(this).attr("product-price"),
                web_url:     $(this).attr("product-url"),
                description: $(this).attr("product-desc")
            }

            //Modal update: image src and header to reflect current product
            $(".prod-img").attr("src", gift.image_url);
            $(".prod-name").html(gift.name);
        });

         //When the user saves gifts to relation(s)
        $(".gift-save").on("click", function() {
            
            //Reference all checkboxes
            var checkboxes = $(".checkBox");
            
            //Iterate through all checkboxes
            for (var x = 0; x < checkboxes.length; x++) {
                //If the iterated checkbox is checked
                if (checkboxes[x].checked) {
                    //Add this relationID property to gift
                    gift.relationID = $(checkboxes[x]).attr("relation-id");
                    //Post this gift object to the corresponding relationID in the DB
                    $.post("/gift", gift, function(){});
                }
            }
        });

    });
}

//Creates cards for each product in the walmart API response
function CreateCardsForProducts(products) {
    //Clear the search-results div
    $("#search-results").empty();

    //Iterate through products array
    for (var i = 0; i < products.numItems; i++) {
        //Create a bootstrap card
        var holder     = $("<div class = 'col-lg-3 col-md-6 mb-4'></div>");
        var card       = $("<div class = 'card product-card'></div>");
        var cardHeader = $("<div class = 'card-header product-header'></div>");
        var cardImage  = $("<img class = 'card-img-top rounded'></img>").attr("src", products.items[i].mediumImage);
        var cardBody   = $("<div class = 'card-body'></div>");
        var cardTitle = $("<h5 class = 'card-title'></h5>").html(products.items[i].name);
        var cardPrice  = $("<p class = 'card-price'></p>").html("$" + products.items[i].salePrice);
        var cardText   = $("<p class = 'card-text style-3'></p>").html(products.items[i].shortDescription);
        var cardFooter = $("<div class = 'card-footer'></div>");
        var cardBtn    = $("<button class = 'btn btn-primary add-btn' data-toggle='modal' data-target='#myModal'></button>").html("Add to List");

        //Append correct elements
        cardBody.append(cardTitle, cardPrice, cardText);
        cardHeader.append(cardImage);
        cardFooter.append(cardBtn);
        card.append(cardHeader, cardBody, cardFooter);
        holder.append(card);

        //Add product properties as an attribute on the .add-btn (data is easily retrieved)
        cardBtn.attr("product-name", products.items[i].name);
        cardBtn.attr("product-img", products.items[i].mediumImage);
        cardBtn.attr("product-price", products.items[i].salePrice);
        cardBtn.attr("product-url", products.items[i].productUrl);
        cardBtn.attr("product-desc", products.items[i].shortDescription);

        //Append to search-results div
        $("#search-results").append(holder);
    }
}