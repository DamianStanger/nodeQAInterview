/* eslint-disable no-sync */

const fs = require("fs");
const transform = require("./transform");
const filterOutPrivateBuildings = require("./filterOutPrivateBuildings");
const buildingRepo = require("./buildingRepository");


async function execute(filename, mongoUrl) {
  const fileData = fs.readFileSync(filename);
  const data = JSON.parse(fileData).data;

  const allBuildings = transform(data);
  const permittedbuildings = filterOutPrivateBuildings(allBuildings);

  const repo = await buildingRepo(mongoUrl);
  await repo.save(permittedbuildings);
  return await repo.close();
}


module.exports = execute;
