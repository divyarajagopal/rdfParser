# metadata-coding-challenge
Coding challenge for book processing related roles. Please complete the challenge and send it back within 24 hours, either a zip of the source code or a link to the git repository.

# Tech stack

To complete the challenge, installaion of node.js (https://nodejs.org/en/) and npm (https://nodejs.org/en/) will be required. Min version of Node 8 is recommended.

# Coding challenge

The challenge is to build a metadata extractor for all the project Gutenberg titles which are available here: https://www.gutenberg.org/wiki/Gutenberg:Feeds (https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip).

Each book has an RDF file which will need to be processed to extract the:

* id (will be a number with 0-5 digits)
* title
* author/s
* publisher (value will always be Gutenberg)
* publication date
* language
* subject/s
* license rights

Note: For some books all of the data won't be available.

# Tasks

* Write a function that reads a single file in and outputs the correct output. The libraries that might be useful: https://www.npmjs.com/package/xml2js, https://www.npmjs.com/package/xmldom

* Store the output in a database of your choice locally for later querying. Use ORM of your choice (like `Sequlize`, `Mongoose`), to define database models as well.

* Write unit tests (use test suite libraries like `mocha` or `jest`) for the code and use code coverage analysis tool (built-in `jest` one, or libraries like `Istanbul`).

* Process all metadata for the titles for later querying


================================================================================

Comments :

Pre-requisite:

My-Sql db ver 8.0
npm install node
npm install mysql
npm install xml2js
npm install mocha
npm install fs
npm install chai
npm istall sequelize

1. run.js - Simple entry point to the application which takes the RDF file name as the parameter . 
Execution : node run.js pg1.rdf

2. dbSetup.js - This scripts setups the database and the required tables for this application.
Execution : node dbSetup.js

3. db.js - Establishes db connection

4. models.js - Database models using sequelize. The same can be used for setting up the database too
Execution : node models.js

5. rdffileParser.js - Script that parses the RDF files and inserts into the tables
Execution : This will be invokded from run.js

6. testSample.js - Sample test scripts implemented using mocha
execution : mocha testSample.js
