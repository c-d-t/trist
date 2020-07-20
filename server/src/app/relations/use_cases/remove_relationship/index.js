const RemoveRelationshipController = require('./controller');
const RemoveRelationshipApplication = require('./application');
const { relationshipRepo } = require('../../repo');

const removeRelationshipUseCase = new RemoveRelationshipApplication(relationshipRepo);
const removeRelationship = new RemoveRelationshipController(removeRelationshipUseCase);

module.exports = removeRelationship;
