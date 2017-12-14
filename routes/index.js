var express = require('express');
var db      = require("../models");

var router = express.Router();

router.get('/', function (req, res, next) {
    console.log("rendering signup");
    res.render('signup', {});
});

router.get('/home', function (req, res, next) {
    console.log("rendering home");
    res.render('home', {});
});

module.exports = router;