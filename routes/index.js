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
    app.post('/login', authenticateController.authenticate, function (req, res) {
        res.redirect("/home");
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

    app.get('/shopping', function (req, res, next) {
        console.log("rendering shopping");
        res.render('shopping', {});
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
