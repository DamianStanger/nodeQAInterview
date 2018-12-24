/* eslint-disable no-sync */

const fs = require("fs");
const transform = require("./transform");
const buildingRepo = require("./buildingRepository");


async function execute(filename, mongoUrl) {
  const fileData = fs.readFileSync(filename);
  const data = JSON.parse(fileData).data;

  const mongoDocs = transform(data);

  const repo = await buildingRepo(mongoUrl);
  await repo.save(mongoDocs);
  return await repo.close();
}


module.exports = execute;
