var db = require("../models");

module.exports = function (app) {

    app.get("/user", function (req, res) {
        console.log(req);
        db.user.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(
            function (data) {
                if (data.length == 0) {
                    res.status(404).end();

                }else{
                    req.mySession.user = {
                        id: data[0].id,
                        firstName: data[0].firstName,
                        lastName: data[0].lastName,
                        email: data[0].email,
                        photo_url: data[0].photo_url
                    };

                    res.render("home");
                }
            }
        )
    });

    app.post("/user", function (req, res) {

        db.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });

    });

    app.put('/user', function (req, res) {

    });

    app.delete('/user', function (req, res) {

    });

};