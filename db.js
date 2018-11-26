var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "<userName>",
  password: "<password>",
  database: "<dbName>"
});

con.connect(function(err) {
   if (err) throw err;
});

//con.connect();

module.exports = con;