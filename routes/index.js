var express = require('express');
<<<<<<< HEAD
var db      = require("../models");

var router = express.Router();
=======

const db = require("../models");
>>>>>>> 3f6c8161020f0745e26c0fa7a997c59ca74eabe5

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

<<<<<<< HEAD
module.exports = router;
=======
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
>>>>>>> 3f6c8161020f0745e26c0fa7a997c59ca74eabe5
