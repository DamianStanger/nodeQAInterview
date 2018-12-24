function filterOutPrivateBuildings(buildings) {
  return buildings.filter(building => !(/M4/).test(building.address.postcode));
}


module.exports = filterOutPrivateBuildings;
