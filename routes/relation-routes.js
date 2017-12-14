var db = require("../models");

module.exports = function(app){

    app.get("/people", function(req,res){
        db.user.findAll({
            where: {
                id: req.body.id
            }
        }).then(function(data){
            res.send(data);
        });
    });

    app.post("/people", function(req,res){
        db.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            photo_url: req.body.photo_url
        }).then(
            function(data){
                res.status(200).send(data);
            }
        );
    });

    app.put('/people', function(req, res) {
        db.user.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                email: req.body.email,
                photo_url: req.body.photo_url
            },
            {
                where:{
                id: req.body.id
        }}).then(
            function(){
                res.status(200).send("ok");
            }
        );
    });

    app.delete('/people', function(req, res) {
        db.user.destroy({where:{id: req.body.id}}).then(function(){
            res.status(200).send('ok');
        });
    });

};