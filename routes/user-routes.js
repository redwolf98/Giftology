var db = require("../models");

module.exports = function (app) {

    app.get("/login", function (req, res) {
        db.user.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(
            function (data) {
                if (data.length == 0) {
                    res.status(404).end();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3ffd36754db7f22e87cf3ac2edbb3a9f276bb4aa

                }else{
                    req.mySession.user = {
                        id: data[0].id,
                        firstName: data[0].firstName,
                        lastName: data[0].lastName,
                        email: data[0].email,
                        photo_url: data[0].photo_url
                    };

<<<<<<< HEAD
                    res.render("index");
=======
                } else {
                    res.render("index", data[0].id);
>>>>>>> 64e9ea7f31fc53ed40c4652d469725802a0852d1
=======
                    res.render("home");

>>>>>>> 3ffd36754db7f22e87cf3ac2edbb3a9f276bb4aa
                }
            }
        )
    });

    app.get("/user", function (req, res) {
        res.render('profile');
        db.user.findOne({
            where: {
                id: req.body.id
            }
        }).then(
            function (data) {
                res.send(data);
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