var express    = require("express");
var bodyParser = require("body-parser");
var path       = require("path");
var engine     = require('ejs-mate');
var index      = require('./routes/index');
var sessions   = require('client-sessions');
var userID     = null;

// bring in the models
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));



app.use(sessions({
  cookieName: 'mySession', // cookie name dictates the key name added to the request object 
  secret: 'blargadeeblargblarg', // should be a large unguessable string 
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms 
  activeDuration: 1000 * 60 * 5,
  secure: false // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds 
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');;

app.use(function(req,res,next){
  console.log("Attempting Page Change");
  if(req.mySession.user){
      console.log("  ALREADY IN");
      next();
  }else{
     if(req.originalUrl == "/login" || req.originalUrl == "/signup" || req.originalUrl == "/aboutUs"){
         next();
     }else{
         console.log("   REJECTED");
         res.render("login",{
             pageName:"login",
             message: "Must Log In."
         })
     }
  }
});

require("./routes/user-routes")(app);
require("./routes/relation-routes")(app);
require("./routes/gift_routes")(app);
require("./routes/index")(app);


// listen on port 3000
var port = process.env.PORT || 3000;
db.sequelize.sync().then(function () {
  app.listen(port, function () {
    console.log("server listening on port", port);
  });
});