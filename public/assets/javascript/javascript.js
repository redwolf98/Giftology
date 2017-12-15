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
        url: queryURL + product,
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true
    }).done( response => {
        //Log response
        console.log(response);
    });
}