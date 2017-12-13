var express = require('express');
var router = express.Router();
const db = require("../models");

router.get('/', function (req, res, next) {
    res.render('pages/index', {});
});

    //return status(200) if email/password have match, status(404) if email/password doesn't exist
    router.get("/login", function(req, res){
        db.user.findAll({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(function(results){
            if(results.length == 1){
               return res.status(404).end();
            }
            else{
                res.status(200).end();
            }
        });
    });

    router.get("/signup", function(req,res){
        db.user.findAll({
            where:{ email: req.body.email}
        }).then(function(results){
            
            if(results.length > 1){

            }else{
                
            }
            
        });
    });

    router.post("/signup", function(req,res){

    });

    //Get User Profile by ID
    router.get("/user", function(req,res){});

    //Add a USer Profile
    router.post("/user", function(req,res){});

    //Update User Profile
    router.put("/user", function(req,res){});

    //A user clicks on the Relations tab and sees all their relations
    router.get("/people", function(req,res){
        
        db.relation.findAll({
            // userID: req.body.userID
        }).then(function(results){
            console.log("we want the results here")
            for(var i=0; i < results.length; i++){
                console.log(results[i]);
            }
            console.log();
           res.render("pages/peoples", results); 
        });
    });

    router.post("/people", function(req, res){
        relation.create({
            userID:req.body.userID,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            relationship: req.body.relationship,
            birthDate: req.body.birthDate,
            address: req.body.address
        }).then(function(data){
            res.render("", data);
        });
    });

    router.put("/people", function(req,res){
        relation.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                relationship: req.body.relationship,
                birthDate: req.body.birthDate,
                address: req.body.address,
                photo_url: req.body.photo_url
            },
            {where:{
                id: req.body.id
            }});
    });

    router.delete("/people", function(req,res){
        relation.destroy({
            where: {
                id: req.body.id
            }
        });
    }).then(function(result){
        if(result.deletedRows === 0){
            return res.status(400).end();
        }else{
            res.status(200).end();
        }
    });


module.exports = router;