var db = require("../models");

module.exports = function (app) {

    app.get("/gift/:relationID", function (req, res) {
        var id = req.params.relationID.split(':');
        console.log("Sent ID:" + req.params.relationID);
        console.log("Real ID:" + id[1]);
        db.gift.findAll({
            where: {
                relationID: parseInt(id[1])
            }
        }).then(function (data) {
            console.log("Method:GET URL:/gift RESPONSE=" + data);
            res.status(200).json(data);
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

    app.get("/gifts/:relationID", function(req,res){

        db.relation.findOne({where:{
            id: req.params.relationID
        }}).then(function(relationResult){
            db.gift.findAll({where:{
                relationID: req.params.relationID
            }}).then(function(data){
                
                res.render("giftList",{pageName:"giftList","data":data});
            })
        });

    });

};