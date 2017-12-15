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
                    res.redirect('/home');
                } else {
                    res.render('signup', {
                        message: message
                    })
                }
            }

        );
    });
    app.post('/login', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        let status = false;
        let message;
        connection.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields) {
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
                res.redirect("/home");
            } else {
                res.render("login", {
                    message: message
                });
            }

        });


    });


    app.get('/', function (req, res, next) {

        res.render('login', {
            message: ""
        });
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