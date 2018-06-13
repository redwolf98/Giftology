var db = require("../models");
var connection = require('../config/connection');


module.exports = function (app) {

    app.get("/myPeople", function(req,res){
        console.log("redirecting to people page");

        db.relation.findAll({
            where: {
            userID: req.mySession.user.id
            }

        }).then(function(data){
            data.message = "";
            res.render("people",{pageName:"myPeople",
                "data":data});

        });
    });

    app.get("/relation",function(req,res){
        console.log("querying relation table");

        db.relation.findAll({
            where: {
                userID: req.mySession.user.id
                }
    
        }).then(function(data){              
            res.status(200).json(data);
            });
    });
    

    app.get("/addPerson",function(req,res){
        res.render("addPerson",{message:"",
        pageName:"addPerson"});
    });


    app.post("/addPerson", function (req, res) {
     
                var person = {
                    "userID": req.mySession.user.id,
                    "firstName": req.body.first_name,
                    "lastName": req.body.last_name,
                    "relationship": req.body.relationship,
                    "address": req.body.address,
                    "photo_url": req.body.photo_url
                }
                console.log(req.body);
                var message;
                let status = false;
                connection.query('INSERT INTO relation SET ?', person, function (error, results, fields) {
                        if (error) {

                            message: 'there is some error with query'
                        }
                        else {
                            status = true;
                            message: 'person added sucessfully'
                        };
                        if (status) {
                            res.render('people', {
                                message: message,
                                pageName: "myPeople"
                            })
                        } else {
                            res.render('people', {
                                message: message,
                                pageName:"myPeople"
                            })
                        }
                    }

                );
            });

    app.put('/myPeople', function (req, res) {
        db.user.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            photo_url: req.body.photo_url
        }, {
            where: {
                id: req.body.id
            }
        }).then(
            function () {
                res.status(200).send("ok");
            }
        );
    });

    app.delete('/myPeople', function (req, res) {
        db.user.destroy({
            where: {
                id: req.body.id
            }
        }).then(function () {
            res.status(200).send('ok');
        });
    });

};