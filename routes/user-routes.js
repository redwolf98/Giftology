var db = require("../models");

modules.exports = function(app){

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

      

    });

    app.put('/user', function(req, res) {
        
    });

    app.delete('/user', function(req, res) {
        
    });

};