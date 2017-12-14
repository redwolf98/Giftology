var mysql = require("mysql");
var confidential = require("./confidential");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
  console.log("using localhost");

  connection = mysql.createConnection({
<<<<<<< HEAD
      port: 3306,
      host: "localhost",
      user: "root",
      password: "root",
      database: "db_giftology"
    });
=======
    port: 3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_giftology"
  });
>>>>>>> 3f6c8161020f0745e26c0fa7a997c59ca74eabe5
}

connection.connect();

module.exports = connection;