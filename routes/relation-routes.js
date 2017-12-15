var db = require("../models");

module.exports = function (app) {

    app.get("/myPeople", function(req,res){
        console.log("redirecting to people page");

        db.relation.findAll({
            where: {
            userID: req.mySession.user.id
            }

        }).then(function(data){
            data.message = "";
            res.render("people",data);

        });
    });

    app.get("/relation",function(req,res){
        console.log("querying realtion table");

        db.relation.findAll({
            where: {
                userID: req.mySession.user.id
                }
    
        }).then(function(data){              
            res.status(200).json(data);
            });
    });
    


    app.post("/people", function (req, res) {
        module.exports = function (app) {
            app.post('/signup', function (req, res) {
                var person = {
                    "firstName": req.body.first_name,
                    "lastName": req.body.last_name,
                    "relationship": req.body.relationship,
                    "birthDate": req.body.birthdate,

                }
                var message;
                let status = false;
                connection.query('INSERT INTO relation SET ?', person, function (error, results, fields) {
                        if (error) {

                            message: 'there is some error with query'
                        }
                        else {
                            status = true;
                            message: 'person added sucessfully'
                        };
                        if (status) {
                            res.redirect('/people-list');
                        } else {
                            res.render('people', {
                                message: message
                            })
                        }
                    }

                );
            });
        }
    });

    app.put('/people', function (req, res) {
        db.user.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            photo_url: req.body.photo_url
        }, {
            where: {
                id: req.body.id
            }
        }).then(
            function () {
                res.status(200).send("ok");
            }
        );
    });

    app.delete('/people', function (req, res) {
        db.user.destroy({
            where: {
                id: req.body.id
            }
        }).then(function () {
            res.status(200).send('ok');
        });
    });

};