var db = require("../models");

module.exports = function(app){
<<<<<<< HEAD
=======

    app.get("/login", function(req,res){
        db.user.findOne({
            where:{
                email: req.body.email,
                password: req.body.password
            }
        }).then(
            function(data){
                if(data.length > 0){
                    res.status(404).end();
                }else{
                    res.render("index",data[0].id);
                }
            }
        )
    });
>>>>>>> 3f6c8161020f0745e26c0fa7a997c59ca74eabe5

    app.get("/user", function(req,res){
        db.user.findOne({
            where:{
                id: req.body.id
            }
        }).then(
            function(data){
                res.render("profile",data);
            }
        )
    });

    app.post("/user", function(req,res){

        db.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });

    });

    app.put('/user', function(req, res) {
        
    });

    app.delete('/user', function(req, res) {
        
    });

};