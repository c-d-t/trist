const GetRequestsApplication = require('./application');
const GetRequestsController = require('./controller');
const Relationship = require('../../repo/models/Relationship');

const getRequests = new GetRequestsApplication(Relationship);
const getRequestsGet = new GetRequestsController(getRequests);

module.exports = getRequestsGet;
