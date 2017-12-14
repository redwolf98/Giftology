//Require bcrypt-nodejs
var bcrypt   = require("bcrypt-nodejs");
var password = "anything";

//Hash the password
bcrypt.hash(password, null, null, function(err, hash) {
    //Log results (remove this in final app)
    console.log("Hashed version of password: "+ hash);

    //Store hash in database
    //...

    //Check generated hash with provided password (returns true)
    checkHash(password, hash);
});

function checkHash(password, hash) {
    // Load hash from your password DB.
    bcrypt.compare(password, hash, function(err, res) {
        // res == true
        console.log(hash + " is the hashed version of password: '" + password + "'? " + res);
    });
}