//this is the user Id from user.id. This field gets populated on login/signup. When populated it means the user is logged in.
//if this field is not populated then all calls through the app should send the user back to the login page
//var userID = null;

//Declare walmartURL
var walmartURL   = "http://api.walmartlabs.com/v1/search?apiKey=5tqpb7skr82fputft42hqt7e&query=";


//Click event listener on .walmart-btn class
$(".walmart-btn").on("click", () => {

    //Reference #product-input
    var productInput = $("#product-input").val().trim().toLowerCase();

    //Assign default value to if productInput is empty
    var product = (productInput !== "")? productInput : "iphone";
    
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
        //Clear the search-results div
        $("#search-results").empty();

        //Iterate through products array
        for (var i = 0; i < products.numItems; i++) {
            //Create a bootstrap card
            var holder = $("<div class = 'col-lg-3 col-md-6 mb-4'></div>");
            var card   = $("<div class = 'card'></div>");
            var cardImage  = $("<img class = 'card-img-top'></img>").attr("src", products.items[i].mediumImage);
            var cardBody   = $("<div class = 'card-body'></div>");
            var cardHeader = $("<h5 class = 'card-title'></h5>").html(products.items[i].modelNumber);
            var cardPrice  = $("<p class = 'card-price'></p>").html("$" + products.items[i].salePrice);
            var cardText   = $("<p class = 'card-text style-3'></p>").html(products.items[i].shortDescription);
            var cardFooter = $("<div class = 'card-footer'></div>");
            var cardBtn    = $("<button class = 'btn btn-primary add-btn' data-toggle='modal' data-target='#myModal'></button>").html("Add to List");

            //Append correct elements
            cardBody.append(cardHeader, cardPrice, cardText);
            cardFooter.append(cardBtn);
            card.append(cardImage, cardBody, cardFooter);
            holder.append(card);

            //Add product properties as an attribute on the .add-btn (data is easily retrieved)
            cardBtn.attr("product-name", products.items[i].modelNumber);
            cardBtn.attr("product-img", products.items[i].mediumImage);
            cardBtn.attr("product-price", products.items[i].salePrice);
            cardBtn.attr("product-url", products.items[i].productUrl);
            
            //Append to search-results div
            $("#search-results").append(holder);
        };

        //Click event listener on .add-btn class (when the user adds a product)
        $(".add-btn").on("click", function() {

            //Create the product object with corresponding properties extracted from .add-btn attributes
            var product = {
                name: $(this).attr("product-name"),
                image: $(this).attr("product-img"),
                price: $(this).attr("product-price"),
                url: $(this).attr("product-url")
            }

            //Log the product object
            console.log(product);

            $(".prod-img").attr("src", product.image);
            $(".prod-name").html(product.name);
        });
        
    });
}