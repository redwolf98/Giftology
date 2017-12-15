var db = require("../models");

module.exports = function (app) {

    app.get("/gift", function (req, res) {
        res.render('gifts');
        db.gift.findAll({
            where: {
                relationID: req.body.relationID
            }
        }).then(function (data) {
            res.send(data);
        });
    });

    app.post("/gift", function (req, res) {
        console.log("Post Gift");
        console.log(req.mySession);
        console.log("RelationID: " + req.body.relationID);
        console.log("Price: " + req.body.price);

        db.gift.create({
            userID: req.mySession.user.id,
            relationID: parseInt(req.body.relationID),
            name: req.body.name,
            price: parseFloat(req.body.price),
            description: req.body.description,
            image_url: req.body.image_url,
            web_url: req.body.web_url
        }).then(
            function (data) {
                res.status(200).send(data);
            }
        );
    });

    app.put('/gift', function (req, res) {
        db.gift.update({
            userID: req.body.userID,
            relationID: req.body.relationID,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image_url: req.body.image_url,
            web_url: req.body.web_url
        }).then(
            function () {
                res.status(200).send('ok');
            }
        );
    });

    app.delete('/gift', function (req, res) {
        db.gift.destroy({
            where: {
                id: req.body.id
            }
        }).then(function () {
            res.status(200).send("ok");
        });
    });

};