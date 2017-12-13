var mysql = require("mysql");
var confidential = require("./confidential");
var connection;

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
  connection = mysql.createConnection({
      port: 3306,
      host: "localhost",
      user: "root",
      password: confidential.password,
      database: "db_giftology"
    });
}

connection.connect();

module.exports = connection;


  