var mysql = require('mysql');
var db = require('./db.js');

console.log("Connected!");
  
  
  db.query("CREATE DATABASE IF NOT EXISTS testdb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  
 
   db.query("CREATE TABLE IF NOT EXISTS AUTHOR (AUTHOR_ID INT AUTO_INCREMENT PRIMARY KEY, AUTHOR_NAME VARCHAR(255),"+
		"UNIQUE(AUTHOR_NAME))", 
			function (err, result) {
    if (err) throw err;
    console.log("Table created");
	
	db.end();
	
   });

 db.query("CREATE TABLE IF NOT EXISTS BOOK( BKID INT AUTO_INCREMENT PRIMARY KEY, TITLE  VARCHAR(255),LANGUAGE VARCHAR(255),"+
				" SUBJECT JSON, PUB_DATE  DATETIME , PUB_NAME  VARCHAR(255), LICENSE  VARCHAR(255),AUTHOR_ID INT, "+
				" FOREIGN KEY (AUTHOR_ID) REFERENCES AUTHOR(AUTHOR_ID) ON DELETE CASCADE , UNIQUE(TITLE) )", 
			function (err, result) {
    if (err) throw err;
    console.log("Table created");
   });
   



