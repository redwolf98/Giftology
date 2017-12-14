var db = require("../models");

modules.exports = function(app){

    app.get("/gift", function(req,res){
        db.gift.findAll({}).then(function(data){
            res.render()
        });
    });

    app.post("/gift", function(req,res){

    });

    app.put('/gift', function(req, res) {
        
    });

    app.delete('/gift', function(req, res) {
        
    });

};