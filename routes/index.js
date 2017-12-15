var connection = require('../config/connection');
var express = require('express');

const db = require("../models");

var authenticateController = require('../controllers/authenticate-controller');
var signUpController = require('../controllers/signUp-controller');


module.exports = function (app) {
    app.post('/signup', signUpController.signUp, function (req, res) {
        console.log("app.post/signup");
        console.log(req.body);
        res.redirect("/home");
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

    app.get("/aboutUs", function(req,res){
        console.log("redirecting to about us.");
        res.render("aboutUs");
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
    app.post('/signup', function (req, res) {
        console.log("app.post/signup");
        console.log(req.body);
        res.redirect("/home");

    });


    app.get('/home', function (req, res, next) {
        console.log("rendering home");
        res.render('home', {});
    });

    //return status(200) if email/password have match, status(404) if email/password doesn't exist
    app.get("/login", function (req, res) {
        db.user.findAll({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(function (results) {
            if (results.length == 1) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
    });

}