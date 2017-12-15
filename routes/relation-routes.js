var db = require("../models");

module.exports = function (app) {

<<<<<<< HEAD
    // app.get("/people", function (req, res) {
    //     res.render('people', {
    //         message: ""
    //     });
    //     // db.user.findAll({
    //     //     where: {
    //     //         id: req.body.id
    //     //     }
    //     // }).then(function (data) {
    //     //     res.send(data);
    //     // });
    // });
=======
    app.get("/myPeople", function(req,res){
        console.log("redirecting to people page");

        db.user.findAll({
            where: {
                id: req.body.id
            }

        }).then(function(data){
            res.render("people",data);

        });
    });
>>>>>>> 5a966c254a92dde4c2f4a5b54c8bda9a1fec0362

    // app.post("/people", function (req, res) {
    //     module.exports = function (app) {
    //         app.post('/signup', function (req, res) {
    //             var person = {
    //                 "firstName": req.body.first_name,
    //                 "lastName": req.body.last_name,
    //                 "relationship": req.body.relationship,
    //                 "birthDate": req.body.birthdate,

    //             }
    //             var message;
    //             let status = false;
    //             connection.query('INSERT INTO relation SET ?', person, function (error, results, fields) {
    //                     if (error) {

    //                         message: 'there is some error with query'
    //                     }
    //                     else {
    //                         status = true;
    //                         message: 'person added sucessfully'
    //                     };
    //                     if (status) {
    //                         res.redirect('/people-list');
    //                     } else {
    //                         res.render('people', {
    //                             message: message
    //                         })
    //                     }
    //                 }

    //             );
    //         });
    //     }
    // });

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