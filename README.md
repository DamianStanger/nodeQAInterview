# NodeQAInterview
The basis of a technical interview for a node QA engineer

This is a really simple node app that takes a file as imput, it is then processed / transformed in some way
and finally saved in the DB. It simulates a simple common business requirement, there are tests to test most of 
the things that this does. Esp happy path tests.

## The shape of a building records in the json file
```json
{
  "uprn": 123,                        // number [required]
  "name": "The shard",                // string [optional]
  "aliases:": ["The shard of glass"], // array<string> [optional]
  "address": {                        // object [optional]
    "line1": "32",                    // string [optional]
    "line2": "London bridge street",  // string [optional]
    "city": "London",                 // string [optional]
    "postcode": "SE1 9SG"             // string [optional]
  }
}
```

## Implemented requirements
The code base has the following requirements fully implemented and tested:
 * Take a file containing 'buildings' and save them to a mongo collection called buildings
 * the _id in the mongo document should take the uprn
 * Each imported document should have an imported date
 * Create a field called 'fullAddress' that is the concatenation of lines 1, 2, town and postcode
 
## New requirements
The following requirements have been recently added and are not tested
 * Some of our customers dont want their buildings in the DB, if the postcode has M1 as the major part then we will exclude these buildings
 
## The aim of all this
 * Can they use git?
 * Can they read javascript?
 * Can they spot missing tests?
 * Can they find issues/bugs using some manual testing?
 * Can they write additional tests?
 
## Running the technical interview
 * (prep) Copy or clone this repo
 * (prep) Checkout the 'dev' branch (that branch has had this document changed :-)  
 * (prep) install all the packages
 * Ask candidate to:
   * Review the readme which is a modified version of this document, it tells them about the project and what it does
   * Create a branch based on the dev branch (This is where they will work)
   * Switch to the new branch  
   * Install the npm packages (This is just to see if they know how, they will get a msg saying nothing changed)
   * Put environment variables in place
   * Have a look at the input file 
   * Run it ```npm run```
   * Have a look at the output in mongo 
   * Run tests ```npm test```
   * Review the tests
     * Whats missing
     * Whats good, whats bad
     * Optionally review the production code (If they are interested, its a black box with regards to integration tests)
   * Perform some exploratory manual testing
   * Write tests for the new requirements (see above "New Requirements" section)
   * Merge work from branch to dev branch
   * Ask about differences between add, commit and push with regards to git

### Things to look for
 * There is no exception handling
 * If the file does not exist it will fail
 * If the file is not valid json it will fail
 * if the DB does not exist or the server is down it will fail
 * If there is a missing field in the addresses the computed fullAddress will be wrong
 * A very large number in the UPRN will cause failure
 * The UPRN will allow negative numbers but should not
 * Duplicate UPRNs in the import file will lead to data getting overwritten
 * Unexpected use of syncronous file reading (do they know the difference?)

## Environment
 * This code has been written and tested on linux (ubuntu through the WSL)
 * You will need an internet connection
 * You will need access to a mongo instance (ideally running locally)
 * A way to view results in mongo (I would suggest "roboMongo", "Studio 3t" or "compass" but the shell will do if they know how)
 * node 8+ and npm 6+ are required

### Environment variables
```bash
export FILENAME=test/files/test01.json
export MONGO_CONNECTION_STRING=mongodb://localhost:27017/nodeQAInterview
```
