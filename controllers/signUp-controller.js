var connection = require('../config/connection');
module.exports.signUp = function (req, res) {

    var user = {
        "firstName": req.body.first_name,
        "lastName": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password,

    }
    connection.query('INSERT INTO user SET ?', user, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.json({
                status: false,
                message: 'there is some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'user registered sucessfully'
            });
            res.redirect("/home");
        }
    });
}