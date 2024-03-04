const express = require('express');
const MD_Route = require('./MDroutes');

const MD_Routes = express.Router();

MD_Routes.use(MD_Route);
MD_Routes.use('*', (req, res) => { res.status(404).send('Route Not Found'); });

module.exports = MD_Routes;