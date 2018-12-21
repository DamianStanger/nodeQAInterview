/* eslint-disable no-console */

const MongoClient = require("mongodb").MongoClient;


async function saveRecords(mongoUrl) {
  const dbName = mongoUrl.split("/")[3];
  console.log(mongoUrl, dbName);
  const mongoClient = new MongoClient(mongoUrl, {"useNewUrlParser": true});
  await mongoClient.connect();
  const db = mongoClient.db(dbName);

  return async function save(docs) {

    for (const doc of docs) {
      console.log(`Inserting: ${doc._id}`);

      await db.collection("buildings").updateOne(
        {"_id": doc._id},
        {"$set": doc},
        {"upsert": true}
      );
    }
    console.log("here");
  };
}


module.exports = saveRecords;
