/* eslint-disable no-process-env,no-console,no-process-exit */

const file = process.env.FILENAME || "test/data/testData.json";
const connectionString = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/nodeQAInterviewDb";

const execute = require("./execute");


execute(file, connectionString).then(() => {
  console.log("all done");
  process.exit();
}).catch(err => {
  console.error("caught error:", err);
  process.exit();
});
