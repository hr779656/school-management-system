const express = require('express');
const mdRoute = require('./MDroutes');

const mdRoutes = express.Router();

mdRoutes.use(mdRoute);
mdRoutes.use('*', (req, res) => { res.status(404).send('Route Not Found'); });

module.exports = mdRoutes;
