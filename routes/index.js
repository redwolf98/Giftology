var connection = require('../config/connection');
var express = require('express');

const db = require("../models");




module.exports = function (app) {
    app.post('/signup', function (req, res) {
        var user = {
            "firstName": req.body.first_name,
            "lastName": req.body.last_name,
            "email": req.body.email,
            "password": req.body.password,

        }
        var message;
        let status = false;
        connection.query('INSERT INTO user SET ?', user, function (error, results, fields) {
                if (error) {

                    message: 'there is some error with query'
                }
                else {
                    status = true;
                    message: 'user registered sucessfully'
                };
                if (status) {

                    connection.query('SELECT * from user WHERE email = ? LIMIT 1', user.email, function(error,results,fields){
                        if(error){
                            message: "there is some error in aqcuiring userID"
                        }else{
                            req.mySession.user = {
                                id: results[0].id,
                                email: results[0].email,
                                firstName: results[0].firstName,
                                lastName: results[0].lastName
                            };
                            console.log(results);
                            res.render('home');
                        }
                    });
                  
                } else {
                    res.render('signup', {
                        message: message
                    })
                }
            }

        );
    });
    
    app.post('/login', function (req, res) {
        console.log("Post login");
        var email = req.body.email;
        var password = req.body.password;
        let status = false;
        let message;
        connection.query('SELECT * FROM user WHERE email = ? LIMIT 1', [email], function (error, results, fields) {
            if (error) {
                message = 'there is some error with query'
            } else {
                if (results.length > 0) {
                    if (password == results[0].password) {
                        status = true;
                    } else {
                        message = "Email and password do not match";
                    }
                } else {
                    message = "Email does not exist";
                }
            }
            if (status) {
                req.mySession.user = {
                    id: results[0].id,
                    firstName:  results[0].firstName,
                    lastName:  results[0].lastName,
                    email:  results[0].email
                };
                res.redirect("/home");
            } else {
                res.render("login", {
                    message: message
                });
            }

        });
    });

    app.get("/logout",function(req,res){

            console.log("logging out");
            req.mySession.reset();
            res.render("login",{
                message: "Successfully Logged Out"
            });

    });


    app.get("/aboutUs", function(req,res){
        console.log("redirecting to about us.");
        res.render("aboutUs");
    });




    app.get('/', function (req, res, next) {
        if(req.mySession.user){
            
            res.redirect("home");
        }else{
            res.render('login', {
                message: ""
            });
        }
        
    });
    app.get('/signup', function (req, res) {
        res.render("signup", {
            message: ""
        });
    });


    app.get('/home', function (req, res, next) {
        console.log("rendering home");
        res.render('home', {});
    });

    app.get("/people", function (req, res) {
        res.render('people', {
            message: ""
        });
        // db.user.findAll({
        //     where: {
        //         id: req.body.id
        //     }
        // }).then(function (data) {
        //     res.send(data);
        // });
    });

<<<<<<< HEAD

    app.post('/people', function (req, res) {
        console.log("posting person")
        var person = {
            "firstName": req.body.first_name,
            "lastName": req.body.last_name,
            "relationhip": req.body.relationship,
            "birthDate": req.body.birthdate,

        }
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
                    res.redirect('/people-list');
                } else {
                    res.render('people', {
                        message: message
                    })
                }
            }

        );
    });



    //return status(200) if email/password have match, status(404) if email/password doesn't exist
    // app.get("/login", function (req, res) {
    //     db.user.findAll({
    //         where: {
    //             email: req.body.email,
    //             password: req.body.password
    //         }
    //     }).then(function (results) {
    //         if (results.length == 1) {
    //             return res.status(404).end();
    //         } else {
    //             res.status(200).end();
    //         }
    //     });
    // });

}
=======
    app.get('/shopping', function (req, res, next) {
        console.log("rendering shopping");
        res.render('shopping', {});
    });

}
>>>>>>> 5a966c254a92dde4c2f4a5b54c8bda9a1fec0362
