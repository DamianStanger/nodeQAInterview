# NodeQAInterview
The basis of a technical interview for a node QA engineer

This is a really simple node app that takes a file as imput, it is then processed / transformed in some way
and finally saved in the DB. It simulates a simple common business requirement.

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
 * The _id in the mongo document should take the uprn of the building
 * Each imported document should have an imported date
 * Create a field called 'fullAddress' that is the concatenation of name, line 1, line 2, city and postcode
 
## New requirements
The following requirements have been recently added:
 * Some of our customers dont want their buildings in the DB, if the postcode has M4 as the major part then we will exclude these buildings

### Environment variables
```bash
export FILENAME=test/files/test01.json
export MONGO_CONNECTION_STRING=mongodb://localhost:27017/nodeQAInterview
```
