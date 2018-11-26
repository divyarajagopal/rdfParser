const ref = require('./rdfFileParser.js');

var fileName = process.argv[2];

console.log(fileName);

ref.parseRDFFile(fileName);