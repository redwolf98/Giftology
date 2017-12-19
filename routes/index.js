var connection = require('../config/connection');
var express = require('express');
var bcrypt = require('bcrypt')
const db = require("../models");


module.exports = function (app) {
    app.post('/signup', function (req, res) {


        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) throw err;
            var encryptedPassword = hash;
            var user = {
                "firstName": req.body.first_name,
                "lastName": req.body.last_name,
                "email": req.body.email,
                "password": encryptedPassword,
            }

            var message;
            let status = false;
            connection.query('INSERT INTO user SET ?', user, function (error, results, fields) {
                    if (error) {

                        message: 'there is some error with query'
                    }
                    else {
                        status = true;
                        console.log("success");
                        message: 'user registered sucessfully'
                    };
                    if (status) {

                        connection.query('SELECT * from user WHERE email = ? LIMIT 1', user.email, function (error, results, fields) {
                            if (error) {
                                message: "there is some error in aqcuiring userID"
                            }
                            else {
                                req.mySession.user = {
                                    id: results[0].id,
                                    email: results[0].email,
                                    firstName: results[0].firstName,
                                    lastName: results[0].lastName
                                };
                                console.log(results);
                                res.render('home',{
                                    pageName: "home"
                                });
                            }
                        });

                    } else {
                        res.render('signup', {
                            message: message,
                            pageName: "home"
                        })
                    }
                }

            );
        })

    });

    app.post('/login', function (req, res) {
        function checkHash(password, hash) {
            // Load hash from your password DB.
            bcrypt.compare(password, hash, function (err, res) {
                // res == true
                console.log(hash + " is the hashed version of password: '" + password + "'? " + res);
            });
        }
        // checkHash(req.body.password, //loaded pw from DB)
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
                    bcrypt.compare(password, results[0].password, function (err, match) {
                        if (err) {
                            console.log("error", err);
                        } else {
                            if (match) {
                                req.mySession.user = {
                                    id: results[0].id,
                                    firstName: results[0].firstName,
                                    lastName: results[0].lastName,
                                    email: results[0].email
                                };
                                res.redirect("/home");
                                // login was successful
                            } else {
                                res.render("login", {
                                    message: message,
                                    pageName: ""
                                });
                                // login failed
                            }
                            console.log("result", res);
                        }
                    })

                } else {
                    message = "Email does not exist";
                    res.render("login", {
                        message: message,
                        pageName: ""
                    });
                }
            }



        });
    });

    app.get("/logout", function (req, res) {

            console.log("logging out");
            req.mySession.reset();
            res.render("login",{
                message: "Successfully Logged Out",
                pageName:"login"
            });

    });


    app.get("/aboutUs", function (req, res) {
        console.log("redirecting to about us.");
        res.render("aboutUs",{pageName:"aboutUs"});
    });

    app.get('/', function (req, res, next) {
        if (req.mySession.user) {

            res.redirect("home");
        } else {
            res.render('login', {
                message: "",
                pageName: "login"
            });
        }

    });

    app.get('/signup', function (req, res) {
        res.render("signup", {
            message: "",
            pageName: "signup"
        });
    });

    app.get('/home', function (req, res, next) {
        console.log("rendering home");
        res.render('home', {pageName:"home"});
    });

    app.get("/myPeople", function (req, res) {
        res.render('people', {
            message: "",
            pageName: "myPeople"
        });
        // db.user.findAll({
        //     where: {
        //         id: req.body.id
        //     }
        // }).then(function (data) {
        //     res.send(data);
        // });
    });


    app.post('/myPeople', function (req, res) {
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
                        message: message,
                        pageName: "myPeople"
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


    app.get('/shopping', function (req, res, next) {
        console.log("rendering shopping");
        res.render('shopping', {pageName:"shopping"});
    });



    /**
     * 
     * BELOW ARE THE APP.USE QUERIES FOR REDIRECTING THE USER IF THEY ARE (AND ARE NOT) LOGGED IN
     * 
     */




    app.use(function (req, res, next) {
        if (req.mySession.user) {
            console.log(req.mySession.user);
            next();
        } else {
            console.log("user:null");
            next();
        }
    });

    app.use('/login', function (req, res, next) { // Allows access to login page
        if (!req.mySession.user) {
            console.log("in use login");
            next(); // before access token check
        } else {

            res.redirect('home');
        }

    });

    app.use('/signup', function (req, res, next) {
        if (!req.mySession.user) {
            next();
        } else {
            res.redirect('home');
        }

    });


}