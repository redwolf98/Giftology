var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const ejsLayouts = require("express-ejs-layouts");
var index = require('./routes/index')

// bring in the models
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "./public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');;

app.use(ejsLayouts);


app.use('/', index);
// app.use("/create", routes);


// listen on port 3000
var port = process.env.PORT || 3000;
db.sequelize.sync().then(function () {
  app.listen(port, function () {
    console.log("server listening on port", port);
  });
});