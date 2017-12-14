var db = require("../models");

module.exports = function(app){

    app.get("/people", function(req,res){
        db.user.findAll({
            where: {
                id: req.body.id
            }
        }).then();
    });

    app.post("/people", function(req,res){
        db.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            photo_url: req.body.photo_url
        }).then();
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
        }}).then();
    });

    app.delete('/people', function(req, res) {
        
    });

};