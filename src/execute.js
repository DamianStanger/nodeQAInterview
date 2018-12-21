/* eslint-disable no-sync */

const fs = require("fs");
const transform = require("./transform");
const saveRecords = require("./saveRecords");


async function execute(filename, mongoUrl) {
  const fileData = fs.readFileSync(filename);
  const data = JSON.parse(fileData).data;

  const mongoDocs = transform(data);

  const save = await saveRecords(mongoUrl);
  return await save(mongoDocs);
}


module.exports = execute;
