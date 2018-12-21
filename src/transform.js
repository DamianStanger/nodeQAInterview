const lodash = require("lodash");


function transform(data) {
  return data.map(doc => {
    const mongoDoc = lodash.cloneDeep(doc);
    mongoDoc._id = mongoDoc.uprn;
    return mongoDoc;
  });
}


module.exports = transform;
