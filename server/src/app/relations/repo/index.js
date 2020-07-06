const relationshipMap = require('./map');
const relationshipModel = require('./models/Relationship');
const RelationshipRepo = require('./repo');

const relationshipRepo = new RelationshipRepo(relationshipMap, relationshipModel);

module.exports = {
  relationshipRepo,
}
