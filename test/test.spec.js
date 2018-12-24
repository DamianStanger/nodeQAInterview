/* eslint-disable no-process-env */

const chai = require("chai");
chai.should();

const execute = require("../src/execute");


const MongoClient = require("mongodb").MongoClient;
const mongoUrl = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/nodeQAInterviewDb";
const dbName = mongoUrl.split("/")[3];
const mongoClient = new MongoClient(mongoUrl, {"useNewUrlParser": true});


describe("nodeQAInterview", async function () {
  before(async () => {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    await db.collection("buildings").deleteMany();
  });

  after(async () => {
    await mongoClient.close();
  });


  describe("successfull processing of testData", () => {

    before(async () => {
      await execute("/mnt/c/_stuff/code/github/nodeQAInterview/test/data/testData.json", mongoUrl);
    });

    it("should load 2 records into the buildings collection", async () => {
      const db = mongoClient.db(dbName);
      const actualCount = await db.collection("buildings").countDocuments();
      actualCount.should.equal(2);
    });

    it("should save the full address", async () => {
      const db = mongoClient.db(dbName);
      const theShard = await db.collection("buildings").findOne({"_id": 10001});
      theShard.fullAddress.should.equal("The shard, 32, London bridge street, London, SE1 9SG");
    });

    it("should save an imported date", async () => {
      const db = mongoClient.db(dbName);
      const theShard = await db.collection("buildings").findOne({"_id": 10001});
      theShard.importedDate.should.exist;
    });
  });
});
