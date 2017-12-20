//Retrieve people from database (AJAX GET method)
$.ajax({
    url: "/relation",
    method: "GET"
}).done( function(res) {
    //Empty the modal-body (appears when adding a product to list)
    $(".people-list").empty();

    //Iterate through the response array
    for(var a = 0; a < res.length; a++) {
        //Create a list item for each person in the database when response is received
        var newRow   = $("<tr>");
        var nameData = $("<td>");
        var checkData= $("<td>");

        //Create the following html elements (person-badge and checkbox)
        var personBadge = $("<span class = 'badge badge-success'>").html(res[a].firstName + " " + res[a].lastName);
        var checkBox = $("<input class = 'checkBox' type = 'checkBox' >");

        //Update attributes (references position in array)
        checkBox.attr("person-number", a);
        checkBox.attr("relation-id", res[a].id);

        //Append elements
        nameData.append(personBadge);
        checkData.append(checkBox);
        newRow.append(nameData, checkData);

        //Append to DOM
        $(".people-list").append(newRow);
    }
});