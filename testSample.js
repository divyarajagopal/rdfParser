
const fs = require("fs");
const parseRDF = require('./rdfFileParser.js');
const db = require('./db.js');
const mocha = require('mocha');
const expect = require('chai').expect;

//const should = require('chai').should;

const rdf = fs.readFileSync('./pg34.rdf').toString();

describe('parseRDF',function(){
it('should return function',function(){
expect(parseRDF.parseRDFFile).to.be.a('function');
expect(parseRDF.parseSync).to.be.a('function');
expect(parseRDF.insertAuthor).to.be.a('function');
});

it("Using setTimeout to simulate asynchronous code!", function(done){
    setTimeout(function() {
        done();
    }, 200);
});


it('should parse RDF content',function(){
const parsedRDF = parseRDF.parseSync('pg34.rdf');
expect(parsedRDF).to.be.an('object');

});

});



 describe('parseRDF',() => {
  it('should return empty string', function() {
    parseRDF.insertAuthor('Jagan');
      
});
});

describe('parseRDF',() => {
  it('should return empty string', function() {
    parseRDF.insertBook("test","english",[["trial"]],"2018-11-06","gutenberg","Open",'Jagan');
      
});
});
