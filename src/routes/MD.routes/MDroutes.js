const express = require('express');
const { metaDataController } = require('../../controllers');

const metaDataRoute = express.Router();

metaDataRoute.post('/cte-credentials', metaDataController.credentials);
metaDataRoute.delete('/delete-file', metaDataController.deleteCredentials);

module.exports = metaDataRoute;
