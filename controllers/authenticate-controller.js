var connection = require('../config/connection');
module.exports.authenticate = function (req, res) {

    connection.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there is some error with query'
            })
        } else {
            if (results.length > 0) {
                if (password == results[0].password) {
                    res.json({
                        status: true,
                        message: 'successfully authenticated'
                    })
                } else {
                    res.json({
                        status: false,
                        message: "Email and password do not match"
                    });
                }

            } else {
                res.json({
                    status: false,
                    message: "Email does not exist"
                });
            }
        }
    });
}