const mysql = require('mysql');
const xmlParser = require('xml2js');
const fs = require("fs");
const db = require('./db.js');
module.exports.parseRDFFile = parseRDFFile;
module.exports.parseSync = parseSync;
module.exports.insertAuthor = insertAuthor;

const rdfBook = {};
	
function parseRDFFile(fName){

	var parRes = null;
		parRes = parseSync(fName);
	try{
		authorRes = insertAuthor(rdfBook.author);
		bookRes = insertBook(rdfBook.title,rdfBook.lang,rdfBook.subjects,rdfBook.pub_date,rdfBook.publisher,rdfBook.license,rdfBook.author)
	}finally{
		db.end();
	}
}

function parseSync(fName) {
	var xmlContents = fs.readFileSync(fName).toString();
    var Iresult = null;
	var sqlResult = null;
	var title = "";
	var author = "";
	var pub_date = "";
	var lang = "";
	var subjects = "";
	var publisher = "";
	var id = "";
	var license = "";
	
    xmlParser.parseString(xmlContents, function (err, result) {
		try{
			
			title = result['rdf:RDF']['pgterms:ebook'][0]['dcterms:title'][0];
			author = result['rdf:RDF']['pgterms:ebook'][0]['dcterms:creator'][0]['pgterms:agent'][0]['pgterms:name'][0];
			pub_date = result['rdf:RDF']['pgterms:ebook'][0]['dcterms:issued'][0]['_'];
			lang = result['rdf:RDF']['pgterms:ebook'][0]['dcterms:language'][0]['rdf:Description'][0]['rdf:value'][0]['_'][0];
			subject_temp = result['rdf:RDF']['pgterms:ebook'][0]['dcterms:subject']
			var myData = []; 
				for (var i=0; i<subject_temp.length;i++) {
					var sub = result['rdf:RDF']['pgterms:ebook'][0]['dcterms:subject'][i]['rdf:Description'][0]['rdf:value'];
					myData.push(sub);
				}

				
			subjects = JSON.stringify(myData);
			publisher = result['rdf:RDF']['pgterms:ebook'][0]['dcterms:publisher'][0];
			id = result['rdf:RDF']['pgterms:ebook'][0]['dcterms:hasFormat'][0]['pgterms:file'][0]['dcterms:isFormatOf'][0]['$']['rdf:resource']
			license = result['rdf:RDF']['pgterms:ebook'][0]['dcterms:rights'][0];
		id = id.slice(7,12)
		rdfBook.id=id;
		rdfBook.title=title;
		rdfBook.author=author;
		rdfBook.pub_date=pub_date;
		rdfBook.lang=lang;
		rdfBook.subjects=subjects;
		rdfBook.publisher=publisher;
		
		Iresult = rdfBook;
		
		} catch(err){
			Iresult = "Issue in parsing the RDF File. The File does not confront to the schema";
			
		}
	});
		
	return rdfBook;
}

function insertAuthor(author){
var authSql = "INSERT INTO AUTHOR ( AUTHOR_NAME ) VALUES (\""+ author + "\")";
var op = db.query(authSql, function (err, result) {

	if (err) {
        console.log("**Error while inserting the record into Author Table .. " + err.message); 
		return "DBError";
    }else{
		return "Author Inserted";
	};
});

}

function insertBook(title,lang,subjects,pub_date,publisher,license,author){

  var bookSql = "INSERT INTO BOOK ( TITLE, LANGUAGE , SUBJECT, PUB_DATE, PUB_NAME, LICENSE, AUTHOR_ID ) VALUES (\""+ title + "\",\"" 
				+ lang + "\",'" + subjects + "',\"" + pub_date + "\",\"" + publisher +  "\",\"" + license + "\","
				+ "(SELECT author_id FROM AUTHOR WHERE AUTHOR_NAME = \""+author+"\"));";
	db.query(bookSql, function (err, result) {

	if (err) {
        console.log("**Error while inserting the record into Book Table .. " + err.message);
		return "DBError";
    }else{
		return "Book Inserted";
	};
  });
}
