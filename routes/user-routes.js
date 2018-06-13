var db = require("../models");

module.exports = function (app) {

    app.get("/myProfile", function (req, res) {
        console.log();
        console.log(req.headers.referer);
        console.log();
        console.log("url:'/myProfile', method:GET");
        console.log("User.firstName = " + req.mySession.user.firstName);
        console.log("User.lastName = " + req.mySession.user.lastName);
        res.render("profile", {
            message:"",
            data: req.mySession.user,
            pageName:"myProfile"});
        
    });


    app.put('/updateProfile', function (req, res) {
        console.log();
        console.log("url:'/updateProfile', method:PUT");
        console.log("session.firstName = " + req.mySession.user.firstName);
        // req.mySession.user.firstName = req.body.firstName;
   
        // req.mySession.user.lastName = req.body.lastName;

        db.user.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },{where: {id: req.mySession.user.id}})
        .then((result) =>{
            console.log();
            console.log("url:'/updateProfile', method:PUT, after execution");
            console.log("result = " + result);
            // if (err) throw err;
            console.log("AFTER UPDATE session.firstName = " + req.mySession.user.firstName);
           
            res.send({message:"Successfully Updated"});
        });
    });

};